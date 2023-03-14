import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Form, Input, InputNumber, Select, Button, Spin, notification, DatePicker } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import AddSellSalesTable from "@iso/components/ReactDataTable/Selling/AddSellSalesTable";
import AddCreditTable from "@iso/components/ReactDataTable/Cost/AddCreditTable";
import createData from "../utility/create";
import createDetails from "../utility/createDetail";
import calculatePrice from "../utility/calculatePrice";
import Supplier from "@iso/components/Form/AddCost/SupplierForm";
import Customer from "@iso/components/Form/AddCost/CustomerForm";
import Area from "@iso/components/Form/AddCost/AreaForm";
import Wilayah from "@iso/components/Form/AddCost/WilayahForm";
import nookies from "nookies";


Piutang.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqPiutang = await fetchPiutang(cookies);
  const piutang = await reqPiutang.json();

  const reqSales = await fetchSales(cookies);
  const sales = await reqSales.json();

  const reqReturSales = await fetchReturSales(cookies);
  const returSales = await reqReturSales.json();

  const reqPanel = await fetchPanel(cookies);
  const panel = await reqPanel.json();

  const reqReturPanel = await fetchReturPanel(cookies);
  const returPanel = await reqReturPanel.json();

  const reqNonPanel = await fetchNonPanel(cookies);
  const nonPanel = await reqNonPanel.json();

  const reqReturNonPanel = await fetchReturNonPanel(cookies);
  const returNonPanel = await reqReturNonPanel.json();

  return {
    props: {
      user,
      piutang,
      sales,
      returSales,
      panel,
      returPanel,
      nonPanel,
      returNonPanel
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

const fetchPiutang = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/credits?populate=deep";
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

const fetchReturSales = async (cookies) => {
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

const fetchSales = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sales?populate=deep";
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

const fetchReturPanel = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/retur-panel-sales?populate=deep";
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
    const endpoint = process.env.NEXT_PUBLIC_URL + "/panel-sales?populate=deep";
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

const fetchReturNonPanel = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/retur-non-panel-sales?populate=deep";
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

function Piutang({ props }) {
  const biaya = useSelector((state) => state.Cost);
  const dispatch = useDispatch();

  //var selectedProduct = products?.productList;
  //const locations = props.locations.data;
  const user = props.user;
  //const inven = props.inven.data;
  const sales = props.sales.data;
  const returSales = props.returSales.data;
  const panel = props.panel.data;
  const returPanel = props.returPanel.data;
  const nonPanel = props.nonPanel.data;
  const returNonPanel = props.returNonPanel.data;
  //const customerData = props.customer.data[0];
  const [supplier, setSupplier] = useState();
  const [dataTabel, setDataTabel] =  useState([]);
  const [dataRetur, setDataRetur] = useState([]);
  const [sisaHutang, setSisaHutang] = useState([]);
  const [sisaHutangTotal, setSisaHutangTotal] = useState({});

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  //const [additionalFee, setAdditionalFee] = useState();
  const [isFetchinData, setIsFetchingData] = useState(false);

  const [dataValues, setDataValues] = useState();

  const [listId, setListId] = useState([]);

  const router = useRouter();
  const { TextArea } = Input;
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var date = today.getDate()+'/'+mm+'/'+yyyy;
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const cookies = nookies.get(null, "token");
  const tempList = [];

  const [info, setInfo] = useState();

  // customer
  const [customer, setCustomer] = useState();
  // area
  const [area, setArea] = useState();
  // wilayah
  const [wilayah, setWilayah] = useState();

  // NO Piutang
  var noPiutang = String(props.piutang?.meta?.pagination.total + 1).padStart(3, "0");
  const [categorySale, setCategorySale] = useState(`PH/ET/${user.id}/${noPiutang}/${mm}/${yyyy}`);

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onFinish = (values) => {
    setLoading(true);
    //setInfo("sukses");
    //sale.data.forEach((element) => {
    //  if (values.no_sales_sell == element.attributes.no_sales_sell) {
    //      notification["error"]({
    //          message: "Gagal menambahkan data",
    //          description:
    //              "Data gagal ditambahkan, karena no penjualan sama",
    //      });
    //      setInfo("gagal");
    //  }
    //});
    //createMaster(values);
    setDataValues(values);
    setLoading(false);
  };

  const createDetail = async () => {
    //await createDetailSaleFunc(dataValues, products, productTotalPrice, productSubTotal, setListId, "/sales-sale-details");
    await createDetails(dataValues, dataTabel, biaya, sisaHutang, setListId, "/credit-details", "piutang");
  };

  const createMaster = async (values) => {
    values.total_item = dataTabel.length;
    values.total_piutang_jatuh_tempo = totalPiutangJatuhTempo();
    values.total_pembayaran = totalPembayaran();
    values.sisa_piutang_jatuh_tempo = sisaPiutangJatuhTempo();
    values.customer = customer;
    values.area = area;
    values.wilayah = wilayah; console.log("values create", values);
    await createData(sisaHutang, values, listId, form, router, "/credits/", "piutang");
  };

  const clearData = () => {
    dispatch({ type: "CLEAR_DATA" });
  };

  const calculatePriceTotal = (row, index) => {
    const total = calculatePrice(row, biaya, sisaHutangTotal, index);
    sisaHutang[index] = total;
    row.sisaPiutang = total;
    return formatter.format(total);
  };

  const totalPiutangJatuhTempo = () => {
    var total = 0;
    if(biaya.info != null){

      for(let row in biaya.info) {
        if(biaya.info[row].pilihData == "pilih") total = total + biaya.info[row].totalHutangJatuhTempo;
        if(biaya.info[row].totalHutangJatuhTempo == undefined) total = 0;
      };
    }
    return total;
  };

  const totalPembayaran = () => {
    var total = 0;
    var tunai = 0;
    var transfer = 0;
    var giro = 0;
    var cn = 0;
    var oth = 0;
      for (let row in biaya.info) {
        if (biaya.info[row].pilihData == "pilih") {
          if(biaya.info[row].tunai != null) tunai = biaya.info[row].tunai;
          if(biaya.info[row].transfer != null) transfer = biaya.info[row].transfer;
          if(biaya.info[row].giro != null) giro = biaya.info[row].giro;
          if(biaya.info[row].cn != null) cn = biaya.info[row].cn;
          if(biaya.info[row].oth != null) oth = biaya.info[row].oth;

          total = total + tunai + transfer + giro + cn + oth;
        }
      };
    return total;
  };

  const sisaPiutangJatuhTempo = () => {
    var total = 0;
    var totalPiutang = totalPiutangJatuhTempo();
    var totalBayar = totalPembayaran();
    total = totalPiutang - totalBayar;
    return total;
  };

  useEffect(() => {
    //if (dataValues && info == "sukses") createDetailSale();
    if (dataValues) createDetail();
  }, [dataValues]);

  useEffect(() => {
    if (listId.length > 0) {
      createMaster(dataValues);
    }
  }, [listId]);

  useEffect(() => {
    // used to reset redux from value before
    clearData();
    var sisaHutang = 0;

    // sales data
    sales.forEach((row) => {
        const lastIndex = row.attributes.purchasing_payments?.data?.length;
        const lastPayment =
            row.attributes.purchasing_payments.data[lastIndex - 1];
        if (
            lastPayment?.attributes.payment_remaining ===
            lastPayment?.attributes.total_payment
        ) {
            row.status = "Belum Dibayar";
        } else if (
            lastPayment?.attributes.payment_remaining > 0 &&
            lastPayment?.attributes.payment_remaining <
            lastPayment?.attributes.total_payment
        ) {
            row.status = "Dibayar Sebagian";
        } else if (lastPayment?.attributes.payment_remaining <= 0) {
            row.status = "Selesai";
        } else {
            row.status = "Dibayar Sebagian";
        }

        if (row.status == "Belum Dibayar" || row.status == "Dibayar Sebagian") {
            if (dataTabel.length > 0) dataTabel[dataTabel.length] = row;
            else dataTabel[0] = row;
            //biaya.list.push(row);
            dispatch({ type: "ADD_LIST", list: row });
        }

        row.keterangan = "sales";
    });

    //returSales.forEach((row) => {
    //row.subtotal = 0;

    //  dataTabel.forEach((element) => {
    //    element.subtotal = 0;
    //    element.sisaHutang = 0;

    //    if (element?.attributes?.no_sales_sale == row.attributes?.sales_sale?.data?.attributes.no_sales_sale) {
    //        row.attributes.retur_sales_sale_details.data.forEach((detail) => {
    //            row.subtotal += parseInt(detail.attributes.sub_total);
    //        });

    //        element.subtotal = row.subtotal;

    //        if (dataRetur.length > 0) dataRetur[dataRetur.length] = { id: element.attributes.no_sales_sale, subtotal: row.subtotal };
    //        else dataRetur[0] = { id: element.attributes.no_sales_sale, subtotal: row.subtotal };

    //        element.sisaHutang = parseInt(element.attributes.total) - element.subtotal;
    //    } //else {
    //        //element.sisaHutang = parseInt(element.attributes.total) - element.subtotal;
    //    //}
    //  });
    ////lpbId++;
    //});

    // panel data
    panel.forEach((row) => {
        const lastIndex = row.attributes.purchasing_payments?.data?.length;
        const lastPayment =
            row.attributes.purchasing_payments.data[lastIndex - 1];
        if (
            lastPayment?.attributes.payment_remaining ===
            lastPayment?.attributes.total_payment
        ) {
            row.status = "Belum Dibayar";
        } else if (
            lastPayment?.attributes.payment_remaining > 0 &&
            lastPayment?.attributes.payment_remaining <
            lastPayment?.attributes.total_payment
        ) {
            row.status = "Dibayar Sebagian";
        } else if (lastPayment?.attributes.payment_remaining <= 0) {
            row.status = "Selesai";
        } else {
            row.status = "Dibayar Sebagian";
        }

        if (row.status == "Belum Dibayar" || row.status == "Dibayar Sebagian") {
            if (dataTabel.length > 0) dataTabel[dataTabel.length] = row;
            else dataTabel[0] = row;
            //biaya.list.push(row);
            dispatch({ type: "ADD_LIST", list: row });
        }

        row.keterangan = "panel";
    });

    //returPanel.forEach((row) => {
    //row.subtotal = 0;

    //  dataTabel.forEach((element) => {
    //    element.subtotal = 0;
    //    element.sisaHutang = 0;

    //    if (element.attributes?.no_panel_sale == row.attributes?.panel_sale?.data?.attributes.no_panel_sale) {
    //        row.attributes.retur_panel_sale_details.data.forEach((detail) => {
    //            row.subtotal += parseInt(detail.attributes.sub_total);
    //        });

    //        element.subtotal = row.subtotal;

    //        if (dataRetur.length > 0) dataRetur[dataRetur.length] = { id: element.attributes.no_panel_sale, subtotal: row.subtotal };
    //        else dataRetur[0] = { id: element.attributes.no_panel_sale, subtotal: row.subtotal };

    //        element.sisaHutang = parseInt(element.attributes.total) - element.subtotal;
    //    } //else {
    //        //element.sisaHutang = parseInt(element.attributes.total) - element.subtotal;
    //    //}
    //  });
    ////lpbId++;
    //});

    // non panel data
    nonPanel.forEach((row) => {
        const lastIndex = row.attributes.purchasing_payments?.data?.length;
        const lastPayment =
            row.attributes.purchasing_payments.data[lastIndex - 1];
        if (
            lastPayment?.attributes.payment_remaining ===
            lastPayment?.attributes.total_payment
        ) {
            row.status = "Belum Dibayar";
        } else if (
            lastPayment?.attributes.payment_remaining > 0 &&
            lastPayment?.attributes.payment_remaining <
            lastPayment?.attributes.total_payment
        ) {
            row.status = "Dibayar Sebagian";
        } else if (lastPayment?.attributes.payment_remaining <= 0) {
            row.status = "Selesai";
        } else {
            row.status = "Dibayar Sebagian";
        }

        if (row.status == "Belum Dibayar" || row.status == "Dibayar Sebagian") {
            if (dataTabel.length > 0) dataTabel[dataTabel.length] = row;
            else dataTabel[0] = row;
            //biaya.list.push(row);
            dispatch({ type: "ADD_LIST", list: row });
        }

        row.keterangan = "nonpanel";
    });

    
    //returNonPanel.forEach((row) => {
    //row.subtotal = 0;

    //  dataTabel.forEach((element) => {
    //    element.subtotal = 0;
    //    element.sisaHutang = 0;

    //    if (element.attributes?.no_non_panel_sale == row.attributes?.non_panel_sale?.data?.attributes.no_non_panel_sale) {
    //        row.attributes.retur_non_panel_sale_details.data.forEach((detail) => {
    //            row.subtotal += parseInt(detail.attributes.sub_total);
    //        });

    //        element.subtotal = row.subtotal;

    //        if (dataRetur.length > 0) dataRetur[dataRetur.length] = { id: element.attributes.no_non_panel_sale, subtotal: row.subtotal };
    //        else dataRetur[0] = { id: element.attributes.no_non_panel_sale, subtotal: row.subtotal };

    //        element.sisaHutang = parseInt(element.attributes.total) - element.subtotal;
    //    } //else {
    //        //element.sisaHutang = parseInt(element.attributes.total) - element.subtotal;
    //    //}
    //    console.log("element non", element);
    //  });
    ////lpbId++;
    //});

    dataTabel.forEach((element) => {
    element.subtotal = 0;
    element.sisaHutang = 0;

      returSales.forEach((row) => {
        row.subtotal = 0;

        if (element?.attributes?.no_sales_sale == row.attributes?.sales_sale?.data?.attributes.no_sales_sale) {
            row.attributes.retur_sales_sale_details.data.forEach((detail) => {
                row.subtotal += parseInt(detail.attributes.sub_total);
            });

            element.subtotal = row.subtotal;

            if (dataRetur.length > 0) dataRetur[dataRetur.length] = { id: element.attributes.no_sales_sale, subtotal: row.subtotal };
            else dataRetur[0] = { id: element.attributes.no_sales_sale, subtotal: row.subtotal };

            element.sisaHutang = parseInt(element.attributes.total) - element.subtotal;
        }
      });

      returPanel.forEach((row) => {
        row.subtotal = 0;

        if (element.attributes?.no_panel_sale == row.attributes?.panel_sale?.data?.attributes.no_panel_sale) {
            row.attributes.retur_panel_sale_details.data.forEach((detail) => {
                row.subtotal += parseInt(detail.attributes.sub_total);
            });

            element.subtotal = row.subtotal;

            if (dataRetur.length > 0) dataRetur[dataRetur.length] = { id: element.attributes.no_panel_sale, subtotal: row.subtotal };
            else dataRetur[0] = { id: element.attributes.no_panel_sale, subtotal: row.subtotal };

            element.sisaHutang = parseInt(element.attributes.total) - element.subtotal;
        } 
      });

      returNonPanel.forEach((row) => {
        row.subtotal = 0;

        if (element.attributes?.no_non_panel_sale == row.attributes?.non_panel_sale?.data?.attributes.no_non_panel_sale) {
            row.attributes.retur_non_panel_sale_details.data.forEach((detail) => {
                row.subtotal += parseInt(detail.attributes.sub_total);
            });

            element.subtotal = row.subtotal;

            if (dataRetur.length > 0) dataRetur[dataRetur.length] = { id: element.attributes.no_non_panel_sale, subtotal: row.subtotal };
            else dataRetur[0] = { id: element.attributes.no_non_panel_sale, subtotal: row.subtotal };

            element.sisaHutang = parseInt(element.attributes.total) - element.subtotal;
        } 
      });

    });

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
        <title>Penagihan Penjualan Sales</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Penagihan Penjualan Sales"} />
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

              <div className="w-full flex flex-wrap justify-start -mx-3 mb-6 mt-4">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_piutang"
                    initialValue={categorySale}
                    rules={[
                        {
                            required: true,
                            message: "Nomor Piutang tidak boleh kosong!",
                        },
                    ]}
                    >
                    <Input style={{ height: "40px" }} placeholder="No. Hutang" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Customer onChangeCustomer={setCustomer} />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="status_pembayaran" //initialValue={"Hari"} 
                  noStyle>
                    <Select
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Status Pembayaran"
                    >
                      <Select.Option value="1" key="1">
                        Status 1
                      </Select.Option>
                      <Select.Option value="2" key="2">
                        Status 2
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="tanggalRentang"
                    //initialValue={categorySale}
                    //rules={[
                    //    {
                    //        required: true,
                    //        message: "Nomor Penjualan tidak boleh kosong!",
                    //    },
                    //]}
                    >
                    <DatePicker placeholder="Rentang Tanggal" size="large" style={{ width: "100%" }} />
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3 -mt-8">
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="sales" //initialValue={"Hari"} 
                  noStyle>
                    <Select
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Sales"
                    >
                      <Select.Option value="1" key="1">
                        Wil 1
                      </Select.Option>
                      <Select.Option value="2" key="2">
                        Wil 2
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Area onChangeArea={setArea} />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Wilayah onChangeWilayah={setWilayah} />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="tanggal"
                    //initialValue={categorySale}
                    //rules={[
                    //    {
                    //        required: true,
                    //        message: "Nomor Penjualan tidak boleh kosong!",
                    //    },
                    //]}
                    >
                    <DatePicker placeholder="Tanggal Penagihan" size="large" style={{ width: "100%" }} />
                  </Form.Item>
                </div>
              </div>

              <div className="w-full md:w-4/4 px-3 mb-2 mt-1 md:mb-0">
                <AddCreditTable
                  data={dataTabel}
                  retur={dataRetur}
                  biaya={biaya}
                  calculatePriceTotal={calculatePriceTotal}
                  sisaHutang={sisaHutang}
                  form={form}
                />
              </div>

              <div className="w-full flex flex-wrap mb-3">
                <Form.Item name="total_item" className="w-full h-2 mx-2 flex justify-end font-bold">
                  <span> TOTAL ITEM </span> <span> : {dataTabel.length}</span>
                </Form.Item>
                <Form.Item name="total_hutang_jatuh_tempo" className="w-full h-2 mx-2 flex justify-end font-bold">
                  <span> TOTAL HUTANG JATUH TEMPO </span> <span> : {formatter.format(totalPiutangJatuhTempo())}</span>
                </Form.Item>
                <Form.Item name="total_pembayaran" className="w-full h-2 mx-2 flex justify-end font-bold">
                  <span> TOTAL PEMBAYARAN </span> <span> : {formatter.format(totalPembayaran())}</span>
                </Form.Item>
                <Form.Item name="sisa_hutang_jatuh_tempo" className="w-full h-2 mx-2 flex justify-end font-bold">
                  <span> SISA HUTANG JATUH TEMPO </span> <span> : {formatter.format(sisaPiutangJatuhTempo())}</span>
                </Form.Item>
              </div>

              <div className="w-full mt-8 flex justify-between">
                <Form.Item name="catatan" className="w-full mx-2">
                  <TextArea rows={4} placeholder="Catatan Pembayaran" />
                </Form.Item>
              </div>

              <div  className="w-full flex justify-between">
                  <Form.Item>
                    {loading ? (
                      <div className=" flex float-left ml-3 ">
                        <Spin />
                      </div>
                    ) : (
                      <button htmlType="submit" className="bg-cyan-700 rounded-md m-1 text-sm px-4">
                        <p className="px-4 py-2 m-0 text-white">
                          SIMPAN
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
                      <button htmlType="submit" className="bg-cyan-700 rounded-md m-1 text-sm px-4">
                        <p className="px-4 py-2 m-0 text-white">
                          CETAK
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
                      <button htmlType="submit" className="bg-cyan-700 rounded-md m-1 text-sm px-4">
                        <p className="px-4 py-2 m-0 text-white">
                          SELESAI
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

export default Piutang;
