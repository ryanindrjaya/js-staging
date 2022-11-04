import { useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { Button, Form, Input, message, Upload, Space } from "antd";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Spin, Row } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import { FileImageOutlined } from "@ant-design/icons";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import Categories from "../../../../components/Form/AddProduct/Categories";
import Manufactures from "../../../../components/Form/AddProduct/Manufactures";
import SubCategories from "../../../../components/Form/AddProduct/subCategories";
import Groups from "../../../../components/Form/AddProduct/Groups";
import Locations from "../../../../components/Form/AddProduct/Locations";
import UnitTable from "../../../../components/ReactDataTable/Product/UnitsTable";

const Edit = ({ props }) => {
  const productId = props?.product.data.id;
  const product = props?.product?.data;
  const manufactures = props?.manufactures;
  const groups = props?.groups;
  const locations = props?.locations;
  const initCategory = product?.attributes?.category?.data;
  const subCategory = product?.attributes?.sub_category?.data;

  const [image, setImage] = useState(product.attributes?.image?.data ? product.attributes?.image?.data[0].attributes : null);

  const [category, setCategory] = useState();
  const [idCategory, setIdCategory] = useState(initCategory.id);
  const [uploadedOnce, setUploadedOnce] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const cookies = nookies.get(null, "token");
  const router = useRouter();

  const { Dragger } = Upload;
  const { TextArea } = Input;

  const [selectedManufactures, setSelectedManufactures] = useState({});
  const [selectedGroups, setSelectedGroup] = useState({});
  const [selectLocations, setSelectLocation] = useState();

  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState();

  function locationsList() {
    const locationNameList = [];
    locations.data.forEach((element) => {
      locationNameList.push(element.attributes.name);
    });

    return locationNameList;
  }

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

  const categoryChecker = (values) => {
    if (values.category_id === `${initCategory.attributes.category_id} - ${initCategory.attributes.name}`) {
      console.log("category tidak berubah. jadikan id");
      values.category_id = idCategory;
    } else {
      console.log("category berubah. jadikan tipe int");
      values.category_id = parseInt(values.category_id);
    }

    return values;
  };

  const subCategoryChecker = (values) => {
    console.log("checker ", values.subCategories, subCategory);
    if (values.subCategories === subCategory?.attributes.name) {
      console.log("sub category tidak berubah. jadikan id");
      values.subCategories = subCategory.id;
    } else if (!subCategory) {
      console.log("tidak ada datanya cuy");
    } else {
      console.log("sub category berubah. jadikan tipe int");
      values.subCategories = parseInt(values.subCategories);
    }

    return values;
  };

  const onFinish = async (values) => {
    setLoading(true);
    console.log("values submit location", values.locations);
    values = categoryChecker(values);
    values = subCategoryChecker(values);

    const categoryID = {
      id: parseInt(values?.category_id),
    };

    const subCategoryID = {
      id: values?.subCategories ?? null,
    };

    const manufacturesID = {
      id: values?.manufactures,
    };

    const groupID = {
      id: values?.groups,
    };

    values.locations =
      values?.locations?.map((location) => {
        if (location.value) {
          return { id: location.value };
        }

        return { id: location };
      }) || [];

    delete values.category_id;
    delete values.subCategories;
    delete values.manufactures;
    delete values.groups;

    const putData = {
      // ...values,
      category: categoryID,
      sub_category: subCategoryID,
      manufacture: manufacturesID,
      group: groupID,
      image: { id: image?.id },
    };

    if (putData.sub_category.id === "") {
      delete putData.sub_category;
    }

    console.log("tester", putData);

    // remove undefined or null value from data
    for (const key in values) {
      if (values[key] === undefined || values[key] === null) {
        delete values[key];
      }
    }

    // remove undefined or null value from data
    for (const key in putData) {
      if (putData[key].id === undefined || putData[key].id === NaN) {
        delete putData[key];
      }
    }

    const data = {
      ...values,
      ...putData,
    };

    console.log("data", data);

    for (let index = 1; index < 6; index++) {
      if (data[`purchase_discount_${index}`] === "-") delete data[`purchase_discount_${index}`];
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

    const endpoint = process.env.NEXT_PUBLIC_URL + "/products/" + productId;
    const req = await fetch(endpoint, options);
    const res = await req.json();

    console.log("dataput ", dataPut);
    console.log(req);
    console.log(res);

    if (req.status === 200) {
      toast.success("Produk berhasil diperbarui!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.push("/dashboard/produk");
    } else {
      console.log(res);
      toast.error("Tidak dapat memperbarui Produk", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Edit Produk</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Edit Produk"} />
          <LayoutContent>
            <Form
              form={form}
              name="edit_product"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="name"
                    initialValue={product?.attributes?.name}
                    rules={[
                      {
                        required: true,
                        message: "Nama Produk tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input style={{ height: "40px" }} placeholder="Nama Produk" />
                  </Form.Item>
                  <Categories
                    initialValue={`${initCategory.attributes.category_id} - ${initCategory.attributes.name}`}
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
                    initialValue={`${product.attributes?.sub_category?.data?.attributes.name ?? ""}`}
                  />
                  <Form.Item name="description" initialValue={product.attributes?.description ?? ""}>
                    <TextArea rows={4} placeholder="Deskripsi" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="SKU"
                    rules={[
                      {
                        required: true,
                        message: "SKU tidak boleh kosong!",
                      },
                    ]}
                    initialValue={product.attributes?.SKU ?? ""}
                  >
                    <Input style={{ height: "40px" }} placeholder="SKU" />
                  </Form.Item>
                  <Manufactures
                    data={manufactures.data}
                    initialValue={product.attributes?.manufacture?.data?.id}
                    onSelect={setSelectedManufactures}
                  />
                  <Groups data={groups} onSelect={setSelectedGroup} initialValue={product.attributes?.group?.data?.id} />
                  <Locations data={locations} onSelect={setSelectLocation} initialValue={product.attributes?.locations.data} />
                </div>

                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Dragger {...propsDagger}>
                    {image == null ? (
                      <>
                        <p className="ant-upload-drag-icon">
                          <FileImageOutlined />
                        </p>
                        <p className="ant-upload-text">Klik atau tarik gambar ke kotak ini</p>
                        <p className="ant-upload-hint  m-3">Gambar akan digunakan sebagai contoh tampilan produk</p>
                      </>
                    ) : (
                      <Image layout="fill" loader={imageLoader} src={process.env.BASE_URL + image?.url} />
                    )}
                  </Dragger>
                </div>
              </div>

              <div>
                <h6 className="">HARGA</h6>
              </div>

              <UnitTable initialValue={product.attributes} />

              <Form.Item className="mt-5">
                {loading ? (
                  <div className=" flex float-left ml-3 ">
                    <Spin />
                  </div>
                ) : (
                  <Button htmlType="submit" className=" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1">
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

Edit.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const reqProduct = await fetchProduct(cookies, context);
  const product = await reqProduct.json();

  const categoryId = product.data.attributes.category.data?.id;

  const reqCategories = await fetchDataCategories(cookies);
  const categories = await reqCategories.json();

  const reqGroups = await fetchDataGroups(cookies);
  const groups = await reqGroups.json();

  const reqLocations = await fetchDataLocations(cookies);
  const locations = await reqLocations.json();

  const reqManufactures = await fetchDataManufactures(cookies);
  const manufactures = await reqManufactures.json();

  const reqSubCategories = await fetchDataSubCategories(cookies, categoryId);
  const subCategories = await reqSubCategories.json();

  return {
    props: {
      product,
      categories,
      groups,
      locations,
      manufactures,
      subCategories,
    },
  };
};

const fetchProduct = async (cookies, context) => {
  const id = context.query.id;
  const endpoint = process.env.NEXT_PUBLIC_URL + "/products/" + id + "?populate=*";
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

const fetchDataSubCategories = async (cookies, categoryId) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/sub-categories?populate[category][filters][id][$eq]=" + categoryId;
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

export default Edit;
