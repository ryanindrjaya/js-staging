import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import { Button, Checkbox, Form, Input } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin } from "antd";

const Tambah = ({ props }) => {
  const moduls = props.modules?.data || [];
  console.log(props);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const cookies = nookies.get(null, "token");

  const onFinish = async (values) => {
    setLoading(true);

    const endpoint = process.env.NEXT_PUBLIC_URL + "/users-permissions/roles";
    const JSONdata = JSON.stringify(values);

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
      toast.success("Role berhasil ditambahkan!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("Tidak dapat menambahkan Role baru", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Tambahkan Role</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Tambahkan Role"} />
          <LayoutContent>
            <Form
              layout="vertical"
              form={form}
              name="add_role"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="w-full flex flex-col md:flex-row gap-4">
                <Form.Item
                  className="w-full md:w-1/2"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Nama role tidak boleh kosong!",
                    },
                  ]}
                >
                  <Input style={{ height: "50px" }} placeholder="Nama Role" />
                </Form.Item>
                <Form.Item
                  className="w-full md:w-1/2"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Deskripsi tidak boleh kosong!",
                    },
                  ]}
                >
                  <Input style={{ height: "50px" }} placeholder="Deskripsi" />
                </Form.Item>
              </div>

              <div className="w-full flex gap-4">
                <Form.Item
                  className="w-full"
                  name="moduls"
                  rules={[
                    {
                      required: true,
                      message: "Modul tidak boleh kosong!",
                    },
                  ]}
                  label="Hak Akses"
                >
                  <Checkbox.Group
                    style={{ width: "100%" }}
                    options={moduls.map((item) => ({ label: item?.attributes?.name, value: item.id }))}
                  />
                </Form.Item>
              </div>

              <Form.Item>
                {loading ? (
                  <div className=" flex float-left ml-3">
                    <Spin />
                  </div>
                ) : (
                  <Button htmlType="submit" className=" hover:text-white hover:bg-cyan-700 border border-cyan-700">
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

  const reqModules = await fetchData(cookies, "/moduls");
  const resModules = await reqModules.json();

  return {
    props: {
      modules: resModules,
    },
  };
};

const fetchData = async (cookies, url) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + url;
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
