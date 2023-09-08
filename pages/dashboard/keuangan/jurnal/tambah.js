import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Form, Input, InputNumber, Select, Button, Spin, notification, DatePicker } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import SearchBar from "@iso/components/Form/AddCost/SearchCOA";
import AddJurnalTable from "@iso/components/ReactDataTable/Cost/AddJurnalTable";
//import createOrderSaleFunc from "../utility/createOrderSale";
//import createDetailOrderSaleFunc from "../utility/createDetailOrderSale";
//import calculatePrice from "../utility/calculatePrice";
import Customer from "@iso/components/Form/AddSale/CustomerForm";
import nookies from "nookies";
import moment from "moment";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import confirm from "antd/lib/modal/confirm";
import getUserCodeName from "../../../../library/functions/getUserCodeName";

Jurnal.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqDataUser = await fetchUser(cookies);
  const dataUser = await reqDataUser.json();

  // const reqLocation = await fetchLocation(cookies);
  // const locations = await reqLocation.json();

  // const reqInven = await fetchInven(cookies);
  // const inven = await reqInven.json();

  const reqJurnal = await fetchJurnal(cookies);
  const jurnal = await reqJurnal.json();

  const reqCustomer = await fetchCustomer(cookies);
  const customer = await reqCustomer.json();

  return {
    props: {
      user,
      dataUser,
      //locations,
      //inven,
      jurnal,
      customer,
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

const fetchUser = async (cookies) => {
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

const fetchJurnal = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/jurnals?populate=*";
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

// const fetchLocation = async (cookies) => {
//   const endpoint = process.env.NEXT_PUBLIC_URL + "/locations";
//   const options = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + cookies.token,
//     },
//   };

//   const req = await fetch(endpoint, options);
//   return req;
// };

// const fetchInven = async (cookies) => {
//   const endpoint = process.env.NEXT_PUBLIC_URL + "/inventories?populate=*";
//   const options = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + cookies.token,
//     },
//   };

//   const req = await fetch(endpoint, options);
//   return req;
// };

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

function Jurnal({ props }) {
  const akuns = useSelector((state) => state.Cost);
  const dispatch = useDispatch();

  var selectedAkun = akuns?.akun;
  //const locations = props.locations.data;
  const user = props.user;
  //const inven = props.inven.data;
  const jurnal = props.jurnal;
  const customerData = props.customer.data[0];
  const dataUser = props.dataUser;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [akunList, setAkunList] = useState([]);
  const [isFetchinData, setIsFetchingData] = useState(false);
  const [dataValues, setDataValues] = useState();

  const router = useRouter();
  const { TextArea } = Input;
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var date = today.getDate() + "/" + mm + "/" + yyyy;
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  // debit dan kredit
  const [debitValue, setDebitValue] = useState(0);
  const [kreditValue, setKreditValue] = useState(0);
  const [totalDebitValue, setTotalDebitValue] = useState(0);
  const [totalKreditValue, setTotalKreditValue] = useState(0);
  const [deleteAkun, setDeleteAkun] = useState(0);

  // DPP & PPN
  //const dpp = 1.11;
  //var ppn = 0;

  // temp
  //const [biayaTambahan, setBiayaTambahan] = useState();
  //const [biayaPengiriman, setBiayaPengiriman] = useState(0);

  const cookies = nookies.get(null, "token");
  const tempList = [];

  const [info, setInfo] = useState();

  // customer
  const [customer, setCustomer] = useState();

  // NO Jurnal
  var noJurnal = String(props.jurnal?.meta?.pagination.total + 1).padStart(3, "0");
  var keterangan = "sukses";

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  async function fetchLatestNoReferensi() {
    const codename = await getUserCodeName();

    const endpoint = `${process.env.NEXT_PUBLIC_URL}/jurnals?sort[0]=id:desc&pagination[limit]=1&filters[no_jurnal][$contains]=${codename}/JM/`;
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
      const no = parseInt(latestDaata?.attributes?.no_jurnal?.split("/")?.[2] || 0) + 1;
      console.log("no", no);
      const latestNoReferensi = `${codename}/JM/${String(no).padStart(5, "0")}/${moment().format("MM/YYYY")}`;
      form.setFieldsValue({
        no_jurnal: latestNoReferensi,
      });
      return latestNoReferensi;
    }

    console.log("response from fetchLatestNoReferensi", response);
  }

  const onFinish = (values, accept) => {
    if (accept) {
      setLoading(true);
      setInfo("sukses");
      var totalDebit = 0;
      var totalKredit = 0;
      for (var index = 0; index < akuns.akun.length; index++) {
        if (values.debitData[index] == undefined) values.debitData[index] = 0;
        if (values.kreditData[index] == undefined) values.kreditData[index] = 0;
        totalDebit += values.debitData[index];
        totalKredit += values.kreditData[index];
      }

      if (akuns.akun.length === 0 || akuns.akun.length === 1) {
        if (akuns.akun.length === 0) {
          notification["error"]({
            message: "Gagal menambahkan data",
            description: "Data gagal ditambahkan, karena belum ada data yang dimasukkan.",
          });
        } else {
          notification["error"]({
            message: "Gagal menambahkan data",
            description: "Data gagal ditambahkan, karena belum memasukkan akun yang dipilih atau saldo.",
          });
        }
        setInfo("gagal");
      } else console.log("Blum ada data akun.");

      if (totalDebit != totalKredit) {
        notification["error"]({
          message: "Gagal menambahkan data",
          description: "Data gagal ditambahkan, karena total kredit dan debit harus sama.",
        });
        setInfo("gagal");
      } else console.log("Debit dan kredit sudah sesuai.");

      var checkData = 1;
      jurnal.data.forEach((element) => {
        if (values.no_jurnal == element.attributes.no_jurnal && checkData == 1) {
          notification["error"]({
            message: "Gagal menambahkan data",
            description: "Data gagal ditambahkan, karena no jurnal sama",
          });
          setInfo("gagal");
          checkData++;
        }
      });

      console.log("data values", values, akuns, accept);
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

  const create = async (values) => {
    values.added_by = user.name;

    console.log("data values", values, akuns);

    akuns.akun.forEach((item, index) => {
      values.catatan = values.catatanData[index];
      values.debit = values.debitData[index];
      values.kredit = values.kreditData[index];
      values.chart_of_account = item.id;

      var saldo = parseFloat(item?.attributes?.saldo);

      //default debit
      if (item.attributes.jenis_akun === true && saldo + values.debit > values.kredit) {
        saldo = saldo + values.debit - values.kredit;
      } else if (item.attributes.jenis_akun === false && saldo + values.kredit > values.debit) {
        saldo = saldo + values.kredit - values.debit;
      } else {
        notification["error"]({
          message: "Gagal menambahkan data",
          description: "Saldo akun kurang untuk melakukan pembayaran.",
        });
      }

      const req = createData(values);
    });
  };

  const createData = async (values) => {
    var data = {
      data: values,
    };

    const endpoint = process.env.NEXT_PUBLIC_URL + "/jurnals";
    const JSONdata = JSON.stringify(data);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSONdata,
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();
    console.log("req create", req, res);

    if (req.status === 200) {
      console.log("suksess");
      openNotificationWithIcon("success");
      router.replace("/dashboard/keuangan/jurnal");
    } else {
      openNotificationWithIcon("error", req);
    }
  };

  const openNotificationWithIcon = (type, req) => {
    if (type === "error") {
      notification[type]({
        message: "Gagal menambahkan data",
        description: "Jurnal gagal ditambahkan." + req.statusText,
      });
    } else if (type === "success") {
      notification[type]({
        message: "Berhasil menambahkan data",
        description: "Jurnal berhasil ditambahkan.",
      });
    }
  };

  const onChangeAkun = async () => {
    var isDuplicatedData = false;

    tempList.find((item) => {
      akunList.forEach((element) => {
        if (element.id === item.id) isDuplicatedData = true;
      });
    });

    if (!isDuplicatedData) {
      setAkunList((list) => [...list, tempList[0]]);
    }
  };

  const clearData = () => {
    dispatch({ type: "CLEAR_DATA" });
  };

  useEffect(() => {
    var totalDebit = 0;
    var totalKredit = 0;

    for (var index = 0; index < akuns.akun.length; index++) {
      totalDebit += akuns.akunInfo[index]?.debit ?? 0;
      totalKredit += akuns.akunInfo[index]?.kredit ?? 0;
    }

    setTotalDebitValue(totalDebit);
    setTotalKreditValue(totalKredit);

    totalDebit = 0;
    totalKredit = 0;
    setDebitValue(0);
    setKreditValue(0);
  }, [debitValue, kreditValue]);

  useEffect(() => {}, [deleteAkun]);

  useEffect(() => {
    //if (dataValues && info == "sukses") createDetailSale();]
    if (dataValues && info == "sukses") create(dataValues);
  }, [dataValues]);

  useEffect(() => {
    // used to reset redux from value before
    clearData();
    form.setFieldsValue({
      customer: customerData?.attributes.name,
      tanggal: moment(),
    });
    setCustomer(customerData);
    fetchLatestNoReferensi();
    setTotalDebitValue(0);
    setTotalKreditValue(0);
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
        <title>Penjualan Pesanan Sales</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Jurnal Memo"} />
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
                    name="no_jurnal"
                    rules={[
                      {
                        required: true,
                        message: "Nomor Jurnal tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input style={{ height: "40px" }} placeholder="No. Jurnal" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item
                    name="users" //initialValue={"Hari"}
                    noStyle
                  >
                    <Select
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      placeholder="User"
                      defaultValue={{ label: user.name, value: user.id }}
                    >
                      {dataUser.map((element) => {
                        return (
                          <Select.Option value={element.id} key={element.name}>
                            {element.name}
                          </Select.Option>
                        );
                      })}
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
                      placeholder="Tanggal Jurnal"
                      size="large"
                      style={{ width: "100%" }}
                      format={"DD/MM/YYYY"}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex md:w-4/4 px-3 mb-2 mt-2 mx-0  md:mb-0">
                <SearchBar
                  form={form}
                  tempList={tempList}
                  onChange={onChangeAkun}
                  user={user}
                  selectedAkun={selectedAkun}
                  isBasedOnLocation={false}
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
                  <AddJurnalTable
                    data={akuns}
                    formObj={form}
                    setDebitValue={setDebitValue}
                    setKreditValue={setKreditValue}
                    setTotalDebitValue={setTotalDebitValue}
                    setTotalKreditValue={setTotalKreditValue}
                    totalDebitValue={totalDebitValue}
                    totalKreditValue={totalKreditValue}
                  />
                </div>
              )}

              <div className="w-full flex justify-end px-3 mt-5">
                <Form.Item name="totalDebit" className="font-bold text-lg">
                  <span> Total Debit : {formatter.format(totalDebitValue)} </span>
                </Form.Item>
              </div>
              <div className="w-full flex justify-end px-3 -mt-5">
                <Form.Item name="totalKredit" className="font-bold text-lg">
                  <span> Total Kredit : {formatter.format(totalKreditValue)} </span>
                </Form.Item>
              </div>

              <div className="w-full flex justify-left">
                <Form.Item>
                  {loading ? (
                    <div className=" flex float-left ml-3 ">
                      <Spin />
                    </div>
                  ) : (
                    <button htmlType="submit" className="bg-cyan-700 rounded-md m-1 text-sm">
                      <p className="px-4 py-2 m-0 text-white">SIMPAN</p>
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

export default Jurnal;
