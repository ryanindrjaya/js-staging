import nookies from "nookies";
import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useRouter } from "next/router";
import DashboardLayout from "../../../../../containers/DashboardLayout/DashboardLayout";
import TitlePage from "../../../../../components/TitlePage/TitlePage";

const Edit = ({ props }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const golongan = props.data.data;
  const cookies = nookies.get(null, "token");
  const router = useRouter();
  const { TextArea } = Input;

  const onFinish = async (values) => {
    setLoading(true);

    const data = { data: values };
    const endpoint = process.env.NEXT_PUBLIC_URL + "/groups/" + golongan.id;
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
      router.back();
      toast.success("Data berhasil diperbarui!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      res.error?.details.errors.map((error) => {
        const ErrorMsg = error.path[0];
        toast.error(ErrorMsg === "code" ? "Kode sudah digunakan" : "Tidak dapat memperbarui Data", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Edit Golongan</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Edit Golongan"} />
          <LayoutContent>
            <Form
              form={form}
              name="add_golongan"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    initialValue={golongan.attributes.code}
                    name="code"
                    rules={[
                      {
                        required: true,
                        message: "Kode tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input style={{ height: "50px" }} placeholder="Kode Pabrik" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    initialValue={golongan.attributes.name}
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Nama tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input style={{ height: "50px" }} placeholder="Nama Pabrikasi" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    initialValue={golongan.attributes.alias}
                    name="alias"
                    rules={[
                      {
                        required: true,
                        message: "Singkatan  tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input style={{ height: "50px" }} placeholder="Nama Singkatan Pabrik" />
                  </Form.Item>
                </div>

                <div className="w-full md:w-full px-3 mb-2 md:mb-0">
                  <Form.Item initialValue={golongan.attributes.description} name="description">
                    <TextArea rows={4} placeholder="Deskripsi" />
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

Edit.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/groups/" + id;
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
