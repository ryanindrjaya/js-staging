import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Input, notification, Select, DatePicker } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import Table from "@iso/components/ReactDataTable/Report/PurchaseReturSaleTable";
import SearchSupplier from "@iso/components/Form/AddReport/SearchSupplier";
import SearchLocations from "@iso/components/Form/AddReport/SearchLocations";
import nookies from "nookies";
import tokenVerify from "../../../../authentication/tokenVerify";

Laporan.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqDataUser = await fetchUser(cookies);
  const dataUser = await reqDataUser.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  const reqPurchasing = await fetchPurchasing(cookies);
  const purchasing = await reqPurchasing.json();

  return {
    props: {
      user,
      dataUser,
      locations,
      purchasing,
    },
  };
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

const fetchUser = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users?populate=*";
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

const fetchPurchasing = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + 
  "/purchasings?populate[0]=supplier&populate[1]=purchasing_details.product&populate[2]=returs.retur_details.products";
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

function Laporan({ props }) {
  const user = props.user;
  const dataUser = props?.dataUser;
  const locations = props.locations;
  const purchasing = props.purchasing;
  const [data, setData] = useState(purchasing);
  const router = useRouter();
  const [queryPrint, setQueryPrint] = useState("/purchasings?populate[0]=supplier&populate[1]=purchasing_details.product&populate[2]=returs.retur_details.products");
  const [searchParameters, setSearchParameters] = useState({});
  const dispatch = useDispatch();

  // Range Picker
  const { RangePicker } = DatePicker;

  const handlePrint = () => {
    console.log("data", data.data);
    router.push("/dashboard/laporan/pembeliandanretur/print?data=" + data.data);
  };

  // const handleAdd = () => {
  //   router.push("/dashboard/keuangan/jurnal/tambah");
  // };

  const handleUpdate = (id) => {
    // router.push("/dashboard/pembelian/order_pembelian/edit/" + id);
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
  };

  // const handleDelete = async (data) => {

  //   const endpoint = process.env.NEXT_PUBLIC_URL + "/jurnals/" + data.id;
  //   const cookies = nookies.get(null, "token");

  //   const options = {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + cookies.token,
  //     },
  //   };

  //   const req = await fetch(endpoint, options);
  //   const res = await req.json();
  //   if (res) {
  //     const res = await fetchData(cookies);
  //     openNotificationWithIcon(
  //       "success",
  //       "Berhasil menghapus data",
  //       "Jurnal yang dipilih telah berhasil dihapus. Silahkan cek kembali jurnal"
  //     );
  //     setJurnal(res);
  //   }
  // };

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  // const fetchData = async (cookies) => {
  //   const endpoint = process.env.NEXT_PUBLIC_URL + "/jurnals?populate=deep";
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + cookies.token,
  //     },
  //   };

  //   const req = await fetch(endpoint, options);
  //   const res = req.json();

  //   return res;
  // };

  const logOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const searchQuery = async () => {
      let query = "";
      let startDate = "";
      let endDate = "";
      let queryTransaksi = "/purchasings?populate[0]=supplier&populate[1]=purchasing_details.product&populate[2]=returs.retur_details.products&";

      for (const key in searchParameters) {
        // if (key === "user" && searchParameters[key] !== null) {
        //   console.log("search", searchParameters);
        //   //query += `filters[credit_details][customer][id]=${searchParameters[key].id}&`;
        // } else {
        //   query += "";
        // }

        if (key === "tipeTransaksi" && searchParameters[key] !== undefined) {
          if (searchParameters[key] == "Pembelian") {
            queryTransaksi = "/purchasings?populate[0]=supplier&populate[1]=purchasing_details.product&";
          } else if (searchParameters[key] == "Retur") {
            queryTransaksi = "/purchasings?populate[0]=supplier&populate[1]=returs.retur_details.products&";
          } else {
            queryTransaksi = "/purchasings?populate[0]=supplier&populate[1]=purchasing_details.product&populate[2]=returs.retur_details.products&";
          }
        } else {
          queryTransaksi = "/purchasings?populate[0]=supplier&populate[1]=purchasing_details.product&populate[2]=returs.retur_details.products&";
        }

        if (key === "status_pembayaran") {
          if (searchParameters[key] !== undefined) {
            query += `filters[${key}]=${searchParameters[key]}&`;
          } else {
            query += "";
          }
        } else {
          query += "";
        }

        if (key === "supplier" || key === "location") {
          if (searchParameters[key] !== undefined && searchParameters[key] !== null) {
            query += `filters[${key}]=${searchParameters[key].id}&`;
          } else {
            query += "";
          }
        } else {
          query += "";
        }

        if (key == "range" && searchParameters[key] !== null) {
          startDate = searchParameters?.range[0]?.format("YYYY-MM-DD");
          endDate = searchParameters?.range[1]?.format("YYYY-MM-DD");

          query += `filters[date_purchasing][$gte]=${startDate}&filters[date_purchasing][$lte]=${endDate}`;
        } else {
          query += "";
        }

        // if (key === "akun" && searchParameters[key] !== undefined) {
        //   console.log("search", searchParameters, data);
        //   query += `filters[chart_of_account][id]=${searchParameters[key]}&`;
        // } else {
        //   query += "";
        // }

        // if (key === "area" || key === "wilayah") {
        //   if (searchParameters[key] !== null) {
        //     query += `filters[credit_details][customer][${key}][id]=${searchParameters[key].id}&`;
        //   } else {
        //     query += "";
        //   }
        // } else {
        //   query += "";
        // }
      }

      const endpoint = process.env.NEXT_PUBLIC_URL + 
      //"/purchasings?populate[0]=supplier&populate[1]=purchasing_details.product&populate[2]=returs.retur_details.products&" + 
      //"/purchasings?populate" + 
      queryTransaksi + 
      query;

      const cookies = nookies.get(null, "token");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      };

      const req = await fetch(endpoint, options);
      const res = await req.json();

      setQueryPrint(queryTransaksi + query);
      setData(res);
    };

    searchQuery();
  }, [searchParameters]);

  return (
    <>
      <Head>
        <title>Laporan pembelian dan retur beli barang </title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"LAPORAN PEMBELIAN DAN RETUR BELI BARANG"} />
          <LayoutContent>
            <div className="w-full flex justify-start">
              <div className="w-full md:w-1/4 px-3 mb-2">
                 <SearchLocations
                   onChangeLocations={(e) =>
                    setSearchParameters({ ...searchParameters, location: e })
                  }
                 />
              </div>
              <div className="w-full md:w-1/4 px-3">
                 <SearchSupplier 
                   onChangeSupplier={(e) =>
                    setSearchParameters({ ...searchParameters, supplier: e })
                  }
                 />
              </div>
              <div className="w-full md:w-1/4 px-3">
                <Select
                  placeholder="Tipe Transaksi"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  allowClear
                  onChange={(e) =>
                    setSearchParameters({ ...searchParameters, tipeTransaksi: e })
                  }
                >
                  <Select.Option value="Pembelian">Pembelian</Select.Option>
                  <Select.Option value="Retur">Retur</Select.Option>
                </Select>
              </div>
              <div className="w-full md:w-1/4 px-3">
                <Select
                  placeholder="Status Pembayaran"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  allowClear
                  onChange={(e) =>
                    setSearchParameters({ ...searchParameters, status_pembayaran: e })
                  }
                >
                  <Select.Option value="Dibayar">Dibayar</Select.Option>
                  <Select.Option value="Dibayar Sebagian">Dibayar Sebagian</Select.Option>
                  <Select.Option value="Belum Dibayar">Belum Dibayar</Select.Option>
                </Select>
              </div>
            </div>

            <div className="w-full flex justify-end -mt-4">
              <div className="w-full md:w-1/4 px-3">
                <RangePicker
                  size="large"
                  onChange={(e) =>
                    setSearchParameters({ ...searchParameters, range: e })
                  }
                />
              </div>
            </div>

            <div className="w-full flex justify-between mt-3">
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
            
            <Table
              data={data}
              onUpdate={handleUpdate}
              //onDelete={handleDelete}
              //onPageChange={handlePageChange}
              //onChangeStatus={onChangeStatus}
              user={user}
            />

            <div className="w-full flex justify-between mt-3">
                <button
                  onClick={handlePrint}
                  type="button"
                  className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm mb-5 mx-2"
                >
                  <div className="text-white text-center text-sm font-bold">
                    <a className="text-white no-underline text-xs sm:text-xs">Print</a>
                  </div>
                </button>
            </div>
            <tokenVerify logOut={logOut} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Laporan;
