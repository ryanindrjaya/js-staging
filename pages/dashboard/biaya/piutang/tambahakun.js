import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import { UserOutlined, ShopOutlined, BankOutlined } from "@ant-design/icons";
import { Button, Select, Form, Input, InputNumber, notification } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useRouter } from "next/router";

const Tambah = ({ props }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectLocations, setSelectLocation] = useState({});
  const cookies = nookies.get(null, "token");
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    values.setting = false;
    var data = { data: values};

    const endpoint = process.env.NEXT_PUBLIC_URL + "/credit-accounts";
    const JSONdata = JSON.stringify(data);

    const options = {
      method: "POST",
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
        "Berhasil menambah data",
        "Akun piutang telah berhasil ditambahkan. Silahkan cek kembali akun piutang"
      );
      router.replace("/dashboard/biaya/piutang/setting");
    } else {
      //res.error?.details.errors.map((error) => {
      //  const ErrorMsg = error.path[0];
        toast.error("Tidak dapat menambahkan Akun Piutang", {
          position: toast.POSITION.TOP_RIGHT,
        });
        openNotificationWithIcon(
            "error",
            "Tidak dapat menambah data",
            "Akun piutang tidak berhasil ditambahkan. Silahkan cek kembali akun piutang"
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

  //const getRole = async (roleId) => {
  //  const endpoint =
  //    process.env.NEXT_PUBLIC_URL + "/users-permissions/roles/" + roleId;
  //  const options = {
  //    method: "GET",
  //    headers: {
  //      "Content-Type": "application/json",
  //      Authorization: "Bearer " + cookies.token,
  //    },
  //  };

  //  const req = await fetch(endpoint, options);
  //  const res = await req.json();

  //  return res.role;
  //};

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
                      prefix={
                        <BankOutlined
                          style={{ fontSize: "150%" }}
                          className="site-form-item-icon mr-5"
                        />
                      }
                      className="py-1"
                      placeholder="Saldo"
                      formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    />
                  </Form.Item>
                </div>
              </div>

              <Form.Item name="type" className="w-1/4 mb-5 ml-1">
                <Select size="large" placeholder="Type">
                  <Select.Option value="Tunai" key="Tunai">
                    Tunai
                  </Select.Option>
                  <Select.Option value="Transfer" key="Transfer">
                    Bank Transfer
                  </Select.Option>
                  <Select.Option value="Giro" key="Giro">
                    Bank Giro
                  </Select.Option>
                  <Select.Option value="CN" key="CN">
                    CN
                  </Select.Option>
                  <Select.Option value="OTH" key="OTH">
                    OTH
                  </Select.Option>
                </Select>
              </Form.Item>

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
  let data;

  //const req = await fetchData(cookies, "/users-permissions/roles");
  //data = await req.json();

  //const reqLocations = await fetchData(cookies, "/locations");
  //const resLocations = await reqLocations.json();

  //if (req.status !== 200) {
  //  context.res.writeHead(302, {
  //    Location: "/signin?session=false",
  //    "Content-Type": "text/html; charset=utf-8",
  //  });
  //  context?.res?.end();

  //  return {};
  //}

  return {
    props: {
      data,
      //locations: resLocations,
    },
  };
};

//const fetchData = async (cookies, url) => {
//  const endpoint = process.env.NEXT_PUBLIC_URL + url;
//  const options = {
//    method: "GET",
//    headers: {
//      "Content-Type": "application/json",
//      Authorization: "Bearer " + cookies.token,
//    },
//  };

//  const req = await fetch(endpoint, options);
//  return req;
//};

export default Tambah;