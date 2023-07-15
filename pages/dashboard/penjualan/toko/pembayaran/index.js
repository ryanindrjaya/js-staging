import {
  Button,
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
import PembayaranDrawer from "../../../../../components/Drawer/PembayaranDrawer";
import { CreateStorePayment } from "../../../../../library/functions/createStorePayment";
import { createInventoryFromPenjualan } from "../../../../../library/functions/createInventory";
import { MenuOutlined, AuditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import confirm from "antd/lib/modal/confirm";

PembayaranToko.getInitialProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const req = await fetchData(cookies);
    const user = await req.json();

    const reqPaymentSales = await fethcPaymentSales(cookies);
    const paymentSales = await reqPaymentSales.json();

    const data = {
      props: {
        user,
        paymentSales,
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

const fethcPaymentSales = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/store-sales?sort[0]=createdAt:desc&populate=*";
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
    `/cashiers?filters[cashier_name][id][$eq]=${user.id}&populate=*&filters[createdAt][$gte]=${today}&filters[createdAt][$lte]=${tomorrow}&filters[type][$eq]=CHECK IN`;
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
const getCheckOutUser = async (cookies, user) => {
  const today = new Date().toLocaleDateString("en-GB").split("/").reverse().join("-");
  const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    .toLocaleDateString("en-GB")
    .split("/")
    .reverse()
    .join("-");

  const endpoint =
    process.env.NEXT_PUBLIC_URL +
    `/cashiers?filters[cashier_name][id][$eq]=${user.id}&populate=*&filters[createdAt][$gte]=${today}&filters[createdAt][$lte]=${tomorrow}&filters[type][$eq]=CHECK OUT`;
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

function PembayaranToko({ props }) {
  const cookies = nookies.get();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
  const [paymentValue, setPaymentValue] = useState({});
  const [othValue, setOthValue] = useState({});
  const dataSales = props?.paymentSales?.data;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedDrawerData, setSelectedDrawerData] = useState({});
  const router = useRouter();
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  const reloadPage = () => {
    router.reload();
  };

  const confirmPembayaran = async (record) => {
    const returTrxId = null;
    const storeTrxId = record.id;

    try {
      const totalHarga = record.attributes?.total ?? 0;
      let kembali = paymentValue[storeTrxId] - totalHarga;

      // if kembali is negative, return 0
      if (kembali < 0) {
        kembali = 0;
      }

      const oth = othValue[storeTrxId];
      const bayar = paymentValue[storeTrxId];
      const sisaPembayaran = totalHarga - bayar + oth;

      const mencukupi = sisaPembayaran <= 0;

      if (mencukupi) {
        const inventoryOut = await createInventoryFromPenjualan(record);
        if (inventoryOut) {
          await CreateStorePayment(
            totalHarga,
            kembali,
            paymentValue[storeTrxId],
            selectedPaymentMethod?.[record.id],
            storeTrxId,
            returTrxId,
            "Pembayaran",
            reloadPage,
            othValue[storeTrxId]
          );
        } else {
          message.error("Inventory gagal dibuat, transaksi tidak dapat dilakukan.", 2);
        }
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
      const resCheckOut = await getCheckOutUser(cookies, user);
      if (resCheckIn?.data?.length === 0 || resCheckOut?.data?.length > 0) {
        router.replace("/dashboard/penjualan/toko/kasir");
      }

      setIsLoading(false);
    };

    checkInUser();
  }, []);

  const handleTutupKasir = (confirmed) => {
    if (confirmed) {
      router.replace("/dashboard/penjualan/toko/kasir?status=tutup");
    } else {
      confirm({
        title: "Apakah anda yakin ingin menutup kasir?",
        icon: <ExclamationCircleOutlined />,
        content: "Data penjualan akan masuk ke laporan penjualan toko.",
        okText: "Ya",
        okType: "danger",
        cancelText: "Tidak",
        centered: true,
        onOk() {
          handleTutupKasir(true);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  };

  return (
    <>
      <Head>
        <title>Penjualan Toko</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage
            titleText={"PEMBAYARAN TOKO"}
            button={
              <Button
                onClick={() => handleTutupKasir(false)}
                size="large"
                className="mr-2 border flex items-center rounded-md bg-cyan-700 text-white hover:bg-cyan-800 "
              >
                <AuditOutlined />
                <span className="ml-2">Tutup Kasir</span>
              </Button>
            }
          />
          <LayoutContent>
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                <DateTimeComponent />
                <div className="flex items-center">
                  <div className="w-full md:w-1/5 mb-2 md:mb-0 mr-2">
                    <Input.Search
                      size="large"
                      className=""
                      placeholder="Cari Nomor Faktur / Nama"
                      style={{
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="w-full md:w-2/5 mb-2 md:mb-0"></div>
                  <div className="w-full md:w-1/5 mb-2 md:mb-0">
                    <Button
                      size="large"
                      className="mr-2 border rounded-md bg-cyan-700 text-white hover:bg-cyan-800 "
                      style={{
                        width: "100%",
                      }}
                    >
                      Pembayaran
                    </Button>
                  </div>
                  <div className="w-full md:w-1/5 mb-2 md:mb-0">
                    <Button
                      onClick={() => router.push("/dashboard/penjualan/toko/pembayaran/retur")}
                      size="large"
                      className="ml-2 border rounded-md"
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
                <PembayaranDrawer
                  openDrawer={openDrawer}
                  onCloseDrawer={onCloseDrawer}
                  record={selectedDrawerData}
                  reloadPage={reloadPage}
                />

                {/* TABEL COMPONENT */}
                <Table
                  size="small"
                  dataSource={dataSales}
                  className="custom-table"
                  scroll={{
                    x: 1000,
                  }}
                  rowClassName="custom-row"
                >
                  <Column title="No Faktur" dataIndex={["attributes", "no_store_sale"]} key="faktur" />
                  <Column
                    title="Nama Customer"
                    className="whitespace-pre-wrap"
                    dataIndex={["attributes", "customer_name"]}
                    key="customer_name"
                  />
                  <Column
                    title="Status"
                    dataIndex={["attributes", "status"]}
                    key="status"
                    filters={[
                      {
                        text: "Dibayar",
                        value: "Dibayar",
                      },
                      {
                        text: "Belum Dibayar",
                        value: "Belum Dibayar",
                      },
                    ]}
                    onFilter={(value, record) => record.attributes.status.indexOf(value) === 0}
                    render={(status) => (
                      <>
                        {status === "Dibayar" ? (
                          <Tag color="green">{status}</Tag>
                        ) : status === "Diretur" ? (
                          <Tag color="orange">{status}</Tag>
                        ) : (
                          <Tag color="red">{status}</Tag>
                        )}
                      </>
                    )}
                  />
                  <Column
                    title="Metode Pembayaran"
                    key="metode_pembayaran"
                    render={(record) => {
                      const dataPaymentMethod =
                        record?.attributes?.store_payments?.data
                          ?.map((payment) => payment?.attributes?.payment_method)
                          .join(", ") ?? null;

                      const status = record.attributes.status;

                      return (
                        <Select
                          aria-readonly={
                            record.attributes.status === "Dibayar" || record.attributes.status === "Diretur"
                          }
                          placeholder="Pilih Metode Pembayaran"
                          value={status !== "Belum Dibayar" ? dataPaymentMethod : selectedPaymentMethod?.[record.id]}
                          className={
                            record.attributes.status === "Dibayar" || record.attributes.status === "Diretur"
                              ? "pointer-events-none"
                              : ""
                          }
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
                      const status = record.attributes.status;

                      const dataPaymentValue =
                        dataPayment.length > 1 && status !== "Belum Dibayar"
                          ? dataPayment.reduce((acc, curr) => parseFloat(acc) + parseFloat(curr.attributes.payment), 0)
                          : dataPayment.length === 1
                          ? dataPayment[0].attributes.payment
                          : 0;

                      return (
                        <InputNumber
                          onFocus={(e) => e.target.select()}
                          aria-readonly={
                            record.attributes.status === "Dibayar" || record.attributes.status === "Diretur"
                          }
                          onChange={(v) =>
                            setPaymentValue({
                              ...paymentValue,
                              [record.id]: v,
                            })
                          }
                          placeholder="Masukan Nominal"
                          min={0}
                          value={status !== "Belum Dibayar" ? dataPaymentValue : paymentValue?.[record.id] ?? 0}
                          formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          parser={(value) => value.replace(/Rp\s?|(,*)/g, "")}
                          className={
                            record.attributes.status === "Dibayar" || record.attributes.status === "Diretur"
                              ? "pointer-events-none"
                              : "pointer-events-auto"
                          }
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
                    title="Pengembalian"
                    key="kembali"
                    render={(record) => {
                      const totalHarga = record.attributes?.total ?? 0;
                      const dataPayment = record?.attributes?.store_payments?.data ?? [];
                      const payment = paymentValue?.[record.id] ?? 0;
                      const oth = othValue?.[record.id] ?? 0;

                      if (record.attributes.status === "Dibayar" || record.attributes.status === "Diretur") {
                        const dataPaymentValue = dataPayment.reduce(
                          (acc, curr) =>
                            parseFloat(acc) +
                            parseFloat(curr.attributes.payment) -
                            parseFloat(curr.attributes?.oth ?? 0),
                          0
                        );

                        const kembali = dataPaymentValue - totalHarga < 0 ? 0 : dataPaymentValue - totalHarga;
                        return formatter.format(kembali);
                      }

                      const kembali = payment - totalHarga - oth;

                      return formatter.format(Math.max(kembali, 0));
                    }}
                  />
                  <Column
                    title="Sisa Pembayaran"
                    key="sisa_pembayaran"
                    render={(record) => {
                      const totalHarga = record.attributes?.total ?? 0;
                      const dataPayment = record?.attributes?.store_payments?.data ?? [];
                      const bayar = paymentValue?.[record.id] ?? 0;
                      const oth = othValue?.[record.id] ?? 0;

                      if (record.attributes.status === "Dibayar" || record.attributes.status === "Diretur") {
                        const sumPayment = dataPayment.reduce(
                          (acc, curr) => parseFloat(acc) + parseFloat(curr.attributes.payment),
                          0
                        );
                        const kembali = sumPayment < totalHarga < 0 ? totalHarga - sumPayment : 0;
                        return formatter.format(kembali);
                      }

                      if (bayar) {
                        let sisa = totalHarga - bayar + oth;

                        return formatter.format(sisa < 0 ? 0 : sisa);
                      } else {
                        return formatter.format(0);
                      }
                    }}
                  />
                  <Column
                    title="Action"
                    key="action"
                    render={(_, record) => {
                      if (record.attributes.status === "Dibayar" || record.attributes.status === "Diretur") {
                        return <></>;
                      }

                      return (
                        <Popover
                          showArrow={false}
                          trigger="click"
                          content={
                            <div className="flex flex-col justify-start gap-2">
                              <Popconfirm
                                placement="topLeft"
                                title={
                                  "Pembayaran akan dilakukan sebesar " +
                                  formatter.format(paymentValue?.[record.id] ?? 0) +
                                  ". Lanjutkan?"
                                }
                                description={
                                  "Pembayaran akan dilakukan sebesar " +
                                  formatter.format(paymentValue?.[record.id] ?? 0) +
                                  ". Lanjutkan?"
                                }
                                onConfirm={() => confirmPembayaran(record)}
                                onCancel={cancel}
                                okButtonProps={{
                                  style: { backgroundColor: "#00b894" },
                                }}
                                okText="Bayar"
                                cancelText="Batalkan"
                              >
                                <Button className="rounded-md mr-2 hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1">
                                  Bayar
                                </Button>
                              </Popconfirm>

                              <Button
                                className="rounded-md mr-2 hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1"
                                onClick={() => onOpenDrawer(record)}
                              >
                                Pemb. Lain
                              </Button>
                            </div>
                          }
                          placement="bottomLeft"
                        >
                          <MenuOutlined className="text-xl cursor-pointer hover:text-primary transition-colors duration-75" />
                        </Popover>
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
