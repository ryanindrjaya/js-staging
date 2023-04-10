import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import {
  Form,
  Input,
  DatePicker,
  Button,
  message,
  Upload,
  Select,
  Spin,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import nookies from "nookies";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import LoadingAnimations from "@iso/components/Animations/Loading";
import { useSelector, useDispatch } from "react-redux";
import calculatePrice from "../../utility/calculatePrice";
import DataReturTable from "../../../../../components/ReactDataTable/Purchases/DataReturTable";
import createDetailReturFunc from "../../utility/createReturDetail";
import createReturLPBFunc from "../../utility/createReturLPB";
import { useRouter } from "next/router";
import moment from "moment";

ReturLPB.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint =
    process.env.NEXT_PUBLIC_URL + "/purchasings/" + id + "?populate=deep";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };
  const res = await fetch(endpoint, options);
  const data = await res.json();

  const req = await fetchDataLocation(cookies);
  const locations = await req.json();

  const lpbPage = await fetchData(cookies);
  const dataLPBPage = await lpbPage.json();

  if (req.status !== 200) {
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
      locations,
      dataLPBPage,
    },
  };
};

const fetchDataLocation = async (cookies) => {
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

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/returs?populate=deep";
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

function ReturLPB({ props }) {
  const locations = props.locations.data;
  const data = props.data.data;
  var products = useSelector((state) => state.Order);

  const [listLPBdetail, setListLPBdetail] = useState([]);

  var selectedProduct = products?.productList;
  const dispatch = useDispatch();
  // Set data for show in table
  const [productList, setProductList] = useState([]);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  //const [supplier, setSupplier] = useState();
  //const [lpb, setLpb] = useState();
  const [dataValues, setDataValues] = useState();
  const [productTotalPrice, setProductTotalPrice] = useState({});
  const [productSubTotal, setProductSubTotal] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [listId, setListId] = useState([]);
  const router = useRouter();

  const tempList = [];
  const [isFetchinData, setIsFetchingData] = useState(false);
  const [locProduct, setLocProduct] = useState([]);
  const [expProduct, setExpProduct] = useState([]);
  const [batch, setBatch] = useState([]);

  var totalReturs = String(
    props.dataLPBPage?.meta?.pagination.total + 1
  ).padStart(3, "0");
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  const { TextArea } = Input;
  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  var formatterTotal = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onFinish = async (values) => {
    setLoading(true);
    setDataValues(values);
    setLoading(false);
  };

  const createDetailRetur = async () => {
    for (let index = 0; index < products.productList.length; index++) {
      if (dataValues.expired_date[index] == undefined)
        dataValues.expired_date[index] = expProduct[index];
      if (dataValues.product_location[index] == undefined)
        dataValues.product_location[index] = locProduct[index].data.id;
      if (dataValues.batch[index] == undefined)
        dataValues.batch[index] = batch[index];
    }

    createDetailReturFunc(
      products,
      productTotalPrice,
      productSubTotal,
      setListId,
      "/retur-details",
      dataValues
    );
  };

  const createRetur = async (values) => {
    values.supplier = data.attributes.supplier.data;
    values.location = data.attributes.location.data;
    values.status = "Draft";
    createReturLPBFunc(
      grandTotal,
      totalPrice,
      values,
      listId,
      form,
      router,
      data
    );
  };

  const onChangeProduct = async () => {
    var isDuplicatedData = false;

    tempList.find((item) => {
      productList.forEach((element) => {
        if (element.id === item.id) isDuplicatedData = true;
      });
    });

    if (!isDuplicatedData) {
      setProductList((productList) => [...productList, tempList[0]]);
      toast.success("Produk berhasil ditambahkan!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const calculatePriceAfterDisc = (row, index) => {
    const total = calculatePrice(
      row,
      products,
      productTotalPrice,
      productSubTotal,
      setTotalPrice,
      index
    );

    return formatter.format(total);
  };

  const fetchReturdata = async (data) => {
    //clearData();
    const dataLpb = data.data.data.attributes;
    const purchase_details = dataLpb.purchasing_details.data;

    dispatch({
      type: "SET_PREORDER_DATA",
      data: data.data,
    });

    purchase_details.forEach((element, index) => {
      console.log("el", element);
      var indexUnit = 1;
      var unitOrder = element.attributes.unit_order;
      var productUnit = element.attributes.product.data.attributes;

      var dateStringDetail = new Date(element.attributes.expired_date);
      var momentObjDetail = moment(dateStringDetail, "YYYY-MM-DD");
      var momentStringDetail = momentObjDetail.format("MM-DD-YYYY");

      locProduct.push(element.attributes.location);
      expProduct.push(moment(momentStringDetail));
      batch.push(element.attributes.batch);

      form.setFieldsValue({
        product_location: {
          [element.attributes.product.data.id]: element.attributes.location,
        },
        expired_date: {
          [element.attributes.product.data.id]: moment(momentStringDetail),
        },
        batch: {
          [element.attributes.product.data.id]: element.attributes.batch,
        },
      });

      for (let index = 1; index < 6; index++) {
        if (unitOrder === productUnit[`unit_${index}`]) {
          indexUnit = index;
        }
      }

      const productId = element.attributes.product.data.id;
      //var dateString = element.attributes.expired_date;
      //var momentObj = moment(dateString, "YYYY-MM-DD");
      //var momentString = momentObj.format("MM-DD-YYYY");

      var disc = 0;
      if (element.attributes.disc == null) {
        disc = 0;
      } else {
        disc = element.attributes.disc;
      }

      //SET INITIAL PRODUCT
      dispatch({
        type: "SET_INITIAL_PRODUCT",
        product: element.attributes.product.data,
        qty: parseInt(element.attributes.total_order),
        unit: element.attributes.unit_order,
        unitIndex: indexUnit,
        priceUnit: parseFloat(element.attributes.unit_price),
        disc: parseFloat(disc),
        priceAfterDisc: element.attributes.unit_price_after_disc,
        subTotal: element.attributes.sub_total,
        d1: element.attributes.dp1,
        d2: element.attributes.dp2,
        d3: element.attributes.dp3,
        index,
      });

      //products.productList.forEach((element) => {
      //  console.log("masuk");
      //  form.setFieldsValue({
      //    harga_satuan: {
      //      [element.id]: element.attributes.buy_price_1,
      //    },
      //  });
      //});
    });
    setTimeout(() => {
      setIsFetchingData(false);
    }, 3000);
  };

  const clearData = () => {
    dispatch({ type: "CLEAR_DATA" });
    setTotalPrice(0);
  };

  useEffect(() => {
    setGrandTotal(totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    setGrandTotal(totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    var total = 0;
    for (var key in productTotalPrice) {
      total = total + productTotalPrice[key];
    }
  }, [totalPrice]);

  useEffect(() => {
    if (listId.length > 0) {
      createRetur(dataValues);
    }
  }, [listId]);

  useEffect(() => {
    if (dataValues) createDetailRetur();
  }, [dataValues]);

  useEffect(() => {
    clearData();
    setIsFetchingData(true);
    fetchReturdata(props);
  }, []);

  const validateError = () => {
    var listError = form.getFieldsError();
    listError.forEach((element) => {
      if (element.errors[0]) {
        notification["error"]({
          message: "Field Kosong",
          description: element.errors[0],
        });
      }
    });
  };

  return (
    <>
      <Head>
        <title>Retur LPB</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Retur Lembar Pembelian Barang"} />
          <LayoutContent>
            <Form
              form={form}
              name="retur"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_retur"
                    initialValue={`RB/ET/${totalReturs}/${mm}/${yyyy}`}
                    rules={[
                      {
                        required: true,
                        message: "Nomor Retur tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input style={{ height: "40px" }} placeholder="No.Retur" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="tanggal_retur"
                    rules={[
                      {
                        required: true,
                        message: "Tanggal tidak boleh kosong!",
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="Tanggal Retur"
                      size="large"
                      format={"DD/MM/YYYY"}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-2/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="purchasing" initialValue={data.id}>
                    <p className="font-bold m-0">
                      No LPB : {data.attributes.no_purchasing}
                    </p>
                  </Form.Item>
                  <p className="font-bold m-0">
                    No Nota Supplier : {data.attributes.no_nota_suppplier}
                  </p>
                  <p className="font-bold m-0">
                    Tanggal Pembelian : {data.attributes.date_purchasing}
                  </p>
                </div>
                <div className="w-full md:w-3/4 px-3 mb-2 md:mb-0">
                  <p className="font-bold m-0">
                    Alamat Supplier :{" "}
                    {data.attributes.supplier.data.attributes.address}
                  </p>
                </div>
                <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">
                  <SearchBar
                    form={form}
                    tempList={tempList}
                    onChange={onChangeProduct}
                    selectedProduct={selectedProduct}
                  />
                </div>
                <div className="w-full md:w-4/4 px-3 mb-2 mt-2 md:mb-0">
                  {isFetchinData ? (
                    <div className="w-full md:w-4/4 px-3 mb-2 mt-5 mx-3  md:mb-0 text-lg">
                      <div className="w-36 h-36 flex p-4 max-w-sm mx-auto">
                        <LoadingAnimations />
                      </div>
                      <div className="text-sm align-middle text-center animate-pulse text-slate-400">
                        Sedang Mengambil Data
                      </div>
                    </div>
                  ) : (
                    <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">
                      <DataReturTable
                        products={products}
                        productTotalPrice={productTotalPrice}
                        setTotalPrice={setTotalPrice}
                        setProductTotalPrice={setProductTotalPrice}
                        setProductSubTotal={setProductSubTotal}
                        calculatePriceAfterDisc={calculatePriceAfterDisc}
                        productSubTotal={productSubTotal}
                        locations={locations}
                        formObj={form}
                        locProduct={locProduct}
                        expProduct={expProduct}
                        batch={batch}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-start md:justify-between">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="pajak"
                    rules={[
                      {
                        required: true,
                        message: "Pajak tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Pajak Pembelian"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option
                        value="Pajak Pembelian"
                        key="Pajak Pembelian"
                      >
                        Pajak Pembelian
                      </Select.Option>
                      <Select.Option value="Non Pajak" key="Non Pajak">
                        Non Pajak
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <p className="font-bold">
                  Total Item : {products.productList.length}{" "}
                </p>
              </div>
              <div className="flex justify-end">
                <p className="font-bold">
                  Total Harga : {formatterTotal.format(totalPrice)}{" "}
                </p>
              </div>
              <Form.Item name="catatan">
                <TextArea rows={4} placeholder="Catatan Tambahan" />
              </Form.Item>
              <Form.Item className="mt-5">
                {loading ? (
                  <div className=" flex float-left ml-3 ">
                    <Spin />
                  </div>
                ) : (
                  <Button
                    onClick={validateError}
                    htmlType="submit"
                    className=" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1"
                  >
                    Retur
                  </Button>
                )}
              </Form.Item>
            </Form>
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default ReturLPB;
