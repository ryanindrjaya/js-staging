import nookies from "nookies";
import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { Button, Select, Form, Input } from "antd";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useRouter } from "next/router";
import DashboardLayout from "../../../../../containers/DashboardLayout/DashboardLayout";
import TitlePage from "../../../../../components/TitlePage/TitlePage";
import AsyncSelect from "react-select/async";

const Edit = ({ props }) => {
  const categories = props?.categories?.data;
  const subCategory = props?.subCategory.data;
  const categorySelected = subCategory.attributes.category.data;
  // const [categoryId, setCategoryId] = useState(categorySelected.id);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(categorySelected.id);

  const { TextArea } = Input;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const cookies = nookies.get(null, "token");
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    const categoryID = {
      id: parseInt(values.category_id),
    };

    delete values.category_id;
    const dataValues = { ...values, category: categoryID };
    const data = { data: dataValues };
    const endpoint = process.env.NEXT_PUBLIC_URL + "/sub-categories/" + subCategory.id;
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
      toast.success("Sub Kategori berhasil diperbarui!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      res.error?.details?.errors.map((error) => {
        const ErrorMsg = error.path[0];
        toast.error(ErrorMsg === "sub_id" ? "ID Sub Kategori udah digunakan" : "Tidak dapat menambahkan Sub Kategori", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    }

    setLoading(false);
  };

  const fetchCategory = async (query, callback) => {
    if (!query) {
      callback([]);
    } else {
      try {
        const endpoint =
          process.env.NEXT_PUBLIC_URL + `/categories?filters[$or][0][name][$contains]=${query}&filters[$or][1][category_id][$contains]=${query}`;
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
        <title>Edit Sub Kategori</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Edit Sub Kategori"} />
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
                <Form.Item name="category_id" initialValues={categorySelected.id} className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Select
                    defaultValue={`${categorySelected.attributes.category_id} - ${categorySelected.attributes.name}`}
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
                    initialValue={subCategory.attributes.sub_id}
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
                    initialValue={subCategory.attributes.name}
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Nama Sub tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input style={{ height: "50px" }} placeholder="Nama Sub Kategori" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-full px-3 mb-2 md:mb-0">
                  <Form.Item name="description" initialValue={subCategory.attributes.description}>
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

  const endpoint = process.env.NEXT_PUBLIC_URL + "/sub-categories/" + id + "?populate=*";

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };
  const res = await fetch(endpoint, options);
  const subCategory = await res.json();

  const resCategory = await fetchCategory(cookies);
  const categories = await resCategory.json();

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
      subCategory,
      categories,
    },
  };
};

const fetchCategory = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/categories?populate=*";
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
