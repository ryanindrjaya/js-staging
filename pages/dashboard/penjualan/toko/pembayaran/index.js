import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Popconfirm,
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

function PembayaranToko({ props }) {
  const cookies = nookies.get();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
  const [paymentValue, setPaymentValue] = useState(0);
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

  const confirm = async (record) => {
    const returTrxId = null;
    const storeTrxId = record.id;

    try {
      const totalHarga = record.attributes?.total ?? 0;
      let kembali = paymentValue - totalHarga;

      // if kembali is negative, return 0
      if (kembali < 0) {
        kembali = 0;
      }

      if (paymentValue >= totalHarga) {
        const inventoryOut = await createInventoryFromPenjualan(record);
        if (inventoryOut) {
          await CreateStorePayment(
            totalHarga,
            kembali,
            paymentValue,
            selectedPaymentMethod?.[record.id],
            storeTrxId,
            returTrxId,
            "Pembayaran",
            reloadPage
          );
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
      console.log("resCheckIn", resCheckIn);
      if (resCheckIn?.data?.length === 0) {
        router.replace("/dashboard/penjualan/toko/kasir");
      }

      setIsLoading(false);
    };

    checkInUser();
  }, []);

  return (
    <>
      <Head>
        <title>Penjualan Toko</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"PEMBAYARAN TOKO"} />
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
                <Table dataSource={dataSales} className="custom-table" rowClassName="custom-row">
                  <Column title="No Faktur" dataIndex={["attributes", "no_store_sale"]} key="faktur" />
                  <Column title="Nama Customer" dataIndex={["attributes", "customer_name"]} key="customer_name" />
                  <Column
                    title="Status"
                    dataIndex={["attributes", "status"]}
                    key="status"
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
                      return (
                        <Select
                          disabled={record.attributes.status === "Dibayar" || record.attributes.status === "Diretur"}
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
                          disabled={record.attributes.status === "Dibayar" || record.attributes.status === "Diretur"}
                          onChange={setPaymentValue}
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

                      if (record.attributes.status === "Dibayar" || record.attributes.status === "Diretur") {
                        const dataPaymentValue = dataPayment.reduce(
                          (acc, curr) => parseFloat(acc) + parseFloat(curr.attributes.payment),
                          0
                        );
                        const kembali = dataPaymentValue - totalHarga < 0 ? 0 : dataPaymentValue - totalHarga;
                        return formatter.format(kembali);
                      }

                      const kembali = paymentValue - totalHarga;
                      return formatter.format(Math.max(kembali, 0));
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
                        <div>
                          <Popconfirm
                            title={
                              "Pembayaran akan dilakukan sebesar " + formatter.format(paymentValue) + ". Lanjutkan?"
                            }
                            description={
                              "Pembayaran akan dilakukan sebesar " + formatter.format(paymentValue) + ". Lanjutkan?"
                            }
                            onConfirm={() => confirm(record)}
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

                          <Button onClick={() => onOpenDrawer(record)} className="rounded-md">
                            Pemb. Lain
                          </Button>
                        </div>
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
