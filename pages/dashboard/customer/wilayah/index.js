import Head from "next/head";
import React, { useEffect, useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useRouter } from "next/router";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import { toast } from "react-toastify";
import nookies from "nookies";
import { Input, Select } from "antd";
import WilayahTable from "@iso/components/ReactDataTable/WilayahTable";

Customer.getInitialProps = async (context) => {
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/wilayahs?populate=*";
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

function Customer({ props }) {
  const data = props.data;
  const [user, setUser] = useState(data);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParameters, setSearchParameters] = useState({});
  const router = useRouter();

  console.log("user", user);

  const handleAdd = (e) => {
    router.push("/dashboard/customer/wilayah/tambah");
  };

  const handleUpdate = async (id) => {
    router.push("/dashboard/customer/wilayah/edit/" + id);
  };

  const handleDelete = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/wilayahs/" + id;
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
      const data = await req.json();
      toast.success("Data Wilayah berhasil dihapus");
      setUser(data);
    }
  };

  const searchQuery = async (e) => {
    setIsSearching(true);
    const value = e.target.value;

    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      "/wilayahs?populate=*&" +
      `filters[$or][0][name][$containsi]=${value}&filters[$or][1][code][$containsi]=${value}`;

    console.log("endpoint", endpoint);

    const cookies = nookies.get(null, "token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    setUser(res);
    setIsSearching(false);
  };

  return (
    <>
      <Head>
        <title>Wilayah</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Wilayah"} />
          <LayoutContent>
            <div className="w-full flex justify-between gap-x-32 mb-3">
              <div className="w-full md:w-1/2 grid grid-cols-2 gap-x-4 gap-y-3">
                <Input.Search
                  className=""
                  loading={isSearching}
                  onChange={searchQuery}
                  placeholder="Nama Wilayah"
                  size="middle"
                />
              </div>
              <button
                onClick={handleAdd}
                type="button"
                className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
                </div>
              </button>
            </div>

            <WilayahTable data={user || []} onDelete={handleDelete} onUpdate={handleUpdate} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Customer;
