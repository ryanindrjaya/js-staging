import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { Button, Form, Input, Select } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin } from "antd";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import AsyncSelect from "react-select/async";

const Tambah = ({ props }) => {
  const categories = props?.categories?.data;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState();

  const cookies = nookies.get(null, "token");
  const { TextArea } = Input;

  const onFinish = async (values) => {
    setLoading(true);

    const categoryID = {
      id: value,
    };

    delete values.category_id;
    const dataValues = { ...values, category: categoryID };
    const data = { data: dataValues };
    const endpoint = process.env.NEXT_PUBLIC_URL + "/sub-categories";
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
      toast.success("Sub Kategori berhasil ditambahkan!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      res.error?.details.errors.map((error) => {
        const ErrorMsg = error.path[0];
        toast.error(
          ErrorMsg === "sub_id"
            ? "ID Sub Kategori udah digunakan"
            : "Tidak dapat menambahkan Sub Kategori",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      });
    }

    setLoading(false);
  };

  const fetchCategory = async (query, callback, tindakan) => {
    if (!query) {
      callback([]);
    } else {
      try {
        const endpoint =
          process.env.NEXT_PUBLIC_URL +
          `/categories?filters[$or][0][name][$contains]=${query}&filters[$or][1][category_id][$contains]=${query}`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        };

        const req = await fetch(endpoint, options);
        const res = await req.json();

        if (req.status == 200) {
          const categoriesResult = res.data.map((categories) => ({
            label: `${categories.attributes.category_id} - ${categories.attributes.name}`,
            value: categories.id,
          }));

          console.log(categoriesResult);
          callback(categoriesResult);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSearch = (newValue) => {
    if (newValue) {
      fetchCategory(newValue, setData);
      console.log(data);
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const options = data.map((d) => <Option key={d.value}>{d.label}</Option>);

  return (
    <>
      <Head>
        <title>Tambahkan Sub Kategori</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Tambahkan Sub Kategori"} />
          <LayoutContent>
            <Form
              form={form}
              name="add_category"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <Form.Item
                  name="category_id"
                  className="w-full md:w-1/3 px-3 mb-2 md:mb-0"
                >
                  <Select
                    size="large"
                    showSearch
                    value={value}
                    showArrow={false}
                    placeholder="Pilih Induk Kategori"
                    onSearch={handleSearch}
                    onChange={handleChange}
                    filterOption={false}
                    defaultActiveFirstOption={false}
                  >
                    {options}
                  </Select>
                </Form.Item>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="sub_id"
                    rules={[
                      {
                        required: true,
                        message: "Sub ID tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input style={{ height: "50px" }} placeholder="Sub ID" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Nama Sub tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "50px" }}
                      placeholder="Nama Sub Kategori"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-full px-3 mb-2 md:mb-0">
                  <Form.Item name="description">
                    <TextArea rows={4} placeholder="Deskripsi" />
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

Tambah.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  let categories;

  const req = await fetchData(cookies);
  categories = await req.json();

  return {
    props: {
      categories,
    },
  };
};

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/categories";
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
