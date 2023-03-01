import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "../../../../../components/TitlePage/TitlePage";
import { Button, Form, Input } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useRouter } from "next/router";

const Edit = ({ props }) => {
  console.log("data", props.data);
  const { attributes = {}, id = 0 } = props.data.data;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const cookies = nookies.get(null, "token");
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);

    const endpoint = process.env.NEXT_PUBLIC_URL + "/areas/" + id;
    const JSONdata = JSON.stringify({ data: values });

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
      toast.success("Area berhasil diubah!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.push("/dashboard/customer/area");
    } else {
      toast.error("Tidak dapat mengubah Wilayah", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Edit Area</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Edit Area"} />
          <LayoutContent>
            <Form form={form} name="add_area" onFinish={onFinish} initialValues={attributes}>
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

Edit.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/areas/" + id;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };
  const res = await fetch(endpoint, options);
  const data = await res.json();

  if (res.status !== 200) {
    context.res.writeHead(302, {
      Location: "/signin?session=false",
      "Content-Type": "text/html; charset=utf-8",
    });
    context?.res?.end();

    return {};
  }

  return {
    props: {
      data,
    },
  };
};

export default Edit;
