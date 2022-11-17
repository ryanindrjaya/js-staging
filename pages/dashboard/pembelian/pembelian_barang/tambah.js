import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import nookies from "nookies";
import { toast } from "react-toastify";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import Supplier from "@iso/components/Form/AddOrder/SupplierForm";
import LPBTable from "@iso/components/ReactDataTable/Purchases/LPBTable";
import { useSelector, useDispatch } from "react-redux";
import LoadingAnimations from "@iso/components/Animations/Loading";
import moment from "moment";
import { Form, Button, Spin, Input, DatePicker, Select, InputNumber, notification, Row } from "antd";
import createDetailPurchasing from "../utility/createDetail";
import createPurchasing from "../utility/createPurchasing";
import calculatePrice from "../utility/calculatePrice";

Tambah.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  let locations;
  let purchases;
  let order;
  let user;

  const req = await fetchData(cookies);
  locations = await req.json();

  const req2 = await fetchDataPurchasing(cookies);
  purchases = await req2.json();

  const req3 = await fetchDataPurchase(cookies);
  order = await req3.json();

  const req4 = await fetchUser(cookies);
  user = await req4.json();

  return {
    props: {
      order,
      purchases,
      locations,
      user,
    },
  };
};

const fetchData = async (cookies) => {
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

const fetchDataPurchasing = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings";
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

const fetchDataPurchase = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases/?populate=deep&filters[delivery_status][$eq]=Terkirim";
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

function Tambah({ props }) {
  const products = useSelector((state) => state.Order);
  const dispatch = useDispatch();

  var locations = props.locations.data;
  var deliveredOrder = props.order.data;
  var selectedProduct = products?.productList;
  const user = props.user;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [supplier, setSupplier] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [additionalFee, setAdditionalFee] = useState();
  const [isFetchinData, setIsFetchingData] = useState(false);
  const [listId, setListId] = useState([]);
  const [dataValues, setDataValues] = useState();
  const [discType, setDiscType] = useState();
  const [discPrice, setDiscPrice] = useState(0);
  const [tempoDays, setTempoDays] = useState(0);
  const [tempoOption, setTempoOption] = useState("Hari");
  const [productTotalPrice, setProductTotalPrice] = useState({});
  const [productSubTotal, setProductSubTotal] = useState({});
  const [preorderData, setPreOrderData] = useState();
  const router = useRouter();
  const { TextArea } = Input;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  // DPP & PPN
  const dpp = 1.11;
  var ppn = 0;

  // temp
  const [biayaTambahan, setBiayaTambahan] = useState(0);
  const [biayaPengiriman, setBiayaPengiriman] = useState(0);

  const cookies = nookies.get(null, "token");
  const tempList = [];

  // NO PO
  var totalPurchases = String(props.purchases?.meta?.pagination.total + 1).padStart(3, "0");

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

  const createDetailOrder = async () => {
    createDetailPurchasing(dataValues, products, productTotalPrice, productSubTotal, setListId, "/purchasing-details");
  };

  const createOrder = async (values) => {
    await createPurchasing(products, grandTotal, totalPrice, values, listId, discPrice, form, router);
  };

  const onChange = async () => {
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
    const total = calculatePrice(row, products, productTotalPrice, productSubTotal, setTotalPrice);

    return formatter.format(total);
  };

  const sumAdditionalPrice = () => {
    var newTotal = 0;

    for (var key in additionalFee) {
      newTotal = newTotal + additionalFee[key];
    }

    var test = totalPrice + newTotal;
    setBiayaTambahan(newTotal);
  };

  const fetchPOdata = async (id) => {
    clearData();
    setIsFetchingData(true);

    const endpoint = process.env.NEXT_PUBLIC_URL + `/purchases/${id}?populate=deep`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    const dataPO = res.data.attributes; console.log("data po :"); console.log(dataPO);
    const purchase_details = dataPO.purchase_details.data;
    const supplier = dataPO.supplier.data;

    setDiscPrice(0);
    setPreOrderData(res.data);
    setSupplier(supplier);
    setGrandTotal(dataPO.delivery_total);
    setBiayaPengiriman(dataPO.delivery_fee);

    var dateString = dataPO.order_date;
    var momentObj = moment(dateString, "YYYY-MM-DD");
    var momentString = momentObj.format("MM-DD-YYYY");

    form.setFieldsValue({
      supplier_id: `${supplier.attributes.id_supplier} - ${supplier.attributes.name}`,
      order_date: moment(momentString),
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
    });

    setAdditionalFee({
      ...additionalFee,
      additional_fee_1_sub: dataPO.additional_fee_1_sub,
      additional_fee_2_sub: dataPO.additional_fee_2_sub,
      additional_fee_3_sub: dataPO.additional_fee_3_sub,
      additional_fee_4_sub: dataPO.additional_fee_4_sub,
      additional_fee_5_sub: dataPO.additional_fee_5_sub,
    });

    setNewGrandTotal(dataPO);

    dispatch({
      type: "SET_PREORDER_DATA",
      data: res.data,
    });

    purchase_details.forEach((element) => {
      var indexUnit = 1;
      var unitOrder = element.attributes.unit_order; console.log("product :"); console.log(element.attributes.products)
      var productUnit = element.attributes.products.data[0].attributes;

      for (let index = 1; index < 6; index++) {
        if (unitOrder === productUnit[`unit_${index}`]) {
          indexUnit = index;
        }
      }

      const productId = element.attributes.products.data[0].id;

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
      });

      const test = form.getFieldsValue(["disc_rp", "jumlah_option", "jumlah_qty"]);

      // SET INITIAL PRODUCT
      dispatch({
        type: "SET_INITIAL_PRODUCT",
        product: element.attributes.products.data[0],
        qty: element.attributes.total_order,
        unit: element.attributes.unit_order,
        unitIndex: indexUnit,
        priceUnit: element.attributes.unit_price,
        disc: element.attributes.disc,
        priceAfterDisc: element.attributes.unit_price_after_disc,
        subTotal: element.attributes.sub_total,
        d1: element.attributes.products.data[0].attributes.unit_1_dp1,
        d2: element.attributes.products.data[0].attributes.unit_1_dp2,
        d3: element.attributes.products.data[0].attributes.unit_1_dp3,
      });
    });
      console.log("initial product"); console.log(products); console.log(productTotalPrice);
      console.log(setTotalPrice); console.log(setProductTotalPrice); console.log(calculatePriceAfterDisc);
      console.log(productSubTotal); console.log(locations);
    setTimeout(() => {
      setIsFetchingData(false);
    }, 3000);
  };

  const setNewGrandTotal = (data) => {
    var additionalPrice = 0;
    const additionalPricePO = form.getFieldsValue([
      "additional_fee_1_sub",
      "additional_fee_2_sub",
      "additional_fee_3_sub",
      "additional_fee_4_sub",
      "additional_fee_5_sub",
    ]);

    for (const key in additionalPricePO) {
      additionalPrice = additionalPrice + additionalPricePO[key];
    }

    setBiayaTambahan(additionalPrice);
  };

  const setTotalWithDisc = () => {
    const disc = form.getFieldsValue(["disc_type", "disc_value"]);

    if (disc.disc_type === "Tetap") {
      setTotalPriceWithFixedDisc(disc);
    } else {
      setTotalPriceWithPercentDisc(disc);
    }
  };

  const setTotalPriceWithFixedDisc = (disc) => {
    var newTotal = 0;

    newTotal = totalPrice - disc.disc_value;
    setDiscPrice(newTotal);
  };

  const setTotalPriceWithPercentDisc = (disc) => {
    var newTotal = 0;

    newTotal = totalPrice - (totalPrice * disc.disc_value) / 100;
    if (newTotal < 0) newTotal = 0;
    setDiscPrice(newTotal);
  };

  const setDPPActive = (value) => {
    if (value) {
      // fungsi gak guna karena balik lagi
      form.setFieldsValue({ PPN_active: "PPN" });
      var newTotal = grandTotal;
      var afterDPP = newTotal / dpp;
      ppn = newTotal - afterDPP;
      // var total = afterDPP + ppn;
    }
  };

  const clearData = () => {
    dispatch({ type: "CLEAR_DATA" });
    setTotalPrice(0);
  };

  useEffect(() => {
    // this one is used for checking the price if the old price is same with new one.
    // if both are same then we should not set new price for grand total.
    // if they are not, then set new grand total
    if (discPrice !== totalPrice && discPrice !== 0) {
      setGrandTotal(discPrice + biayaPengiriman + biayaTambahan);
    } else {
      setGrandTotal(totalPrice + biayaPengiriman + biayaTambahan);
    }
  }, [biayaPengiriman, biayaTambahan, totalPrice, discPrice]);

  useEffect(() => {
    sumAdditionalPrice();
  }, [additionalFee]);

  useEffect(() => {
    if (listId.length > 0) {
      createOrder(dataValues);
    }
  }, [listId]);

  useEffect(() => {
    if (dataValues) createDetailOrder();
  }, [dataValues]);

  useEffect(() => {
    // used to reset redux from value before
    clearData();
  }, []);

  const onFinishFailed = () => {
    const error = form.getFieldsError();
    error.forEach((element) => {
      if (element.errors.length > 0) {
        console.log();
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
        <title>Tambahkan Pembelian Barang</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Tambah Lembar Pembelian Barang"} />
          <LayoutContent>
            <Form
              form={form}
              name="add_order"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Supplier onChangeSupplier={setSupplier} />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_purchasing"
                    initialValue={`PB/ET/${totalPurchases}/${mm}/${yyyy}`}
                    rules={[
                      {
                        required: true,
                        message: "Nomor PO tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input style={{ height: "40px" }} placeholder="No.PO" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="order_date"
                    rules={[
                      {
                        required: true,
                        message: "Tanggal tidak boleh kosong!",
                      },
                    ]}
                  >
                    <DatePicker placeholder="Tanggal Pembelian" size="large" format={"DD/MM/YYYY"} style={{ width: "100%" }} />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item name="status" initialValue={"Diproses"}>
                    <Select
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value="Diproses" key={"Diproses"}>
                        Diproses
                      </Select.Option>
                      <Select.Option value="Selesai" key={"Selesai"}>
                        Selesai
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-2/4 px-3 mb-2 md:mb-0">
                  <p className="font-bold m-0">Alamat Supplier : </p>
                  <p className="m-0"> {supplier?.attributes.address}</p>
                  <p> {supplier?.attributes.phone}</p>
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
                  <Form.Item name="tempo_days" initialValue={0} noStyle>
                    <Input
                      size="large"
                      style={{
                        width: "50%",
                      }}
                      onChange={setTempoDays}
                    />
                  </Form.Item>

                  <Form.Item name="tempo_time" initialValue={"Hari"} noStyle>
                    <Select
                      size="large"
                      onChange={setTempoOption}
                      style={{
                        width: "50%",
                      }}
                    >
                      <Select.Option value="Hari" key="Hari">
                        Hari
                      </Select.Option>
                      <Select.Option value="Bulan" key="Bulan">
                        Bulan
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>

                <div className="w-full md:w-1/4 px-3 mb-2 mt-5 md:mb-0">
                  <Form.Item name="no_po">
                    <Select
                      placeholder="Pilih Nomor PO"
                      size="large"
                      onChange={(e) => fetchPOdata(e)}
                      style={{
                        width: "100%",
                      }}
                    >
                      {deliveredOrder.map((element) => {
                        return (
                          <Select.Option value={element.id} key={element.id}>
                            {element.attributes.no_po}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 mt-5 md:mb-0">
                  <Form.Item name="no_nota_suppplier">
                    <Input placeholder="No. Nota Supplier" size="large" />
                  </Form.Item>
                </div>

                <div className="w-full md:w-4/4 px-3 mb-2 mt-2 mx-0  md:mb-0">
                  <SearchBar
                    form={form}
                    tempList={tempList}
                    onChange={onChange}
                    user={user}
                    selectedProduct={selectedProduct}
                    isBasedOnLocation={false}
                  />
                </div>
                {isFetchinData ? (
                  <div className="w-full md:w-4/4 px-3 mb-2 mt-5 mx-3  md:mb-0 text-lg">
                    <div className="w-36 h-36 flex p-4 max-w-sm mx-auto">
                      <LoadingAnimations />
                    </div>
                    <div className="text-sm align-middle text-center animate-pulse text-slate-400">Sedang Mengambil Data</div>
                  </div>
                ) : (
                  <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">
                    <LPBTable
                      products={products}
                      productTotalPrice={productTotalPrice}
                      setTotalPrice={setTotalPrice}
                      setProductTotalPrice={setProductTotalPrice}
                      calculatePriceAfterDisc={calculatePriceAfterDisc}
                      productSubTotal={productSubTotal}
                      locations={locations}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <p className="font-bold">Total Item : {products.productList.length} </p>
              </div>
              <div className="flex justify-end transition-all">
                <Row>
                  <p className="font-bold">Total Harga :</p>
                  {discPrice === 0 ? <p></p> : <p className="font-bold text-red-500 ml-2">{formatter.format(discPrice)}</p>}
                  {discPrice === 0 ? (
                    <p className="font-bold ml-2">{formatter.format(totalPrice)}</p>
                  ) : (
                    <p className="font-bold line-through ml-2 ">{formatter.format(totalPrice)}</p>
                  )}
                </Row>
              </div>

              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/3 px-3 mt-5 md:mb-0">
                  <Form.Item name="disc_type">
                    <Select
                      disabled={products.productList.length === 0}
                      onChange={setDiscType}
                      placeholder="Pilih Jenis Diskon"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value="Tetap" key={"Tetap"}>
                        Tetap
                      </Select.Option>
                      <Select.Option value="Persentase" key={"Persentase"}>
                        Persentase
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mt-5 md:mb-0">
                  <Form.Item name="disc_value" noStyle>
                    <InputNumber
                      disabled={products.productList.length === 0}
                      onChange={setTotalWithDisc}
                      size="large"
                      min={0}
                      placeholder="Diskon"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mt-5 md:mb-0">
                  <Form.Item name="delivery_fee" noStyle>
                    <InputNumber onChange={(e) => setBiayaPengiriman(e)} size="large" placeholder="Biaya Pengiriman" style={{ width: "100%" }} />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mt-5 md:mb-0">
                  <Form.Item name="DPP_active">
                    <Select
                      disabled={products.productList.length === 0}
                      placeholder="Pakai DPP"
                      onChange={setDPPActive}
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value="DPP" key={"DPP"}>
                        DPP
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mt-5 md:mb-0">
                  <Form.Item name="PPN_active">
                    <Select
                      disabled={true}
                      placeholder="Pakai PPN"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value="PPN" key={"PPN"}>
                        PPN
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="flex justify-end font-bold w-full mb-3 md:w-3/4">
                <p>Biaya Tambahan Lain-lain</p>
              </div>
              <div className="flex justify-end">
                <div className="w-full md:w-1/3 px-3 mb-2 text-center md:mb-0">
                  <p className="mb-4 font-bold">Keterangan</p>
                  <Form.Item name="additional_fee_1_desc">
                    <Input size="large" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item name="additional_fee_2_desc">
                    <Input size="large" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item name="additional_fee_3_desc">
                    <Input size="large" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item name="additional_fee_4_desc">
                    <Input size="large" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item name="additional_fee_5_desc">
                    <Input size="large" style={{ width: "100%" }} />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 text-center md:mb-0">
                  <p className="mb-4 font-bold">Jumlah</p>
                  <Form.Item name="additional_fee_1_sub">
                    <InputNumber
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(e) =>
                        setAdditionalFee({
                          ...additionalFee,
                          additional_fee_1_sub: e,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item name="additional_fee_2_sub">
                    <InputNumber
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(e) =>
                        setAdditionalFee({
                          ...additionalFee,
                          additional_fee_2_sub: e,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item name="additional_fee_3_sub">
                    <InputNumber
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(e) =>
                        setAdditionalFee({
                          ...additionalFee,
                          additional_fee_3_sub: e,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item name="additional_fee_4_sub">
                    <InputNumber
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(e) =>
                        setAdditionalFee({
                          ...additionalFee,
                          additional_fee_4_sub: e,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item name="additional_fee_5_sub">
                    <InputNumber
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(e) =>
                        setAdditionalFee({
                          ...additionalFee,
                          additional_fee_5_sub: e,
                        })
                      }
                    />
                  </Form.Item>
                </div>
              </div>
              <div>
                <p className="font-bold flex justify-end">
                  Total Biaya : {grandTotal === 0 ? formatter.format(totalPrice) : formatter.format(grandTotal)}
                </p>
              </div>
              <Form.Item name="additional_note">
                <TextArea rows={4} placeholder="Catatan Tambahan" />
              </Form.Item>

              <Form.Item className="mt-5">
                {loading ? (
                  <div className=" flex float-left ml-3 ">
                    <Spin />
                  </div>
                ) : (
                  <Button htmlType="submit" className=" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1">
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

export default Tambah;
