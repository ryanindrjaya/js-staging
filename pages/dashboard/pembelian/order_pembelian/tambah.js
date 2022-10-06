import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import { UploadOutlined } from "@ant-design/icons";
import nookies from "nookies";
import { toast } from "react-toastify";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import Supplier from "@iso/components/Form/AddOrder/SupplierForm";
import OrderTable from "@iso/components/Form/AddOrder/OrderTable";
<<<<<<< HEAD
import { Form, Button, Spin, Input, DatePicker, Select, InputNumber, Upload, notification } from "antd";
=======
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Button,
  Spin,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Upload,
  notification,
} from "antd";
>>>>>>> 4c9eedfa69a10539013f113f6eaa6d17a0ba2407

const Tambah = ({ props }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Order);

  var locations = props.locations.data;
  const [selectedLocations, setSelectedLocations] = useState();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [mapPrice, setMapPrice] = useState({});
  const [productList, setProductList] = useState([]);
  const [supplier, setSupplier] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [additionalFee, setAdditionalFee] = useState();
  const [qty, setQty] = useState();
  const [listId, setListId] = useState([]);
  const [price, setPrice] = useState();
  const [dataValues, setDataValues] = useState();
  const [tempoDays, setTempoDays] = useState(0);
  const [tempoOption, setTempoOption] = useState("Hari");
  const [doneCreateDetail, setDoneCreateDetail] = useState(false);
  const [productTotalPrice, setProductTotalPrice] = useState({});
  const [productSubTotal, setProductSubTotal] = useState({});
  const router = useRouter();

  // temp
  const [biayaTambahan, setBiayaTambahan] = useState(0);
  const [biayaPengiriman, setBiayaPengiriman] = useState(0);

  const cookies = nookies.get(null, "token");
  const tempList = [];

  var tempListId = [];
  var tempProductListId = [];
  var tempSupplierId = 0;
  var tempLocationId;

  // NO PO
  var totalPurchases = String(props.purchases?.meta?.pagination.total + 1).padStart(3, "0");
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  const mapPriceList = {};

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

  const createDetailOrder = async () => {
    products.productList.forEach((element) => {
      // default value
      var qty = 1;
      var disc = 0;
      var unit = element.attributes.unit_1;
      var unitPrice = element.attributes.buy_price_1;
      var unitPriceAfterDisc = element.attributes.buy_price_1;
      var subTotal = unitPriceAfterDisc * qty;
      const id = element.id;

      qty = products.productInfo[id]?.qty ?? 1;
      disc = products.productInfo[id]?.disc ?? 0;
      unit = products.productInfo[id]?.unit ?? element.attributes.unit_1;
      unitPrice =
        products.productInfo?.[id]?.priceUnit ?? element.attributes.buy_price_1;
      unitPriceAfterDisc = productTotalPrice?.[id];
      subTotal = productSubTotal?.[id];

<<<<<<< HEAD
          unitPrice = mapPrice[id]?.priceUnit;
          subTotal = mapPrice[id]?.priceUnit - priceDisc;

          var price1 = calculatePercentage(subTotal, mapPrice[id].dp1);
          var price2 = calculatePercentage(price1, mapPrice[id].dp2);
          var price3 = calculatePercentage(price2, mapPrice[id].dp3);

          unitPriceAfterDisc = price3;
          unit = mapPrice[id].defaultUnit;
          subTotal = price3 * qty;
          //
        } else {
          //
          unitPrice = element.attributes.buy_price_1;
          subTotal = element.attributes.buy_price_1 - 0;

          var price1 = calculatePercentage(subTotal, element.attributes.unit_1_dp1);
          var price2 = calculatePercentage(price1, element.attributes.unit_1_dp2);
          var price3 = calculatePercentage(price2, element.attributes.unit_1_dp3);

          unitPriceAfterDisc = price3;
          unit = element.attributes.unit_1;
          subTotal = price3 * qty;
        }

        POSTPurchaseDetail(qty, unit, unitPrice, unitPriceAfterDisc, subTotal, id);
      });
    }
  };

  const POSTPurchaseDetail = async (qty, unit, priceUnit, priceUnitAfterDisc, subTotal, productId) => {
    var disc = 0;
    if (price) if (price[productId]) disc = price[productId] === null ? 0 : price[productId].price_1st;

=======
      // console.log(qty, disc, unit, unitPrice, unitPriceAfterDisc, subTotal, id);
      POSTPurchaseDetail(
        qty,
        disc,
        unit,
        unitPrice,
        unitPriceAfterDisc,
        subTotal,
        id
      );
    });
  };

  const POSTPurchaseDetail = async (
    qty,
    disc,
    unit,
    unitPrice,
    unitPriceAfterDisc,
    subTotal,
    id
  ) => {
>>>>>>> 4c9eedfa69a10539013f113f6eaa6d17a0ba2407
    var data = {
      data: {
        total_order: String(qty),
        unit_order: unit,
        unit_price: unitPrice,
        unit_price_after_disc: parseInt(unitPriceAfterDisc),
        sub_total: parseInt(subTotal),
        products: { id: id },
        disc: parseInt(disc),
      },
    };

    const endpoint = process.env.NEXT_PUBLIC_DB + "/purchase-details";
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSONdata,
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (req.status === 200) {
      tempListId.push(res.data?.id);
      if (tempListId.length === products.productList.length) {
        setListId(tempListId);
      }
    }
  };

  const createOrder = async (values) => {
    var orderDate = new Date(values.order_date);
    var deliveryDate = new Date(values.delivery_date);
    var supplierId = { id: parseInt(values.supplier_id) };

    tempSupplierId = parseInt(values.supplier_id);
    tempLocationId = parseInt(values.location);

    listId.forEach((element) => {
      tempProductListId.push({ id: element });
    });

    values.order_date = orderDate;
    values.delivery_date = deliveryDate;
    values.supplier_id = supplierId;
    values.status = "Dipesan";
    values.delivery_total = grandTotal === 0 ? parseInt(totalPrice) : parseInt(grandTotal);
    values.purchase_details = null;
    values.supplier_id = null;

    var data = {
      data: values,
    };

    const endpoint = process.env.NEXT_PUBLIC_DB + "/purchases";
    const JSONdata = JSON.stringify(data);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSONdata,
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (req.status === 200) {
      await putRelationOrder(res.data.id, res.data.attributes);
    } else {
      openNotificationWithIcon("error");
    }
  };

  const putRelationOrder = async (id, value) => {
    const user = await getUserMe();
    const dataOrder = {
      data: value,
    };

    dataOrder.data.supplier = { id: tempSupplierId };
    dataOrder.data.purchase_details = tempProductListId;
    dataOrder.data.added_by = user.name;
    dataOrder.data.locations = { id: tempLocationId };

    // clean object
    for (var key in dataOrder) {
      if (dataOrder[key] === null || dataOrder[key] === undefined) {
        delete dataOrder[key];
      }
    }

    const JSONdata = JSON.stringify(dataOrder);
    const endpoint = process.env.NEXT_PUBLIC_DB + "/purchases/" + id;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSONdata,
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (req.status === 200) {
      form.resetFields();
      router.replace("/dashboard/pembelian/order_pembelian");
      openNotificationWithIcon("success");
    } else {
      openNotificationWithIcon("error");
    }
  };

  const getUserMe = async () => {
    const endpoint = process.env.NEXT_PUBLIC_DB + "/users/me";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    return res;
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

  const sumDeliveryPrice = (price) => {
    setBiayaPengiriman(price);
  };

  const sumAdditionalPrice = () => {
    var newTotal = 0;

    for (var key in additionalFee) {
      newTotal = newTotal + additionalFee[key];
    }

    var test = totalPrice + newTotal;
    setBiayaTambahan(newTotal);
  };

  const calculatePriceAfterDisc = (row) => {
    var priceUnit = row.attributes[`buy_price_1`];
    var qty = 1;
    var disc = 0;

    const defaultDp1 = row.attributes?.unit_1_dp1;
    const defaultDp2 = row.attributes?.unit_1_dp2;
    const defaultDp3 = row.attributes?.unit_1_dp3;

    // check if price changed
    if (products.productInfo[row.id]?.priceUnit) {
      priceUnit =
        products.productInfo[row.id].priceUnit ?? row.attributes[`buy_price_1`];
    }

    // check if qty changed
    if (products.productInfo[row.id]?.qty) {
      qty = products.productInfo[row.id]?.qty ?? 1;
    }

    // check if disc changed
    if (products.productInfo[row.id]?.disc) {
      disc = products.productInfo[row.id]?.disc ?? 0;
    }

    priceUnit = priceUnit - disc;
    var price1 = calculatePercentage(priceUnit, defaultDp1);
    var price2 = calculatePercentage(price1, defaultDp2);
    var price3 = calculatePercentage(price2, defaultDp3);

    // set product price after disc & sub total
    productTotalPrice[row.id] = price3;
    productSubTotal[row.id] = price3 * qty;

    // set all product total
    var total = 0;
    for (var key in productSubTotal) {
      total = total + productSubTotal[key];
    }
    setTotalPrice(total);
    return formatter.format(productTotalPrice[row.id]);
  };

  const calculatePercentage = (value, percent) => {
    var newValue = value - (value * percent) / 100;
    return newValue;
  };

  useEffect(() => {
    setGrandTotal(totalPrice + biayaPengiriman + biayaTambahan);
  }, [biayaPengiriman, biayaTambahan, totalPrice]);

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
    var total = 0;
    for (var key in productTotalPrice) {
      total = total + productTotalPrice[key];
    }
  }, [totalPrice]);

  const openNotificationWithIcon = (type) => {
    if (type === "error") {
      notification[type]({
        message: "Gagal menambahkan data",
        description: "Produk gagal ditambahkan. Silahkan cek NO PO atau kelengkapan data lainnya",
      });
    } else if (type === "success") {
      notification[type]({
        message: "Berhasil menambahkan data",
        description: "Produk berhasil ditambahkan. Silahkan cek pada halaman Order Pembelian",
      });
    }
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
        <title>Tambahkan Order Pembelian</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Tambah Order Pembelian"} />
          <LayoutContent>
            <Form
              form={form}
              name="add_order"
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
                    name="no_po"
                    initialValue={`PO/ET/${totalPurchases}/${mm}/${yyyy}`}
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
                    <DatePicker placeholder="Tanggal Pesanan" size="large" format={"DD/MM/YYYY"} style={{ width: "100%" }} />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="delivery_date"
                    rules={[
                      {
                        required: true,
                        message: "Tanggal tidak boleh kosong!",
                      },
                    ]}
                  >
                    <DatePicker placeholder="Tanggal Pengiriman" size="large" format={"DD/MM/YYYY"} style={{ width: "100%" }} />
                  </Form.Item>
                </div>
                <div className="w-full md:w-3/4 px-3 mb-2 md:mb-0">
                  <p className="font-bold m-0">Alamat Supplier : </p>
                  <p className="m-0"> {supplier?.attributes.address}</p>
                  <p> {supplier?.attributes.phone}</p>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Input.Group compact>
                    <Form.Item name="tempo_days" initialValue={0}>
                      <Input
                        size="large"
                        style={{
                          width: "100%",
                        }}
                        onChange={setTempoDays}
                      />
                    </Form.Item>

                    <Form.Item name="tempo_time" initialValue={"Hari"}>
                      <Select
                        size="large"
                        onChange={setTempoOption}
                        style={{
                          width: "100%",
                        }}
                      >
                        <Select.Option value="Hari">Hari</Select.Option>
                        <Select.Option value="Bulan">Bulan</Select.Option>
                      </Select>
                    </Form.Item>
                  </Input.Group>
                </div>

                <div className="w-full md:w-4/4 px-3 mb-2 mt-5 mx-3  md:mb-0">
                  <SearchBar form={form} tempList={tempList} onChange={onChange} />
                </div>
                <div className="w-full md:w-4/4 px-3 mb-2 mt-5 mx-3  md:mb-0">
                  <OrderTable
                    mapPrice={mapPrice}
                    productTotalPrice={productTotalPrice}
                    setProductTotalPrice={setProductTotalPrice}
                    calculatePriceAfterDisc={calculatePriceAfterDisc}
                    productSubTotal={productSubTotal}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <p className="font-bold">
                  Total Item : {products.productList.length}{" "}
                </p>
              </div>
              <div className="flex justify-end">
                <p className="font-bold">Total Harga : {formatter.format(totalPrice)} </p>
              </div>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/3 px-3 mt-5 md:mb-0">
                  <Form.Item name="delivery_details">
                    <TextArea rows={4} placeholder="Detail Pengiriman" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mt-5 md:mb-0">
                  <Form.Item name="delivery_address">
                    <TextArea rows={4} placeholder="Alamat Pengiriman" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mt-5 md:mb-0">
                  <Form.Item name="delivery_fee">
                    <InputNumber onChange={sumDeliveryPrice} size="large" placeholder="Biaya Pengiriman" style={{ width: "100%" }} />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 mt-5 md:mb-0">
                  <Form.Item name="delivery_status" initialValue={"Loading"}>
                    <Select
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value="Loading">Loading</Select.Option>
                      <Select.Option value="Pending">Pending</Select.Option>
                      <Select.Option value="Antrian">Antrian</Select.Option>
                      <Select.Option value="Terkirim">Terkirim</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mt-5 md:mb-0">
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
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      {locations.map((element) => {
                        return <Select.Option value={element.id}>{element.attributes.name}</Select.Option>;
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 mt-5 md:mb-0">
                  <Upload>
                    <Button className="text-gray-500" style={{ width: "100%" }} size="large" icon={<UploadOutlined />}>
                      Upload Dokumen
                    </Button>
                  </Upload>
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
};

Tambah.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  let locations;
  let purchases;

  const req = await fetchData(cookies);
  locations = await req.json();

  const req2 = await fetchDataPurchases(cookies);
  purchases = await req2.json();

  return {
    props: {
      purchases,
      locations,
    },
  };
};

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_DB + "/locations";
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

const fetchDataPurchases = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_DB + "/purchases";
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

export default Tambah;
