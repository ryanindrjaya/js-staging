import { useRef, useState } from "react";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import {
  Button,
  Form,
  Input,
  message,
  Upload,
  notification,
  Image,
} from "antd";
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
import UnitTable from "../../../components/ReactDataTable/Product/UnitsTable";
import { FileImageOutlined } from "@ant-design/icons";
import setDiskonValue from "./utility/setDiskonValue";
import setHargaValue, { setHargaNew } from "./utility/setHargaValue";
import ConfirmDialog from "../../../components/Alert/ConfirmDialog";
import debounce from "./utility/debounce";
import UploadDokumen from "../../../components/ReactDataTable/Product/UploadDokumen";

const Tambah = ({ props }) => {
  const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const [uploadedOnce, setUploadedOnce] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [statusSKU, setStatusSKU] = useState({
    status: "",
    message: "",
  });
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [firstInput, setFirstInputDiskon] = useState(true);
  const cookies = nookies.get(null, "token");
  const router = useRouter();
  const submitBtn = useRef();

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

  const [descUnit, setDescUnit] = useState();
  const [file, setFile] = useState();

  const imageLoader = ({ src }) => {
    return BASE_API + image;
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
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
      setFile();
    },

    onChange(info) {
      if (info.file.status !== "removed") {
        setFile(info.file.originFileObj);
        setFileList([info.file]);
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
          setLoading(false);
          setImage(url);
        });
      }
    },
  };

  const onFinish = async (values) => {
    setLoading(true);

    console.log(values);
    // return;

    // if (selectedSubCategory === 0) {
    //   message.error(
    //     `Sub Kategori tidak ditemukan pada Induk Kategori. Silahkan cek kembali`
    //   );
    // }

    // const categoryID = {
    //   id: parseInt(values?.category_id),
    // };

    // const subCategoryID = {
    //   id: values?.subCategories,
    // };

    // const manufacturesID = {
    //   id: values?.manufactures,
    // };

    // const groupID = {
    //   id: values?.groups,
    // };

    // const locationsID = values.locations.map((locationId) => locationId);

    // delete values.category_id;
    // delete values.subCategories;
    // delete values.manufactures;
    // delete values.groups;
    // delete values.locations;

    const relationData = {
      category: values.category_id,
      sub_category: values.subCategories,
      manufacture: values.manufactures,
      group: values.groups,
      locations: values.locations,
    };

    const data = {
      ...values,
      ...relationData,
    };

    const formData = new FormData();
    if (file) {
      console.log("file ->", file);
      formData.append("files.image", file);
    }

    formData.append("data", JSON.stringify(data));

    // POST DATA
    try {
      const postRes = await handlePostData(formData);
      console.log(postRes);

      if (postRes?.data?.attributes) {
        setImage();
        form.resetFields();
        setDescUnit();
        setFileList([]);
        setUploadedOnce(true);
        setSelectedManufactures({});
        setSelectedSubCategory();
        setSelectedGroup({});
        setSelectLocation({});
        toast.success("Produk berhasil ditambahkan!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        postRes?.error.details.errors.forEach((element) => {
          toast.error(element, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

    setLoading(false);
  };

  const handlePostData = async (data) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/products";
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
      body: data,
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    return res;
  };

  const handlePutData = async (id, data) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/products/" + id;

    const dataPut = { data: data };
    for (const key in data) {
      if (data[key].id === undefined || data[key].id === NaN) {
        delete data[key];
      }
    }

    const JSONdata = JSON.stringify(dataPut);

    console.log(dataPut);

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
        // router.reload();
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

  const checkSKU = async (value) => {
    setStatusSKU({ status: "validating", message: "" });

    const endpoint =
      process.env.NEXT_PUBLIC_URL + "/products?filters[SKU][$eq]=" + value;
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (req.status === 200) {
      if (res.data.length > 0) {
        setStatusSKU({ status: "error", message: "SKU sudah digunakan" });
      } else {
        setStatusSKU({ status: "success", message: "" });
      }
    } else {
      setStatusSKU({
        status: "error",
        message: "Error ketika mengambil data SKU",
      });
    }
  };

  const handleValueChange = async (changedValues, allValues) => {
    const fieldName = Object.keys(changedValues)[0];
    const unitArr = fieldName.split("_");
    const unit = unitArr[unitArr.length - 1];

    // check SKU
    if (fieldName === "SKU" && allValues.SKU !== "") {
      debounce(checkSKU, 1000)(allValues.SKU);
    } else if (fieldName === "SKU" && allValues.SKU === "") {
      setStatusSKU({ status: "error", message: "SKU tidak boleh kosong" });
    }

    setDiskonValue(form, changedValues, allValues, fieldName, firstInput);
    setHargaValue(form, changedValues, allValues, unit, firstInput);
  };

  const getDescriptionUnit = () => {
    const unitText = form.getFieldsValue([
      "unit_1",
      "qty_1",
      "unit_2",
      "qty_2",
      "unit_3",
      "qty_3",
      "unit_4",
      "qty_4",
      "unit_5",
      "qty_5",
    ]);

    let unit1 = `${unitText.qty_1 ?? ""} ${unitText.unit_1 ?? ""} `;
    let unit2 = `${unitText.qty_2 ?? ""} ${unitText.unit_2 ?? ""} `;
    let unit3 = `${unitText.qty_3 ?? ""} ${unitText.unit_3 ?? ""} `;
    let unit4 = `${unitText.qty_4 ?? ""} ${unitText.unit_4 ?? ""} `;
    let unit5 = `${unitText.qty_5 ?? ""} ${unitText.unit_5 ?? ""} `;

    let descUnit = unit1 + unit2 + unit3 + unit4 + unit5;
    setDescUnit(descUnit);
  };

  const onFinishFailed = () => {
    const error = form.getFieldsError();
    error.forEach((value) => {
      if (value.errors.length !== 0) {
        let errorMsg = value.errors[0];
        notification["error"]({
          message: "Field Masih Kosong",
          description: errorMsg,
        });
      }
    });
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
              encType="multipart/form-data"
              form={form}
              name="add_product"
              initialValues={{
                remember: true,
              }}
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              onValuesChange={handleValueChange}
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
                      onKeyDown={(e) =>
                        e.key == "Enter" ? e.preventDefault() : ""
                      }
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
                    category={category}
                    subCategories={subCategories}
                    onSelect={setSelectedSubCategory}
                    selectedSubCategory={selectedSubCategory}
                  />
                  <Form.Item name="description">
                    <TextArea rows={4} placeholder="Deskripsi" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="SKU"
                    hasFeedback
                    validateStatus={statusSKU.status}
                    help={statusSKU.message}
                    rules={[
                      {
                        required: true,
                        message: "SKU tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      onKeyDown={(e) =>
                        e.key == "Enter" ? e.preventDefault() : ""
                      }
                      style={{ height: "40px" }}
                      placeholder="SKU"
                    />
                  </Form.Item>
                  <Manufactures
                    data={manufactures.data}
                    selectedManufactures={selectedManufactures}
                    onSelect={setSelectedManufactures}
                  />
                  <Groups
                    data={groups}
                    selectedGroups={selectedGroups}
                    onSelect={setSelectedGroup}
                  />
                  <Locations
                    data={locations}
                    onSelect={setSelectLocation}
                    required={true}
                  />
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
                        style={{ width: "100%" }}
                        preview={false}
                        src={image}
                      />
                    )}
                  </Dragger>
                </div>
              </div>

              <div>
                <h6 className="">HARGA</h6>
              </div>
              <UnitTable
                getDescUnit={getDescriptionUnit}
                descUnit={descUnit}
                form={form}
              />

              <Form.Item className="mt-5">
                {loading ? (
                  <div className=" flex float-left ml-3 ">
                    <Spin />
                  </div>
                ) : (
                  <>
                    <ConfirmDialog
                      onConfirm={() => submitBtn?.current?.click()}
                      onCancel={() => {}}
                      title="Tambah Produk"
                      message="Apakah anda yakin ingin menambahkan produk ini?"
                      component={
                        <Button className=" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1">
                          Simpan
                        </Button>
                      }
                    />
                    <Button htmlType="submit" ref={submitBtn}></Button>
                  </>
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

  if (
    reqCategories.status !== 200 ||
    reqGroups.status !== 200 ||
    reqLocations.status !== 200 ||
    reqManufactures.status !== 200 ||
    reqSubCategories.status !== 200
  ) {
    context.res.writeHead(302, {
      Location: "/signin?session=false",
      "Content-Type": "text/html; charset=utf-8",
    });
    context?.res?.end();

    return {};
  }

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
