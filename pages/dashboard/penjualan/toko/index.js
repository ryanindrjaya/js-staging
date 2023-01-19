import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { Input, notification, Select, DatePicker, Modal } from "antd";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import SellingTable from "../../../../components/ReactDataTable/Selling/SellingTable";
import nookies from "nookies";
import PembayaranRetur from "../../../../components/Modal/PembayaranRetur";

Toko.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  const reqStore = await fetchStore(cookies);
  const store = await reqStore.json();

  return {
    props: {
      user,
      locations,
      store,
    },
  };
};

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users";
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

const fetchLocation = async (cookies) => {
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

const fetchStore = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/store-sales?populate=deep";
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

function Toko({ props }) {
  const user = props.user;
  const locations = props.locations.data;
  const data = props.store;
  const router = useRouter();
  const [sell, setSell] = useState(data);
  const [returPage, setReturPage] = useState("toko");
  const [dataRetur, setDataRetur] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleAdd = () => {
    router.push("/dashboard/penjualan/toko/tambah");
  };

  const refetchData = async () => {
    const cookies = nookies.get(null);
    const req = await fetchStore(cookies);
    const res = await req.json();

    if (req.status === 200) {
      setSell(res);
      return true;
    } else {
      return false;
    }
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
    const endpoint = process.env.NEXT_PUBLIC_URL + "/store-sales/" + id;
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
      const res = refetchData();
      if (res) {
        openNotificationWithIcon(
          "success",
          "Berhasil menghapus data",
          "Penjualan Toko dan Resep yang dipilih telah berhasil dihapus. Silahkan cek kembali Penjualan Toko dan Resep"
        );
      } else {
        openNotificationWithIcon(
          "error",
          "Gagal menghapus data",
          "Penjualan Toko dan Resep yang dipilih gagal dihapus. Silahkan coba lagi"
        );
      }
    }
  };

  const handlePageChange = async (page) => {
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + "/store-sales?pagination[page]=" + page;

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
      }
    } catch (error) {}
  };

  const onChangeStatus = (status, row) => {
    row.attributes.status = status;
    handleChangeStatus(row, row.id);
  };

  const handleChangeStatus = async (values, id) => {
    // clean object
    for (var key in values.attributes) {
      if (values.attributes[key] === null || values.attributes[key] === undefined) {
        delete values.attributes[key];
      }
    }

    if (
      values.attributes?.document?.data === null ||
      values.attributes?.document?.data === undefined
    ) {
      delete values.attributes?.document;
    }

    var store_sale_details = [];
    values.attributes.store_sale_details.data.forEach((element) => {
      store_sale_details.push({ id: element.id });
    });

    var purchasing_payments = [];
    values.attributes.purchasing_payments.data.forEach((element) => {
      purchasing_payments.push({ id: element.id });
    });

    values.attributes.location = { id: values.attributes.location.data.id };
    values.attributes.store_sale_details = store_sale_details;
    values.attributes.purchasing_payments = purchasing_payments;

    const newValues = {
      data: values.attributes,
    };

    const JSONdata = JSON.stringify(newValues);
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + "/store-sales/" + id;

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
      const response = await fetchStore(cookies);
      setSell(response);
      openNotificationWithIcon(
        "success",
        "Status berhasil dirubah",
        "Status berhasil dirubah. Silahkan cek penjualan toko"
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

  return (
    <>
      <Head>
        <title>Penjualan Toko</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Daftar Penjualan Toko"} />
          <LayoutContent>
            <div className="w-full flex justify-start">
              <div className="w-full md:w-1/5 px-3">
                <Select
                  placeholder="Lokasi Gudang"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                  {locations.map((element) => {
                    return (
                      <Select.Option value={element.id}>{element.attributes.name}</Select.Option>
                    );
                  })}
                </Select>
              </div>
              <div className="w-full md:w-1/5 px-3">
                <Select
                  placeholder="Lokasi Penjualan"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                  {locations.map((element) => {
                    return (
                      <Select.Option value={element.id}>{element.attributes.name}</Select.Option>
                    );
                  })}
                </Select>
              </div>
              <div className="w-full md:w-1/5 px-3">
                <Select
                  placeholder="Status Pembayaran"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                  {/*{locations.map((element) => {*/}
                  {/*  return (*/}
                  <Select.Option>Belum Dibayar</Select.Option>
                  <Select.Option>Dibayar Sebagian</Select.Option>
                  <Select.Option>Selesai</Select.Option>
                  {/*  );*/}
                  {/*})}*/}
                </Select>
              </div>
              <div className="w-full md:w-1/5 px-3">
                <DatePicker placeholder="Rentang Tanggal" size="large" style={{ width: "100%" }} />
              </div>
              <div className="w-full md:w-1/5 px-3">
                <Select
                  placeholder="Admin Penjualan"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                  {user.map((element) => {
                    return <Select.Option value={element.id}>{element.name}</Select.Option>;
                  })}
                </Select>
              </div>
            </div>

            <div className="w-full flex justify-start mt-3">
              <div className="w-full md:w-1/5 px-3">
                <Select
                  placeholder="Pelanggan"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                  {/*{locations.map((element) => {*/}
                  {/*  return (*/}
                  <Select.Option>data</Select.Option>
                  {/*  );*/}
                  {/*})}*/}
                </Select>
              </div>
              <div className="w-full md:w-1/5 px-3">
                <Select
                  placeholder="Sales"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                  {/*{locations.map((element) => {*/}
                  {/*  return (*/}
                  <Select.Option>data</Select.Option>
                  {/*  );*/}
                  {/*})}*/}
                </Select>
              </div>
              <div className="w-full md:w-1/5 px-3">
                <Select
                  placeholder="Status Penyerahan"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                  {/*{locations.map((element) => {*/}
                  {/*  return (*/}
                  <Select.Option>Dipesan</Select.Option>
                  <Select.Option>Diterima</Select.Option>
                  {/*  );*/}
                  {/*})}*/}
                </Select>
              </div>
              <div className="w-full md:w-1/5 px-3">
                <Select
                  placeholder="Jatuh Tempo"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                  {/*{locations.map((element) => {*/}
                  {/*  return (*/}
                  <Select.Option>data</Select.Option>
                  {/*  );*/}
                  {/*})}*/}
                </Select>
              </div>
            </div>

            <div className="w-full flex justify-between mt-0 mb-2">
              <span className="text-black text-md font-bold ml-1 mt-5">Semua Penjualan</span>
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

            <div className="w-full flex justify-between">
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print PDF</a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print CSV</a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print XLS</a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Kolom Tampak</a>
                </div>
              </button>
            </div>

            <Modal
              className="rounded-lg m-5"
              head
              width={"90%"}
              centered
              open={dataRetur ? true : false}
              onOk={() => setDataRetur(null)}
              onCancel={() => {
                setDataRetur(null);
                setShowPreview(false);
              }}
              afterClose={() => {
                setDataRetur(null);
                setShowPreview(false);
              }}
              bodyStyle={{
                borderRadius: "20px",
                backgroundColor: "#E8F2F2",
              }}
              style={{
                backgroundColor: "#E8F2F2",
                border: "2px solid #000",
              }}
              footer={null}
              // zIndex={999999}
            >
              {dataRetur && !showPreview ? (
                <PembayaranRetur
                  data={dataRetur?.attributes}
                  retur={dataRetur}
                  id={dataRetur?.id}
                  lokasiPenjualan="PENJUALAN TOKO"
                  onCancel={() => setDataRetur(null)}
                  refetch={refetchData}
                />
              ) : dataRetur && showPreview ? (
                <PembayaranRetur
                  data={dataRetur?.attributes}
                  id={dataRetur?.id}
                  retur={dataRetur}
                  lokasiPenjualan="PENJUALAN TOKO"
                  onCancel={() => setDataRetur(null)}
                  refetch={refetchData}
                  preview // preview data
                />
              ) : (
                ""
              )}
            </Modal>

            <SellingTable
              data={sell}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onPageChange={handlePageChange}
              onChangeStatus={onChangeStatus}
              returPage={returPage}
              bayarRetur={setDataRetur}
              retur={dataRetur}
              view={setShowPreview}
            />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Toko;
