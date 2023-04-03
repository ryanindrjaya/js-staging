import Head from "next/head";
import React, { useState, useEffect, createContext } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import Supplier from "@iso/components/Form/AddOrder/SupplierForm";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import {
  Form,
  Input,
  DatePicker,
  Button,
  message,
  Modal,
  Select,
  Spin,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import nookies from "nookies";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import calculatePrice from "../../utility/calculatePrice";
import DataReturTable from "../../../../../components/ReactDataTable/Purchases/DataReturTable";
import updateRetur from "../../utility/updateRetur";
import createReturFunc from "../../utility/createRetur";
import { useRouter } from "next/router";
import LoadingAnimations from "@iso/components/Animations/Loading";
import moment from "moment";

Retur.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const reqLocation = await fetchLocation(cookies);
  const location = await reqLocation.json();

  const reqDataRetur = await fetchDataRetur(cookies);
  const returs = await reqDataRetur.json();

  const reqDataLPB = await fetchDataLPB(cookies);
  const dataLPB = await reqDataLPB.json();

  const reqUser = await fetchUser(cookies);
  const user = await reqUser.json();

  if (reqLocation.status !== 200) {
    context.res.writeHead(302, {
      Location: "/signin?session=false",
      "Content-Type": "text/html; charset=utf-8",
    });
    context?.res?.end();

    return {};
  }

  return {
    props: {
      location,
      returs,
      dataLPB,
      user,
      id,
    },
  };
};

const fetchLocation = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/locations?populate=deep";
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

const fetchDataRetur = async (cookies) => {
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

const fetchDataLPB = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings?populate=deep";
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

function Retur({ props }) {
  const user = props.user;
  const locations = props.location.data;
  const dataLPB = props.dataLPB.data;
  var products = useSelector((state) => state.Order);
  var selectedProduct = products?.productList;
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataValues, setDataValues] = useState();
  const [supplier, setSupplier] = useState();
  const [productTotalPrice, setProductTotalPrice] = useState({});
  const [productSubTotal, setProductSubTotal] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [listId, setListId] = useState([]);
  const router = useRouter();
  const [lpbData, setLpbData] = useState(dataLPB[0]);
  const [dataGudang, setDataGudang] = useState();
  const [stokString, setStokString] = useState({});

  const [modal, contextHolder] = Modal.useModal();
  const [isTaxActive, setIsTaxActive] = useState(true);

  const ReachableContext = createContext(null);
  const UnreachableContext = createContext(null);

  //temp
  const tempList = [];
  const cookies = nookies.get(null, "token");
  const [isFetchinData, setIsFetchingData] = useState(false);
  const [locProduct, setLocProduct] = useState([]);
  const [expProduct, setExpProduct] = useState([]);
  const [batch, setBatch] = useState([]);

  var totalReturs = String(props.returs?.meta?.pagination.total + 1).padStart(
    3,
    "0"
  );
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
      let stokGudang = "";
      setDataGudang({
        ...dataGudang,
        [idx]: res.data[0].attributes,
      });

      const unit1 = product.unit_1
        ? stok.stock_unit_1 + " " + product.unit_1
        : "";
      const unit2 = product.unit_2
        ? stok.stock_unit_2 + " " + product.unit_2
        : "";
      const unit3 = product.unit_3
        ? stok.stock_unit_3 + " " + product.unit_3
        : "";
      const unit4 = product.unit_4
        ? stok.stock_unit_4 + " " + product.unit_4
        : "";
      const unit5 = product.unit_5
        ? stok.stock_unit_5 + " " + product.unit_5
        : "";

      stokGudang =
        unit1 + " " + unit2 + " " + unit3 + " " + unit4 + " " + unit5;

      setStokString({
        ...stokString,
        [idx]: stokGudang,
      });
    } else {
      const product = dataProduct.attributes;
      let stokGudang = "";
      setDataGudang({
        ...dataGudang,
        [idx]: {},
      });

      const unit1 = product.unit_1 ? "0" + " " + product.unit_1 : "";
      const unit2 = product.unit_2 ? "0" + " " + product.unit_2 : "";
      const unit3 = product.unit_3 ? "0" + " " + product.unit_3 : "";
      const unit4 = product.unit_4 ? "0" + " " + product.unit_4 : "";
      const unit5 = product.unit_5 ? "0" + " " + product.unit_5 : "";

      stokGudang =
        unit1 + " " + unit2 + " " + unit3 + " " + unit4 + " " + unit5;

      setStokString({
        ...stokString,
        [idx]: stokGudang,
      });
    }
  };

  const checkReturQty = (values) => {
    let popUpDialog = false;
    let cannotBeReturnedProducts = [];
    console.log("ishowing dialog", popUpDialog);
    // console.log("test for looping", values);
    // console.log("test for looping", dataGudang);
    // console.log("test for looping", products.productList);

    for (const indextest in products.productList) {
      console.log("test for looping", products.productList[indextest]);
    }

    for (let index in dataGudang) {
      const qty = values?.jumlah_qty?.[index] ?? 1;
      const unitIndex = values?.jumlah_option?.[index] ?? 1;
      const productName = products.productList[index]?.attributes?.name;

      const stokGudangUnit1 = dataGudang?.[index]?.stock_unit_1 ?? 0;
      const stokGudangUnit2 = dataGudang?.[index]?.stock_unit_2 ?? 0;
      const stokGudangUnit3 = dataGudang?.[index]?.stock_unit_3 ?? 0;
      const stokGudangUnit4 = dataGudang?.[index]?.stock_unit_4 ?? 0;
      const stokGudangUnit5 = dataGudang?.[index]?.stock_unit_5 ?? 0;

      if (qty > eval(`stokGudangUnit${unitIndex}`)) {
        let canBeReturned = false;
        for (let i = unitIndex - 1; i >= 1; i--) {
          if (eval(`stokGudangUnit${i}`) !== 0) {
            canBeReturned = true;
            break;
          } else {
            popUpDialog = true;
            cannotBeReturnedProducts.push(productName);
          }
        }

        if (!canBeReturned && productName !== undefined) {
          popUpDialog = true;
          cannotBeReturnedProducts.push(productName);
        }
      }
    }

    if (popUpDialog) {
      Modal.error({
        title: "Retur Gagal",
        content: (
          <div>
            <p>
              Item ini tidak bisa dilakukan retur. Silahkan cek kembali stok
              gudang yang tersedia:
            </p>
            <ul>
              {cannotBeReturnedProducts.map((product) => (
                <li>{product === undefined ? "" : `- ${product}`} </li>
              ))}
            </ul>
          </div>
        ),
      });
    }

    return popUpDialog;
  };

  const onFinish = async (values) => {
    setLoading(true);
    const isShowingPopup = checkReturQty(values);
    if (isShowingPopup) {
      setLoading(false);
      return;
    }

    // const payment = getPaymentRemaining();
    // console.log(payment);
    // if (totalPrice > payment.returPaymentRemaining) {
    //   notification["error"]({
    //     message: "Overprice",
    //     description: "Harga retur melebih dari Sisa pembayaran / Harga LPB",
    //   });
    //   setLoading(false);
    //   return;
    // }

    setDataValues(values);
    setLoading(false);
  };

  const createDetailRetur = async () => {
    console.log(
      "info total",
      productTotalPrice,
      productSubTotal,
      products,
      dataValues
    );
    updateRetur(
      products,
      productTotalPrice,
      productSubTotal,
      setListId,
      "/retur-details",
      dataValues,
      props.returs
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
      index,
      setProductSubTotal
    );
    return formatter.format(total);
  };

  const fetchReturdata = async (id) => {
    //clearData();
    const endpoint =
      process.env.NEXT_PUBLIC_URL + `/purchasings/${id}?populate=deep`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    const dataRetur = res.data.attributes;

    form.setFieldsValue({
      no_nota_supplier: dataRetur.no_nota_suppplier,
      tanggal_pembelian: dataRetur.date_purchasing,
    });
  };

  const setProductValue = async () => {
    if (products.productList.length != 0) {
      products.productList.forEach((element) => {
        form.setFieldsValue({
          harga_satuan: {
            [element.id]: element.attributes.buy_price_1,
          },
        });
      });
    }
  };

  useEffect(() => {
    setGrandTotal(totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    var total = 0;
    for (var key in productTotalPrice) {
      total = total + productTotalPrice[key];
    }
  }, [totalPrice]);

  //useEffect(() => {
  //  if (listId.length > 0) {
  //    createRetur(dataValues);
  //  }
  //}, [listId]);

  useEffect(() => {
    if (dataValues) createDetailRetur();
  }, [dataValues]);

  useEffect(() => {
    dispatch({ type: "CLEAR_DATA" });
    setIsFetchingData(true);
    setProductValue();

    var returData = null;

    props.returs.data.forEach((element) => {
      if (props.id == element.id) {
        returData = element;
      }
    });

    var labelSupplier = `${returData.attributes.supplier.data.attributes.id_supplier} - ${returData.attributes.supplier.data.attributes.name}`;

    const returDetails = returData.attributes?.retur_details?.data ?? [];

    for (const index in returDetails) {
      const locationId = returDetails[index]?.attributes?.location?.data?.id;
      const product = returDetails[index]?.attributes?.products?.data?.[0];
      console.log("product", product);
      // const onSelectLocation = async (locationId, dataProduct, idx)
      onSelectLocation(locationId, product, index);

      console.log("set location id ===> ", locationId);
      form.setFieldsValue({
        product_location: {
          [index]: locationId,
        },
      });
    }

    setSupplier(returData.attributes.supplier.data);

    var dateString = new Date(returData.attributes.tanggal_retur);
    var momentObj = moment(dateString, "YYYY-MM-DD");
    var momentString = momentObj.format("MM-DD-YYYY");
    form.setFieldsValue({
      DPP_PPN_active: returData.attributes.DPP_PPN_active,
      catatan: returData.attributes.catatan,
      supplier_id: {
        label: labelSupplier,
        value: returData.attributes.supplier.data.id,
      },
      no_retur: returData.attributes.no_retur,
      location: {
        label: returData.attributes.location.data.attributes.name,
        value: returData.attributes.location.data.id,
      },
      purchasing: {
        label: returData.attributes.purchasing.data.attributes.name,
        value: returData.attributes.purchasing.data.id,
      },
      pajak: returData.attributes.pajak,
      tanggal_retur: moment(momentString),
      status: returData.attributes.status,
    });

    returData.attributes.retur_details.data.forEach((element, index) => {
      var indexUnit = 1;

      var dateStringDetail = new Date(element.attributes.expired_date);
      var momentObjDetail = moment(dateStringDetail, "YYYY-MM-DD");
      var momentStringDetail = momentObjDetail.format("MM-DD-YYYY");

      locProduct.push(element.attributes.location);
      expProduct.push(moment(momentStringDetail));
      batch.push(element.attributes.batch);

      if (
        element.attributes.products?.data[0]?.attributes.unit_1 ==
        element.attributes.unit
      ) {
        indexUnit = 1;
      } else if (
        element.attributes.products?.data[0]?.attributes.unit_2 ==
        element.attributes.unit
      ) {
        indexUnit = 2;
      } else if (
        element.attributes.products?.data[0]?.attributes.unit_3 ==
        element.attributes.unit
      ) {
        indexUnit = 3;
      } else if (
        element.attributes.products?.data[0]?.attributes.unit_4 ==
        element.attributes.unit
      ) {
        indexUnit = 4;
      } else if (
        element.attributes.products?.data[0]?.attributes.unit_5 ==
        element.attributes.unit
      ) {
        indexUnit = 5;
      } else indexUnit = 1;

      dispatch({
        type: "SET_INITIAL_PRODUCT",
        product: element.attributes.products.data[0],
        qty: element.attributes.qty,
        unit: element.attributes.unit,
        unitIndex: indexUnit,
        priceUnit: parseInt(element.attributes.harga_satuan),
        disc: parseInt(element.attributes.disc),
        priceAfterDisc: parseInt(element.attributes.harga_satuan),
        subTotal: parseInt(element.attributes.sub_total),
        index,
      });

      dispatch({
        type: "CHANGE_PRODUCT_D1",
        d1: element.attributes.d1,
        product: element.attributes.products.data[0],
        index,
      });

      dispatch({
        type: "CHANGE_PRODUCT_D2",
        d2: element.attributes.d2,
        product: element.attributes.products.data[0],
        index,
      });

      dispatch({
        type: "CHANGE_PRODUCT_D3",
        d3: element.attributes.d3,
        product: element.attributes.products.data[0],
        index,
      });
    });

    setTimeout(() => {
      setIsFetchingData(false);
    }, 3000);
  }, []);

  const getPaymentRemaining = () => {
    let returPayments = 0;
    let returPaymentRemaining = 0;
    const totalLPBPayment = lpbData?.attributes?.total_purchasing ?? 0;

    // for (const data in lpbData?.attributes?.returs?.data) {
    //   console.log("retur payment ", data.);
    // }
    lpbData?.attributes?.returs?.data.forEach((element) => {
      returPayments = returPayments + element.attributes.total_price;
    });

    returPaymentRemaining = totalLPBPayment - returPayments;
    const paymentData = {
      LPBPayment: totalLPBPayment,
      returPayment: returPayments,
      returPaymentRemaining: returPaymentRemaining,
    };

    return paymentData;
  };

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

  const getDPP = () => {
    const isDPPActive = form.getFieldValue("DPP_PPN_active");
    var total = 0;

    if (isDPPActive) total = totalPrice / 1.11;

    return total;
  };

  const getPPN = () => {
    var total = 0;
    let dpp = getDPP();
    total = dpp * 0.11;

    return total;
  };

  return (
    <>
      <Head>
        <title>Edit Retur</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Edit Retur Pembelian Barang"} />
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
                  <Supplier onChangeSupplier={setSupplier} />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_retur"
                    initialValue={`Retur/ET/${totalReturs}/${mm}/${yyyy}`}
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
                      placeholder="Pilih Lokasi"
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
                  <Form.Item name="purchasing">
                    <Select
                      placeholder="Pilih Nomor LPB"
                      size="large"
                      onChange={(e) => fetchReturdata(e)}
                      style={{
                        width: "100%",
                      }}
                    >
                      {dataLPB.map((element) => {
                        return (
                          <Select.Option value={element.id} key={element.id}>
                            {element.attributes.no_purchasing}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="status">
                    <Select
                      placeholder="Pilih Status"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value="Draft" key="Draft">
                        Draft
                      </Select.Option>
                      <Select.Option value="Selesai" key="Selesai">
                        Selesai
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0" hidden>
                  <Form.Item name="no_nota_supplier"></Form.Item>
                  <Form.Item name="tanggal_pembelian"></Form.Item>
                </div>
                <div className="w-full md:w-4/4 px-3 mb-2 mt-2 mx-0  md:mb-0">
                  <SearchBar
                    form={form}
                    tempList={tempList}
                    onChange={onChangeProduct}
                    user={user}
                    selectedProduct={selectedProduct}
                    isBasedOnLocation={false}
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
                        onSelectLocation={onSelectLocation}
                        stokString={stokString}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-start md:justify-between">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="DPP_PPN_active"
                    initialValue={isTaxActive}
                    rules={[
                      {
                        required: true,
                        message: "Pajak tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Pajak Pembelian"
                      onChange={setIsTaxActive}
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value={true} key="Pajak Pembelian">
                        Pajak Pembelian
                      </Select.Option>
                      <Select.Option value={false} key="Non Pajak">
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
                  DPP : {formatterTotal.format(getDPP())}
                </p>
              </div>
              <div className="flex justify-end">
                <p className="font-bold">
                  PPN : {formatterTotal.format(getPPN())}
                </p>
              </div>
              <div className="flex justify-end">
                <p className="font-bold">
                  Total Harga : {formatterTotal.format(totalPrice)}{" "}
                </p>
              </div>
              <div className="flex justify-end mt-5">
                <p className="font-bold">
                  Total LPB :{" "}
                  {formatter.format(getPaymentRemaining().LPBPayment ?? 0)}{" "}
                </p>
              </div>
              <div className="flex justify-end">
                <p className="font-bold text-green-600">
                  Pembayaran Sebelumnya :{" "}
                  {formatter.format(getPaymentRemaining().returPayment ?? 0)}{" "}
                </p>
              </div>
              <div className="flex justify-end">
                <p className="font-bold text-red-400">
                  Sisa Pembayaran :{" "}
                  {formatter.format(
                    getPaymentRemaining().returPaymentRemaining ?? 0
                  )}{" "}
                </p>
              </div>
              <Form.Item name="catatan">
                <TextArea rows={4} placeholder="Catatan Tambahan" />
              </Form.Item>
              <ReachableContext.Provider value="Light">
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
                      Perbarui
                    </Button>
                  )}
                </Form.Item>
                {contextHolder}

                <UnreachableContext.Provider value="Bamboo" />
              </ReachableContext.Provider>
            </Form>
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Retur;
