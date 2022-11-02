import nookies from "nookies";
import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useRouter } from "next/router";

const Edit = ({ props }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const location = props.locationData.data;
  const cookies = nookies.get(null, "token");
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    const data = { data: values };
    const endpoint = process.env.NEXT_PUBLIC_URL + "/locations/" + location.id;
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
      toast.success("Data Lokasi berhasil diperbarui!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      res.error?.details.errors.map((error) => {
        const ErrorMsg = error.path[0];
        console.log(ErrorMsg);
        toast.error(
          ErrorMsg === "location_id"
            ? "Lokasi yang dimasukkan sudah ada. Silahkan coba yang lain"
            : "Tidak dapat memperbarui Lokasi",
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
                    initialValue={location.attributes.location_id}
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
                    initialValue={location.attributes.name}
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
                  <Form.Item
                    name="street"
                    initialValue={location.attributes.street}
                  >
                    <Input style={{ height: "50px" }} placeholder="Alamat" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="city"
                    initialValue={location.attributes.city}
                  >
                    <Input style={{ height: "50px" }} placeholder="Kota" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="province"
                    initialValue={location.attributes.province}
                  >
                    <Input style={{ height: "50px" }} placeholder="Provinsi" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="country"
                    initialValue={location.attributes.country}
                  >
                    <Input style={{ height: "50px" }} placeholder="Negara" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="postal_code"
                    initialValue={location.attributes.postal_code}
                  >
                    <Input style={{ height: "50px" }} placeholder="Kode Pos" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="phone"
                    initialValue={location.attributes.phone}
                  >
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

Edit.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/locations/" + id;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };
  const res = await fetch(endpoint, options);
  const locationData = await res.json();

  return {
    props: {
      locationData,
    },
  };
};

export default Edit;
