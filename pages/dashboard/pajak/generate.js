import React, { useEffect, useState } from "react";
import Head from "next/head";
import DashboardLayout from "../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "../../../components/TitlePage/TitlePage";
import LayoutContent from "@iso/components/utility/layoutContent";
import { Button, Card, Select, Statistic, message, notification } from "antd";
import { SnippetsOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { FaFileInvoiceDollar } from "react-icons/fa";
import nookies from "nookies";
import DataTable from "react-data-table-component";
import confirm from "antd/lib/modal/confirm";

const cookies = nookies.get(null);

export default function generate() {
  const [data, setData] = useState();
  const [tipe, setTipe] = useState("Penjualan");
  const [subTipe, setSubTipe] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);

  const fetchData = async (tipe, subTipe) => {
    setLoading(true);

    try {
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/no-faktur-list/get-document?tipe=${tipe}&sub_tipe=${subTipe}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      };

      const res = await fetch(endpoint, options);

      const data = await res.json();

      console.log("get data \n", data);

      if (res.status === 200) {
        setData(data);

        setLoading(false);
      } else {
        message.error(data?.error?.message || "Terjadi kesalahan saat mengambil data");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      message.error("Terjadi kesalahan saat mengambil data");
      setLoading(false);
    }
  };

  const getSubTipe = (tipe) => {
    switch (tipe) {
      case "Penjualan":
        return (
          <>
            <Select.Option value="store-sale">Toko</Select.Option>
            <Select.Option value="sales-sale">Sales</Select.Option>
            <Select.Option value="panel-sale">Panel</Select.Option>
            <Select.Option value="non-panel-sale">Non Panel</Select.Option>
            <Select.Option value="semua">Semua</Select.Option>
          </>
        );
      case "Retur Penjualan":
        return (
          <>
            <Select.Option value="retur-store-sale">Toko</Select.Option>
            <Select.Option value="retur-sales-sale">Sales</Select.Option>
            <Select.Option value="retur-panel-sale">Panel</Select.Option>
            <Select.Option value="retur-non-panel-sale">Non Panel</Select.Option>
            <Select.Option value="semua">Semua</Select.Option>
          </>
        );
      case "Pembelian":
        return (
          <>
            <Select.Option value="purchase">Order Pembelian</Select.Option>
            <Select.Option value="purchasing">LPB</Select.Option>
            <Select.Option value="semua">Semua</Select.Option>
          </>
        );
      case "Retur Pembelian":
        return (
          <>
            <Select.Option value="retur">Order Pembelian</Select.Option>
            <Select.Option value="retur-lpb">LPB</Select.Option>
            <Select.Option value="semua">Semua</Select.Option>
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (tipe && subTipe) {
      fetchData(tipe, subTipe);
    }
  }, [tipe, subTipe]);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const columns = [
    {
      name: "No Faktur",
      selector: (row) => row?.no_faktur ?? "",
    },
    {
      name: "No Referensi",
      selector: (row) => row[Object.keys(row)[0]],
    },
    {
      name: "Total Faktur",
      selector: (row) => formatter.format(row?.total || row?.delivery_total || row?.total_purchasing || 0),
    },
    {
      name: "PPN",
      selector: (row) => formatter.format(row?.ppn || row?.ppn_value || 0),
    },
  ];

  const customStyles = {
    headerStyle: { textAlign: "center" },
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const generateNoFaktur = async (accept = false) => {
    if (accept) {
      setLoadingGenerate(true);
      try {
        const endpoint = `${process.env.NEXT_PUBLIC_URL}/no-faktur-list/generate`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
          body: JSON.stringify({
            ...data,
            tipe: tipe,
            sub_tipe: subTipe,
          }),
        };

        const req = await fetch(endpoint, options);

        const res = await req.json();

        console.log("generate data \n", res);

        if (res?.success) {
          message.success("Generate no faktur berhasil");
          setData(res);
          setLoadingGenerate(false);
        } else {
          notification.error({
            message: "Generate no faktur gagal",
            description: res?.error?.message || "Terjadi kesalahan saat generate no faktur",
          });
          setLoadingGenerate(false);
        }
      } catch (error) {
        console.log(error);
        notification.error({
          message: "Generate no faktur gagal",
          description: error?.message || "Terjadi kesalahan saat generate no faktur",
        });
        setLoadingGenerate(false);
      }
    } else {
      confirm({
        title: "Apakah anda yakin akan generate no faktur?",
        icon: <ExclamationCircleOutlined />,
        content: "Harap periksa kembali data yang ingin di generate.",
        okText: "Ya",
        okType: "danger",
        cancelText: "Tidak",
        centered: true,
        onOk() {
          generateNoFaktur(true);
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
        <title>Generate Faktur</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Generate Faktur"} />
          <LayoutContent>
            <div className="flex gap-x-4 mb-4 w-full md:w-1/2 items-center">
              <Select
                value={tipe}
                className="w-full"
                placeholder="Pilih Tipe"
                onChange={(e) => {
                  setTipe(e);
                  setSubTipe();
                  setData();
                }}
              >
                <Select.Option value="Penjualan">Penjualan</Select.Option>
                {/* <Select.Option value="Retur Penjualan">Retur Penjualan</Select.Option>
                <Select.Option value="Pembelian">Pembelian</Select.Option>
                <Select.Option value="Retur Pembelian">Retur Pembelian</Select.Option> */}
              </Select>

              <Select
                value={subTipe}
                className="w-full"
                placeholder={!tipe ? "Harap pilih tipe" : "Pilih Subtipe"}
                disabled={!tipe}
                onChange={(e) => setSubTipe(e)}
              >
                {getSubTipe(tipe)}
              </Select>
            </div>

            <div className="mb-4 flex gap-x-4 w-full md:w-1/2">
              <Card className="rounded-lg w-full ">
                <Statistic
                  loading={loading}
                  title="Jumlah Dokumen"
                  value={data?.document_count || 0}
                  prefix={<SnippetsOutlined />}
                />
              </Card>
              <Card className="rounded-lg w-full ">
                <Statistic
                  loading={loading}
                  title="No Faktur Tersedia"
                  value={data?.available_no_faktur?.length || 0}
                  prefix={<FaFileInvoiceDollar />}
                />
              </Card>
            </div>

            <Button
              loading={loadingGenerate}
              type="default"
              className="mb-4"
              disabled={data?.data ? data?.data?.length === 0 : true}
              onClick={() => generateNoFaktur(false)}
            >
              Generate
            </Button>

            {data?.data ? (
              <>
                <p className="mb-1 text-gray-400 text-sm">
                  *Data yang tampil adalah data yang belum mempunyai nomor faktur dan sudah dibayar lunas.
                </p>
                <DataTable customStyles={customStyles} columns={columns} data={data?.data || []} pagination />
              </>
            ) : (
              ""
            )}
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}
