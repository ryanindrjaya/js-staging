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
import Supplier from "@iso/components/Form/AddOrder/SupplierForm";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import OrderTable from "@iso/components/ReactDataTable/Purchases/OrderTable";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Spin, Input, DatePicker, Select, InputNumber, Upload, notification } from "antd";
import createDetailOrderFunc from "../utility/createOrderDetail";
import createOrderFunc from "../utility/createOrder";
import calculatePrice from "../utility/calculatePrice";
import setDiskonValue from "../../produk/utility/setDiskonValue";

Tambah.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  let locations;
  let purchases;
  let user;

  const req = await fetchData(cookies);
  locations = await req.json();

  const req2 = await fetchDataPurchases(cookies);
  purchases = await req2.json();

  const req3 = await fetchUser(cookies);
  user = await req3.json();

  return {
    props: {
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

const fetchDataPurchases = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases";
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
  var products = useSelector((state) => state.Order);
  var selectedProduct = products?.productList;
  const dispatch = useDispatch();

  var locations = props.locations.data;
  const user = props.user;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [supplier, setSupplier] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [additionalFee, setAdditionalFee] = useState();
  const [listId, setListId] = useState([]);
  const [dataValues, setDataValues] = useState();
  const [tempoDays, setTempoDays] = useState(0);
  const [tempoOption, setTempoOption] = useState("Hari");
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
  var totalPurchases = String(props.purchases?.meta?.pagination.total + 1).padStart(3, "0"); console.log(props)
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

  const createDetailOrder = async () => {
    console.log("info total", productTotalPrice, productSubTotal);
    createDetailOrderFunc(products, productTotalPrice, productSubTotal, setListId, "/purchase-details");
  };

  const createOrder = async (values) => {
    createOrderFunc(grandTotal, totalPrice, values, listId, form, router);
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

    setBiayaTambahan(newTotal);
  };

  const calculatePriceAfterDisc = (row) => {
    const total = calculatePrice(row, products, productTotalPrice, productSubTotal, setTotalPrice);

    return formatter.format(total);
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

  useEffect(() => {
    dispatch({ type: "CLEAR_DATA" });
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

                <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">
                  <SearchBar form={form} tempList={tempList} onChange={onChange} selectedProduct={selectedProduct} user={user} />
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

              <div className="flex justify-end">
                <p className="font-bold">Total Item : {products.productList.length} </p>
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
}

export default Tambah;
