import Head from "next/head";
import React, { useEffect, useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useRouter } from "next/router";
import { notification, Select, DatePicker, Descriptions, Modal, message, Button, Tag, Spin } from "antd";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import nookies from "nookies";
import SalesSellingTable from "../../../../components/ReactDataTable/Selling/SalesSellingTable";
import { PrinterOutlined } from "@ant-design/icons";
import DataTable from "react-data-table-component";
import moment from "moment";
import Link from "next/link";
import createInventorySelling from "../utility/createInventorySelling";
import updateJurnal from "../utility/updateJurnal";
import { createInventoryFromPenjualanSales } from "../../../../library/functions/createInventory";

SalesSale.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  const reqSales = await fetchSales(cookies);
  const sales = await reqSales.json();

  const reqCustomer = await fetchCustomer(cookies);
  const customers = await reqCustomer.json();

  const reqUserMe = await fetchUser(cookies);
  const userMe = await reqUserMe.json();

  return {
    props: {
      user,
      locations,
      sales,
      customers,
      userMe
    },
  };
};

const fetchCustomer = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/customers/type?type=sales";
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

const fetchSales = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sales?populate=*&sort[0]=id:desc";
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

function SalesSale({ props }) {
  const [user, setUser] = useState(props.user || []);
  const [locations, setLocations] = useState(props.locations?.data || []);
  const [customers, setCustomers] = useState(props.customers?.data || []);
  const data = props.sales;
  const userMe = props.userMe;
  const router = useRouter();
  const [sell, setSell] = useState(data);
  const [returPage, setReturPage] = useState("sales");
  const [selectedData, setSelectedData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    location: undefined,
    sale_date: undefined,
    status: undefined,
    added_by: undefined,
    customer: undefined,
    sales: undefined,
  });

  const handleAdd = () => {
    router.push("/dashboard/penjualan/sales/tambah");
  };

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const handleUpdate = (id) => {
    // router.push("/dashboard/pembelian/order_pembelian/edit/" + id);
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
  };

  const handleDelete = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sales/" + id;
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
      const res = await fetchSales(cookies);
      const sales = await res.json();
      openNotificationWithIcon(
        "success",
        "Berhasil menghapus data",
        "Penjualan Sales yang dipilih telah berhasil dihapus. Silahkan cek kembali Penjualan Sales"
      );
      setSell(sales);
    }
  };

  const handlePageChange = async (page) => {
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sales?sort[0]=id:desc&pagination[page]=" + page;

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

  const changeStatusOrder = async (row) => {
    const poId = row.attributes.sales_sell?.data?.id;

    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sells/" + poId;

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSON.stringify({
        data: {
          status: "Diterima",
        },
      }),
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();
    if (res) {
      openNotificationWithIcon(
        "success",
        "Berhasil mengubah status Order Pembelian",
        "Status PO yang dipilih telah berhasil diubah. Silahkan cek kembali Order Penjualan"
      );
    }
  };

  const onChangeStatus = async (status, row) => {
    if (status === "Diterima") { console.log(row, "row nich");
      if (row?.attributes?.sales_sell?.data) {
        const inventoryOut = await createInventoryFromPenjualanSales(row); console.log(inventoryOut, "inventoryOut nich");

        if (inventoryOut) {
          await changeStatusOrder(row);
          handleChangeStatus(status, row.id);
        } else {
          openNotificationWithIcon(
            "error",
            "Gagal membuat data inventory",
            "Harap cek kembali data yang diinput dan harap cek kembali stok gudang."
          );
        }
      } else {
        openNotificationWithIcon(
          "error",
          "Status gagal dirubah",
          "Data Penjualan Sales yang dipilih tidak memiliki nomor Order Penjualan. Pastikan nomor Order Penjualan sudah terisi."
        );
      }

      return;
    }

    handleChangeStatus(status, row.id);
  };

  useEffect(() => {
    async function fetchOne(id) {
      message.loading({ content: "Mengambil data", duration: 8000, key: "fetch" });
      const cookies = nookies.get();
      const endpoint = process.env.NEXT_PUBLIC_URL + `/sales-sales/${id}?populate=deep`;
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
        <Link href={`/dashboard/produk?id=${attributes?.product?.data?.id}`}>
          <span className="text-blue-500 cursor-pointer hover:text-blue-700">
            {attributes?.product?.data?.attributes?.name || ""}
          </span>
        </Link>
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

  const print = () => {
    router.replace(
      {
        pathname: "/dashboard/penjualan/sales/print/" + selectedData.id,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleChangeStatus = async (status, id) => {
    const newValues = {
      data: {
        status,
      },
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
      const data = await response.json();

      setSell(data);

      //update jurnal dan coa
      if (status === "Diterima") updateJurnal(res.data, userMe, "penjualan", "sales");

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

  const getTagColor = (type) => {
    switch (type) {
      case "Terkirim":
        return "green";
      case "Diterima":
        return "green";
      case "Diterima":
        return "GREEN";
      case "Dibatalkan":
        return "red";
      case "Diretur":
        return "blue";
      case "Diproses":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusPembayaran = (row) => {
    const tagRed = process.env.TAG_RED;
    const tagGreen = process.env.TAG_GREEN;
    const tagOrange = process.env.TAG_ORANGE;
    const lastIndex = row.attributes.purchasing_payments?.data?.length;
    const lastPayment = row.attributes.purchasing_payments?.data[lastIndex - 1];

    if (lastPayment?.attributes.payment_remaining === lastPayment?.attributes.total_payment) {
      return <Tag color={tagRed}>Belum Dibayar</Tag>;
    } else if (
      lastPayment?.attributes.payment_remaining > 0 &&
      lastPayment?.attributes.payment_remaining < lastPayment?.attributes.total_payment
    ) {
      return <Tag color={tagOrange}>Dibayar Sebagian</Tag>;
    } else if (lastPayment?.attributes.payment_remaining <= 0) {
      return <Tag color={tagGreen}>Selesai</Tag>;
    } else {
      return <Tag color={tagOrange}>Dibayar Sebagian</Tag>;
    }
  };

  useEffect(() => {
    const fetchDataSales = async (query) => {
      setLoading(true);
      const cookies = nookies.get(null, "token");
      const endpoint = process.env.NEXT_PUBLIC_URL + `/sales-sales?sort[0]=id:desc&populate=*&${query}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      };

      const req = await fetch(endpoint, options);
      const res = await req.json();

      console.log("res", res);
      console.log("query", query);

      if (res?.data) {
        setSell(res);
        setLoading(false);
      } else {
        setSell(data);
        setLoading(false);
      }
    };

    const keys = Object.keys(filter);
    let query = {};

    keys.forEach((key) => {
      if (filter[key]) {
        query = {
          filters: {
            ...query?.filters,
            [key]: filter[key],
          },
        };
      }
    });

    if (query?.filters) {
      const qs = require("qs");
      const stringified = qs.stringify(query);
      fetchDataSales(stringified);
    } else {
      setSell(data);
    }
  }, [filter]);

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
      selector: ({ stok_keluar = [] }) =>
        stok_keluar?.length > 0 ? stok_keluar?.map(({ qty, unit }) => `${qty} ${unit}`)?.join(", ") : "",
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
        <title>Penjualan Sales</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Daftar Penjualan Sales"} />
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
                    title="INFORMASI PENJUALAN SALES"
                    bordered
                  >
                    <Descriptions.Item label="Tanggal Penjualan" span={4}>
                      {selectedData?.attributes?.sale_date}
                    </Descriptions.Item>
                    <Descriptions.Item label="No Penjualan Sales" span={2}>
                      {selectedData?.attributes?.no_sales_sale}
                    </Descriptions.Item>
                    <Descriptions.Item label="No Order Penjualan" span={2}>
                      {selectedData?.attributes?.sales_sell?.data?.id && (
                        <Link
                          href={`/dashboard/penjualan/order-penjualan?id=${selectedData?.attributes?.sales_sell?.data?.id}`}
                        >
                          <span className="text-blue-500 cursor-pointer hover:text-blue-700">
                            {selectedData?.attributes?.sales_sell?.data?.attributes?.no_sales_sell}
                          </span>
                        </Link>
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="No Inventory" span={2}>
                      {selectedData?.attributes?.no_inventory}
                    </Descriptions.Item>
                    <Descriptions.Item label="Customer">
                      {selectedData?.attributes?.customer?.data?.attributes?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={2}>
                      <Tag color={getTagColor(selectedData?.attributes?.status || "Diproses")}>
                        {selectedData?.attributes?.status || "Diproses"}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Status Pembayaran" span={2}>
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
                      data={selectedData?.attributes?.sales_sale_details?.data}
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

            <div className="w-full flex justify-start gap-3">
              <div className="w-full md:w-1/5">
                <Select
                  placeholder="Lokasi Gudang"
                  size="large"
                  allowClear
                  showSearch
                  filterOption={false}
                  onSearch={(value) => {
                    console.log(value);
                    // filter locations
                    if (value?.length > 0) {
                      const newLocations = props.locations?.data.filter((element) => {
                        return element.attributes.name.toLowerCase().includes(value.toLowerCase());
                      });

                      setLocations(newLocations);
                    } else {
                      setLocations(props.locations?.data);
                    }
                  }}
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  onChange={(value) => {
                    setFilter({
                      ...filter,
                      location: value,
                    });
                  }}
                >
                  {locations.map((element) => {
                    return <Select.Option value={element.id}>{element.attributes.name}</Select.Option>;
                  })}
                </Select>
              </div>
              <div className="w-full md:w-1/5">
                <Select
                  placeholder="Lokasi Penjualan"
                  size="large"
                  disabled
                  allowClear
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  onChange={(value) => {
                    setFilter({
                      ...filter,
                      location: value,
                    });
                  }}
                >
                  {locations.map((element) => {
                    return <Select.Option value={element.id}>{element.attributes.name}</Select.Option>;
                  })}
                </Select>
              </div>
              <div className="w-full md:w-1/5">
                <Select
                  placeholder="Status Pembayaran"
                  size="large"
                  allowClear
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  onChange={(value) => {
                    setFilter({
                      ...filter,
                      status_pembayaran: value,
                    });
                  }}
                >
                  <Select.Option key="Belum Lunas">Belum Lunas</Select.Option>
                  <Select.Option key="Dibayar Sebagian">Dibayar Sebagian</Select.Option>
                  <Select.Option key="Lunas">Lunas</Select.Option>
                </Select>
              </div>
              <div className="w-full md:w-1/5">
                <DatePicker.RangePicker
                  onChange={(_, dateString) => {
                    if (dateString[0] === "" || dateString[1] === "") {
                      setFilter({
                        ...filter,
                        sale_date: undefined,
                      });
                    } else {
                      setFilter({
                        ...filter,
                        sale_date: {
                          $gte: dateString[0],
                          $lte: dateString[1],
                        },
                      });
                    }
                  }}
                  size="large"
                  allowClear
                  style={{ width: "100%" }}
                />
              </div>
              <div className="w-full md:w-1/5">
                <Select
                  placeholder="Admin Penjualan"
                  size="large"
                  allowClear
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  showSearch
                  filterOption={false}
                  onSearch={(value) => {
                    console.log(value);
                    // filter locations
                    if (value?.length > 0) {
                      const newUser = props.user.filter((element) => {
                        return element.name.toLowerCase().includes(value.toLowerCase());
                      });

                      setUser(newUser);
                    } else {
                      setUser(props.user);
                    }
                  }}
                  onChange={(value) => {
                    setFilter({
                      ...filter,
                      added_by: value,
                    });
                  }}
                >
                  {user.map((element) => {
                    return <Select.Option value={element.name}>{element.name}</Select.Option>;
                  })}
                </Select>
              </div>
            </div>

            <div className="w-full flex justify-start gap-3 mt-3">
              <div className="w-full md:w-1/5">
                <Select
                  placeholder="Pelanggan"
                  size="large"
                  allowClear
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  onChange={(value) => {
                    setFilter({
                      ...filter,
                      customer: value,
                    });
                  }}
                  showSearch
                  filterOption={false}
                  onSearch={(value) => {
                    console.log(value);
                    // filter locations
                    if (value?.length > 0) {
                      const newCustomers = props.customers.data.filter((element) => {
                        return element.name.toLowerCase().includes(value.toLowerCase());
                      });

                      setCustomers(newCustomers);
                    } else {
                      setCustomers(props.customers.data);
                    }
                  }}
                >
                  {customers.map(({ name, id }) => {
                    return <Select.Option value={id}>{name}</Select.Option>;
                  })}
                </Select>
              </div>
              <div className="w-full md:w-1/5">
                <Select
                  placeholder="Sales"
                  size="large"
                  disabled
                  allowClear
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  onChange={(value) => {
                    setFilter({
                      ...filter,
                      sales: value,
                    });
                  }}
                >
                  {user.map((element) => {
                    return <Select.Option value={element.name}>{element.name}</Select.Option>;
                  })}
                </Select>
              </div>
              <div className="w-full md:w-1/5">
                <Select
                  placeholder="Status Penyerahan"
                  size="large"
                  allowClear
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  onChange={(value) => {
                    setFilter({
                      ...filter,
                      status: value,
                    });
                  }}
                >
                  <Select.Option key="Diproses">Diproses</Select.Option>
                  <Select.Option key="Diterima">Diterima</Select.Option>
                  <Select.Option key="Diretur">Diretur</Select.Option>
                  <Select.Option key="Dibatalkan">Dibatalkan</Select.Option>
                </Select>
              </div>
              <div className="w-full md:w-1/5">
                <Select
                  placeholder="Jatuh Tempo"
                  size="large"
                  allowClear
                  disabled
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
              <div className="w-full md:w-1/5"></div>
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

            <div className="w-full flex justify-between gap-3">
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print PDF</a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print CSV</a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print XLS</a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Kolom Tampak</a>
                </div>
              </button>
            </div>

            {loading ? (
              <div className="w-full flex items-center justify-center">
                <Spin size="large" />
              </div>
            ) : (
              <SalesSellingTable
                data={sell}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onPageChange={handlePageChange}
                onChangeStatus={onChangeStatus}
                returPage={returPage}
              />
            )}
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default SalesSale;
