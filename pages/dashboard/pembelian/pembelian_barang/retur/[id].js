import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import { Form, Input, DatePicker, Button, message, Upload, Select, Spin, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import nookies from "nookies";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import calculatePrice from "../../utility/calculatePrice";
import LPBTable from "@iso/components/ReactDataTable/Purchases/LPBTable";
import createDetailReturFunc from "../../utility/createReturDetail";
import createReturLPBFunc from "../../utility/createReturLPB";
import { useRouter } from "next/router";
import moment from "moment";

ReturLPB.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings/" + id + "?populate=deep";
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/retur-lpbs?populate=deep";
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

  var totalReturs = String(props.dataLPBPage?.meta?.pagination.total + 1).padStart(3, "0");
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
    maximumFractionDigits: 0,
  });

  const onFinish = async (values) => {
    setLoading(true);
    setDataValues(values);
    setLoading(false);
  };

  const createDetailRetur = async () => {
    console.log("dataValues cdr : ", dataValues);
    createDetailReturFunc(products, productTotalPrice, productSubTotal, setListId, "/retur-lpb-details", dataValues);
  };

  const createRetur = async (values) => {
    console.log("Retur");
    console.log(values);
    createReturLPBFunc(grandTotal, totalPrice, values, listId, form, router, data);
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

  const calculatePriceAfterDisc = (row) => {
    const total = calculatePrice(row, products, productTotalPrice, productSubTotal, setTotalPrice);

    return formatter.format(total);
  };

  const fetchReturdata = async (data) => {
    //clearData();
    const dataRetur = data.data.data.attributes;
    const purchase_details = dataRetur.purchasing_details.data;

    dispatch({
      type: "SET_PREORDER_DATA",
      data: data.data,
    });

    purchase_details.forEach((element) => {
      var indexUnit = 1;
      var unitOrder = element.attributes.unit_order;
      var productUnit = element.attributes.product.data.attributes;

      for (let index = 1; index < 6; index++) {
        if (unitOrder === productUnit[`unit_${index}`]) {
          indexUnit = index;
        }
      }

      const productId = element.attributes.product.data.id;
      var dateString = element.attributes.expired_date;
      var momentObj = moment(dateString, "YYYY-MM-DD");
      var momentString = momentObj.format("MM-DD-YYYY");

      var disc = 0;
      if (element.attributes.disc == null) {
        disc = 0;
      } else {
        disc = element.attributes.disc;
      }

      form.setFieldsValue({
        product_location: {
          [productId]: element.attributes.product.data.attributes.locations.data[0].id,
        },
        disc_rp: {
          [productId]: disc,
        },
        jumlah_option: {
          [productId]: element.attributes.unit_order,
        },
        jumlah_qty: {
          [productId]: element.attributes.total_order,
        },
        harga_satuan: {
          [productId]: parseInt(element.attributes.unit_price),
        },
        expired_date: {
          [productId]: moment(momentString),
        },
        batch: {
          [productId]: element.attributes.batch,
        },
      });

      // SET INITIAL PRODUCT
      dispatch({
        type: "SET_INITIAL_PRODUCT",
        product: element.attributes.product.data,
        qty: element.attributes.total_order,
        unit: element.attributes.unit_order,
        unitIndex: indexUnit,
        priceUnit: element.attributes.unit_price,
        disc: element.attributes.disc,
        priceAfterDisc: element.attributes.unit_price_after_disc,
        subTotal: element.attributes.sub_total,
        d1: element.attributes.product.data.attributes.unit_1_dp1,
        d2: element.attributes.product.data.attributes.unit_1_dp2,
        d3: element.attributes.product.data.attributes.unit_1_dp3,
        //batch: element.attributes.batch,
        //expired_date: moment(momentString),
      });
    });
    setTimeout(() => {
      //setIsFetchingData(false);
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
                    name="no_retur_LPB"
                    initialValue={`RB/${totalReturs}/${mm}/${yyyy}`}
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
                    <DatePicker placeholder="Tanggal Retur" size="large" format={"DD/MM/YYYY"} style={{ width: "100%" }} />
                  </Form.Item>
                </div>
                <div className="w-full md:w-2/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="purchasing" initialValue={data.id}>
                    <p className="font-bold m-0">No LPB : {data.attributes.no_purchasing}</p>
                  </Form.Item>
                  <p className="font-bold m-0">No Nota Supplier : {data.attributes.no_nota_suppplier}</p>
                  <p className="font-bold m-0">Tanggal Pembelian : {data.attributes.date_purchasing}</p>
                </div>
                <div className="w-full md:w-3/4 px-3 mb-2 md:mb-0">
                  <p className="font-bold m-0">Alamat Supplier : {data.attributes.supplier.data.attributes.address}</p>
                </div>
                <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">
                  <SearchBar form={form} tempList={tempList} onChange={onChangeProduct} selectedProduct={selectedProduct} />
                </div>
                <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">
                  <LPBTable
                    products={products}
                    //productTotalPrice={productTotalPrice}
                    setTotalPrice={setTotalPrice}
                    //setProductTotalPrice={setProductTotalPrice}
                    calculatePriceAfterDisc={calculatePriceAfterDisc}
                    productSubTotal={productSubTotal}
                    locations={locations}
                    formObj={form}
                  />
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
                      <Select.Option value="Pajak Pembelian" key="Pajak Pembelian">
                        Pajak Pembelian
                      </Select.Option>
                      <Select.Option value="Non Pajak" key="Non Pajak">
                        Non Pajak
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <p className="font-bold">Total Item : {products.productList.length} </p>
              </div>
              <div className="flex justify-end">
                <p className="font-bold">Total Harga : {formatterTotal.format(totalPrice)} </p>
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
                  <Button onClick={validateError} htmlType="submit" className=" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1">
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
