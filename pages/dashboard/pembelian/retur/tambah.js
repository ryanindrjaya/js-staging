import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import Supplier from "@iso/components/Form/AddOrder/SupplierForm";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import { Form, Input, DatePicker, Button, message, Upload, Select, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import nookies from "nookies";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import calculatePrice from "../utility/calculatePrice";
import LPBTable from "@iso/components/ReactDataTable/Purchases/LPBTable";
import createDetailReturFunc from "../utility/createReturDetail";
import createReturFunc from "../utility/createRetur";
import { useRouter } from "next/router";

Retur.getInitialProps = async (context) => {
    const cookies = nookies.get(context);

  const reqLocation = await fetchLocation(cookies);
  const location = await reqLocation.json();

  const reqDataRetur = await fetchDataRetur(cookies);
  const returs = await reqDataRetur.json();

  const reqDataReturLPB = await fetchDataReturLPB(cookies);
  const returLPBs = await reqDataReturLPB.json();

  return {
    props: {
      location,
      returs,
      returLPBs,
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

const fetchDataRetur = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/returs?populate=deep";
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

const fetchDataReturLPB = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/retur-lpbs?populate=deep";
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

function Retur({ props }) {
  const locations = props.location.data; console.log("data props :"); console.log(props);
  const returLPB = props.returLPBs.data;
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

  var totalReturs = String(props.returs?.meta?.pagination.total + 1).padStart(3, "0");
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
    setDataValues(values); //console.log("Retur detail : "); console.log(dataValues);
    setLoading(false);
  };

  const createDetailRetur = async () => {
    console.log("info total", productTotalPrice, productSubTotal); //console.log("Retur detail : "); console.log(dataValues);
    createDetailReturFunc(products, productTotalPrice, productSubTotal, setListId, "/retur-details", dataValues);
  };

  const createRetur = async (values) => { //console.log("Retur"); //console.log("masuk");
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
    if (listId.length > 0) {
      createRetur(dataValues);
    }
  }, [listId]);

  useEffect(() => {
    if (dataValues) createDetailRetur();
  }, [dataValues]);

  useEffect(() => {
    dispatch({ type: "CLEAR_DATA" });
    form.setFieldsValue({
        //supplier_id: `${supplier.attributes.id_supplier} - ${supplier.attributes.name}`,
        //order_date: moment(momentString),
        //location: dataRetur.location.data.attributes.name,
        //tempo_days: dataRetur.tempo_days,
        //tempo_time: dataRetur.tempo_time,
        //additional_fee_1_desc: dataRetur.additional_fee_1_desc,
        //additional_fee_2_desc: dataRetur.additional_fee_2_desc,
        //additional_fee_3_desc: dataRetur.additional_fee_3_desc,
        //additional_fee_4_desc: dataRetur.additional_fee_4_desc,
        //additional_fee_5_desc: dataRetur.additional_fee_5_desc,
        //additional_fee_1_sub: dataRetur.additional_fee_1_sub,
        //additional_fee_2_sub: dataRetur.additional_fee_2_sub,
        //additional_fee_3_sub: dataRetur.additional_fee_3_sub,
        //additional_fee_4_sub: dataRetur.additional_fee_4_sub,
        //additional_fee_5_sub: dataRetur.additional_fee_5_sub,
        //additional_note: dataRetur.additional_note,
        //delivery_fee: dataRetur.delivery_fee,
        //disc_type: null,
        //disc_value: null,
        //DPP_active: null,
        //PPN_active: null,
        //EXP.Date
        //batch 
    });
  }, []);

  const data = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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
        <title>Tambah Retur</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Tambah Retur Pembelian Barang"} />
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
                  <Supplier onChangeSupplier={setSupplier} />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_retur"
                    initialValue={`Retur/ET/${totalReturs}/${mm}/${yyyy}`}
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
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Upload {...data}>
                    <Button size="large" icon={<UploadOutlined />}>
                      Click to Upload
                    </Button>
                  </Upload>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="location"
                    rules={[
                      {
                        required: true,
                        message: "Lokasi tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Pilih Lokasi"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      {locations.map((element) => {
                        return (
                          <Select.Option
                            value={element.id}
                            key={element.attributes.name}
                          >
                            {element.attributes.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="no_lpb">
                    <Select
                      placeholder="Pilih Nomor LPB"
                      size="large"
                      //onChange={(e) => fetchReturdata(e)}
                      style={{
                        width: "100%",
                      }}
                    >
                      {returLPB.map((element) => { console.log("map :"); console.log(element.id);
                        return (
                          <Select.Option value={element.attributes.no_retur_LPB} key={element.id}>
                            {element.attributes.no_retur_LPB}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>                
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0" hidden>
                    <Form.Item name="no_nota_supplier">
                    
                    </Form.Item>
                    <Form.Item name="tanggal_pembelian">
                    
                    </Form.Item>
                </div>
                <div className="w-full md:w-4/4 px-3 mb-2 mt-2 mx-0  md:mb-0">
                  <SearchBar
                    form={form}
                    tempList={tempList}
                    onChange={onChangeProduct}
                    selectedProduct={selectedProduct}
                  />
                </div>
                <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">
                  {/*<ReturLPBTable*/}
                  {/*  products={products}*/}
                  {/*  productTotalPrice={productTotalPrice}*/}
                  {/*  setTotalPrice={setTotalPrice}*/}
                  {/*  calculatePriceAfterDisc={calculatePriceAfterDisc}*/}
                  {/*  productSubTotal={productSubTotal}*/}
                  {/*  formObj={form}*/}
                  {/*  locations={locations}*/}
                  {/*/>*/}
                  {/*<OrderTable*/}
                  {/*  products={products}*/}
                  {/*  productTotalPrice={productTotalPrice}*/}
                  {/*  setTotalPrice={setTotalPrice}*/}
                  {/*  calculatePriceAfterDisc={calculatePriceAfterDisc}*/}
                  {/*  productSubTotal={productSubTotal}*/}
                  {/*  formObj={form}*/}
                  {/*/>*/}
                  <LPBTable
                    products={products}
                    productTotalPrice={productTotalPrice}
                    setTotalPrice={setTotalPrice}
                    setProductTotalPrice={setProductTotalPrice}
                    calculatePriceAfterDisc={calculatePriceAfterDisc}
                    productSubTotal={productSubTotal}
                    locations={locations}
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

export default Retur;
