import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import LayoutContent from "@iso/components/utility/layoutContent";
import FakturTable from "@iso/components/ReactDataTable/Pajak/FakturTable";
import { Button, DatePicker, Input, Select, notification } from "antd";
import nookies from "nookies";
import QueryString from "qs";
import { ArrowUpOutlined } from "@ant-design/icons";
import ExportFakturTable from "../../../components/ReactDataTable/Pajak/ExportFakturTable";
import { CSVLink } from "react-csv";
import moment from "moment";
import { createData, boilerPlateData1, boilerPlateData2, headers } from "../../../library/helpers/ExportCSV/utils";
const cookies = nookies.get(null);

export default function no_faktur_list() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const downloadCsv = useRef();

  const [query, setQuery] = useState({
    no_faktur: null,
    jenis: null,
    is_used: null,
  });

  const fetchData = async (params) => {
    setLoading(true);

    const endpoint = `${process.env.NEXT_PUBLIC_URL}/no-faktur-lists?${params ? `${params}` : ""}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (res?.data) {
      setData(res);

      const getData = createData(res?.data);

      if (getData?.status) {
        const exportData = [boilerPlateData1, boilerPlateData2, ...getData.data];
        setCsvData(exportData);
      } else {
        notification["error"]({
          message: "Gagal",
          description: `Data gagal diexport. ${getData?.message || ""}`,
        });
      }

      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    let params = {
      filters: {
        is_used: true,
      },
      populate: "*",
    };

    Object.keys(query).forEach((key) => {
      if (query[key] && key !== "tanggal_faktur") {
        params = {
          ...params,
          filters: {
            ...params.filters,
            [key]: {
              $containsi: query[key],
            },
          },
        };
      } else {
        if (query[key]) {
          if (query[key][0] === query[key][1]) {
            params = {
              ...params,
              filters: {
                ...params.filters,
                tanggal_faktur: query[key][0],
              },
            };
          } else {
            params = {
              ...params,
              filters: {
                ...params.filters,
                tanggal_faktur: {
                  $gte: moment(query[key][0]).format("YYYY-MM-DD"),
                  $lte: moment(query[key][1]).format("YYYY-MM-DD"),
                },
              },
            };
          }
        }
      }
    });

    const parseParams = QueryString.stringify(params, { encode: false });

    if (parseParams !== "") {
      fetchData(parseParams);
    } else {
      fetchData();
    }
  }, [query]);

  return (
    <>
      <Head>
        <title>Export Faktur</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Export Faktur"} />
          <LayoutContent>
            <div className="w-full flex justify-between items-center gap-8 mb-5">
              <div className="grid grid-cols-3 gap-3">
                <Input.Search
                  placeholder="Cari Nomor Faktur"
                  className="max-w-xs w-full"
                  onKeyUp={(e) => setQuery({ ...query, no_faktur: e.target.value !== "" ? e.target.value : null })}
                />
                <Input.Search
                  placeholder="Cari Nomor Referensi"
                  className="max-w-xs w-full"
                  onKeyUp={(e) => setQuery({ ...query, no_referensi: e.target.value !== "" ? e.target.value : null })}
                />
                <Select
                  className="max-w-xs w-full"
                  placeholder="Jenis"
                  onChange={(e) => setQuery({ ...query, jenis: e })}
                  allowClear
                  onClear={() => setQuery({ ...query, jenis: null })}
                >
                  <Select.Option value="Penjualan">Penjualan</Select.Option>
                  <Select.Option value="Retur Penjualan">Retur Penjualan</Select.Option>
                  <Select.Option value="Pembelian">Pembelian</Select.Option>
                  <Select.Option value="Retur Pembelian">Retur Pembelian</Select.Option>
                </Select>
                <Select
                  className="max-w-xs w-full"
                  placeholder="Status"
                  onChange={(e) => setQuery({ ...query, is_used: e === "true" ? true : false })}
                  allowClear
                  onClear={() => setQuery({ ...query, is_used: null })}
                >
                  <Select.Option value="true">Dipakai</Select.Option>
                  <Select.Option value="false">Belum Dipakai</Select.Option>
                </Select>

                <DatePicker.RangePicker
                  className="max-w-xs w-full"
                  placeholder={["Tanggal Awal", "Tanggal Akhir"]}
                  onChange={(e) => {
                    if (e[0] && e[1]) {
                      setQuery({
                        ...query,
                        tanggal_faktur: [moment(e[0]).format("YYYY-MM-DD"), moment(e[1]).format("YYYY-MM-DD")],
                      });
                    } else {
                      setQuery({
                        ...query,
                        tanggal_faktur: null,
                      });
                    }
                  }}
                />
              </div>

              <CSVLink
                ref={downloadCsv}
                enclosingCharacter=""
                filename={`Faktur Pajak JS_${moment().format("DD/MM/YYYY")}.csv`}
                data={csvData}
                onClick={() => {
                  setLoadingDownload(true);
                  setTimeout(() => {
                    setLoadingDownload(false);
                  }, 1500);
                }}
              >
                <Button
                  disabled={loadingDownload}
                  className="px-5 py-1 rounded-lg"
                  type="primary"
                  icon={<ArrowUpOutlined />}
                  loading={loadingDownload}
                >
                  Export
                </Button>
              </CSVLink>
            </div>

            <ExportFakturTable data={data} loading={loading} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}
