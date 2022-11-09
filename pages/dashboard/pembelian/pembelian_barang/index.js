import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useRouter } from "next/router";
import { Input, notification } from "antd";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import PurchasingTable from "../../../../components/ReactDataTable/Purchases/PurchasingTable";
import nookies from "nookies";

import createInventory from "../utility/createInventory";

Pembelian.getInitialProps = async (context) => {
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings?populate=deep";
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

function Pembelian({ props }) {
  const data = props.data;
  const [purchase, setPurchase] = useState(data);
  const [isSearching, setIsSearching] = useState(false);

  const { Search } = Input;
  const router = useRouter();

  const handleAdd = () => {
    router.push("/dashboard/pembelian/pembelian_barang/tambah");
  };

  const handleUpdate = (id) => {
    router.push("/dashboard/pembelian/pembelian_barang/edit/" + id);
    //openNotificationWithIcon(
    //  "info",
    //  "Work In Progress",
    //  "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    //);
  };

  const handlePageChange = async (page) => {
    const cookies = nookies.get(null, "token");
    const endpoint =
      process.env.NEXT_PUBLIC_URL + "/purchases?pagination[page]=" + page;

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
        setPurchase((prevData) => ({
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
    const dataStatus = row;

    if (status === "Selesai") {
      // invetory handle
      createInventory(row);
    }

    handleChangeStatus(dataStatus, dataStatus.id);
  };

  const handleChangeStatus = async (values, id) => {
    // // clean object
    delete values.attributes.purchase;
    for (var key in values.attributes) {
      if (
        values.attributes[key] === null ||
        values.attributes[key] === undefined
      ) {
        delete values.attributes[key];
      }
    }

    if (
      values.attributes?.document?.data === null ||
      values.attributes?.document?.data === undefined
    ) {
      delete values.attributes?.document;
    }

    var purchasing_details = [];
    var purchasing_payments = [];
    values.attributes.purchasing_details.data.forEach((element) => {
      purchasing_details.push({ id: element.id });
    });
    values.attributes.purchasing_payments.data.forEach((element) => {
      purchasing_payments.push({ id: element.id });
    });

    values.attributes.supplier = { id: values.attributes.supplier.data.id };
    values.attributes.location = { id: values.attributes.location.data.id };
    values.attributes.purchasing_details = purchasing_details;
    values.attributes.purchasing_payments = purchasing_payments;

    const newValues = {
      data: values.attributes,
    };

    const JSONdata = JSON.stringify(newValues);
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings/" + id;

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSONdata,
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (req.status === 200) {
      const response = await fetchData(cookies);

      if (res.data.attributes.status === "Dibatalkan") {
        router.reload();
      } else {
        setPurchase(response);
      }

      openNotificationWithIcon(
        "success",
        "Status berhasil dirubah",
        "Status berhasil dirubah. Silahkan cek detail LPB"
      );
    } else {
      openNotificationWithIcon(
        "error",
        "Status gagal dirubah",
        "Tedapat kesalahan yang menyebabkan status tidak dapat dirubah"
      );
    }
  };

  const fetchData = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings?populate=deep";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = req.json();

    return res;
  };

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  return (
    <>
      <Head>
        <title>Pembelian Barang</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Lembar Pembelian Barang"} />
          <LayoutContent>
            <div className="w-full flex justify-between">
              <Search
                className=""
                loading={isSearching}
                onChange={(e) => onSearch(e)}
                placeholder="Cari Pembelian"
                style={{
                  width: 200,
                }}
              />
              <button
                onClick={handleAdd}
                type="button"
                className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">
                    + Tambah
                  </a>
                </div>
              </button>
            </div>

            <PurchasingTable
              data={purchase}
              onUpdate={handleUpdate}
              onDelete={handleCancel}
              onPageChange={handlePageChange}
              onChangeStatus={onChangeStatus}
            />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Pembelian;
