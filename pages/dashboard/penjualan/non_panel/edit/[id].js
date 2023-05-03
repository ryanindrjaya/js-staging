import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Form, Input, InputNumber, Select, Button, Spin, notification, Modal } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import StoreSaleTable from "@iso/components/ReactDataTable/Selling/StoreSaleTable";
import ReportTodayTable from "@iso/components/ReactDataTable/Selling/ReportTodayTable";
import createSaleFunc from "../../utility/createSale";
import createDetailSaleFunc from "../../utility/createDetailSale";
import calculatePrice from "../../utility/calculatePrice";
import nookies from "nookies";
import LoadingAnimations from "@iso/components/Animations/Loading";
import Customer from "@iso/components/Form/AddSale/CustomerForm";
import ConfirmDialog from "@iso/components/Alert/ConfirmDialog";
import createInventory from "../../utility/createInventory";
import moment from "moment";

Edit.getInitialProps = async (context) => {
  const cookies = nookies.get(context); console.log("cookies", cookies, context.query.id);
  const idEdit = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/non-panel-sales/" + idEdit + "?populate=deep";
  const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
    },
  };

  const reqEdit = await fetch(endpoint, options);
  const editData = await reqEdit.json();

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  const reqInven = await fetchInven(cookies);
  const inven = await reqInven.json();

  const reqNonPanel = await fetchNonPanel(cookies);
  const nonPanel = await reqNonPanel.json();

  const reqCustomer = await fetchCustomer(cookies);
  const customer = await reqCustomer.json();

  return {
    props: {
      user,
      locations,
      inven,
      nonPanel,
      customer,
      editData
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

const fetchNonPanel = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/non-panel-sales?populate=deep";
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
    const endpoint = process.env.NEXT_PUBLIC_URL + "/inventories?populate=deep";
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
    const endpoint = process.env.NEXT_PUBLIC_URL + "/customers?populate=deep";
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

function Edit({ props }) {
  const products = useSelector((state) => state.Order);
  const dispatch = useDispatch();

  var selectedProduct = products?.productList;
  const locations = props.locations.data;
  const user = props.user;
  const inven = props.inven.data;
  const nonPanel = props.nonPanel;
  const customerData = props.customer;
  const editData = props.editData.data;
  console.log("editData", props.editData, products);

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

  const [dppActive, setDPPActive] = useState("Active");
  const [ppnActive, setPPNActive] = useState("Active");
  const [simpanData, setSimpanData] = useState("Publish");
  const [discMax, setDiscMax] = useState();

  const [location, setLocation] = useState();
  const [locationData, setLocationData] = useState();

  const submitBtn = useRef();
  const router = useRouter();
  const { TextArea } = Input;
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var date = today.getDate()+'/'+mm+'/'+yyyy;
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const [open, setOpen] = useState(false);

  // Limit Credit
  const [limitCredit, setLimitCredit] = useState(0);
  var totalBelumDibayar = 0;

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
  const [customer, setCustomer] = useState(); console.log("customer", customer);

  // NO Non Panel Sale
  var noNonPanelSale = String(nonPanel?.meta?.pagination.total + 1).padStart(3, "0");
  const [categorySale, setCategorySale] = useState(`PNP/ET/${user.id}/${noNonPanelSale}/${mm}/${yyyy}`);

  const handleBiayaPengiriman = (values) => {
    setBiayaPengiriman(values.target.value);
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
    console.log("finish", customerData, customer.id, totalBelumDibayar);

    //totalBelumDibayar = grandTotal;
    //setLoading(true);
    //values.status_data = simpanData;
    //setInfo("sukses");
    //nonPanel.data.forEach((element) => {
    //  if (values.no_non_panel_sale == element.attributes.no_non_panel_sale) {
    //      notification["error"]({
    //          message: "Gagal menambahkan data",
    //          description:
    //              "Data gagal ditambahkan, karena no penjualan sama",
    //      });
    //      setInfo("gagal");
    //  }

    //  if(customer.id == element.attributes.customer.data.id) totalBelumDibayar += element.attributes.total;
    //});

    //customerData.data.forEach((element) => {
    //  console.log("limit", element.attributes.credit_limit);
    //  if(customer.id == element.id && totalBelumDibayar > element.attributes.credit_limit){
    //      notification["error"]({
    //          message: "Gagal menambahkan data",
    //          description:
    //              "Data gagal ditambahkan, karena melebihi limit kredit",
    //      });
    //      setInfo("gagal");
    //  }
    //});

    //setDataValues(values);
    //setLoading(false);
  };

  const createDetailSale = async () => {
    await createDetailSaleFunc(dataValues, products, productTotalPrice, productSubTotal, setListId, "/non-panel-sale-details", form);
  };

  const createSale = async (values) => {
    values.sale_date = today;
    values.added_by = user.name;
    //values.category = selectedCategory;
    values.dpp = dpp;
    values.ppn = ppn;
    values.customer = customer;
    values.area = customer?.attributes?.area?.data;
    values.wilayah = customer?.attributes?.wilayah?.data;
    await createSaleFunc(grandTotal, totalPrice, values, listId, form, router, "/non-panel-sales/", "non panel sale", selectedLocationId, updateStock);
  };

  const updateStock = async (id, locations) => {
    // fetching data to update
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };
    const endpoint = process.env.NEXT_PUBLIC_URL + `/non-panel-sales/${id}?populate=deep`;
    const req = await fetch(endpoint, options);
    const res = await req.json();
    const row = res.data; console.log("row stock", row);

    const trxStatus = row.attributes?.status_data;
    //const LPBLocationId = row.attributes.location?.data?.id;

    if (trxStatus == "Publish") {
      // invetory handle
      console.log("inventory", row, locations);
      createInventory(row, locations);
      //await updateProductFromTable(row);
    }

    //const poData = row.attributes?.purchase?.data;

    //const resPO = await changeStatusPO(poData?.id, trxStatus);

    //if (resPO.data) {
    //  await changeStatusLPB(id, trxStatus);
    //}
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
            description:
                "Disc tetap tidak boleh melebihi total",
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
            description:
                "Disc persentase tidak boleh 100%",
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
    console.log('Clicked cancel button');
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
    if(products.productList.length > 0){ 
        inven.forEach((element) => {
            products.productList.forEach((data) => {
              if (data.id == element.attributes.products?.data[0]?.id) {
                data.stock = element.attributes.total_stock;
              }  
            });
          }
        );
    }
  }, [products.productList]);

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
  }, [dppActive, grandTotal]);

  useEffect(() => {
    // set ppn
    if(ppnActive == "PPN"){
      setPPN((grandTotal / 1.11) * 11 / 100);
    } else {
      setPPN(0);
    }
  }, [ppnActive, grandTotal]);

  useEffect(() => {
    locations.forEach((element) => {
      if (element.id == location) setLocationData(element.attributes);
    })
  }, [location]);

  useEffect(() => {
    // set max value
    if(discType == "Tetap") setDiscMax(totalPrice);
    if(discType == "Persentase") setDiscMax(100);
  }, [discType]);

  useEffect(() => {
    // set limit credit value
    totalBelumDibayar = 0;
    if(customer){
      nonPanel.data.forEach((element) => {
        if(customer.id == element.attributes.customer.data.id) totalBelumDibayar += element.attributes.total;
      });

      setLimitCredit(customer?.attributes?.credit_limit - totalBelumDibayar);
      form.setFieldsValue({
        limitCredit: formatter.format(customer?.attributes?.credit_limit - totalBelumDibayar),
      });
    }
    console.log("cust", limitCredit - totalBelumDibayar);
  }, [customer]);

  useEffect(() => {
    // used to reset redux from value before
    setIsFetchingData(true);
    clearData();
    setProductSubTotal({});

    var detailsData = editData.attributes?.non_panel_sale_details?.data;
    var dpp = "Active";
    var ppn = "Active";

    if (editData.attributes?.dpp != 0 && editData.attributes?.dpp != null && editData.attributes?.dpp != undefined) dpp = "DPP";
    if (editData.attributes?.ppn != 0 && editData.attributes?.ppn != null && editData.attributes?.ppn != undefined) ppn = "PPN";

    form.setFieldsValue({
      //customer: customerData?.attributes.name,
      no_non_panel_sale: editData.attributes?.no_non_panel_sale,
      no_inventory: editData.attributes?.no_inventory,
      tempo_days: editData.attributes?.tempo_days,
      tempo_time: editData.attributes?.tempo_time,
      customer: {
        label: editData.attributes?.customer?.data.attributes.name,
        value: editData.attributes?.customer?.data.id,
      },
      location: editData.attributes?.location?.data.id,

      DPP_active: dpp,
      PPN_active: ppn,

      additional_fee_1_desc: editData.attributes?.additional_fee_1_desc,
      additional_fee_1_sub: editData.attributes?.additional_fee_1_sub,
      additional_fee_2_desc: editData.attributes?.additional_fee_2_desc,
      additional_fee_2_sub: editData.attributes?.additional_fee_2_sub,
      additional_fee_3_desc: editData.attributes?.additional_fee_3_desc,
      additional_fee_3_sub: editData.attributes?.additional_fee_3_sub,

      sale_note: editData.attributes?.sale_note,
      sale_staff: editData.attributes?.sale_staff,
    });

    setCustomer(editData.attributes?.customer?.data);
    setSelectedLocationId(editData.attributes?.location?.data.id);
    getProductAtLocation(editData.attributes?.location?.data.id);
    setDPP(editData.attributes?.dpp);
    setDPPActive(dpp);
    setPPN(editData.attributes?.ppn);
    setPPNActive(ppn);
    setAdditionalFee({
        ...additionalFee,
        additional_fee_1_sub: editData.attributes?.additional_fee_1_sub,
        additional_fee_2_sub: editData.attributes?.additional_fee_2_sub,
        additional_fee_3_sub: editData.attributes?.additional_fee_3_sub,
    })

    var id = 0;
    detailsData.forEach((items) => {
      var indexUnit = 1;
      var unitOrder = items.attributes.unit;
      var productUnit = items.attributes.product.data.attributes;

      for (let index = 1; index < 6; index++) {
        if (unitOrder === productUnit[`unit_${index}`]) {
          indexUnit = index;
        }
      }

      //var dateString = items.attributes.expired_date;
      var dateString = new Date();
      var momentObj = moment(dateString, "MM-DD-YYYY");
      var momentString = momentObj.format("MM-DD-YYYY");
      //const productId = items.attributes.product.data.id;
      console.log("details data", items, dateString, momentObj, momentString);

      form.setFieldsValue({
        jumlah_option: {
            [id]: items.attributes.unit,
        },
        jumlah_qty: {
            [id]: items.attributes.qty,
        },
        margin: {
            [id]: items.attributes.margin,
        },
        disc_rp1: {
            [id]: items.attributes.disc1,
        },
        disc_rp2: {
            [id]: items.attributes.disc2,
        },
        expired_date: {
            [id]: moment(items.attributes.expired_date),
        },
      });

      //SET INITIAL PRODUCT
        dispatch({
            type: "SET_SALE_INITIAL_PRODUCT",
            product: items?.attributes?.product?.data,
            qty: items?.attributes?.qty,
            unit: items?.attributes?.unit,
            unitIndex: indexUnit,
            priceUnit: items?.attributes?.unit_price,
            disc: items?.attributes?.disc,
            margin: items?.attributes?.margin,
            //priceAfterDisc,
            //subTotal,
            d1: items?.attributes?.disc1 ?? 0,
            d2: items?.attributes?.disc2 ?? 0,
            index: id,
        });

        id++;
    });

    setTimeout(() => {
      setIsFetchingData(false);
    }, 3000);
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
        <title>Penjualan Non Panel</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Edit Penjualan Non Panel"} />
          <LayoutContent>
            <div className="w-full flex justify-between mx-2 mt-1">
                <div className="w-full justify-start md:w-1/3">
                  <p>{date} {time}</p>
                </div>
                <div className="w-full flex justify-center md:w-1/3">
                  <button
                    onClick={showModal}
                    className="bg-cyan-700 rounded-md m-1 text-sm"
                  >
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
                 <ReportTodayTable
                   data={nonPanel}
                   page="non panel"
                 />
              </Modal>
            </div>

            <Form
              form={form}
              name="add"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={validateError}
            >

              <div className="w-full flex flex-wrap justify-start -mx-3 mb-6 mt-5">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_non_panel_sale"
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
                  <Customer onChangeCustomer={setCustomer} page={"NON PANEL"} />
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
                  <p className="m-0">Keterangan : {console.log("customer", customer)}</p>
                  <p className="m-0"> {customer?.attributes?.address}</p>
                  {/*<p> {locationData?.city}</p>*/}
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2">
                  <Form.Item name="no_inventory">
                    <Input style={{ height: "40px" }} placeholder="No Inv" />
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
                        console.log("location e", e);
                      }}
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
              </div>

              <div className="w-full flex md:w-4/4 px-3 mb-2 mt-2 mx-0  md:mb-0">
                  <SearchBar
                    form={form}
                    tempList={tempList}
                    onChange={onChangeProduct}
                    user={user}
                    selectedProduct={selectedProduct}
                    isBasedOnLocation={false}
                  />
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
                      dataLocationStock={dataLocationStock}
                      formObj={form}
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
                    <span> Total Item : {products.productList.length}{" "} </span>
                  </Form.Item>
                </div>
                <div className="w-full flex justify-end px-3 -mt-9">
                  <Form.Item name="dpp" value={dpp} className="font-bold text-lg">
                    <span> Total Harga : {formatter.format(totalPrice)}</span>
                  </Form.Item>
                </div>
                <div className="w-full flex justify-end px-3 -mt-6">
                  <Form.Item name="ppn" value={ppn} className="font-bold text-lg">
                    <span> DPP : {formatter.format(dpp)}</span>
                  </Form.Item>
                </div>
                <div className="w-full flex justify-end px-3 -mt-6">
                  <Form.Item name="grandtotal" value={totalPrice} className="font-bold text-lg">
                    <span> PPN : {formatter.format(ppn)}</span>
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex flex-wrap -mx-3 -mt-20 mb-4">
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

                <Form.Item name="grandTotal" value={grandTotal} className="w-full flex justify-end h-2 md:w-1/2 mx-2 mt-3">
                  <span className="font-bold text-lg"> Total </span>  <span className="font-bold text-lg">: {formatter.format(grandTotal)}</span>
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

              <div  className="w-full flex justify-between">
                  <Form.Item>
                    {loading ? (
                      <div className=" flex float-left ml-3 ">
                        <Spin />
                      </div>
                    ) : (
                      <button htmlType="submit" onClick={() => setSimpanData("Draft")} className="bg-cyan-700 rounded-md m-1 text-sm">
                        <p className="px-20 py-2 m-0 text-white">
                          SIMPAN DRAFT
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
                            <p className="px-4 py-2 m-0 text-white">
                              SIMPAN DAN CETAK UNTUK PEMBAYARAN PIUTANG
                            </p>
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

export default Edit;
