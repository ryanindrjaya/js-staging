import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Form, Input, InputNumber, Select, Button, Spin, notification, message } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import calculatePrice from "../utility/calculatePrice";
import nookies from "nookies";
import moment from "moment";
import Customer from "@iso/components/Form/AddSale/CustomerForm";
import LoadingAnimations from "@iso/components/Animations/Loading";
import SalesTable from "../../../../components/ReactDataTable/Selling/SalesTable";
import SearchOrder from "../../../../components/Form/AddSale/SearchPO";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import confirm from "antd/lib/modal/confirm";

Toko.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  const reqInven = await fetchInven(cookies);
  const inven = await reqInven.json();

  const reqSalesSale = await fetchSalesSale(cookies);
  const salesSale = await reqSalesSale.json();

  const reqSalesSell = await fetchSalesSell(cookies);
  const salesOrder = await reqSalesSell.json();

  return {
    props: {
      user,
      locations,
      inven,
      salesSale,
      salesOrder,
    },
  };
};

const fetchData = async (cookies) => {
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

const fetchSalesSale = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sales?populate=*";
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

const fetchLocation = async (cookies) => {
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

const fetchInven = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/inventories?populate=*";
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

const fetchSalesSell = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sells?populate=*";
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

  return res;
}

function Toko({ props }) {
  const products = useSelector((state) => state.Sales);
  const dispatch = useDispatch();

  var selectedProduct = products?.productList;
  const locations = props.locations.data;
  const user = props.user;
  const inven = props.inven.data;
  const salesSale = props.salesSale;
  const salesOrder = props.salesOrder.data;

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
  const [dataLocationStock, setDataLocationStock] = useState();
  const [selectedLocationId, setSelectedLocationId] = useState();
  const [preorderData, setPreOrderData] = useState();
  const [time, setTime] = useState(moment().format("HH:mm:ss"));

  const [dppActive, setDPPActive] = useState("Active");
  const [ppnActive, setPPNActive] = useState("Active");
  const [discMax, setDiscMax] = useState();

  const router = useRouter();
  const { TextArea } = Input;
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var date = today.getDate() + "/" + mm + "/" + yyyy;

  const [lokasiGudang, setLokasiGudang] = useState();

  // setInterval(() => {
  //   setTime(moment().format("HH:mm:ss"));
  // }, 1000);

  // DPP & PPN
  const [dpp, setDPP] = useState(0);
  const [ppn, setPPN] = useState(0);

  // temp
  const [biayaTambahan, setBiayaTambahan] = useState();
  const [biayaPengiriman, setBiayaPengiriman] = useState(0);

  const cookies = nookies.get(null, "token");
  const tempList = [];
  const [info, setInfo] = useState();

  // customer
  const [customer, setCustomer] = useState();

  // NO Sales Sale
  var noSalesSale = String(salesSale?.meta?.pagination.total + 1).padStart(3, "0");
  const [categorySale, setCategorySale] = useState(`PS/ET/${user.id}/${noSalesSale}/${mm}/${yyyy}`);

  const handleBiayaPengiriman = (values) => {
    setBiayaPengiriman(values.target.value);
  };

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const cleanData = (data) => {
    const unusedKeys = ["disc_rp", "harga_satuan", "jumlah_option", "jumlah_qty"];
    for (let key in data) {
      if (data[key] === null || data[key] === undefined) {
        delete data[key];
      } else if (unusedKeys.includes(key)) {
        delete data[key];
      }
    }

    return data;
  };

  const createDetailData = async (data) => {
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/sales-sale-details`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSON.stringify({ data }),
    };

    const res = await fetch(endpoint, options).then((res) => res.json());
    return res;
  };

  const createMasterData = async (data) => {
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/sales-sales`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSON.stringify({ data }),
    };

    const res = await fetch(endpoint, options).then((res) => res.json());
    return res;
  };

  const onFinish = async (values, accept) => {
    if (accept) {
      setLoading(true);
      const isValid = await dataValidation();
      if (!isValid) {
        notification["error"]({
          message: "CUSTOMER TIDAK COCOK",
          description:
            "Customer tidak cocok dengan No Order Penjualan. Silahkan cek kembali data yang akan ditambahkan",
        });
        setLoading(false);
        return;
      } else {
        /* 
      TODO:
      * 1. Create Detail Penjualan Sales
      * 2. Create Penjualan Sales
      */

        console.log("data values", values);

        // master PO
        values.sale_date = moment().format("YYYY-MM-DD");
        values.added_by = user.name;
        values.customer = customer.id;
        values.customer_name = customer.attributes?.name;
        values.sales_sell = preorderData?.id;
        values.location = selectedLocationId;
        values.dpp = dpp;
        values.ppn = ppn;
        values.status = "Diproses";
        values.total = grandTotal;
        values.status_pembayaran = "Belum Lunas";

        const sanitizedValues = cleanData(values);

        const editedProduct = products.productInfo;
        console.log("edited product", editedProduct);
        const details = products.productList?.map(({ attributes, id }, idx) => ({
          qty: editedProduct?.[idx]?.qty || 1,
          unit: editedProduct?.[idx]?.unit || attributes?.unit_1,
          unit_price: editedProduct?.[idx]?.priceUnit || attributes?.sold_price_1,
          disc: editedProduct?.[idx]?.disc || 0,
          disc1: editedProduct?.[idx]?.d1 || attributes?.disc_1_1,
          disc2: editedProduct?.[idx]?.d2 || attributes?.unit_1_dp2,
          expired_date: values?.expired_date?.[idx]?.format("YYYY-MM-DD") || null,
          product: id,
          relation_id: editedProduct?.[idx]?.relation_id,
          margin: editedProduct?.[idx]?.margin || 0,
          sub_total: productSubTotal?.[idx],
          inventory: lokasiGudang?.[idx],
        }));

        console.log("details", details);

        let detailsId = [];

        for (let item in details) {
          const detail = details[item];
          const postDetail = cleanData(detail);
          console.log("post detail", postDetail);

          const res = await createDetailData(postDetail);
          console.log("response create detail ==>", res);
          detailsId.push(res?.data?.id);
        }

        sanitizedValues.sales_sale_details = detailsId;

        // update master PO
        const res = await createMasterData(sanitizedValues);
        console.log("response create master ==>", res);

        if (res?.data?.id) {
          notification.success({
            message: "Berhasil menambahkan data",
            description: "Data Penjualan Sales berhasil dibuat. Silahkan cek pada halaman Penjualan Sales",
          });
          router.replace(`/dashboard/penjualan/sales/print/${res?.data?.id}`);
        } else {
          notification.error({
            message: "Gagal menambahkan data",
            description: "Data Penjualan Sales gagal dibuat. Silahkan cek data anda dan coba lagi",
          });
        }

        setLoading(false);
      }
    } else {
      confirm({
        title: "Apakah anda yakin?",
        icon: <ExclamationCircleOutlined />,
        content: "Harap periksa kembali data yang telah diinput.",
        okText: "Ya",
        okType: "danger",
        cancelText: "Tidak",
        onOk() {
          onFinish(values, true);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  };

  const dataValidation = async () => {
    const nomorPO = preorderData?.attributes?.no_sales_sell;
    const customerId = customer?.id;
    console.log("this is validate step", nomorPO, customerId);

    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      `/sales-sells?populate=*&filters[status][$eq]=Diproses&filters[customer][id][$eq]=${customerId}&filters[no_sales_sell][$eq]=${nomorPO}`;
    console.log(endpoint);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    const isDataExist = res.data.length > 0;
    console.log("isDataExist", isDataExist);

    return isDataExist;
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
    const total = calculatePrice(row, products, productTotalPrice, productSubTotal, setTotalPrice, index);
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
    if (disc.disc_value > totalPrice) {
      newTotal = 0;
      notification["error"]({
        message: "Disc tidak sesuai",
        description: "Disc tetap tidak boleh melebihi total",
      });
    }
    setDiscPrice(newTotal);
  };

  const setTotalPriceWithPercentDisc = (disc) => {
    var newTotal = 0;

    newTotal = totalPrice - (totalPrice * disc.disc_value) / 100;
    if (newTotal < 0) newTotal = 0;
    if (disc.disc_value > 100) {
      newTotal = 0;
      notification["error"]({
        message: "Disc tidak sesuai",
        description: "Disc persentase tidak boleh 100%",
      });
    }
    setDiscPrice(newTotal);
  };

  const fetchSalesSaledata = async (id) => {
    clearData();
    setIsFetchingData(true);
    message.loading({ content: "Mengambil data...", duration: 5000, key: "updatable" });

    const endpoint = process.env.NEXT_PUBLIC_URL + `/sales-sells/${id}?populate=deep`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    const dataSalesSell = res.data.attributes;
    const sales_sell_details = dataSalesSell.sales_sell_details.data;

    var dateString = dataSalesSell.sale_date;
    var momentObj = moment(dateString, "YYYY-MM-DD");
    var momentString = momentObj.format("MM-DD-YYYY");

    form.setFieldsValue({
      sale_date: moment(momentString),
      location: dataSalesSell.location.data.attributes.name,
      tempo_days: dataSalesSell.tempo_days,
      tempo_time: dataSalesSell.tempo_time,
      sale_note: dataSalesSell.sale_note,
      customer: dataSalesSell.customer?.data?.attributes.name,
    });
    setCustomer(dataSalesSell.customer.data);
    setSelectedLocationId(dataSalesSell.location?.data?.id);
    setPreOrderData(res.data);

    dispatch({
      type: "SET_PREORDER_DATA",
      data: res.data,
    });

    var id = 0;

    for (let i = 0; i < sales_sell_details?.length; i++) {
      const element = sales_sell_details[i];
      var indexUnit = 1;
      var unitOrder = element.attributes.unit;
      var productUnit = element.attributes.product.data.attributes;
      var d1 = 0;
      var d2 = 0;

      for (let index = 1; index < 6; index++) {
        if (unitOrder === productUnit[`unit_${index}`]) {
          indexUnit = index;
        }
      }

      const productId = element.attributes.product.data.id;

      form.setFieldsValue({
        jumlah_option: {
          [productId]: element.attributes.unit_order,
        },
        jumlah_qty: {
          [productId]: element.attributes.total_order,
        },
      });

      setLokasiGudang((prev) => ({
        ...prev,
        [i]: element.attributes.inventory,
      }));

      const stock = await getStockAtLocation(productId, indexUnit, i);

      setDataLocationStock((prev) => ({
        ...prev,
        [i]: stock,
      }));

      //SET INITIAL PRODUCT
      dispatch({
        type: "SET_INITIAL_PRODUCT",
        product: element.attributes.product.data,
        qty: element.attributes.qty,
        unit: element.attributes.unit,
        unitIndex: indexUnit,
        priceUnit: element.attributes.unit_price,
        d1: element.attributes.disc1,
        d2: element.attributes.disc2,
        index: id,
      });
      id++;
    }

    setIsFetchingData(false);
    message.success({ content: "Data berhasil diambil", key: "updatable", duration: 2 });
  };
  console.log("lokasi gudang", lokasiGudang);

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
      setPPN(((grandTotal / 1.11) * 11) / 100);
      form.setFieldsValue({
        PPN_active: "PPN",
        DPP_active: "DPP",
      });
    } else {
      setDPP(0);
      setPPN(0);
      form.setFieldsValue({
        PPN_active: null,
        DPP_active: null,
      });
    }
  }, [dppActive, grandTotal, ppnActive]);

  useEffect(() => {
    // set max value
    if (discType == "Tetap") setDiscMax(totalPrice);
    if (discType == "Persentase") setDiscMax(100);
  }, [discType]);

  useEffect(() => {
    if (customer) {
      var tempoDays = customer?.attributes?.credit_limit_duration;
      form.setFieldsValue({
        tempo_days: tempoDays.toString(),
        tempo_time: customer?.attributes?.credit_limit_duration_type,
      });
    }
  }, [customer]);

  useEffect(() => {
    // used to reset redux from value before
    clearData();
    setProductSubTotal({});
    setDPPActive("DPP");
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

  const getProductAtLocation = async (unit = 1, changedIdx = products?.productList?.length - 1 ?? 0) => {
    const locationId = form.getFieldValue("location");
    let tempData = dataLocationStock;

    // create an array of promises by mapping over the productList
    const promises = products.productList.map(async (product, idx) => {
      if (idx === changedIdx) {
        const stock = await getStockAtLocation(product.id, unit, idx);
        console.log("stock ", product.id, stock);

        tempData = {
          ...tempData,
          [idx]: stock,
        };

        return stock; // return a promise from each iteration
      }
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

  const getStockAtLocation = async (productId, unit, idx) => {
    try {
      const response = await getStock(productId, unit);
      console.log("response", response);

      if (response?.data) {
        // sort based on qty desc
        const sortedBasedOnQty = response.data.sort((a, b) => b.availableStock - a.availableStock);
        setLokasiGudang((prev) => ({
          ...prev,
          [idx]: sortedBasedOnQty,
        }));
      }

      console.log(`response ${unit}`, response?.stock?.[unit]);

      const stringArr = [];

      for (const [key, value] of Object.entries(response?.stock)) {
        stringArr.push(`${value} ${key}`);
      }

      return response.available ? stringArr.join(", ") : "Stok kosong";
    } catch (error) {
      console.error("error", error);
      setDataLocationStock({
        ...dataLocationStock,
        [idx]: "Error fetching stock data",
      });
    }
  };

  const POValidation = async (id) => {
    console.log("validation PO", id);
    // const supplierName = supplier?.attributes?.name;
    // console.log("this is validate step", nomorPO, supplierName);

    const endpoint = process.env.NEXT_PUBLIC_URL + `/sales-sales?populate=*&filters[sales_sell][id][$eq]=` + id;
    console.log(endpoint);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    const isDataExist = res.data.length > 0;

    if (isDataExist) {
      clearData();
      notification["error"]({
        message: "Tidak dapat menambahkan data PO",
        description:
          "Data PO ini sudah memiliki PO yang terpasang. Silahkan cek kembali atau gunakan dokumen PO lainnya ",
      });
    } else {
      // fetch po
      fetchSalesSaledata(id);
    }
  };

  return (
    <>
      <Head>
        <title>Penjualan Sales</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Penjualan Sales"} />
          <LayoutContent>
            <div className="w-full flex justify-between mx-2 mt-1">
              <div className="w-full justify-start md:w-1/3">
                <p>
                  {date} {time}
                </p>
              </div>
              <div className="w-full flex justify-center md:w-1/3">
                <button className="bg-cyan-700 rounded-md m-1 text-sm">
                  <p className="px-4 py-2 m-0 text-white">Laporan Penjualan Hari Ini</p>
                </button>
              </div>
              <div className="w-full flex justify-end text-right md:w-1/3">
                <p>{user.name}</p>
              </div>
            </div>

            <Form
              form={form}
              name="add"
              initialValues={{
                remember: true,
              }}
              onFinish={(values) => onFinish(values, false)}
              onFinishFailed={validateError}
            >
              <div className="w-full flex flex-wrap justify-start -mx-3 mb-6 mt-5">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_sales_sale"
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
                    name="customer"
                    //initialValue={c}
                    rules={[
                      {
                        required: true,
                        message: "Data customer tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Customer onChangeCustomer={setCustomer} page={"SALES"} />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2">
                  <Form.Item name="no_inventory">
                    <Input style={{ height: "40px" }} placeholder="No Inv" />
                  </Form.Item>
                </div>

                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="tempo_days" initialValue={"0"} noStyle>
                    <Input
                      size="large"
                      style={{
                        width: "50%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="tempo_time" initialValue={"Hari"} noStyle>
                    <Select
                      size="large"
                      style={{
                        width: "50%",
                      }}
                    >
                      <Select.Option value="Hari" key="Hari">
                        Hari
                      </Select.Option>
                      <Select.Option value="Bulan" key="Bulan">
                        Bulan
                      </Select.Option>
                    </Select>
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
                        // getProductAtLocation(e);
                      }}
                      placeholder="Pilih Lokasi"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      options={locations?.map(({ attributes, id }) => ({
                        value: id,
                        label: attributes.name,
                      }))}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="w-full md:w-1/4 mb-2 mt-5 md:mb-0">
                <SearchOrder customer={customer} handleSelect={POValidation} />
              </div>

              <div className="w-full flex md:w-4/4  mb-2 mt-2 mx-0  md:mb-0">
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
                <div className="w-full md:w-4/4  mb-2 mt-5 mx-3  md:mb-0 text-lg">
                  <div className="w-36 h-36 flex p-4 max-w-sm mx-auto">
                    <LoadingAnimations />
                  </div>
                  <div className="text-sm align-middle text-center animate-pulse text-slate-400">
                    Sedang Mengambil Data
                  </div>
                </div>
              ) : (
                <div className="w-full md:w-4/4 mb-2 mt-5 md:mb-0">
                  <SalesTable
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
                    getProduct={getProductAtLocation}
                  />
                </div>
              )}

              <div className="w-full flex justify-end mb-3">
                <div className="w-full md:w-2/5 grid grid-cols-2">
                  <span> DPP </span> <span className="text-end">: {formatter.format(dpp)}</span>
                  <span> PPN </span> <span className="text-end">: {formatter.format(ppn)}</span>
                  <span> Total </span> <span className="text-end">: {formatter.format(totalPrice)}</span>
                  <span> Biaya Pengiriman </span>{" "}
                  <span className="text-end">: {formatter.format(biayaPengiriman)}</span>
                  <span> Biaya Tambahan </span> <span className="text-end">: {formatter.format(biayaTambahan)}</span>
                  <span className="text-lg font-bold"> Total </span>{" "}
                  <span className="text-end text-lg font-bold">{formatter.format(grandTotal)}</span>
                </div>
              </div>

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
                <div className="w-full md:w-1/3 px-3 mt-5 ">
                  <Form.Item name="disc_value" noStyle>
                    <InputNumber
                      //disabled={products.productList.length === 0}
                      onChange={setTotalWithDisc}
                      size="large"
                      min={0}
                      max={discMax}
                      placeholder="Diskon"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/3 px-3">
                  <Form.Item noStyle>
                    <Input
                      size="large"
                      style={{
                        width: "60%",
                      }}
                      value="Biaya Pengiriman"
                      disabled
                    />
                  </Form.Item>
                  <Form.Item name="delivery_fee" initialValue={0} noStyle>
                    <Input
                      size="large"
                      style={{
                        width: "40%",
                      }}
                      onChange={handleBiayaPengiriman}
                    />
                  </Form.Item>
                </div>
              </div>

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
                      <Select.Option value="Active" key={"Active"}>
                        Tidak Ada
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <Form.Item name="PPN_active">
                    <Select
                      placeholder="Pakai PPN"
                      //onChange={setDPPActive}
                      disabled
                      onChange={setPPNActive}
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value="PPN" key={"PPN"}>
                        PPN
                      </Select.Option>
                      <Select.Option value="Active" key={"Active"}>
                        Tidak Ada
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex md:w-3/4 justify-end mb-2">
                <p className="mb-4 font-bold text-center">Biaya Tambahan Lain Lain</p>
              </div>
              <div className="w-full flex flex-wrap justify-end mb-3">
                <div className="w-full md:w-1/3 px-3 mb-2 text-center md:mb-0">
                  <p className="mb-4 font-bold">Keterangan</p>
                  <Form.Item name="additional_fee_1_desc">
                    <Input size="large" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item name="additional_fee_2_desc">
                    <Input size="large" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item name="additional_fee_3_desc">
                    <Input size="large" style={{ width: "100%" }} />
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
              </div>

              <div className="w-full flex justify-between">
                <Form.Item name="sale_note" className="w-full md:w-1/2 mx-2">
                  <TextArea rows={4} placeholder="Catatan Penjualan" />
                </Form.Item>
                <Form.Item name="sale_staff" className="w-full md:w-1/2 mx-2">
                  <TextArea rows={4} placeholder="Catatan Staff" />
                </Form.Item>
              </div>

              <div className="w-full flex justify-center">
                <Form.Item>
                  {loading ? (
                    <div className=" flex float-left ml-3 ">
                      <Spin />
                    </div>
                  ) : (
                    <button htmlType="submit" className="bg-cyan-700 rounded-md m-1 text-sm">
                      <p className="px-4 py-2 m-0 text-white">SIMPAN DAN CETAK UNTUK PEMBAYARAN PIUTANG</p>
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

export default Toko;
