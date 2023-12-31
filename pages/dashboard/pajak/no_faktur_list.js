import React, { useEffect, useState } from "react";
import Head from "next/head";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import LayoutContent from "@iso/components/utility/layoutContent";
import FakturTable from "@iso/components/ReactDataTable/Pajak/FakturTable";
import { Input, Modal, Select } from "antd";
import nookies from "nookies";
import FakturModal from "../../../components/Modal/FakturModal";
import QueryString from "qs";

const cookies = nookies.get(null);

export default function no_faktur_list() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState({
    no_faktur: null,
    jenis: null,
    is_used: null,
  });

  const fetchData = async (params) => {
    setLoading(true);

    const endpoint = `${process.env.NEXT_PUBLIC_URL}/no-faktur-lists${params ? `?${params}` : ""}`;
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
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refetch]);

  useEffect(() => {
    let params = {};

    Object.keys(query).forEach((key) => {
      if (!query[key]) return;

      if (key !== "is_used") {
        params = {
          filters: {
            ...params.filters,
            [key]: {
              $containsi: query[key],
            },
          },
        };
      } else {
        params = {
          filters: {
            ...params.filters,
            [key]: query[key],
          },
        };
      }
    });

    const parseParams = QueryString.stringify(params, { encode: false });

    if (parseParams !== "") {
      fetchData(parseParams);
    } else {
      fetchData();
    }
  }, [query]);

  const handleAdd = () => {
    setOpen(true);
  };

  return (
    <>
      <Head>
        <title>Daftar Nomor Faktur</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Daftar Nomor Faktur"} />
          <LayoutContent>
            <Modal
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={1000}
              style={{
                borderRadius: "25px",
                backgroundColor: "#036B82",
                margin: "20px",
              }}
              footer={null}
            >
              <FakturModal setOpen={setOpen} fetchData={fetchData} setData={setData} />
            </Modal>

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
                  onChange={(e) => setQuery({ ...query, is_used: e })}
                  allowClear
                  onClear={() => setQuery({ ...query, is_used: null })}
                >
                  <Select.Option value="true">Dipakai</Select.Option>
                  <Select.Option value="false">Belum Dipakai</Select.Option>
                </Select>
              </div>

              <button
                onClick={handleAdd}
                type="button"
                className="bg-cyan-700 mx-2 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
                </div>
              </button>
            </div>

            <FakturTable data={data} loading={loading} refetch={setRefetch} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}
