import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { Input, notification, Select, DatePicker, Form, Spin } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import Supplier from "@iso/components/Form/AddCost/SupplierForm";
import DebtTable from "@iso/components/ReactDataTable/Cost/DebtAccountTable";
import nookies from "nookies";
import { toast } from "react-toastify";

Setting.getInitialProps = async (context) => {
    const cookies = nookies.get(context);

    //const req = await fetchData(cookies);
    //const user = await req.json();

    //const reqLocation = await fetchLocation(cookies);
    //const locations = await reqLocation.json();

    //const reqHutang = await fetchHutang(cookies);
    //const hutang = await reqHutang.json();

    const reqAkun = await fetchAkun(cookies);
    const akun = await reqAkun.json();

    return {
      props: {
        //user,
        //locations,
        //hutang,
        akun
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

const fetchAkun = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/debt-accounts?populate=deep";
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

function Setting({ props }) {
    //const user = props.user;
    //const locations = props.locations.data;
    //const data = props.hutang;
    const akunData = props.akun;
    const router = useRouter();
    //const [hutang, setHutang] = useState(data);
    //const [supplier, setSupplier] = useState();
    const [akun, setAkun] = useState(akunData);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState();
    const [tunaiData, setTunaiData] = useState();
    const [transferData, setTransferData] = useState();

    //const handleSetting = () => {
    //    router.push("/dashboard/biaya/hutang/setting");
    //};

    //const handleAdd = () => {
    //    router.push("/dashboard/biaya/hutang/tambah");
    //};

    //const handleUpdate = (id) => {
    //    // router.push("/dashboard/pembelian/order_pembelian/edit/" + id);
    //    openNotificationWithIcon(
    //        "info",
    //        "Work In Progress",
    //        "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    //    );
    //};

    const handleDelete = async (id) => {
        const endpoint = process.env.NEXT_PUBLIC_URL + "/debt-accounts/" + id;
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
                "Akun hutang yang dipilih telah berhasil dihapus. Silahkan cek kembali akun hutang"
            );
            setAkun(res);
            router.reload("/dashboard/biaya/hutang/setting");
        }
    };

    const handlePageChange = async (page) => {
        const cookies = nookies.get(null, "token");
        const endpoint = process.env.NEXT_PUBLIC_URL + "/debt-accounts?pagination[page]=" + page;

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + cookies.token,
            },
        };

        try {
            const req = await fetch(endpoint, options);
            const res = await req.json();
            if (res) {
                setPurchase((prevData) => ({
                    data: filterDuplicateData(prevData.data.concat(res.data)),
                    meta: prevData.meta,
                }));
            } else {
                console.log("something is wrong");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleTambahAkun = () => {
        router.push("/dashboard/biaya/hutang/tambahakun");
    };

    const changeSelectOption = (value, idx) => {console.log("value idx",value,idx)
        setSelected(value);

        //var temp = [];
        //if (value === "tunai") {
        //    temp = [];
        //    akun.data.map((element) => {
        //        if (element.attributes.type == "Tunai") {
        //            temp.push(element);
        //        }
        //    });
        //    setTunaiData(temp);
        //} else if (value === "transfer") {
        //    //type = "transfer";
        //} else if (value === "giro") {
        //    //type = "giro";
        //} else if (value === "cn") {
        //    //type = "cn";
        //} else if (value === "oth") {
        //    //type = "oth";
        //}
    };

    const onFinish = (values) => {
        setLoading(true); console.log(values)
        //setDataValues(values);
        setLoading(false);
    };

    //const tunai =
    //    tunaiData.map((element) => (
    //        {
    //          key: element.id,
    //          value: element.attributes.nama,
    //          label: element.attributes.nama,
    //        }
    //    ))
    //;

    //let type = [];
    //useEffect(() => {
    //    var temp = [];
    //    if (selected === "tunai") {
    //        temp = [];
    //        akun.data.map((element) => {
    //            if (element.attributes.type == "Tunai") {
    //              temp.push(element);
    //            }
    //        });
    //        setTunaiData(temp);
    //        type = temp;
    //    } else if (selected === "transfer") {
    //        temp = [];
    //        akun.data.map((element) => {
    //            if (element.attributes.type == "Transfer") {
    //                temp.push(element);
    //            }
    //        });
    //        setTransferData(temp);
    //        type = temp;
    //    } else if (selected === "giro") {
    //        type = "giro";
    //    } else if (selected === "cn") {
    //        type = "cn";
    //    } else if (selected === "oth") {
    //        type = "oth";
    //    }
    //    console.log("temp", temp, tunaiData, type, selected)
    //}, [selected]);

    useEffect(() => {
      var akunData = akun;
      setAkun(akunData);
    }, [akun]);

    const openNotificationWithIcon = (type, title, message) => {
        notification[type]({
            message: title,
            description: message,
        });
    };

    const validateError = () => {
        var listError = form.getFieldsError();
        listError.forEach((element) => {
            if (element.errors[0]) {
                notification["error"]({
                    message: "Field Kosong",
                    description: element.errors[0],
                });
            }
        });
    };

    return (
        <>
            <Head>
                <title>AKUN PEMBAYARAN HUTANG PEMBELIAN</title>
            </Head>
            <DashboardLayout>
                <LayoutWrapper style={{}}>
                    <TitlePage titleText={"AKUN PEMBAYARAN HUTANG PEMBELIAN"} />
                    <LayoutContent>

                      <div className="w-full flex justify-end">
                        <button htmlType="button" className="bg-cyan-700 rounded-md m-1 text-sm" onClick={handleTambahAkun}>
                            <p className="px-4 py-2 m-0 text-white">
                                + Tambah Akun
                            </p>
                        </button>
                      </div>

                      <Form
                          //form={form}
                          //name="add"
                          initialValues={{
                            remember: true,
                          }}
                          onFinish={onFinish}
                          onFinishFailed={validateError}
                      >
                        <div className="w-full flex justify-start">
                          <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0 text-center">
                            <span className="font-bold">METODE PEMBAYARAN</span>
                          </div>
                          <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0 text-center">
                            <span className="font-bold">AKUN PEMBAYARAN</span>
                          </div>
                        </div>

                        <div className="w-full flex justify-start">
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <Form.Item name="metode_bayar1" noStyle>
                                    <Select
                                        size="large"
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Metode Pembayaran"
                                        onChange={(value, idx) => changeSelectOption(value,idx)}
                                    >
                                        <Select.Option name="metode_bayar1" value="tunai" key="tunai">
                                            Tunai
                                        </Select.Option>
                                        <Select.Option name="metode_bayar1" value="transfer" key="transfer">
                                            Bank Transfer
                                        </Select.Option>
                                        <Select.Option name="metode_bayar1" value="giro" key="giro">
                                            Bank Giro
                                        </Select.Option>
                                        <Select.Option name="metode_bayar1" value="cn" key="cn">
                                            CN
                                        </Select.Option>
                                        <Select.Option name="metode_bayar1" value="oth" key="oth">
                                            OTH
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <Form.Item name="akun_bayar1" noStyle>
                                    <Select
                                        size="large"
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Akun Pembayaran"
                                        //options={type}
                                    >
                                    {/*{akun.data.map((element) => (*/}
                                    {/*<Select.Option value= {element.attributes.nama} key= {element.id}>*/}
                                    {/*    {element.attributes.nama}*/}
                                    {/*</Select.Option>*/}
                                    {/*)) }*/}

                                    {/*{selected != null ? (*/}
                                    {/*    tunaiData.map((element) => (*/}
                                    {/*    <Select.Option value={element.attributes.nama} key={element.id}>*/}
                                    {/*        {element.attributes.nama}*/}
                                    {/*    </Select.Option>*/}
                                    {/*  ))*/}
                                    {/*) : (*/}
                                    {/*    <Select.Option disabled>*/}
                                    {/*      Pilih metode pembayaran dulu*/}
                                    {/*    </Select.Option>*/}
                                    {/*)}*/}

                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="w-full flex justify-start">
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <Form.Item name="metode_bayar2" noStyle>
                                    <Select
                                        size="large"
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Metode Pembayaran"
                                    >
                                        <Select.Option value="tunai" key="tunai">
                                            Tunai
                                        </Select.Option>
                                        <Select.Option value="transfer" key="transfer">
                                            Bank Transfer
                                        </Select.Option>
                                        <Select.Option value="giro" key="giro">
                                            Bank Giro
                                        </Select.Option>
                                        <Select.Option value="cn" key="cn">
                                            CN
                                        </Select.Option>
                                        <Select.Option value="oth" key="oth">
                                            OTH
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <Form.Item name="akun_bayar2" noStyle>
                                    <Select
                                        size="large"
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Akun Pembayaran"
                                    >

                                    {/*{tunaiData != null ? (*/}
                                    {/*  tunaiData.map((element) => (*/}
                                    {/*    <Select.Option value={element.attributes.nama} key={element.id}>*/}
                                    {/*        {element.attributes.nama}*/}
                                    {/*    </Select.Option>*/}
                                    {/*  ))*/}
                                    {/*) : (*/}
                                    {/*    <Select.Option disabled>*/}
                                    {/*      Pilih metode pembayaran dulu*/}
                                    {/*    </Select.Option>*/}
                                    {/*)}*/}

                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="w-full flex justify-start">
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <Form.Item name="metode_bayar3" noStyle>
                                    <Select
                                        size="large"
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Metode Pembayaran"
                                    >
                                        <Select.Option value="tunai" key="tunai">
                                            Tunai
                                        </Select.Option>
                                        <Select.Option value="transfer" key="transfer">
                                            Bank Transfer
                                        </Select.Option>
                                        <Select.Option value="giro" key="giro">
                                            Bank Giro
                                        </Select.Option>
                                        <Select.Option value="cn" key="cn">
                                            CN
                                        </Select.Option>
                                        <Select.Option value="oth" key="oth">
                                            OTH
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <Form.Item name="akun_bayar3" noStyle>
                                    <Select
                                        size="large"
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Akun Pembayaran"
                                    >
                                    {/*{akun.data.map((element) => (*/}
                                    {/*    <Select.Option value={element.attributes.nama} key={element.id}>*/}
                                    {/*        {element.attributes.nama}*/}
                                    {/*    </Select.Option>*/}
                                    {/*))}*/}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="w-full flex justify-start">
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <Form.Item name="metode_bayar4" noStyle>
                                    <Select
                                        size="large"
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Metode Pembayaran"
                                    >
                                        <Select.Option value="tunai" key="tunai">
                                            Tunai
                                        </Select.Option>
                                        <Select.Option value="transfer" key="transfer">
                                            Bank Transfer
                                        </Select.Option>
                                        <Select.Option value="giro" key="giro">
                                            Bank Giro
                                        </Select.Option>
                                        <Select.Option value="cn" key="cn">
                                            CN
                                        </Select.Option>
                                        <Select.Option value="oth" key="oth">
                                            OTH
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <Form.Item name="akun_bayar4" noStyle>
                                    {/*<Select*/}
                                    {/*    size="large"*/}
                                    {/*    style={{*/}
                                    {/*        width: "100%",*/}
                                    {/*    }}*/}
                                    {/*    placeholder="Akun Pembayaran"*/}
                                    {/*>*/}
                                    {/*{akun.data.map((element) => (*/}
                                    {/*    <Select.Option value={element.attributes.nama} key={element.id}>*/}
                                    {/*        {element.attributes.nama}*/}
                                    {/*    </Select.Option>*/}
                                    {/*))}*/}
                                    {/*</Select>*/}
                                </Form.Item>
                            </div>
                        </div>

                        <div className="w-full flex justify-start">
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <Form.Item name="metode_bayar5" noStyle>
                                    <Select
                                        size="large"
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Metode Pembayaran"
                                    >
                                        <Select.Option value="tunai" key="tunai">
                                            Tunai
                                        </Select.Option>
                                        <Select.Option value="transfer" key="transfer">
                                            Bank Transfer
                                        </Select.Option>
                                        <Select.Option value="giro" key="giro">
                                            Bank Giro
                                        </Select.Option>
                                        <Select.Option value="cn" key="cn">
                                            CN
                                        </Select.Option>
                                        <Select.Option value="oth" key="oth">
                                            OTH
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <Form.Item name="akun_bayar5" noStyle>
                                    <Select
                                        size="large"
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Akun Pembayaran"
                                    >
                                    {/*{akun.data.map((element) => (*/}
                                    {/*    <Select.Option value={element.attributes.nama} key={element.id}>*/}
                                    {/*        {element.attributes.nama}*/}
                                    {/*    </Select.Option>*/}
                                    {/*))}*/}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="w-full flex justify-start">
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <Form.Item name="metode_bayar6" noStyle>
                                    <Select
                                        size="large"
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Metode Pembayaran"
                                    >
                                        <Select.Option value="tunai" key="tunai">
                                            Tunai
                                        </Select.Option>
                                        <Select.Option value="transfer" key="transfer">
                                            Bank Transfer
                                        </Select.Option>
                                        <Select.Option value="giro" key="giro">
                                            Bank Giro
                                        </Select.Option>
                                        <Select.Option value="cn" key="cn">
                                            CN
                                        </Select.Option>
                                        <Select.Option value="oth" key="oth">
                                            OTH
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <Form.Item name="akun_bayar6" noStyle>
                                    <Select
                                        size="large"
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Akun Pembayaran"
                                    >
                                    {/*{akun.data.map((element) => (*/}
                                    {/*    <Select.Option value={element.attributes.nama} key={element.id}>*/}
                                    {/*        {element.attributes.nama}*/}
                                    {/*    </Select.Option>*/}
                                    {/*))}*/}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="w-full flex justify-start">
                          <Form.Item>
                            {loading ? (
                                <div className=" flex float-left ml-3 ">
                                    <Spin />
                                </div>
                            ) : (
                                <button htmlType="submit" className="bg-cyan-700 rounded-md m-1 text-sm mt-4">
                                    <p className="px-4 py-2 m-0 text-white">
                                        SIMPAN
                                    </p>
                                </button>
                            )}
                          </Form.Item>
                        </div>

                        <DebtTable
                          data={akun}
                          //onUpdate={handleUpdate}
                          onDelete={handleDelete}
                          onPageChange={handlePageChange}
                          //onChangeStatus={onChangeStatus}
                          //user={user}
                        />

                      </Form>
                    </LayoutContent>
                </LayoutWrapper>
            </DashboardLayout>
        </>
    );
}

export default Setting;
