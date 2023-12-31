import Head from "next/head";
import React, { useState, useEffect, createContext } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import Supplier from "@iso/components/Form/AddOrder/SupplierForm";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import { Form, Input, DatePicker, Button, message, Modal, Select, Spin, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import nookies from "nookies";
import SearchBar from "../../../../components/Form/AddOrder/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import calculatePrice from "../utility/calculatePrice";
import DataReturTable from "../../../../components/ReactDataTable/Purchases/DataReturTable";
import createDetailReturFunc from "../utility/createReturDetail";
import createReturFunc from "../utility/createRetur";
import { useRouter } from "next/router";
import SearchLPB from "../../../../components/Form/AddOrder/SearchLPB";
import moment from "moment";
import createInventoryRetur from "../utility/createInventoryRetur";
import getUserCodeName from "../../../../library/functions/getUserCodeName";

Retur.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const reqLocation = await fetchLocation(cookies);
  const location = await reqLocation.json();

  const reqDataRetur = await fetchDataRetur(cookies);
  const returs = await reqDataRetur.json();

  const reqDataLPB = await fetchDataLPB(cookies);
  const dataLPB = await reqDataLPB.json();

  const reqUser = await fetchUser(cookies);
  const user = await reqUser.json();

  if (reqLocation.status !== 200) {
  }

  return {
    props: {
      location,
      returs,
      dataLPB,
      user,
    },
  };
};

const fetchLocation = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/locations?populate=*";
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/returs?populate=*";
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings?populate=*";
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
  const [lpbData, setLpbData] = useState();
  const [dataGudang, setDataGudang] = useState();
  const [stokString, setStokString] = useState({});

  const [modal, contextHolder] = Modal.useModal();
  const [isTaxActive, setIsTaxActive] = useState(true);

  const ReachableContext = createContext(null);
  const UnreachableContext = createContext(null);
  const round = (num) => Math.ceil(num * 100) / 100;

  //temp
  const tempList = [];
  const cookies = nookies.get(null, "token");
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
    maximumFractionDigits: 2,
  });

  const onSelectLocation = async (locationId, dataProduct, idx) => {
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/inventories?populate=location&filters[location][id]=${locationId}&filters[product][id]=${dataProduct.id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (res.data.length > 0) {
      const product = dataProduct.attributes;
      const stok = res.data[0].attributes;
      let stokGudang = "";
      setDataGudang({
        ...dataGudang,
        [idx]: res.data[0].attributes,
      });

      const unit1 = product.unit_1 ? stok.stock_unit_1 + " " + product.unit_1 : "";
      const unit2 = product.unit_2 ? stok.stock_unit_2 + " " + product.unit_2 : "";
      const unit3 = product.unit_3 ? stok.stock_unit_3 + " " + product.unit_3 : "";
      const unit4 = product.unit_4 ? stok.stock_unit_4 + " " + product.unit_4 : "";
      const unit5 = product.unit_5 ? stok.stock_unit_5 + " " + product.unit_5 : "";

      stokGudang = unit1 + " " + unit2 + " " + unit3 + " " + unit4 + " " + unit5;

      setStokString({
        ...stokString,
        [idx]: stokGudang,
      });
    } else {
      const product = dataProduct.attributes;
      let stokGudang = "";
      setDataGudang({
        ...dataGudang,
        [idx]: {
          location: {
            data: {
              id: locationId,
            },
          },
        },
      });

      const unit1 = product.unit_1 ? "0" + " " + product.unit_1 : "";
      const unit2 = product.unit_2 ? "0" + " " + product.unit_2 : "";
      const unit3 = product.unit_3 ? "0" + " " + product.unit_3 : "";
      const unit4 = product.unit_4 ? "0" + " " + product.unit_4 : "";
      const unit5 = product.unit_5 ? "0" + " " + product.unit_5 : "";

      stokGudang = unit1 + " " + unit2 + " " + unit3 + " " + unit4 + " " + unit5;

      setStokString({
        ...stokString,
        [idx]: stokGudang,
      });
    }
  };

  const checkReturQty = async (values) => {
    let popUpDialog = false;
    let cannotBeReturnedProducts = [];

    for (let index in dataGudang) {
      const qty = values?.jumlah_qty?.[index] ?? 1;
      const unitIndex = values?.jumlah_option?.[index] ?? products?.productInfo?.[index].unit ?? 1;
      const productId = products.productList[index]?.id;
      const productName = products.productList[index]?.attributes?.name;
      const productUnit = products.productList[index]?.attributes?.["unit_" + unitIndex];
      const gudangLocatioId = dataGudang?.[index].location?.data?.id ?? 0;

      if (typeof unitIndex === "string") {
        productUnit = unitIndex;
      }

      const returData = {
        location: gudangLocatioId,
        product: productId,
        unit: productUnit,
        qty: qty,
      };

      // fetch to api check
      const endpoint = process.env.NEXT_PUBLIC_URL + "/product/check";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
        body: JSON.stringify(returData),
      };

      const req = await fetch(endpoint, options);
      const res = await req.json();
      console.log(res);
      if (!res?.available) {
        popUpDialog = true;
        cannotBeReturnedProducts.push(productName);
      }
    }

    if (popUpDialog) {
      Modal.error({
        title: "Retur Gagal",
        content: (
          <div>
            <p>Item ini tidak bisa dilakukan retur. Silahkan cek kembali stok gudang yang tersedia:</p>
            <ul>
              {cannotBeReturnedProducts.map((product) => (
                <li>{product === undefined ? "" : `- ${product}`} </li>
              ))}
            </ul>
          </div>
        ),
      });
    }

    return popUpDialog;
  };

  async function fetchLatestNoReferensi() {
    const codename = await getUserCodeName();

    const endpoint = `${process.env.NEXT_PUBLIC_URL}/returs?sort[0]=id:desc&pagination[limit]=1&filters[no_retur][$contains]=${codename}/RB/`;
    const headers = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    };

    const response = await fetch(endpoint, headers)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });

    if (response) {
      const latestDaata = response.data?.[0];
      const no = parseInt(latestDaata?.attributes?.no_retur?.split("/")?.[2] || 0) + 1;
      console.log("no", no);
      const latestNoReferensi = `${codename}/RB/${String(no).padStart(5, "0")}/${moment().format("MM/YYYY")}`;
      form.setFieldsValue({
        no_retur: latestNoReferensi,
      });
      return latestNoReferensi;
    }

    console.log("response from fetchLatestNoReferensi", response);
  }

  const onFinish = async (values) => {
    setLoading(true);

    console.log("values", values);
    console.log("products", products);

    values.status = "Draft";

    const isShowingPopup = await checkReturQty(values);
    console.log("isShowingPopup", isShowingPopup);
    if (isShowingPopup) {
      setLoading(false);
      return;
    }

    const payment = getPaymentRemaining();
    console.log("PAYMENT ===> ", payment, "total price", totalPrice);
    if (payment) {
      if (totalPrice > payment.returPaymentRemaining) {
        notification["error"]({
          message: "Overprice",
          description: "Harga retur melebih dari Sisa pembayaran / Harga LPB",
        });
        setLoading(false);
        return;
      }
      console.log("executed onfinish");
    }

    setDataValues(values);
    setLoading(false);
  };

  const clearData = () => {
    dispatch({ type: "CLEAR_DATA" });
    setProductTotalPrice({});
    setProductSubTotal({});
    setTotalPrice(0);
    setGrandTotal(0);
    setListId([]);
    setLpbData();
    form.resetFields();
  };

  const createDetailRetur = async () => {
    createDetailReturFunc(products, productTotalPrice, productSubTotal, setListId, "/retur-details", dataValues);
  };

  const createRetur = async (values) => {
    await createReturFunc(
      grandTotal,
      totalPrice,
      values,
      listId,
      form,
      router,
      lpbData?.id,
      createInventoryRetur,
      clearData
    );

    // create retur inventory
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

  const getPaymentRemaining = () => {
    let returPayments = 0;
    let returPaymentRemaining = 0;
    const totalLPBPayment = lpbData?.attributes?.total_purchasing ?? 0;

    // for (const data in lpbData?.attributes?.returs?.data) {
    //   console.log("retur payment ", data.);
    // }
    lpbData?.attributes?.returs?.data.forEach((element) => {
      if (element.attributes.status === "Selesai") {
        returPayments = returPayments + element.attributes.total_price;
      }
    });

    returPaymentRemaining = totalLPBPayment - returPayments;
    const paymentData = {
      LPBPayment: totalLPBPayment,
      returPayment: returPayments,
      returPaymentRemaining: returPaymentRemaining,
    };

    return paymentData;
  };

  useEffect(() => {
    getPaymentRemaining();
  }, [lpbData]);

  const calculatePriceAfterDisc = (row, index) => {
    const total = calculatePrice(
      row,
      products,
      productTotalPrice,
      productSubTotal,
      setTotalPrice,
      index,
      setProductSubTotal
    );
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
    console.log("products", products);
    if (products.productList.length != 0) {
      products.productList.forEach((element) => {
        console.log("masuk");
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
    fetchLatestNoReferensi();
    setProductValue();

    return () => {
      dispatch({ type: "CLEAR_DATA" });
    };
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

  const getDPP = () => {
    const isDPPActive = form.getFieldValue("DPP_PPN_active");
    var total = 0;

    if (isDPPActive) total = totalPrice / 1.11;

    if (!Math.round((total + total * 0.11) * 100) / 100 !== Math.round(totalPrice * 100) / 100) {
      total = round(total);
    }

    return total;
  };

  const getPPN = () => {
    var total = 0;
    let dpp = getDPP();
    total = dpp * 0.11;

    return total;
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
                    initialValue={`RB/ET/${totalReturs}/${mm}/${yyyy}`}
                    rules={[
                      {
                        required: true,
                        message: "Nomor Retur tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input style={{ height: "40px" }} placeholder="Mengambil nomor..." />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="tanggal_retur"
                    initialValue={moment()}
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
                  <SearchLPB supplier={supplier} handleSelect={setLpbData} />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="status">
                    <Select
                      defaultValue={"Draft"}
                      className="hidden"
                      value={"Draft"}
                      placeholder="Pilih Status"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value="Draft" key="Draft">
                        Draft
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0" hidden>
                  <Form.Item name="no_nota_supplier"></Form.Item>
                  <Form.Item name="tanggal_pembelian"></Form.Item>
                </div>
                <div className="w-full md:w-4/4 px-3 mb-2 mt-2 mx-0  md:mb-0">
                  <SearchBar
                    form={form}
                    tempList={tempList}
                    onChange={onChangeProduct}
                    user={user}
                    selectedProduct={selectedProduct}
                    isBasedOnLocation={false}
                  />
                </div>
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
                    onSelectLocation={onSelectLocation}
                    stokString={stokString}
                  />
                </div>
              </div>
              <div className="flex justify-start md:justify-between">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="DPP_PPN_active"
                    initialValue={isTaxActive}
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
                      onChange={setIsTaxActive}
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value={true} key="Pajak Pembelian">
                        Pajak Pembelian
                      </Select.Option>
                      <Select.Option value={false} key="Non Pajak">
                        Non Pajak
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <p className="font-bold">Total Item : {products.productList.length} </p>
              </div>
              <div className="flex justify-end">
                <p className="font-bold">DPP : {formatterTotal.format(getDPP())}</p>
              </div>
              <div className="flex justify-end">
                <p className="font-bold">PPN : {formatterTotal.format(getPPN())}</p>
              </div>

              <div className="flex justify-end">
                <p className="font-bold">Total Harga : {formatterTotal.format(totalPrice)} </p>
              </div>

              <div className="flex justify-end mt-5">
                <p className="font-bold">Total LPB : {formatter.format(getPaymentRemaining().LPBPayment ?? 0)} </p>
              </div>
              <div className="flex justify-end">
                <p className="font-bold text-green-600">
                  Pembayaran Selesai : {formatter.format(getPaymentRemaining().returPayment ?? 0)}{" "}
                </p>
              </div>
              <div className="flex justify-end">
                <p className="font-bold text-red-400">
                  Sisa Pembayaran : {formatter.format(getPaymentRemaining().returPaymentRemaining ?? 0)}{" "}
                </p>
              </div>

              <Form.Item name="catatan">
                <TextArea rows={4} placeholder="Catatan Tambahan" />
              </Form.Item>
              <ReachableContext.Provider value="Light">
                <Form.Item className="mt-5">
                  {loading ? (
                    <div className=" flex float-left ml-3 ">
                      <Spin />
                    </div>
                  ) : (
                    <Button
                      onClick={validateError}
                      htmlType="submit"
                      className=" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1"
                    >
                      Tambah
                    </Button>
                  )}
                </Form.Item>
                {contextHolder}

                <UnreachableContext.Provider value="Bamboo" />
              </ReachableContext.Provider>
            </Form>
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Retur;
