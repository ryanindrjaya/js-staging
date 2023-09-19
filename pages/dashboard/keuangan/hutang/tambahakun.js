import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import DebtTable from "../../../../components/ReactDataTable/Cost/DebtAccountTable";
import Coa from "@iso/components/Form/AddCost/SearchCOA";
import { UserOutlined, ShopOutlined, BankOutlined } from "@ant-design/icons";
import { Button, Select, Form, Input, InputNumber, notification } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useRouter } from "next/router";

const Tambah = ({ props }) => {
  const [form] = Form.useForm();
  const user = props.user;
  const coa = props.coa?.data;
  console.log(coa, "coa");
  const [loading, setLoading] = useState(false);
  const [selectLocations, setSelectLocation] = useState({});
  const { TextArea } = Input;
  const cookies = nookies.get(null, "token");
  const router = useRouter();

  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  // NO Akun
  var noAkun = String(props.akun?.meta?.pagination.total + 1).padStart(3, "0");
  const [kodeAkun, setKodeAkun] = useState(`AH/ET/${user.id}/${noAkun}/${mm}/${yyyy}`);
  //Akun COA
  const [akunCOA, setAkunCOA] = useState();

  const [selectedType, setSelectedType] = useState(null);

  const onFinish = async (values) => {
    setLoading(true);
    values.setting = false;
    values.chart_of_account = values.akun;
    var data = { data: values };

    const endpoint = process.env.NEXT_PUBLIC_URL + "/debt-accounts";
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
      openNotificationWithIcon(
        "success",
        "Berhasil menambah data",
        "Akun hutang telah berhasil ditambahkan. Silahkan cek kembali akun hutang"
      );
      router.replace("/dashboard/keuangan/hutang/setting");
    } else {
      //res.error?.details.errors.map((error) => {
      //  const ErrorMsg = error.path[0];
      toast.error("Tidak dapat menambahkan Akun Hutang", {
        position: toast.POSITION.TOP_RIGHT,
      });
      openNotificationWithIcon(
        "error",
        "Tidak dapat menambah data",
        "Akun hutang tidak berhasil ditambahkan. Silahkan cek kembali akun hutang"
      );
      //});
    }

    setLoading(false);
  };

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  //const getRole = async (roleId) => {
  //  const endpoint =
  //    process.env.NEXT_PUBLIC_URL + "/users-permissions/roles/" + roleId;
  //  const options = {
  //    method: "GET",
  //    headers: {
  //      "Content-Type": "application/json",
  //      Authorization: "Bearer " + cookies.token,
  //    },
  //  };

  //  const req = await fetch(endpoint, options);
  //  const res = await req.json();

  //  return res.role;
  //};

  return (
    <>
      <Head>
        <title>Tambahkan Akun</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Tambahkan Akun"} />
          <LayoutContent>
            <Form
              form={form}
              name="add_akun"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="kode"
                    rules={[
                      {
                        required: true,
                        message: "Kode akun tidak boleh kosong!",
                      },
                    ]}
                    initialValue={kodeAkun}
                  >
                    <Input
                      style={{ height: "50px" }}
                      prefix={<ShopOutlined style={{ fontSize: "150%" }} className="site-form-item-icon mr-5" />}
                      placeholder="Kode Akun"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="nama"
                    rules={[
                      {
                        required: true,
                        message: "Nama tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "50px" }}
                      prefix={<UserOutlined style={{ fontSize: "150%" }} className="site-form-item-icon mr-5" />}
                      placeholder="Nama Akun"
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-2">
                <Form.Item name="type" className="w-1/4 mb-5 ml-4">
                  <Select size="large" placeholder="Type" onChange={setSelectedType}>
                    <Select.Option value="Master" key="Master">
                      Master
                    </Select.Option>
                    <Select.Option value="Tunai" key="Tunai">
                      Tunai
                    </Select.Option>
                    <Select.Option value="Transfer" key="Transfer">
                      Bank Transfer
                    </Select.Option>
                    <Select.Option value="Giro" key="Giro">
                      Bank Giro
                    </Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item name="chart_of_account" className="w-1/4 mb-5 ml-5">
                  <Coa onChange={setAkunCOA} selectedAkun={akunCOA} />
                </Form.Item>
              </div>

              <div className="w-full mt-1 flex justify-between">
                <Form.Item name="deskripsi" className="w-full mx-2">
                  <TextArea rows={4} placeholder="Deskripsi" />
                </Form.Item>
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

Tambah.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  let data;

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqAkun = await fetchAkun(cookies);
  const akun = await reqAkun.json();

  const reqCOA = await fetchCOA(cookies);
  const coa = await reqCOA.json();

  return {
    props: {
      data,
      user,
      akun,
      coa,
      //locations: resLocations,
    },
  };
};

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me?populate=*";
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

const fetchAkun = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/debt-accounts?populate=*";
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

const fetchCOA = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/chart-of-accounts?populate=*&filters[jenis_akun][$eq]=true";
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
//const fetchData = async (cookies, url) => {
//  const endpoint = process.env.NEXT_PUBLIC_URL + url;
//  const options = {
//    method: "GET",
//    headers: {
//      "Content-Type": "application/json",
//      Authorization: "Bearer " + cookies.token,
//    },
//  };

//  const req = await fetch(endpoint, options);
//  return req;
//};

export default Tambah;
