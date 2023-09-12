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
import { Button, Tag } from "antd";
import moment from "moment";
import useDebounce from "../../../../hooks/useDebounce";

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
        <Tag color={attributes?.status === "Dibayar" ? "green" : "orange"}>{attributes?.status}</Tag>
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
  }, [debouncedSearchTerm, router.pathname]);

  return (
    <>
      <Head>
        <title>{parseTitle(api)}</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={`Daftar ${parseTitle(api)}`} />
          <LayoutContent>
            <div className="w-full flex justify-between mb-4">
              <Search
                className=""
                loading={isSearching}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari No Retur"
                style={{
                  width: 200,
                }}
              />
            </div>

            <DataTable columns={columns} data={retur} customStyles={customStyles} pagination paginationPerPage={10} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Retur;
