import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { Input, notification, Select, DatePicker } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import CreditTable from "@iso/components/ReactDataTable/Cost/CreditTable";
import Supplier from "@iso/components/Form/AddCost/SupplierForm";
import Customer from "@iso/components/Form/AddCost/CustomerForm";
import Area from "@iso/components/Form/AddCost/AreaForm";
import Wilayah from "@iso/components/Form/AddCost/WilayahForm";
import nookies from "nookies";

Piutang.getInitialProps = async (context) => {
    const cookies = nookies.get(context);

    const req = await fetchData(cookies);
    const user = await req.json();

    const reqDataUserSales = await fetchUserSales(cookies);
    const dataUserSales = await reqDataUserSales.json();

    const reqLocation = await fetchLocation(cookies);
    const locations = await reqLocation.json();

    const reqPiutang = await fetchPiutang(cookies);
    const piutang = await reqPiutang.json();

    return {
      props: {
        user,
        dataUserSales,
        locations,
        piutang,
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

const fetchUserSales = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/users?populate=deep&filters[role][name][$eq]=Sales&?filters[role][type][$eq]=Sales";
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

const fetchPiutang = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/credits?populate=deep";
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

function Piutang({ props }) {
    const user = props.user;
    const locations = props.locations.data;
    const data = props.piutang;
    const dataUserSales = props.dataUserSales;
    const router = useRouter();
    const [piutang, setPiutang] = useState(data);
    const [supplier, setSupplier] = useState();
    const [searchParameters, setSearchParameters] = useState({});

    // Range Picker
    const { RangePicker } = DatePicker;

    const handleSetting = () => {
        router.push("/dashboard/biaya/piutang/setting");
    };

    const handleAdd = () => {
        router.push("/dashboard/biaya/piutang/tambah");
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

        const endpoint = process.env.NEXT_PUBLIC_URL + "/credits/" + data.id;
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
                "Piutang yang dipilih telah berhasil dihapus. Silahkan cek kembali piutang"
            );
            setPiutang(res);
        }
    };

    const handleDeleteRelation = async (data) => {
        var id = 0;
        data.attributes.credit_details.data.forEach((element) => {
            id = element.id;

            const endpoint = process.env.NEXT_PUBLIC_URL + "/credit-details/" + id;
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

    useEffect(() => {
      const searchQuery = async () => {
        let query = "";
        let startDate = "";
        let endDate = "";

        for (const key in searchParameters) {

          if (key === "customer" && searchParameters[key] !== null) {
            query += `filters[credit_details][customer][id]=${searchParameters[key].id}&`;
          } else { query += ""; }

          if (key === "status_pembayaran") {
            if (searchParameters[key] !== undefined) {
              query += `filters[${key}]=${searchParameters[key]}&`;
            } else { query += ""; }
          } else { query += ""; }

          if(key == "range" && searchParameters[key] !== null ){
            startDate = searchParameters?.range[0]?.format('YYYY-MM-DD');
            endDate = searchParameters?.range[1]?.format('YYYY-MM-DD');

            query += `filters[tanggal][$gte]=${startDate}&filters[tanggal][$lte]=${endDate}`;
          } else { query += ""; }

          if (key === "sales" && searchParameters[key] !== undefined) {
            query += `filters[credit_details][customer][sales_name]=${searchParameters[key]}&`;
          } else { query += ""; }

          if (key === "area" || key === "wilayah") {
            if (searchParameters[key] !== null) {
              query += `filters[credit_details][customer][${key}][id]=${searchParameters[key].id}&`;
            } else { query += ""; }
          } else { query += ""; }
        }

        const endpoint = process.env.NEXT_PUBLIC_URL + "/credits?populate=deep&" + query;

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

        setPiutang(res);
        //console.log("endpoint", endpoint, res);
      }

      searchQuery();
    }, [searchParameters]);

    return (
        <>
            <Head>
                <title>Daftar Penagihan Piutang Penjualan</title>
            </Head>
            <DashboardLayout>
                <LayoutWrapper style={{}}>
                    <TitlePage titleText={"Daftar Penagihan Piutang Penjualan"} />
                    <LayoutContent>
                        <div className="w-full flex justify-start">
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                              <Customer onChangeCustomer={(e) => setSearchParameters({ ...searchParameters, customer: e })} />
                            </div>
                            <div className="w-full md:w-1/4 px-3">
                                <Select
                                    placeholder="Status Penagihan"
                                    size="large"
                                    style={{
                                        width: "100%",
                                        marginRight: "10px",
                                    }}
                                    allowClear
                                    onChange={(e) => setSearchParameters({ ...searchParameters, status_pembayaran: e })}
                                >
                                    <Select.Option value="Dibayar">
                                        Dibayar
                                    </Select.Option>
                                    <Select.Option value="Belum Dibayar">
                                        Belum Dibayar
                                    </Select.Option>
                                </Select>
                            </div>
                            <div className="w-full md:w-1/4 px-3">
                              <RangePicker size="large" onChange={(e) => setSearchParameters({ ...searchParameters, range: e })} />
                            </div>
                            <div className="w-full md:w-1/4 mt-0 mb-2">
                                <div className="float-right">
                                    <button onClick={handleAdd} type="button" className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm mb-5 mx-2">
                                        <div className="text-white text-center text-sm font-bold">
                                            <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex justify-start -mt-6">
                            <div className="w-full md:w-1/4 px-3">
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
                            <div className="w-full md:w-1/4 px-3">
                                <Area onChangeArea={(e) => setSearchParameters({ ...searchParameters, area: e })} />
                            </div>
                            <div className="w-full md:w-1/4 px-3">
                                <Wilayah onChangeWilayah={(e) => setSearchParameters({ ...searchParameters, wilayah: e })} />
                            </div>
                            <div className="w-full md:w-1/4 mt-0 mb-2">
                                <div className="float-right">
                                    <button onClick={handleSetting} type="button" className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm mx-2">
                                        <div className="text-white text-center text-sm font-bold">
                                            <a className="text-white no-underline text-xs sm:text-xs">Setting</a>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex justify-start -mt-6">
                          <span className="text-black text-md font-bold ml-1 mt-5">Semua Penagihan</span>
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

                        <CreditTable
                          data={piutang}
                          onUpdate={handleUpdate}
                          onDelete={handleDelete}
                          //onPageChange={handlePageChange}
                          //onChangeStatus={onChangeStatus}
                          //user={user}
                        />
                    </LayoutContent>
                </LayoutWrapper>
            </DashboardLayout>
        </>
    );
}

export default Piutang;
