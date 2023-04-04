import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Input, notification, Select, DatePicker } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import DebtTable from "@iso/components/ReactDataTable/Cost/DebtTable";
import Supplier from "@iso/components/Form/AddCost/SupplierForm";
import nookies from "nookies";
import tokenVerify from "../../../../authentication/tokenVerify";

Hutang.getInitialProps = async (context) => {
    const cookies = nookies.get(context);

    const req = await fetchData(cookies);
    const user = await req.json();

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
    const dispatch = useDispatch();
    const [searchParameters, setSearchParameters] = useState({});

    // Range Picker
    const { RangePicker } = DatePicker;

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

    useEffect(() => {
      const searchQuery = async () => {
        let query = "";
        let startDate = "";
        let endDate = "";

        for (const key in searchParameters) {

          if (key === "supplier" && searchParameters[key] !== null) {
            query += `filters[${key}\][id]=${searchParameters[key].id}&`;
          } else { query += ""; }

          if (key === "no_hutang" || key === "status") {
            if (searchParameters[key] !== undefined) {
              query += `filters[${key}]=${searchParameters[key]}&`;
            } else { query += ""; }
          } else { query += ""; }

          if(key == "range" && searchParameters[key] !== null ){
            startDate = searchParameters?.range[0]?.format('YYYY-MM-DD');
            endDate = searchParameters?.range[1]?.format('YYYY-MM-DD');

            query += `filters[tanggal_pembayaran][$gte]=${startDate}&filters[tanggal_pembayaran][$lte]=${endDate}`;
          } else { query += ""; }

        }

        const endpoint = process.env.NEXT_PUBLIC_URL + "/debts?populate=deep&" + query;

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

        setHutang(res);
        console.log("endpoint", endpoint, res);
      }

      searchQuery();
    }, [searchParameters]);

    return (
        <>
            <Head>
                <title>Pembayaran Pembelian</title>
            </Head>
            <DashboardLayout>
                <LayoutWrapper style={{}}>
                    <TitlePage titleText={"Daftar Pembayaran Pembelian"} />
                    <LayoutContent>
                        <div className="w-full flex justify-start">
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <Supplier
                                  onChangeSupplier={(e) => setSearchParameters({ ...searchParameters, supplier: e })}
                                />
                            </div>
                            <div className="w-full md:w-1/4 px-3">
                                <Select
                                    placeholder="No Pembayaran"
                                    size="large"
                                    style={{
                                        width: "100%",
                                        marginRight: "10px",
                                    }}
                                    allowClear
                                    onChange={(e) => setSearchParameters({ ...searchParameters, no_hutang: e })}
                                >
                                    {data.data?.map((element) => {
                                      return (
                                        <Select.Option value={element.attributes.no_hutang} key={element.id}>
                                          {element.attributes.no_hutang}
                                        </Select.Option>
                                      );
                                    })}
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
                                    onChange={(e) => setSearchParameters({ ...searchParameters, status: e })}
                                    //onChange={value => onSearch(value, "pembayaran")}
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
