import Head from "next/head";
import React, { useEffect, useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import {
  Input,
  notification,
  Select,
  DatePicker,
  Modal,
  Descriptions,
  Button,
  Tag,
  message,
  Spin,
} from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import SellSalesTable from "../../../../components/ReactDataTable/Selling/SellSalesTable";
import nookies from "nookies";
import DataTable from "react-data-table-component";
import qs from "querystring";

Sales.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  const reqSell = await fetchSell(cookies);
  const sell = await reqSell.json();

  const [users, customers] = await fetchUserCustomer(cookies);

  return {
    props: {
      user,
      locations,
      sell,
      users,
      customers,
    },
  };
};

const fetchUserCustomer = async (cookies) => {
  const endpoints = [
    `${process.env.NEXT_PUBLIC_URL}/users`,
    `${process.env.NEXT_PUBLIC_URL}/customers/type?type=SALES`,
  ];

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };

  const users = await fetch(endpoints[0], options)
    .then((res) => res.json())
    .catch((e) => console.log(e));
  const customers = await fetch(endpoints[1], options)
    .then((res) => res.json())
    .catch((e) => console.log(e));

  const userOptions = users?.map((attributes) => ({
    value: attributes?.name,
    label: attributes?.name,
  }));

  const customerOptions = customers?.data?.map((attributes) => ({
    value: attributes?.name,
    label: attributes?.name,
  }));

  return [userOptions, customerOptions];
};

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me";
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

const fetchSell = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sells?populate=deep";
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

function Sales({ props }) {
  const user = props.user;
  const locations = props.locations.data;
  const data = props.sell;
  const { users, customers } = props;
  console.log("props", props);
  const router = useRouter();
  const [sell, setSell] = useState(data);
  const [selectedData, setSelectedData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [filter, setFilter] = useState({
    location: null,
    sale_date: [],
    customer_name: null,
    sales: null,
  });
  const cookies = nookies.get();
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    router.push("/dashboard/penjualan/order-penjualan/tambah");
  };

  const handleUpdate = (id) => {
    // router.push("/dashboard/pembelian/order_pembelian/edit/" + id);
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
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
      const endpoint = process.env.NEXT_PUBLIC_URL + `/sales-sells/${id}?populate=deep`;
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
      }
    }
    if (router.query.id) {
      fetchOne(router.query.id);
    }
  }, [router.query]);

  const print = () => {
    router.replace(
      {
        pathname: "/dashboard/penjualan/order-penjualan/print/" + selectedData.id,
      },
      undefined,
      { shallow: true }
    );
  };

  // const getTagColor = (type) => {
  //   switch (type) {
  //     case "Terkirim":
  //       return "green";
  //     case "Diterima":
  //       return "GREEN";
  //     case "Dibatalkan":
  //       return "red";
  //     case "Sebagian Diterima":
  //       return "orange";
  //     case "Diproses":
  //       return "default";
  //     default:
  //       return "default";
  //   }
  // };

  const customStyles = {
    headerStyle: { textAlign: "center" },
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const detailColumns = [
    {
      name: "Nama Produk",
      selector: ({ attributes }) => attributes?.product?.data?.attributes?.name || "",
      wrap: true,
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
      selector: ({ attributes }) => formatter.format(attributes?.unit_price || 0) || "-",
    },
    {
      name: "D1",
      selector: ({ attributes }) => (attributes?.disc1 ? `${attributes?.disc1}%` : ""),
    },
    {
      name: "D2",
      selector: ({ attributes }) => (attributes?.disc2 ? `${attributes?.disc2}%` : ""),
    },
    {
      name: "Sub Total",
      selector: ({ attributes }) => {
        const unitPrice = attributes?.unit_price || 0;
        const qty = attributes?.qty || 0;
        const disc1 = attributes?.disc1 || 0;
        const disc2 = attributes?.disc2 || 0;

        const total = unitPrice * qty;
        const totalDisc1 = (total * disc1) / 100;
        const totalDisc2 = (total * disc2) / 100;

        const subTotal = total - totalDisc1 - totalDisc2;

        return formatter.format(subTotal);
      },
    },
  ];

  const handleCancel = async (id, row) => {
    onChangeStatus("Dibatalkan", id);
  };

  const onChangeStatus = async (status, id) => {
    const res = await changeStatusPO(id, status);
  };

  const changeStatusPO = async (poId, status) => {
    try {
      const updateStatus = {
        data: {
          status,
        },
      };

      const JSONdata = JSON.stringify(updateStatus);
      const cookies = nookies.get(null, "token");
      const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sells/" + poId;
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
        openNotificationWithIcon(
          "success",
          "Status Order Penjualan berhasil dirubah",
          "Status Order Penjualan berhasil dirubah. Silahkan cek tabel Order Penjualan"
        );
        refreshData();
      } else {
        openNotificationWithIcon(
          "error",
          "Status Order Penjualan gagal dirubah",
          "Status Order Penjualan gagal dirubah. Silahkan cek log untuk error detail"
        );
      }

      return res;
    } catch (error) {
      console.log(error);
      openNotificationWithIcon(
        "error",
        "Status Order Penjualan gagal dirubah",
        "Status Order Penjualan gagal dirubah. Silahkan cek log untuk error detail"
      );

      return null;
    }
  };

  const refreshData = () => {
    router.reload();
  };

  useEffect(() => {
    const fetchSellData = async (query) => {
      setLoading(true);
      const endpoint = process.env.NEXT_PUBLIC_URL + `/sales-sells?populate=deep&${query}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      };

      const req = await fetch(endpoint, options);
      const res = await req.json();

      console.log("query", query);
      console.log("res filter", res);

      if (res?.data) {
        setSell(res);
        setLoading(false);
      } else {
        setSell(data);
        setLoading(false);
      }
    };

    if (filter) {
      const keys = Object.keys(filter);

      let filterData = [];

      keys.forEach((key) => {
        if (filter.sale_date?.[0] && filter.sale_date?.[1]) {
          filterData.push(
            `filters[sale_date][$gte]=${filter.sale_date?.[0]}&filters[sale_date][$lte]=${filter.sale_date?.[1]}`
          );
        }

        if (filter[key] !== null && key !== "sale_date") {
          filterData.push(`filters[${key}]=${filter[key]}`);
        }
      });
      const queryString = filterData.join("&");
      fetchSellData(queryString);
    }
  }, [filter]);

  return (
    <>
      <Head>
        <title>Order Penjualan</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Order Penjualan"} />
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
                        onClick={print}
                        className="bg-cyan-700 hover:bg-cyan-800 mr-7 border-none"
                        type="primary"
                      >
                        <PrinterOutlined className="mr-2 mt-0.5 float float-left" /> Cetak
                      </Button>
                    }
                    size="middle"
                    title="INFORMASI ORDER PENJUALAN"
                    bordered
                  >
                    <Descriptions.Item label="Tanggal Pemesanan" span={4}>
                      {selectedData?.attributes?.sale_date}
                    </Descriptions.Item>
                    <Descriptions.Item label="No Order Penjualan" span={2}>
                      {selectedData?.attributes?.no_sales_sell}
                    </Descriptions.Item>
                    <Descriptions.Item label="Customer">
                      {selectedData?.attributes?.customer?.data?.attributes?.name}
                    </Descriptions.Item>
                    {/* <Descriptions.Item label="Status" span={2}>
                      <Tag color={getTagColor(selectedData?.attributes?.status || "Diproses")}>
                        {selectedData?.attributes?.status || "Diproses"}
                      </Tag>
                    </Descriptions.Item> */}
                    <Descriptions.Item label="Lokasi" span={2}>
                      {selectedData?.attributes?.location?.data?.attributes?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sales" span={2}>
                      {selectedData?.attributes?.sales}
                    </Descriptions.Item>
                  </Descriptions>

                  <div className="mt-2">
                    <p className="mb-2 font-bold uppercase">Detail</p>
                    <DataTable
                      customStyles={customStyles}
                      columns={detailColumns}
                      data={selectedData?.attributes?.sales_sell_details?.data}
                    />
                  </div>
                </>
              )}
            </Modal>

            <div className="w-full flex justify-start gap-3">
              <div className="w-full md:w-1/4">
                <Select
                  allowClear
                  value={filter.location}
                  onClear={() => setFilter({ ...filter, location: null })}
                  onSelect={(value) => setFilter({ ...filter, location: value })}
                  placeholder="Lokasi Gudang"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  options={locations?.map(({ attributes, id }) => ({
                    value: id,
                    label: attributes.name,
                  }))}
                />
              </div>
              <div className="w-full md:w-1/4">
                <DatePicker.RangePicker
                  onChange={(_, value) => setFilter({ ...filter, sale_date: value })}
                  size="large"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="w-full flex justify-start gap-3 mt-3">
              <div className="w-full md:w-1/4">
                <Select
                  allowClear
                  value={filter.customer_name}
                  onClear={() => setFilter({ ...filter, customer_name: null })}
                  onSelect={(value) => setFilter({ ...filter, customer_name: value })}
                  placeholder="Customer"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  options={customers}
                />
              </div>
              <div className="w-full md:w-1/4">
                <Select
                  allowClear
                  value={filter.sales}
                  onClear={() => setFilter({ ...filter, sales: null })}
                  onSelect={(value) => setFilter({ ...filter, sales: value })}
                  placeholder="Sales"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  options={users}
                />
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

            <div className="w-full flex justify-between gap-3">
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4  bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print PDF</a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4  bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print CSV</a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4  bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print XLS</a>
                </div>
              </button>
            </div>

            {loading ? (
              <div className="w-full flex items-center justify-center">
                <Spin size="large" />
              </div>
            ) : (
              <SellSalesTable
                data={sell}
                onUpdate={handleUpdate}
                onDelete={handleCancel}
                //onPageChange={handlePageChange}
                onChangeStatus={onChangeStatus}
                user={user}
              />
            )}
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Sales;
