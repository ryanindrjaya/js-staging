import { useState, useEffect } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import DebtTable from "@iso/components/ReactDataTable/Cost/DebtAccountTable";
import Coa from "@iso/components/Form/AddCost/SearchCOA";
import { UserOutlined, ShopOutlined, BankOutlined } from "@ant-design/icons";
import { Button, Select, Form, Input, InputNumber, notification } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useRouter } from "next/router";

const Tambah = ({ props }) => {
  const [form] = Form.useForm();
  const user = props.user;
  const akun = props.akun;
  const [loading, setLoading] = useState(false); console.log("akun data",akun.data);
  const { TextArea } = Input;
  const cookies = nookies.get(null, "token");
  const router = useRouter();

  // NO Akun
  const [kodeAkun, setKodeAkun] = useState(akun.data.attributes.kode);
  //Akun COA
  const [akunCOA, setAkunCOA] = useState();

  const [selectedType, setSelectedType] = useState(null);

  const onFinish = async (values) => {
    setLoading(true);
    values.setting = akun.data.attributes.setting;
    values.chart_of_account = akunCOA?.id;
    var data = { data: values};

    const endpoint = process.env.NEXT_PUBLIC_URL + "/store-accounts/"+ akun.data.id;
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
        "Akun piutang telah berhasil diubah. Silahkan cek kembali akun piutang"
      );
      router.replace("/dashboard/penjualan/toko/setting");
    } else {
      //res.error?.details.errors.map((error) => {
      //  const ErrorMsg = error.path[0];
        toast.error("Tidak dapat mengubah Akun Piutang", {
          position: toast.POSITION.TOP_RIGHT,
        });
        openNotificationWithIcon(
            "error",
            "Tidak dapat mengubah data",
            "Akun piutang tidak berhasil diubah. Silahkan cek kembali akun piutang"
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
    else{}

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
    setSelectedType(akun.data.attributes.type);
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
                    <Select size="large" placeholder="Type" allowClear onChange={setSelectedType} disabled>
                      <Select.Option value="TUNAI" key="TUNAI">
                        Tunai
                      </Select.Option>
                      <Select.Option value="TRANSFER" key="TRANSFER">
                        Transfer
                      </Select.Option>
                      <Select.Option value="BANK BCA" key="BANK BCA">
                        Bank BCA
                      </Select.Option>
                      <Select.Option value="DEBIT BCA" key="DEBIT BCA">
                        Debit BCA
                      </Select.Option>
                      <Select.Option value="CASH" key="CASH">
                        Cash
                      </Select.Option>
                      <Select.Option value="LAINNYA" key="LAINNYA">
                        Lainnya
                      </Select.Option>
                      <Select.Option value="TRANSFER BANK" key="TRANSFER BANK">
                        Transfer Bank
                      </Select.Option>
                      <Select.Option value="KARTU KREDIT" key="KARTU KREDIT">
                        Kartu Kredit
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>

                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item name="chart_of_account">
                    {selectedType === "Master" ? (
                      <Coa page="hutang" onChange={setAkunCOA} selectedAkun={akunCOA}/>
                    ) : (
                      <Coa page="hutang" onChange={setAkunCOA} selectedAkun={akunCOA}/>
                    )}
                  </Form.Item>
                </div>
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
    const endpoint = process.env.NEXT_PUBLIC_URL + "/store-accounts/"+ id + "?populate=chart_of_account";
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
