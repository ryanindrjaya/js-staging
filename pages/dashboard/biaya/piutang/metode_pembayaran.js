import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { Input, notification, Select, DatePicker, Form, InputNumber } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import nookies from "nookies";
import { useDispatch } from "react-redux";

Bayar.getInitialProps = async (context) => {
    const cookies = nookies.get(context);
    const value = context.query;
    var id = value.id;
    var url = null;

    return {
      props: {
        //user,
        //locations,
        //hutang,
        value,
      },
    };
};

function Bayar({ props }) {
    const dispatch = useDispatch();

    //const user = props.user;
    //const locations = props.locations.data;
    const data = props.value; console.log("data",data)
    //const router = useRouter();
    //const [hutang, setHutang] = useState(data);
    //const [supplier, setSupplier] = useState();
    const [loading, setLoading] = useState(false);
    const [sisaPiutang, setSisaPiutang] = useState(data.total);
    const [metode, setMetode] = useState("");
    const [biaya, setBiaya] = useState(0);

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

    var formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    });

    const onFinish = (values) => {
        setLoading(true);
        //dispatch({ type: "CHANGE_DATA_TUNAI", tunai: value, listData: data, index: index });
        setLoading(false);
    };

    const onChangeMetode = (value) => {
        setMetode(value);
        //onChangeBayar(biaya,value);
    };

    const onChangeBayar = (value, metode) => {
        console.log("bayar", metode)
        var tunai = 0;
        var transfer = 0;
        var giro = 0;
        var cn = 0;
        var oth = 0;

        setBiaya(value);
        if (metode == "tunai") tunai = value;
        if (metode == "transfer") transfer = value;
        if (metode == "giro") giro = value;
        if (metode == "cn") cn = value;
        if (metode == "oth") oth = value;

        setSisaPiutang(data.total - (tunai + transfer + giro + cn + oth));
        //dispatch({ type: "CHANGE_DATA_GIRO", giro: value, listData: data, index: index });
        //onChangeSisaHutang(value, data, index);
    };

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
                <title>METODE PEMBAYARAN</title>
            </Head>
            <DashboardLayout>
                <LayoutWrapper style={{}}>
                    <TitlePage titleText={"METODE PEMBAYARAN"} />
                    <LayoutContent>
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
                            <span className="font-bold">TOTAL PIUTANG</span>
                          </div>
                        </div>

                        <div className="w-full flex justify-start mb-4">
                          <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0 text-center">
                            <span className="font-bold">{formatter.format(data.total)}</span>
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
                                        placeholder="Akun Pembayaran"
                                        onChange={(value) => onChangeMetode(value)}
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
                                <Form.Item name="bayar1" noStyle>
                                  <InputNumber
                                    size="large"
                                    max={data.total}
                                    min={0}
                                    style={{
                                      width: "100%",
                                      marginRight: "10px",
                                    }}
                                    onChange={(value) => onChangeBayar(value, metode)}
                                  />
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
                                        placeholder="Akun Pembayaran"
                                        onChange={(value) => onChangeMetode(value)}
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
                                <Form.Item name="bayar2" noStyle>
                                  <InputNumber
                                    size="large"
                                    min={0}
                                    style={{
                                      width: "100%",
                                      marginRight: "10px",
                                    }}
                                    onChange={(value) => onChangeBayar(value, metode)}
                                  />
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
                                        placeholder="Akun Pembayaran"
                                        onChange={(value) => onChangeMetode(value)}
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
                                <Form.Item name="bayar3" noStyle>
                                  <InputNumber
                                    size="large"
                                    min={0}
                                    style={{
                                      width: "100%",
                                      marginRight: "10px",
                                    }}
                                    onChange={(value) => onChangeBayar(value, metode)}
                                  />
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
                                        placeholder="Akun Pembayaran"
                                        onChange={(value) => onChangeMetode(value)}
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
                                <Form.Item name="bayar4" noStyle>
                                  <InputNumber
                                    size="large"
                                    min={0}
                                    style={{
                                      width: "100%",
                                      marginRight: "10px",
                                    }}
                                    onChange={(value) => onChangeBayar(value, metode)}
                                  />
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
                                        placeholder="Akun Pembayaran"
                                        onChange={(value) => onChangeMetode(value)}
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
                                <Form.Item name="bayar5" noStyle>
                                  <InputNumber
                                    size="large"
                                    min={0}
                                    style={{
                                      width: "100%",
                                      marginRight: "10px",
                                    }}
                                    onChange={(value) => onChangeBayar(value, metode)}
                                  />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="w-full flex justify-start mt-4">
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0 text-center">
                                <span className="font-bold">SISA PIUTANG</span>
                            </div>
                        </div>

                        <div className="w-full flex justify-start mb-4">
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0 text-center">
                                <span className="font-bold">{formatter.format(sisaPiutang)}</span>
                            </div>
                        </div>

                        <div className="w-full flex justify-start">
                          <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0 text-center">
                            <Form.Item>
                                {loading ? (
                                    <div className=" flex float-left ml-3 ">
                                    <Spin />
                                    </div>
                                ) : (
                                    <button htmlType="submit" className="bg-cyan-700 rounded-md m-1 text-sm px-4">
                                    <p className="px-4 py-2 m-0 text-white">
                                        SIMPAN
                                    </p>
                                    </button>
                                )}
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

export default Bayar;
