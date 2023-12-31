import { useState, useEffect } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import DebtTable from "@iso/components/ReactDataTable/Cost/DebtAccountTable";
import { UserOutlined, ShopOutlined, BankOutlined } from "@ant-design/icons";
import { Button, Select, Form, Input, InputNumber, Switch, notification } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useRouter } from "next/router";

Edit.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const { id } = context.query;

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqAkun = await fetchAkun(cookies, id);
  const akun = await reqAkun.json();

  return {
    props: {
      user,
      akun
    },
  };
};

const fetchData = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me?populate=*";
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token,
        },
    };

    const req = await fetch(endpoint, options);
    return req;
};

const fetchAkun = async (cookies, id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/chart-of-accounts/"+ id;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token,
        },
    };

    const req = await fetch(endpoint, options);
    return req;
};

function Edit ({ props }) {
  const [form] = Form.useForm();
  const user = props.user;
  const akun = props.akun;
  const [loading, setLoading] = useState(false);
  const { TextArea } = Input;
  const cookies = nookies.get(null, "token");
  const router = useRouter();

  // NO Akun
  const [kodeAkun, setKodeAkun] = useState(akun.data.attributes.kode);
  //const [tipeTransaksi, setTipeTransaksi] = useState(akun.data.attributes.transaksi);

  //jenis akun
  const [jenisAkun, setJenisAkun] = useState(true);

  const onFinish = async (values) => {
    setLoading(true);
    values.jenis_akun = jenisAkun;
    console.log(values, "value");
    var data = { data: values};

    const endpoint = process.env.NEXT_PUBLIC_URL + "/chart-of-accounts/"+ akun.data.id;
    const JSONdata = JSON.stringify(data);

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSONdata,
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (req.status === 200) {
      form.resetFields();
      openNotificationWithIcon(
        "success",
        "Berhasil mengubah data",
        "Akun coa telah berhasil diubah. Silahkan cek kembali akun coa"
      );
      router.replace("/dashboard/keuangan/coa");
    } else {
      //res.error?.details.errors.map((error) => {
      //  const ErrorMsg = error.path[0];
        toast.error("Tidak dapat mengubah Akun COA", {
          position: toast.POSITION.TOP_RIGHT,
        });
        openNotificationWithIcon(
            "error",
            "Tidak dapat mengubah data",
            "Akun coa tidak berhasil diubah. Silahkan cek kembali akun coa"
        );
      //});

    }

    setLoading(false);
  };

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
        message: title,
        description: message,
    });
  };

  const switchStyle = {
    backgroundColor: 'blue', // Set the background color
    borderColor: 'red', // Set the border color
    // Add any other desired styles
  };

  const onChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);
    setJenisAkun(checked);
  };

  useEffect(() => {
    // if(tipeTransaksi == true) setTipeTransaksi("Debit");
    // else setTipeTransaksi("Kredit");
    form.setFieldsValue({
      nama: akun.data.attributes.nama,
      saldo: parseInt(akun.data.attributes.saldo),
      // type: akun.data.attributes.type,
      // deskripsi: akun.data.attributes.deskripsi,
    });

    if(akun?.data?.attributes?.jenis_akun != null) setJenisAkun(akun.data.attributes.jenis_akun);
    else;
    
  }, []);

  return (
    <>
      <Head>
        <title>Edit Akun</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Edit Akun"} />
          <LayoutContent>
            <Form
              form={form}
              name="edit_akun"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="kode"
                    rules={[
                      {
                        required: true,
                        message: "Kode akun tidak boleh kosong!",
                      },
                    ]}
                    initialValue={kodeAkun}
                  >
                    <Input
                      style={{ height: "50px" }}
                      prefix={<ShopOutlined style={{ fontSize: "150%" }} className="site-form-item-icon mr-5" />}
                      placeholder="Kode Akun"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="nama"
                    rules={[
                      {
                        required: true,
                        message: "Nama tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "50px" }}
                      prefix={<UserOutlined style={{ fontSize: "150%" }} className="site-form-item-icon mr-5" />}
                      placeholder="Nama Akun"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="saldo"
                    rules={[
                      {
                        required: true,
                        message: "Saldo tidak boleh kosong!",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ height: "50px", width: "100%" }}
                      prefix={<BankOutlined style={{ fontSize: "150%" }} className="site-form-item-icon mr-5" />}
                      className="py-1"
                      placeholder="Saldo"
                      formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    />
                  </Form.Item>
                </div>

                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="jenis_akun"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Jenis akun tidak boleh kosong!",
                    //   },
                    // ]}
                  >
                    <span>Kredit</span>
                    <Switch className="mx-3" style={switchStyle} checked={jenisAkun} onChange={onChangeSwitch} defaultChecked={jenisAkun}/>
                    <span>Debit</span>
                  </Form.Item>
                </div>

              </div>

              <Form.Item>
                {loading ? (
                  <div className=" flex float-left ml-3">
                    <Spin />
                  </div>
                ) : (
                  <Button htmlType="submit" className=" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1">
                    Submit
                  </Button>
                )}
              </Form.Item>
            </Form>
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
};

export default Edit;
