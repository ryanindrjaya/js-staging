import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { Input, notification, Select, DatePicker, Modal, message, Descriptions, Button, Tag } from "antd";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import SellingTable from "../../../../components/ReactDataTable/Selling/SellingTable";
import Customer from "@iso/components/Form/AddCost/CustomerForm";
import createInventory from "../utility/createInventory";
import updateJurnal from "../utility/updateJurnal";
import LoadingAnimations from "@iso/components/Animations/Loading";
import { PrinterOutlined } from "@ant-design/icons";
import DataTable from "react-data-table-component";
import nookies from "nookies";
import moment from "moment";
import Link from "next/link";

PanelSale.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqDataUserSales = await fetchUserSales(cookies);
  const dataUserSales = await reqDataUserSales.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  const reqPanelSales = await fetchPanelSales(cookies);
  const panel = await reqPanelSales.json();

  const reqUserMe = await fetchUser(cookies);
  const userMe = await reqUserMe.json();

  return {
    props: {
      user,
      dataUserSales,
      locations,
      panel,
      userMe,
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

const fetchUserSales = async (cookies) => {
  const endpoint =
    process.env.NEXT_PUBLIC_URL + "/users?populate=*&filters[role][name][$eq]=Sales&?filters[role][type][$eq]=Sales";
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

const fetchPanelSales = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/panel-sales?populate=*&sort[createdAt]=desc";
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

const fetchUser = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me?populate=*";
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

function PanelSale({ props }) {
  const user = props.user;
  const locations = props.locations.data;
  const data = props.panel;
  const dataUserSales = props.dataUserSales;
  const userMe = props.userMe;
  const router = useRouter();
  const [sell, setSell] = useState(data);
  const [searchParameters, setSearchParameters] = useState({});
  const [isFetchinData, setIsFetchingData] = useState(false);

  // Range Picker
  const { RangePicker } = DatePicker;
  // modal
  const [selectedData, setSelectedData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const cookies = nookies.get(null, "token");

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const updateStock = async (id, locations, operation = "add") => {
    // fetching data to update
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };
    const endpoint = process.env.NEXT_PUBLIC_URL + `/panel-sales/${id}?populate=deep`;
    const req = await fetch(endpoint, options);
    const res = await req.json();
    const row = res.data;

    row.attributes.status_data = "Publish";
    row.attributes.area = row?.attributes?.area?.data?.id;
    row.attributes.wilayah = row?.attributes?.wilayah?.data?.id;
    row.attributes.customer = row?.attributes?.customer?.data?.id;
    row.attributes.location = row?.attributes?.location?.data?.id;

    var tempDetails = [];
    for (var details in row.attributes.panel_sale_details.data) {
      tempDetails[details] = row.attributes.panel_sale_details.data[details].id;
    }
    row.attributes.panel_sale_details = tempDetails;

    var tempPayments = [];
    for (var payments in row.attributes.purchasing_payments.data) {
      tempPayments[payments] = row.attributes.purchasing_payments.data[payments].id;
    }
    row.attributes.purchasing_payments = tempPayments;

    const dataUpdate = {
      data: row.attributes,
    };

    const JSONdata = JSON.stringify(dataUpdate);
    const endpointPut = process.env.NEXT_PUBLIC_URL + "/panel-sales/" + id + "?populate=deep";
    const optionsPut = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSONdata,
    };
    const reqPut = await fetch(endpointPut, optionsPut);
    const resPut = await reqPut.json();
    const rowPut = resPut.data;

    const trxStatus = rowPut?.attributes?.status_data;

    if (trxStatus == "Publish") {
      console.log("masuk");
      // invetory handle
      await createInventory(rowPut, locations, operation);
    }
    console.log("tidak masuk", id, rowPut, resPut, dataUpdate);
    router.reload("/dashboard/penjualan/panel");
  };

  const handleSetting = () => {
    router.push("/dashboard/penjualan/panel/setting");
  };

  const handleAdd = () => {
    router.push("/dashboard/penjualan/panel/tambah");
  };

  const handleUpdate = (id) => {
    // router.push("/dashboard/pembelian/order_pembelian/edit/" + id);
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
  };

  const handleDelete = async (data) => {
    handleDeleteRelation(data);

    const endpoint = process.env.NEXT_PUBLIC_URL + "/panel-sales/" + data.id;
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
      const res = await fetchPanelSales(cookies);
      const newData = await res.json();
      openNotificationWithIcon(
        "success",
        "Berhasil menghapus data",
        "Penjualan yang dipilih telah berhasil dihapus. Silahkan cek kembali penjualan non panel"
      );
      setSell(newData);
    }

    setIsFetchingData(false);
  };

  const handleDeleteRelation = async (data) => {
    setIsFetchingData(true);

    var id = 0;
    data.attributes.panel_sale_details.data.forEach((element) => {
      id = element.id;

      const endpoint = process.env.NEXT_PUBLIC_URL + "/panel-sale-details/" + id;
      const cookies = nookies.get(null, "token");

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      };

      const req = fetch(endpoint, options);
      //const res = req.json();
      if (req) {
        console.log("relation deleted");
      }
    });
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

    var sales_sale_details = [];
    values.attributes.sales_sale_details.data.forEach((element) => {
      sales_sale_details.push({ id: element.id });
    });

    var purchasing_payments = [];
    values.attributes.purchasing_payments.data.forEach((element) => {
      purchasing_payments.push({ id: element.id });
    });

    values.attributes.location = { id: values.attributes.location.data.id };
    values.attributes.sales_sale_details = sales_sale_details;
    values.attributes.purchasing_payments = purchasing_payments;

    const newValues = {
      data: values.attributes,
    };

    const JSONdata = JSON.stringify(newValues);
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sales/" + id;

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
      const response = await fetchSales(cookies);
      setSell(response);
      openNotificationWithIcon(
        "success",
        "Status berhasil dirubah",
        "Status berhasil dirubah. Silahkan cek penjualan sales"
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

  const customStyles = {
    headerStyle: { textAlign: "center" },
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const getStatusPembayaran = (row) => {
    const tagRed = process.env.TAG_RED;
    const tagGreen = process.env.TAG_GREEN;
    const tagOrange = process.env.TAG_ORANGE;

    if (row.attributes.status == "Belum Dibayar") {
      return <Tag color={tagRed}>{row.attributes.status}</Tag>;
    } else if (row.attributes.status == "Dibayar Sebagian") {
      return <Tag color={tagOrange}>{row.attributes.status}</Tag>;
    } else if (row.attributes.status == "Dibayar") {
      return <Tag color={tagGreen}>{row.attributes.status}</Tag>;
    } else {
      return <Tag color={tagOrange}>Dibayar Sebagian</Tag>;
    }
  };

  useEffect(() => {
    async function fetchOne(id) {
      message.loading({ content: "Mengambil data", duration: 8000, key: "fetch" });
      const cookies = nookies.get();
      const endpoint =
        process.env.NEXT_PUBLIC_URL + `/panel-sales/${id}?populate[panel_sale_details][populate][0]=product`;
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

      console.log(res);

      if (res.data) {
        message.destroy("fetch");
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
      selector: ({ attributes }) => (attributes?.disc1 ? `${attributes?.disc1}%` : ""),
    },
    {
      name: "D2",
      selector: ({ attributes }) => (attributes?.disc2 ? `${attributes?.disc2}%` : ""),
    },
    // {
    //   name: "Margin",
    //   selector: ({ attributes }) => (attributes?.margin ? `${attributes?.margin}%` : ""),
    // },
    {
      name: "Sub Total",
      width: "150px",
      selector: ({ attributes }) => formatter.format(attributes?.sub_total || 0) || "-",
    },
  ];

  const print = () => {
    router.replace(
      {
        pathname: "/dashboard/penjualan/panel/print/" + selectedData.id,
      },
      undefined,
      { shallow: true }
    );
  };

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
      selector: ({ location }) => {
        const selectedLocation = locations.find((item) => item.id === location);
        return selectedLocation?.attributes?.name || "-";
      },
    },
    {
      name: "Detail",
      align: "center",
      selector: ({ product, location }) => (
        <Link href={`/dashboard/stok?product=${product}&location=${location}`}>Lihat Kartu Stok</Link>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Penjualan Panel</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Daftar Penjualan Panel"} />
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
                      <Button onClick={print} className="bg-cyan-700 hover:bg-cyan-800 mr-7 border-none" type="primary">
                        <PrinterOutlined className="mr-2 mt-0.5 float float-left" /> Cetak
                      </Button>
                    }
                    size="middle"
                    title="INFORMASI PENJUALAN PANEL"
                    bordered
                  >
                    <Descriptions.Item label="Tanggal Penjualan" span={4}>
                      {selectedData?.attributes?.sale_date}
                    </Descriptions.Item>
                    <Descriptions.Item label="No Penjualan Panel" span={4}>
                      {selectedData?.attributes?.no_panel_sale}
                    </Descriptions.Item>
                    <Descriptions.Item label="No Inventory" span={2}>
                      {selectedData?.attributes?.no_inventory}
                    </Descriptions.Item>
                    <Descriptions.Item label="Customer">
                      {selectedData?.attributes?.customer?.data?.attributes?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status Pembayaran" span={4}>
                      {getStatusPembayaran(selectedData)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tempo" span={4}>
                      {selectedData?.attributes?.tempo_days} {selectedData?.attributes?.tempo_time}
                    </Descriptions.Item>
                    <Descriptions.Item label="Catatan" span={2}>
                      {selectedData?.attributes?.sale_note}
                    </Descriptions.Item>
                    <Descriptions.Item label="Catatan Staff" span={2}>
                      {selectedData?.attributes?.sale_staff}
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
                      data={selectedData?.attributes?.panel_sale_details?.data}
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
                <RangePicker size="large" onChange={(e) => setSearchParameters({ ...searchParameters, range: e })} />
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
                <Customer
                  onChangeCustomer={(e) => setSearchParameters({ ...searchParameters, customer: e })}
                  page={"PANEL"}
                />
              </div>
              <div className="w-full md:w-1/5 px-3">
                <Select
                  size="large"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Sales"
                  allowClear
                  onChange={(e) => setSearchParameters({ ...searchParameters, sales: e })}
                >
                  {dataUserSales?.map((element) => {
                    return (
                      <Select.Option value={element.name} key={element.id}>
                        {element.name}
                      </Select.Option>
                    );
                  })}
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
                  <Select.Option>Tempo</Select.Option>
                  <Select.Option>Menunggu</Select.Option>
                  <Select.Option>Selesai</Select.Option>
                  {/*  );*/}
                  {/*})}*/}
                </Select>
              </div>
            </div>

            <div className="w-full flex justify-between mt-0 mb-2">
              <span className="text-black text-md font-bold ml-1 mt-5">Semua Penjualan</span>
              <div className="flex mt-3 mr-3 justify-between">
                <button
                    onClick={handleSetting}
                    type="button"
                    className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800 shadow-sm flex float-right mb-5 mr-3"
                  >
                    <div className="text-white text-center text-sm font-bold">
                      <a className="text-white no-underline text-xs sm:text-xs">Setting Akun</a>
                    </div>
                </button>
                <button
                  onClick={handleAdd}
                  type="button"
                  className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800 shadow-sm flex float-right mb-5"
                >
                  <div className="text-white text-center text-sm font-bold">
                    <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
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

            {isFetchinData ? (
              <div className="w-full md:w-4/4 px-3 mb-2 mt-5 mx-3  md:mb-0 text-lg">
                <div className="w-36 h-36 flex p-4 max-w-sm mx-auto">
                  <LoadingAnimations />
                </div>
                <div className="text-sm align-middle text-center animate-pulse text-slate-400">
                  Sedang Mengambil Data
                </div>
              </div>
            ) : (
              <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">
                <SellingTable
                  data={sell}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  //onPageChange={handlePageChange}
                  onChangeStatus={onChangeStatus}
                  returPage="panel"
                  page="panel"
                  updateStock={updateStock}
                  user={userMe}
                  updateJurnal={updateJurnal}
                />
              </div>
            )}
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default PanelSale;
