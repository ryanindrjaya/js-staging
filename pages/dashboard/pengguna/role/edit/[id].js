import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import { Button, Checkbox, Form, Input } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useRouter } from "next/router";

const Edit = ({ props }) => {
  const initialData = props.data;
  const moduls = props.modules?.data || [];
  console.log(props);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const cookies = nookies.get(null, "token");

  const onFinish = async (values) => {
    setLoading(true);

    const moduls = values.moduls_data;

    values.moduls = moduls.map((item) => parseInt(item.split("|")[0]));
    values.permissions_data = moduls.map((item) => item.split("|")[1]);

    delete values.moduls_data;

    const endpoint = process.env.NEXT_PUBLIC_URL + `/moduls/roles/${initialData.id}`;
    const JSONdata = JSON.stringify(values);

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

    console.log("res", res);

    if (req.status === 200) {
      form.resetFields();
      toast.success("Role berhasil diubah!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.replace(
        {
          pathname: "/dashboard/pengguna/role",
        },
        undefined,
        { shallow: true }
      );
    } else {
      toast.error("Tidak dapat mengubah Role baru", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Edit Role</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Edit Role"} />
          <LayoutContent>
            <Form layout="vertical" form={form} name="add_role" initialValues={initialData} onFinish={onFinish}>
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
                  <Checkbox.Group
                    className="w-full grid grid-cols-4 gap-y-3"
                    style={{ width: "100%" }}
                    options={moduls.map((item) => ({
                      label: item?.attributes?.name,
                      value: `${item.id}|${item?.attributes?.api}`,
                    }))}
                  />
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

Edit.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const initialData = await fetchData(cookies, `/moduls/roles/${id}`);
  const resInitialData = await initialData.json();

  const data = {
    ...resInitialData,
    moduls_data: resInitialData?.moduls?.map((item) => `${item.id}|${item?.api}`),
  };

  const reqModules = await fetchData(cookies, "/moduls");
  const resModules = await reqModules.json();

  return {
    props: {
      data: data,
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

export default Edit;
