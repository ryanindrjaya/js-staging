import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import { Form, Input, DatePicker, Button, message, Upload, Select, Spin, notification, InputNumber, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import nookies from "nookies";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import calculatePrice from "../../utility/calculatePrice";
import ReturStoreTable from "../.../../../../../../components/ReactDataTable/Selling/ReturStoreTable";
import createDetailSaleFunc from "../../utility/createDetailSale";
import createSaleFunc from "../../utility/createSale";
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

  const returStore = await fetchData(cookies);
  const datareturStore = await returStore.json();

  const dataUser = await fetchUser(cookies);
  const user = await dataUser.json();

  return {
    props: {
      data,
      locations,
      datareturStore,
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/retur-store-sales?populate=*";
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

function ReturToko({ props }) {
  const products = useSelector((state) => state.Sales);
  const dispatch = useDispatch();

  var selectedProduct = products?.productList;
  const locations = props.locations.data;
  const user = props.user;
  const store = props.data;
  const returStore = props.datareturStore;
  const dataDetailTrx = store.data.attributes.store_sale_details;

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

  const [dppActive, setDPPActive] = useState(false);
  const [ppnActive, setPPNActive] = useState(false);
  const [simpanData, setSimpanData] = useState("Bayar");
  const [dataLocationStock, setDataLocationStock] = useState();
  const [stokString, setStokString] = useState({});

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
  const [faktur, setFaktur] = useState(store.data.attributes.faktur);
  const [customer, setCustomer] = useState(store.data.attributes.customer_name);
  const [saleDate, setSaleDate] = useState(store.data.attributes.sale_date);
  const [locationStore, setLocationStore] = useState(
    store.data.attributes.locations?.data?.map((item) => item?.attributes?.name).join(", ") ?? ""
  );
  const [addFee1Desc, setaddFee1Desc] = useState(store.data.attributes.additional_fee_1_desc);
  const [addFee2Desc, setaddFee2Desc] = useState(store.data.attributes.additional_fee_2_desc);
  const [addFee3Desc, setaddFee3Desc] = useState(store.data.attributes.additional_fee_3_desc);

  const [lokasiGudang, setLokasiGudang] = useState();

  // Button Include
  const [btnDisc, setBtnDisc] = useState("Uninclude");
  const [btnAddFee1, setBtnAddFee1] = useState("Uninclude");
  const [btnAddFee2, setBtnAddFee2] = useState("Uninclude");
  const [btnAddFee3, setBtnAddFee3] = useState("Uninclude");

  // NO Store
  var noStore = String(returStore?.meta?.pagination.total + 1).padStart(3, "0");
  //const [categorySale, setCategorySale] = useState();

  const handleBiayaPengiriman = (values) => {
    setBiayaPengiriman(values.target.value);
  };

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onSelectLocation = async (locationId, dataProduct, idx) => {
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/inventories?populate=location&filters[location][id]=${locationId}&filters[product][id]=${dataProduct.id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (res.data.length > 0) {
      const product = dataProduct.attributes;
      const stok = res.data[0].attributes;
      let stokGudang = [];

      [1, 2, 3, 4, 5].forEach((item) => {
        if (product?.[`unit_${item}`]) {
          stokGudang.push(stok[`stock_unit_${item}`] + " " + product[`unit_${item}`]);
        }
      });

      setStokString({
        ...stokString,
        [idx]: stokGudang.join(", "),
      });
    } else {
      const product = dataProduct.attributes;
      let stokGudang = [];

      [1, 2, 3, 4, 5].forEach((item) => {
        if (product?.[`unit_${item}`]) {
          stokGudang.push(0 + " " + product[`unit_${item}`]);
        }
      });

      setStokString({
        ...stokString,
        [idx]: stokGudang.join(", "),
      });
    }
  };

  const onFinish = async (values) => {
    setLoading(true);

    setInfo("sukses");
    values.status_pembayaran = simpanData;
    values.customer_name = customer;
    values.faktur = faktur;

    const payment = store.data.attributes.total;
    const grandTotalFloat = parseFloat(grandTotal.toFixed(2));
    const paymentFloat = parseFloat(payment.toFixed(2));

    console.log(grandTotalFloat, paymentFloat);
    console.log("overprice? ", grandTotalFloat > paymentFloat);
    if (grandTotalFloat > paymentFloat) {
      notification["error"]({
        message: "Overprice",
        description: "Harga retur melebih dari Sisa pembayaran / Harga Penjualan",
      });
      setLoading(false);
      return;
    }

    returStore.data.forEach((element) => {
      if (values.no_retur_store_sale === element.attributes.no_retur_store_sale) {
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

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    notification["error"]({
      message: "Data tidak lengkap",
      description: "Silahkan lengkapi data terlebih dahulu",
    });
  };

  const createDetailSale = async () => {
    await createDetailSaleFunc(
      dataValues,
      products,
      productTotalPrice,
      productSubTotal,
      setListId,
      "/retur-store-sale-details",
      form,
      lokasiGudang
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
    values.store_sale = store.data.id;
    await createSaleFunc(
      grandTotal,
      totalPrice,
      values,
      listId,
      form,
      router,
      "/retur-store-sales/",
      "retur store sale",
      locations,
      null,
      "Publish" // langsung publish
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
  }, [listId, simpanData]);

  useEffect(() => {
    if (dataValues && info == "sukses") createDetailSale();
  }, [dataValues]);

  useEffect(() => {
    // set dpp

    console.log("test dpp active");
    if (dppActive) {
      console.log("grand Total is ", grandTotal);
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
    setIsFetchingData(true);
    var categorySale;
    // if (store.data.attributes.category == "BEBAS") categorySale = `RTB/ET/${user.id}/${noStore}/${mm}/${yyyy}`;
    // if (store.data.attributes.category == "RESEP") categorySale = `RTR/ET/${user.id}/${noStore}/${mm}/${yyyy}`;

    form.setFieldsValue({
      no_store_sale: store.data.attributes.no_store_sale,
      no_retur_store_sale: "R" + store.data.attributes.no_store_sale,
      disc_type: store.data.attributes.disc_type,
      disc_value: store.data.attributes.disc_value,
      additional_fee_1_sub: store.data.attributes?.additional_fee_1_sub,
      additional_fee_2_sub: store.data.attributes?.additional_fee_2_sub,
      additional_fee_3_sub: store.data.attributes?.additional_fee_3_sub,
      retur_date: moment(),
    });

    const retur_details = store.data.attributes.store_sale_details.data;

    dispatch({
      type: "SET_PREORDER_DATA",
      data: store,
    });

    var productId = 0;

    retur_details.forEach((element) => {
      var indexUnit = 1;
      var unitOrder = element.attributes.unit_order;
      var productUnit = element.attributes.product.data.attributes;

      for (let index = 1; index < 6; index++) {
        if (unitOrder === productUnit[`unit_${index}`]) {
          indexUnit = index;
        }
      }

      var dateString = element.attributes.expired_date;
      var momentObj = moment(dateString, "YYYY-MM-DD");
      var momentString = momentObj.format("MM-DD-YYYY");

      form.setFieldsValue({
        jumlah_option: {
          [productId]: element.attributes.unit,
        },
        disc_rp: {
          [productId]: element.attributes.disc,
        },
        disc_rp1: {
          [productId]: element.attributes.disc1,
        },
        disc_rp2: {
          [productId]: element.attributes.disc2,
        },
        margin: {
          [productId]: element.attributes.margin,
        },
        expired_date: {
          [productId]: moment(momentString),
        },
        DPP_active: true,
        PPN_active: true,
      });

      //SET INITIAL PRODUCT
      dispatch({
        type: "SET_SALE_INITIAL_PRODUCT",
        product: element.attributes.product.data,
        qty: 1,
        unit: element.attributes.unit,
        unitIndex: indexUnit,
        disc: element.attributes.disc,
        margin: element.attributes.margin,
        d1: element.attributes.disc1,
        d2: element.attributes.disc2,
        expired_date: element.attributes.expired_date,
        //priceAfterDisc,
        //subTotal,
        //unit: element.attributes.unit_order,
        //unitIndex,
        priceUnit: element.attributes.unit_price,
        index: productId,
      });
      productId++;
    });

    setTimeout(() => {
      setIsFetchingData(false);
      setDPPActive(true);
      setPPNActive(true);
    }, 3000);
  }, []);

  useEffect(() => {
    console.log(products.productList);
    getProductAtLocation();
  }, [products]);

  const getProductAtLocation = async () => {
    let tempData = {};

    console.log("product list", productList.productList);
    // create an array of promises by mapping over the productList
    const promises = products.productList.map(async (product, idx) => {
      const unit = products.productInfo[idx]?.unitIndex;
      const stock = await getStockAtLocation(product.id, unit, idx);

      tempData = {
        ...tempData,
        [idx]: stock,
      };

      return stock; // return a promise from each iteration
    });

    try {
      // use Promise.all() to execute all promises in parallel
      await Promise.all(promises);
      setDataLocationStock(tempData); // update state after all promises have resolved
    } catch (error) {
      console.error(error); // handle errors that may occur
    }
  };

  // get stock at location id
  const getStockAtLocation = async (productId, unit, index) => {
    try {
      const response = await getStock(productId, unit);
      console.log("response", response);

      if (response?.data) {
        // sort based on qty desc
        const sortedBasedOnQty = response.data.sort((a, b) => b.availableStock - a.availableStock);
        setLokasiGudang({
          ...lokasiGudang,
          [index]: sortedBasedOnQty,
        });
      }

      console.log(`response ${unit}`, response?.stock?.[unit]);

      const stringArr = [];

      if (response.available) {
        for (const [key, value] of Object.entries(response?.stock)) {
          stringArr.push(`${value} ${key}`);
        }

        return stringArr.join(", ");
      } else {
        return null;
      }
    } catch (error) {
      console.error("error", error);
      setDataLocationStock({
        ...dataLocationStock,
        [index]: "Error fetching stock data",
      });
    }
  };

  async function getStock(productId, unit) {
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + `/inventories/user/location?product=${productId}&unit=${unit}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    console.log("res get stock at location", res);

    return res;
  }

  return (
    <>
      <Head>
        <title>Retur Penjualan Toko dan Resep</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Retur Penjualan Toko dan Resep"} />
          <LayoutContent>
            <Form
              name="add"
              form={form}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
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
                  <Form.Item name="no_store_sale">
                    <Input style={{ height: "40px" }} disabled />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_retur_store_sale"
                    //initialValue={categorySale}
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
                  <ReturStoreTable
                    products={products}
                    productTotalPrice={productTotalPrice}
                    setTotalPrice={setTotalPrice}
                    setProductTotalPrice={setProductTotalPrice}
                    calculatePriceAfterDisc={calculatePriceAfterDisc}
                    productSubTotal={productSubTotal}
                    setProductSubTotal={setProductSubTotal}
                    locations={locations}
                    dataLocationStock={dataLocationStock}
                    dataDetailTrx={dataDetailTrx}
                    onSelectLocation={onSelectLocation}
                    stokString={stokString}
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
                      defaultValue={dppActive}
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
                        Tidak Ada
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <Form.Item name="PPN_active">
                    <Select
                      placeholder="Pakai PPN"
                      defaultValue={ppnActive}
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
                        Tidak Ada
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
                            additional_fee_1_sub: store.data.attributes?.additional_fee_1_sub,
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
                            additional_fee_2_sub: store.data.attributes?.additional_fee_2_sub,
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
                            additional_fee_3_sub: store.data.attributes?.additional_fee_3_sub,
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
                      <p className="px-4 py-2 m-0 text-white">SIMPAN DAN CETAK UNTUK BAYAR</p>
                    </button>
                  )}
                </Form.Item>
                <Form.Item>
                  {loading ? (
                    <div className=" flex float-left ml-3 ">
                      <Spin />
                    </div>
                  ) : (
                    <button
                      onClick={() => setSimpanData("Hutang")}
                      htmlType="submit"
                      className="bg-cyan-700 rounded-md m-1 text-sm"
                    >
                      <p className="px-4 py-2 m-0 text-white">SIMPAN JADIKAN HUTANG</p>
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
