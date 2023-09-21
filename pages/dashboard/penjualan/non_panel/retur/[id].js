import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import { Form, Input, DatePicker, Select, Spin, notification, InputNumber } from "antd";
import nookies from "nookies";
import SearchBar from "../../../../../components/Form/AddOrder/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import calculatePrice from "../../utility/calculatePrice";
import StoreSaleTable from "@iso/components/ReactDataTable/Selling/StoreSaleTable";
import createDetailSaleFunc from "../../utility/createDetailSale";
import createSaleFunc from "../../utility/createSale";
import { useRouter } from "next/router";
import LoadingAnimations from "@iso/components/Animations/Loading";
import createReturInventory from "../../utility/createReturInventory";
import moment from "moment";
import getUserCodeName from "../../../../../library/functions/getUserCodeName";

ReturNonPanel.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/non-panel-sales/" + id + "?populate=*";
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

  const returNonPanel = await fetchData(cookies);
  const dataReturNonPanel = await returNonPanel.json();

  const piutang = await fetchPiutang(cookies, id);
  const dataPiutang = await piutang.json();

  const paymentRetur = await fetchPaymentRetur(cookies, id);
  const dataPaymentRetur = await paymentRetur.json();

  const dataUser = await fetchUser(cookies);
  const user = await dataUser.json();

  return {
    props: {
      data,
      locations,
      dataReturNonPanel,
      dataPaymentRetur,
      user,
    },
  };
};

const fetchPiutang = async (cookies, id) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/credit-details?populate=*&filters[non_panel_sale][id][$eq]=" + id;
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/retur-non-panel-sales?populate=*";
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

const fetchPaymentRetur = async (cookies, id) => {
  const endpoint =
    process.env.NEXT_PUBLIC_URL + "/retur-non-panel-sales?populate=*&filters[non_panel_sale][id][$eq]=" + id;
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

function ReturNonPanel({ props }) {
  const products = useSelector((state) => state.Sales);
  const dispatch = useDispatch();

  var selectedProduct = products?.productList;
  const locations = props.locations.data;
  const user = props.user;
  const nonPanel = props.data;
  const returNonPanel = props.dataReturNonPanel;
  const dataPaymentRetur = props.dataPaymentRetur;
  const dataPiutang = props.dataPiutang;
  const totalTrx = nonPanel.data.attributes.total;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [additionalFee, setAdditionalFee] = useState();
  const [isFetchinData, setIsFetchingData] = useState(false);

  const [dataValues, setDataValues] = useState();
  const [selectedCategory, setSelectedCategory] = useState("BEBAS");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [selectedLocationId, setSelectedLocationId] = useState();
  const [dataLocationStock, setDataLocationStock] = useState();

  const [listId, setListId] = useState([]);
  const [productTotalPrice, setProductTotalPrice] = useState({});
  const [productSubTotal, setProductSubTotal] = useState({});
  const [discType, setDiscType] = useState();
  const [discPrice, setDiscPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const [returPayment, setReturPayment] = useState(0);
  const [returPaymentRemains, setReturPaymentRemains] = useState(0);

  const [dppActive, setDPPActive] = useState(false);
  const [ppnActive, setPPNActive] = useState(false);
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
  const [faktur, setFaktur] = useState(nonPanel.data.attributes.faktur);
  const [customer, setCustomer] = useState(nonPanel.data.attributes.customer?.data?.attributes.name);
  const [saleDate, setSaleDate] = useState(nonPanel.data.attributes.sale_date);

  const [addFee1Desc, setaddFee1Desc] = useState(nonPanel.data.attributes.additional_fee_1_desc);
  const [addFee2Desc, setaddFee2Desc] = useState(nonPanel.data.attributes.additional_fee_2_desc);
  const [addFee3Desc, setaddFee3Desc] = useState(nonPanel.data.attributes.additional_fee_3_desc);

  // Button Include
  const [btnDisc, setBtnDisc] = useState("Uninclude");
  const [btnAddFee1, setBtnAddFee1] = useState("Uninclude");
  const [btnAddFee2, setBtnAddFee2] = useState("Uninclude");
  const [btnAddFee3, setBtnAddFee3] = useState("Uninclude");

  // NO non panel
  var noNonPanel = String(returNonPanel?.meta?.pagination.total + 1).padStart(3, "0");
  const [categorySale, setCategorySale] = useState(`RNP/ET/${user.id}/${noNonPanel}/${mm}/${yyyy}`);

  const handleBiayaPengiriman = (values) => {
    setBiayaPengiriman(values.target.value);
  };

  const onChangeProduct = async () => {
    var isDuplicatedData = false;

    tempList.find((item) => {
      productList.forEach((element) => {
        if (element.id === item.id) isDuplicatedData = true;
      });
    });

    console.log("templist", tempList);
  };

  const getProductAtLocation = async () => {
    const locationId = form.getFieldValue("location");
    let tempData = {};

    // create an array of promises by mapping over the productList
    const promises = products.productList.map(async (product, index) => {
      const stock = await getStockAtLocation(product.id, locationId);
      console.log("stock ", product.id, stock);

      tempData = {
        ...tempData,
        [index]: stock,
      };

      return stock; // return a promise from each iteration
    });

    try {
      // use Promise.all() to execute all promises in parallel
      await Promise.all(promises);
      setDataLocationStock(tempData); // update state after all promises have resolved
      console.log("done");
    } catch (error) {
      console.error(error); // handle errors that may occur
    }
  };

  const getStockAtLocation = async (productId, locationId) => {
    let stockString = "Stok Kosong";
    try {
      console.log("get stock", productId, locationId);
      const response = await getStock(productId, locationId);
      console.log("response", response);

      if (response.data.length > 0) {
        const stock = response.data[0].attributes;
        const product = stock.product?.data?.attributes; // use optional chaining to check if product exists

        const stockUnit1 = stock.stock_unit_1;
        const stockUnit2 = stock.stock_unit_2;
        const stockUnit3 = stock.stock_unit_3;
        const stockUnit4 = stock.stock_unit_4;
        const stockUnit5 = stock.stock_unit_5;

        const satuanUnit1 = product.unit_1;
        const satuanUnit2 = product.unit_2;
        const satuanUnit3 = product.unit_3;
        const satuanUnit4 = product.unit_4;
        const satuanUnit5 = product.unit_5;

        stockString = `${stockUnit1} ${satuanUnit1}, ${stockUnit2} ${satuanUnit2}, ${stockUnit3} ${satuanUnit3}, ${stockUnit4} ${satuanUnit4}, ${stockUnit5} ${satuanUnit5}`;
      }
    } catch (error) {
      console.error("error", error);
      setDataLocationStock({
        ...dataLocationStock,
        [index]: "Error fetching stock data",
      });
    }
    return stockString;
  };

  async function getStock(productId, locationId) {
    const cookies = nookies.get(null, "token");
    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      `/inventories?filters[location][id][$eq]=${locationId}&filters[product][id][$eq]=${productId}&populate=*`;
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

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onFinish = (values) => {
    setLoading(true);
    setInfo("sukses");

    let totalPiutang = 0;
    dataPiutang?.data?.forEach((element) => {
      const totalPembayaran = element?.attributes?.credit?.data?.attributes?.total_pembayaran;
      totalPiutang = totalPiutang + totalPembayaran;
    });

    const payment = nonPanel.data.attributes.total;
    const grandTotalFloat = parseFloat(grandTotal.toFixed(2));
    const paymentFloat = parseFloat(payment.toFixed(2));
    const paidCredit = parseFloat(totalPiutang.toFixed(2));
    const remainingPayment = parseFloat((paymentFloat - paidCredit).toFixed(2));

    console.log(grandTotalFloat, remainingPayment);
    console.log("overprice? ", grandTotalFloat > remainingPayment);
    if (grandTotalFloat > remainingPayment) {
      notification["error"]({
        message: "Overprice",
        description: "Harga retur melebih dari Sisa pembayaran / Harga Penjualan",
      });
      setLoading(false);
      return;
    }

    //values.status_pembayaran = simpanData;
    returNonPanel.data.forEach((element) => {
      if (values.no_retur_non_panel_sale == element.attributes.no_retur_non_panel_sale) {
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
      "/retur-non-panel-sale-details",
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
    values.non_panel_sale = nonPanel.data.id;

    try {
      await createSaleFunc(
        grandTotal,
        totalPrice,
        values,
        listId,
        form,
        router,
        "/retur-non-panel-sales/",
        "retur non panel sale",
        locations,
        null,
        "Publish"
      );
      setLoading(false);
    } catch (err) {
      notification["error"]({
        message: "Gagal menambahkan data",
        description: "Data gagal ditambahkan, silahkan coba lagi",
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
    if (dppActive) {
      setDPP(grandTotal / 1.11);
    } else {
      setDPP(0);
    }

    if (ppnActive) {
      setPPN(((grandTotal / 1.11) * 11) / 100);
    } else {
      setPPN(0);
    }

    setReturPaymentRemains(totalTrx - returPayment);
  }, [grandTotal]);

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
    if (dppActive) {
      setDPP(grandTotal / 1.11);
    } else {
      setDPP(0);
    }
  }, [dppActive]);

  useEffect(() => {
    // set ppn
    if (ppnActive) {
      setPPN(((grandTotal / 1.11) * 11) / 100);
    } else {
      setPPN(0);
    }
  }, [ppnActive]);

  async function fetchLatestNoReferensi() {
    const codename = await getUserCodeName();

    const endpoint = `${process.env.NEXT_PUBLIC_URL}/retur-non-panel-sales?sort[0]=id:desc&pagination[limit]=1&filters[no_retur_non_panel_sale][$contains]=${codename}/RN/`;
    const headers = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    };

    const response = await fetch(endpoint, headers)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });

    if (response) {
      const latestDaata = response.data?.[0];
      const no = parseInt(latestDaata?.attributes?.no_retur_non_panel_sale?.split("/")?.[2] || 0) + 1;
      console.log("no", no);
      const latestNoReferensi = `${codename}/RN/${String(no).padStart(5, "0")}/${moment().format("MM/YYYY")}`;
      form.setFieldsValue({
        no_retur_non_panel_sale: latestNoReferensi,
      });
      return latestNoReferensi;
    }

    console.log("response from fetchLatestNoReferensi", response);
  }

  useEffect(() => {
    // used to reset redux from value before
    clearData();

    fetchLatestNoReferensi();

    form.setFieldsValue({
      no_non_panel_sale: nonPanel.data.attributes.no_non_panel_sale,
      disc_type: nonPanel.data.attributes.disc_type,
      disc_value: nonPanel.data.attributes.disc_value,
      additional_fee_1_sub: nonPanel.data.attributes?.additional_fee_1_sub,
      additional_fee_2_sub: nonPanel.data.attributes?.additional_fee_2_sub,
      additional_fee_3_sub: nonPanel.data.attributes?.additional_fee_3_sub,
    });

    setDPPActive(true);
    setPPNActive(true);
    calculatePaymentRemaining();
  }, []);

  const calculatePaymentRemaining = () => {
    let totalRemaining = 0;
    dataPaymentRetur?.data?.forEach((element) => {
      const totalTrx = element.attributes.total;
      totalRemaining = totalRemaining + totalTrx;
    });

    console.log("data payment retur", dataPaymentRetur);
    setReturPayment(totalRemaining);
  };

  useEffect(() => {
    if (grandTotal != 0) {
      setReturPaymentRemains(totalTrx - returPayment);
    }
  }, [returPayment]);

  return (
    <>
      <Head>
        <title>Retur Penjualan Non Panel</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Retur Penjualan Non Panel"} />
          <LayoutContent>
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
                  {/*<p className="text-sm text-start ml-9">No Faktur : {faktur}</p>*/}
                </div>
                {/* <div className="w-full md:w-1/3 px-3 mt-2 md:mb-0">
                  <p className="text-sm text-start">Customer : {customer}</p>
                </div> */}
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3">
                <div className="w-full md:w-1/3 px-3 md:mb-0">
                  <p className="text-sm text-start ml-9">Tanggal : {saleDate}</p>
                </div>
                {/* <div className="w-full md:w-1/3 px-3 md:mb-0">
                  <p className="text-sm text-start">Lokasi : {locationStore}</p>
                </div> */}
                <div className="w-full md:w-1/3 px-3 md:mb-0">
                  <p className="text-sm text-start">Customer : {customer}</p>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3 mb-3 mt-2">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="no_non_panel_sale">
                    <Input style={{ height: "40px" }} disabled />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_retur_non_panel_sale"
                    // initialValue={categorySale}
                    rules={[
                      {
                        required: true,
                        message: "Nomor Penjualan tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input style={{ height: "40px" }} placeholder="Mengambil nomor..." />
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
                      onChange={(e) => {
                        setSelectedLocationId(e);
                        getProductAtLocation(e);
                      }}
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
                    initialValue={moment()}
                    name="retur_date"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Tanggal tidak boleh kosong!",
                    //   },
                    // ]}
                  >
                    <DatePicker
                      placeholder="Tanggal Retur"
                      size="large"
                      format={"DD/MM/YYYY"}
                      style={{ width: "100%" }}
                      defaultValue={moment()}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex md:w-4/4 px-3 mb-2 mt-2 mx-0  md:mb-0">
                <SearchBar
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
                  <StoreSaleTable
                    noMaxInput={true}
                    products={products}
                    productTotalPrice={productTotalPrice}
                    setTotalPrice={setTotalPrice}
                    setProductTotalPrice={setProductTotalPrice}
                    calculatePriceAfterDisc={calculatePriceAfterDisc}
                    productSubTotal={productSubTotal}
                    setProductSubTotal={setProductSubTotal}
                    getProduct={getProductAtLocation}
                    locations={locations}
                    dataLocationStock={dataLocationStock}
                    formObj={form}
                  />
                </div>
              )}

              <div className="w-full flex flex-wrap -mx-3 mb-1">
                <div className="w-full md:w-1/3 px-3 mt-5 ">
                  <Form.Item name="disc_type">
                    <Select
                      disabled
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
                      disabled
                      onChange={setTotalWithDisc}
                      size="large"
                      min={0}
                      placeholder="Diskon"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
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
                      <Select.Option value={true} key={"DPP"}>
                        DPP
                      </Select.Option>
                      <Select.Option value={false} key={"non-DPP"}>
                        Non-DPP
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
                      <Select.Option value={true} key={"PPN"}>
                        PPN
                      </Select.Option>
                      <Select.Option value={false} key={"non-PPN"}>
                        Non-PPN
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

                  <Form.Item name="grandTotal" value={grandTotal} className="w-full h-2 md:w-1/2 mx-2 mt-3 text-lg">
                    <span> Total </span> <span>: {formatter.format(grandTotal)}</span>
                  </Form.Item>
                  {/* <Form.Item
                    name="test1"
                    className="w-full h-2 md:w-1/2 mx-2 mt-10 text-lg"
                  >
                    <span> Total Pembayaran Trx </span>{" "}
                    <span>: {formatter.format(grandTotal)}</span>
                  </Form.Item>
                  <Form.Item
                    name="test1"
                    className="w-full h-2 md:w-1/2 mx-2 mt-3 text-lg"
                  >
                    <span> Sisa </span>{" "}
                    <span>: {formatter.format(returPaymentRemains)}</span>
                  </Form.Item> */}
                </div>
              </div>

              <div className="w-full flex justify-center">
                <Form.Item>
                  {loading ? (
                    <div className=" flex float-left ml-3 ">
                      <Spin />
                    </div>
                  ) : (
                    <button
                      onClick={() => setSimpanData("Bayar")}
                      htmlType="submit"
                      className="bg-cyan-700 rounded-md m-1 text-sm"
                    >
                      <p className="px-8 py-2 m-0 text-white">SIMPAN DAN CETAK</p>
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

export default ReturNonPanel;
