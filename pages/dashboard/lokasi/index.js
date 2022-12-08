import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import LocationTable from "../../../components/ReactDataTable/LocationTable";
import { useRouter } from "next/router";
import TitlePage from "../../../components/TitlePage/TitlePage";
import { toast } from "react-toastify";
import nookies from "nookies";

const Lokasi = ({ props }) => {
  const data = props.data.data;
  const [location, setLocation] = useState(data);
  const router = useRouter();

  const handleAddUser = () => {
    router.push("/dashboard/lokasi/tambah");
  };

  const handleDelete = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/locations/" + id;
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
      await fetchData(cookies);
      toast.success("Data Lokasi berhasil dihapus");
      router.reload("/dashboard/lokasi");
    }
  };

  return (
    <>
      <Head>
        <title>Lokasi Bisnis</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Lokasi Bisnis"} />
          <LayoutContent>
            <button
              onClick={handleAddUser}
              type="button"
              className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right mb-5"
            >
              <div className="text-white text-center text-sm font-bold">
                <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
              </div>
            </button>

            <LocationTable locationData={location} onDelete={handleDelete} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
};

Lokasi.getInitialProps = async (context) => {
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/locations";
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

export default Lokasi;
