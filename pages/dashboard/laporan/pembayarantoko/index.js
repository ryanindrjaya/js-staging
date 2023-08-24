import Head from "next/head";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import { DatePicker, Empty, Select, Space, Table, notification } from "antd";
import { useRouter } from "next/router";
import nookies from "nookies";
import moment from "moment";

const { Column, Summary } = Table;
const cookies = nookies.get();

const fetchData = async (uri) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + uri;
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

export default function PembayaranToko() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState({
    table: false,
    admin: false,
    akun: false,
    tanggal: false,
  });
  const [dataFilter, setDataFilter] = useState({
    admin: [],
    akun: [],
  });
  const [date, setDate] = useState([
    moment().startOf("day").hour(0).minute(0).second(0),
    moment().endOf("day").hour(23).minute(59).second(59),
  ]);
  const [selectedAdmin, setSelectedAdmin] = useState();
  const router = useRouter();

  function handlePrint() {
    notification.info({
      message: "Fitur ini belum tersedia",
      description: "Fitur ini akan tersedia pada versi selanjutnya",
    });
  }

  useEffect(() => {
    async function getData(queries) {
      setLoading({ ...loading, table: true });
      let endpoint = `/store-sales/payment?`;

      if (queries) {
        for (const [key, value] of Object.entries(queries)) {
          if (key && value) {
            endpoint += `${key}=${value}&`;
          }
        }
      }

      try {
        const data = await fetchData(endpoint);
        console.log(data);

        setData(data);
      } catch (error) {
        console.log(error);
      }
      setLoading({ ...loading, table: false });
    }

    console.log(router.query);

    if (router?.query) {
      getData(router.query);
    }
  }, [router.query]);

  useEffect(() => {
    if (date) {
      redirectQuery({
        start_date: moment(date?.[0])?.startOf("day").format("YYYY-MM-DDTHH:mm:ss"),
        end_date: moment(date?.[1])?.endOf("day").format("YYYY-MM-DDTHH:mm:ss"),
      });
    }
  }, []);

  async function getListUserPembayaran() {
    if (dataFilter.admin.length > 0) return;

    setLoading({ ...loading, admin: true });

    const roles = ["Admin", "Kasir", "Penjualan", "Keuangan"];

    let endpoint = `/users?`;

    let i = 0;
    for (const role of roles) {
      endpoint += `filters[$or][${i}][role][name][$eq]=${role}&`;
      i++;
    }

    const res = await fetchData(endpoint);

    setDataFilter({
      ...dataFilter,
      admin:
        res?.map((item) => ({
          label: item.name,
          value: item.name,
        })) || [],
    });

    setLoading({ ...loading, admin: false });
  }

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

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const SummaryComponent = () => {
    return (
      <>
        <Summary.Row>
          <Summary.Cell align="right" colSpan={6} index={0}>
            <div className="border-y border-black py-1 mt-4 ">
              <span className="pr-5 font-bold">SUB TOTAL</span>
            </div>
          </Summary.Cell>
          <Summary.Cell align="center" index={1}>
            <div className="border-y border-black py-1 mt-4">{formatter.format(data?.summary?.debit ?? 0)}</div>
          </Summary.Cell>
          <Summary.Cell align="center" index={2}>
            <div className="border-y border-black py-1 mt-4">{formatter.format(data?.summary?.credit ?? 0)}</div>
          </Summary.Cell>
          <Summary.Cell align="center" index={3}>
            <div className="border-y border-black py-1 mt-4">
              <span className={data?.summary?.oth < 0 ? "text-red-500" : ""}>
                {formatter.format(data?.summary?.oth ?? 0)}
              </span>
            </div>
          </Summary.Cell>
        </Summary.Row>
        <Summary.Row>
          <Summary.Cell align="right" colSpan={6} index={0}>
            <div className="bg-[#036b82] py-1 mt-2 ">
              <span className="pr-5 font-bold text-white">TOTAL</span>
            </div>
          </Summary.Cell>
          <Summary.Cell align="center" index={1} colSpan={3}>
            <div className="bg-[#036b82] py-1 mt-2">
              <span className="text-white font-bold pr-24">{formatter.format(data?.summary?.total ?? 0)}</span>
            </div>
          </Summary.Cell>
        </Summary.Row>
        <Summary.Row>
          <Summary.Cell align="right" colSpan={5} index={0}>
            <div className="bg-transparent py-1 mt-2 ">
              <span className="pr-5 font-bold text-white"></span>
            </div>
          </Summary.Cell>
          <Summary.Cell align="right" index={0}>
            <div className="bg-[#036b82] py-1 mt-2 ">
              <span className="pr-5 font-bold text-white">CASH ON HAND</span>
            </div>
          </Summary.Cell>
          <Summary.Cell align="center" colSpan={3} index={0}>
            <div className="bg-[#036b82] py-1 mt-2">
              <span className="text-white font-bold pr-24">{formatter.format(data?.cash_in_hand ?? 0)}</span>
            </div>
          </Summary.Cell>
        </Summary.Row>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Laporan Pembayaran Penjualan Toko</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper>
          <TitlePage titleText={"Laporan Pembayaran Penjualan Toko"} />
          <LayoutContent>
            <div className="lg:w-3/4 w-full gap-3 grid grid-cols-3 mb-3">
              <Select
                value={selectedAdmin}
                loading={loading.admin}
                onClick={getListUserPembayaran}
                onSelect={(value) => {
                  setSelectedAdmin(value);
                  redirectQuery({ author: value });
                }}
                options={dataFilter.admin}
                size="large"
                placeholder="Admin Pembayaran"
                allowClear
                onClear={() => {
                  setSelectedAdmin();
                  redirectQuery({}, ["author"]);
                }}
              />
              <Select size="large" placeholder="Akun Pembayaran" disabled />
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
            </div>

            <div className="lg:w-3/4 w-full gap-3 grid grid-cols-3 my-4">
              <button
                onClick={handlePrint}
                type="button"
                className="w-full bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print PDF</a>
                </div>
              </button>
              <button
                onClick={handlePrint}
                type="button"
                className="w-full bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print XLS</a>
                </div>
              </button>
            </div>

            {data?.data ? (
              <Table
                summary={SummaryComponent}
                className="table-pembayaran-toko"
                loading={loading.table}
                dataSource={data.data}
                pagination={false}
                scroll={{ x: 1000 }}
              >
                <Column title="DITAMBAHKAN OLEH" key="added_by" dataIndex="added_by" />
                <Column
                  className="uppercase"
                  align="left"
                  title="Catatan Staff"
                  key="catatan"
                  dataIndex="catatan_staff"
                />
                <Column
                  render={(value) => moment(value).format("DD/MM/YYYY HH:mm:ss")}
                  className="uppercase"
                  title="Tanggal"
                  key="date"
                  dataIndex="date"
                  sorter={(a, b) => moment(a.date).unix() - moment(b.date).unix()}
                />
                <Column className="uppercase" title="Akun Pembayaran" key="account" dataIndex="account" />
                <Column
                  sorter={(a, b) => {
                    const nomorA = a.no_faktur.split("/")[1];
                    const nomorB = b.no_faktur.split("/")[1];

                    const bulanA = a.no_faktur.split("/")[2];
                    const bulanB = b.no_faktur.split("/")[2];

                    const tahunA = a.no_faktur.split("/")[3];
                    const tahunB = b.no_faktur.split("/")[3];

                    const sumA = parseInt(tahunA + bulanA + nomorA);
                    const sumB = parseInt(tahunB + bulanB + nomorB);

                    return sumA - sumB;
                  }}
                  className="uppercase"
                  title="No Faktur"
                  key="no_faktur"
                  dataIndex="no_faktur"
                />
                <Column
                  align="center"
                  render={(value) => formatter.format(value)}
                  title="TOTAL NILAI FAKTUR"
                  key="total_faktur"
                  dataIndex="total_faktur"
                />
                <Column
                  align="center"
                  render={(value) => (value > 0 ? formatter.format(value) : "")}
                  title="DEBET"
                  key="debit"
                  dataIndex="debit"
                />
                <Column
                  align="center"
                  render={(value) => (value !== 0 ? formatter.format(value) : "")}
                  title="KREDIT"
                  key="credit"
                  dataIndex="credit"
                />
                <Column
                  align="center"
                  render={(value) =>
                    value !== 0 ? (
                      <span className={value < 0 ? "text-red-500" : ""}>{formatter.format(value)}</span>
                    ) : (
                      ""
                    )
                  }
                  title="OTH"
                  key="oth"
                  dataIndex="oth"
                />
              </Table>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Tidak ada data"
                className="w-full h-[20vh] flex flex-col justify-center items-center"
              />
            )}
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}
