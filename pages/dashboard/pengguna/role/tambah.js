import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import { Button, Card, Checkbox, Form, Input } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin } from "antd";

const Tambah = ({ props }) => {
  const moduls = props.modules || {};
  console.log(props);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState({});
  const cookies = nookies.get(null, "token");

  console.log("moduls", moduls);

  const onFinish = async (values) => {
    setLoading(true);

    const moduls = values.moduls_data;

    // manual parsing
    values.moduls = moduls.map((item) => parseInt(item.split("|")[0]));
    values.permissions_data = moduls.map((item) => item.split("|")[1]);

    delete values.moduls_data;

    const endpoint = process.env.NEXT_PUBLIC_URL + "/moduls/roles";
    const JSONdata = JSON.stringify(values);

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

    console.log("res", res);

    if (req.status === 200) {
      form.resetFields();
      toast.success("Role berhasil ditambahkan!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("Tidak dapat menambahkan Role baru", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Tambahkan Role</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Tambahkan Role"} />
          <LayoutContent>
            <Form
              layout="vertical"
              form={form}
              name="add_role"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="w-full flex flex-col md:flex-row gap-4">
                <Form.Item
                  className="w-full md:w-1/2"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Nama role tidak boleh kosong!",
                    },
                  ]}
                >
                  <Input style={{ height: "50px" }} placeholder="Nama Role" />
                </Form.Item>
                <Form.Item
                  className="w-full md:w-1/2"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Deskripsi tidak boleh kosong!",
                    },
                  ]}
                >
                  <Input style={{ height: "50px" }} placeholder="Deskripsi" />
                </Form.Item>
              </div>

              <div className="w-full flex gap-4">
                <Form.Item
                  className="w-full"
                  name="moduls_data"
                  rules={[
                    {
                      required: true,
                      message: "Modul tidak boleh kosong!",
                    },
                  ]}
                  label="Hak Akses"
                >
                  <Checkbox.Group>
                    <div className="w-full grid grid-cols-3 gap-2">
                      {Object.entries(moduls).map(([key, value]) => {
                        if (value?.length > 0) {
                          // has children
                          return (
                            <Card>
                              <div className="w-full flex items-center mb-1 gap-x-2">
                                <p className="mb-0 font-bold text-lg">{key}</p>
                              </div>
                              <div className="w-full grid grid-cols-2 gap-x-3">
                                {value.map((item) => {
                                  return (
                                    <Checkbox className="m-0" value={`${item.id}|${item?.attributes?.api}`}>
                                      <span className="text-gray-500">{item?.attributes?.name}</span>
                                    </Checkbox>
                                  );
                                })}
                              </div>
                            </Card>
                          );
                        } else {
                          // no children
                          return (
                            <Card>
                              <p className="mb-1 font-bold text-lg">{key}</p>

                              <div className="w-full grid grid-cols-4 gap-y-3">
                                <Checkbox className="m-0" value={`${value.id}|${value?.attributes?.api}`}>
                                  <span className="text-gray-500">{value?.attributes?.name}</span>
                                </Checkbox>
                              </div>
                            </Card>
                          );
                        }
                      })}
                    </div>
                  </Checkbox.Group>
                </Form.Item>
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

  const reqModules = await fetchData(cookies, "/moduls");
  const resModules = await reqModules.json();

  console.log("resModules", resModules);

  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      console.log("result", result);
      if (!currentValue?.attributes[key]) {
        result[currentValue?.attributes.uid] = currentValue;

        return result;
      } else {
        (result[currentValue?.attributes[key]] = result[currentValue?.attributes[key]] || []).push(currentValue);
        return result;
      }
    }, {});
  };

  const grouped = groupBy(resModules?.data ?? [], "parent_modul");

  return {
    props: {
      modules: grouped,
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
