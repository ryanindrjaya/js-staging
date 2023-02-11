import nookies from "nookies";
import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import { UserOutlined, ShopOutlined } from "@ant-design/icons";
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

  //const role = props?.role?.roles;
  const customer = props?.data; console.log("cust",customer)
  //const userRole = props?.user.role;
  //const userLocation = props?.user.locations;
  //const locations = props?.locations;

  const onFinish = async (values) => {
    setLoading(true);
    //const role = await getRole(values.role_id);
    var data = { data: values};

    //let newLocation = [];
    //try {
    //  data.locations.forEach((element) => {
    //    if (element.value) {
    //      newLocation.push(element.value);
    //    } else{
    //      newLocation.push(element);
    //    }
    //  });
    //} catch (error) {
    //  console.log("no location detected");
    //}

    //data.locations = newLocation;
    //console.log(data);

    const endpoint = process.env.NEXT_PUBLIC_URL + "/customers/" + customer.data.id;
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
      router.replace("/dashboard/customer");
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
        <title>Edit Pengguna</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Edit Pengguna"} />
          <LayoutContent>
            <Form
              form={form}
              name="add_customer"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    initialValue={customer?.data?.attributes.name}
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
                      prefix={
                        <UserOutlined
                          style={{ fontSize: "150%" }}
                          className="site-form-item-icon mr-5"
                        />
                      }
                      placeholder="Nama"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="address"
                    initialValue={customer?.data?.attributes.address}
                    rules={[
                      {
                        required: true,
                        message: "Alamat tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "50px" }}
                      prefix={
                        <ShopOutlined
                          style={{ fontSize: "150%" }}
                          className="site-form-item-icon mr-5"
                        />
                      }
                      placeholder="Alamat"
                    />
                  </Form.Item>
                </div>
              </div>

              {/*<Form.Item*/}
              {/*  name="role_id"*/}
              {/*  className="w-1/4 mb-5 ml-1"*/}
              {/*  initialValue={userRole.id}*/}
              {/*>*/}
              {/*  <Select placeholder="Role">*/}
              {/*    {role.map((role) =>*/}
              {/*      role.name === "Authenticated" || role.name === "Public" ? (*/}
              {/*        <Select.Option hidden disabled={true} value={role.id}>*/}
              {/*          {role.name}*/}
              {/*        </Select.Option>*/}
              {/*      ) : (*/}
              {/*        <Select.Option value={role.id}>{role.name}</Select.Option>*/}
              {/*      )*/}
              {/*    )}*/}
              {/*  </Select>*/}
              {/*</Form.Item>*/}

              <Form.Item name="type" className="w-1/4 mb-5 ml-1">
                <Select size="large" placeholder="Type">
                  <Select.Option value="Toko" key="Toko">
                    Toko
                  </Select.Option>
                  <Select.Option value="Sales" key="Sales">
                    Sales
                  </Select.Option>
                  <Select.Option value="Panel" key="Panel">
                    Panel
                  </Select.Option>
                  <Select.Option value="Dokter" key="Dokter">
                    Dokter
                  </Select.Option>
                </Select>
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

  const endpoint = process.env.NEXT_PUBLIC_URL + "/customers/" + id + "?populate=*";

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };
  const res = await fetch(endpoint, options);
  const data = await res.json();

  //const resRole = await fetchRole(cookies);
  //const role = await resRole.json();

  //const reqLocations = await fetchDataLocation(cookies, "/locations");
  //const resLocations = await reqLocations.json();

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
      //role,
      //locations: resLocations,
    },
  };
};

//const fetchRole = async (cookies) => {
//  const endpoint = process.env.NEXT_PUBLIC_URL + "/users-permissions/roles";
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

//const fetchDataLocation = async (cookies, url) => {
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

export default Edit;
