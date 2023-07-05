import { useState, useEffect } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import DebtTable from "@iso/components/ReactDataTable/Cost/DebtAccountTable";
import { UserOutlined, ShopOutlined, BankOutlined } from "@ant-design/icons";
import { Button, Select, Form, Input, InputNumber, notification } from "antd";
import Coa from "@iso/components/Form/AddCost/SearchCOA";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useRouter } from "next/router";
import Supplier from "../../../../../components/Form/AddCost/SupplierForm";

const Tambah = ({ props }) => {
  const [form] = Form.useForm();
  const user = props.user;
  const akun = props.akun;
  const [loading, setLoading] = useState(false);
  const { TextArea } = Input;
  const cookies = nookies.get(null, "token");
  const router = useRouter();

  // NO Akun
  const [kodeAkun, setKodeAkun] = useState(akun.data.attributes.kode);
  //Akun COA
  const [akunCOA, setAkunCOA] = useState();

  const onFinish = async (values) => {
    setLoading(true);
    values.setting = akun.data.attributes.setting;
    values.chart_of_account = akunCOA?.id;
    var data = { data: values}; console.log("values", values);

    const endpoint = process.env.NEXT_PUBLIC_URL + "/debt-accounts/"+ akun.data.id;
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
        "Akun hutang telah berhasil diubah. Silahkan cek kembali akun hutang"
      );
      router.replace("/dashboard/keuangan/hutang/setting");
    } else {
      //res.error?.details.errors.map((error) => {
      //  const ErrorMsg = error.path[0];
        toast.error("Tidak dapat mengubah Akun Hutang", {
          position: toast.POSITION.TOP_RIGHT,
        });
        openNotificationWithIcon(
            "error",
            "Tidak dapat mengubah data",
            "Akun hutang tidak berhasil diubah. Silahkan cek kembali akun hutang"
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

  useEffect(() => {
    if(akunCOA){
      form.setFieldsValue({
        akun: {
          label: `${akunCOA?.attributes?.nama}`,
          value: akunCOA?.id,
        }
      });
    }
    else{
      // form.setFieldsValue({
      //   type: akun.data.attributes.type,
      // });
    }

  }, [akunCOA]);

  useEffect(() => {
    form.setFieldsValue({
      nama: akun.data.attributes.nama,
      //saldo: parseInt(akun.data.attributes.saldo),
      type: akun.data.attributes.type,
      deskripsi: akun.data.attributes.deskripsi,
      akun: {
        label: `${akun?.data?.attributes?.chart_of_account?.data?.attributes?.nama}`,
        value: akun?.data?.attributes?.chart_of_account?.data?.id,
      }
    });

    setAkunCOA(akun.data.attributes.chart_of_account.data);
  }, []);

  return (
    <>
      <Head>
        <title>Tambahkan Akun</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Tambahkan Akun"} />
          <LayoutContent>
            <Form
              form={form}
              name="add_akun"
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
                      prefix={
                        <ShopOutlined
                          style={{ fontSize: "150%" }}
                          className="site-form-item-icon mr-5"
                        />
                      }
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
                      prefix={
                        <UserOutlined
                          style={{ fontSize: "150%" }}
                          className="site-form-item-icon mr-5"
                        />
                      }
                      placeholder="Nama Akun"
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item name="type">
                    <Select size="large" placeholder="Type" allowClear>
                      <Select.Option value="Tunai" key="Tunai">
                        Tunai
                      </Select.Option>
                      <Select.Option value="Transfer" key="Transfer">
                        Bank Transfer
                      </Select.Option>
                      <Select.Option value="Giro" key="Giro">
                        Bank Giro
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>

                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item name="chart_of_account">
                    <Coa page="hutang" onChange={setAkunCOA}/>
                  </Form.Item>
                </div>
              </div>

              <div className="w-full mt-1 flex justify-between">
                <Form.Item name="deskripsi" className="w-full mx-2">
                  <TextArea rows={4} placeholder="Deskripsi" />
                </Form.Item>
              </div>

              <Form.Item>
                {loading ? (
                  <div className=" flex float-left ml-3">
                    <Spin />
                  </div>
                ) : (
                  <Button
                    htmlType="submit"
                    className=" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1"
                  >
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

Tambah.getInitialProps = async (context) => {
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
    const endpoint = process.env.NEXT_PUBLIC_URL + "/debt-accounts/"+ id + "?populate=chart_of_account";
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

export default Tambah;
