import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "../../../components/TitlePage/TitlePage";
import { Button, Form, Input } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin } from "antd";

const Tambah = () => {
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
              form={form}
              name="add_role"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <Form.Item
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
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <Form.Item
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

export default Tambah;
