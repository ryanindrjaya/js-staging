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

Jurnal.getInitialProps = async (context) => {
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings";
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

function Jurnal({ props }) {
  const user = props.user;
  const dataUser = props?.dataUser;
  const locations = props.locations;
  const purchasing = props.purchasing;
  const router = useRouter();
  const [supplier, setSupplier] = useState();
  const [location, setLocation] = useState();
  const [searchParameters, setSearchParameters] = useState({});
  const dispatch = useDispatch();

  // Range Picker
  const { RangePicker } = DatePicker;

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

  // const openNotificationWithIcon = (type, title, message) => {
  //   notification[type]({
  //     message: title,
  //     description: message,
  //   });
  // };

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

      for (const key in searchParameters) {
        // if (key === "user" && searchParameters[key] !== null) {
        //   console.log("search", searchParameters);
        //   //query += `filters[credit_details][customer][id]=${searchParameters[key].id}&`;
        // } else {
        //   query += "";
        // }

        // if (key === "status_pembayaran") {
        //   if (searchParameters[key] !== undefined) {
        //     query += `filters[${key}]=${searchParameters[key]}&`;
        //   } else {
        //     query += "";
        //   }
        // } else {
        //   query += "";
        // }

        if (key == "range" && searchParameters[key] !== null) {
          startDate = searchParameters?.range[0]?.format("YYYY-MM-DD");
          endDate = searchParameters?.range[1]?.format("YYYY-MM-DD");

          query += `filters[tanggal][$gte]=${startDate}&filters[tanggal][$lte]=${endDate}`;
        } else {
          query += "";
        }

        if (key === "akun" && searchParameters[key] !== undefined) {
          console.log("search", searchParameters, data);
          query += `filters[chart_of_account][id]=${searchParameters[key]}&`;
        } else {
          query += "";
        }

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

      const endpoint = process.env.NEXT_PUBLIC_URL + "/jurnals?populate=deep&" + query;

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

      //setJurnal(res);
      //console.log("endpoint", endpoint, res);
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
                   onChangeLocation={setLocation}
                 />
              </div>
              <div className="w-full md:w-1/4 px-3">
                 <SearchSupplier 
                   onChangeSupplier={setSupplier}
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
                  // onChange={(e) =>
                  //   setSearchParameters({ ...searchParameters, tipeTransaksi: e })
                  // }
                >
                  <Select.Option value="tdk ada">Blom ada</Select.Option>
                  {/* <Select.Option value="Kredit">Kredit</Select.Option> */}
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
                    setSearchParameters({ ...searchParameters, statusPembayaran: e })
                  }
                >
                  <Select.Option value="tdk ada">Blom ada</Select.Option>
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
              data={purchasing}
              onUpdate={handleUpdate}
              //onDelete={handleDelete}
              //onPageChange={handlePageChange}
              //onChangeStatus={onChangeStatus}
              user={user}
            />

            <tokenVerify logOut={logOut} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Jurnal;
