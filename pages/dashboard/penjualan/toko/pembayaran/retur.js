import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Popover,
  Select,
  Skeleton,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import Head from "next/dist/shared/lib/head";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import LayoutContent from "@iso/components/utility/layoutContent";
import nookies from "nookies";
import DateTimeComponent from "../../../../../components/DateTime/dateTime";
import TitlePage from "../../../../../components/TitlePage/TitlePage";
import Column from "antd/lib/table/Column";
import { useRouter } from "next/router";
import ReturDrawer from "../../../../../components/Drawer/ReturDrawer";
import { CreateStorePayment } from "../../../../../library/functions/createStorePayment";
import { createInventoryFromReturPenjualan } from "../../../../../library/functions/createInventory";
import { MenuOutlined } from "@ant-design/icons";
import moment from "moment";
import ConfirmDialog from "../../../../../components/Alert/ConfirmDialog";
import updateJurnal from "../../utility/updateJurnal";

const startDate = moment()?.startOf("day").format("YYYY-MM-DDTHH:mm:ss");
const endDate = moment()?.endOf("day").format("YYYY-MM-DDTHH:mm:ss");

PembayaranToko.getInitialProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const req = await fetchData(cookies);
    const user = await req.json();

    const paymentRetur = await fetchRetur(cookies);

    const reqStoreAccount = await getStoreAccount(cookies);
    const storeAccount = await reqStoreAccount.json();

    const data = {
      props: {
        user,
        paymentRetur,
        storeAccount,
      },
    };

    return data;
  } catch (e) {
    console.error("Error while fetching initial props:", e);
    return {
      props: {},
    };
  }
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

const fetchRetur = async (cookies, start = startDate, end = endDate, noFaktur) => {
  // get today data

  const endpoint =
    process.env.NEXT_PUBLIC_URL +
    `/retur-store-sales?sort[0]=createdAt:desc&populate=*&filters[createdAt][$gte]=${start}&filters[createdAt][$lte]=${end}&filters[status][$eq]=Belum Dibayar${
      noFaktur ? `&filters[no_retur_store_sale][$containsi]=${noFaktur}` : ""
    }`;
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

const getCheckInUser = async (cookies, user) => {
  const today = new Date().toLocaleDateString("en-GB").split("/").reverse().join("-");
  const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    .toLocaleDateString("en-GB")
    .split("/")
    .reverse()
    .join("-");

  const endpoint =
    process.env.NEXT_PUBLIC_URL +
    `/cashiers?filters[cashier_name][id][$eq]=${user.id}&populate=*&filters[createdAt][$gte]=${today}&filters[createdAt][$lte]=${tomorrow}`;
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
};

const getStoreAccount = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/store-accounts?populate=*&filters[setting][$eq]=" + true;
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

function PembayaranToko({ props }) {
  const cookies = nookies.get();
  const storeAccount = props.storeAccount;
  const userMe = props.user;
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
  const [paymentValue, setPaymentValue] = useState({});
  const [dataRetur, setDataRetur] = useState(props?.paymentRetur?.data ?? []);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedDrawerData, setSelectedDrawerData] = useState({});
  const [refetch, setRefetch] = useState(false);
  const [date, setDate] = useState([moment().startOf("day"), moment().endOf("day")]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [kembalian, setKembalian] = useState({});
  const [kembalianOtomatis, setKembalianOtomatis] = useState({});
  const [noFaktur, setNoFaktur] = useState("");
  const [othValue, setOthValue] = useState({});

  const router = useRouter();
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  const reloadPage = () => {
    setKembalian({});
    setKembalianOtomatis({});
    setOthValue({});
    setPaymentValue({});
    setSelectedPaymentMethod();

    setRefetch(!refetch);
  };

  const confirmPembayaran = async (record) => {
    const returTrxId = record.id;
    const storeTrxId = record.attributes?.store_sale?.data?.id;

    try {
      const totalHarga = record.attributes?.total ?? 0;
      let kembali = paymentValue[returTrxId] - totalHarga;

      // if kembali is negative, return 0
      if (kembali < 0) {
        kembali = 0;
      }

      if (paymentValue[returTrxId] >= totalHarga) {
        const createStoreData = await CreateStorePayment(
          totalHarga,
          kembali,
          paymentValue[returTrxId],
          selectedPaymentMethod?.[record.id],
          storeTrxId,
          returTrxId,
          "Retur",
          reloadPage
        );

        console.log(createStoreData,"createStoreData");
        if(createStoreData.data?.id){
          // action to update pembayaran jurnal
          storeAccount.data.map((item) => { console.log("masuk", item);
            if (item.attributes.type === createStoreData.data.attributes.store_payments.data[0].attributes.payment_method){
              updateJurnal(createStoreData.data, userMe, "penjualan", "toko", item.attributes.chart_of_account.data.attributes.kode);
            }
          });
        }

        await createInventoryFromReturPenjualan(record);

        reloadPage();
      } else {
        message.error("Pembayaran tidak mencukupi", 2);
      }
    } catch (error) {
      console.log("errror", error);
      message.error("Pembayaran error", 2);
    }
  };

  const cancel = (e) => {
    console.log(e);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedDrawerData({});
  };

  const onOpenDrawer = (record) => {
    setOpenDrawer(true);
    setSelectedDrawerData(record);
  };

  useEffect(() => {
    const checkInUser = async () => {
      // fetch user data
      const res = await fetchData(cookies);
      const user = await res.json();

      const resCheckIn = await getCheckInUser(cookies, user);
      console.log("resCheckIn", resCheckIn);
      if (resCheckIn?.data?.length === 0) {
        router.replace("/dashboard/penjualan/toko/kasir");
      }

      setIsLoading(false);
    };

    checkInUser();
  }, []);

  useEffect(() => {
    function fetchDataSales() {
      setLoadingTable(true);
      const start_date = router.query?.start_date ?? startDate;
      const end_date = router.query?.end_date ?? endDate;
      const noFaktur = router.query?.no_faktur;

      fetchRetur(cookies, start_date, end_date, noFaktur)
        .then((res) => res.json())
        .then((data) => {
          setDataRetur(data?.data ?? []);

          setLoadingTable(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingTable(false);
        });
    }

    fetchDataSales();
  }, [router.query, refetch]);

  function redirectQuery(query, reset = false) {
    const existingQuery = router.query;

    const mergedQuery = { ...existingQuery, ...query };

    if (reset) {
      for (const key of reset) {
        delete mergedQuery[key];
      }
    }

    router.replace(
      {
        pathname: router.pathname,
        query: mergedQuery,
      },
      undefined,
      { shallow: true }
    );
  }

  useEffect(() => {
    if (paymentValue && othValue) {
      for (const [key, value] of Object.entries(paymentValue)) {
        const totalHarga = dataRetur.find((data) => data.id === parseInt(key))?.attributes?.total ?? 0;
        const oth = othValue[key] ?? 0;
        const bayar = value ?? 0;

        const totalKembalian = bayar - totalHarga - oth;

        setKembalianOtomatis({
          ...kembalianOtomatis,
          [key]: totalKembalian < 0 ? 0 : parseFloat(totalKembalian).toFixed(2),
        });
        setKembalian({
          ...kembalian,
          [key]: null,
        });
        setOthValue({
          ...othValue,
          [key]: 0,
        });
      }
    }
  }, [paymentValue]);

  useEffect(() => {
    // calculate diff between kembalian and kembalianOtomatis then set OTH
    if (kembalian && kembalianOtomatis) {
      for (const [key, value] of Object.entries(kembalian)) {
        if (value === null || value === undefined) {
          continue;
        }
        const kembalianOtomatisValue = kembalianOtomatis?.[key] ?? 0;
        const kembalianValue = value ?? 0;

        const totalOTH = kembalianValue - kembalianOtomatisValue;

        console.log("oth nya", totalOTH);

        setOthValue({
          ...othValue,
          [key]: parseFloat(totalOTH).toFixed(2),
        });
      }
    }
  }, [kembalianOtomatis, kembalian]);

  return (
    <>
      <Head>
        <title>Penjualan Toko</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"BAYAR RETUR"} />
          <LayoutContent>
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                <DatePicker.RangePicker
                  value={date}
                  onChange={(_, value) => {
                    if (value?.[0] !== "" && value?.[1] !== "") {
                      redirectQuery({
                        start_date: moment(value?.[0])?.startOf("day").format("YYYY-MM-DDTHH:mm:ss"),
                        end_date: moment(value?.[1])?.endOf("day").format("YYYY-MM-DDTHH:mm:ss"),
                      });
                      setDate(_);
                    } else {
                      redirectQuery({}, ["start_date", "end_date"]);
                      setDate([moment().startOf("day"), moment().endOf("day")]);
                    }
                  }}
                  size="large"
                  placeholder={["Tanggal Mulai", "Tanggal Selesai"]}
                />
                <div className="flex items-center">
                  <div className="w-full md:w-1/5 mb-2 md:mb-0 mr-2">
                    <Input.Search
                      value={noFaktur}
                      size="large"
                      className=""
                      placeholder="Cari Nomor Faktur / Nama"
                      style={{
                        width: "100%",
                      }}
                      onChange={(e) => {
                        if (e.target.value === "") {
                          redirectQuery({}, ["no_faktur"]);
                          setNoFaktur("");
                        } else {
                          setNoFaktur(e.target.value);
                        }
                      }}
                      onSearch={(e) => {
                        setTimeout(() => {
                          redirectQuery({ no_faktur: e });
                        }, 500);
                      }}
                    />
                    <p className="m-0 text-xs text-gray-400">*Tekan 'Enter' atau tekan ikon untuk mencari data</p>
                  </div>
                  <div className="w-full md:w-2/5 mb-2 md:mb-0"></div>
                  <div className="w-full md:w-1/5 mb-2 md:mb-0">
                    <Button
                      onClick={() => router.push("/dashboard/penjualan/toko/pembayaran")}
                      size="large"
                      className="mr-2 border rounded-md"
                      style={{
                        width: "100%",
                      }}
                    >
                      Pembayaran
                    </Button>
                  </div>
                  <div className="w-full md:w-1/5 mb-2 md:mb-0">
                    <Button
                      size="large"
                      className="ml-2 border rounded-md bg-cyan-700 text-white hover:bg-cyan-800 "
                      style={{
                        width: "100%",
                      }}
                    >
                      Retur
                    </Button>
                  </div>
                </div>
                <div className="h-10"></div>

                {/* DRAWER COMPONENT */}
                <ReturDrawer
                  openDrawer={openDrawer}
                  onCloseDrawer={onCloseDrawer}
                  record={selectedDrawerData}
                  reloadPage={reloadPage}
                  storeAccount={storeAccount}
                  userMe={userMe}
                  updateJurnal={updateJurnal}
                />

                {/* TABEL COMPONENT */}
                <Table
                  scroll={{
                    x: 1000,
                  }}
                  loading={loadingTable}
                  dataSource={dataRetur}
                  className="custom-table"
                  rowClassName="custom-row"
                >
                  <Column title="No Faktur" dataIndex={["attributes", "no_retur_store_sale"]} key="faktur" />
                  <Column title="Nama Customer" dataIndex={["attributes", "customer_name"]} key="customer_name" />
                  {/* <Column
                    title="Status"
                    dataIndex={["attributes", "status"]}
                    key="status"
                    render={(status) => (
                      <>{status === "Dibayar" ? <Tag color="green">{status}</Tag> : <Tag color="red">{status}</Tag>}</>
                    )}
                  /> */}
                  <Column
                    title="Metode Pembayaran"
                    key="metode_pembayaran"
                    render={(record) => {
                      const dataPaymentMethod =
                        record?.attributes?.store_payments?.data
                          ?.map((payment) => payment?.attributes?.payment_method)
                          .join(", ") ?? null;
                      return (
                        <Select
                          aria-readonly={record.attributes.status === "Dibayar"}
                          className={record.attributes.status === "Dibayar" ? "pointer-events-none" : ""}
                          placeholder="Pilih Metode Pembayaran"
                          defaultValue={dataPaymentMethod}
                          style={{ width: 120 }}
                          onChange={(value) => {
                            setSelectedPaymentMethod({
                              ...selectedPaymentMethod,
                              [record.id]: value,
                            });
                          }}
                        >
                          <Select.Option value="TUNAI">TUNAI</Select.Option>
                          <Select.Option value="TRANSFER">TRANSFER</Select.Option>
                          <Select.Option value="BANK BCA">BANK BCA</Select.Option>
                          <Select.Option value="DEBIT BCA">DEBIT BCA</Select.Option>
                          <Select.Option value="LAINNYA">LAINNYA</Select.Option>
                        </Select>
                      );
                    }}
                  />
                  <Column
                    title="Total Harga"
                    key="total_harga"
                    render={(record) => <>{formatter.format(record.attributes?.total ?? 0)}</>}
                  />
                  <Column
                    title="Dibayar"
                    key="dibayar"
                    render={(record) => {
                      const dataPayment = record?.attributes?.store_payments?.data ?? [];

                      const dataPaymentValue =
                        dataPayment.length > 1
                          ? dataPayment.reduce((acc, curr) => parseFloat(acc) + parseFloat(curr.attributes.payment), 0)
                          : dataPayment.length === 1
                          ? dataPayment[0].attributes.payment
                          : 0;

                      return (
                        <InputNumber
                          onFocus={(e) => e.target.select()}
                          aria-readonly={record.attributes.status === "Dibayar"}
                          className={record.attributes.status === "Dibayar" ? "pointer-events-none" : ""}
                          onChange={(v) =>
                            setPaymentValue({
                              ...paymentValue,
                              [record.id]: v,
                            })
                          }
                          placeholder="Masukan Nominal"
                          min={0}
                          defaultValue={dataPaymentValue}
                          formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          parser={(value) => value.replace(/Rp\s?|(,*)/g, "")}
                          style={{ width: 150 }}
                        />
                      );
                    }}
                  />

                  <Column
                    title="Kembali"
                    key="kembali"
                    render={(record) => {
                      const totalHarga = record.attributes?.total ?? 0;
                      const dataPayment = record?.attributes?.store_payments?.data ?? [];

                      if (record.attributes.status === "Dibayar") {
                        const dataPaymentValue = dataPayment.reduce(
                          (acc, curr) => parseFloat(acc) + parseFloat(curr.attributes.payment),
                          0
                        );
                        const kembali = dataPaymentValue - totalHarga < 0 ? 0 : dataPaymentValue - totalHarga;
                        return formatter.format(kembali);
                      }

                      return (
                        <InputNumber
                          onFocus={(e) => e.target.select()}
                          aria-readonly={
                            record.attributes.status === "Dibayar" || record.attributes.status === "Diretur"
                          }
                          placeholder="Masukan Nominal"
                          value={kembalian?.[record.id] ?? kembalianOtomatis?.[record.id] ?? 0}
                          onChange={(v) => {
                            setKembalian({
                              ...othValue,
                              [record.id]: v,
                            });
                          }}
                          formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          parser={(value) => value.replace(/Rp\s?|(,*)/g, "")}
                          style={{ width: 150 }}
                        />
                      );
                    }}
                  />

                  <Column
                    title="OTH"
                    key="oth"
                    render={(record) => {
                      let initialValue = othValue?.[record.id];
                      const dataPayment = record?.attributes?.store_payments?.data ?? [];

                      if (record.attributes.status === "Dibayar" || record.attributes.status === "Diretur") {
                        const dataOTH = dataPayment.reduce(
                          (acc, curr) => (curr.attributes.oth ? parseFloat(acc) + parseFloat(curr.attributes.oth) : 0),
                          0
                        );

                        initialValue = dataOTH;
                      }

                      return (
                        <InputNumber
                          onFocus={(e) => e.target.select()}
                          aria-readonly={
                            record.attributes.status === "Dibayar" || record.attributes.status === "Diretur"
                          }
                          placeholder="Masukan Nominal"
                          value={initialValue ?? 0}
                          onChange={(v) => {
                            setOthValue({
                              ...othValue,
                              [record.id]: v,
                            });
                          }}
                          formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          parser={(value) => value.replace(/Rp\s?|(,*)/g, "")}
                          className={
                            record.attributes.status === "Dibayar" || record.attributes.status === "Diretur"
                              ? `pointer-events-none ${initialValue < 0 ? "text-red-600" : ""}`
                              : othValue?.[record.id] < 0
                              ? "text-red-600"
                              : ""
                          }
                          style={{ width: 150 }}
                        />
                      );
                    }}
                  />
                  <Column
                    title="Action"
                    key="action"
                    render={(_, record) => {
                      if (record.attributes.status === "Dibayar") {
                        return <></>;
                      }

                      return (
                        <>
                          <ConfirmDialog
                            title={
                              "Pembayaran akan dilakukan sebesar " +
                              formatter.format(paymentValue?.[record.id] ?? 0) +
                              ". Lanjutkan?"
                            }
                            message={
                              "Pembayaran akan dilakukan sebesar " +
                              formatter.format(paymentValue?.[record.id] ?? 0) +
                              ". Lanjutkan?"
                            }
                            onConfirm={() => confirmPembayaran(record)}
                            onCancel={() => {}}
                            okText="Bayar"
                            cancelText="Batalkan"
                            component={
                              <Button className="rounded-md mr-2 hover:text-white focus:text-white hover:bg-cyan-700 border border-cyan-700 focus:bg-cyan-700 ml-1">
                                Bayar
                              </Button>
                            }
                          />

                          <Button
                            className="rounded-md mr-2 hover:text-white focus:text-white hover:bg-cyan-700 border border-cyan-700 focus:bg-cyan-700 ml-1"
                            onClick={() => onOpenDrawer(record)}
                          >
                            Pemb. Lain
                          </Button>
                        </>
                      );
                    }}
                  />
                </Table>
              </>
            )}
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default PembayaranToko;
