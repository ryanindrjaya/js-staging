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
import ReturLPBTable from "@iso/components/ReactDataTable/Purchases/ReturLPBTable";
import OrderTable from "@iso/components/ReactDataTable/Purchases/OrderTable";
import LPBTable from "@iso/components/ReactDataTable/Purchases/LPBTable";
import createDetailReturFunc from "../../utility/CreateReturDetail";
import createReturLPBFunc from "../../utility/CreateReturLPB";
import { useRouter } from "next/router";
import moment from "moment";

ReturLPB.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings/" + id + "?populate=deep";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };
  const res = await fetch(endpoint, options);
  const data = await res.json();

  const req = await fetchDataLocation(cookies);
  const locations = await req.json();

  return {
    props: {
      data,
      locations,
    },
  };
};

const fetchDataLocation = async (cookies) => {
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

function ReturLPB({ props }) {
    const locations = props.locations.data;
    const data = props.data.data; 
    var products = useSelector((state) => state.Order); //console.log("data nih:"); console.log(data.attributes.supplier.data.attributes.address)
    var selectedProduct = products?.productList;
    const dispatch = useDispatch();
    // Set data for show in table
    const productListData = data.attributes.purchasing_details.data;
    const [productList, setProductList] = useState([]);
    //products.productList.length = null;
    //productListData.forEach((element) => {
       //console.log("element baru"); console.log(productList.length)
       //products.productList.push(element.attributes.product.data);
    //}); //console.log("product list baru"); console.log(productList)
    //console.log(products)

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

    var totalReturs = String(props.purchases?.meta?.pagination.total + 1).padStart(3, "0");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    //const [qty, setQty] = useState([]);
    //productList.forEach(element => {
    //    console.log("elemen"); console.log(element);
    //    if (element.attributes.unit_order == element.attributes.product.data.attributes.unit_2) { console.log("masuk") }
    //    qty.push(element.attributes.total_order);
    //    //unit.push(element.attributes.unit_order);
    //    //onChangeQty(element.attributes.total_order, element.attributes.product.data);
    //    //onChangeUnit(element.attributes.unit_order, element.attributes.product.data);
    //});

    const { TextArea } = Input;
    var formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    });

    const onFinish = async (values) => {
        setLoading(true);
        setDataValues(values); console.log("values :"); console.log(values)
        setLoading(false);
    };

    const createDetailRetur = async () => {
        //console.log("info total", productTotalPrice, productSubTotal);
        console.log("detail retur :"); console.log(products)
        //createDetailReturFunc(products, productTotalPrice, productSubTotal, setListId, "/retur-lpb-details");
    };

    const createRetur = async (values) => {
        //console.log("Retur"); console.log(values);
        //createReturLPBFunc(grandTotal, totalPrice, values, listId, form, router);
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

    const fetchPOdata = async (data) => {
        //clearData();
        //setIsFetchingData(true);
        //const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings/" + id + "?populate=deep";
        ////const endpoint = process.env.NEXT_PUBLIC_URL + `/purchasings/${id}?populate=deep`;
        //const options = {
        //    method: "GET",
        //    headers: {
        //        "Content-Type": "application/json",
        //        Authorization: "Bearer " + cookies.token,
        //    },
        //};
        console.log("fetch nih:"); console.log(data.data.data.attributes)
        //const req = await fetch(endpoint, options);
        //const res = await req.json();

        const dataPO = data.data.data.attributes;
        const purchase_details = dataPO.purchasing_details.data;
        const supplier = dataPO.supplier.data;

        //setDiscPrice(0);
        //setPreOrderData(res.data);
        //setSupplier(supplier);
        //setGrandTotal(dataPO.delivery_total);
        //setBiayaPengiriman(dataPO.delivery_fee);

        //var dateString = dataPO.order_date;
        //var momentObj = moment(dateString, "YYYY-MM-DD");
        //var momentString = momentObj.format("MM-DD-YYYY");

        form.setFieldsValue({
            supplier_id: `${supplier.attributes.id_supplier} - ${supplier.attributes.name}`,
            //order_date: moment(momentString),
            location: dataPO.location.data.attributes.name,
            tempo_days: dataPO.tempo_days,
            tempo_time: dataPO.tempo_time,
            additional_fee_1_desc: dataPO.additional_fee_1_desc,
            additional_fee_2_desc: dataPO.additional_fee_2_desc,
            additional_fee_3_desc: dataPO.additional_fee_3_desc,
            additional_fee_4_desc: dataPO.additional_fee_4_desc,
            additional_fee_5_desc: dataPO.additional_fee_5_desc,
            additional_fee_1_sub: dataPO.additional_fee_1_sub,
            additional_fee_2_sub: dataPO.additional_fee_2_sub,
            additional_fee_3_sub: dataPO.additional_fee_3_sub,
            additional_fee_4_sub: dataPO.additional_fee_4_sub,
            additional_fee_5_sub: dataPO.additional_fee_5_sub,
            additional_note: dataPO.additional_note,
            delivery_fee: dataPO.delivery_fee,
            disc_type: null,
            disc_value: null,
            DPP_active: null,
            PPN_active: null,
            //EXP.Date
            //batch 
        });

        //setAdditionalFee({
        //    ...additionalFee,
        //    additional_fee_1_sub: dataPO.additional_fee_1_sub,
        //    additional_fee_2_sub: dataPO.additional_fee_2_sub,
        //    additional_fee_3_sub: dataPO.additional_fee_3_sub,
        //    additional_fee_4_sub: dataPO.additional_fee_4_sub,
        //    additional_fee_5_sub: dataPO.additional_fee_5_sub,
        //});

        //setNewGrandTotal(dataPO);

        dispatch({
            type: "SET_PREORDER_DATA",
            data: data.data,
        });

        purchase_details.forEach((element) => {
            var indexUnit = 1;
            var unitOrder = element.attributes.unit_order; console.log("product :"); console.log(element.attributes)
            var productUnit = element.attributes.product.data.attributes;

            for (let index = 1; index < 6; index++) {
                if (unitOrder === productUnit[`unit_${index}`]) {
                    indexUnit = index;
                }
            }

            const productId = element.attributes.product.data.id;
            var dateString = element.attributes.expired_date;
            var momentObj = moment(dateString, "YYYY-MM-DD");
            var momentString = momentObj.format("MM-DD-YYYY");

            form.setFieldsValue({
                disc_rp: {
                    [productId]: element.attributes.disc,
                },
                jumlah_option: {
                    [productId]: element.attributes.unit_order,
                },
                jumlah_qty: {
                    [productId]: element.attributes.total_order,
                },
                exp_date:{
                    [productId]: moment(momentString),
                },
                batch: {
                    [productId]: element.attributes.batch,
                },
            });

            //const test = form.getFieldsValue(["disc_rp", "jumlah_option", "jumlah_qty"]);
            //console.log("test :"); console.log(test)
            // SET INITIAL PRODUCT
            dispatch({
                type: "SET_INITIAL_PRODUCT",
                product: element.attributes.product.data,
                qty: element.attributes.total_order,
                unit: element.attributes.unit_order,
                unitIndex: indexUnit,
                priceUnit: element.attributes.unit_price,
                disc: element.attributes.disc,
                priceAfterDisc: element.attributes.unit_price_after_disc,
                subTotal: element.attributes.sub_total,
                d1: element.attributes.product.data.attributes.unit_1_dp1,
                d2: element.attributes.product.data.attributes.unit_1_dp2,
                d3: element.attributes.product.data.attributes.unit_1_dp3,
                batch: element.attributes.batch,
                expired_date: moment(momentString),
            });
        });
        setTimeout(() => {
            //setIsFetchingData(false);
        }, 3000);
    };

    const clearData = () => {
        dispatch({ type: "CLEAR_DATA" });
        setTotalPrice(0);
    };

    //useEffect(() => {
    //    setGrandTotal(totalPrice);
    //}, [totalPrice]);

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
        console.log("createRetur :"); console.log(dataValues);
        if (listId.length > 0) {
            createRetur(dataValues);
        } //console.log("listId 3:"); console.log(listId);
    }, [listId]);

    useEffect(() => { console.log("data value : "); console.log(dataValues)
      if (dataValues) createDetailRetur();
    }, [dataValues]);

    useEffect(() => {
      clearData();
      fetchPOdata(props);
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
                <title>Retur LPB</title>
            </Head>
            <DashboardLayout>
                <LayoutWrapper style={{}}>
                    <TitlePage titleText={"Retur Lembar Pembelian Barang"} />
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
                                        name="no_retur_LPB"
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
                                        name="tanggal_retur"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Tanggal tidak boleh kosong!",
                                            },
                                        ]}
                                    >
                                        <DatePicker placeholder="Tanggal Retur" size="large" format={"DD/MM/YYYY"} style={{ width: "100%" }} />
                                    </Form.Item>
                                </div>
                                <div className="w-full md:w-2/4 px-3 mb-2 md:mb-0">
                                    <p className="font-bold m-0"
                                        name="purchasings" value={data.attributes.no_purchasing}>
                                        No LPB : {data.attributes.no_purchasing}</p>
                                    <p className="font-bold m-0">No Nota Supplier : {data.attributes.no_nota_suppplier}</p>
                                    <p className="font-bold m-0">Tanggal Pembelian : {data.attributes.date_purchasing}</p>
                                    {/*<p className="m-0"> {supplier?.attributes.address}</p>*/}
                                    {/*<p> {supplier?.attributes.phone}</p>*/}
                                </div>
                                <div className="w-full md:w-3/4 px-3 mb-2 md:mb-0">
                                    <p className="font-bold m-0">Alamat Supplier : {data.attributes.supplier.data.attributes.address}</p>
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
                                    <ReturLPBTable
                                        products={products}
                                        productTotalPrice={productTotalPrice}
                                        setTotalPrice={setTotalPrice}
                                        calculatePriceAfterDisc={calculatePriceAfterDisc}
                                        productSubTotal={productSubTotal}
                                        formObj={form}
                                        locations={locations}
                                    />
                                    
                                    {/*<OrderTable*/}
                                    {/*    products={products}*/}
                                    {/*    productTotalPrice={productTotalPrice}*/}
                                    {/*    setTotalPrice={setTotalPrice}*/}
                                    {/*    calculatePriceAfterDisc={calculatePriceAfterDisc}*/}
                                    {/*    productSubTotal={productSubTotal}*/}
                                    {/*    formObj={form} */}
                                    {/*/>*/}

                                    {/*<LPBTable*/}
                                    {/*    products={products}*/}
                                    {/*    productTotalPrice={productTotalPrice}*/}
                                    {/*    setTotalPrice={setTotalPrice}*/}
                                    {/*    //setProductTotalPrice={setProductTotalPrice}*/}
                                    {/*    calculatePriceAfterDisc={calculatePriceAfterDisc}*/}
                                    {/*    productSubTotal={productSubTotal}*/}
                                    {/*    locations={locations}*/}
                                    {/*    formObj={form}*/}
                                    {/*/>*/}
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
                                        Retur
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

export default ReturLPB;
