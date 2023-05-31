import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Input, notification, Select, DatePicker } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import JurnalTable from "@iso/components/ReactDataTable/Cost/JurnalTable";
import Supplier from "@iso/components/Form/AddCost/SupplierForm";
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

  const reqJurnal = await fetchJurnal(cookies);
  const jurnal = await reqJurnal.json();

  const reqCOA = await fetchCOA(cookies);
  const coa = await reqCOA.json();
  //if (req.status !== 200) {
  //    context.res.writeHead(302, {
  //        Location: "/signin?session=false",
  //        "Content-Type": "text/html; charset=utf-8",
  //    });
  //    context?.res?.end();

  //    return {};
  //}

  return {
    props: {
      user,
      locations,
      jurnal,
      dataUser,
      coa,
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

const fetchJurnal = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/jurnals?populate=deep";
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

const fetchCOA = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/chart-of-accounts?populate";
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
  const locations = props.locations.data;
  const data = props.jurnal;
  const dataUser = props.dataUser;
  const coa = props.coa;
  const router = useRouter();
  const [jurnal, setJurnal] = useState(data);
  const [searchParameters, setSearchParameters] = useState({});
  const dispatch = useDispatch();

  // Range Picker
  const { RangePicker } = DatePicker;

  const handleAdd = () => {
    router.push("/dashboard/keuangan/jurnal/tambah");
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
    //handleDeleteRelation(data);

    const endpoint = process.env.NEXT_PUBLIC_URL + "/jurnals/" + data.id;
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
        "Jurnal yang dipilih telah berhasil dihapus. Silahkan cek kembali jurnal"
      );
      setJurnal(res);
    }
  };

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  const fetchData = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/jurnals?populate=deep";
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

  const logOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const searchQuery = async () => {
      let query = "";
      let startDate = "";
      let endDate = "";

      for (const key in searchParameters) {
        // if (key === "customer" && searchParameters[key] !== null) {
        //   query += `filters[credit_details][customer][id]=${searchParameters[key].id}&`;
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

        // if (key === "sales" && searchParameters[key] !== undefined) {
        //   query += `filters[credit_details][customer][sales_name]=${searchParameters[key]}&`;
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

      setJurnal(res);
      //console.log("endpoint", endpoint, res);
    };

    searchQuery();
  }, [searchParameters]);

  return (
    <>
      <Head>
        <title>DAFTAR JURNAL MEMO</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"DAFTAR JURNAL MEMO"} />
          <LayoutContent>
            <div className="w-full flex justify-start">
              <div className="w-full md:w-1/4 px-3 mb-2">
                <Select
                  placeholder="User"
                  size="large"
                  style={{
                    width: "100%",
                  }}
                  allowClear
                >
                  {dataUser.map((element) => {
                    return (
                      <Select.Option value={element.id} key={element.name}>
                        {element.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </div>
              <div className="w-full md:w-1/4 px-3">
                <Select
                  placeholder="Akun"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  allowClear
                >
                  {coa.data.map((element) => {
                    return (
                      <Select.Option value={element.id} key={element.attributes.nama}>
                        {element.attributes.nama}
                      </Select.Option>
                    );
                  })}
                </Select>
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
                >
                  <Select.Option value="Debit">Debit</Select.Option>
                  <Select.Option value="Kredit">Kredit</Select.Option>
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

            <div className="w-full flex justify-between mt-2 mb-2">
              <span className="text-black text-md font-bold ml-1 mt-5">Semua Jurnal</span>
              <div className="float-right">
                <button
                  onClick={handleAdd}
                  type="button"
                  className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm mb-5 mx-2"
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

            <JurnalTable
              data={jurnal}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
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
