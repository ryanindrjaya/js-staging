import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import nookies from "nookies";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import Manufacture from "../../../../components/ReactDataTable/ManufatureTable";
import { Input } from "antd";

const Pabrikasi = ({ props }) => {
  const data = props.data;
  const [manufature, setManufacture] = useState(data);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const { Search } = Input;

  const onSearch = async (e) => {
    if (e.target.value.length >= 2) {
      setIsSearching(true);

      const req = await searchQuery(e.target.value);
      const res = await req.json();

      setManufacture(res);
      setIsSearching(false);
    } else {
      setManufacture(data);
      setIsSearching(false);
    }
  };

  const searchQuery = async (keywords) => {
    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      "/manufactures?filters[$or][0][name][$containsi]=" +
      keywords +
      "&filters[$or][1][code][$containsi]=" +
      keywords +
      "&populate=*";

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

  const handleAddSubManufacture = () => {
    router.push("/dashboard/produk/pabrikasi/tambah");
  };

  const handleUpdateManufacture = (id) => {
    router.push("/dashboard/produk/pabrikasi/edit/" + id);
  };

  const handleDelete = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/manufactures/" + id;
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
      toast.success("Data berhasil dihapus");
      setManufacture(res);
    }
  };

  const handlePageChange = async (page) => {
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + "/manufactures?pagination[page]=" + page;

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
        setManufacture((prevData) => ({
          data: filterDuplicateData(prevData.data?.concat(res.data)),
          meta: prevData.meta,
        }));
        console.log("page change success");
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
        <title>Pabrikasi</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Pabrikasi"} />
          <LayoutContent>
            <div>
              <Search
                loading={isSearching}
                onChange={(e) => onSearch(e)}
                placeholder="Cari Pabrikasi"
                style={{
                  width: 200,
                }}
              />
              <button
                onClick={handleAddSubManufacture}
                type="button"
                className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
                </div>
              </button>
            </div>

            <Manufacture
              data={manufature}
              onDelete={handleDelete}
              onUpdate={handleUpdateManufacture}
              onPageChange={handlePageChange}
            />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
};

Pabrikasi.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  let data;

  const req = await fetchData(cookies);
  data = await req.json();

  return {
    props: {
      data,
    },
  };
};

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/manufactures?populate=*";
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

export default Pabrikasi;
