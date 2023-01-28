import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { Input, notification, Select, DatePicker, Form } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import DebtTable from "@iso/components/ReactDataTable/Cost/DebtTable";
import Supplier from "@iso/components/Form/AddCost/SupplierForm";
import nookies from "nookies";

Setting.getInitialProps = async (context) => {
    const cookies = nookies.get(context);

    //const req = await fetchData(cookies);
    //const user = await req.json();

    //const reqLocation = await fetchLocation(cookies);
    //const locations = await reqLocation.json();

    //const reqHutang = await fetchHutang(cookies);
    //const hutang = await reqHutang.json();

    return {
      props: {
        //user,
        //locations,
        //hutang,
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

function Setting({ props }) {
    //const user = props.user;
    //const locations = props.locations.data;
    //const data = props.hutang;
    //const router = useRouter();
    //const [hutang, setHutang] = useState(data);
    //const [supplier, setSupplier] = useState();

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

    const openNotificationWithIcon = (type, title, message) => {
        notification[type]({
            message: title,
            description: message,
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
                      <Form
                          //form={form}
                          //name="add"
                          initialValues={{
                            remember: true,
                          }}
                          //onFinish={onFinish}
                          //onFinishFailed={validateError}
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
                                <Form.Item name="akun_bayar1" noStyle>
                                    <Select
                                        size="large"
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Akun Pembayaran"
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
                                    <Select
                                        size="large"
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Akun Pembayaran"
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
                        </div>

                      </Form>
                    </LayoutContent>
                </LayoutWrapper>
            </DashboardLayout>
        </>
    );
}

export default Setting;
