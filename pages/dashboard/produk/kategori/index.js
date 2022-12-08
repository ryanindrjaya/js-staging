import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import nookies from "nookies";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import CategoryTable from "../../../../components/ReactDataTable/CategoryTable";
import { Input } from "antd";

const Kategori = ({ props }) => {
  const data = props.data;
  const [isSearching, setIsSearching] = useState(false);
  const [category, setCategory] = useState(data);
  const router = useRouter();
  const { Search } = Input;

  const onSearch = async (e) => {
    if (e.target.value.length >= 2) {
      setIsSearching(true);

      const req = await searchQuery(e.target.value);
      const res = await req.json();

      setCategory(res);
      setIsSearching(false);
    } else {
      console.log("clear");

      setCategory(data);
      setIsSearching(false);
    }
  };

  const searchQuery = async (keywords) => {
    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      "/categories?filters[$or][0][name][$contains]=" +
      keywords +
      "&filters[$or][1][category_id][$contains]=" +
      keywords;

    const cookies = nookies.get(null, "token");
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

  const handleAddCategory = () => {
    router.push("/dashboard/produk/kategori/tambah");
  };

  const handleUpdateCategory = (id) => {
    router.push("/dashboard/produk/kategori/edit/" + id);
  };

  const handleDelete = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/categories/" + id;
    const cookies = nookies.get(null, "token");

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();
    if (res) {
      const req = await fetchData(cookies);
      const res = await req.json();
      toast.success("Satuan berhasil dihapus");
      setCategory(res);
    }
  };

  const handlePageChange = async (page) => {
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + "/categories?pagination[page]=" + page;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    try {
      const req = await fetch(endpoint, options);
      const res = await req.json();
      if (res) {
        setCategory((prevData) => ({
          data: filterDuplicateData(prevData.data.concat(res.data)),
          meta: prevData.meta,
        }));
      } else {
        console.log("something is wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterDuplicateData = (arr) => {
    const seen = new Set();

    const filteredArr = arr.filter((el) => {
      const duplicate = seen.has(el.id);
      seen.add(el.id);
      return !duplicate;
    });

    return filteredArr;
  };

  return (
    <>
      <Head>
        <title>Kategori Produk</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Kategori"} />
          <LayoutContent>
            <div>
              <Search
                loading={isSearching}
                onChange={(e) => onSearch(e)}
                placeholder="Cari Kategori"
                style={{
                  width: 200,
                }}
              />
              <button
                onClick={handleAddCategory}
                type="button"
                className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
                </div>
              </button>
            </div>

            <CategoryTable categoryData={category} onDelete={handleDelete} onUpdate={handleUpdateCategory} onPageChange={handlePageChange} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
};

Kategori.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  let data;

  const req = await fetchData(cookies);
  data = await req.json();

  if (req.status !== 200) {
    context.res.writeHead(302, {
      Location: "/signin?session=false",
      "Content-Type": "text/html; charset=utf-8",
    });
    context.res.end();

    return {};
  }

  return {
    props: {
      data,
    },
  };
};

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/categories";
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

export default Kategori;
