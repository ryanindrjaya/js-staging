import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { Button, Form, Input } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin } from "antd";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import TitlePage from "../../../../components/TitlePage/TitlePage";

const Tambah = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const cookies = nookies.get(null, "token");
  const { TextArea } = Input;

  const onFinish = async (values) => {
    setLoading(true);
    const data = { data: values };
    const endpoint = process.env.NEXT_PUBLIC_DB + "/categories";
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
      toast.success("Kategori berhasil ditambahkan!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      res.error?.details.errors.map((error) => {
        const ErrorMsg = error.path[0];

        toast.error(
          ErrorMsg === "category_id"
            ? "ID Kategori udah digunakan"
            : "Tidak dapat menambahkan Kategori",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Tambahkan Kategori</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Tambahkan Kategori"} />
          <LayoutContent>
            <Form
              form={form}
              name="add_category"
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
                        message: "Nama Satuan tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "50px" }}
                      placeholder="Nama Kategori"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="category_id"
                    rules={[
                      {
                        required: true,
                        message: "Kategori ID tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "50px" }}
                      placeholder="ID Kategori"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-full px-3 mb-2 md:mb-0">
                  <Form.Item name="description">
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
