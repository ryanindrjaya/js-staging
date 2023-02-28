import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import { Button, Form, Input } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useRouter } from "next/router";

const Tambah = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const cookies = nookies.get(null, "token");
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);

    const endpoint = process.env.NEXT_PUBLIC_URL + "/areas";
    const JSONdata = JSON.stringify({ data: values });

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
      toast.success("Area berhasil ditambahkan!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.push("/dashboard/customer/area");
    } else {
      toast.error("Tidak dapat menambahkan Area baru", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Tambahkan Area</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Tambahkan Area"} />
          <LayoutContent>
            <Form
              form={form}
              name="add_area"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="flex flex-col md:flex-row gap-x-10">
                <Form.Item
                  className="w-full"
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: "Kode Area tidak boleh kosong!",
                    },
                  ]}
                >
                  <Input placeholder="Kode Area" />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Nama Area tidak boleh kosong!",
                    },
                  ]}
                >
                  <Input placeholder="Nama Area" />
                </Form.Item>
              </div>

              <Form.Item className="w-full" name="description">
                <Input.TextArea rows={6} placeholder="Deskripsi" />
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

export default Tambah;
