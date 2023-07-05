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
  Select,
  Spin,
  notification,
  InputNumber,
} from "antd";
import nookies from "nookies";
import SearchBar from "../../.../../../../../components/Form/AddOrder/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import calculatePrice from "../../utility/calculatePrice";
import StoreSaleTable from "../../../../../components/ReactDataTable/Selling/StoreSaleTable";
import createDetailSaleFunc from "../../utility/createDetailSale";
import createSaleFunc from "../../utility/createSale";
import { useRouter } from "next/router";
import LoadingAnimations from "@iso/components/Animations/Loading";
import createReturInventory from "../../utility/createReturInventory";

ReturPanel.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint =
    process.env.NEXT_PUBLIC_URL + "/panel-sales/" + id + "?populate=deep";
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

  const returPanel = await fetchData(cookies);
  const dataReturPanel = await returPanel.json();

  const piutang = await fetchPiutang(cookies, id);
  const dataPiutang = await piutang.json();

  const paymentRetur = await fetchPaymentRetur(cookies, id);
  const dataPaymentRetur = await paymentRetur.json();

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
      dataPiutang,
      dataReturPanel,
      dataPaymentRetur,
      user,
    },
  };
};

const fetchPiutang = async (cookies, id) => {
  const endpoint =
    process.env.NEXT_PUBLIC_URL +
    "/credit-details?populate=*&filters[panel_sale][id][$eq]=" +
    id;
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
  const endpoint =
    process.env.NEXT_PUBLIC_URL + "/retur-panel-sales?populate=*";
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
    process.env.NEXT_PUBLIC_URL +
    "/retur-panel-sales?populate=*&filters[panel_sale][id][$eq]=" +
    id;
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

function ReturPanel({ props }) {
  const products = useSelector((state) => state.Sales);
  const dispatch = useDispatch();

  var selectedProduct = products?.productList;
  const locations = props.locations.data;
  const user = props.user;
  const panel = props.data;
  const returPanel = props.dataReturPanel;
  const dataPaymentRetur = props.dataPaymentRetur;
  const dataPiutang = props.dataPiutang;
  const totalTrx = panel.data.attributes.total;

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
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

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
  const [faktur, setFaktur] = useState(panel.data.attributes.faktur);
  const [customer, setCustomer] = useState(
    panel.data.attributes.customer?.data?.attributes.name
  );
  const [saleDate, setSaleDate] = useState(panel.data.attributes.sale_date);
  const [locationStore, setLocationStore] = useState(
    panel.data.attributes.location.data.attributes.name
  );
  const [addFee1Desc, setaddFee1Desc] = useState(
    panel.data.attributes.additional_fee_1_desc
  );
  const [addFee2Desc, setaddFee2Desc] = useState(
    panel.data.attributes.additional_fee_2_desc
  );
  const [addFee3Desc, setaddFee3Desc] = useState(
    panel.data.attributes.additional_fee_3_desc
  );

  // Button Include
  const [btnDisc, setBtnDisc] = useState("Uninclude");
  const [btnAddFee1, setBtnAddFee1] = useState("Uninclude");
  const [btnAddFee2, setBtnAddFee2] = useState("Uninclude");
  const [btnAddFee3, setBtnAddFee3] = useState("Uninclude");

  // NO panel
  var noPanel = String(returPanel?.meta?.pagination.total + 1).padStart(3, "0");
  const [categorySale, setCategorySale] = useState(
    `RPN/ET/${user.id}/${noPanel}/${mm}/${yyyy}`
  );

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

    if (!isDuplicatedData) {
      setProductList((productList) => [...productList, tempList[0]]);
      toast.success("Produk berhasil ditambahkan!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const getProductAtLocation = async () => {
    const locationId = form.getFieldValue("location");
    let tempData = {};

    // create an array of promises by mapping over the productList
    const promises = products.productList.map(async (product) => {
      const stock = await getStockAtLocation(product.id, locationId);
      console.log("stock ", product.id, stock);

      tempData = {
        ...tempData,
        [product.id]: stock,
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
        [productId]: "Error fetching stock data",
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
      const totalPembayaran =
        element?.attributes?.credit?.data?.attributes?.total_pembayaran;
      totalPiutang = totalPiutang + totalPembayaran;
    });

    const payment = panel.data.attributes.total;
    const grandTotalFloat = parseFloat(grandTotal.toFixed(2));
    const paymentFloat = parseFloat(payment.toFixed(2));
    const paidCredit = parseFloat(totalPiutang.toFixed(2));
    const remainingPayment = parseFloat((paymentFloat - paidCredit).toFixed(2));

    console.log(grandTotalFloat, remainingPayment);
    console.log("overprice? ", grandTotalFloat > remainingPayment);
    if (grandTotalFloat > remainingPayment) {
      notification["error"]({
        message: "Overprice",
        description:
          "Harga retur melebih dari Sisa pembayaran / Harga Penjualan",
      });
      setLoading(false);
      return;
    }

    returPanel.data.forEach((element) => {
      if (
        values.no_retur_panel_sale == element.attributes.no_retur_panel_sale
      ) {
        notification["error"]({
          message: "Gagal menambahkan data",
          description: "Data gagal ditambahkan, karena no penjualan sama",
        });
        setInfo("gagal");
      }
    });
    setDataValues(values);
    setLoading(false);
  };

  const createDetailSale = async () => {
    await createDetailSaleFunc(
      dataValues,
      products,
      productTotalPrice,
      productSubTotal,
      setListId,
      "/retur-panel-sale-details",
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
    values.panel_sale = panel.data.id;
    await createSaleFunc(
      grandTotal,
      totalPrice,
      values,
      listId,
      form,
      router,
      "/retur-panel-sales/",
      "panel sale",
      locations,
      updateStock
    );
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

  const updateStock = async (id, locations) => {
    const panelId = panel.data.id;

    // fetching data to update
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };
    const endpoint =
      process.env.NEXT_PUBLIC_URL + `/panel-sales/${panelId}?populate=deep`;
    const req = await fetch(endpoint, options);
    const res = await req.json();
    const row = res.data;
    console.log("endpoint", endpoint);
    console.log("row stock", row);

    const trxStatus = row.attributes?.status_data;

    if (trxStatus == "Publish") {
      const productInfo = products?.productInfo;
      createReturInventory(row, selectedLocationId, productInfo);
    }
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
      setGrandTotal(
        discPrice + parseFloat(biayaPengiriman) + parseFloat(biayaTambahan)
      );
    } else {
      setGrandTotal(
        totalPrice + parseFloat(biayaPengiriman) + parseFloat(biayaTambahan)
      );
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

  useEffect(() => {
    // used to reset redux from value before
    clearData();

    form.setFieldsValue({
      no_panel_sale: panel.data.attributes.no_panel_sale,
      no_retur_panel_sale: categorySale,
      disc_type: panel.data.attributes.disc_type,
      disc_value: panel.data.attributes.disc_value,
      additional_fee_1_sub: panel.data.attributes?.additional_fee_1_sub,
      additional_fee_2_sub: panel.data.attributes?.additional_fee_2_sub,
      additional_fee_3_sub: panel.data.attributes?.additional_fee_3_sub,
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
        <title>Retur Penjualan Panel</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Retur Penjualan Panel"} />
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
                <div className="w-full md:w-1/3 px-3 mt-2 md:mb-0">
                  <p className="text-sm text-start">Customer : {customer}</p>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3">
                <div className="w-full md:w-1/3 px-3 md:mb-0">
                  <p className="text-sm text-start ml-9">
                    Tanggal : {saleDate}
                  </p>
                </div>
                <div className="w-full md:w-1/3 px-3 md:mb-0">
                  <p className="text-sm text-start">Lokasi : {locationStore}</p>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3 mb-3 mt-2">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="no_panel_sale">
                    <Input style={{ height: "40px" }} disabled />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_retur_panel_sale"
                    initialValue={categorySale}
                    rules={[
                      {
                        required: true,
                        message: "Nomor Penjualan tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "40px" }}
                      placeholder="No. Penjualan"
                    />
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
                          <Select.Option
                            value={element.id}
                            key={element.attributes.name}
                          >
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
                    <DatePicker
                      placeholder="Tanggal Retur"
                      size="large"
                      format={"DD/MM/YYYY"}
                      style={{ width: "100%" }}
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
                  <Form.Item
                    name="dpp"
                    value={dpp}
                    className="w-full h-2 md:w-1/2 mx-2"
                  >
                    <span> DPP </span> <span>: {formatter.format(dpp)}</span>
                  </Form.Item>
                  <Form.Item
                    name="ppn"
                    value={ppn}
                    className="w-full h-2 md:w-1/2 mx-2"
                  >
                    <span> PPN </span> <span>: {formatter.format(ppn)}</span>
                  </Form.Item>
                  <Form.Item
                    name="grandtotal"
                    value={totalPrice}
                    className="w-full h-2 md:w-1/2 mx-2"
                  >
                    <span> Total </span>{" "}
                    <span>: {formatter.format(totalPrice)}</span>
                  </Form.Item>
                  <Form.Item
                    name="biayaTambahan"
                    value={biayaTambahan}
                    className="w-full h-2 md:w-1/2 mx-2"
                  >
                    <span> Biaya Tambahan </span>{" "}
                    <span>: {formatter.format(biayaTambahan)}</span>
                  </Form.Item>
                  <Form.Item
                    name="grandTotal"
                    value={grandTotal}
                    className="w-full h-2 md:w-1/2 mx-2 mt-3 text-lg"
                  >
                    <span> Total </span>{" "}
                    <span>: {formatter.format(grandTotal)}</span>
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

              <div className="w-full flex md:w-3/4 justify-end mb-2">
                <p className="mb-4 font-bold text-center">
                  Biaya Tambahan Lain Lain
                </p>
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
                            additional_fee_1_sub:
                              panel.data.attributes?.additional_fee_1_sub,
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
                            additional_fee_2_sub:
                              panel.data.attributes?.additional_fee_2_sub,
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
                            additional_fee_3_sub:
                              panel.data.attributes?.additional_fee_3_sub,
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
                    <button
                      onClick={() => setSimpanData("Bayar")}
                      htmlType="submit"
                      className="bg-cyan-700 rounded-md m-1 text-sm"
                    >
                      <p className="px-8 py-2 m-0 text-white">
                        SIMPAN DAN CETAK
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

export default ReturPanel;
