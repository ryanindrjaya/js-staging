import Head from "next/head";
import React, { useEffect, useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import PurchasesOrderTable from "../../../../components/ReactDataTable/Purchases/PurchasesOrderTable";
import { useRouter } from "next/router";
import { Button, Descriptions, Input, Modal, notification, Spin, Tag } from "antd";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import { PrinterOutlined } from "@ant-design/icons";
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
    context?.res?.end();

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
  const [isFetching, setIsFetching] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPO, setSelectedPO] = useState();
  const [purchase, setPurchase] = useState(data);
  const [isSearching, setIsSearching] = useState(false);
  const cookies = nookies.get(null, "token");

  const { Search } = Input;
  const router = useRouter();

  const handleAdd = () => {
    router.push("/dashboard/pembelian/order_pembelian/tambah");
  };

  const handleUpdate = (row) => {
    if (row?.attributes?.status !== "Diterima") {
      router.push("/dashboard/pembelian/order_pembelian/edit/" + row.id);
      // console.log("redirect om");
    } else {
      openNotificationWithIcon(
        "info",
        "Transaksi Selesai",
        "Transaksi yang sudah memiliki status 'Diterima' tidak dapat diedit kembali"
      );
    }
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

  const filterDuplicateData = (arr) => {
    const seen = new Set();

    const filteredArr = arr.filter((el) => {
      const duplicate = seen.has(el.id);
      seen.add(el.id);
      return !duplicate;
    });

    return filteredArr;
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
    handleChangeStatus(status, row.id);
  };

  const handleChangeStatus = async (status, id) => {
    const newValues = {
      data: {
        status,
      },
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

      openNotificationWithIcon(
        "success",
        "Status berhasil dirubah",
        "Status berhasil dirubah. Silahkan cek detail order pembelian"
      );
    } else {
      openNotificationWithIcon(
        "error",
        "Status gagal dirubah",
        "Tedapat kesalahan yang menyebabkan status tidak dapat dirubah"
      );
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

  // search query
  useEffect(() => {
    async function getPOById(id) {
      const endpoint = process.env.NEXT_PUBLIC_URL + `/purchases/${id}?populate=*`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      };
      const req = await fetch(endpoint, options);
      const res = await req.json();

      setSelectedPO(res?.data);
    }

    if (router?.query?.id) {
      const id = router.query.id;
      getPOById(id);
    }
  }, [router.query]);

  useEffect(() => {
    if (selectedPO) {
      setOpenModal(true);
    }
  }, [selectedPO]);

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const getTagColor = (type) => {
    switch (type) {
      case "Terkirim":
        return "green";
      case "Diterima":
        return "GREEN";
      case "Sebagian Diterima":
        return "orange";
      case "Diproses":
        return "default";
      default:
        return "default";
    }
  };

  const print = () => {
    router.replace(
      {
        pathname: "/dashboard/pembelian/order_pembelian",
      },
      undefined,
      { shallow: true }
    );
    router.push("order_pembelian/print/" + selectedPO.id);
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
            <Modal
              open={openModal}
              onClose={() => {
                router.replace(
                  {
                    pathname: "/dashboard/pembelian/order_pembelian",
                  },
                  undefined,
                  { shallow: true }
                );
                setOpenModal(false);
                setSelectedPO();
              }}
              onCancel={() => {
                router.replace(
                  {
                    pathname: "/dashboard/pembelian/order_pembelian",
                  },
                  undefined,
                  { shallow: true }
                );
                setOpenModal(false);
                setSelectedPO();
              }}
              width={1000}
              okButtonProps={{ style: { display: "none" } }}
              cancelText="Close"
            >
              {selectedPO && (
                <>
                  <Descriptions
                    extra={
                      <Button onClick={print} className="bg-cyan-700 hover:bg-cyan-800 mr-7 border-none" type="primary">
                        <PrinterOutlined className="mr-2 mt-0.5 float float-left" /> Cetak
                      </Button>
                    }
                    size="middle"
                    title="INFORMASI PO"
                    bordered
                  >
                    <Descriptions.Item label="Tanggal Pemesanan" span={2}>
                      {selectedPO?.attributes?.order_date}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tanggal Pengiriman" span={1}>
                      {selectedPO?.attributes?.delivery_date}
                    </Descriptions.Item>
                    <Descriptions.Item label="NO PO" span={2}>
                      {selectedPO?.attributes?.no_po}
                    </Descriptions.Item>
                    <Descriptions.Item label="Supplier">
                      {selectedPO?.attributes?.supplier?.data?.attributes?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status Pengiriman" span={2}>
                      <Tag color={getTagColor(selectedPO?.attributes?.delivery_status)}>
                        {selectedPO?.attributes?.delivery_status}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={2}>
                      <Tag color={getTagColor(selectedPO?.attributes?.status)}>{selectedPO?.attributes?.status}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Lokasi" span={2}>
                      {selectedPO?.attributes?.location?.data?.attributes?.name}
                    </Descriptions.Item>
                  </Descriptions>

                  <Descriptions className="my-3" size="middle" title="PEMBAYARAN" bordered>
                    <Descriptions.Item label="Termin Pembayaran" span={2}>
                      {selectedPO?.attributes?.tempo_days} {selectedPO?.attributes?.tempo_time}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total" className="font-bold">
                      {formatter.format(selectedPO?.attributes?.delivery_total)}
                    </Descriptions.Item>
                  </Descriptions>
                </>
              )}
            </Modal>

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
