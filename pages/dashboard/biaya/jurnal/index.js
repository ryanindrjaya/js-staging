import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Input, notification, Select, DatePicker } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import DebtTable from "@iso/components/ReactDataTable/Cost/JurnalTable";
import Supplier from "@iso/components/Form/AddCost/SupplierForm";
import nookies from "nookies";
import tokenVerify from "../../../../authentication/tokenVerify";

Hutang.getInitialProps = async (context) => {
    const cookies = nookies.get(context);

    const req = await fetchData(cookies);
    const user = await req.json();

    const reqDataUser = await fetchUser(cookies);
    const dataUser = await reqDataUser.json();

    const reqLocation = await fetchLocation(cookies);
    const locations = await reqLocation.json();

    const reqHutang = await fetchHutang(cookies);
    const hutang = await reqHutang.json();

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
        hutang,
        dataUser
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
    const endpoint = process.env.NEXT_PUBLIC_URL + "/users?populate=deep";
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

const fetchHutang = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/debts?populate=deep";
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

function Hutang({ props }) {
    const user = props.user;
    const locations = props.locations.data;
    const data = props.hutang;
    const dataUser = props.dataUser;
    const router = useRouter();
    const [hutang, setHutang] = useState(data);
    const dispatch = useDispatch();

    const handleAdd = () => {
        router.push("/dashboard/biaya/jurnal/tambah");
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

        const endpoint = process.env.NEXT_PUBLIC_URL + "/debts/" + data.id;
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
                "Hutang yang dipilih telah berhasil dihapus. Silahkan cek kembali hutang"
            );
            setHutang(res);
        }
    };

    const handleDeleteRelation = async (data) => {
        var id = 0;
        data.attributes.debt_details.data.forEach((element) => {
          id = element.id;

          const endpoint = process.env.NEXT_PUBLIC_URL + "/debt-details/" + id;
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

    const openNotificationWithIcon = (type, title, message) => {
        notification[type]({
            message: title,
            description: message,
        });
    };

    const fetchData = async (cookies) => {
        const endpoint = process.env.NEXT_PUBLIC_URL + "/debts?populate=deep";
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
                                    size="large"
                                    style={{
                                        width: "100%",
                                    }}
                                    placeholder="User"
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
                                >
                                    {/*{locations.map((element) => {*/}
                                    {/*  return (*/}
                                    <Select.Option>
                                        data
                                    </Select.Option>
                                    {/*  );*/}
                                    {/*})}*/}
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
                                >
                                    {/*{locations.map((element) => {*/}
                                    {/*  return (*/}
                                    <Select.Option>
                                        data
                                    </Select.Option>
                                    {/*  );*/}
                                    {/*})}*/}
                                </Select>
                            </div>
                            <div className="w-full md:w-1/4 px-3">
                                <DatePicker placeholder="Rentang Tanggal" size="large" style={{ width: "100%" }} />
                            </div>
                        </div>

                        <div className="w-full flex justify-between mt-2 mb-2">
                            <span className="text-black text-md font-bold ml-1 mt-5">Semua Jurnal</span>
                            <div className="float-right">
                                <button onClick={handleAdd} type="button" className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm mb-5 mx-2">
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
                                    <a className="text-white no-underline text-xs sm:text-xs">
                                        Print PDF
                                    </a>
                                </div>
                            </button>
                            <button
                                onClick={handleUpdate}
                                type="button"
                                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
                            >
                                <div className="text-white text-center text-sm font-bold">
                                    <a className="text-white no-underline text-xs sm:text-xs">
                                        Print CSV
                                    </a>
                                </div>
                            </button>
                            <button
                                onClick={handleUpdate}
                                type="button"
                                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
                            >
                                <div className="text-white text-center text-sm font-bold">
                                    <a className="text-white no-underline text-xs sm:text-xs">
                                        Print XLS
                                    </a>
                                </div>
                            </button>
                            <button
                                onClick={handleUpdate}
                                type="button"
                                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
                            >
                                <div className="text-white text-center text-sm font-bold">
                                    <a className="text-white no-underline text-xs sm:text-xs">
                                        Kolom Tampak
                                    </a>
                                </div>
                            </button>
                        </div>

                        <DebtTable
                          data={hutang}
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

export default Hutang;
