import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import Supplier from "@iso/components/Form/AddOrder/SupplierForm";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import { Form, Input, DatePicker, Button, message, Upload, Select, Spin, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import nookies from "nookies";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import calculatePrice from "../../utility/calculatePrice";
import DataReturTable from "@iso/components/ReactDataTable/Purchases/DataReturTable";
import updateRetur from "../../utility/updateRetur";
import createReturFunc from "../../utility/createRetur";
import { useRouter } from "next/router";
import LoadingAnimations from "@iso/components/Animations/Loading";
import moment from "moment";

Retur.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const reqLocation = await fetchLocation(cookies);
  const location = await reqLocation.json();

  const reqDataRetur = await fetchDataRetur(cookies);
  const returs = await reqDataRetur.json();

  const reqDataLPB = await fetchDataLPB(cookies);
  const dataLPB = await reqDataLPB.json();

  const reqUser = await fetchUser(cookies);
  const user = await reqUser.json();

  if (reqLocation.status !== 200) {
    context.res.writeHead(302, {
      Location: "/signin?session=false",
      "Content-Type": "text/html; charset=utf-8",
    });
    context?.res?.end();

    return {};
  }

  return {
    props: {
      location,
      returs,
      dataLPB,
      user,
      id,
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

const fetchDataLPB = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings?populate=deep";
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me?populate=*";
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
  const user = props.user;
  const locations = props.location.data;
  const dataLPB = props.dataLPB.data;
  var products = useSelector((state) => state.Order);
  var selectedProduct = products?.productList;
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataValues, setDataValues] = useState();
  const [supplier, setSupplier] = useState();
  const [productTotalPrice, setProductTotalPrice] = useState({});
  const [productSubTotal, setProductSubTotal] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [listId, setListId] = useState([]);
  const router = useRouter();

  //temp
  const tempList = [];
  const cookies = nookies.get(null, "token");
  const [isFetchinData, setIsFetchingData] = useState(false);
  const [locProduct, setLocProduct] = useState([]);
  const [expProduct, setExpProduct] = useState([]);
  const [batch, setBatch] = useState([]);

  var totalReturs = String(props.returs?.meta?.pagination.total + 1).padStart(3, "0");
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  const { TextArea } = Input;
  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  var formatterTotal = new Intl.NumberFormat("id-ID", {
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
    console.log("info total", productTotalPrice, productSubTotal, products, dataValues);
    updateRetur(products, productTotalPrice, productSubTotal, setListId, "/retur-details", dataValues, props.returs);
  };

  //const createRetur = async (values) => {
  //  createReturFunc(grandTotal, totalPrice, values, listId, form, router);
  //};

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

  //const calculatePriceAfterDisc = (row, index) => {
  //  var total = 0;
  //  var qty = 1;
  //  var priceUnit = row.attributes[`buy_price_1`];

  //  // check if price changed
  //  if (products.productInfo[index]?.priceUnit) {
  //    priceUnit = products.productInfo[index].priceUnit ?? row.attributes[`buy_price_1`];
  //  }
  //  // check if qty changed
  //  if (products.productInfo[index]?.qty) {
  //    qty = products.productInfo[index]?.qty ?? 1;
  //  }

  //  // set product price after disc & sub total
  //  productTotalPrice[index] = priceUnit;
  //  productSubTotal[index] = priceUnit * qty;

  //  // set all product total
  //  var total = 0;
  //  for (var key in productSubTotal) {
  //    total = total + productSubTotal[key];
  //  }
  //    setTotalPrice(total);
  //  return formatter.format(productTotalPrice[index]);
  //};

  const calculatePriceAfterDisc = (row, index) => {
    const total = calculatePrice(row, products, productTotalPrice, productSubTotal, setTotalPrice, index, setProductSubTotal);
    return formatter.format(total);
  };

  const fetchReturdata = async (id) => {
    //clearData();
    const endpoint = process.env.NEXT_PUBLIC_URL + `/purchasings/${id}?populate=deep`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    const dataRetur = res.data.attributes;

    form.setFieldsValue({
      no_nota_supplier: dataRetur.no_nota_suppplier,
      tanggal_pembelian: dataRetur.date_purchasing,
    });
  };

  const setProductValue = async () => {
    if (products.productList.length != 0) {
      products.productList.forEach((element) => {

        form.setFieldsValue({
          harga_satuan: {
            [element.id]: element.attributes.buy_price_1,
          },
        });
      });
    }
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

  //useEffect(() => {
  //  if (listId.length > 0) {
  //    createRetur(dataValues);
  //  }
  //}, [listId]);

  useEffect(() => {
    if (dataValues) createDetailRetur();
  }, [dataValues]);

  useEffect(() => {
    dispatch({ type: "CLEAR_DATA" });
    setIsFetchingData(true);
    setProductValue();

    var returData = null;

    props.returs.data.forEach((element) => {
      if(props.id == element.id){
        returData = element;
      }
    });

    //dispatch({
    //  type: "SET_PREORDER_DATA",
    //  data: res.data,
    //});

    var labelSupplier = `${returData.attributes.supplier.data.attributes.id_supplier} - ${returData.attributes.supplier.data.attributes.name}`

    setSupplier(returData.attributes.supplier.data);

    var dateString = new Date(returData.attributes.tanggal_retur);
    var momentObj = moment(dateString, "YYYY-MM-DD");
    var momentString = momentObj.format("MM-DD-YYYY");

    form.setFieldsValue({
    catatan: returData.attributes.catatan,
    supplier_id: {
      label: labelSupplier,
      value: returData.attributes.supplier.data.id,
    },
    no_retur: returData.attributes.no_retur,
    location: {
      label: returData.attributes.location.data.attributes.name,
      value: returData.attributes.location.data.id,
    },
    purchasing: {
      label: returData.attributes.purchasing.data.attributes.name,
      value: returData.attributes.purchasing.data.id,
    },
    pajak: returData.attributes.pajak,
    tanggal_retur: moment(momentString),
    status: returData.attributes.status,
    });

    returData.attributes.retur_details.data.forEach((element, index) => {
      var indexUnit = 1;

      var dateStringDetail = new Date(element.attributes.expired_date);
      var momentObjDetail = moment(dateStringDetail, "YYYY-MM-DD");
      var momentStringDetail = momentObjDetail.format("MM-DD-YYYY");

      locProduct.push(element.attributes.location);
      expProduct.push(moment(momentStringDetail));
      batch.push(element.attributes.batch);

      if(element.attributes.products?.data[0]?.attributes.unit_1 == element.attributes.unit){
        indexUnit = 1;
      } else if (element.attributes.products?.data[0]?.attributes.unit_2 == element.attributes.unit) {
        indexUnit = 2;
      } else if (element.attributes.products?.data[0]?.attributes.unit_3 == element.attributes.unit) {
        indexUnit = 3;
      } else if (element.attributes.products?.data[0]?.attributes.unit_4 == element.attributes.unit) {
        indexUnit = 4;
      } else if (element.attributes.products?.data[0]?.attributes.unit_5 == element.attributes.unit) {
        indexUnit = 5;
      } else indexUnit = 1;

      dispatch({ 
        type: "SET_INITIAL_PRODUCT",
        product: element.attributes.products.data[0],
        qty: element.attributes.qty,
        unit: element.attributes.unit,
        unitIndex: indexUnit,
        priceUnit: parseInt(element.attributes.harga_satuan),
        disc: parseInt( element.attributes.disc),
        priceAfterDisc: parseInt(element.attributes.harga_satuan),
        subTotal: parseInt(element.attributes.sub_total),
        index,
      });

      dispatch({
        type: "CHANGE_PRODUCT_D1",
        d1: element.attributes.d1,
        product: element.attributes.products.data[0],
        index,
      });

      dispatch({
        type: "CHANGE_PRODUCT_D2",
        d2: element.attributes.d2,
        product: element.attributes.products.data[0],
        index,
      });

      dispatch({
        type: "CHANGE_PRODUCT_D3",
        d3: element.attributes.d3,
        product: element.attributes.products.data[0],
        index,
      });
    });

    setTimeout(() => {
      setIsFetchingData(false);
    }, 3000);
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
        <title>Edit Retur</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Edit Retur Pembelian Barang"} />
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
                          <Select.Option value={element.id} key={element.attributes.name}>
                            {element.attributes.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="purchasing">
                    <Select
                      placeholder="Pilih Nomor LPB"
                      size="large"
                      onChange={(e) => fetchReturdata(e)}
                      style={{
                        width: "100%",
                      }}
                    >
                      {dataLPB.map((element) => {
                        return (
                          <Select.Option value={element.id} key={element.id}>
                            {element.attributes.no_purchasing}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="status">
                    <Select
                      placeholder="Pilih Status"
                      size="large"
                      //onChange={(e) => fetchReturdata(e)}
                      style={{
                        width: "100%",
                      }}
                    >
                        <Select.Option value="Draft" key="Draft">
                          Draft
                        </Select.Option>
                        <Select.Option value="Selesai" key="Selesai">
                          Selesai
                        </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0" hidden>
                  <Form.Item name="no_nota_supplier"></Form.Item>
                  <Form.Item name="tanggal_pembelian"></Form.Item>
                </div>
                <div className="w-full md:w-4/4 px-3 mb-2 mt-2 mx-0  md:mb-0">
                  <SearchBar form={form} tempList={tempList} onChange={onChangeProduct} user={user}  selectedProduct={selectedProduct} isBasedOnLocation={false}/>
                </div>
                <div className="w-full md:w-4/4 px-3 mb-2 mt-2 md:mb-0">
                  {isFetchinData ? (
                  <div className="w-full md:w-4/4 px-3 mb-2 mt-5 mx-3  md:mb-0 text-lg">
                    <div className="w-36 h-36 flex p-4 max-w-sm mx-auto">
                      <LoadingAnimations />
                    </div>
                    <div className="text-sm align-middle text-center animate-pulse text-slate-400">
                      Sedang Mengambil Data
                    </div>
                  </div>
                ) : (
                  <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">
                    <DataReturTable
                        products={products}
                        productTotalPrice={productTotalPrice}
                        setTotalPrice={setTotalPrice}
                        setProductTotalPrice={setProductTotalPrice}
                        setProductSubTotal={setProductSubTotal}
                        calculatePriceAfterDisc={calculatePriceAfterDisc}
                        productSubTotal={productSubTotal}
                        locations={locations}
                        formObj={form}
                        locProduct={locProduct}
                        expProduct={expProduct}
                        batch={batch}
                    />
                  </div>
                )}
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
                      <Select.Option value="Pajak Pembelian" key="Pajak Pembelian">
                        Pajak Pembelian
                      </Select.Option>
                      <Select.Option value="Non Pajak" key="Non Pajak">
                        Non Pajak
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <p className="font-bold">Total Item : {products.productList.length} </p>
              </div>
              <div className="flex justify-end">
                <p className="font-bold">Total Harga : {formatterTotal.format(totalPrice)} </p>
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
                    Simpan
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