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
import createDetailOrderFunc from "../../utility/createOrderDetail";
import createOrderFunc from "../../utility/createOrder";
import calculatePrice from "../../utility/calculatePrice";
import moment from "moment";

function getUnitIndex(data, selected) {
  let unit = 0;

  for (let key in data) {
    if (key.includes("unit_") && data[key] === selected) {
      unit = parseInt(key.replace("unit_", ""));
    }
  }

  return unit;
}

Edit.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const { id } = context.query;
  let locations;
  let purchases;
  let user;

  const req = await fetchData(cookies);
  locations = await req.json();

  const req2 = await fetchDataPurchases(cookies);
  purchases = await req2.json();

  const req3 = await fetchUser(cookies);
  user = await req3.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/purchases/${id}?populate=deep`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    }
  ).then((res) => res.json());

  if (response.status === 401) {
    context.res.writeHead(302, {
      Location: "/signin?session=false",
      "Content-Type": "text/html; charset=utf-8",
    });
    context?.res?.end();

    return {};
  }

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
      purchases,
      locations,
      user,
      data: response?.data || {},
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

function Edit({ props }) {
  var products = useSelector((state) => state.Order);
  var selectedProduct = products?.productList;
  const dispatch = useDispatch();

  var locations = props.locations.data;
  const initialValues = props.data;
  const user = props.user;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [supplier, setSupplier] = useState(
    initialValues.attributes.supplier?.data
  );
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
  const [fetching, setFetching] = useState(true);

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
  var totalPurchases = String(
    props.purchases?.meta?.pagination.total + 1
  ).padStart(3, "0");
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  const { TextArea } = Input;
  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    useGrouping: true,
    groupingSeparator: ",",
    decimalSeparator: ".",
  });

  const cleanData = (data) => {
    const unusedKeys = [
      "disc_rp",
      "harga_satuan",
      "jumlah_option",
      "jumlah_qty",
    ];
    for (let key in data) {
      if (data[key] === null || data[key] === undefined) {
        delete data[key];
      } else if (unusedKeys.includes(key)) {
        delete data[key];
      }
    }

    return data;
  };

  const updateDetailData = async (data, id) => {
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/purchase-details/${id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSON.stringify({ data }),
    };

    const res = await fetch(endpoint, options).then((res) => res.json());
    return res;
  };

  const createDetailData = async (data) => {
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/purchase-details`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSON.stringify({ data }),
    };

    const res = await fetch(endpoint, options).then((res) => res.json());
    return res;
  };

  const updateMasterData = async (data, id) => {
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/purchases/${id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSON.stringify({ data }),
    };

    const res = await fetch(endpoint, options).then((res) => res.json());
    return res;
  };

  const onFinish = async (values) => {
    /*
     * Flow: update detail PO -> update master PO
     *
     * Data for Detail Order:
     * - products (redux)
     * - productTotalPrice
     * - productSubTotal
     *
     */

    setLoading(true);

    // master PO
    const sanitizedValues = cleanData(values);

    const editedProduct = products.productInfo;
    const detailsPO = products.productList?.map(({ attributes, id }, idx) => {
      const qty = editedProduct?.[idx]?.qty || 1;
      const unitPriceAfterDisc = parseFloat(
        productTotalPrice?.[idx] || attributes?.buy_price_1
      ).toFixed(2);
      const subTotal = parseFloat(unitPriceAfterDisc * qty).toFixed(2);

      return {
        total_order: String(editedProduct?.[idx]?.qty || 1),
        sub_total: subTotal,
        unit_order: editedProduct?.[idx]?.unit || attributes?.unit_1,
        disc: editedProduct?.[idx]?.disc || attributes?.purchase_discount_1,
        unit_price: editedProduct?.[idx]?.priceUnit || attributes?.buy_price_1,
        unit_price_after_disc: unitPriceAfterDisc,
        dp1: editedProduct?.[idx]?.d1 || attributes?.unit_1_dp1,
        dp2: editedProduct?.[idx]?.d2 || attributes?.unit_1_dp2,
        dp3: editedProduct?.[idx]?.d3 || attributes?.unit_1_dp3,
        products: [id],
        relation_id: editedProduct?.[idx]?.relation_id,
      };
    });

    let detailsId = [];

    for (let item in detailsPO) {
      const detail = detailsPO[item];
      const id = detail.relation_id;
      const postDetail = cleanData(detail);
      console.log("post detail", postDetail);

      if (id) {
        const res = await updateDetailData(postDetail, id);
        console.log("response update detail ==>", res);
        detailsId.push(res?.data?.id);
      } else {
        const res = await createDetailData(postDetail);
        console.log("response create detail ==>", res);
        detailsId.push(res?.data?.id);
      }
    }

    // assign detail id to master PO and assign new totalPrice
    sanitizedValues.purchase_details = detailsId;
    sanitizedValues.delivery_total = grandTotal;

    console.log("sanitizedValues", sanitizedValues);

    // update master PO
    const res = await updateMasterData(sanitizedValues, initialValues.id);
    console.log("response update master ==>", res);

    if (res?.data?.id) {
      notification.success({
        message: "Berhasil mengubah data",
        description: "Data PO berhasil diubah. Silahkan cek pada halaman Order Pembelian",
      });
      router.replace("/dashboard/pembelian/order_pembelian");
    } else {
      notification.error({
        message: "Gagal mengubah data",
        description: "Data PO gagal diubah. Silahkan cek data anda dan coba lagi",
      });
    }

    setLoading(false);
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

  const calculatePriceAfterDisc = (row, index) => {
    const total = calculatePrice(
      row,
      products,
      productTotalPrice,
      productSubTotal,
      setTotalPrice,
      index
    );

    const formattedNumber = formatter.format(total);
    console.log("harga setelah diskon", formattedNumber);

    return formattedNumber;
  };

  useEffect(() => {
    setGrandTotal(totalPrice + biayaPengiriman + biayaTambahan);
  }, [biayaPengiriman, biayaTambahan, totalPrice]);

  useEffect(() => {
    sumAdditionalPrice();
  }, [additionalFee]);

  useEffect(() => {
    var total = 0;
    for (var key in productTotalPrice) {
      total = total + productTotalPrice[key];
    }
  }, [totalPrice]);

  useEffect(() => {
    console.log("products", products);
  }, [products]);

  const openNotificationWithIcon = (type) => {
    if (type === "error") {
      notification[type]({
        message: "Gagal menambahkan data",
        description:
          "Produk gagal ditambahkan. Silahkan cek NO PO atau kelengkapan data lainnya",
      });
    } else if (type === "success") {
      notification[type]({
        message: "Berhasil menambahkan data",
        description:
          "Produk berhasil ditambahkan. Silahkan cek pada halaman Order Pembelian",
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

  useEffect(() => {
    dispatch({ type: "CLEAR_DATA" });

    if (initialValues) {
      form.setFieldsValue({
        ...initialValues.attributes,
        order_date: moment(initialValues.attributes?.order_date),
        delivery_date: moment(initialValues.attributes?.delivery_date),
        supplier_id: initialValues.attributes?.supplier?.data?.id,
        // location: initialValues.attributes?.location?.data?.id,
      });

      if (initialValues.attributes.purchase_details?.data.length > 0) {
        const details = initialValues.attributes.purchase_details.data;

        details.forEach((element, index) => {
          const product = element.attributes?.products?.data?.[0];
          const unit = getUnitIndex(
            product?.attributes,
            element?.attributes?.unit_order
          );
          dispatch({
            type: "SET_INITIAL_PRODUCT",
            product,
            index,
            qty: parseInt(element.attributes?.total_order || 0),
            unit: element.attributes?.unit_order,
            priceUnit: element.attributes?.unit_price || 0,
            disc: element.attributes?.disc || 0,
            d1: element.attributes?.dp1,
            d2: element.attributes?.dp2,
            d3: element.attributes?.dp3,
            unitIndex: unit,
            relation_id: element.id,
          });

          if (index === details.length - 1) {
            setFetching(false);
          }
        });
      }
    } else {
      notification["error"]({
        message: "Gagal mengambil data",
        description: "Data tidak ditemukan. Silahkan cek kembali",
      });
      router.replace("/dashboard/pembelian/order_pembelian");
    }

    // reset redux state when component unmount / ondestroy
    return () => {
      dispatch({ type: "CLEAR_DATA" });
    };
  }, []);

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
              // initialValues={initialValues?.attributes}
              name="add_order"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Supplier
                    supplier={supplier}
                    fetching={fetching}
                    onChangeSupplier={setSupplier}
                  />
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
                    <DatePicker
                      placeholder="Tanggal Pesanan"
                      size="large"
                      format={"DD/MM/YYYY"}
                      style={{ width: "100%" }}
                    />
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
                    <DatePicker
                      placeholder="Tanggal Pengiriman"
                      size="large"
                      format={"DD/MM/YYYY"}
                      style={{ width: "100%" }}
                    />
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
                  <SearchBar
                    form={form}
                    tempList={tempList}
                    onChange={onChange}
                    selectedProduct={selectedProduct}
                    user={user}
                  />
                </div>
                <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">
                  {fetching ? (
                    <div className="w-full flex items-center justify-center">
                      <Spin size="large" />
                    </div>
                  ) : (
                    <OrderTable
                      products={products}
                      productTotalPrice={productTotalPrice}
                      setTotalPrice={setTotalPrice}
                      calculatePriceAfterDisc={calculatePriceAfterDisc}
                      productSubTotal={productSubTotal}
                      setProductSubTotal={setProductSubTotal}
                      formObj={form}
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <p className="font-bold">
                  Total Item : {products.productList.length}{" "}
                </p>
              </div>
              <div className="flex justify-end">
                <p className="font-bold">
                  Total Harga : {formatter.format(totalPrice)}{" "}
                </p>
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
                    <InputNumber
                      onChange={sumDeliveryPrice}
                      formatter={(value) =>
                        value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      size="large"
                      placeholder="Biaya Pengiriman"
                      style={{ width: "100%" }}
                    />
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
                        return (
                          <Select.Option value={element.id}>
                            {element.attributes.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 mt-5 md:mb-0">
                  <Upload>
                    <Button
                      className="text-gray-500"
                      style={{ width: "100%" }}
                      size="large"
                      icon={<UploadOutlined />}
                    >
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
                  Total Order Pembelian :{" "}
                  {grandTotal === 0
                    ? formatter.format(totalPrice)
                    : formatter.format(grandTotal)}
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
                  <Button
                    onClick={validateError}
                    htmlType="submit"
                    className=" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1"
                  >
                    Submit
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

export default Edit;
