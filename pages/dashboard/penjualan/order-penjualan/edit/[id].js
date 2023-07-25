import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Form, Input, InputNumber, Select, Button, Spin, notification } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import AddSellSalesTable from "../../../../../components/ReactDataTable/Selling/AddSellSalesTable";
import createOrderSaleFunc from "../../utility/createOrderSale";
import createDetailOrderSaleFunc from "../../utility/createDetailOrderSale";
import calculatePrice from "../../utility/calculatePrice";
import LoadingAnimations from "@iso/components/Animations/Loading";
import Customer from "@iso/components/Form/AddSale/CustomerForm";
import nookies from "nookies";

EditPesananSales.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const { id } = context.query;

  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/sales-sells/${id}?populate=deep`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  }).then((res) => res.json());

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqInven = await fetchInven(cookies);
  const inven = await reqInven.json();

  const reqSale = await fetchSale(cookies);
  const sale = await reqSale.json();

  const reqCustomer = await fetchCustomer(cookies);
  const customer = await reqCustomer.json();

  return {
    props: {
      user,
      inven,
      sale,
      customer,
      data: response?.data || {},
    },
  };
};

const fetchData = async (cookies) => {
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

const fetchSale = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sells?populate=*";
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

const fetchInven = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/inventories?populate=*";
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

const fetchCustomer = async (cookies) => {
  let name = "walk in customer";
  const endpoint = process.env.NEXT_PUBLIC_URL + `/customers?filters[name][$contains]=${name}`;
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

function EditPesananSales({ props }) {
  const products = useSelector((state) => state.Order);
  const dispatch = useDispatch();

  var selectedProduct = products?.productList;
  const user = props.user;
  const inven = props.inven.data;
  const sale = props.sale;
  const initialValues = {
    ...props.data?.attributes,
  };
  const masterId = props.data?.id;
  const customerData = initialValues?.customer.data;

  console.log("initialvalues", initialValues);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  //const [additionalFee, setAdditionalFee] = useState();
  const [isFetchinData, setIsFetchingData] = useState(true);

  const [dataValues, setDataValues] = useState();
  //const [selectedCategory, setSelectedCategory] = useState("BEBAS");
  //const [deliveryFee, setDeliveryFee] = useState(0);

  const [listId, setListId] = useState([]);
  const [productTotalPrice, setProductTotalPrice] = useState({});
  const [productSubTotal, setProductSubTotal] = useState({});
  //const [discPrice, setDiscPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const [dataLocationStock, setDataLocationStock] = useState();
  const [lokasiGudang, setLokasiGudang] = useState();

  const router = useRouter();
  const { TextArea } = Input;
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var date = today.getDate() + "/" + mm + "/" + yyyy;
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  // DPP & PPN
  //const dpp = 1.11;
  //var ppn = 0;

  // temp
  //const [biayaTambahan, setBiayaTambahan] = useState();
  //const [biayaPengiriman, setBiayaPengiriman] = useState(0);

  const cookies = nookies.get(null, "token");
  const tempList = [];

  const [info, setInfo] = useState();

  // customer
  const [customer, setCustomer] = useState(customerData);

  // NO Sales Sale
  var noSale = String(props.sale?.meta?.pagination.total + 1).padStart(3, "0");
  const [categorySale, setCategorySale] = useState(`PPS/ET/${user.id}/${noSale}/${mm}/${yyyy}`);

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const updateDetailData = async (data, id) => {
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/sales-sell-details/${id}`;
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
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/sales-sell-details`;
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
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/sales-sells/${id}`;
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
    setLoading(true);

    values.customer = customer?.id;
    values.customer_name = customer?.attributes?.name;
    values.total_item = products.productList?.length;

    // master PO
    const sanitizedValues = cleanData(values);

    const editedProduct = products.productInfo;
    const details = products.productList?.map(({ attributes, id }, idx) => {
      return {
        qty: editedProduct?.[idx]?.qty || 1,
        unit: editedProduct?.[idx]?.unit || attributes?.unit_1,
        unit_price: editedProduct?.[idx]?.priceUnit || attributes?.buy_sold_1,
        disc1: editedProduct?.[idx]?.d1 || attributes?.unit_1_dp1,
        disc2: editedProduct?.[idx]?.d2 || attributes?.unit_1_dp2,
        product: id,
        relation_id: editedProduct?.[idx]?.relation_id,
        inventory: lokasiGudang?.[idx],
      };
    });

    let detailsId = [];

    for (let item in details) {
      const detail = details[item];
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
    sanitizedValues.sales_sell_details = detailsId;

    console.log("sanitizedValues", sanitizedValues);

    // update master PO
    const res = await updateMasterData(sanitizedValues, masterId);
    console.log("response update master ==>", res);

    if (res?.data?.id) {
      notification.success({
        message: "Berhasil mengubah data",
        description: "Data Order Penjualan berhasil diubah. Silahkan cek pada halaman Order Penjualan",
      });
      router.replace("/dashboard/penjualan/order-penjualan");
    } else {
      notification.error({
        message: "Gagal mengubah data",
        description: "Data Order Penjualan gagal diubah. Silahkan cek data anda dan coba lagi",
      });
    }

    setLoading(false);
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

  const cleanData = (data) => {
    const unusedKeys = ["disc_rp", "harga_satuan", "jumlah_option", "jumlah_qty"];
    for (let key in data) {
      if (data[key] === null || data[key] === undefined) {
        delete data[key];
      } else if (unusedKeys.includes(key)) {
        delete data[key];
      }
    }

    return data;
  };

  useEffect(() => {
    if (products.productList.length > 0) {
      inven.forEach((element) => {
        products.productList.forEach((data) => {
          if (data.id == element.attributes.product?.data?.id) {
            let temp = {};

            for (let i = 1; i < 6; i++) {
              if (data?.attributes?.[`unit_${i}`]) {
                temp[data?.attributes?.[`unit_${i}`]] = {
                  stock: element.attributes[`stock_unit_${i}`],
                  unit: data?.attributes?.[`unit_${i}`],
                };
              }
            }

            data.stock = temp;
          }
        });
      });

      let grandTotal = 0;

      // set grand total
      const subtotals = products.productList.map((element, idx) => {
        const unitPrice =
          products?.productInfo?.[idx]?.priceUnit ||
          products?.productInfo?.[idx]?.unit_price ||
          element?.attributes?.buy_price_1;

        const qty = products?.productInfo?.[idx]?.qty || 1;
        const diskonJual = products?.productInfo?.[idx]?.d1 || element.attributes?.unit_1_dp1 || 0;

        return unitPrice * qty - (unitPrice * qty * diskonJual) / 100;
      });

      grandTotal = subtotals.reduce((a, b) => a + b, 0);

      setTotalPrice(grandTotal);
    }
  }, [products]);

  function getUnitIndex(data, selected) {
    let unit = 0;

    for (let key in data) {
      if (key.includes("unit_") && data[key] === selected) {
        unit = parseInt(key.replace("unit_", ""));
      }
    }

    return unit;
  }

  useEffect(() => {
    dispatch({ type: "CLEAR_DATA" });

    const getStockData = async (productId, indexUnit, i) => {
      const stock = await getStockAtLocation(productId, indexUnit, i);

      setDataLocationStock((prev) => ({
        ...prev,
        [i]: stock,
      }));
    };

    if (initialValues) {
      form.setFieldsValue({
        customer: customerData?.attributes.name,
        location: initialValues?.location,
        no_sales_sell: initialValues?.no_sales_sell,
        tempo_days: initialValues?.tempo_days,
        tempo_time: initialValues?.tempo_time,
        sale_date: initialValues?.sale_date,
        sale_note: initialValues?.sale_note,
      });
      setCustomer(customerData);
      if (initialValues.sales_sell_details?.data.length > 0) {
        const details = initialValues.sales_sell_details.data;

        console.log("details", details);

        for (let index = 0; index < details?.length; index++) {
          const element = details[index];
          const product = element.attributes?.product?.data;
          const unit = getUnitIndex(product?.attributes, element?.attributes?.unit);
          dispatch({
            type: "SET_INITIAL_PRODUCT",
            product,
            index,
            qty: parseInt(element.attributes?.qty || 0),
            unit: element.attributes?.unit,
            priceUnit: element.attributes?.unit_price || 0,
            d1: element.attributes?.disc1,
            d2: element.attributes?.disc2,
            unitIndex: unit,
            relation_id: element?.id,
          });

          getStockData(product?.id, unit, index);

          if (index === details.length - 1) {
            setIsFetchingData(false);
          }
        }
      }
    } else {
      notification["error"]({
        message: "Gagal mengambil data",
        description: "Data tidak ditemukan. Silahkan cek kembali",
      });
      router.replace("/dashboard/pembelian/order-penjualan");
    }

    // reset redux state when component unmount / ondestroy
    return () => {
      dispatch({ type: "CLEAR_DATA" });
    };
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

  async function getStock(productId, unit) {
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + `/inventories/user/location?product=${productId}&unit=${unit}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    console.log("res get stock at location", res);

    return res;
  }

  const getProductAtLocation = async (unit = 1, changedIdx = products?.productList?.length - 1 ?? 0) => {
    const locationId = form.getFieldValue("location");
    let tempData = dataLocationStock;

    // create an array of promises by mapping over the productList
    const promises = products.productList.map(async (product, idx) => {
      if (idx === changedIdx) {
        const stock = await getStockAtLocation(product.id, unit, idx);
        console.log("stock ", product.id, stock);

        tempData = {
          ...tempData,
          [idx]: stock,
        };

        return stock; // return a promise from each iteration
      }
    });

    try {
      // use Promise.all() to execute all promises in parallel
      await Promise.all(promises);
      setDataLocationStock(tempData); // update state after all promises have resolved
      console.log("done");
    } catch (error) {
      console.error(error); // handle errors that may occur
    }
  };

  console.log("dataLocationStock", dataLocationStock);

  const getStockAtLocation = async (productId, unit, idx) => {
    try {
      const response = await getStock(productId, unit);
      console.log("response", response);

      if (response?.data) {
        // sort based on qty desc
        const sortedBasedOnQty = response.data.sort((a, b) => b.availableStock - a.availableStock);
        setLokasiGudang({
          ...lokasiGudang,
          [idx]: sortedBasedOnQty,
        });
      }

      console.log(`response ${unit}`, response?.stock?.[unit]);

      const stringArr = [];

      for (const [key, value] of Object.entries(response?.stock)) {
        stringArr.push(`${value} ${key}`);
      }

      return response.available ? stringArr.join(", ") : "Stok kosong";
    } catch (error) {
      console.error("error", error);
      setDataLocationStock({
        ...dataLocationStock,
        [idx]: "Error fetching stock data",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Edit Order Penjualan</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Edit Order Penjualan"} />
          <LayoutContent>
            <div className="w-full flex justify-between mx-2 mt-1">
              <div className="w-full justify-start md:w-1/3">
                <p>
                  {date} {time}
                </p>
              </div>
              <div className="w-full flex justify-center md:w-1/3">
                <button
                  //onClick={() => setSelectedCategory("RESEP")}
                  className="bg-cyan-700 rounded-md m-1 text-sm"
                >
                  <p className="px-4 py-2 m-0 text-white">Order Penjualan</p>
                </button>
              </div>
              <div className="w-full flex justify-end text-right md:w-1/3">
                <p>{user.name}</p>
              </div>
            </div>

            <Form form={form} name="add" onFinish={onFinish} onFinishFailed={validateError}>
              <div className="w-full flex flex-wrap justify-start -mx-3 mb-6 mt-4">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_sales_sell"
                    rules={[
                      {
                        required: true,
                        message: "Nomor Penjualan tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input style={{ height: "40px" }} placeholder="No. Penjualan" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Customer customer={customer} onChangeCustomer={setCustomer} />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="tempo_days" noStyle>
                    <Input
                      size="large"
                      style={{
                        width: "50%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="tempo_time" noStyle>
                    <Select
                      size="large"
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
              </div>

              <div className="w-full flex md:w-4/4 px-3 mb-2 mt-2 mx-0  md:mb-0">
                <SearchBar
                  form={form}
                  tempList={tempList}
                  onChange={onChangeProduct}
                  user={user}
                  selectedProduct={selectedProduct}
                  isBasedOnLocation={false}
                  getProductAtLocation={getProductAtLocation}
                  available
                />
              </div>

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
                <>
                  <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">
                    <AddSellSalesTable
                      products={products}
                      productTotalPrice={productTotalPrice}
                      setTotalPrice={setTotalPrice}
                      setProductTotalPrice={setProductTotalPrice}
                      dataLocationStock={dataLocationStock}
                      getProduct={getProductAtLocation}
                      productSubTotal={productSubTotal}
                      formObj={form}
                    />
                  </div>
                  <div className="flex justify-end">
                    <p className="font-bold">Total Item : {products.productList.length} </p>
                  </div>
                  <div className="flex justify-end transition-all">
                    <Row>
                      <p className="font-bold">Total Order Penjualan :</p>
                      <p className="font-bold ml-2 ">{formatter.format(totalPrice || 0)}</p>
                    </Row>
                  </div>
                </>
              )}

              <div className="w-full mt-8 flex justify-between">
                <Form.Item name="sale_note" className="w-full mx-2">
                  <TextArea rows={4} placeholder="Catatan" />
                </Form.Item>
              </div>

              <div className="w-full flex justify-center">
                <Form.Item>
                  {loading ? (
                    <div className=" flex float-left ml-3 ">
                      <Spin />
                    </div>
                  ) : (
                    <button htmlType="submit" className="bg-cyan-700 rounded-md m-1 text-sm">
                      <p className="px-4 py-2 m-0 text-white">SIMPAN PERUBAHAN</p>
                    </button>
                  )}
                </Form.Item>
              </div>
            </Form>
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default EditPesananSales;
