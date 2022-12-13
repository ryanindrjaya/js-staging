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
import moment from "moment";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import Supplier from "@iso/components/Form/AddOrder/SupplierForm";
// import EditOrderTable from "@iso/components/Form/AddOrder/EditOrderTable";
import { Row, Form, Button, Spin, Input, DatePicker, Select, InputNumber, Upload, notification } from "antd";

const Edit = ({ props }) => {
  const data = props.data;
  const locations = props.locations;

  var initialProducts = [];
  const products = data.data.attributes.purchase_details.data;
  products.forEach((element) => {
    initialProducts.push(element.attributes.products.data[0]);
  });

  //   var locations = props.locations.data;
  const [selectedLocations, setSelectedLocations] = useState();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [mapPrice, setMapPrice] = useState({});
  const [productList, setProductList] = useState(initialProducts);
  const [supplier, setSupplier] = useState(data.data.attributes.supplier.data);
  const [totalPrice, setTotalPrice] = useState(data.data.attributes.delivery_total);
  const [grandTotal, setGrandTotal] = useState(0);
  const [additionalFee, setAdditionalFee] = useState();
  const [qty, setQty] = useState();
  const [listId, setListId] = useState([]);
  const [price, setPrice] = useState();
  const [dataValues, setDataValues] = useState();
  const [tempoDays, setTempoDays] = useState(0);
  const [tempoOption, setTempoOption] = useState("Hari");
  const [doneCreateDetail, setDoneCreateDetail] = useState(false);
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
    if (mapPrice) {
      productList.forEach((element) => {
        const id = element.id;
        var qty = parseInt(dataValues.jumlah_qty[id] ?? 1);
        var unit = "";
        var subTotal = 0;

        console.log(mapPrice);
        console.log(id);
        if (mapPrice[id]) {
          var price = 0;
          if (price[id]) {
            price = price[id].price_1st;
          }

          subTotal = mapPrice[id]?.priceUnit - price;
          var price1 = calculatePercentage(subTotal, mapPrice[id].dp1);
          var price2 = calculatePercentage(price1, mapPrice[id].dp2);
          var price3 = calculatePercentage(price2, mapPrice[id].dp3);
          (unit = mapPrice[id].defaultUnit), (subTotal = price3 * qty);
        } else {
          subTotal = element.attributes.buy_price_1 - 0;
          var price1 = calculatePercentage(subTotal, element.attributes.unit_1_dp1);
          var price2 = calculatePercentage(price1, element.attributes.unit_1_dp2);
          var price3 = calculatePercentage(price2, element.attributes.unit_1_dp3);

          (unit = element.attributes.unit_1), (subTotal = price3 * qty);
        }
        POSTPurchaseDetail(qty, unit, subTotal, id);
      });
    }
  };

  const POSTPurchaseDetail = async (qty, unit, subTotal, productId) => {
    var disc = 0;

    if (price) if (price[productId]) disc = price[productId];

    var data = {
      data: {
        total_order: String(qty),
        unit_order: unit,
        sub_total: parseInt(subTotal),
        products: { id: productId },
        disc: parseInt(disc),
      },
    };

    const endpoint = process.env.NEXT_PUBLIC_URL + "/purchase-details";
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
      if (tempListId.length === productList.length) {
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

    const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases";
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
    const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases/" + id;
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
    const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me";
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

  const sumTotalPrice = () => {
    var total = 0;
    for (var key in mapPriceList) {
      total = total + mapPriceList[key];
    }

    setTotalPrice(total);
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

  const changeQty = (values, data) => {
    setQty({
      ...qty,
      [data.id]: {
        qty: values,
      },
    });
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
    console.log(price);
  }, [price]);

  useEffect(() => {
    var testMap = {};
    products.forEach((element) => {
      const product = element.attributes.products.data[0].attributes;
      const productId = element.attributes.products.data[0].id;
      const defaultUnit = element.attributes.unit_order;

      var dp1 = 0;
      var dp2 = 0;
      var dp3 = 0;
      var priceUnit = 0;
      for (let index = 1; index < 6; index++) {
        if (product[`unit_${index}`] === defaultUnit) {
          dp1 = product[`unit_${index}_dp1`];
          dp2 = product[`unit_${index}_dp2`];
          dp3 = product[`unit_${index}_dp3`];
          priceUnit = product[`buy_price_${index}`];
        }
      }

      testMap[productId] = {
        defaultUnit: defaultUnit,
        priceUnit: priceUnit,
        dp1: dp1,
        dp2: dp2,
        dp3: dp3,
      };

      setMapPrice(testMap);
    });
  }, []);

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
        <title>Edit Order Pembelian</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Edit Order Pembelian"} />
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
                  <Supplier onChangeSupplier={setSupplier} initialValue={data.data.attributes.supplier} />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    initialValue={data.data.attributes.no_po}
                    name="no_po"
                    rules={[
                      {
                        required: true,
                        message: "Nomor PO tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input disabled style={{ height: "40px" }} placeholder="No.PO" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    initialValue={moment(data.data.attributes.order_date)}
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
                    initialValue={moment(data.data.attributes.delivery_date)}
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
                    <Form.Item name="tempo_days" initialValue={data.data.attributes.tempo_days}>
                      <Input
                        size="large"
                        style={{
                          width: "100%",
                        }}
                        onChange={setTempoDays}
                      />
                    </Form.Item>
                    <Form.Item name="tempo_time" initialValue={data.data.attributes.tempo_time}>
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
                  {/* <EditOrderTable
                    initialValue={products}
                    data={productList}
                    setData={setProductList}
                    mapPrice={mapPrice}
                    setMapPrice={setMapPrice}
                    mapPriceList={mapPriceList}
                    sumTotalPrice={sumTotalPrice}
                    qty={qty}
                    changeQty={changeQty}
                    price={price}
                    setPrice={setPrice}
                  /> */}
                </div>
              </div>

              <div className="flex justify-end">
                <p className="font-bold">Total Item : {productList.length} </p>
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
                    initialValue={data.data.attributes.location.data.attributes.name}
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
                      {locations.data.map((element) => {
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
                    Edit
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

Edit.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases/" + id + "?populate=deep";
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

  if (req.status !== 200) {
    context.res.writeHead(302, {
      Location: "/signin?session=false",
      "Content-Type": "text/html; charset=utf-8",
    });
    context?.res?.end();

    return {};
  }

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

export default Edit;
