import React, { useEffect, useState } from "react";
import nookies from "nookies";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useRouter } from "next/router";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import Search from "antd/lib/input/Search";
import DataTable from "react-data-table-component";
import { Button, Spin, Tag, message } from "antd";
import moment from "moment";
import useDebounce from "../../../../hooks/useDebounce";
import { writeExcel } from "../../../../library/functions/writeExcel";

Retur.getInitialProps = async (ctx) => {
  const api = ctx.query.api;

  const endpoint = `${process.env.NEXT_PUBLIC_URL}/retur-${api}s`;

  return {
    data: [],
    pointer: `no_retur_${api.split("-").join("_")}`,
    api_endpoint: endpoint,
  };
};

function Retur({ data = [], pointer = "", api_endpoint = "" }) {
  const cookies = nookies.get();
  const router = useRouter();
  const paths = router.asPath.split("/");
  const api = paths[paths.length - 1];
  const [retur, setRetur] = useState(data);
  const [search, setSearch] = useState(""); // search query
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(search, 500);

  const parseTitle = (title) => {
    const arr = title.split("-");
    const modul = arr[0];

    let str = "";

    switch (modul) {
      case "store":
        str = "Toko";
        break;
      case "panel":
        str = "Panel";
        break;
      case "non":
        str = "Non Panel";
        break;
      case "sales":
        str = "Sales";
        break;
      default:
        break;
    }

    return `Retur Penjualan ${str}`;
  };

  const redirectDetail = (id) => {
    const parsedApi = api
      .split("-")
      .filter((item) => item !== "sale")
      .join("_");
    let url = "";

    switch (parsedApi) {
      case "store":
        url = `/dashboard/penjualan/toko/retur/print/${id}`;
        break;
      case "panel":
        url = `/dashboard/penjualan/panel/retur/print/${id}`;
        break;
      case "non_panel":
        url = `/dashboard/penjualan/non_panel/retur/print/${id}`;
        break;
      case "sales":
        url = `/dashboard/penjualan/sales/retur/print/${id}`;
        break;
      default:
        break;
    }

    router.push(url);
  };

  const customStyles = {
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const columns = [
    {
      name: "No Retur",
      selector: ({ attributes }) => attributes?.[pointer],
    },
    {
      name: "Tanggal",
      selector: ({ attributes }) => moment(attributes?.createdAt).format("DD/MM/YYYY"),
    },
    {
      name: "Ditambahkan Oleh",
      selector: ({ attributes }) => attributes?.added_by,
    },
    {
      name: "Total Retur",
      selector: ({ attributes }) => formatter.format(attributes?.total),
    },
    {
      name: "Status",
      selector: ({ attributes }) => (
        <Tag color={attributes?.status === "Dibayar" ? "green" : "orange"}>{attributes?.status || "Diretur"}</Tag>
      ),
    },
    {
      name: "Aksi",
      selector: ({ id }) => (
        <Button type="primary" onClick={() => redirectDetail(id)}>
          Detail
        </Button>
      ),
    },
  ];

  useEffect(() => {
    async function getData(query) {
      const queryParams = query ? `?filters[${pointer}][$containsi]=${query}` : "";
      const endpoint = `${api_endpoint}${queryParams}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      return data?.data || [];
    }

    setIsSearching(true);
    getData(debouncedSearchTerm)
      .then((res) => {
        setIsSearching(false);
        setRetur(res);
      })
      .catch((err) => {
        setRetur([]);
        setIsSearching(false);
        console.log(err);
      });
  }, [debouncedSearchTerm, router.asPath]);

  const handleDownloadExcel = async () => {
    message.loading({ content: "Mengunduh data...", duration: 8000, key: "fetch" });
    await writeExcel({
      api: `retur-${api}`,
      schema: {
        "No. Retur Penjualan": `no_retur_${api?.split("-").join("_")}`,
        "Tanggal Retur": "retur_date",
        "Nama Pelanggan": api === "store-sale" ? "customer_name" : "customer.name",
        ...(api !== "store-sale" && { "Alamat Pelanggan": "customer.address", "No. Telepon": "customer.phone" }),
        "Total Penjualan": "total",
        DPP: "dpp",
        PPN: "ppn",
        "Status Pembayaran": "status_pembayaran",
        "Ditambahkan Oleh": "added_by",
      },
      outputPath: `Export Retur ${parseTitle(api)}.xlsx`,
      retur: api === "store-sale" ? false : true,
    });

    message.destroy("fetch");
  };

  return (
    <>
      <Head>
        <title>{parseTitle(api)}</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={`Daftar ${parseTitle(api)}`} />
          <LayoutContent>
            {isSearching ? (
              <div className="w-full flex justify-center items-center">
                <Spin size="large" />
              </div>
            ) : (
              <>
                <div className="w-full flex justify-between items-center mb-4">
                  <Search
                    className=""
                    loading={isSearching}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari No Retur"
                    style={{
                      width: 200,
                    }}
                  />

                  <button
                    onClick={handleDownloadExcel}
                    type="button"
                    className="w-full md:w-1/4 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right"
                  >
                    <div className="text-white text-center text-sm font-bold">
                      <a className="text-white no-underline text-xs sm:text-xs">Print XLS</a>
                    </div>
                  </button>
                </div>

                <DataTable
                  columns={columns}
                  data={retur}
                  customStyles={customStyles}
                  pagination
                  paginationPerPage={10}
                />
              </>
            )}
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Retur;
