import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import ConfirmDialog from "@iso/components/Alert/ConfirmDialog";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Form, Input, InputNumber, Select, Button, Spin, notification, DatePicker } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import AddDebtTable from "@iso/components/ReactDataTable/Cost/AddDebtTable";
import createData from "../utility/create";
import createDetails from "../utility/createDetail";
import calculatePrice from "../utility/calculatePrice";
import Supplier from "@iso/components/Form/AddCost/SupplierForm";
import Coa from "@iso/components/Form/AddCost/SearchCOA";
import nookies from "nookies";
import LoadingAnimations from "@iso/components/Animations/Loading";
import DataTable from "react-data-table-component";
import * as moment from "moment";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import confirm from "antd/lib/modal/confirm";
import getUserCodeName from "../../../../library/functions/getUserCodeName";

Hutang.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqLPB = await fetchDataPurchasing(cookies);
  const LPB = await reqLPB.json();

  const reqReturLPB = await fetchRetur(cookies);
  const returLPB = await reqReturLPB.json();

  const reqHutang = await fetchHutang(cookies);
  const hutang = await reqHutang.json();

  const reqAkunHutang = await fetchAkunHutang(cookies);
  const akunHutang = await reqAkunHutang.json();

  const reqCOA = await fetchAkunCOA(cookies);
  const akunCOA = await reqCOA.json();

  return {
    props: {
      user,
      LPB,
      returLPB,
      hutang,
      akunHutang,
      akunCOA,
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

const fetchDataPurchasing = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings?populate=*";
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

const fetchRetur = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/returs?populate=*";
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

const fetchHutang = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/debts?populate=*, debt_details.purchasing";
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

const fetchAkunHutang = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/debt-accounts?populate=*&filters[setting][$eq]=true";
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

const fetchAkunCOA = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/chart-of-accounts?populate=*&filters[jenis_akun][$eq]=true";
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

function Hutang({ props }) {
  const biaya = useSelector((state) => state.Cost);
  const dispatch = useDispatch();

  const user = props.user;
  const lpb = props.LPB.data;
  const returLPB = props?.returLPB?.data;
  const akunHutang = props.akunHutang.data;
  const dataAkunCOA = props.akunCOA.data;
  const hutang = props.hutang;
  const [supplier, setSupplier] = useState();
  const [dataTabel, setDataTabel] = useState([]);
  const [dataRetur, setDataRetur] = useState([]);
  const [sisaHutang, setSisaHutang] = useState([]);
  const [sisaHutangTotal, setSisaHutangTotal] = useState({});

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isFetchinData, setIsFetchingData] = useState(false);
  const [document, setDocument] = useState();
  const [tanggal, setTanggal] = useState(moment());

  const [dataValues, setDataValues] = useState();
  const [createId, setCreateId] = useState();

  const [listId, setListId] = useState([]);

  const submitBtn = useRef();
  const router = useRouter();
  const { TextArea } = Input;
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var date = today.getDate() + "/" + mm + "/" + yyyy;
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const cookies = nookies.get(null, "token");
  const tempList = [];

  const [info, setInfo] = useState();

  //total item
  const [totalItem, setTotalItem] = useState(0);

  // status pembayaran
  const [statusPembayaran, setStatusPembayaran] = useState();

  // Range Picker
  const { RangePicker } = DatePicker;
  const [rangePicker, setRangePicker] = useState();

  // Search No LPB
  const { Search } = Input;
  const [searchNoLpb, setSearchNoLpb] = useState();

  // NO Hutang
  var noHutang = String(props.hutang?.meta?.pagination.total + 1).padStart(3, "0");
  const [categorySale, setCategorySale] = useState(`PH/ET/${user.id}/${noHutang}/${mm}/${yyyy}`);

  //Akun COA
  const [akunCOA, setAkunCOA] = useState();

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onFinish = (values, accept) => {
    if (accept) {
      var totalTunai = 0;
      var totalTransfer = 0;
      var totalGiro = 0;

      values.sisa_hutang_jatuh_tempo = sisaHutangJatuhTempo();

      setLoading(true);
      setInfo("sukses");

      // if(values.akun != undefined);
      // else {
      //   notification["error"]({
      //     message: "Gagal menambahkan data",
      //     description: "Akun yg akan digunakan belum dipilih !",
      //   });
      //   setInfo("gagal");
      // }

      for (const key in biaya.info) {
        totalTunai += biaya.info[key].tunai;
        totalTransfer += biaya.info[key].transfer;
        totalGiro += biaya.info[key].giro;
      }

      var totalBayar = values.bayar1 + values.bayar2 + values.bayar3;
      var totalBayarProduk = totalTunai + totalTransfer + totalGiro;
      if (
        (totalTunai != values.bayar1 || totalTransfer != values.bayar2 || totalGiro != values.bayar3) &&
        totalBayar != totalBayarProduk
      ) {
        notification["error"]({
          message: "Gagal menambahkan data",
          description: "Total pembayaran dan yang dibayar tidak sesuai.",
        });
        setInfo("gagal");
      }

      hutang.data.forEach((element) => {
        if (values.no_hutang == element.attributes.no_hutang) {
          notification["error"]({
            message: "Gagal menambahkan data",
            description: "Data gagal ditambahkan, karena no hutang sama",
          });
          setInfo("gagal");
        }
      });

      var totalHutang = totalHutangJatuhTempo();
      var totalBayaran = totalPembayaran();

      if (document === "Publish") {
        
        if (values.sisa_hutang_jatuh_tempo < 0 || values.sisa_hutang_jatuh_tempo === undefined) {
          notification["error"]({
            message: "Gagal menambahkan data",
            description: "Data gagal ditambahkan, karena total pembayaran melebihi total hutang jatuh tempo.",
          });
          setInfo("gagal");
        }
      } else if (document === "Draft") {
        if (totalHutang < totalBayaran) {
          notification["error"]({
            message: "Gagal menambahkan data",
            description: "Data gagal ditambahkan, karena total pembayaran melebihi total hutang jatuh tempo.",
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
    await createDetails(dataValues, dataTabel, biaya, sisaHutang, setListId, "/debt-details", "hutang");
  };

  const createMaster = async (values) => {
    values.total_item = dataTabel.length;
    values.total_hutang_jatuh_tempo = totalHutangJatuhTempo();
    values.total_pembayaran = totalPembayaran();
    values.sisa_hutang_jatuh_tempo = sisaHutangJatuhTempo();
    values.supplier = supplier;
    values.document = document;
    values.tanggal_pembayaran = tanggal;
    values.status_pembayaran = "Belum Dibayar";
    await createData(
      sisaHutang,
      values,
      listId,
      form,
      router,
      "/debts/",
      "hutang",
      dataAkunCOA,
      setCreateId,
      akunHutang
    );
  };

  //changes status pembayaran in lpb
  const editPenjualan = async (value) => {
    //var url = null;
    //var data = null;
    //var total = null;

    const endpoint = process.env.NEXT_PUBLIC_URL + "/debts/" + value.id + "?populate=deep";
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
    if (res.data.attributes.document == "Publish") {
      res.data.attributes.debt_details.data.forEach((item) => {
        const sisa_hutang = item.attributes.sisa_hutang;
        //console.log("detail", item);
        if (sisa_hutang == 0) editPenjualanDB("Lunas", item.attributes.purchasing.data.id);
        else editPenjualanDB("Dibayar Sebagian", item.attributes.purchasing.data.id);
      });
    } else console.log("Not update lpb, karena draft");
  };

  const editPenjualanDB = async (value, id) => {
    try {
      const data = {
        data: {
          status_pembayaran: value,
        },
      };

      const JSONdata = JSON.stringify(data);
      const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings/" + id;
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
      console.log("res", res);
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
    var total = calculatePrice(row, biaya, sisaHutangTotal, index);
    
    if (total < 0) total = 0;

    sisaHutang[index] = total;
    return formatter.format(total);
  };

  const totalHutangJatuhTempo = () => {
    var total = 0;
    if (biaya.info != null) {
      for (let row in biaya.info) {
        if (biaya.info[row].pilihData == "pilih") total = total + biaya.info[row].totalHutangJatuhTempo;
      }
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
        if (biaya.info[row].tunai != null) tunai = biaya.info[row].tunai;
        if (biaya.info[row].transfer != null) transfer = biaya.info[row].transfer;
        if (biaya.info[row].giro != null) giro = biaya.info[row].giro;
        if (biaya.info[row].cn != null) cn = biaya.info[row].cn;
        if (biaya.info[row].oth != null) oth = biaya.info[row].oth;

        total = total + tunai + transfer + giro + cn + oth;
      }
    }
    return total;
  };

  const sisaHutangJatuhTempo = () => {
    var total = 0;
    var totalHutang = totalHutangJatuhTempo();
    var totalBayar = totalPembayaran();
    total = totalHutang - totalBayar;

    if (total < 0) total = 0;

    return total;
  };

  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    if (event != undefined) setSearchNoLpb(query);
  };

  useEffect(() => {
    if (createId != undefined || createId != null) editPenjualan(createId);
  }, [createId]);

  useEffect(() => {
    var totalTunai = 0;
    var totalTransfer = 0;
    var totalGiro = 0;
    var totalCn = 0;
    var totalOth = 0;
    var lastKey = 0;

    if (biaya.info) {
      for (const key in biaya.info) {
        totalTunai += biaya.info[key].tunai;
        totalTransfer += biaya.info[key].transfer;
        totalGiro += biaya.info[key].giro;

        if (biaya.info[key].pilihData == "pilih") {
          form.setFieldsValue({
            metode_bayar1: "tunai",
            bayar1: totalTunai,
            metode_bayar2: "transfer",
            bayar2: totalTransfer,
            metode_bayar3: "giro",
            bayar3: totalGiro,
          });
          lastKey++;
        }
      }
      setTotalItem(lastKey);
    }

    if (totalHutangJatuhTempo() < totalPembayaran()) {
      notification["info"]({
        message: "Pembayaran berlebih",
        description: "Tidak dapat melakukan pembayaran, melebihi total hutang jatuh tempo.",
      });
    }
  }, [biaya.info]);

  useEffect(() => {
    if (dataValues && info == "sukses") createDetail();
  }, [dataValues]);

  useEffect(() => {
    if (listId.length > 0) {
      createMaster(dataValues);
    }
  }, [listId]);

  async function fetchLatestNoReferensi() {
    const codename = await getUserCodeName();

    const endpoint = `${process.env.NEXT_PUBLIC_URL}/debts?sort[0]=id:desc&pagination[limit]=1&filters[no_hutang][$contains]=${codename}/PH/`;
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
      const no = parseInt(latestDaata?.attributes?.no_hutang?.split("/")?.[2] || 0) + 1;
      console.log("no", no);
      const latestNoReferensi = `${codename}/PH/${String(no).padStart(5, "0")}/${moment().format("MM/YYYY")}`;
      form.setFieldsValue({
        no_hutang: latestNoReferensi,
      });
      return latestNoReferensi;
    }

    console.log("response from fetchLatestNoReferensi", response);
  }

  useEffect(() => {
    // used to reset redux from value before
    clearData();

    fetchLatestNoReferensi();

    var lpbId = 0;
    var infoId = 0;
    lpb.forEach((row) => {
      var tempoDate = new Date(row.attributes?.date_purchasing);
      var tempoTime = parseInt(row.attributes?.tempo_days ?? 0);
      var today = new Date();
      var isTempo = false;
      var statusPembayaran = row.attributes?.status_pembayaran;
      var purchasingHistory = row.attributes?.purchasing_payments.data;
      var status = "Sebagian";

      if (row.attributes?.tempo_time === "Hari") {
        tempoDate.setDate(tempoDate.getDate() + tempoTime);
      } else {
        tempoDate.setDate(tempoDate.getMonth() + tempoTime);
      }

      if (tempoDate < today) {
        isTempo = true;
      }

      if (isTempo) {
        if (statusPembayaran === "Belum Lunas") {
          status = "Tempo";
        } else if (statusPembayaran === "Dibayar Sebagian") {
          status = "Sebagian";
        } else if (statusPembayaran === "Lunas") {
          status = "Selesai";
        }

        if (row.attributes.status === "Dibatalkan") status = "Batal";
      } else {
        if (statusPembayaran === "Belum Lunas" && purchasingHistory.length == 0) {
          status = "Tempo";
        } else if (statusPembayaran === "Dibayar Sebagian" && purchasingHistory.length > 0) {
          status = "Sebagian";
        } else if (statusPembayaran === "Lunas" && purchasingHistory.length > 0) {
          status = "Selesai";
        } else {
          status = "Menunggu";
        }

        if (row.attributes.status === "Dibatalkan") status = "Batal";
      }

      if (status == "Tempo" || statusPembayaran == "Dibayar Sebagian") {
        row.hidden = false;
        dataTabel[lpbId] = row;
        dispatch({ type: "ADD_LIST", list: row });
        infoId++;
      }

      lpbId++;
    });

    var pembayaran = [];
    var total = 0;
    var idDetail = null;
    hutang.data.forEach((element) => {
      
      if (element.attributes.document === "Publish") {
        element.attributes.debt_details.data.forEach((details) => {
          total = details.attributes.giro + details.attributes.transfer + details.attributes.tunai;
          idDetail = details?.attributes?.purchasing?.data?.id;
          pembayaran.push({ id: idDetail, total: total });
        });
      }
    });

    dataTabel.forEach((element, index) => {
      element.subtotal = 0;
      element.sisaHutang = 0;
      element.dibayar = 0;

      returLPB.forEach((row) => {
        row.subtotal = 0;

        if (element.attributes.no_purchasing == row.attributes.purchasing.data?.attributes.no_purchasing) {
          row.attributes.retur_details.data.forEach((detail) => {
            row.subtotal += parseInt(detail.attributes.sub_total);
          });

          element.subtotal += row.attributes.total;

          if (dataRetur.length > 0)
            dataRetur[dataRetur.length] = {
              id: element.attributes.no_purchasing,
              subtotal: row.subtotal,
            };
          else
            dataRetur[0] = {
              id: element.attributes.no_purchasing,
              subtotal: row.subtotal,
            };

          element.sisaHutang = element.attributes.total - element.subtotal;
        }
      });

      pembayaran.forEach((item) => {
        if (item.id == element.id) element.dibayar += item.total;
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
        <title>Pembayaran Pembelian</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Pembayaran Pembelian"} />
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
                    name="no_hutang"
                    // initialValue={categorySale}
                    rules={[
                      {
                        required: true,
                        message: "Nomor Hutang tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input style={{ height: "40px" }} placeholder="Mengambil nomor..." />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Supplier onChangeSupplier={setSupplier} />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="tanggal">
                    <RangePicker size="large" onChange={(values) => setRangePicker(values)} />
                  </Form.Item>
                </div>
              </div>

              <div className="w-full md:w-4/4 px-3 mb-2 mt-2 mx-0  md:mb-0">
                <Search size="large" id="searchBox" placeholder="Cari Nomor LPB" onChange={filterBySearch} />
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
                  <AddDebtTable
                    data={dataTabel}
                    retur={dataRetur}
                    biaya={biaya}
                    calculatePriceTotal={calculatePriceTotal}
                    sisaHutang={sisaHutang}
                    form={form}
                    supplier={supplier}
                    statusPembayaran={statusPembayaran}
                    rangePicker={rangePicker}
                    search={searchNoLpb}
                  />
                </div>
              )}

              <div className="w-full flex flex-wrap mb-3">
                <Form.Item name="total_item" className="w-full h-2 mx-2 flex justify-end font-bold">
                  <span> TOTAL ITEM </span> <span> : {totalItem}</span>
                </Form.Item>
                <Form.Item name="total_hutang_jatuh_tempo" className="w-full h-2 mx-2 flex justify-end font-bold">
                  <span> TOTAL HUTANG JATUH TEMPO </span> <span> : {formatter.format(totalHutangJatuhTempo())}</span>
                </Form.Item>
                <Form.Item name="total_pembayaran" className="w-full h-2 mx-2 flex justify-end font-bold">
                  <span> TOTAL PEMBAYARAN </span> <span> : {formatter.format(totalPembayaran())}</span>
                </Form.Item>
                <Form.Item name="sisa_hutang_jatuh_tempo" className="w-full h-2 mx-2 flex justify-end font-bold">
                  <span> SISA HUTANG JATUH TEMPO </span> <span> : {formatter.format(sisaHutangJatuhTempo())}</span>
                </Form.Item>
              </div>

              <div className="w-full md:w-1/4 px-3 -mx-3">
                <Form.Item name="tanggal_pembayaran">
                  <DatePicker
                    defaultValue={tanggal}
                    placeholder="Tanggal Pembayaran"
                    size="large"
                    style={{ width: "100%" }}
                    onChange={(value) => setTanggal(value)}
                  />
                </Form.Item>
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3 mb-0 mt-8">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="bayar1">
                    <InputNumber
                      placeholder="Nominal Pembayaran"
                      formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      min={0}
                      style={{
                        height: "40px",
                        width: "100%",
                        marginRight: "10px",
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="metode_bayar1" noStyle>
                    <Select
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Metode Pembayaran"
                    >
                      <Select.Option value="tunai" key="tunai">
                        Tunai
                      </Select.Option>
                      <Select.Option value="transfer" key="transfer">
                        Bank Transfer
                      </Select.Option>
                      <Select.Option value="giro" key="giro">
                        Bank Giro
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3 mb-0 -mt-3">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="bayar2">
                    <InputNumber
                      placeholder="Nominal Pembayaran"
                      formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      min={0}
                      style={{
                        height: "40px",
                        width: "100%",
                        marginRight: "10px",
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="metode_bayar2" noStyle>
                    <Select
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Metode Pembayaran"
                    >
                      <Select.Option value="tunai" key="tunai">
                        Tunai
                      </Select.Option>
                      <Select.Option value="transfer" key="transfer">
                        Bank Transfer
                      </Select.Option>
                      <Select.Option value="giro" key="giro">
                        Bank Giro
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3 mb-0 -mt-3">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="bayar3">
                    <InputNumber
                      placeholder="Nominal Pembayaran"
                      formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      min={0}
                      style={{
                        height: "40px",
                        width: "100%",
                        marginRight: "10px",
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="metode_bayar3" noStyle>
                    <Select
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Metode Pembayaran"
                    >
                      <Select.Option value="tunai" key="tunai">
                        Tunai
                      </Select.Option>
                      <Select.Option value="transfer" key="transfer">
                        Bank Transfer
                      </Select.Option>
                      <Select.Option value="giro" key="giro">
                        Bank Giro
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="no_giro">
                    <Input
                      placeholder="No Giro"
                      style={{
                        height: "40px",
                        width: "100%",
                        marginRight: "10px",
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="total_giro">
                    <InputNumber
                      placeholder="Total Giro"
                      formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      min={0}
                      style={{
                        height: "40px",
                        width: "100%",
                        marginRight: "10px",
                      }}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="w-full mt-8 flex justify-between">
                <Form.Item name="catatan" className="w-full mx-2">
                  <TextArea rows={4} placeholder="Catatan Pembayaran" />
                </Form.Item>
              </div>

              <div className="w-full flex justify-center">
                <Form.Item>
                  {loading ? (
                    <div className=" flex float-left ml-3 ">
                      <Spin />
                    </div>
                  ) : (
                    <button
                      htmlType="submit"
                      className="bg-cyan-700 rounded-md m-1 text-sm"
                      onClick={() => setDocument("Draft")}
                    >
                      <p className="px-4 py-2 m-0 text-white">SIMPAN DAN PERBARUI</p>
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
                        title="Tambah Hutang"
                        message="Silahkan cek kembali data yang telah dimasukkan, apakah anda yakin ingin menambahkan ?"
                        component={
                          <button
                            type="button"
                            className="bg-cyan-700 rounded-md m-1 text-sm"
                            onClick={() => setDocument("Publish")}
                          >
                            <p className="px-4 py-2 m-0 text-white">SIMPAN DAN CETAK</p>
                          </button>
                        }
                      />
                      <Button htmlType="submit" ref={submitBtn}></Button>
                    </>
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

export default Hutang;
