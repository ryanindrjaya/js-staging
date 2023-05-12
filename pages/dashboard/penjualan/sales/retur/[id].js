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
import createDetailSaleFunc from "../../utility/createDetailSale";
import createSaleFunc from "../../utility/createSale";
import { useRouter } from "next/router";
import moment from "moment";
import LoadingAnimations from "@iso/components/Animations/Loading";
import SalesTable from "../../../../../components/ReactDataTable/Selling/SalesTable";
import ConfirmDialog from "../../../../../components/Alert/ConfirmDialog";

ReturSales.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sales/" + id + "?populate=deep";
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

  const returSales = await fetchData(cookies);
  const datareturSales = await returSales.json();

  const dataUser = await fetchUser(cookies);
  const user = await dataUser.json();

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
      datareturSales,
      user,
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/retur-sales-sales?populate=deep";
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

const fetchUser = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me?populate=*";
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

function ReturSales({ props }) {
  const products = useSelector((state) => state.Order);
  const dispatch = useDispatch();

  var selectedProduct = products?.productList;
  const locations = props.locations.data;
  const user = props.user;
  const sales = props.data;
  const returSales = props.datareturSales;

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
  const [simpanData, setSimpanData] = useState("Bayar");

  const router = useRouter();
  const { TextArea } = Input;
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var date = today.getDate() + "/" + mm + "/" + yyyy;
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
  //const [faktur, setFaktur] = useState(sales.data.attributes.faktur);
  const [customer, setCustomer] = useState(sales.data.attributes.customer?.data?.attributes.name);
  const [saleDate, setSaleDate] = useState(sales.data.attributes.sale_date);
  const [locationStore, setLocationStore] = useState(sales.data.attributes.location.data.attributes.name);
  const [addFee1Desc, setaddFee1Desc] = useState(sales.data.attributes.additional_fee_1_desc);
  const [addFee2Desc, setaddFee2Desc] = useState(sales.data.attributes.additional_fee_2_desc);
  const [addFee3Desc, setaddFee3Desc] = useState(sales.data.attributes.additional_fee_3_desc);
  const [dataLocationStock, setDataLocationStock] = useState();
  const [selectedLocationId, setSelectedLocationId] = useState();

  // Button Include
  const [btnDisc, setBtnDisc] = useState("Uninclude");
  const [btnAddFee1, setBtnAddFee1] = useState("Uninclude");
  const [btnAddFee2, setBtnAddFee2] = useState("Uninclude");
  const [btnAddFee3, setBtnAddFee3] = useState("Uninclude");

  // NO Sales
  var noSales = String(returSales?.meta?.pagination.total + 1).padStart(3, "0");
  const [categorySale, setCategorySale] = useState(`RPS/ET/${user.id}/${noSales}/${mm}/${yyyy}`);

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
    //values.status_pembayaran = simpanData;
    returSales.data.forEach((element) => {
      if (values.no_retur_sales_sale == element.attributes.no_retur_sales_sale) {
        notification["error"]({
          message: "Gagal menambahkan data",
          description: "Data gagal ditambahkan, karena no penjualan sama",
        });
        setInfo("gagal");
      }
    });
    setDataValues(values);
  };

  const createDetailSale = async () => {
    await createDetailSaleFunc(
      dataValues,
      products,
      productTotalPrice,
      productSubTotal,
      setListId,
      "/retur-sales-sale-details",
      form
    );
  };

  const createSale = async (values) => {
    values.sale_date = today;
    values.added_by = user.name;
    //values.category = selectedCategory;
    values.dpp = dpp;
    values.ppn = ppn;
    values.additional_fee_1_desc = addFee1Desc;
    values.additional_fee_2_desc = addFee2Desc;
    values.additional_fee_3_desc = addFee3Desc;
    values.sales_sale = sales.data.id;

    // update status to "Diretur"
    const data = {
      data: {
        status: "Diretur",
      },
    };

    const endpoint = `${process.env.NEXT_PUBLIC_URL}/sales-sales/${sales.data.id}`;
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    await fetch(endpoint, options);

    const formValues = form.getFieldsValue();
    const updatedProduct = products.productInfo;

    // update stock
    const items = products.productList?.map((item, idx) => ({
      product: item.id,
      location: formValues.product_location[idx],
      qty: updatedProduct[idx]?.qty || 1,
      unit: updatedProduct[idx]?.unit || item.unit_1,
      exp_date: formValues.expired_date[idx],
    }));

    const dataStock = {
      data: items,
      type: "Retur Penjualan",
      keterangan: `Retur Penjualan ${sales.data.attributes.no_sales_sale}`,
      no_referensi: formValues.no_retur_sales_sale,
    };

    const endpointStock = `${process.env.NEXT_PUBLIC_URL}/inventories/add`;
    const optionsStock = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataStock),
    };

    await fetch(endpointStock, optionsStock);

    await createSaleFunc(
      grandTotal,
      totalPrice,
      values,
      listId,
      form,
      router,
      "/retur-sales-sales/",
      "sales sale",
      locations
    );
    setLoading(false);
  };

  const calculatePriceAfterDisc = (row, index) => {
    const total = calculatePrice(
      row,
      products,
      productTotalPrice,
      productSubTotal,
      setTotalPrice,
      index,
      setProductSubTotal
    );

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

  const Uninclude = () => {
    var newTotal = 0;
    //const disc = form.getFieldsValue(["disc_type", "disc_value"]);
    // kondisi utk uninclude
    if (btnDisc == "Include") {
      setDiscPrice(totalPrice);
    }
  };

  const clearData = () => {
    dispatch({ type: "CLEAR_DATA" });
    setTotalPrice(0);
  };

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
    if (dppActive == "DPP") {
      setDPP(grandTotal / 1.11);
    } else {
      setDPP(0);
    }
  }, [dppActive]);

  useEffect(() => {
    // set ppn
    if (ppnActive == "PPN") {
      setPPN(((grandTotal / 1.11) * 11) / 100);
    } else {
      setPPN(0);
    }
  }, [ppnActive]);

  useEffect(() => {
    // used to reset redux from value before
    clearData();

    form.setFieldsValue({
      no_sales_sale: sales.data.attributes.no_sales_sale,
      no_retur_sales_sale: categorySale,
      disc_type: sales.data.attributes.disc_type,
      disc_value: sales.data.attributes.disc_value,
      additional_fee_1_sub: sales.data.attributes?.additional_fee_1_sub,
      additional_fee_2_sub: sales.data.attributes?.additional_fee_2_sub,
      additional_fee_3_sub: sales.data.attributes?.additional_fee_3_sub,
      retur_date: moment(),
    });

    dispatch({
      type: "SET_PREORDER_DATA",
      data: sales,
    });
  }, []);

  useEffect(() => {
    if (products.productList.length > 0) {
      getProductAtLocation();
    }
  }, [products.productList]);

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

  const getStockAtLocation = async (productId, locationId) => {
    try {
      const response = await getStock(productId, locationId);
      console.log("response", response);

      return response;
    } catch (error) {
      console.error("error", error);
      setDataLocationStock({
        ...dataLocationStock,
        [productId]: "Error fetching stock data",
      });
    }
  };

  async function getStock(productId, locationId) {
    const endpoint =
      process.env.NEXT_PUBLIC_URL + `/inventories/stock?location=${locationId}&product=${productId}&populate=*`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    return res;
  }

  const getProductAtLocation = async (locationId) => {
    let tempData = {};
    const location = locationId || selectedLocationId;
    setIsFetchingData(true);

    // create an array of promises by mapping over the productList
    const promises = products.productList.map(async (product) => {
      const res = await getStockAtLocation(product.id, location);
      const stock = res?.data?.[0];
      const initialOrder = sales.data?.attributes.sales_sale_details?.data?.find(
        (item) => item?.attributes?.product?.data?.id === product.id
      );

      tempData = {
        ...tempData,
        [product.id]: {
          ...stock,
          order_details: initialOrder?.attributes,
        },
      };

      return stock; // return a promise from each iteration
    });

    try {
      // use Promise.all() to execute all promises in parallel
      await Promise.all(promises);

      setDataLocationStock(tempData); // update state after all promises have resolved

      setIsFetchingData(false);
      console.log("done");
    } catch (error) {
      console.error(error); // handle errors that may occur
      setIsFetchingData(false);
    }
  };

  console.log("redux ==>", products);

  return (
    <>
      <Head>
        <title>Retur Penjualan Sales</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Retur Penjualan Sales"} />
          <LayoutContent>
            <Form
              form={form}
              name="add"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={validateError}
            >
              <div className="w-full flex flex-wrap justify-start -mx-3 mt-1">
                <div className="w-full md:w-1/3 px-3 mt-2 md:mb-0">
                  {/*<p className="text-sm text-start ml-9">No Faktur : {faktur}</p>*/}
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

              <div className="w-full flex justify-start -mx-3 gap-3 mb-3 mt-2">
                <div className="w-full md:w-1/3 mb-2 md:mb-0">
                  <Form.Item name="no_sales_sale">
                    <Input style={{ height: "40px" }} readOnly />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_retur_sales_sale"
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
                <div className="w-full md:w-1/3 mb-2 md:mb-0">
                  <Form.Item
                    name="retur_date"
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
              </div>

              <div className="w-full flex md:w-4/4  mb-2 mt-2 mx-0  md:mb-0">
                <SearchBar
                  // disabled={!selectedLocationId}
                  form={form}
                  tempList={tempList}
                  onChange={onChangeProduct}
                  user={user}
                  selectedProduct={selectedProduct}
                  isBasedOnLocation={false}
                  getProductAtLocation={getProductAtLocation}
                />
              </div>

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
                  <SalesTable
                    retur={true}
                    products={products}
                    productTotalPrice={productTotalPrice}
                    setTotalPrice={setTotalPrice}
                    setProductTotalPrice={setProductTotalPrice}
                    calculatePriceAfterDisc={calculatePriceAfterDisc}
                    productSubTotal={productSubTotal}
                    setProductSubTotal={setProductSubTotal}
                    dataLocationStock={dataLocationStock}
                    locations={locations}
                    formObj={form}
                  />
                </div>
              )}

              <div className="w-full flex flex-wrap -mx-3 mb-1">
                <div className="w-full md:w-1/3 px-3 mt-5 ">
                  <Form.Item name="disc_type">
                    <Select
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
                      onChange={setTotalWithDisc}
                      size="large"
                      min={0}
                      placeholder="Diskon"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/6 px-3 mt-5 ">
                  {btnDisc === "Uninclude" ? (
                    <button
                      type="button"
                      onClick={() => {
                        setTotalWithDisc();
                        setBtnDisc("Include");
                      }}
                      className="bg-cyan-700 rounded-md m-1 text-sm"
                    >
                      <p className="px-4 py-2 m-0 text-white">INC. RETUR</p>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setTotalWithDisc();
                        setBtnDisc("Uninclude");
                        Uninclude();
                      }}
                      className="bg-white-700 rounded-md border border-cyan-700 m-1 text-sm"
                    >
                      <p className="px-4 py-2 m-0 text-cyan">INC. RETUR</p>
                    </button>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-wrap -mx-3 my-1 ">
                <div className="w-full md:w-1/3 px-3">
                  <Form.Item name="DPP_active">
                    <Select
                      placeholder="Pakai DPP"
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
                    <span> Total </span> <span>: {formatter.format(grandTotal)}</span>
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex md:w-3/4 justify-end mb-2">
                <p className="mb-4 font-bold text-center">Biaya Tambahan Lain Lain</p>
              </div>
              <div className="w-full flex flex-wrap justify-end mb-3">
                <div className="w-full md:w-1/3 px-3 mb-2 text-end md:mb-0 mt-2">
                  <p className="mb-4 font-bold ">Keterangan</p>
                  <Form.Item>
                    <p>{addFee1Desc}</p>
                  </Form.Item>
                  <Form.Item>
                    <p>{addFee2Desc}</p>
                  </Form.Item>
                  <Form.Item>
                    <p>{addFee3Desc}</p>
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
                <div className="w-full md:w-1/6 px-1 mb-2 text-center md:mb-0 mt-10">
                  <Form.Item>
                    {btnAddFee1 === "Uninclude" ? (
                      <button
                        type="button"
                        onClick={() => {
                          setBtnAddFee1("Include");
                          setAdditionalFee({
                            ...additionalFee,
                            additional_fee_1_sub: sales.data.attributes?.additional_fee_1_sub,
                          });
                        }}
                        className="bg-cyan-700 rounded-md m-1 text-sm"
                      >
                        <p className="px-4 py-2 m-0 text-white">INC. RETUR</p>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setBtnAddFee1("Uninclude");
                          setAdditionalFee({
                            ...additionalFee,
                            additional_fee_1_sub: 0,
                          });
                        }}
                        className="bg-white-700 rounded-md border border-cyan-700 m-1 text-sm"
                      >
                        <p className="px-4 py-2 m-0 text-cyan">INC. RETUR</p>
                      </button>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {btnAddFee2 === "Uninclude" ? (
                      <button
                        type="button"
                        onClick={() => {
                          setBtnAddFee2("Include");
                          setAdditionalFee({
                            ...additionalFee,
                            additional_fee_2_sub: sales.data.attributes?.additional_fee_2_sub,
                          });
                        }}
                        className="bg-cyan-700 rounded-md m-1 text-sm"
                      >
                        <p className="px-4 py-2 m-0 text-white">INC. RETUR</p>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setBtnAddFee2("Uninclude");
                          setAdditionalFee({
                            ...additionalFee,
                            additional_fee_2_sub: 0,
                          });
                        }}
                        className="bg-white-700 rounded-md border border-cyan-700 m-1 text-sm"
                      >
                        <p className="px-4 py-2 m-0 text-cyan">INC. RETUR</p>
                      </button>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {btnAddFee3 === "Uninclude" ? (
                      <button
                        type="button"
                        onClick={() => {
                          setBtnAddFee3("Include");
                          setAdditionalFee({
                            ...additionalFee,
                            additional_fee_3_sub: sales.data.attributes?.additional_fee_3_sub,
                          });
                        }}
                        className="bg-cyan-700 rounded-md m-1 text-sm"
                      >
                        <p className="px-4 py-2 m-0 text-white">INC. RETUR</p>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setBtnAddFee3("Uninclude");
                          setAdditionalFee({
                            ...additionalFee,
                            additional_fee_3_sub: 0,
                          });
                        }}
                        className="bg-white-700 rounded-md border border-cyan-700 m-1 text-sm"
                      >
                        <p className="px-4 py-2 m-0 text-cyan">INC. RETUR</p>
                      </button>
                    )}
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <Form.Item>
                  {loading ? (
                    <div className=" flex float-left ml-3 ">
                      <Spin />
                    </div>
                  ) : (
                    <ConfirmDialog
                      title="Simpan Retur Penjualan"
                      message="Dokuman akan berubah status menjadi 'Diretur' dan item produk akan masuk gudang tujuan. Lanjutkan?"
                      onCancel={() => {}}
                      onConfirm={() => {
                        setSimpanData("Bayar");
                        form.submit();
                      }}
                      component={
                        <button htmlType="button" className="bg-cyan-700 rounded-md m-1 text-sm">
                          <p className="px-8 py-2 m-0 text-white">SIMPAN DAN CETAK</p>
                        </button>
                      }
                    />
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

export default ReturSales;
