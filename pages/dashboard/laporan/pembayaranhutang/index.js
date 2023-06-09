import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Input, notification, Select, DatePicker } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import Table from "@iso/components/ReactDataTable/Report/PurchaseDebtTable";
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

  const reqDebt = await fetchDebt(cookies);
  const debt = await reqDebt.json();

  return {
    props: {
      user,
      dataUser,
      debt,
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

const fetchDebt = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/debts?populate[0]=supplier&populate[1]=debt_details.purchasing";
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
  const debt = props.debt;
  const [data, setData] = useState(debt);
  const router = useRouter();
  const [supplier, setSupplier] = useState();
  const [searchParameters, setSearchParameters] = useState({});
  const dispatch = useDispatch();

  // Range Picker
  const { RangePicker } = DatePicker;

  const handlePrint = () => {
    //router.push("/dashboard/laporan/pembayaranhutang/print");
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

        if (key === "status_pembayaran") {
          if (searchParameters[key] !== undefined) {
            query += `filters[${key}]=${searchParameters[key]}&`;
          } else {
            query += "";
          }
        } else {
          query += "";
        }

        if (key === "supplier") {
          if (searchParameters[key] !== undefined && searchParameters[key] !== null) {
            console.log(searchParameters[key]);
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
          query += `filters[tanggal_pembayaran][$gte]=${startDate}&filters[tanggal_pembayaran][$lte]=${endDate}&`;
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

      const endpoint = process.env.NEXT_PUBLIC_URL + "/debts?populate[0]=supplier&populate[1]=debt_details.purchasing&" + query;

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

      setData(res);
      //console.log("endpoint", endpoint, res);
    };

    searchQuery();
  }, [searchParameters]);

  return (
    <>
      <Head>
        <title>Laporan pembayaran hutang pembelian </title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"LAPORAN PEMBAYARAN HUTANG PEMBELIAN"} />
          <LayoutContent>
            <div className="w-full flex justify-start">
              <div className="w-full md:w-1/4 px-3">
                 <SearchSupplier 
                   onChangeSupplier={(e) =>
                    setSearchParameters({ ...searchParameters, supplier: e })
                  }
                 />
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
              <div className="w-full md:w-1/4 px-3">
                <Select
                  placeholder="Tipe Laporan"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  allowClear
                  onChange={(e) =>
                    setSearchParameters({ ...searchParameters, tipeLaporan: e })
                  }
                >
                  <Select.Option value="Detail">Detail</Select.Option>
                  <Select.Option value="Rekap">Rekap</Select.Option>
                </Select>
              </div>
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
              tipeLaporan={searchParameters["tipeLaporan"]}
              user={user}
            />

            {/* <table className="w-full">
              <thead>
                <tr>
                  <th>No Pembayaran</th>
                  <th>Tgl Bayar</th>
                  <th>Nota Supplier</th>
                  <th>No LPB</th>
                  <th>Tgl LPB</th>
                  <th>Nilai LPB</th>
                  <th>Total Nilai RB</th>
                  <th>Tunai</th>
                  <th>Transfer</th>
                  <th>Giro</th>
                  <th>CN</th>
                  <th>OTH</th>
                  <th>Saldo Hutang</th>
                </tr>
              </thead>
              <tbody>
                {debt.data.forEach((item) => { console.log("item",item, debt.data);
                  // <tr>
                  //   <td>{item.attributes.no_hutang}</td>
                  //   <td>lol</td>
                  //   <td></td>
                  //   <td></td>
                  //   <td></td>
                  //   <td></td>
                  //   <td></td>
                  //   <td></td>
                  //   <td></td>
                  //   <td></td>
                  //   <td></td>
                  //   <td></td>
                  //   <td></td>
                  // </tr>
                })}
              </tbody>
            </table> */}

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
