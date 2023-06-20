import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { Input, notification, Select, DatePicker } from "antd";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import SellingTable from "../../../../components/ReactDataTable/Selling/SellingTable";
import Customer from "@iso/components/Form/AddCost/CustomerForm";
import createInventory from "../utility/createInventory";
import LoadingAnimations from "@iso/components/Animations/Loading";
import nookies from "nookies";

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

  return {
    props: {
      user,
      dataUserSales,
      locations,
      panel,
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

const fetchPanelSales = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/panel-sales?populate=deep&sort[createdAt]=desc";
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
  const router = useRouter();
  const [sell, setSell] = useState(data);
  const [searchParameters, setSearchParameters] = useState({});
  const [isFetchinData, setIsFetchingData] = useState(false);

  // Range Picker
  const { RangePicker } = DatePicker;

  const cookies = nookies.get(null, "token");

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
      const res = await fetchData(cookies);
      openNotificationWithIcon(
        "success",
        "Berhasil menghapus data",
        "Penjualan yang dipilih telah berhasil dihapus. Silahkan cek kembali penjualan non panel"
      );
      setSell(res);
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

  return (
    <>
      <Head>
        <title>Penjualan Panel</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Daftar Penjualan Panel"} />
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
