import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import nookies from "nookies";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import UnitTable from "../../../../components/ReactDataTable/UnitTable";

const Satuan = ({ props }) => {
  console.log(props);
  const data = props.data.data;
  const [unit, setUnit] = useState(data);
  const router = useRouter();

  const handleAddUnit = () => {
    router.push("/dashboard/produk/satuan/tambah");
  };

  const handleDelete = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/units/" + id;
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
      toast.success("Satuan berhasil dihapus");
      router.reload("/dashboard/produk/satuan");
    }
  };

  return (
    <>
      <Head>
        <title>Satuan Produk</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Satuan"} />
          <LayoutContent>
            <button
              onClick={handleAddUnit}
              type="button"
             className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right mb-5"
            >
              <div className="text-white text-center text-sm font-bold">
                <a className="text-white no-underline text-xs sm:text-xs">
                  + Tambah
                </a>
              </div>
            </button>

            <UnitTable unitData={unit} onDelete={handleDelete} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
};

Satuan.getInitialProps = async (context) => {
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/units";
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

export default Satuan;
