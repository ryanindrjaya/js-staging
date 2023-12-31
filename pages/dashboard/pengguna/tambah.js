import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "../../../components/TitlePage/TitlePage";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Select, Form, Input } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin } from "antd";
import Locations from "../../../components/Form/Locations";

const Tambah = ({ props }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectLocations, setSelectLocation] = useState({});
  const [code, setCode] = useState(null);
  const cookies = nookies.get(null, "token");
  const role = props?.data?.roles;

  const modules = props?.modules?.data || [];
  const locations = props?.locations;

  const checkCode = async (e) => {
    if (!e.target.value) return setCode(null);

    setCode({
      available: "validating",
      message: "Memeriksa kode pengguna...",
    });

    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      `/users?filters[codename]=${e.target.value}&pagination[page]=1&pagination[pageSize]=1`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    console.log("respon check code", res);

    if (res && res?.length === 0) {
      setCode({ available: "success", message: "Kode tersedia" });
    } else {
      setCode({ available: "error", message: "Kode tidak tersedia" });
    }
  };

  const onFinish = async (values) => {
    setLoading(true);

    console.log("values ==> \n", values);
    const role = await getRole(values.role_id);
    const locationsID = [];
    for (let index = 0; index < values.locations.length; index++) {
      locationsID.push({ id: values.locations[index] });
    }
    const data = { ...values, role: role.id, locations: locationsID, deleteAble: true };

    const endpoint = process.env.NEXT_PUBLIC_URL + "/auth/local/register";
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
    const resPost = await req.json();

    if (req.status === 200) {
      // update role
      const endpoint = process.env.NEXT_PUBLIC_URL + "/users/" + resPost?.user?.id;
      const JSONdata = JSON.stringify({ role: role.id });

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

      console.log("respon update role", res);

      form.resetFields();
      toast.success("Data Pengguna berhasil ditambahkan!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      res.error?.details.errors.map((error) => {
        const ErrorMsg = error.path[0];
        toast.error("Tidak dapat menambahkan Pengguna", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });

      console.log(res);
    }

    setLoading(false);
  };

  const getRole = async (roleId) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/users-permissions/roles/" + roleId;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    return res.role;
  };

  return (
    <>
      <Head>
        <title>Tambahkan Pengguna</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Tambahkan Pengguna"} />
          <LayoutContent>
            <Form
              form={form}
              name="add_user"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Username tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "50px" }}
                      prefix={<UserOutlined style={{ fontSize: "150%" }} className="site-form-item-icon mr-5" />}
                      placeholder="Username"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="name"
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
                      placeholder="Nama"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="codename"
                    rules={[
                      {
                        required: true,
                        message: "Kode Pengguna tidak boleh kosong!",
                      },
                    ]}
                    // help={code?.message}
                    // validateStatus={code ? code?.available : null}
                    // hasFeedback
                  >
                    <Input
                      // capitalize
                      onInput={(e) => {
                        e.target.value = e.target.value.toUpperCase();
                      }}
                      maxLength={3}
                      // onChange={checkCode}
                      style={{ height: "50px" }}
                      prefix={<UserOutlined style={{ fontSize: "150%" }} className="site-form-item-icon mr-5" />}
                      placeholder="Kode Pengguna"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Email tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "50px" }}
                      prefix={<MailOutlined style={{ fontSize: "150%" }} className="site-form-item-icon mr-5" />}
                      placeholder="Email"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Password tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input.Password
                      style={{ height: "50px" }}
                      prefix={<LockOutlined style={{ fontSize: "150%" }} className="site-form-item-icon mr-5" />}
                      placeholder="Kata Sandi"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="confirm"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Konfirmasi Kata Sandi diperlukan",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject(new Error("Kata Sandi tidak cocok!"));
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      style={{ height: "50px" }}
                      prefix={<LockOutlined style={{ fontSize: "150%" }} className="site-form-item-icon mr-5" />}
                      placeholder="Konfirmasi Kata Sandi"
                    />
                  </Form.Item>
                </div>
              </div>

              <Locations data={locations} onSelect={setSelectLocation} errMsg={"Harap pilih lokasi user"} required />

              <div className="w-full md:w-1/2 flex gap-x-3">
                <Form.Item name="role_id" className="w-full">
                  <Select size="large" placeholder="Role">
                    {role.map((role) =>
                      role.name === "Authenticated" || role.name === "Public" ? (
                        <Select.Option hidden disabled={true} value={role.id}>
                          {role.name}
                        </Select.Option>
                      ) : (
                        <Select.Option value={role.id}>{role.name}</Select.Option>
                      )
                    )}
                  </Select>
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

  const req = await fetchData(cookies, "/users-permissions/roles?populate=*");
  data = await req.json();

  const reqLocations = await fetchData(cookies, "/locations");
  const resLocations = await reqLocations.json();

  const reqModules = await fetchData(cookies, "/moduls");
  const resModules = await reqModules.json();

  return {
    props: {
      data,
      locations: resLocations,
      modules: resModules,
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
