import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Form, Input, InputNumber, Select, Button, Spin, notification, Modal } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import SearchBar from "../../../../components/Form/AddOrder/SearchBar";
import StoreSaleTable from "../../../../components/ReactDataTable/Selling/StoreSaleTable";
import createSaleFunc from "../utility/createSale";
import createDetailSaleFunc from "../utility/createDetailSale";
import calculatePrice from "../utility/calculatePrice";
import DateTimeComponent from "../../../../components/DateTime/dateTime";
import Coa from "@iso/components/Form/AddCost/SearchCOA";
import CoaSale from "@iso/components/Form/AddSale/SearchCOA";
import nookies from "nookies";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import confirm from "antd/lib/modal/confirm";
import getUserCodeName from "../../../../library/functions/getUserCodeName";
import moment from "moment";

Toko.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const req = await fetchData(cookies);
  const user = await req.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  const reqInven = await fetchInven(cookies);
  const inven = await reqInven.json();

  const reqStoreSale = await fetchStoreSale(cookies);
  const storeSale = await reqStoreSale.json();

  const reqCustomer = await fetchCustomer(cookies);
  const customer = await reqCustomer.json();
  
  const reqUserDoc = await fetchUserDoc(cookies, user.codename);
  const userDoc = await reqUserDoc.json();
  const userLastDocNumber = userDoc.meta.pagination.total + 1;
  
  const reqStoreAccounts = await fetchStoreAccounts(cookies);
  const storeAccounts = await reqStoreAccounts.json();

  return {
    props: {
      user,
      userLastDocNumber,
      locations,
      inven,
      storeSale,
      customer,
      storeAccounts,
    },
  };
};

const fetchUserDoc = async (cookies, userCodeName) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-indexed month, so add 1 to get the current month
  const currentYear = currentDate.getFullYear();

  const startDate = new Date(currentYear, currentMonth - 1, 1); // create a new date object for the first day of the current month
  const endDate = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999); // create a new date object for the last day of the current month

  const startISOString = startDate.toISOString();
  const endISOString = endDate.toISOString();

  const endpoint =
    process.env.NEXT_PUBLIC_URL +
    `/store-sales?filters[no_store_sale][$contains]=${userCodeName}&filters[createdAt][$gte]=${startISOString}&filters[createdAt][$lte]=${endISOString}`;

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

const fetchStoreSale = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/store-sales?populate=*";
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

const fetchCustomer = async (cookies) => {
  let name = "walk in customer";
  const endpoint = process.env.NEXT_PUBLIC_URL + `/customers?filters[name][$contains]=${name}`;
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

  console.log("res get stock at location", res);

  return res;
}

const fetchStoreAccounts = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/store-accounts?populate=*&filters[type][$eq]=TAMBAHAN LAIN 1"+
  "&filters[type][$eq]=TAMBAHAN LAIN 2"+
  "&filters[type][$eq]=TAMBAHAN LAIN 3"+
  "&filters[type][$eq]=ONGKIR&filters[setting][$eq]=true"+
  "&filters[penjualan][$eq]=TOKO";
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

function Toko({ props }) {
  const cookies = nookies.get(null, "token");
  const products = useSelector((state) => state.Sales);
  const dispatch = useDispatch();

  var selectedProduct = products?.productList;
  const locations = props.locations.data;
  const user = props.user;
  const userCodeName = user.codename || "-";

  const userLastDocNumber = props.userLastDocNumber;

  const inven = props.inven.data;
  const storeSale = props.storeSale;
  const customerData = props.customer.data[0];
  const storeAccounts = props.storeAccounts;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [additionalFee, setAdditionalFee] = useState();
  const [isFetchinData, setIsFetchingData] = useState(false);

  const [dataValues, setDataValues] = useState();
  const [selectedCategory, setSelectedCategory] = useState("BEBAS");
  const [selectedLocationId, setSelectedLocationId] = useState();
  const [dataLocationStock, setDataLocationStock] = useState();

  const [listId, setListId] = useState([]);
  const [productTotalPrice, setProductTotalPrice] = useState({});
  const [productSubTotal, setProductSubTotal] = useState({});
  const [discType, setDiscType] = useState();
  const [discPrice, setDiscPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [dppPrice, setdppPrice] = useState(0);
  const [ppnPrice, setppnPrice] = useState(0);

  const [dppActive, setDPPActive] = useState(true);
  const [ppnActive, setPPNActive] = useState(true);
  const [isDPPActive, setIsDPPActive] = useState(true);
  const [discMax, setDiscMax] = useState();
  const [discValue, setDiscValue] = useState(0);

  //Akun COA
  const [akunCOAONGKIR, setAkunCOAONGKIR] = useState();
  const [akunCOALAIN, setAkunCOALAIN] = useState();
  const [akunCOALAIN2, setAkunCOALAIN2] = useState();
  const [akunCOALAIN3, setAkunCOALAIN3] = useState();
  
  const router = useRouter();
  const { TextArea } = Input;
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var date = today.getDate() + "/" + mm + "/" + yyyy;
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  let dppValue = 0;
  let ppnValue = 0;

  // DPP & PPN
  const [dpp, setDPP] = useState(0);
  const [ppn, setPPN] = useState(0);

  // temp
  const [biayaTambahan, setBiayaTambahan] = useState();
  const [biayaPengiriman, setBiayaPengiriman] = useState(0);

  const [lokasiGudang, setLokasiGudang] = useState();

  const tempList = [];
  const [info, setInfo] = useState();

  // customer
  const [customer, setCustomer] = useState();

  // NO Store Sale
  const trxNumber = String(userLastDocNumber).padStart(3, "0");

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
        setLokasiGudang({
          ...lokasiGudang,
          [idx]: sortedBasedOnQty,
        });
      }

      console.log(`response ${unit}`, response?.stock?.[unit]);

      const stringArr = [];

      for (const [key, value] of Object.entries(response?.stock)) {
        stringArr.push(`${value} ${key}`);
      }

      return response.available ? stringArr.join(", ") : "Stok kosong";
    } catch (error) {
      console.log("error", error);
      setDataLocationStock({
        ...dataLocationStock,
        [productId]: "Error fetching stock data",
      });
    }
  };

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onFinish = async (values, accept) => {
    if (accept) {
      setLoading(true);
      // const isShowingPopup = await checkReturQty(values);
      // console.log("isShowingPopup", isShowingPopup);
      // if (isShowingPopup) {
      //   setLoading(false);
      //   return;
      // }

      setInfo("sukses");
      storeSale.data.forEach((element) => {
        if (values.no_store_sale == element.attributes.no_store_sale) {
          notification["error"]({
            message: "Gagal menambahkan data",
            description: "Data gagal ditambahkan, karena no penjualan sama",
          });
          setInfo("gagal");
        }
      });
      setDataValues(values);
      setLoading(false);
    } else {
      confirm({
        title: "Apakah anda yakin?",
        icon: <ExclamationCircleOutlined />,
        content: "Harap periksa kembali data yang telah diinput.",
        okText: "Ya",
        okType: "danger",
        cancelText: "Tidak",
        centered: true,
        onOk() {
          onFinish(values, true);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  };

  const checkStokGudang = () => {
    console.log("dataLocationStock", dataLocationStock);
    const availableStock = Object.values(dataLocationStock).every((stock) => stock);

    return availableStock;
  };

  const createDetailSale = async () => {
    const stokAda = checkStokGudang();

    if (stokAda) {
      await createDetailSaleFunc(
        dataValues,
        products,
        productTotalPrice,
        productSubTotal,
        setListId,
        "/store-sale-details",
        form,
        lokasiGudang
      );
    } else {
      notification["error"]({
        message: "Gagal menambahkan data",
        description: "Stok di gudang tidak mencukupi",
      });
    }
  };

  const createSale = async (values) => {
    values.sale_date = today;
    values.added_by = user.name;
    values.category = selectedCategory;
    values.dpp = dppPrice;
    values.ppn = ppnPrice;
    values.customer = customer;
    values.delivery_fee = biayaPengiriman;
    values.gudang_out = lokasiGudang;
    await createSaleFunc(grandTotal, totalPrice, values, listId, form, router, "/store-sales/", "store sale");
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
    setDiscValue(disc.disc_value);
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
    setDiscValue((totalPrice * disc.disc_value) / 100);
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
    if (products.productList.length > 0) {
      const index = products.productList.length - 1;
      const formDiscValues = form.getFieldValue("disc_rp");

      inven.forEach((element) => {
        products.productList.forEach((data) => {
          if (data.id == element.attributes.products?.data[0]?.id) {
            data.stock = element.attributes.total_stock;
          }
        });
      });
    }
  }, [products.productList]);

  useEffect(() => {
    sumAdditionalPrice();
  }, [additionalFee]);

  useEffect(() => {
    console.log("list id", listId);
    if (listId.length > 0) {
      createSale(dataValues);
    }
  }, [listId]);

  useEffect(() => {
    if (dataValues && info == "sukses") createDetailSale();
  }, [dataValues]);

  useEffect(() => {
    dppValue = totalPrice / 1.11;
    ppnValue = (dppValue * 11) / 100;
    dppActive ? setdppPrice(dppValue) : setdppPrice(0);
    ppnActive ? setppnPrice(ppnValue) : setppnPrice(0);
  }, [dppActive, ppnActive, grandTotal, isDPPActive]);

  useEffect(() => {
    // set max value
    if (discType == "Tetap") setDiscMax(totalPrice);
    if (discType == "Persentase") setDiscMax(100);
  }, [discType]);

  useEffect(() => {
    if(akunCOAONGKIR){
      form.setFieldsValue({
        akunCOA: {
          label: `${akunCOAONGKIR?.attributes?.nama}`,
          value: akunCOAONGKIR?.id,
        }
      });
    } 
    
    if(akunCOALAIN || akunCOALAIN2 || akunCOALAIN3){
      form.setFieldsValue({
        akun: {
          label: `${akunCOALAIN?.attributes?.nama}`,
          value: akunCOALAIN?.id,
        },
        lain_coa1: {
          label: `${akunCOALAIN?.attributes?.nama}`,
          value: akunCOALAIN?.id,
        },
        lain_coa2: {
          label: `${akunCOALAIN2?.attributes?.nama}`,
          value: akunCOALAIN2?.id,
        },
        lain_coa3: {
          label: `${akunCOALAIN3?.attributes?.nama}`,
          value: akunCOALAIN3?.id,
        }
      });
    }

  }, [akunCOAONGKIR, akunCOALAIN]);

  useEffect(() => {
    // used to reset redux from value before
    clearData();
    setProductSubTotal({});
    fetchLatestNoReferensi();
    form.setFieldsValue({
      customer: customerData?.attributes.name,
    });
    setCustomer(customerData);

    if (storeAccounts.data.length > 0){

      storeAccounts.data.map((item) => {
        if (item.attributes.type === "ONGKIR") {
          setAkunCOAONGKIR(item.attributes.chart_of_account.data);
        }
        if (item.attributes.type === "TAMBAHAN LAIN 1"){
          setAkunCOALAIN(item.attributes.chart_of_account.data);
        } 
        if (item.attributes.type === "TAMBAHAN LAIN 2"){
          setAkunCOALAIN2(item.attributes.chart_of_account.data);
        } 
        if (item.attributes.type === "TAMBAHAN LAIN 3"){
          setAkunCOALAIN3(item.attributes.chart_of_account.data);
        } 
      });
    }

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

  const buttonProps = {
    BEBAS: {
      className: "bg-cyan-700 rounded-md m-1 text-sm",
      selectedClassName: "bg-white rounded-md border border-cyan-700 m-1 text-sm",
      label: "BEBAS",
    },
    RESEP: {
      className: "bg-cyan-700 rounded-md m-1 text-sm",
      selectedClassName: "bg-white rounded-md border border-cyan-700 m-1 text-sm",
      label: "RESEP",
    },
  };

  async function fetchLatestNoReferensi() {
    const codename = await getUserCodeName();

    const endpoint = `${process.env.NEXT_PUBLIC_URL}/store-sales?sort[0]=id:desc&pagination[limit]=1&filters[no_store_sale][$contains]=${codename}/OT/`;
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
      const no = parseInt(latestDaata?.attributes?.no_store_sale?.split("/")?.[2] || 0) + 1;
      console.log("no", no);
      const latestNoReferensi = `${codename}/OT/${String(no).padStart(5, "0")}/${moment().format("MM/YYYY")}`;
      form.setFieldsValue({
        no_store_sale: latestNoReferensi,
      });
      return latestNoReferensi;
    }

    console.log("response from fetchLatestNoReferensi", response);
  }

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
  };

  const handleEnterSubmit = (e) => {
    if (e.keyCode === 13) {
      onFinish(form.getFieldsValue(), false);
    }
  };

  return (
    <>
      <Head>
        <title>Penjualan Toko</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Penjualan Toko"} />
          <LayoutContent>
            <Row justify="space-between">
              <button disabled className="bg-yellow-500 rounded-md">
                <p className="px-3 py-2 m-0 font-bold text-white uppercase">{selectedCategory}</p>
              </button>
              <div>
                {Object.keys(buttonProps).map((category) => (
                  <button
                    key={category}
                    onClick={() => handleButtonClick(category)}
                    className={
                      selectedCategory === category
                        ? buttonProps[category].selectedClassName
                        : buttonProps[category].className
                    }
                  >
                    <p className={`px-4 py-2 m-0 text-${selectedCategory === category ? "cyan-700" : "white"}`}>
                      {buttonProps[category].label}
                    </p>
                  </button>
                ))}

                <button className="bg-cyan-700 rounded-md m-1 text-sm">
                  <p className="px-4 py-2 m-0 text-white">Laporan Penjualan</p>
                </button>
              </div>
              <div>
                <p>{user.name}</p>
              </div>
            </Row>

            <Form
              form={form}
              name="add"
              initialValues={{
                remember: true,
              }}
              onFinish={(values) => onFinish(values, false)}
              onFinishFailed={validateError}
              // onKeyUp={handleEnterSubmit}
            >
              <DateTimeComponent />
              <div className="w-full flex flex-wrap justify-start -mx-3 mb-6 mt-1">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_store_sale"
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
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="customer_name">
                    <Input style={{ height: "40px" }} placeholder="Nama Pelanggan" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="address">
                    <Input style={{ height: "40px" }} placeholder="Alamat" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="phone">
                    <Input style={{ height: "40px" }} placeholder="No. Telp" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="faktur">
                    <Input style={{ height: "40px" }} placeholder="Faktur" />
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
                    setDataLocationStock={setDataLocationStock}
                    formObj={form}
                    getProduct={getProductAtLocation}
                  />
                </div>
              )}
              <div className="flex justify-end">
                <p className="font-bold">Total Item : {products.productList.length} </p>
              </div>
              <div className="flex justify-end transition-all">
                <Row>
                  <p className="font-bold">Total Harga :</p>
                  {discPrice === 0 ? (
                    <p></p>
                  ) : (
                    <p className="font-bold text-red-500 ml-2">{formatter.format(discPrice || 0)}</p>
                  )}
                  {discPrice === 0 ? (
                    <p className="font-bold ml-2">{formatter.format(totalPrice || 0)}</p>
                  ) : (
                    <p className="font-bold line-through ml-2 ">{formatter.format(totalPrice || 0)}</p>
                  )}
                </Row>
              </div>{" "}
              <div className="flex justify-end transition-all">
                <Row>
                  <p className="font-bold">DPP :</p>
                  {discPrice === 0 ? (
                    <p></p>
                  ) : (
                    <p className="font-bold text-red-500 ml-2">
                      {isDPPActive ? formatter.format(dppPrice - discValue) : formatter.format(0)}
                    </p>
                  )}

                  {""}

                  {discPrice === 0 ? (
                    <p className="font-bold ml-2">{isDPPActive ? formatter.format(dppPrice) : formatter.format(0)}</p>
                  ) : (
                    <p className="font-bold line-through ml-2 ">
                      {isDPPActive ? formatter.format(dppPrice) : formatter.format(0)}
                    </p>
                  )}
                </Row>
              </div>
              <div className="flex justify-end transition-all">
                <Row>
                  <p className="font-bold">PPN :</p>
                  {discPrice === 0 ? (
                    <p></p>
                  ) : (
                    <p className="font-bold text-red-500 ml-2">
                      {isDPPActive ? formatter.format(ppnPrice - discValue) : formatter.format(0)}
                    </p>
                  )}
                  {discPrice === 0 ? (
                    <p className="font-bold ml-2">{isDPPActive ? formatter.format(ppnPrice) : formatter.format(0)}</p>
                  ) : (
                    <p className="font-bold line-through ml-2 ">
                      {isDPPActive ? formatter.format(ppnPrice) : formatter.format(0)}
                    </p>
                  )}
                </Row>
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
                      disabled
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
                      disabled
                    />
                  </Form.Item>
                </div>
                {/* <div className="w-full md:w-1/3 px-3 mt-5 ">
                  <Form.Item name="delivery_fee" noStyle>
                    <InputNumber
                      placeholder="Biaya Pengiriman"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      onChange={setBiayaPengiriman}
                    />
                  </Form.Item>
                </div> */}
              </div>
              <div className="w-full flex flex-wrap -mx-3 my-1 ">
                <div className="w-full md:w-1/3 px-3">
                  <Form.Item name="DPP_active">
                    <Select
                      placeholder="Pakai DPP"
                      defaultValue={dppActive}
                      onChange={(e) => {
                        // isDPPActive(e);
                        setIsDPPActive(e);
                        setDPPActive(e);
                      }}
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value={true} key={"DPP"}>
                        DPP
                      </Select.Option>
                      <Select.Option value={false} key={"Active"}>
                        Tidak Ada
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <Form.Item name="PPN_active">
                    <Select
                      placeholder="Pakai PPN"
                      onChange={(e) => {
                        // isDPPActive(e);
                        setIsDPPActive(e);
                        setPPNActive(e);
                      }}
                      defaultValue={ppnActive}
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value={true} key={"PPN"}>
                        PPN
                      </Select.Option>
                      <Select.Option value={false} key={"Active"}>
                        Tidak Ada
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="w-full flex flex-wrap -mx-3 my-1 ">
                <div className="w-full md:w-1/3 px-3">
                  <div className="w-full md:w-full mb-2 md:mb-0">
                    <Form.Item name="delivery_coa" noStyle>
                      <CoaSale onChange={setAkunCOAONGKIR} selectedAkun={akunCOAONGKIR} disabled/>
                    </Form.Item>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <Form.Item name="delivery_fee" noStyle>
                    <InputNumber
                      placeholder="Titipan Ongkir"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      onChange={setBiayaPengiriman}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="w-full flex md:w-3/4 justify-end mb-2">
                <p className="mb-4 font-bold text-center">Biaya Tambahan Lain Lain</p>
              </div>
              <div className="w-full flex flex-wrap justify-end mb-3">
                <div className="w-full md:w-1/3 px-3 mb-2 text-center md:mb-0">
                  <p className="mb-4 font-bold">Akun</p>
                  <Form.Item name="lain_coa1">
                    <Select
                      disabled
                      size="large"
                      style={{ width: "100%" }}
                    >
                    </Select>
                  </Form.Item>
                  <Form.Item name="lain_coa2">
                    <Select
                      disabled
                      size="large"
                      style={{ width: "100%" }}
                    >
                    </Select>
                  </Form.Item>
                  <Form.Item name="lain_coa3">
                    <Select
                      disabled
                      size="large"
                      style={{ width: "100%" }}
                    >
                    </Select>
                  </Form.Item>
                </div>
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
              <div className="flex justify-end">
                <p className="font-bold text-lg">Total Penjualan: {formatter.format(grandTotal)}</p>
              </div>
              <div className="w-full flex justify-between">
                <Form.Item name="sale_staff" className="w-full ">
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
                      <p className="px-4 py-2 m-0 text-white">SIMPAN DAN CETAK UNTUK PEMBAYARAN</p>
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
