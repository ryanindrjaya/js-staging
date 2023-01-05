import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import { Form, Input, DatePicker, Button, message, Upload, Select, Spin, notification, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import nookies from "nookies";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import calculatePrice from "../../utility/calculatePrice";
import StoreSaleTable from "@iso/components/ReactDataTable/Selling/StoreSaleTable";
//import createDetailReturFunc from "../../utility/createReturDetail";
//import createReturLPBFunc from "../../utility/createReturLPB";
import { useRouter } from "next/router";
import moment from "moment";
import LoadingAnimations from "@iso/components/Animations/Loading";

ReturToko.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/store-sales/" + id + "?populate=deep";
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

  //const lpbPage = await fetchData(cookies);
  //const dataLPBPage = await lpbPage.json();

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
      //dataLPBPage,
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

//const fetchData = async (cookies) => {
//  const endpoint = process.env.NEXT_PUBLIC_URL + "/retur-lpbs?populate=deep";
//  const options = {
//    method: "GET",
//    headers: {
//      "Content-Type": "application/json",
//      Authorization: "Bearer " + cookies.token,
//    },
//  };

//  const req = await fetch(endpoint, options);

//  return req;
//};

function ReturToko({ props }) {
const products = useSelector((state) => state.Order);
  const dispatch = useDispatch();

  var selectedProduct = products?.productList;
  const locations = props.locations.data;
  const user = props.user;
  //const inven = props.inven.data;
  const returStore = props.data; console.log("retur data :", returStore)
  //const salesOrder = props.salesOrder.data;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [additionalFee, setAdditionalFee] = useState();
  const [isFetchinData, setIsFetchingData] = useState(false);

  const [dataValues, setDataValues] = useState();
  const [selectedCategory, setSelectedCategory] = useState("BEBAS");
  const [deliveryFee, setDeliveryFee] = useState(0);

  const [listId, setListId] = useState([]);
  const [productTotalPrice, setProductTotalPrice] = useState({});
  const [productSubTotal, setProductSubTotal] = useState({});
  const [discType, setDiscType] = useState();
  const [discPrice, setDiscPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const [dppActive, setDPPActive] = useState("Active");
  const [ppnActive, setPPNActive] = useState("Active");

  const router = useRouter();
  const { TextArea } = Input;
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var date = today.getDate()+'/'+mm+'/'+yyyy;
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  // DPP & PPN
  const [dpp, setDPP] = useState(0);
  const [ppn, setPPN] = useState(0);

  // temp
  const [biayaTambahan, setBiayaTambahan] = useState();
  const [biayaPengiriman, setBiayaPengiriman] = useState(0);

  const cookies = nookies.get(null, "token");
  const tempList = [];
  const [info, setInfo] = useState();

  //set data retur
  const [faktur, setFaktur] = useState(returStore.data.attributes.faktur);
  const [customer, setCustomer] = useState(returStore.data.attributes.customer_name);
  const [saleDate, setSaleDate] = useState(returStore.data.attributes.sale_date);
  const [locationStore, setLocationStore] = useState(returStore.data.attributes.location.data.attributes.name);
    
  // NO Sales Sale
  //var noSalesSale = String(salesSale?.meta?.pagination.total + 1).padStart(3, "0");
  //const [categorySale, setCategorySale] = useState(`PS/ET/${user.id}/${noSalesSale}/${mm}/${yyyy}`);
  const [categorySale, setCategorySale] = useState(`RTB/ET/${mm}/${yyyy}`);

  const handleBiayaPengiriman = (values) => {
    setBiayaPengiriman(values.target.value);
  }; 

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onFinish = (values) => {
    setLoading(true);
    setInfo("sukses");
    returStore.data.forEach((element) => {
      if (values.no_sales_sale == element.attributes.no_sales_sale) {
          notification["error"]({
              message: "Gagal menambahkan data",
              description:
                  "Data gagal ditambahkan, karena no penjualan sama",
          });
          setInfo("gagal");
      } 
    });
    setDataValues(values);
    setLoading(false);
  };

  const createDetailSale = async () => {
    await createDetailSaleFunc(dataValues, products, productTotalPrice, productSubTotal, setListId, "/sales-sale-details");
  };

  const createSale = async (values) => {
    values.sale_date = today;
    values.added_by = user.name;
    //values.category = selectedCategory;
    values.dpp = dpp;
    values.ppn = ppn;
    await createSaleFunc(grandTotal, totalPrice, values, listId, form, router, "/sales-sales/", "sales sale", locations);
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

  const sumAdditionalPrice = () => {
    var newTotal = 0;

    for (var key in additionalFee) {
      newTotal = newTotal + additionalFee[key];
    }

    var test = totalPrice + newTotal;
    setBiayaTambahan(newTotal);
  };

  
  const setTotalWithDisc = () => {
    const disc = form.getFieldsValue(["disc_type", "disc_value"]);

    if (disc.disc_type === "Tetap") {
      setTotalPriceWithFixedDisc(disc);
    } else {
      setTotalPriceWithPercentDisc(disc);
    }
  };

  const setTotalPriceWithFixedDisc = (disc) => {
    var newTotal = 0;

    newTotal = totalPrice - disc.disc_value;
    setDiscPrice(newTotal);
  };

  const setTotalPriceWithPercentDisc = (disc) => {
    var newTotal = 0;

    newTotal = totalPrice - (totalPrice * disc.disc_value) / 100;
    if (newTotal < 0) newTotal = 0;
    setDiscPrice(newTotal);
  };

  //const fetchReturdata = async (id) => {
  //  clearData();
  //  setIsFetchingData(true);

  //  const endpoint = process.env.NEXT_PUBLIC_URL + `/store-sales/${id}?populate=deep`;
  //  const options = {
  //    method: "GET",
  //    headers: {
  //      "Content-Type": "application/json",
  //      Authorization: "Bearer " + cookies.token,
  //    },
  //  };

  //  const req = await fetch(endpoint, options);
  //  const res = await req.json();
      
  //  const dataRetur = res.data.attributes; console.log("data", dataRetur)
  //  const retur_details = dataSalesSell.sales_sell_details.data;

  //  var dateString = dataSalesSell.sale_date;
  //  var momentObj = moment(dateString, "YYYY-MM-DD");
  //  var momentString = momentObj.format("MM-DD-YYYY");

  //  form.setFieldsValue({
  //    sale_date: moment(momentString),
  //    location: dataSalesSell.location.data.attributes.name,
  //    customer_name: dataSalesSell.customer_name,
  //    tempo_days: dataSalesSell.tempo_days,
  //    tempo_time: dataSalesSell.tempo_time,
  //    sale_note: dataSalesSell.sale_note,
  //  });

  //  dispatch({
  //    type: "SET_PREORDER_DATA",
  //    data: res.data,
  //  });

  //  sales_sell_details.forEach((element) => {
  //    var indexUnit = 1;
  //    var unitOrder = element.attributes.unit_order;
  //    var productUnit = element.attributes.product.data.attributes;

  //    for (let index = 1; index < 6; index++) {
  //      if (unitOrder === productUnit[`unit_${index}`]) {
  //        indexUnit = index;
  //      }
  //    }

  //    const productId = element.attributes.product.data.id;

  //    form.setFieldsValue({
  //      disc_rp: {
  //        [productId]: element.attributes.disc,
  //      },
  //      jumlah_option: {
  //        [productId]: element.attributes.unit_order,
  //      },
  //      jumlah_qty: {
  //        [productId]: element.attributes.total_order,
  //      },
  //    });

  //     //SET INITIAL PRODUCT
  //    dispatch({
  //      type: "SET_INITIAL_PRODUCT",
  //      product: element.attributes.product.data,
  //      qty: element.attributes.total_order,
  //      unit: element.attributes.unit_order,
  //      unitIndex: indexUnit,
  //    });
  //  });
  //  setTimeout(() => {
  //    setIsFetchingData(false);
  //  }, 3000);
  //};

  const clearData = () => {
    dispatch({ type: "CLEAR_DATA" });
    setTotalPrice(0);
  };

  useEffect(() => { //set value from store sale
    setIsFetchingData(true);

    form.setFieldsValue({
      disc_type: returStore.data.attributes.disc_type,
      disc_value: returStore.data.attributes.disc_value,
      additional_fee_1_sub: returStore.data.attributes?.additional_fee_1_sub,
      additional_fee_2_sub: returStore.data.attributes?.additional_fee_2_sub,
      additional_fee_3_sub: returStore.data.attributes?.additional_fee_3_sub,
    });

    const retur_details = returStore.data.attributes.store_sale_details.data;

    dispatch({
      type: "SET_PREORDER_DATA",
      data: returStore,
    });

    retur_details.forEach((element) => { console.log("element", element)
        var indexUnit = 1;
        var unitOrder = element.attributes.unit_order;
        var productUnit = element.attributes.product.data.attributes;

        for (let index = 1; index < 6; index++) {
            if (unitOrder === productUnit[`unit_${index}`]) {
                indexUnit = index;
            }
        }

        const productId = element.attributes.product.data.id;

        form.setFieldsValue({
            disc_rp: {
                [productId]: element.attributes.disc,
            },
            disc_rp1: {
                [productId]: element.attributes.disc1,
            },
            disc_rp2: {
                [productId]: element.attributes.disc2,
            },
            //jumlah_option: {
            //    [productId]: element.attributes.unit_order,
            //},
            jumlah_qty: {
                [productId]: element.attributes.qty,
            },
        });

        //SET INITIAL PRODUCT
        dispatch({
            type: "SET_INITIAL_PRODUCT",
            product: element.attributes.product.data,
            qty: element.attributes.qty,
            unit: element.attributes.unit,
            //unitIndex,
            //priceUnit,
            //disc,
            //priceAfterDisc,
            //subTotal,
            //unit: element.attributes.unit_order,
            unitIndex: indexUnit,
        });
    });

    //setDPPActive("DPP");
    //setPPNActive("PPN");

    setTimeout(() => {
      setIsFetchingData(false);
    }, 3000);
  }, [returStore]);

  useEffect(() => {
    // this one is used for checking the price if the old price is same with new one.
    // if both are same then we should not set new price for grand total.
    // if they are not, then set new grand total
    if (discPrice !== totalPrice && discPrice !== 0) {
      setGrandTotal(discPrice + parseFloat(biayaPengiriman) + parseFloat(biayaTambahan));
    } else {
      setGrandTotal(totalPrice + parseFloat(biayaPengiriman) + parseFloat(biayaTambahan));
    }
  }, [biayaPengiriman, biayaTambahan, totalPrice, discPrice]);

  //useEffect(() => {
  //  if(products.productList.length > 0){ 
  //      inven.forEach((element) => {
  //          products.productList.forEach((data) => {
  //            if (data.id == element.attributes.products.data[0].id) {
  //              data.stock = element.attributes.total_stock;
  //            }  
  //          });
  //        }
  //      );
  //  }
  //}, [products.productList]);

  useEffect(() => {
    sumAdditionalPrice();
  }, [additionalFee]);

  useEffect(() => {
    if (listId.length > 0) {
      createSale(dataValues);
    }
  }, [listId]);

  useEffect(() => {
    if (dataValues && info == "sukses") createDetailSale();
  }, [dataValues]);

  useEffect(() => {
    // set dpp
    if(dppActive == "DPP"){
      setDPP(grandTotal / 1.11);
    } else {
      setDPP(0);
    }
  }, [dppActive]);

  useEffect(() => {
    // set ppn
    if(ppnActive == "PPN"){
      setPPN((grandTotal / 1.11) * 11 / 100);
    } else {
      setPPN(0);
    }
  }, [ppnActive]);

  useEffect(() => {
    // used to reset redux from value before
    clearData();
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
        <title>Retur Penjualan Toko dan Resep</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Retur Penjualan Toko dan Resep"} />
          <LayoutContent>
            {/*<div className="w-full flex justify-between mx-2 mt-1">*/}
            {/*    <div className="w-full justify-start md:w-1/3">*/}
            {/*      <p>{date} {time}</p>*/}
            {/*    </div>*/}
            {/*    <div className="w-full flex justify-center md:w-1/3">*/}
            {/*      <button*/}
            {/*        className="bg-cyan-700 rounded-md m-1 text-sm"*/}
            {/*      >*/}
            {/*        <p className="px-4 py-2 m-0 text-white">Laporan Penjualan Hari Ini</p>*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*    <div className="w-full flex justify-end text-right md:w-1/3">*/}
            {/*      <p>{user.name}</p>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <Form
              form={form}
              name="add"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >

              <div className="w-full flex flex-wrap justify-start -mx-3 mt-1">
                <div className="w-full md:w-1/3 px-3 mt-2 md:mb-0">
                  <p className="text-sm text-start ml-9">No Faktur : {faktur}</p>
                </div>
                <div className="w-full md:w-1/3 px-3 mt-2 md:mb-0">
                  <p className="text-sm text-start">Customer : {customer}</p>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3">
                <div className="w-full md:w-1/3 px-3 md:mb-0">
                  <p className="text-sm text-start ml-9">Tanggal : {saleDate}</p>
                </div>
                <div className="w-full md:w-1/3 px-3 md:mb-0">
                  <p className="text-sm text-start">Lokasi : {locationStore}</p>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3 mb-3 mt-2">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_store_sale"
                    initialValue={categorySale}
                    rules={[
                        {
                            required: true,
                            message: "Nomor Penjualan tidak boleh kosong!",
                        },
                    ]}
                    >
                    <Input style={{ height: "40px" }} placeholder="No. Penjualan" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="faktur_retur"
                    rules={[
                        {
                            required: true,
                            message: "Nomor retur faktur tidak boleh kosong!",
                        },
                    ]}
                    >
                    <Input style={{ height: "40px" }} placeholder="No. Retur Faktur" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="location"
                    rules={[
                      {
                        required: true,
                        message: "Lokasi tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Lokasi Gudang Penerima"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      {locations.map((element) => {
                        return (
                          <Select.Option value={element.id} key={element.attributes.name}>
                            {element.attributes.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="retur_date"
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
              </div>

              {isFetchinData ? (
                  <div className="w-full md:w-4/4 px-3 mb-2 mt-5 mx-3  md:mb-0 text-lg">
                    <div className="w-36 h-36 flex p-4 max-w-sm mx-auto">
                      <LoadingAnimations />
                    </div>
                    <div className="text-sm align-middle text-center animate-pulse text-slate-400">Sedang Mengambil Data</div>
                  </div>
                ) : (
                  <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">
                    <StoreSaleTable
                      products={products}
                      productTotalPrice={productTotalPrice}
                      setTotalPrice={setTotalPrice}
                      setProductTotalPrice={setProductTotalPrice}
                      calculatePriceAfterDisc={calculatePriceAfterDisc}
                      productSubTotal={productSubTotal}
                      setProductSubTotal={setProductSubTotal}
                      locations={locations}
                      formObj={form}
                    />
                  </div>
              )}
              {/*<div className="w-full flex md:w-4/4 mb-2 mt-2">*/}
              {/*    <Form.Item name="no_sales_sell">*/}
              {/*      <Select*/}
              {/*          placeholder="Pilih Nomor Penjualan"*/}
              {/*          size="large"*/}
              {/*          onChange={(e) => fetchReturdata(e)}*/}
              {/*          style={{*/}
              {/*              width: "100%",*/}
              {/*          }}*/}
              {/*      >*/}

              {/*          {salesOrder.map((element) => {*/}
              {/*            return (*/}
              {/*              <Select.Option value={element.id} key={element.id}>*/}
              {/*                  {element.attributes.no_sales_sell}*/}
              {/*              </Select.Option>*/}
              {/*            );*/}
              {/*          })}*/}

              {/*      </Select>*/}
              {/*    </Form.Item>*/}
              {/*</div>*/}

              {/*{isFetchinData ? (*/}
              {/*    <div className="w-full md:w-4/4 px-3 mb-2 mt-5 mx-3  md:mb-0 text-lg">*/}
              {/*      <div className="w-36 h-36 flex p-4 max-w-sm mx-auto">*/}
              {/*        <LoadingAnimations />*/}
              {/*      </div>*/}
              {/*      <div className="text-sm align-middle text-center animate-pulse text-slate-400">Sedang Mengambil Data</div>*/}
              {/*    </div>*/}
              {/*  ) : (*/}
              {/*    <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">*/}
              {/*      <StoreSaleTable*/}
              {/*        products={products}*/}
              {/*        productTotalPrice={productTotalPrice}*/}
              {/*        setTotalPrice={setTotalPrice}*/}
              {/*        setProductTotalPrice={setProductTotalPrice}*/}
              {/*        calculatePriceAfterDisc={calculatePriceAfterDisc}*/}
              {/*        productSubTotal={productSubTotal}*/}
              {/*        locations={locations}*/}
              {/*        formObj={form}*/}
              {/*      />*/}
              {/*    </div>*/}
              {/*)}*/}

              <div className="w-full flex flex-wrap -mx-3 mb-1">
                <div className="w-full md:w-1/3 px-3 mt-5 ">
                  <Form.Item name="disc_type">
                    <Select
                      //disabled={products.productList.length === 0}
                      onChange={setDiscType}
                      placeholder="Pilih Jenis Diskon"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value="Tetap" key={"Tetap"}>
                        Tetap
                      </Select.Option>
                      <Select.Option value="Persentase" key={"Persentase"}>
                        Persentase
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/6 px-3 mt-5 ">
                  <Form.Item name="disc_value" noStyle>
                    <InputNumber
                      //disabled={products.productList.length === 0}
                      onChange={setTotalWithDisc}
                      size="large"
                      min={0}
                      placeholder="Diskon"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/6 px-3 mt-5 ">
                  <Form.Item>
                    <button className="bg-cyan-700 rounded-md m-1 text-sm">
                      <p className="px-4 py-2 m-0 text-white">
                        INC. RETUR
                      </p>
                    </button>
                  </Form.Item>
                </div>
              </div>

              {/*<div className="w-full flex flex-wrap -mx-3 mb-4">*/}
              {/*  <div className="w-full md:w-1/3 px-3">*/}
              {/*    <Form.Item noStyle>*/}
              {/*      <Input*/}
              {/*        size="large"*/}
              {/*        style={{*/}
              {/*          width: "60%",*/}
              {/*        }}*/}
              {/*        value="Biaya Pengiriman"*/}
              {/*        disabled*/}
              {/*      />*/}
              {/*    </Form.Item>*/}
              {/*    <Form.Item name="delivery_fee" initialValue={0} noStyle>*/}
              {/*      <Input*/}
              {/*        size="large"*/}
              {/*        style={{*/}
              {/*          width: "40%",*/}
              {/*        }}*/}
              {/*        onChange={handleBiayaPengiriman}*/}
              {/*      />*/}
              {/*    </Form.Item>*/}
              {/*  </div>*/}
              {/*</div>*/}

              <div className="w-full flex flex-wrap -mx-3 my-1 ">
                <div className="w-full md:w-1/3 px-3">
                  <Form.Item name="DPP_active">
                    <Select
                      placeholder="Pakai DPP"
                      //onChange={setDPPActive}
                      onChange={setDPPActive}
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value="DPP" key={"DPP"}>
                        DPP
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <Form.Item name="PPN_active">
                    <Select
                      placeholder="Pakai PPN"
                      //onChange={setDPPActive}
                      onChange={setPPNActive}
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value="PPN" key={"PPN"}>
                        PPN
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full flex flex-wrap md:w-1/3 justify-start -mt-14 mb-3">
                    <Form.Item name="dpp" value={dpp} className="w-full h-2 md:w-1/2 mx-2">
                        <span> DPP </span> <span>: {formatter.format(dpp)}</span>
                    </Form.Item>
                    <Form.Item name="ppn" value={ppn} className="w-full h-2 md:w-1/2 mx-2">
                        <span> PPN </span> <span>: {formatter.format(ppn)}</span>
                    </Form.Item>
                    <Form.Item name="grandtotal" value={totalPrice} className="w-full h-2 md:w-1/2 mx-2">
                        <span> Total </span> <span>: {formatter.format(totalPrice)}</span>
                    </Form.Item>
                    <Form.Item name="biayaTambahan" value={biayaTambahan} className="w-full h-2 md:w-1/2 mx-2">
                        <span> Biaya Tambahan </span> <span>: {formatter.format(biayaTambahan)}</span>
                    </Form.Item>

                    <Form.Item name="grandTotal" value={grandTotal} className="w-full h-2 md:w-1/2 mx-2 mt-3 text-lg">
                        <span> Total </span>  <span>: {formatter.format(grandTotal)}</span>
                    </Form.Item>
                </div>
              </div>

              <div className="w-full flex md:w-3/4 justify-end mb-2">
                <p className="mb-4 font-bold text-center">Biaya Tambahan Lain Lain</p>
              </div>
              <div className="w-full flex flex-wrap justify-end mb-3">
                <div className="w-full md:w-1/3 px-3 mb-2 text-end md:mb-0">
                  <p className="mb-4 font-bold ">Keterangan</p>
                  <Form.Item>
                    Biaya 1
                  </Form.Item>
                  <Form.Item>
                    Biaya 2
                  </Form.Item>
                  <Form.Item>
                    Biaya 3
                  </Form.Item>
                </div>

                <div className="w-full md:w-1/3 px-3 mb-2 text-center md:mb-0">
                  <p className="mb-4 font-bold">Jumlah</p>
                  <Form.Item name="additional_fee_1_sub">
                    <InputNumber
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(e) =>
                        setAdditionalFee({
                          ...additionalFee,
                          additional_fee_1_sub: e,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item name="additional_fee_2_sub">
                    <InputNumber
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(e) =>
                        setAdditionalFee({
                          ...additionalFee,
                          additional_fee_2_sub: e,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item name="additional_fee_3_sub">
                    <InputNumber
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(e) =>
                        setAdditionalFee({
                          ...additionalFee,
                          additional_fee_3_sub: e,
                        })
                      }
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/6 px-1 mb-2 text-center md:mb-0">
                  <p className="mb-4 font-bold">Jumlah</p>
                  <Form.Item>
                    <button className="bg-cyan-700 rounded-md m-1 text-sm">
                      <p className="px-4 py-2 m-0 text-white">
                        INC. RETUR
                      </p>
                    </button>
                  </Form.Item>
                  <Form.Item>
                    <button className="bg-cyan-700 rounded-md m-1 text-sm">
                      <p className="px-4 py-2 m-0 text-white">
                        INC. RETUR
                      </p>
                    </button>
                  </Form.Item>
                  <Form.Item>
                    <button className="bg-cyan-700 rounded-md m-1 text-sm">
                      <p className="px-4 py-2 m-0 text-white">
                        INC. RETUR
                      </p>
                    </button>
                  </Form.Item>
                </div>
              </div>



              <div  className="w-full flex justify-center">
                  <Form.Item>
                    {loading ? (
                      <div className=" flex float-left ml-3 ">
                        <Spin />
                      </div>
                    ) : (
                      <button onClick={validateError} htmlType="submit" className="bg-cyan-700 rounded-md m-1 text-sm">
                        <p className="px-4 py-2 m-0 text-white">
                          SIMPAN DAN CETAK UNTUK BAYAR
                        </p>
                      </button>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {loading ? (
                      <div className=" flex float-left ml-3 ">
                        <Spin />
                      </div>
                    ) : (
                      <button onClick={validateError} htmlType="submit" className="bg-cyan-700 rounded-md m-1 text-sm">
                        <p className="px-4 py-2 m-0 text-white">
                          SIMPAN JADIKAN HUTANG
                        </p>
                      </button>
                    )}
                  </Form.Item>
              </div>
            </Form>
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default ReturToko;
