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
    const data = { data: values };
    const endpoint = process.env.NEXT_PUBLIC_URL + "/locations";
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
      toast.success("Data Lokasi berhasil ditambahkan!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      res.error?.details.errors.map((error) => {
        const ErrorMsg = error.path[0];
        console.log(ErrorMsg);
        toast.error(ErrorMsg === 'location_id' ? "Lokasi yang dimasukkan sudah ada. Silahkan coba yang lain":  "Tidak dapat menambahkan Lokasi", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Tambahkan Lokasi</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Tambahkan Lokasi"} />
          <LayoutContent>
            <Form
              form={form}
              name="add_lokasi"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="location_id"
                    rules={[
                      {
                        required: true,
                        message: "Lokasi ID tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input style={{ height: "50px" }} placeholder="Lokasi ID" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Nama Lokasi tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "50px" }}
                      placeholder="Nama Lokasi"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item name="street">
                    <Input style={{ height: "50px" }} placeholder="Alamat" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item name="city">
                    <Input style={{ height: "50px" }} placeholder="Kota" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item name="province">
                    <Input style={{ height: "50px" }} placeholder="Provinsi" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item name="country">
                    <Input style={{ height: "50px" }} placeholder="Negara" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item name="postal_code">
                    <Input style={{ height: "50px" }} placeholder="Kode Pos" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item name="phone">
                    <Input style={{ height: "50px" }} placeholder="No.Telp" />
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
