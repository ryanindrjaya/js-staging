import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import ConfirmDialog from "@iso/components/Alert/ConfirmDialog";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
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
import AddDebtTable from "@iso/components/ReactDataTable/Cost/AddDebtTable";
import createData from "../utility/create";
import createDetails from "../utility/createDetail";
import calculatePrice from "../utility/calculatePrice";
import Supplier from "@iso/components/Form/AddCost/SupplierForm";
import nookies from "nookies";
import DataTable from "react-data-table-component";

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

  return {
    props: {
      user,
      LPB,
      returLPB,
      hutang,
      akunHutang,
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

const fetchRetur = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/retur-lpbs?populate=deep";
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/debts?populate=deep";
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/debt-accounts?populate=deep";
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

  //var selectedProduct = products?.productList;
  //const locations = props.locations.data;
  const user = props.user;
  //const inven = props.inven.data;
  const lpb = props.LPB.data;
  const returLPB = props.returLPB.data;
  const akunHutang = props.akunHutang.data;
  const hutang = props.hutang;
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

  const [listId, setListId] = useState([]);

  const submitBtn = useRef();
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

  // NO Hutang
  var noHutang = String(props.hutang?.meta?.pagination.total + 1).padStart(
    3,
    "0"
  );
  const [categorySale, setCategorySale] = useState(
    `PH/ET/${user.id}/${noHutang}/${mm}/${yyyy}`
  );

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onFinish = (values) => {
    var totalTunai = 0;
    var totalTransfer = 0;
    var totalGiro = 0;
    var totalCn = 0;
    var totalOth = 0;

    setLoading(true);
    setInfo("sukses");

    for (const key in biaya.info) {
      totalTunai += biaya.info[key].tunai;
      totalTransfer += biaya.info[key].transfer;
      totalGiro += biaya.info[key].giro;
      totalCn += biaya.info[key].cn;
      totalOth += biaya.info[key].oth;
    }

    var totalBayar =
      values.bayar1 +
      values.bayar2 +
      values.bayar3 +
      values.bayar4 +
      values.bayar5;
    var totalBayarProduk =
      totalTunai + totalTransfer + totalGiro + totalCn + totalOth;
    if (
      (totalTunai != values.bayar1 ||
        totalTransfer != values.bayar2 ||
        totalGiro != values.bayar3 ||
        totalCn != values.bayar4 ||
        totalOth != values.bayar5) &&
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
    setDataValues(values);
    setLoading(false);
  };

  const createDetail = async () => {
    //await createDetailSaleFunc(dataValues, products, productTotalPrice, productSubTotal, setListId, "/sales-sale-details");
    await createDetails(
      dataValues,
      dataTabel,
      biaya,
      sisaHutang,
      setListId,
      "/debt-details",
      "hutang"
    );
  };

  const createMaster = async (values) => {
    values.total_item = dataTabel.length;
    values.total_hutang_jatuh_tempo = totalHutangJatuhTempo();
    values.total_pembayaran = totalPembayaran();
    values.sisa_hutang_jatuh_tempo = sisaHutangJatuhTempo();
    values.supplier = supplier;
    values.document = document;
    await createData(
      sisaHutang,
      values,
      listId,
      form,
      router,
      "/debts/",
      "hutang",
      akunHutang
    );
  };

  const clearData = () => {
    dispatch({ type: "CLEAR_DATA" });
  };

  const calculatePriceTotal = (row, index) => {
    const total = calculatePrice(row, biaya, sisaHutangTotal, index);
    sisaHutang[index] = total;
    return formatter.format(total);
  };

  const totalHutangJatuhTempo = () => {
    var total = 0;
    if (biaya.info != null) {
      for (let row in biaya.info) {
        if (biaya.info[row].pilihData == "pilih")
          total = total + biaya.info[row].totalHutangJatuhTempo;
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
        if (biaya.info[row].transfer != null)
          transfer = biaya.info[row].transfer;
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
    return total;
  };

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
        totalCn += biaya.info[key].cn;
        totalOth += biaya.info[key].oth;

        if (biaya.info[key].pilihData == "pilih") {
          form.setFieldsValue({
            metode_bayar1: "tunai",
            bayar1: totalTunai,
            metode_bayar2: "transfer",
            bayar2: totalTransfer,
            metode_bayar3: "giro",
            bayar3: totalGiro,
            metode_bayar4: "cn",
            bayar4: totalCn,
            metode_bayar5: "oth",
            bayar5: totalOth,
          });
        }
      }
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

  useEffect(() => {
    // used to reset redux from value before
    clearData();

    var lpbId = 0;
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
      } else {
        if (
          statusPembayaran === "Belum Lunas" &&
          purchasingHistory.length > 0
        ) {
          status = "Tempo";
        } else if (
          statusPembayaran === "Dibayar Sebagian" &&
          purchasingHistory.length > 0
        ) {
          status = "Sebagian";
        } else if (
          statusPembayaran === "Lunas" &&
          purchasingHistory.length > 0
        ) {
          status = "Selesai";
        } else {
          status = "Menunggu";
        }
      }

      if (status == "Tempo" || statusPembayaran == "Dibayar Sebagian") {
        dataTabel[lpbId] = row;
        //biaya.list.push(row);
        dispatch({ type: "ADD_LIST", list: row });
      }
      lpbId++;
    });

    //dataTabel.push(biaya.list);
    lpbId = 0;

    returLPB.forEach((row) => {
      row.subtotal = 0;
      dataTabel.forEach((element) => {
        if (
          element.attributes.no_purchasing ==
          row.attributes.purchasing.data?.attributes.no_purchasing
        ) {
          row.attributes.retur_lpb_details.data.forEach((detail) => {
            row.subtotal += parseInt(detail.attributes.sub_total);
          });
          dataRetur[lpbId] = {
            id: element.attributes.no_purchasing,
            subtotal: row.subtotal,
          };
        }
      });
      lpbId++;
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
              onFinish={onFinish}
              onFinishFailed={validateError}
            >
              <div className="w-full flex flex-wrap justify-start -mx-3 mb-6 mt-4">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_hutang"
                    initialValue={categorySale}
                    rules={[
                      {
                        required: true,
                        message: "Nomor Hutang tidak boleh kosong!",
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
                  <Supplier onChangeSupplier={setSupplier} />
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
                    >
                      <Select.Option value="Dibayar" key="Dibayar">
                        Dibayar
                      </Select.Option>
                      <Select.Option value="Belum Dibayar" key="Belum Dibayar">
                        Belum Dibayar
                      </Select.Option>
                    </Select>
                  </Form.Item>
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
                    <DatePicker
                      placeholder="Rentang Tanggal"
                      size="large"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex md:w-4/4 px-3 mb-2 mt-2 mx-0  md:mb-0">
                {/*<SearchBar*/}
                {/*  form={form}*/}
                {/*  tempList={tempList}*/}
                {/*  onChange={onChangeProduct}*/}
                {/*  user={user}*/}
                {/*  selectedProduct={selectedProduct}*/}
                {/*  isBasedOnLocation={false}*/}
                {/*/>*/}
              </div>

              <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">
                <AddDebtTable
                  data={dataTabel}
                  retur={dataRetur}
                  biaya={biaya}
                  calculatePriceTotal={calculatePriceTotal}
                  sisaHutang={sisaHutang}
                  form={form}
                />
              </div>

              <div className="w-full flex flex-wrap mb-3">
                <Form.Item
                  name="total_item"
                  className="w-full h-2 mx-2 flex justify-end font-bold"
                >
                  <span> TOTAL ITEM </span> <span> : {dataTabel.length}</span>
                </Form.Item>
                <Form.Item
                  name="total_hutang_jatuh_tempo"
                  className="w-full h-2 mx-2 flex justify-end font-bold"
                >
                  <span> TOTAL HUTANG JATUH TEMPO </span>{" "}
                  <span> : {formatter.format(totalHutangJatuhTempo())}</span>
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
                  <span> SISA HUTANG JATUH TEMPO </span>{" "}
                  <span> : {formatter.format(sisaHutangJatuhTempo())}</span>
                </Form.Item>
              </div>

              <div className="w-full md:w-1/4 px-3 -mx-3">
                <Form.Item name="tanggal_pembayaran">
                  <DatePicker
                    placeholder="Tanggal Pembayaran"
                    size="large"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3 mb-0 mt-8">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="bayar1">
                    <Input
                      style={{ height: "40px" }}
                      placeholder="Bayar biaya"
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
                      <Select.Option value="cn" key="cn">
                        CN
                      </Select.Option>
                      <Select.Option value="oth" key="oth">
                        OTH
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3 mb-0 -mt-3">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="bayar2">
                    <Input
                      style={{ height: "40px" }}
                      placeholder="Bayar biaya"
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
                      <Select.Option value="cn" key="cn">
                        CN
                      </Select.Option>
                      <Select.Option value="oth" key="oth">
                        OTH
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3 mb-0 -mt-3">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="bayar3">
                    <Input
                      style={{ height: "40px" }}
                      placeholder="Bayar biaya"
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
                      <Select.Option value="cn" key="cn">
                        CN
                      </Select.Option>
                      <Select.Option value="oth" key="oth">
                        OTH
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3 mb-0 -mt-3">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="bayar4">
                    <Input
                      style={{ height: "40px" }}
                      placeholder="Bayar biaya"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="metode_bayar4" noStyle>
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
                      <Select.Option value="cn" key="cn">
                        CN
                      </Select.Option>
                      <Select.Option value="oth" key="oth">
                        OTH
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-start -mx-3 mb-0 -mt-3">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="bayar5">
                    <Input
                      style={{ height: "40px" }}
                      placeholder="Bayar biaya"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="metode_bayar5" noStyle>
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
                      <Select.Option value="cn" key="cn">
                        CN
                      </Select.Option>
                      <Select.Option value="oth" key="oth">
                        OTH
                      </Select.Option>
                    </Select>
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
                      <p className="px-4 py-2 m-0 text-white">
                        SIMPAN DAN PERBARUI
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
                        title="Tambah Hutang"
                        message="Silahkan cek kembali data yang telah dimasukkan, apakah anda yakin ingin menambahkan ?"
                        component={
                          <button
                            type="button"
                            className="bg-cyan-700 rounded-md m-1 text-sm"
                            onClick={() => setDocument("Publish")}
                          >
                            <p className="px-4 py-2 m-0 text-white">
                              SIMPAN DAN CETAK
                            </p>
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
