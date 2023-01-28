import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { Input, notification, Select, DatePicker } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import DebtTable from "@iso/components/ReactDataTable/Cost/DebtTable";
import Supplier from "@iso/components/Form/AddCost/SupplierForm";
import nookies from "nookies";

Hutang.getInitialProps = async (context) => {
    const cookies = nookies.get(context);

    const req = await fetchData(cookies);
    const user = await req.json();

    const reqLocation = await fetchLocation(cookies);
    const locations = await reqLocation.json();

    const reqHutang = await fetchHutang(cookies);
    const hutang = await reqHutang.json();

    return {
      props: {
        user,
        locations,
        hutang,
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
    const router = useRouter();
    const [hutang, setHutang] = useState(data);
    const [supplier, setSupplier] = useState();

    const handleSetting = () => {
        router.push("/dashboard/biaya/hutang/setting");
    };

    const handleAdd = () => {
        router.push("/dashboard/biaya/hutang/tambah");
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

    return (
        <>
            <Head>
                <title>Pembayaran Pembelian</title>
            </Head>
            <DashboardLayout>
                <LayoutWrapper style={{}}>
                    <TitlePage titleText={"Pembayaran Pembelian"} />
                    <LayoutContent>
                        <div className="w-full flex justify-start">
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <Supplier onChangeSupplier={setSupplier} />
                            </div>
                            <div className="w-full md:w-1/4 px-3">
                                <Select
                                    placeholder="No Pembayaran"
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
                                    placeholder="Status Pembayaran"
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

                        <div className="w-full flex justify-between mt-0 mb-2">
                            <span className="text-black text-md font-bold ml-1 mt-5">Semua Penjualan</span>
                            <div className="float-right">
                                <button onClick={handleSetting} type="button" className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm mb-5 mx-2">
                                    <div className="text-white text-center text-sm font-bold">
                                        <a className="text-white no-underline text-xs sm:text-xs">Setting</a>
                                    </div>
                                </button>
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
                          data={data}
                          onUpdate={handleUpdate}
                          //onDelete={handleDelete}
                          //onPageChange={handlePageChange}
                          //onChangeStatus={onChangeStatus}
                          user={user}
                        />
                    </LayoutContent>
                </LayoutWrapper>
            </DashboardLayout>
        </>
    );
}

export default Hutang;
