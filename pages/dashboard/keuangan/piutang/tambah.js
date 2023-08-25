import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Row,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Spin,
  notification,
  DatePicker,
} from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import AddSellSalesTable from "@iso/components/ReactDataTable/Selling/AddSellSalesTable";
import AddCreditTable from "../../../../components/ReactDataTable/Cost/AddCreditTable";
import createData from "../utility/create";
import createDetails from "../utility/createDetail";
import calculatePrice from "../utility/calculatePrice";
import Supplier from "@iso/components/Form/AddCost/SupplierForm";
import Customer from "@iso/components/Form/AddCost/CustomerForm";
import Area from "@iso/components/Form/AddCost/AreaForm";
import Wilayah from "@iso/components/Form/AddCost/WilayahForm";
import nookies from "nookies";
import moment from "moment";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import confirm from "antd/lib/modal/confirm";

Piutang.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqDataUserSales = await fetchUserSales(cookies);
  const dataUserSales = await reqDataUserSales.json();

  const reqDataUser = await fetchDataUser(cookies);
  const dataUser = await reqDataUser.json();

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

  const reqAkunPiutang = await fetchAkunPiutang(cookies);
  const akunPiutang = await reqAkunPiutang.json();

  return {
    props: {
      user,
      dataUserSales,
      dataUser,
      piutang,
      sales,
      returSales,
      panel,
      returPanel,
      nonPanel,
      returNonPanel,
      akunPiutang,
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

const fetchDataUser = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users?populate=*";
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

const fetchUserSales = async (cookies) => {
  const endpoint =
    process.env.NEXT_PUBLIC_URL +
    "/users?populate=*&filters[role][name][$eq]=Sales&?filters[role][type][$eq]=Sales";
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/credits?populate=*, credit_details.sales_sale.*, credit_details.panel_sale.*, credit_details.non_panel_sale.*";
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
  const endpoint =
    process.env.NEXT_PUBLIC_URL + "/retur-sales-sales?populate=*";
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sales?populate=*, customer.area, customer.wilayah";
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

const fetchPanel = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/panel-sales?populate=*, customer.area, customer.wilayah";
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
  const endpoint =
    process.env.NEXT_PUBLIC_URL + "/retur-non-panel-sales?populate=*";
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
  const endpoint =
    process.env.NEXT_PUBLIC_URL + "/non-panel-sales?populate=*, customer.area, customer.wilayah";
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

const fetchAkunPiutang = async (cookies) => {
  const endpoint =
    process.env.NEXT_PUBLIC_URL + "/credit-accounts?populate=*&filters[setting][$eq]=true";
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
  const biaya = useSelector((state) => state.Cost); console.log("biaya", biaya.info);
  const dispatch = useDispatch();

  //var selectedProduct = products?.productList;
  //const locations = props.locations.data;
  const user = props.user;
  //const inven = props.inven.data;
  const sales = props.sales.data;
  const dataUserSales = props.dataUserSales;
  //const dataUser = props.dataUser;
  const returSales = props.returSales.data;
  const panel = props.panel.data;
  const returPanel = props.returPanel.data;
  const nonPanel = props.nonPanel.data;
  const returNonPanel = props.returNonPanel.data;
  const piutang = props.piutang.data;
  const akunPiutang = props.akunPiutang.data;
  //const customerData = props.customer.data[0];
  const [supplier, setSupplier] = useState();
  const [dataTabel, setDataTabel] = useState([]);
  const [dataRetur, setDataRetur] = useState([]);
  const [sisaHutang, setSisaHutang] = useState([]);
  const [sisaHutangTotal, setSisaHutangTotal] = useState({});

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  //const [additionalFee, setAdditionalFee] = useState();
  const [isFetchinData, setIsFetchingData] = useState(false);
  const [document, setDocument] = useState();

  const [dataValues, setDataValues] = useState();
  const [createId, setCreateId] = useState();

  const [listId, setListId] = useState([]);

  const router = useRouter();
  const { TextArea } = Input;
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var date = today.getDate() + "/" + mm + "/" + yyyy;
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const cookies = nookies.get(null, "token");
  const tempList = [];

  const [info, setInfo] = useState();

  //total item
  const [totalItem, setTotalItem] = useState(0);

  // customer
  const [customer, setCustomer] = useState();
  // data penjualan
  const [tipePenjualan, setTipePenjualan] = useState();
  // sale
  const [salesSelect, setSalesSelect] = useState();
  // area
  const [area, setArea] = useState();
  // wilayah
  const [wilayah, setWilayah] = useState();

  // status pembayaran
  const [statusPembayaran, setStatusPembayaran] = useState();

  // Range Picker
  const { RangePicker } = DatePicker;
  const [rangePicker, setRangePicker] = useState();

  // NO Piutang
  var noPiutang = String(props.piutang?.meta?.pagination.total + 1).padStart(
    3,
    "0"
  );
  const [categorySale, setCategorySale] = useState(
    `PP/ET/${user.id}/${noPiutang}/${mm}/${yyyy}`
  );

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onFinish = (values, accept) => {
    if (accept) {
      // save no giro to oth
      var biayaInfo = biaya.info;
      setLoading(true);
      setInfo("sukses");
  
      var totalTunai = 0;
      var totalTransfer = 0;
      var totalGiro = 0;
      for (const key in biaya.info) {
        totalTunai += biaya.info[key].tunai;
        totalTransfer += biaya.info[key].transfer;
        totalGiro += biaya.info[key].giro;
      }
  
      values.metode_bayar1 = "tunai";
      values.metode_bayar2 = "transfer";
      values.metode_bayar3 = "giro";
  
      values.bayar1 = totalTunai;
      values.bayar2 = totalTransfer;
      values.bayar3 = totalGiro;
  
      if(values.tanggal === null || values.tanggal === undefined) values.tanggal = moment();
  
      props.piutang.data.forEach((element) => {
        if (values.no_piutang == element.attributes.no_piutang) {
          notification["error"]({
            message: "Gagal menambahkan data",
            description: "Data gagal ditambahkan, karena no piutang sama",
          });
          setInfo("gagal");
        }
      });

      console.log("total tunai, tranfer, giro", totalTunai, totalTransfer, totalGiro);
      console.log(values, "values", document);
      if(document === "Publish"){
        if(values.bayar1 === 0 && values.bayar2 === 0 && values.bayar3 === 0 && values.total_pembayaran === undefined) {
          notification["error"]({
            message: "Gagal menambahkan data",
            description: "Data gagal ditambahkan, karena total pembayaran tidak sesuai.",
          });
          setInfo("gagal");
        }
      }
  
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

  const createDetail = async () => {
    //await createDetailSaleFunc(dataValues, products, productTotalPrice, productSubTotal, setListId, "/sales-sale-details");
    await createDetails(
      dataValues,
      dataTabel,
      biaya,
      sisaHutang,
      setListId,
      "/credit-details",
      "piutang"
    );
  };

  const createMaster = async (values) => {
    values.total_item = dataTabel.length;
    values.total_piutang_jatuh_tempo = totalPiutangJatuhTempo();
    values.total_pembayaran = totalPembayaran();
    values.sisa_piutang_jatuh_tempo = sisaPiutangJatuhTempo();
    values.customer = customer;
    values.area = area;
    values.wilayah = wilayah;
    values.document = document;
    values.status_pembayaran = "Dibayar";
    await createData(
      sisaHutang,
      values,
      listId,
      form,
      router,
      "/credits/",
      "piutang",
      akunPiutang,
      setCreateId,
      akunPiutang,
    );
    //console.log("Create master data", createId);
    //editPenjualan(createId);
  };

  const editPenjualan = async (value) => {
    //var url = null;
    //var data = null;
    //var total = null;

    const endpoint =
      process.env.NEXT_PUBLIC_URL + "/credits/" + value.id + "?populate=deep";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    // TODO :::: ENHANCEMENT CODE
    res.data.attributes.credit_details.data.forEach((item) => {
      const saleTypes = ["non_panel_sale", "panel_sale", "sales_sale"];
      for (const saleType of saleTypes) {
        const sale = item.attributes[saleType].data;
        console.log(sale, "sale nih", item, saleType);
        // var saleStatus = null;
        // if (saleType === "sales_sale") saleStatus = data.attributes.status_pembayaran;

        if (sale != null) {
          let url = `/${saleType}s/${sale.id}`;
          url = url.replaceAll("_", "-");
          const data = sale;
          console.log("link url", url);
          const pembayaran =
            item.attributes.giro +
            item.attributes.transfer +
            item.attributes.tunai;
          const total =
            pembayaran +
            item.attributes.total_retur +
            item.attributes.sisa_piutang;
          const floatTotal = parseFloat(total.toFixed(2));
          const floatDataTotal = parseFloat(data.attributes.total.toFixed(2));

          //console.log("item nih", item, floatTotal, floatDataTotal);
          if (
            
            item.attributes.sisa_piutang == 0
          ) {
            data.attributes.status = "Dibayar";
            if (saleType == "sales_sale") data.attributes.status_pembayaran = "Dibayar";

          } else if (
            
            item.attributes.sisa_piutang > 0
          ) {
            data.attributes.status = "Dibayar Sebagian";
            if (saleType == "sales_sale") data.attributes.status_pembayaran = "Dibayar Sebagian";

          } else {
            console.log("error update status pembayaran di penjualan");
          }

          data.attributes[`${saleType}_details`] = data.attributes[
            `${saleType}_details`
          ].data.map((detail) => detail.id);
          data.attributes[`retur_${saleType}s`] = data.attributes[
            `retur_${saleType}s`
          ]?.data?.map((retur) => retur?.id);

          data.attributes.area = data?.attributes?.area?.data?.id;
          data.attributes.customer = data?.attributes?.customer?.data?.id;
          data.attributes.location = data?.attributes?.location?.data?.id;
          data.attributes.wilayah = data?.attributes?.wilayah?.data?.id;

          if (data && url) editPenjualanDB(data.attributes, url, saleType);
        }
      }
    });
  };

  const editPenjualanDB = async (value, url, type) => {
    try {
      var tempData = null;
      if (type === "sales_sale"){
        tempData = {
          data: {
            status_pembayaran: value.status_pembayaran,
          },
        };  
      } else {
        tempData = {
          data: {
            status: value.status,
          },
        };  
      }
      const data = tempData;

      const JSONdata = JSON.stringify(data);
      const endpoint = process.env.NEXT_PUBLIC_URL + url;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
        body: JSONdata,
      };

      const req = await fetch(endpoint, options);
      const res = await req.json();

      if (req.status === 200) {
        console.log("status di penjualan sukses diupdate");
      } else {
        console.log("status di penjualan error atau tidak ada");
      }
    } catch (error) {
      console.log("errorr", error);
    }
  };

  const clearData = () => {
    dispatch({ type: "CLEAR_DATA" });
  };

  const calculatePriceTotal = (row, index) => {
    const total = calculatePrice(row, biaya, sisaHutangTotal, index);
    sisaHutang[index] = total - row?.dibayar;
    row.sisaPiutang = total - row?.dibayar;
    var priceTotal = total - row?.dibayar;
    return formatter.format(priceTotal);
  };

  const totalPiutangJatuhTempo = () => {
    var total = 0;
    if(biaya.info != null){ //total = 0;

      for(let row in biaya.info) {

        if (biaya.info[row].pilihData == "pilih") {
          total = total + (biaya.list[row].attributes.total - biaya.list[row].subtotal) - biaya.list[row].dibayar ;
        }
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
    // var cn = 0;
    // var oth = 0;
    for (let row in biaya.info) {
      if (biaya.info[row].pilihData == "pilih") {
        if (biaya.info[row].tunai != null) tunai = biaya.info[row].tunai;
        if (biaya.info[row].transfer != null) transfer = biaya.info[row].transfer;
        if (biaya.info[row].giro != null) giro = biaya.info[row].giro;

        total = total + tunai + transfer + giro;
      }
    }
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
    if (createId != undefined || createId != null) {
      if(dataValues.document == "Publish") editPenjualan(createId);
    }
  }, [createId]);

  useEffect(() => {
    var lastKey = 0;

    if (biaya.info) {
      for (const key in biaya.info) {
        if (biaya.info[key].pilihData == "pilih") {
          lastKey++;
        }
      }
      setTotalItem(lastKey);
    }
  }, [biaya.info]);

  useEffect(() => {
    if (dataValues && info === "sukses") createDetail();
  }, [dataValues]);

  useEffect(() => {
    if (listId.length > 0) {
      createMaster(dataValues);
    }
  }, [listId]);

  useEffect(() => {
    // used to reset redux from value before
    clearData();
    form.resetFields();
    //router.push("/dashboard/keuangan/piutang/tambah");
    var sisaHutang = 0;
    var pembayaran = [];
    var total = 0;
    var idDetail = null;

    // sales data
    sales.forEach((row) => { console.log(row, "sales buosss");

      if(row.attributes.status === "Diterima") {
        row.status = row.attributes.status_pembayaran;
      } else if(row.attributes.status === "Diproses") {
        row.status = row.attributes.status;
      } else {
        row.status = "Belum Dibayar";
      }

      if (row.status == "Belum Dibayar" || row.status == "Dibayar Sebagian" || row.status == "Belum Lunas") {
        if (dataTabel.length > 0) {
          //row.sisaPiutang = row.attributes.total;
          dataTabel[dataTabel.length] = row;
        }
        else{
          dataTabel[0] = row;
        }
        //biaya.list.push(row);
        dispatch({ type: "ADD_LIST", list: row });
      }

      row.keterangan = "sales";
    });

    // panel data
    panel.forEach((row) => {

      if(row.attributes.status) {
        row.status = row.attributes.status;
      } else {
        row.status = "Belum Dibayar";
      }

      if(row.attributes.status_data == "Publish"){
        if (row.status == "Belum Dibayar" || row.status == "Dibayar Sebagian") {
          if (dataTabel.length > 0) dataTabel[dataTabel.length] = row;
          else dataTabel[0] = row;
          //biaya.list.push(row);
          dispatch({ type: "ADD_LIST", list: row });
        }
      }

      row.keterangan = "panel";
    });

    // non panel data
    nonPanel.forEach((row) => {

      if(row.attributes.status) {
        row.status = row.attributes.status;
      } else {
        row.status = "Belum Dibayar";
      }

      if(row.attributes.status_data == "Publish"){
        if (row.status == "Belum Dibayar" || row.status == "Dibayar Sebagian") {
          if (dataTabel.length > 0) dataTabel[dataTabel.length] = row;
          else dataTabel[0] = row;
          //biaya.list.push(row);
          dispatch({ type: "ADD_LIST", list: row });
        }
      }

      row.keterangan = "nonpanel";
    });

    // piutang
    var keterangan = null;
    var indexPiutang = 0;
    piutang.forEach((item) => {
      if(item.attributes.document === "Publish"){
        item.attributes.credit_details.data.forEach((detail) => {
          total = detail.attributes.giro + detail.attributes.transfer + detail.attributes.tunai;
          if(detail.attributes.sales_sale?.data !== null){
            idDetail = detail.attributes.sales_sale?.data?.id;
            keterangan = "sales";
          } else if (detail.attributes.panel_sale?.data !== null) {
            idDetail = detail.attributes.panel_sale?.data?.id;
            keterangan = "panel";
          } else if (detail.attributes.non_panel_sale?.data !== null) {
            idDetail = detail.attributes.non_panel_sale?.data?.id;
            keterangan = "nonpanel";
          } else { 
            console.log("piutang data salah");
          }
          //idDetail = detail.attributes.non_panel_sale?.data?.id ?? detail.attributes.panel_sale?.data?.id ?? detail.attributes.sales_sale?.data?.id;
          pembayaran[indexPiutang] = { id: idDetail, total: total, keterangan: keterangan};
          indexPiutang++;
  
        });

      }

    });

    dataTabel.forEach((element, index) => {
      element.subtotal = 0;
      element.sisaHutang = 0;
      element.dibayar = 0;

      pembayaran.forEach((item) => { console.log(pembayaran, "pembayaran");
        //if(item.id == element.id) element.attributes.total -= item.total;
        if(item.id === element.id && item.keterangan === element.keterangan) element.dibayar += item.total;
      });

      returSales.forEach((row) => {
        row.subtotal = 0;

        if (
          element?.attributes?.no_sales_sale ==
          row.attributes?.sales_sale?.data?.attributes.no_sales_sale
        ) {

          element.subtotal += row.attributes.total;

          if (dataRetur.length > 0)
            dataRetur[dataRetur.length] = {
              id: element.attributes.no_sales_sale,
              subtotal: row.attributes.total,
            };
          else
            dataRetur[0] = {
              id: element.attributes.no_sales_sale,
              subtotal: row.attributes.total,
            };

          element.sisaHutang = parseInt(element.attributes.total) - parseInt(element.subtotal);
        }
      });

      returPanel.forEach((row) => {
        row.subtotal = 0;

        if (
          element.attributes?.no_panel_sale ==
          row.attributes?.panel_sale?.data?.attributes.no_panel_sale
        ) {

          element.subtotal += row.attributes.total;

          if (dataRetur.length > 0)
            dataRetur[dataRetur.length] = {
              id: element.attributes.no_panel_sale,
              subtotal: row.attributes.total,
            };
          else
            dataRetur[0] = {
              id: element.attributes.no_panel_sale,
              subtotal: row.attributes.total,
            };

          element.sisaHutang = parseInt(element.attributes.total) - parseInt(element.subtotal);
        }
      });

      returNonPanel.forEach((row) => {
        row.subtotal = 0;

        if (
          element.attributes?.no_non_panel_sale ==
          row.attributes?.non_panel_sale?.data?.attributes.no_non_panel_sale
        ) {

          element.subtotal += row.attributes.total;

          if (dataRetur.length > 0)
            dataRetur[dataRetur.length] = {
              id: element.attributes.no_non_panel_sale,
              subtotal: row.attributes.total,
            };
          else
            dataRetur[0] = {
              id: element.attributes.no_non_panel_sale,
              subtotal: row.attributes.total,
            };

          element.sisaHutang = parseInt(element.attributes.total) - parseInt(element.subtotal);
        }
      });

      dispatch({ type: "CHANGE_PILIH_DATA", pilihData: "tidak", listData: element, index: index });
      dispatch({ type: "CHANGE_DATA_TUNAI", tunai: 0, listData: element, index: index });
      dispatch({ type: "CHANGE_DATA_TRANSFER", transfer: 0, listData: element, index: index });
      dispatch({ type: "CHANGE_DATA_GIRO", giro: 0, listData: element, index: index });
      dispatch({ type: "CHANGE_TOTAL_HUTANG_JATUH_TEMPO", totalHutangJatuhTempo: element.sisaHutang, listData: element, index: index });
    });

    //console.log("datatable", dataTabel.length);
    // if (dataTable.length > 0) {
    //   dataTable.forEach((item, index) => {
    //     dispatch({ type: "CHANGE_PILIH_DATA", pilihData: "tidak", listData: item, index: index });
    //   });
    // }

  }, []);

  // useEffect(() => {
  //   //if(dataTabel)

  // }, [dataTabel]);

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
        <title>Penagihan Penjualan</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Penagihan Penjualan"} />
          <LayoutContent>
            <Form
              form={form}
              name="add"
              initialValues={{
                remember: true,
              }}
              onFinish={(values) => onFinish(values, false)}
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
                    <Input
                      style={{ height: "40px" }}
                      placeholder="No. Hutang"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Customer onChangeCustomer={setCustomer} />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item
                    name="status_pembayaran" //initialValue={"Hari"}
                    noStyle
                  >
                    <Select
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Status Pembayaran"
                      onChange={setStatusPembayaran}
                      allowClear
                    >
                      <Select.Option value="Dibayar Sebagian" key="Dibayar Sebagian">
                        Dibayar Sebagian
                      </Select.Option>
                      <Select.Option value="Belum Dibayar" key="Belum Dibayar">
                        Belum Dibayar
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="tanggalRentang">
                    <RangePicker
                      size="large"
                      onChange={(values) => setRangePicker(values)}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3 -mt-8">
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item
                    name="tipe_penjualan" //initialValue={"Hari"}
                    noStyle
                  >
                    <Select
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Tipe Penjualan"
                      onChange={setTipePenjualan}
                      allowClear
                    >
                      <Select.Option value="panel" key="panel">
                        Panel
                      </Select.Option>
                      <Select.Option value="nonpanel" key="nonpanel">
                        Non Panel
                      </Select.Option>
                      <Select.Option value="sales" key="sales">
                        Sales
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item
                    name="users_permissions_user" //initialValue={"Hari"}
                    noStyle
                  >
                    <Select
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Sales"
                      onChange={setSalesSelect}
                      allowClear
                    >
                      {dataUserSales.map((element) => {
                        return (
                          <Select.Option
                            value={element.name}
                            key={element.name}
                          >
                            {element.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Area onChangeArea={setArea} />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Wilayah onChangeWilayah={setWilayah} />
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3 -mt-2">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="tanggal">
                    <DatePicker
                      defaultValue={moment()}
                      rules={[
                        {
                          required: true,
                          message: "Tanggal penagihan tidak boleh kosong!",
                        },
                      ]}
                      placeholder="Tanggal Penagihan"
                      size="large"
                      style={{ width: "100%" }}
                    />
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
                  rangePicker={rangePicker}
                  statusPembayaran={statusPembayaran}
                  customer={customer}
                  sales={salesSelect}
                  area={area}
                  wilayah={wilayah}
                  tipePenjualan={tipePenjualan}
                />
              </div>

              <div className="w-full flex flex-wrap mb-3">
                <Form.Item
                  name="total_item"
                  className="w-full h-2 mx-2 flex justify-end font-bold"
                >
                  <span> TOTAL ITEM </span> <span> : {totalItem}</span>
                </Form.Item>
                <Form.Item
                  name="total_hutang_jatuh_tempo"
                  className="w-full h-2 mx-2 flex justify-end font-bold"
                >
                  <span> TOTAL PIUTANG JATUH TEMPO </span>{" "}
                  <span> : {formatter.format(totalPiutangJatuhTempo())}</span>
                </Form.Item>
                <Form.Item
                  name="total_pembayaran"
                  className="w-full h-2 mx-2 flex justify-end font-bold"
                >
                  <span> TOTAL PEMBAYARAN </span>{" "}
                  <span> : {formatter.format(totalPembayaran())}</span>
                </Form.Item>
                <Form.Item
                  name="sisa_hutang_jatuh_tempo"
                  className="w-full h-2 mx-2 flex justify-end font-bold"
                >
                  <span> SISA PIUTANG JATUH TEMPO </span>{" "}
                  <span> : {formatter.format(sisaPiutangJatuhTempo())}</span>
                </Form.Item>
              </div>

              <div className="w-full mt-8 flex justify-between">
                <Form.Item name="catatan" className="w-full mx-2">
                  <TextArea rows={4} placeholder="Catatan Pembayaran" />
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
                      className="bg-cyan-700 rounded-md m-1 text-sm px-4"
                      onClick={() => setDocument("Draft")}
                    >
                      <p className="px-4 py-2 m-0 text-white">SIMPAN</p>
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
                      htmlType="submit"
                      className="bg-cyan-700 rounded-md m-1 text-sm px-4"
                      onClick={() => setDocument("Publish")}
                    >
                      <p className="px-4 py-2 m-0 text-white">SELESAI</p>
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
