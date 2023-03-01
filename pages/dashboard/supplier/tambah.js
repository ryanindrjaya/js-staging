import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { Button, Form, Input, InputNumber, Select } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin } from "antd";
import DashboardLayout from "../../../containers/DashboardLayout/DashboardLayout";
import TitlePage from "../../../components/TitlePage/TitlePage";
import { useRouter } from "next/router";

const Tambah = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const cookies = nookies.get(null, "token");
  const { TextArea } = Input;
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    const data = { data: values };
    const endpoint = process.env.NEXT_PUBLIC_URL + "/suppliers";
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
      toast.success("Supplier berhasil ditambahkan!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.replace("/dashboard/supplier");
    } else {
      res.error?.details.errors.map((error) => {
        const ErrorMsg = error.path[0];

        toast.error(
          ErrorMsg === "id_supplier"
            ? "ID Supplier sudah digunakan"
            : "Tidak dapat menambahkan Supplier",
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
        <title>Tambahkan Supplier</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Tambahkan Supplier"} />
          <LayoutContent>
            <Form
              form={form}
              name="add_supplier"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="id_supplier"
                    rules={[
                      {
                        required: true,
                        message: "Supplier ID tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                      placeholder="Kode Supplier *"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Nama Supplier tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                      placeholder="Nama Supplier *"
                    />
                  </Form.Item>
                </div>
                <div className="w-full hidden md:block opacity-0 md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item>
                    <Input placeholder="" disabled />
                  </Form.Item>
                </div>

                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item name="phone">
                    <Input placeholder="Telepon *" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Alamat tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                      placeholder="Alamat"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Format email tidak sesuai!",
                      },
                    ]}
                  >
                    <Input placeholder="Email *" />
                  </Form.Item>
                </div>

                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item name="nomor_npwp">
                    <Input
                      onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                      placeholder="Nomor NPWP"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item name="nama_npwp">
                    <Input
                      onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                      placeholder="Nama NPWP"
                    />
                  </Form.Item>
                </div>
                <div className="w-full hidden md:block opacity-0 md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item>
                    <Input placeholder="" disabled />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item name="balance">
                    <InputNumber
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => parseInt(value.replace(/(,*)/g, ""))}
                      controls={false}
                      className="w-full"
                      placeholder="Saldo Awal"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item className="w-full">
                    <Input.Group compact>
                      <Form.Item noStyle className="w-full relative" name="credit_limit_duration">
                        <InputNumber
                          onChange={(e) => form.setFieldsValue({ credit_limit_duration: e })}
                          defaultValue={0}
                          style={{ width: "30%" }}
                        />
                        <span className="absolute -top-5 border-none text-sm left-0 text-gray-400 z-40">
                          Termin Pembayaran
                        </span>
                      </Form.Item>
                      <Form.Item
                        noStyle
                        className="w-full"
                        name="credit_limit_duration_type"
                        initialValue="Hari"
                      >
                        <Select style={{ width: "70%" }} defaultValue="Hari">
                          <Select.Option value="Hari">Hari</Select.Option>
                          <Select.Option value="Bulan">Bulan</Select.Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
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
