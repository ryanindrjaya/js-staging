import { useEffect, useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "../../../components/TitlePage/TitlePage";
import { UserOutlined, ShopOutlined } from "@ant-design/icons";
import { Button, Select, Form, Input, InputNumber, Modal } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useRouter } from "next/router";

const Tambah = ({ props }) => {
  const [form] = Form.useForm();
  const { wilayah, area, users = [] } = props;
  const [loading, setLoading] = useState(false);
  const [customerType, setCustomerType] = useState("TOKO");
  const [showForm, setShowForm] = useState({
    area: false,
    npwp: false,
  });

  const cookies = nookies.get(null, "token");
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    values.tipe_penjualan_query = values.tipe_penjualan?.map((item) => item).join(", ");
    var data = { data: values };

    const endpoint = process.env.NEXT_PUBLIC_URL + "/customers";
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
      toast.success("Data Customer berhasil ditambahkan!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.replace("/dashboard/customer");
    } else {
      //res.error?.details.errors.map((error) => {
      //  const ErrorMsg = error.path[0];
      toast.error("Tidak dapat menambahkan Customer", {
        position: toast.POSITION.TOP_RIGHT,
      });
      //});
    }

    setLoading(false);
  };

  const getLatestCustomerCode = async (value) => {
    let code = "";

    switch (value) {
      case "TOKO":
        return;
      case "PANEL":
        code = "PA";
        break;
      case "NON PANEL":
        code = "TS";
        break;
      case "SALES":
        code = "SO";
        break;
      case "KARYAWAN":
        return;
      default:
        return;
    }

    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      "/customers?sort[0]=createdAt:desc&pagination[limit]=1&filters[code][$contains]=" +
      code;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    console.log(res);

    if (req.status === 200) {
      const lastCustomer = res.data[0];
      const lastCustomerId = parseInt(lastCustomer?.attributes?.code?.split(code)[1] || 0);

      return lastCustomerId + 1;
    } else {
      toast.error("Tidak dapat menambahkan Customer", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const setCustomerCode = async (value) => {
    setCustomerType(value);
    form.setFieldsValue({
      customer_type: value,
    });
    let code = "";

    const latestNumber = await getLatestCustomerCode(value);

    switch (value) {
      case "TOKO":
        code = "WALK IN CUSTOMER";
        break;
      case "PANEL":
        code = "PA" + String(latestNumber).padStart(5, "0");
        break;
      case "NON PANEL":
        code = "TS" + String(latestNumber).padStart(5, "0");
        break;
      case "SALES":
        code = "SO" + String(latestNumber).padStart(5, "0");
        break;
      case "KARYAWAN":
        code = "";
        break;
      default:
        code = "WALK IN CUSTOMER";
        break;
    }

    if (value === "TOKO") {
      form.setFieldsValue({
        tipe_penjualan: ["TOKO"],
        name: null,
        address: null,
        phone: null,
        city: null,
        description: null,
      });
      setShowForm({
        area: false,
        npwp: false,
      });
    } else {
      const tokoIndex = form.getFieldValue("tipe_penjualan").indexOf("TOKO");
      console.log("tokoIndex", tokoIndex);
      if (tokoIndex > -1) {
        const old = form.getFieldsValue().tipe_penjualan;
        const newValue = old.filter((item) => item !== "TOKO");
        console.log("newValue", newValue);
        form.setFieldsValue({
          tipe_penjualan: newValue,
        });
      }
    }

    form.setFieldsValue({
      code: code,
    });
  };

  return (
    <>
      <Head>
        <title>Tambahkan Customer</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Tambahkan Customer"} />
          <LayoutContent>
            <Form
              form={form}
              name="add_user"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              {/* GENERAL FORM */}
              <div className="flex md:flex-row flex-col gap-x-10 w-full">
                <Form.Item
                  className="w-full"
                  name="code"
                  initialValue="WALK IN CUSTOMER"
                  rules={[
                    {
                      required: true,
                      message: "Kode Customer tidak boleh kosong!",
                    },
                  ]}
                >
                  <Input readOnly={customerType !== "KARYAWAN"} placeholder="Kode Customer *" required />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Nama Customer tidak boleh kosong!",
                    },
                  ]}
                >
                  <Input
                    disabled={customerType === "TOKO"}
                    placeholder="Nama Customer *"
                    onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                    required
                  />
                </Form.Item>
              </div>

              <div className="flex md:flex-row flex-col gap-x-10 w-full">
                <Form.Item
                  className="w-full"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Alamat Customer tidak boleh kosong!",
                    },
                  ]}
                >
                  <Input
                    onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                    disabled={customerType === "TOKO"}
                    placeholder="Alamat *"
                    required
                  />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: "Kota tidak boleh kosong!",
                    },
                  ]}
                >
                  <Input
                    onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                    disabled={customerType === "TOKO"}
                    placeholder="Kota *"
                    required
                  />
                </Form.Item>
              </div>

              <div className="flex md:flex-row flex-col gap-x-10 w-full">
                <Form.Item
                  className="w-full"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Nomor Telepon tidak boleh kosong!",
                    },
                    {
                      pattern: new RegExp(/^[0-9\b]+$/),
                      message: "Nomor Telepon hanya boleh angka!",
                    },
                  ]}
                >
                  <Input disabled={customerType === "TOKO"} placeholder="Telepon *" required />
                </Form.Item>
                <Form.Item className="w-full" name="description">
                  <Input
                    onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                    disabled={customerType === "TOKO"}
                    placeholder="Deskripsi"
                  />
                </Form.Item>
              </div>

              <div className="flex md:flex-row flex-col gap-x-10 w-full">
                <Form.Item
                  className="w-full relative"
                  name="customer_type"
                  rules={[
                    {
                      required: true,
                      message: "Golongan Customer tidak boleh kosong!",
                    },
                  ]}
                  initialValue="TOKO"
                >
                  <Select defaultValue={"TOKO"} onChange={setCustomerCode} placeholder="Golongan Customer *">
                    <Select.Option value="PANEL">PANEL</Select.Option>
                    <Select.Option value="NON PANEL">NON PANEL</Select.Option>
                    <Select.Option value="SALES">SALES</Select.Option>
                    <Select.Option value="KARYAWAN">KARYAWAN</Select.Option>
                    <Select.Option value="TOKO">TOKO</Select.Option>
                  </Select>
                  <span className="absolute -top-5 border-none text-sm left-0 text-gray-400 z-40">
                    Golongan Customer
                  </span>
                </Form.Item>
                <Form.Item
                  className="w-full"
                  name="tipe_penjualan"
                  rules={[
                    {
                      required: true,
                      message: "Tipe Penjualan tidak boleh kosong!",
                    },
                  ]}
                  initialValue={["TOKO"]}
                >
                  <Select disabled={customerType === "TOKO"} placeholder="Tipe Penjualan *" mode="multiple">
                    <Select.Option value="PANEL">PANEL</Select.Option>
                    <Select.Option value="NON PANEL">NON PANEL</Select.Option>
                    <Select.Option value="SALES">SALES</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              {/* AREA SALES & KREDIT LIMIT */}
              <div
                className={`w-full flex mb-3 justify-center border-b ${
                  customerType !== "TOKO" ? "border-b-[#036b82]" : ""
                }`}
              >
                <Button
                  disabled={customerType === "TOKO"}
                  onClick={() =>
                    setShowForm({
                      ...showForm,
                      area: !showForm.area,
                    })
                  }
                  className={`${
                    customerType !== "TOKO"
                      ? "text-white hover:bg-cyan-700/90 focus:bg-cyan-700 bg-cyan-700 border"
                      : ""
                  } w-3/4 md:w-1/4 `}
                  type="primary"
                >
                  AREA SALES & KREDIT LIMIT
                </Button>
              </div>

              {/* AREA SALES */}
              <div hidden={!showForm.area}>
                <div className="flex md:flex-row flex-col gap-x-10 w-full">
                  <Form.Item className="w-full" name="sales_name">
                    <Select
                      optionFilterProp="children"
                      filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input)}
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      showSearch
                      options={users}
                      placeholder="Nama Sales"
                      allowClear
                    />
                  </Form.Item>
                  <Form.Item className="w-full pointer-events-none hidden md:block opacity-0">
                    <Input disabled />
                  </Form.Item>
                </div>

                <div className="flex md:flex-row flex-col gap-x-10 w-full">
                  <Form.Item className="w-full" name="area">
                    <Select showSearch placeholder="Area">
                      {area.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.attributes.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item className="w-full" name="wilayah">
                    <Select showSearch placeholder="Wilayah">
                      {wilayah.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.attributes.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <div className="flex md:flex-row flex-col gap-x-10 w-full">
                  <Form.Item className="w-full" name="credit_limit">
                    <InputNumber
                      className="w-full"
                      disabled={customerType === "TOKO"}
                      placeholder="Batas Kredit"
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => parseInt(value.replace(/(,*)/g, ""))}
                      controls={false}
                    />
                  </Form.Item>
                  <Form.Item className="w-full">
                    <Input.Group compact>
                      <Form.Item noStyle className="w-full relative" name="credit_limit_duration">
                        <InputNumber
                          onChange={(e) => form.setFieldsValue({ credit_limit_duration: e })}
                          defaultValue={0}
                          disabled={customerType === "TOKO"}
                          style={{ width: "30%" }}
                        />
                        <span className="absolute -top-5 border-none text-sm left-0 text-gray-400 z-40">
                          Termin Pembayaran
                        </span>
                      </Form.Item>
                      <Form.Item noStyle className="w-full" name="credit_limit_duration_type" initialValue="Hari">
                        <Select disabled={customerType === "TOKO"} style={{ width: "70%" }} defaultValue="Hari">
                          <Select.Option value="Hari">Hari</Select.Option>
                          <Select.Option value="Bulan">Bulan</Select.Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </div>

                <div className="flex md:flex-row flex-col gap-x-10 w-full">
                  <Form.Item className="w-full" name="saldo_awal">
                    <InputNumber
                      className="w-full"
                      disabled={customerType === "TOKO"}
                      placeholder="Saldo Awal"
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => parseInt(value.replace(/(,*)/g, ""))}
                      controls={false}
                    />
                  </Form.Item>
                  <Form.Item className="w-full pointer-events-none hidden md:block opacity-0">
                    <Input disabled />
                  </Form.Item>
                </div>
              </div>

              {/* NPWP */}
              <div
                className={`w-full flex mb-3 justify-center border-b ${
                  customerType !== "TOKO" ? "border-b-[#036b82]" : ""
                }`}
              >
                <Button
                  disabled={customerType === "TOKO"}
                  onClick={() =>
                    setShowForm({
                      ...showForm,
                      npwp: !showForm.npwp,
                    })
                  }
                  className={`${
                    customerType !== "TOKO"
                      ? "text-white hover:bg-cyan-700/90 focus:bg-cyan-700 bg-cyan-700 border"
                      : ""
                  } w-3/4 md:w-1/4 `}
                  type="primary"
                >
                  Data NPWP & NIK
                </Button>
              </div>

              <div hidden={!showForm.npwp}>
                <div className="flex md:flex-row flex-col gap-x-10 w-full">
                  <Form.Item className="w-full" name="nama_npwp">
                    <Input onInput={(e) => (e.target.value = e.target.value.toUpperCase())} placeholder="Nama NPWP" />
                  </Form.Item>
                  <Form.Item className="w-full" name="nomor_npwp">
                    <Input onInput={(e) => (e.target.value = e.target.value.toUpperCase())} placeholder="Nomor NPWP" />
                  </Form.Item>
                </div>

                <div className="flex md:flex-row flex-col gap-x-10 w-full">
                  <Form.Item className="w-full" name="alamat_npwp">
                    <Input onInput={(e) => (e.target.value = e.target.value.toUpperCase())} placeholder="Alamat NPWP" />
                  </Form.Item>
                  <Form.Item className="w-full pointer-events-none hidden md:block opacity-0">
                    <Input onInput={(e) => (e.target.value = e.target.value.toUpperCase())} disabled />
                  </Form.Item>
                </div>

                <div className="flex md:flex-row flex-col gap-x-10 w-full">
                  <Form.Item className="w-full" name="nik">
                    <Input onInput={(e) => (e.target.value = e.target.value.toUpperCase())} placeholder="Nomor NIK" />
                  </Form.Item>
                  <Form.Item className="w-full pointer-events-none hidden md:block opacity-0">
                    <Input onInput={(e) => (e.target.value = e.target.value.toUpperCase())} disabled />
                  </Form.Item>
                </div>
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

  const req = await fetchData(cookies, "/areas");
  const res = await req.json();

  const reqWilayah = await fetchData(cookies, "/wilayahs");
  const resWilayah = await reqWilayah.json();

  const userEntity = await fetchData(cookies, "/users").then((res) => res.json());
  console.log("userEntity", userEntity);
  const users = userEntity?.map((user) => ({
    value: user.name,
    label: user.name,
  }));

  return {
    props: {
      area: res.data,
      wilayah: resWilayah.data,
      users,
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
