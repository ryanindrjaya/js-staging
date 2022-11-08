import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import Supplier from "@iso/components/Form/AddOrder/SupplierForm";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import { Form, Input, DatePicker, Button, message, Upload, Select, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import nookies from "nookies";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import Lpb from "@iso/components/Form/AddRetur/LpbForm";
import { useSelector, useDispatch } from "react-redux";
import calculatePrice from "../../utility/calculatePrice";
import OrderTable from "@iso/components/ReactDataTable/Purchases/OrderTable";
import createDetailReturFunc from "../../utility/createReturDetail";
import createReturFunc from "../../utility/createRetur";
import { useRouter } from "next/router";

ReturLpb.getInitialProps = async (context) => {
    const cookies = nookies.get(context);
    const reqLocation = await fetchLocation(cookies);
    const location = await reqLocation.json();

    return {
        props: {
            location,
        },
    };
};

const fetchLocation = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/locations?populate=deep";
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

function ReturLpb({ props }) {
    const locations = props.location.data;
    var products = useSelector((state) => state.Order);
    var selectedProduct = products?.productList;
    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [supplier, setSupplier] = useState();
    const [lpb, setLpb] = useState();
    const [dataValues, setDataValues] = useState();
    const [productTotalPrice, setProductTotalPrice] = useState({});
    const [productSubTotal, setProductSubTotal] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [listId, setListId] = useState([]);
    const router = useRouter();

    const tempList = [];

    var totalReturs = String(props.purchases?.meta?.pagination.total + 1).padStart(3, "0"); console.log(props)
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    const { TextArea } = Input;
    var formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    });

    const onFinish = async (values) => {
        setLoading(true);
        setDataValues(values);
        setLoading(false);
    };

    const createDetailRetur = async () => {
        console.log("info total", productTotalPrice, productSubTotal);
        createDetailReturFunc(products, productTotalPrice, productSubTotal, setListId, "/retur-details");
    };

    const createRetur = async (values) => {
        console.log("Retur");
        createReturFunc(grandTotal, totalPrice, values, listId, form, router);
    };

    const onChangeProduct = async () => {
        var isDuplicatedData = false;

        tempList.find((item) => {
            productList.forEach((element) => {
                if (element.id === item.id) isDuplicatedData = true;
            });
        });

        if (!isDuplicatedData) {
            setProductList((productList) => [...productList, tempList[0]]);
            toast.success("Produk berhasil ditambahkan!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            });
        }
    };

    const calculatePriceAfterDisc = (row) => {
        const total = calculatePrice(
            row,
            products,
            productTotalPrice,
            productSubTotal,
            setTotalPrice
        );

        return formatter.format(total);
    };

    useEffect(() => {
        setGrandTotal(totalPrice);
    }, [totalPrice]);

    useEffect(() => {
        var total = 0;
        for (var key in productTotalPrice) {
            total = total + productTotalPrice[key];
        }
    }, [totalPrice]);

    useEffect(() => {
        //console.log("listId 1:"); console.log(listId);
        if (listId.length > 0) {
            createRetur(dataValues); console.log("listId 2:"); console.log(listId);
        } //console.log("listId 3:"); console.log(listId);
    }, [listId]);

    useEffect(() => {
        if (dataValues) createDetailRetur();
    }, [dataValues]);

    useEffect(() => {
        dispatch({ type: "CLEAR_DATA" });
    }, []);

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
                <title>Retur Pembelian LPB</title>
            </Head>
            <DashboardLayout>
                <LayoutWrapper style={{}}>
                    <TitlePage titleText={"Retur Pembelian LPB"} />
                    <LayoutContent>
                        <Form
                            form={form}
                            name="retur"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <div className="flex flex-wrap -mx-3 mb-3">
                                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                    <Form.Item
                                        name="no_retur"
                                        initialValue={`RB/${totalReturs}/${mm}/${yyyy}`}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Nomor Retur tidak boleh kosong!",
                                            },
                                        ]}
                                    >
                                        <Input style={{ height: "40px" }} placeholder="No.Retur" />
                                    </Form.Item>
                                </div>
                                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                    <Form.Item
                                        name="retur_date"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Tanggal tidak boleh kosong!",
                                            },
                                        ]}
                                    >
                                        <DatePicker
                                            placeholder="Tanggal Retur"
                                            size="large"
                                            format={"DD/MM/YYYY"}
                                            style={{ width: "100%" }}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="w-full md:w-2/4 px-3 mb-2 md:mb-0">
                                    <p className="font-bold m-0">No LPB : </p>
                                    <p className="font-bold m-0">No Nota Supplier : </p>
                                    <p className="font-bold m-0">Tanggal Pembelian : </p>
                                    {/*<p className="m-0"> {supplier?.attributes.address}</p>*/}
                                    {/*<p> {supplier?.attributes.phone}</p>*/}
                                </div>
                                <div className="w-full md:w-3/4 px-3 mb-2 md:mb-0">
                                    <p className="font-bold m-0">Alamat Supplier : </p>
                                    {/*<p className="m-0"> {supplier?.attributes.address}</p>*/}
                                    {/*<p> {supplier?.attributes.phone}</p>*/}
                                </div>
                                <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">
                                    <SearchBar
                                        form={form}
                                        tempList={tempList}
                                        onChange={onChangeProduct}
                                        selectedProduct={selectedProduct}
                                    />
                                </div>
                                <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">
                                    <OrderTable
                                        products={products}
                                        productTotalPrice={productTotalPrice}
                                        setTotalPrice={setTotalPrice}
                                        calculatePriceAfterDisc={calculatePriceAfterDisc}
                                        productSubTotal={productSubTotal}
                                        formObj={form}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-start md:justify-between">
                                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                    <Form.Item
                                        name="pajak"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Pajak tidak boleh kosong!",
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Pajak Pembelian"
                                            size="large"
                                            style={{
                                                width: "100%",
                                            }}
                                        >
                                            <Select.Option
                                                value="Pajak Pembelian"
                                                key="Pajak Pembelian"
                                            >
                                                Pajak Pembelian
                                            </Select.Option>
                                            <Select.Option
                                                value="Non Pajak"
                                                key="Non Pajak"
                                            >
                                                Non Pajak
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <p className="font-bold">Total Item : {products.productList.length} </p>
                            </div>
                            <div className="flex justify-end">
                                <p className="font-bold">Total Harga : {formatter.format(totalPrice)} </p>
                            </div>
                            <Form.Item name="catatan">
                                <TextArea rows={4} placeholder="Catatan Tambahan" />
                            </Form.Item>
                            <Form.Item className="mt-5">
                                {loading ? (
                                    <div className=" flex float-left ml-3 ">
                                        <Spin />
                                    </div>
                                ) : (
                                    <Button onClick={validateError} htmlType="submit" className=" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1">
                                        Tambah
                                    </Button>
                                )}
                            </Form.Item>
                        </Form>
                    </LayoutContent>
                </LayoutWrapper>
            </DashboardLayout>
        </>
    );
}

export default ReturLpb;
