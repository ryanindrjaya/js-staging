import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useRouter } from "next/router";
import { Input, notification } from "antd";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import PurchasesReturTable from "../../../../components/ReactDataTable/Purchases/PurchasesReturTable";
import nookies from "nookies";

Retur.getInitialProps = async (context) => {
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/returs?populate=deep";
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

function Retur({ props }) {
  const data = props.data;
  const [retur, setRetur] = useState(data);
  const [isSearching, setIsSearching] = useState(false);
    //console.log("retur"); console.log(data);
  const { Search } = Input;
  const router = useRouter();

  const handleAdd = () => {
    router.push("/dashboard/pembelian/retur/tambah");
  };

  const handleUpdate = (id) => {
    // router.push("/dashboard/pembelian/order_pembelian/edit/" + id);
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
  };

  const handleDelete = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/returs/" + id;
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
      const res = await fetchData(cookies);
      openNotificationWithIcon(
        "success",
        "Berhasil menghapus data",
        "Order Pembelian yang dipilih telah berhasil dihapus. Silahkan cek kembali Order Pembelian"
      );
      setRetur(res);
    }
  };

  const handlePageChange = async (page) => {
    const cookies = nookies.get(null, "token");
    const endpoint =
      process.env.NEXT_PUBLIC_URL + "/returs?pagination[page]=" + page;

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
        setRetur((prevData) => ({
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

  const onSearch = async (e) => {
    // if (e.target.value.length >= 2) {
    //   setIsSearching(true);
    //   const req = await searchQuery(e.target.value);
    //   const res = await req.json();
    //   setPurchase(res);
    //   setIsSearching(false);
    // } else {
    //   setPurchase(data);
    //   setIsSearching(false);
    // }
  };

  const searchQuery = async (keywords) => {
    // const endpoint =
    //   process.env.NEXT_PUBLIC_URL +
    //   "/purchases?filters[$or][0][added_by][$contains]=" +
    //   keywords +
    //   "&filters[$or][1][no_po][$contains]=" +
    //   keywords +
    //   "&populate=*";
    // const cookies = nookies.get(null, "token");
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + cookies.token,
    //   },
    // };
    // const req = await fetch(endpoint, options);
    // return req;
  };

  const handleCancel = async (id, row) => {
    onChangeStatus("Dibatalkan", row);
  };

  const onChangeStatus = (status, row) => {
    row.attributes.status = status;
    handleChangeStatus(row, row.id);
  };

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };
    //console.log("atas"); console.log(props); console.log(data);
  return (
    <>
      <Head>
        <title>Retur Pembelian</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Daftar Retur Pembelian"} />
          <LayoutContent>
            <div>
              <button
                onClick={handleAdd}
                type="button"
                className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">
                    + Tambah Retur
                  </a>
                </div>
              </button>
            </div>

            <PurchasesReturTable
              data={retur}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onPageChange={handlePageChange}
              onChangeStatus={onChangeStatus}
            />

          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Retur;
