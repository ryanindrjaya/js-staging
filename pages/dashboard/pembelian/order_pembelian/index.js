import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import PurchasesOrderTable from "../../../../components/ReactDataTable/Purchases/PurchasesOrderTable";
import { useRouter } from "next/router";
import { Input, notification } from "antd";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import nookies from "nookies";

Pembelian.getInitialProps = async (context) => {
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases?populate=deep";
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
    router.push("/dashboard/pembelian/order_pembelian/tambah");
  };

  const handleUpdate = (id) => {
    // router.push("/dashboard/pembelian/order_pembelian/edit/" + id);
    openNotificationWithIcon("info", "Work In Progress", "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya");
  };

  const handleDelete = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases/" + id;
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
      setPurchase(res);
    }
  };

  const handlePageChange = async (page) => {
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases?pagination[page]=" + page;

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
    if (e.target.value.length >= 2) {
      setIsSearching(true);

      const req = await searchQuery(e.target.value);
      const res = await req.json();

      setPurchase(res);
      setIsSearching(false);
    } else {
      setPurchase(data);
      setIsSearching(false);
    }
  };

  const searchQuery = async (keywords) => {
    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      "/purchases?filters[$or][0][added_by][$contains]=" +
      keywords +
      "&filters[$or][1][no_po][$contains]=" +
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

  const onChangeStatus = (status, row) => {
    row.attributes.status = status;
    handleChangeStatus(row, row.id);
  };

  const onChangeStatusPengiriman = (status, row) => {
    row.attributes.delivery_status = status;
    handleChangeStatus(row, row.id);
  };

  const handleChangeStatus = async (values, id) => {
    // clean object
    for (var key in values.attributes) {
      if (values.attributes[key] === null || values.attributes[key] === undefined) {
        delete values.attributes[key];
      }
    }

    if (values.attributes?.document?.data === null || values.attributes?.document?.data === undefined) {
      delete values.attributes?.document;
    }

    var purchase_details = [];
    values.attributes.purchase_details.data.forEach((element) => {
      purchase_details.push({ id: element.id });
    });
    values.attributes.supplier = { id: values.attributes.supplier.data.id };
    values.attributes.location = { id: values.attributes.location.data.id };
    values.attributes.purchase_details = purchase_details;

    const newValues = {
      data: values.attributes,
    };

    const JSONdata = JSON.stringify(newValues);
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases/" + id;

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
      setPurchase(response);

      openNotificationWithIcon("success", "Status berhasil dirubah", "Status berhasil dirubah. Silahkan cek detail order pembelian");
    } else {
      openNotificationWithIcon("error", "Status gagal dirubah", "Tedapat kesalahan yang menyebabkan status tidak dapat dirubah");
    }
  };

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  const fetchData = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases?populate=deep";
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

  return (
    <>
      <Head>
        <title>Order Pembelian</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Order Pembelian"} />
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
              <button onClick={handleAdd} type="button" className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right mb-5">
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
                </div>
              </button>
            </div>

            <PurchasesOrderTable
              data={purchase}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onPageChange={handlePageChange}
              onChangeStatus={onChangeStatus}
              onChangeStatusPengiriman={onChangeStatusPengiriman}
            />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Pembelian;
