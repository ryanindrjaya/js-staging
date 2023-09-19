import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Form, Input, InputNumber, Select, Button, Spin, notification, Modal } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import SearchBar from "../../../../components/Form/AddOrder/SearchBar";
import StoreSaleTable from "../../../../components/ReactDataTable/Selling/StoreSaleTable";
import ReportTodayTable from "../../../../components/ReactDataTable/Selling/ReportTodayTable";
import createSaleFunc from "../utility/createSale";
import createDetailSaleFunc from "../utility/createDetailSale";
import calculatePrice from "../utility/calculatePrice";
import nookies from "nookies";
import LoadingAnimations from "@iso/components/Animations/Loading";
import Customer from "@iso/components/Form/AddSale/CustomerForm";
import ConfirmDialog from "@iso/components/Alert/ConfirmDialog";
import createInventory from "../utility/createInventory";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import confirm from "antd/lib/modal/confirm";
import { InventoryOutFromPanel } from "../../../../library/functions/createInventory";
import getUserCodeName from "../../../../library/functions/getUserCodeName";
import moment from "moment";
import CoaSale from "@iso/components/Form/AddSale/SearchCOA";

Toko.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  const reqInven = await fetchInven(cookies);
  const inven = await reqInven.json();

  const reqPanel = await fetchPanel(cookies);
  const panel = await reqPanel.json();

  const reqCustomer = await fetchCustomer(cookies);
  const customer = await reqCustomer.json();

  const reqStoreAccounts = await fetchStoreAccounts(cookies);
  const storeAccounts = await reqStoreAccounts.json();

  return {
    props: {
      user,
      locations,
      inven,
      panel,
      customer,
      storeAccounts,
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

const fetchPanel = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/panel-sales?populate=*";
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/customers?populate=*";
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

const fetchStoreAccounts = async (cookies) => {
  const endpoint =
    process.env.NEXT_PUBLIC_URL +
    "/store-accounts?populate=*" +
    "&filters[type][$eq]=ONGKIR&filters[setting][$eq]=true" +
    "&filters[penjualan][$eq]=PANEL";
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
  const products = useSelector((state) => state.Sales);
  const dispatch = useDispatch();

  var selectedProduct = products?.productList;
  const locations = props.locations.data;
  const user = props.user;
  const inven = props.inven.data;
  const panel = props.panel;
  const customerData = props.customer;
  const storeAccounts = props.storeAccounts;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [additionalFee, setAdditionalFee] = useState();
  const [isFetchinData, setIsFetchingData] = useState(false);

  const [dataValues, setDataValues] = useState();
  const [selectedCategory, setSelectedCategory] = useState("BEBAS");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [dataLocationStock, setDataLocationStock] = useState();

  const [listId, setListId] = useState([]);
  const [productTotalPrice, setProductTotalPrice] = useState({});
  const [productSubTotal, setProductSubTotal] = useState({});
  const [discType, setDiscType] = useState();
  const [discPrice, setDiscPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [limitCredit, setLimitCredit] = useState(0);
  var totalBelumDibayar = 0;

  const [dppActive, setDPPActive] = useState("DPP");
  const [ppnActive, setPPNActive] = useState("PPN");
  const [simpanData, setSimpanData] = useState("Publish");
  const [discMax, setDiscMax] = useState();

  const [location, setLocation] = useState();
  const [locationData, setLocationData] = useState();

  const [lokasiGudang, setLokasiGudang] = useState();

  const [open, setOpen] = useState(false);

  const submitBtn = useRef();
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

  // customer
  const [customer, setCustomer] = useState();

  // NO Panel Sale
  var noPanelSale = String(panel?.meta?.pagination.total + 1).padStart(3, "0");
  const [categorySale, setCategorySale] = useState(`PN/ET/${user.id}/${noPanelSale}/${mm}/${yyyy}`);

  //Akun COA
  const [akunCOAONGKIR, setAkunCOAONGKIR] = useState();

  const handleBiayaPengiriman = (values) => {
    setBiayaPengiriman(values.target.value);
  };

  const getProductAtLocation = async (unit = 1, changedIdx = products?.productList?.length - 1 ?? 0) => {
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

  console.log("dataLocationStock", dataLocationStock);

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

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const cekLimit = async () => {
    totalBelumDibayar = grandTotal;

    panel.data.forEach((element) => {
      if (customer?.id == element.attributes.customer?.data?.id) totalBelumDibayar += element.attributes.total;
    });

    customerData.data.forEach((element) => {
      if (customer?.id == element.id && totalBelumDibayar > element.attributes.credit_limit) {
        notification["error"]({
          message: "Gagal menambahkan data",
          description: "Data gagal ditambahkan, karena melebihi limit kredit",
        });
        setInfo("gagal");
      }
    });
  };

  const calculateDifference = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    var difference = null;

    if (isNaN(d1) || isNaN(d2)) {
      difference = "Invalid";
    } else {
      const timeDiff = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      difference = diffDays;
    }

    return difference;
  };

  const cekTermin = async () => {
    let data = null;

    panel.data.some((element) => {
      if (customer.id == element.attributes.customer.data.id && element.attributes.status == "Belum Dibayar") {
        //if (element.attributes.sale_date )
        data = element;
        return true;
      }
    });

    if (data != null) {
      var difference = calculateDifference(data.attributes.sale_date, today);

      var type = customer.attributes.credit_limit_duration_type;
      var duration = customer.attributes.credit_limit_duration;
      if (type == "Hari" && difference > duration) console.log("termin hari aman");
      else if (type == "Bulan" && difference > duration * 30) console.log("termin bulan aman");
      else {
        notification["info"]({
          message: "Ada penjualan yang belum dibayar",
          description: "Dengan no : " + data.attributes.no_panel_sale,
        });
      }
    }
  };

  const onFinish = (values, accept) => {
    if (accept) {
      const stokAda = Object.values(dataLocationStock).every((stock) => stock);
      const creditEnough = limitCredit >= grandTotal;

      if (!creditEnough) {
        notification["error"]({
          message: "Limit Kredit tidak cukup",
          description: "Limit Kredit customer tidak mencukupi untuk melakukan penjualan",
        });
        return;
      }

      if (!stokAda) {
        notification["error"]({
          message: "Stok tidak cukup",
          description: "Stok di gudang tidak mencukupi untuk melakukan penjualan",
        });
        return;
      }

      totalBelumDibayar = grandTotal;
      setLoading(true);
      values.status_data = simpanData;
      setInfo("sukses");
      panel.data.forEach((element) => {
        if (values.no_panel_sale == element.attributes.no_panel_sale) {
          notification["error"]({
            message: "Gagal menambahkan data",
            description: "Data gagal ditambahkan, karena no penjualan sama",
          });
          setInfo("gagal");
        }

        if (customer.id == element.attributes.customer?.data?.id) totalBelumDibayar += element.attributes.total;
      });

      cekLimit();
      cekTermin();

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

  const createDetailSale = async () => {
    await createDetailSaleFunc(
      dataValues,
      products,
      productTotalPrice,
      productSubTotal,
      setListId,
      "/panel-sale-details",
      form,
      lokasiGudang
    );
  };

  const createSale = async (values, simpanData) => {
    values.sale_date = today;
    values.added_by = user.name;
    //values.category = selectedCategory;
    values.dpp = dpp;
    values.ppn = ppn;
    values.customer = customer;
    values.area = customer?.attributes?.area?.data;
    values.wilayah = customer?.attributes?.wilayah?.data;
    const dataId = await createSaleFunc(
      grandTotal,
      totalPrice,
      values,
      listId,
      form,
      router,
      "/panel-sales/",
      "panel sale",
      null,
      null,
      simpanData
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

  const clearData = () => {
    dispatch({ type: "CLEAR_DATA" });
    setTotalPrice(0);
  };

  //modal laporan hari ini
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    //setModalText('The modal will be closed after two seconds');
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  //end modal laporan hari ini

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
      createSale(dataValues, simpanData);
    }
  }, [listId, simpanData]);

  useEffect(() => {
    if (dataValues && info == "sukses") createDetailSale();
  }, [dataValues]);

  useEffect(() => {
    // set dpp
    if (dppActive == "DPP") {
      setDPP(totalPrice / 1.11);
    } else {
      setDPP(0);
    }
  }, [dppActive, grandTotal]);

  useEffect(() => {
    // set ppn
    if (ppnActive == "PPN") {
      setPPN(((totalPrice / 1.11) * 11) / 100);
    } else {
      setPPN(0);
    }
  }, [ppnActive, grandTotal]);

  useEffect(() => {
    locations.forEach((element) => {
      if (element.id == location) setLocationData(element.attributes);
    });
  }, [location]);

  useEffect(() => {
    // set max value
    if (discType == "Tetap") setDiscMax(totalPrice);
    if (discType == "Persentase") setDiscMax(100);
  }, [discType]);

  useEffect(() => {
    // set limit credit value
    totalBelumDibayar = 0;
    if (customer) {
      panel.data.forEach((element) => {
        if (customer.id == element.attributes.customer?.data?.id) totalBelumDibayar += element.attributes.total;
      });

      setLimitCredit(customer?.attributes?.credit_limit - totalBelumDibayar);
      form.setFieldsValue({
        limitCredit: formatter.format(customer?.attributes?.credit_limit - totalBelumDibayar),
      });

      var tempoDays = customer?.attributes?.credit_limit_duration;
      form.setFieldsValue({
        tempo_days: tempoDays.toString(),
        tempo_time: customer?.attributes?.credit_limit_duration_type,
      });
    }
  }, [customer]);

  useEffect(() => {
    if (akunCOAONGKIR) {
      form.setFieldsValue({
        akunCOA: {
          label: `${akunCOAONGKIR?.attributes?.nama}`,
          value: akunCOAONGKIR?.id,
        },
      });
    }
  }, [akunCOAONGKIR]);

  async function fetchLatestNoReferensi() {
    const codename = await getUserCodeName();

    const endpoint = `${process.env.NEXT_PUBLIC_URL}/panel-sales?sort[0]=id:desc&pagination[limit]=1&filters[no_panel_sale][$contains]=${codename}/PN/`;
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
      const no = parseInt(latestDaata?.attributes?.no_panel_sale?.split("/")?.[2] || 0) + 1;
      console.log("no", no);
      const latestNoReferensi = `${codename}/PN/${String(no).padStart(5, "0")}/${moment().format("MM/YYYY")}`;
      form.setFieldsValue({
        no_panel_sale: latestNoReferensi,
      });
      return latestNoReferensi;
    }

    console.log("response from fetchLatestNoReferensi", response);
  }

  useEffect(() => {
    // used to reset redux from value before
    clearData();

    fetchLatestNoReferensi();
    setProductSubTotal({});
    //form.setFieldsValue({
    //  customer: customerData?.attributes.name,
    //});
    //setCustomer(customerData);

    if (storeAccounts.data.length > 0) {
      storeAccounts.data.map((item) => {
        if (item.attributes.type === "ONGKIR") {
          setAkunCOAONGKIR(item.attributes.chart_of_account.data);
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

  return (
    <>
      <Head>
        <title>Penjualan Panel</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Penjualan Panel"} />
          <LayoutContent>
            <div className="w-full flex justify-between mx-2 mt-1">
              <div className="w-full justify-start md:w-1/3">
                <p>
                  {date} {time}
                </p>
              </div>
              <div className="w-full flex justify-center md:w-1/3">
                <button onClick={showModal} className="bg-cyan-700 rounded-md m-1 text-sm">
                  <p className="px-4 py-2 m-0 text-white">Laporan Penjualan Hari Ini</p>
                </button>
              </div>
              <div className="w-full flex justify-end text-right md:w-1/3">
                <p>{user.name}</p>
              </div>

              <Modal
                title="Laporan Penjualan Hari Ini"
                open={open}
                width={1200}
                //onOk={handleOk}
                //confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={<div></div>}
              >
                <ReportTodayTable data={panel} page="panel" />
              </Modal>
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
                    name="no_panel_sale"
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
                  <Customer onChangeCustomer={setCustomer} page={"PANEL"} />
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
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="limitCredit" noStyle>
                    <Input
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      suffix="Limit Kredit"
                      disabled
                      defaultValue={formatter.format(limitCredit)}
                    />
                  </Form.Item>
                </div>

                <div className="w-full md:w-1/3 px-3 mb-2">
                  <p className="m-0">Keterangan : {}</p>
                  <p className="m-0"> {customer?.attributes?.address}</p>
                  <p> {locationData?.city}</p>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2">
                  <Form.Item name="no_inventory">
                    <Input style={{ height: "40px" }} placeholder="No Inv" />
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
                    formObj={form}
                    setDataLocationStock={setDataLocationStock}
                    getProduct={getProductAtLocation}
                    editPriceDisc={true}
                  />
                </div>
              )}

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
                <div className="w-full flex justify-end px-3 -mt-16">
                  <Form.Item name="totalItem" className="font-bold text-lg">
                    <span> Total Item : {products.productList.length} </span>
                  </Form.Item>
                </div>
                <div className="w-full flex justify-end px-3 -mt-9">
                  <Form.Item name="grandtotal" value={totalPrice} className="font-bold text-lg">
                    <span> Total Harga : {formatter.format(totalPrice)}</span>
                  </Form.Item>
                </div>
                <div className="w-full flex justify-end px-3 -mt-6">
                  <Form.Item name="dpp" value={dpp} className="font-bold text-lg">
                    <span> DPP : {formatter.format(dpp)}</span>
                  </Form.Item>
                </div>
                <div className="w-full flex justify-end px-3 -mt-6">
                  <Form.Item name="ppn" value={ppn} className="font-bold text-lg">
                    <span> PPN : {formatter.format(ppn)}</span>
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex flex-wrap -mx-3 -mt-20 mb-4">
                <div className="w-full md:w-1/3 px-3">
                  <CoaSale onChange={setAkunCOAONGKIR} selectedAkun={akunCOAONGKIR} disabled />
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <Form.Item noStyle>
                    <Input
                      size="large"
                      style={{
                        width: "60%",
                      }}
                      value="Titip Ongkir"
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
                      defaultValue={dppActive}
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
                      defaultValue={ppnActive}
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
                      <Select.Option value="Active" key={"Active"}>
                        Tidak Ada
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              {/* <div className="w-full flex md:w-3/4 justify-end mb-2">
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
              </div> */}

              <div className="w-full flex flex-wrap justify-end mb-3">
                {/*<Form.Item name="dpp" value={dpp} className="w-full h-2 md:w-1/2 mx-2">*/}
                {/*  <span> DPP </span> <span>: {formatter.format(dpp)}</span>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item name="ppn" value={ppn} className="w-full h-2 md:w-1/2 mx-2">*/}
                {/*  <span> PPN </span> <span>: {formatter.format(ppn)}</span>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item name="grandtotal" value={totalPrice} className="w-full h-2 md:w-1/2 mx-2">*/}
                {/*  <span> Total </span> <span>: {formatter.format(totalPrice)}</span>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item name="biayaPengiriman" value={biayaPengiriman} className="w-full h-2 md:w-1/2 mx-2">*/}
                {/*  <span> Biaya Pengiriman </span> <span>: {formatter.format(biayaPengiriman)}</span>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item name="biayaTambahan" value={biayaTambahan} className="w-full h-2 md:w-1/2 mx-2">*/}
                {/*  <span> Biaya Tambahan </span> <span>: {formatter.format(biayaTambahan)}</span>*/}
                {/*</Form.Item>*/}

                <Form.Item
                  name="grandTotal"
                  value={grandTotal}
                  className="w-full flex justify-end h-2 md:w-1/2 mx-2 mt-3"
                >
                  <span className="font-bold text-lg"> Total </span>{" "}
                  <span className="font-bold text-lg">: {formatter.format(grandTotal)}</span>
                </Form.Item>
              </div>

              <div className="w-full flex justify-between">
                <Form.Item name="sale_note" className="w-full md:w-1/2 mx-2">
                  <TextArea rows={4} placeholder="Catatan Penjualan" />
                </Form.Item>
                <Form.Item name="sale_staff" className="w-full md:w-1/2 mx-2">
                  <TextArea rows={4} placeholder="Catatan Staff" />
                </Form.Item>
              </div>

              <div className="w-full flex justify-between">
                <Form.Item>
                  {loading ? (
                    <div className=" flex float-left ml-3 ">
                      <Spin />
                    </div>
                  ) : (
                    <button
                      htmlType="submit"
                      onClick={() => setSimpanData("Draft")}
                      className="bg-cyan-700 rounded-md m-1 text-sm"
                    >
                      <p className="px-20 py-2 m-0 text-white">SIMPAN DRAFT</p>
                    </button>
                  )}
                </Form.Item>
                <Form.Item>
                  {loading ? (
                    <div className=" flex float-left ml-3 ">
                      <Spin />
                    </div>
                  ) : (
                    <>
                      <ConfirmDialog
                        onConfirm={() => submitBtn?.current?.click()}
                        onCancel={() => {}}
                        title="Tambah Panel"
                        message="Silahkan cek kembali data yang telah dimasukkan, apakah anda yakin ingin menambahkan ?"
                        component={
                          <button
                            type="button"
                            className="bg-cyan-700 rounded-md m-1 text-sm"
                            onClick={() => setSimpanData("Publish")}
                          >
                            <p className="px-4 py-2 m-0 text-white">SIMPAN DAN CETAK UNTUK PEMBAYARAN PIUTANG</p>
                          </button>
                        }
                      />
                      <Button htmlType="submit" ref={submitBtn}></Button>
                    </>
                    //<button htmlType="submit" onClick={() => setSimpanData("Publish")} className="bg-cyan-700 rounded-md m-1 text-sm">
                    //  <p className="px-4 py-2 m-0 text-white">
                    //    SIMPAN DAN CETAK UNTUK PEMBAYARAN PIUTANG
                    //  </p>
                    //</button>
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
