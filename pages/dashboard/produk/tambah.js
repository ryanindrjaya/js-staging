import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { Button, Form, Input, message, Upload, Space } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin, Row } from "antd";
import DashboardLayout from "../../../containers/DashboardLayout/DashboardLayout";
import TitlePage from "../../../components/TitlePage/TitlePage";
import Categories from "../../../components/Form/AddProduct/Categories";
import Manufactures from "../../../components/Form/AddProduct/Manufactures";
import SubCategories from "../../../components/Form/AddProduct/subCategories";
import Groups from "../../../components/Form/AddProduct/Groups";
import Locations from "../../../components/Form/AddProduct/Locations";
import { useRouter } from "next/router";
import Image from "next/image";
import UnitTable from "../../../components/ReactDataTable/Product/UnitsTable";
import { FileImageOutlined } from "@ant-design/icons";

const Tambah = ({ props }) => {
  const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const [uploadedOnce, setUploadedOnce] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const cookies = nookies.get(null, "token");
  const router = useRouter();

  const { Dragger } = Upload;
  const { TextArea } = Input;

  const manufactures = props.manufactures;
  const groups = props.groups;
  const locations = props.locations;

  const [selectedManufactures, setSelectedManufactures] = useState({});
  const [selectedGroups, setSelectedGroup] = useState({});
  const [selectLocations, setSelectLocation] = useState({});

  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState();

  const imageLoader = ({ src }) => {
    return process.env.BASE_URL + image?.url;
  };

  const propsDagger = {
    name: "files",
    multiple: false,
    fileList: fileList,
    showUploadList: {
      showDownloadIcon: false,
      showRemoveIcon: true,
    },

    onRemove(info) {
      setUploadedOnce(true);
      setImage();
      setFileList([]);
    },

    async onChange(info) {
      if (info.fileList.length === 1) {
        const endpoint = process.env.NEXT_PUBLIC_URL + "/upload";
        const file = info.file.originFileObj;
        const data = new FormData();
        data.append("files", file);

        setFileList(info.fileList);

        const options = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
          body: data,
        };

        if (uploadedOnce) {
          setUploadedOnce(false);
          const req = await fetch(endpoint, options);
          const res = await req.json();

          if (req.status === 200) {
            setImage(res[0]);

            message.success(`${info.file.name} berhasil diupload`);
          } else {
            message.error(`${info.file.name} gagal upload`);
          }
        }
      } else if (info.fileList.length === 0) {
        message.info(`Gambar berhasil dihapus`);
      } else {
        message.error(`Hanya dapat menambahkan 1 gambar`);
      }
    },
  };

  const onFinish = async (values) => {
    setLoading(true);

    // if (selectedSubCategory === 0) {
    //   message.error(
    //     `Sub Kategori tidak ditemukan pada Induk Kategori. Silahkan cek kembali`
    //   );
    // }

    const categoryID = {
      id: parseInt(values?.category_id),
    };

    const subCategoryID = {
      id: values?.subCategories,
    };

    const manufacturesID = {
      id: values?.manufactures,
    };

    const groupID = {
      id: values?.groups,
    };

    const locationsID = [];
    for (let index = 0; index < values.locations.length; index++) {
      locationsID.push({ id: values.locations[index] });
    }

    delete values.locations;
    delete values.category_id;
    delete values.subCategories;
    delete values.manufactures;
    delete values.groups;

    const postData = {
      ...values,
    };

    const putData = {
      category: categoryID,
      sub_category: subCategoryID,
      manufacture: manufacturesID,
      group: groupID,
      locations: locationsID,
      image: { id: image?.id },
    };

    // POST DATA
    const postRes = await handlePostData(postData);

    // PUT DATA
    await handlePutData(postRes?.data?.id, putData);

    setLoading(false);
  };

  const handlePostData = async (data) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/products";
    const dataPost = { data: data };
    const JSONdata = JSON.stringify(dataPost);
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

    return res;
  };

  const handlePutData = async (id, data) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/products/" + id;

    for (const key in data) {
      if (data[key].id === undefined || data[key].id === NaN) {
        delete data[key];
      }
    }

    const dataPut = { data: data };
    const JSONdata = JSON.stringify(dataPut);

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSONdata,
    };

    try {
      const req = await fetch(endpoint, options);
      const res = await req.json();

      if (req.status === 200) {
        setImage();
        form.resetFields();
        toast.success("Produk berhasil ditambahkan!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.reload();
      } else {
        res?.error?.details?.errors.map((error) => {
          const ErrorMsg = error.path[0];
          toast.error(
            ErrorMsg === "SKU"
              ? "SKU sudah digunakan"
              : "Tidak dapat menambahkan Produk",
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
        });
      }
    } catch (error) {
      toast.error("Tidak dapat menambahkan Produk", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Tambahkan Produk</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Tambahkan Produk"} />
          <LayoutContent>
            <Form
              form={form}
              name="add_product"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Nama Produk tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "40px" }}
                      placeholder="Nama Produk"
                    />
                  </Form.Item>
                  <Categories
                    selectedCategory={category}
                    onSelectCategory={setCategory}
                    setSubCategories={setSubCategories}
                    setSelectedSubCategory={setSelectedSubCategory}
                    selectedSubCategory={selectedSubCategory}
                  />
                  <SubCategories
                    subCategories={subCategories}
                    onSelect={setSelectedSubCategory}
                    selectedSubCategory={selectedSubCategory}
                  />
                  <Form.Item name="description">
                    <TextArea rows={4} placeholder="Deskripsi" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item name="SKU">
                    <Input style={{ height: "40px" }} placeholder="SKU" />
                  </Form.Item>
                  <Manufactures
                    data={manufactures.data}
                    onSelect={setSelectedManufactures}
                  />
                  <Groups data={groups} onSelect={setSelectedGroup} />
                  <Locations data={locations} onSelect={setSelectLocation} />
                </div>

                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Dragger {...propsDagger}>
                    {image == null ? (
                      <>
                        <p className="ant-upload-drag-icon">
                          <FileImageOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Klik atau tarik gambar ke kotak ini
                        </p>
                        <p className="ant-upload-hint  m-3">
                          Gambar akan digunakan sebagai contoh tampilan produk
                        </p>
                      </>
                    ) : (
                      <Image
                        layout="fill"
                        loader={imageLoader}
                        src={process.env.BASE_URL + image?.url}
                      />
                    )}
                  </Dragger>
                </div>
              </div>

              <div>
                <h6 className="">HARGA</h6>
              </div>
              <UnitTable />

              <Form.Item className="mt-5">
                {loading ? (
                  <div className=" flex float-left ml-3 ">
                    <Spin />
                  </div>
                ) : (
                  <Button
                    htmlType="submit"
                    className=" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1"
                  >
                    Simpan
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

  const reqCategories = await fetchDataCategories(cookies);
  const categories = await reqCategories.json();

  const reqGroups = await fetchDataGroups(cookies);
  const groups = await reqGroups.json();

  const reqLocations = await fetchDataLocations(cookies);
  const locations = await reqLocations.json();

  const reqManufactures = await fetchDataManufactures(cookies);
  const manufactures = await reqManufactures.json();

  const reqSubCategories = await fetchDataSubCategories(cookies);
  const subCategories = await reqSubCategories.json();

  return {
    props: {
      categories,
      groups,
      locations,
      manufactures,
      subCategories,
    },
  };
};

const fetchDataCategories = async (cookies) => {
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

const fetchDataManufactures = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/manufactures";
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

const fetchDataSubCategories = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/sub-categories";
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

const fetchDataGroups = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/groups";
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

const fetchDataLocations = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/locations";
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
