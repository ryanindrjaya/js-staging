import nookies from "nookies";
import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Select, Form, Input } from "antd";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useRouter } from "next/router";
import Locations from "../../../../components/Form/Locations";

const Edit = ({ props }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectLocations, setSelectLocation] = useState({});
  const cookies = nookies.get(null, "token");
  const router = useRouter();

  const role = props?.role?.roles;
  const user = props?.user;
  const userRole = props?.user.role;
  const userLocation = props?.user.locations;
  const locations = props?.locations;

  const onFinish = async (values) => {
    setLoading(true);
    const role = await getRole(values.role_id);
    const data = { ...values, role, deleteAble: true };

    let newLocation = [];
    try {
      data.locations.forEach((element) => {
        if (element.value) {
          newLocation.push(element.value);
        } else {
          newLocation.push(element);
        }
      });
    } catch (error) {
      console.log("no location detected");
    }

    data.locations = newLocation;
    console.log(data);

    const endpoint = process.env.NEXT_PUBLIC_URL + "/users/" + user.id;
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
      toast.success("Data Pengguna berhasil diperbarui!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("Tidak dapat memperbarui Pengguna", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log("error", res);
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
                    initialValue={user.username}
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Username tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      disabled
                      style={{ height: "50px" }}
                      prefix={<UserOutlined style={{ fontSize: "150%" }} className="site-form-item-icon mr-5" />}
                      placeholder="Username"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    initialValue={user.name}
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
                    name="email"
                    initialValue={user.email}
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
              </div>

              <Locations
                data={locations}
                onSelect={setSelectLocation}
                initialValue={userLocation}
                errMsg={"Harap pilih lokasi user"}
                required
              />

              <Form.Item name="role_id" className="w-1/4 mb-5 ml-1" initialValue={userRole.id}>
                <Select placeholder="Role">
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

  const endpoint = process.env.NEXT_PUBLIC_URL + "/users/" + id + "?populate=*";

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };
  const res = await fetch(endpoint, options);
  const user = await res.json();

  const resRole = await fetchRole(cookies);
  const role = await resRole.json();

  const reqLocations = await fetchDataLocation(cookies, "/locations");
  const resLocations = await reqLocations.json();

  if (res.status !== 200) {
  }

  return {
    props: {
      user,
      role,
      locations: resLocations,
    },
  };
};

const fetchRole = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users-permissions/roles";
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

const fetchDataLocation = async (cookies, url) => {
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

export default Edit;
