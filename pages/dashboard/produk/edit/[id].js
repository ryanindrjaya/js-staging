import { useRef, useState, useEffect } from "react";
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
import { useRouter } from "next/router";
import { FileImageOutlined } from "@ant-design/icons";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import Categories from "../../../../components/Form/AddProduct/Categories";
import Manufactures from "../../../../components/Form/AddProduct/Manufactures";
import SubCategories from "../../../../components/Form/AddProduct/subCategories";
import Groups from "../../../../components/Form/AddProduct/Groups";
import Locations from "../../../../components/Form/AddProduct/Locations";
import UnitTable from "../../../../components/ReactDataTable/Product/UnitsTable";
import ConfirmDialog from "../../../../components/Alert/ConfirmDialog";
import setHargaValue from "../utility/setHargaValue";
import setDiskonValue from "../utility/setDiskonValue";

const Edit = ({ props }) => {
  const productId = props?.product?.data?.id;
  const product = props?.product?.data;
  const manufactures = props?.manufactures;
  const groups = props?.groups;
  const locations = props?.locations;
  const initCategory = product?.attributes?.category?.data;
  const subCategory = product?.attributes?.sub_category?.data;
  const initManufacture = product?.attributes?.manufacture?.data;
  const initGroup = product?.attributes?.group?.data;
  const NEXT_PUBLIC_URL = process.env.IMAGE_URL;

  const [image, setImage] = useState(
    product.attributes?.image?.data
      ? product.attributes?.image?.data?.attributes
      : null
  );

  const [category, setCategory] = useState();
  const [idCategory, setIdCategory] = useState(initCategory?.id);
  const [idManufacture, setIdManufacture] = useState(initManufacture?.id);
  const [uploadedOnce, setUploadedOnce] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [firstInput, setFirstInputDiskon] = useState(true);
  const [file, setFile] = useState();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const cookies = nookies.get(null, "token");
  const router = useRouter();
  const submitBtn = useRef();

  const { Dragger } = Upload;
  const { TextArea } = Input;

  const [selectedManufactures, setSelectedManufactures] = useState({});
  const [selectedGroups, setSelectedGroup] = useState({});
  const [selectLocations, setSelectLocation] = useState();

  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [products, setProducts] = useState(props.products);

  const [descUnit, setDescUnit] = useState();

  function locationsList() {
    const locationNameList = [];
    locations.data.forEach((element) => {
      locationNameList.push(element.attributes.name);
    });

    return locationNameList;
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const imageLoader = ({ src }) => {
    return image?.url ? NEXT_PUBLIC_URL + image?.url : image;
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

  const categoryChecker = (values) => {
    if (
      values.category_id ===
      `${initCategory.attributes.category_id} - ${initCategory.attributes.name}`
    ) {
      values.category_id = idCategory;
    } else {
      values.category_id = parseInt(values.category_id);
    }

    return values;
  };

  const subCategoryChecker = (values) => {
    if (values.subCategories === subCategory?.attributes.name) {
      values.subCategories = subCategory.id;
    } else if (!subCategory) {
    } else {
      values.subCategories = parseInt(values.subCategories);
    }

    return values;
  };

  const manufactureChecker = (values) => {
    if (values.manufactures === initManufacture?.attributes.name) {
      values.manufactures = initManufacture.id;
    } else if (!initManufacture) {
    } else {
      values.manufactures = parseInt(values.manufactures);
    }

    return values;
  };

  const groupChecker = (values) => {
    if (values.groups === initGroup?.attributes.name) {
      values.groups = initGroup.id;
    } else if (!initGroup) {
    } else {
      values.groups = parseInt(values.groups);
    }

    return values;
  };

  const deleteOldImage = async (id) => {
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/upload/files/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    };

    const response = await fetch(endpoint, options);
    const data = await response.json();

    return data;
  };

  const onFinish = async (values) => {
    console.log("values", values);

    setLoading(true);
    values = categoryChecker(values);
    values = subCategoryChecker(values);
    values = manufactureChecker(values);
    values = groupChecker(values);

    const categoryID = {
      id: parseInt(values?.category_id),
    };

    const subCategoryID = {
      id: parseInt(values?.subCategories) ?? null,
    };

    const manufacturesID = {
      id: parseInt(values?.manufactures),
    };

    const groupID = {
      id: parseInt(values?.groups),
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
    };

    if (putData.sub_category.id === "") {
      delete putData.sub_category;
    }

    // remove undefined or null value from data
    for (const key in values) {
      if (values[key] === undefined || values[key] === null) {
        delete values[key];
      }
    }

    // remove undefined or null value from data
    for (const key in putData) {
      if (putData[key]?.id === null || isNaN(putData[key]?.id)) {
        delete putData[key];
      }
    }

    values.pricelist_1 = parseFloat(values.pricelist_1);
    values.pricelist_2 = parseFloat(values.pricelist_2);
    values.pricelist_3 = parseFloat(values.pricelist_3);
    values.pricelist_4 = parseFloat(values.pricelist_4);
    values.pricelist_5 = parseFloat(values.pricelist_5);

    values.purchase_discount_1 = parseFloat(values.purchase_discount_1);
    values.purchase_discount_2 = parseFloat(values.purchase_discount_2);
    values.purchase_discount_3 = parseFloat(values.purchase_discount_3);
    values.purchase_discount_4 = parseFloat(values.purchase_discount_4);
    values.purchase_discount_5 = parseFloat(values.purchase_discount_5);

    values.sold_price_1 = parseFloat(values.sold_price_1);
    values.sold_price_2 = parseFloat(values.sold_price_2);
    values.sold_price_3 = parseFloat(values.sold_price_3);
    values.sold_price_4 = parseFloat(values.sold_price_4);
    values.sold_price_5 = parseFloat(values.sold_price_5);

    values.buy_price_1 = parseFloat(values.buy_price_1);
    values.buy_price_2 = parseFloat(values.buy_price_2);
    values.buy_price_3 = parseFloat(values.buy_price_3);
    values.buy_price_4 = parseFloat(values.buy_price_4);
    values.buy_price_5 = parseFloat(values.buy_price_5);

    const data = {
      ...values,
      ...putData,
    };

    console.log(data);

    for (let index = 1; index < 6; index++) {
      if (data[`purchase_discount_${index}`] === "-")
        delete data[`purchase_discount_${index}`];
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    if (file) {
      if (product.attributes?.image?.data) {
        // delete old image
        const deleteImage = await deleteOldImage(
          product.attributes?.image?.data.id
        );
        console.log("deleteImage", deleteImage);
      }
      formData.append("files.image", file);
    }

    const options = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
      body: formData,
    };

    const endpoint = process.env.NEXT_PUBLIC_URL + "/products/" + productId;
    const req = await fetch(endpoint, options);
    const res = await req.json();

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

  const handleValueChange = (changedValues, allValues) => {
    const fieldName = Object.keys(changedValues)[0];
    const unitArr = fieldName.split("_");
    const unit = unitArr[unitArr.length - 1];

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

  useEffect(() => {
    let productCode = product.attributes.SKU;
    let categoryCode = String(productCode).slice(0, 1);
    let groupCode = String(productCode).slice(1, 3);
    let manufactureCode = String(productCode).slice(3, 7);
    let manufacturesData = "00";

    products?.data?.forEach((element) => {
      if (
        element.attributes.manufacture.data.id == selectedManufactures &&
        element.attributes.group.data.id == selectedGroups &&
        element.attributes.category.data.id == category
      ) {
        manufacturesData++;
      }
    });

    manufacturesData = String(manufacturesData + 1).padStart(3, "0");

    groups.data.forEach((element) => {
      if (element.id == selectedGroups) groupCode = element.attributes.code;
    });

    manufactures.data.forEach((element) => {
      if (element.id == selectedManufactures)
        manufactureCode = element.attributes.code;
    });

    groupCode = String(groupCode).padStart(2, "0");
    manufactureCode = String(manufactureCode).padStart(4, "0");

    if (category) categoryCode = category[0]?.category.category_id;

    productCode = categoryCode + groupCode + manufactureCode + manufacturesData;

    form.setFieldsValue({ SKU: productCode });
  }, [category, selectedManufactures, selectedGroups]);

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
              onFinishFailed={onFinishFailed}
              onValuesChange={handleValueChange}
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
                    <Input
                      style={{ height: "40px" }}
                      placeholder="Nama Produk"
                    />
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
                    category={product.attributes?.category?.data}
                    subCategories={subCategories}
                    onSelect={setSelectedSubCategory}
                    selectedSubCategory={selectedSubCategory}
                    initialValue={`${
                      product.attributes?.sub_category?.data?.attributes.name ??
                      ""
                    }`}
                  />
                  <Manufactures
                    data={manufactures.data}
                    initialValue={product.attributes?.manufacture?.data}
                    onSelect={setSelectedManufactures}
                  />
                  <Groups
                    data={groups}
                    onSelect={setSelectedGroup}
                    initialValue={product.attributes?.group?.data}
                  />
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
                  <Locations
                    required={true}
                    data={locations}
                    onSelect={setSelectLocation}
                    initialValue={product.attributes?.locations.data}
                  />
                  <Form.Item
                    name="description"
                    initialValue={product.attributes?.description ?? ""}
                  >
                    <TextArea rows={7} placeholder="Deskripsi" />
                  </Form.Item>
                </div>

                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0 pb-4">
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
                        src={image?.url ? NEXT_PUBLIC_URL + image?.url : image}
                      />
                    )}
                  </Dragger>
                </div>
              </div>

              <div>
                <h6 className="">HARGA</h6>
              </div>

              <UnitTable
                initialValue={product.attributes}
                getDescUnit={getDescriptionUnit}
                descUnit={descUnit}
              />

              <Form.Item>
                {loading ? (
                  <div className=" flex float-left ml-3 ">
                    <Spin />
                  </div>
                ) : (
                  <>
                    <ConfirmDialog
                      onConfirm={() => submitBtn?.current?.click()}
                      onCancel={() => {}}
                      title="Edit Produk"
                      message="Apakah anda yakin ingin mengedit produk ini?"
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

Edit.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const reqProduct = await fetchProduct(cookies, context);
  const product = await reqProduct.json();

  const reqProducts = await fetchDataProduct(cookies, context);
  const products = await reqProducts.json();

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

  if (reqProduct.status !== 200) {
    context.res.writeHead(302, {
      Location: "/signin?session=false",
      "Content-Type": "text/html; charset=utf-8",
    });
    context?.res?.end();

    return {};
  }

  return {
    props: {
      product,
      products,
      categories,
      groups,
      locations,
      manufactures,
      subCategories,
    },
  };
};

const fetchProduct = async (cookies, context) => {
  const id = context?.query?.id;
  const endpoint =
    process.env.NEXT_PUBLIC_URL + "/products/" + id + "?populate=*";
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

const fetchDataProduct = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/products?populate=deep";
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
  const endpoint =
    process.env.NEXT_PUBLIC_URL +
    "/sub-categories?populate[category][filters][id][$eq]=" +
    categoryId;
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
