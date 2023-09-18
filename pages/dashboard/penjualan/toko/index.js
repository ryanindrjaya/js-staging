import Head from "next/head";
import React, { useEffect, useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { Input, notification, Select, DatePicker, Modal, Descriptions, message, Button, Tag } from "antd";
import { BarcodeOutlined, PrinterOutlined } from "@ant-design/icons";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import SellingTable from "../../../../components/ReactDataTable/Selling/SellingTable";
import nookies from "nookies";
import DataTable from "react-data-table-component";
import moment from "moment";
import Link from "next/link";
import SellingTokoTable from "../../../../components/ReactDataTable/Selling/SellingTokoTable";

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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/locations?pagination[limit]=1000";
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/store-sales?sort[0]=id:desc&populate=*";
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
  const role = nookies.get(null)?.role || false;
  const locations = props.locations.data;
  const data = props.store;
  const router = useRouter();
  const [sell, setSell] = useState(data);
  const [returPage, setReturPage] = useState("toko");

  const [selectedData, setSelectedData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const handleAdd = () => {
    router.push("/dashboard/penjualan/toko/tambah");
  };

  const handleSetting = () => {
    router.push("/dashboard/penjualan/toko/setting");
  };

  const handleNavigateToPembayaran = () => {
    router.push("/dashboard/penjualan/toko/pembayaran");
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
      const res = await fetchStore(cookies);
      const newData = await res.json();
      openNotificationWithIcon(
        "success",
        "Berhasil menghapus data",
        "Penjualan Toko dan Resep yang dipilih telah berhasil dihapus. Silahkan cek kembali Penjualan Toko dan Resep"
      );
      setSell(newData);
    }
  };

  const handlePageChange = async (page) => {
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + "/store-sales?sort[0]=id:desc&pagination[page]=" + page;

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

    if (values.attributes?.document?.data === null || values.attributes?.document?.data === undefined) {
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

  useEffect(() => {
    async function fetchOne(id) {
      message.loading({ content: "Mengambil data", duration: 8000, key: "fetch" });
      const cookies = nookies.get();
      const endpoint =
        process.env.NEXT_PUBLIC_URL + `/store-sales/${id}?populate[store_sale_details][populate][0]=product`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      };

      const res = await fetch(endpoint, options)
        .then((r) => r.json())
        .catch((e) => console.log(e));

      if (res.data) {
        message.destroy("fetch");

        console.log("detail penjualan", res.data);

        setSelectedData(res.data);
        setOpenModal(true);
      } else {
        message.error({ content: "Gagal mengambil data", key: "fetch" });
      }
    }
    if (router.query.id) {
      fetchOne(router.query.id);
    }
  }, [router.query]);

  const detailColumns = [
    {
      name: "Nama Produk",
      wrap: true,
      width: "120px",
      selector: ({ attributes }) => (
        <a target="_blank" href={`/dashboard/produk?id=${attributes?.product?.data?.id}`}>
          <span className="text-blue-500 cursor-pointer hover:text-blue-700">
            {attributes?.product?.data?.attributes?.name || ""}
          </span>
        </a>
      ),
    },
    {
      name: "EXP Date",
      width: "120px",
      selector: ({ attributes }) => moment(attributes?.expired_date).format("DD/MM/YYYY"),
    },
    {
      name: "Jumlah",
      selector: ({ attributes }) => attributes?.qty || "",
    },
    {
      name: "Unit",
      selector: ({ attributes }) => attributes?.unit || "",
    },
    {
      name: "Harga Jual",
      width: "150px",
      selector: ({ attributes }) => formatter.format(attributes?.unit_price || 0) || "-",
    },
    {
      name: "Diskon",
      selector: ({ attributes }) => formatter.format(attributes?.disc || 0) || "-",
    },
    {
      name: "D1",
      selector: ({ attributes }) => (attributes?.disc1 ? `${attributes?.disc1}%` : "0%"),
    },
    {
      name: "D2",
      selector: ({ attributes }) => (attributes?.disc2 ? `${attributes?.disc2}%` : "0%"),
    },
    {
      name: "Margin",
      selector: ({ attributes }) => (attributes?.margin ? `${attributes?.margin}%` : "0%"),
    },
    {
      name: "Sub Total",
      width: "150px",
      selector: ({ attributes }) => formatter.format(attributes?.sub_total || 0) || "-",
    },
  ];

  const mutasiStokColumns = [
    {
      name: "Produk",
      wrap: true,
      selector: ({ product_name = "Nama Produk" }) => {
        return product_name.toUpperCase();
      },
    },
    {
      name: "Stok Keluar",
      center: true,
      selector: ({ stok_keluar = [] }) =>
        stok_keluar?.length > 0 ? stok_keluar?.map(({ qty, unit }) => `${qty} ${unit}`)?.join(", ") : "",
    },
    {
      name: "Retur",
      center: true,
      selector: ({ stok_masuk = [] }) =>
        stok_masuk?.length > 0 ? stok_masuk?.map(({ qty, unit }) => `${qty} ${unit}`)?.join(", ") : "",
    },
    {
      name: "Lokasi",
      wrap: true,
      selector: ({ location }) => {
        const selectedLocation = locations.find((item) => item.id === location);
        return selectedLocation?.attributes?.name || "-";
      },
    },
    {
      name: "Detail",
      center: true,
      selector: ({ product, location }) => (
        <Link href={`/dashboard/stok?product=${product}&location=${location}`}>Lihat Kartu Stok</Link>
      ),
    },
  ];

  const customStyles = {
    headerStyle: { textAlign: "center" },
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const handlePrint = () => {
    router.replace(
      {
        pathname: "/dashboard/penjualan/toko/print/" + selectedData.id,
      },
      undefined,
      { shallow: true }
    );
  };

  const getTagColor = (type) => {
    switch (type) {
      case "Dibayar":
        return "green";
      case "Diterima":
        return "green";
      case "Diterima":
        return "GREEN";
      case "Belum Dibayar":
        return "red";
      case "Diretur":
        return "orange";
      case "Diproses":
        return "default";
      default:
        return "default";
    }
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
            <Modal
              open={openModal}
              onClose={() => {
                router.replace(
                  {
                    pathname: router.pathname,
                  },
                  undefined,
                  { shallow: true }
                );
                setOpenModal(false);
                setSelectedData();
              }}
              onCancel={() => {
                router.replace(
                  {
                    pathname: router.pathname,
                  },
                  undefined,
                  { shallow: true }
                );
                setOpenModal(false);
                setSelectedData();
              }}
              width={1000}
              okButtonProps={{ style: { display: "none" } }}
              cancelText="Close"
            >
              {selectedData && (
                <>
                  <Descriptions
                    extra={
                      <Button
                        onClick={handlePrint}
                        className="bg-cyan-700 hover:bg-cyan-800 mr-7 border-none"
                        type="primary"
                      >
                        <PrinterOutlined className="mr-2 mt-0.5 float float-left" /> Cetak
                      </Button>
                    }
                    size="middle"
                    title="INFORMASI PENJUALAN TOKO"
                    bordered
                  >
                    <Descriptions.Item label="Tanggal Penjualan" span={4}>
                      {selectedData?.attributes?.sale_date}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={2}>
                      <Tag
                        color={getTagColor(
                          selectedData?.attributes?.retur_store_sale?.data
                            ? "Diretur"
                            : selectedData?.attributes?.status || "Diproses"
                        )}
                      >
                        {selectedData?.attributes?.retur_store_sale?.data
                          ? "Diretur"
                          : selectedData?.attributes?.status || "Diproses"}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="No Penjualan Toko" span={4}>
                      {selectedData?.attributes?.no_store_sale}
                    </Descriptions.Item>
                    <Descriptions.Item label="Customer" span={4}>
                      {selectedData?.attributes?.customer_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Catatan Staff" span={2}>
                      {selectedData?.attributes?.sale_staff ?? "-"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ditambahkan Oleh" span={2}>
                      {selectedData?.attributes?.added_by}
                    </Descriptions.Item>
                  </Descriptions>
                  <Descriptions size="middle" title="DETAIL PENJUALAN" bordered className="mt-2">
                    <Descriptions.Item label={`Diskon ${selectedData?.attributes?.disc_type || ""}`} span={2}>
                      {formatter.format(selectedData?.attributes?.disc_value || 0)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Biaya Pengiriman" span={4}>
                      {formatter.format(selectedData?.attributes?.delivery_fee || 0)}
                    </Descriptions.Item>
                    {[1, 2, 3].map((item) => {
                      if (
                        selectedData?.attributes?.[`additional_fee_${item}_sub`] &&
                        selectedData?.attributes?.[`additional_fee_${item}_desc`]
                      ) {
                        return (
                          <Descriptions.Item label={`Biaya Tambahan ${item}`} span={4}>
                            <p className="font-semibold m-0">
                              {selectedData?.attributes?.[`additional_fee_${item}_desc`]}
                            </p>
                            {formatter.format(selectedData?.attributes?.[`additional_fee_${item}_sub`] || 0)}
                          </Descriptions.Item>
                        );
                      }
                    })}
                    <Descriptions.Item label="DPP" span={2}>
                      {formatter.format(selectedData?.attributes?.dpp || 0)}
                    </Descriptions.Item>
                    <Descriptions.Item label="PPN" span={2}>
                      {formatter.format(selectedData?.attributes?.ppn || 0)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total">
                      {formatter.format(selectedData?.attributes?.total || 0)}
                    </Descriptions.Item>
                  </Descriptions>

                  <div className="mt-2">
                    <p className="mb-2 text-base font-semibold uppercase">Detail Item</p>
                    <DataTable
                      customStyles={customStyles}
                      columns={detailColumns}
                      data={selectedData?.attributes?.store_sale_details?.data}
                    />
                  </div>

                  <div className="mt-2">
                    <p className="mb-2 text-base font-semibold uppercase">Detail Mutasi Stok</p>
                    <DataTable
                      customStyles={customStyles}
                      columns={mutasiStokColumns}
                      data={selectedData?.attributes?.detail_mutasi_stok ?? []}
                    />
                  </div>
                </>
              )}
            </Modal>

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
                    return <Select.Option value={element.id}>{element.attributes.name}</Select.Option>;
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
                    return <Select.Option value={element.id}>{element.attributes.name}</Select.Option>;
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
                  <Select.Option>Diproses</Select.Option>
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
              <div className="mt-5">
                {role === "PENJUALAN TOKO" ? (
                  <button
                    onClick={handleAdd}
                    type="button"
                    className="bg-cyan-700 mx-2 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right mb-5"
                  >
                    <div className="text-white text-center text-sm font-bold">
                      <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
                    </div>
                  </button>
                ) : (
                  ""
                )}

                {role === "KASIR" ? (
                  <button
                    onClick={handleNavigateToPembayaran}
                    type="button"
                    className="bg-orange-300 mx-2 rounded px-5 py-2 hover:bg-orange-500  shadow-sm flex float-right mb-5"
                  >
                    <div className="text-white text-center text-sm font-bold">
                      <a className="text-white no-underline text-xs sm:text-xs flex items-center">
                        <span className="mr-2">
                          <BarcodeOutlined />
                        </span>
                        Pembayaran
                      </a>
                    </div>
                  </button>
                ) : (
                  ""
                )}

                <button
                  onClick={handleSetting}
                  type="button"
                  className="bg-cyan-700 mx-2 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right mb-5"
                >
                  <div className="text-white text-center text-sm font-bold">
                    <a className="text-white no-underline text-xs sm:text-xs">Setting Akun</a>
                  </div>
                </button>
              </div>
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

            <SellingTokoTable
              data={sell}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onPageChange={handlePageChange}
              onChangeStatus={onChangeStatus}
              returPage={returPage}
              page="toko"
            />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Toko;
