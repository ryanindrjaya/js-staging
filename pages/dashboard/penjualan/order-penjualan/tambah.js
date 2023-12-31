import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Form, Input, InputNumber, Select, Button, Spin, notification } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import SearchBar from "@iso/components/Form/AddOrder/SearchBar";
import AddSellSalesTable from "../../../../components/ReactDataTable/Selling/AddSellSalesTable";
import createOrderSaleFunc from "../utility/createOrderSale";
import createDetailOrderSaleFunc from "../utility/createDetailOrderSale";
import calculatePrice from "../utility/calculatePrice";
import Customer from "@iso/components/Form/AddSale/CustomerForm";
import nookies from "nookies";
import moment from "moment";
import confirm from "antd/lib/modal/confirm";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import getUserCodeName from "../../../../library/functions/getUserCodeName";

PesananSales.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqInven = await fetchInven(cookies);
  const inven = await reqInven.json();

  const reqSale = await fetchSale(cookies);
  const sale = await reqSale.json();

  const reqSales = await fetchSalesSale(cookies);
  const sales = await reqSales.json();

  const reqCustomer = await fetchCustomer(cookies);
  const customer = await reqCustomer.json();

  return {
    props: {
      user,
      inven,
      sale,
      customer,
      sales_sale: sales,
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

const fetchSalesSale = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sales?populate=customer";
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

function PesananSales({ props }) {
  const products = useSelector((state) => state.Sales);
  const dispatch = useDispatch();

  var selectedProduct = products?.productList;
  const user = props.user;
  const inven = props.inven.data;
  const sale = props.sale;
  const penjualanSales = props.sales_sale;
  const customerData = props.customer.data[0];

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  //const [additionalFee, setAdditionalFee] = useState();
  const [isFetchinData, setIsFetchingData] = useState(false);
  const [limitCredit, setLimitCredit] = useState(0);

  const [dataValues, setDataValues] = useState();
  //const [selectedCategory, setSelectedCategory] = useState("BEBAS");
  //const [deliveryFee, setDeliveryFee] = useState(0);

  const [listId, setListId] = useState([]);
  const [productTotalPrice, setProductTotalPrice] = useState({});
  const [productSubTotal, setProductSubTotal] = useState({});
  //const [discPrice, setDiscPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [time, setTime] = useState(moment().format("HH:mm:ss"));

  const [dataLocationStock, setDataLocationStock] = useState();
  const [lokasiGudang, setLokasiGudang] = useState();

  const router = useRouter();
  const { TextArea } = Input;
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var date = today.getDate() + "/" + mm + "/" + yyyy;

  setInterval(() => {
    setTime(moment().format("HH:mm:ss"));
  }, 1000);

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
  const [customer, setCustomer] = useState();

  // NO Sales Sale
  var noSale = String(props.sale?.meta?.pagination.total + 1).padStart(3, "0");

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onFinish = (values, accept) => {
    if (accept) {
      const creditEnough = limitCredit >= totalPrice;

      if (!creditEnough) {
        notification["error"]({
          message: "Limit kredit tidak cukup",
          description: "Limit kredit tidak cukup untuk melakukan transaksi ini",
        });
        return;
      }

      setLoading(true);
      setInfo("sukses");
      sale.data.forEach((element) => {
        if (values.no_sales_sell == element.attributes.no_sales_sell) {
          notification["error"]({
            message: "Gagal menambahkan data",
            description: "Data gagal ditambahkan, karena no penjualan sama",
          });
          setInfo("gagal");
        }
      });
      setDataValues(values);
    } else {
      confirm({
        title: "Apakah anda yakin?",
        icon: <ExclamationCircleOutlined />,
        content: "Harap periksa kembali data yang telah diinput.",
        okText: "Ya",
        okType: "danger",
        cancelText: "Tidak",
        centered: true,
        onOk() {
          onFinish(values, true);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  };

  const createDetailSale = async () => {
    await createDetailOrderSaleFunc(dataValues, products, setListId, "/sales-sell-details", lokasiGudang);
  };

  const createSale = async (values) => {
    values.sale_date = moment().format("YYYY-MM-DD");
    values.added_by = user.name;
    values.customer = customer.id;
    values.total_item = products?.productList?.length || 0;
    values.customer_name = customer?.attributes?.name;
    values.sales = user.name;
    values.status = values?.status ? values.status : "Diproses";
    await createOrderSaleFunc(values, listId, form, router, setLoading);
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
    const total = calculatePrice(row, products, productTotalPrice, productSubTotal, setTotalPrice);
    return formatter.format(total);
  };

  const clearData = () => {
    dispatch({ type: "CLEAR_DATA" });
    setTotalPrice(0);
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

  useEffect(() => {
    if (listId.length > 0) {
      console.log("list id: ", listId);
      createSale(dataValues);
    }
  }, [listId]);

  useEffect(() => {
    if (dataValues && info == "sukses") createDetailSale();
  }, [dataValues]);

  useEffect(() => {
    // set limit credit value
    if (customer) {
      let totalBelumDibayar = 0;
      penjualanSales.data.forEach((element) => {
        if (customer.id == element.attributes.customer?.data?.id && element.attributes.status_pembayaran !== "Lunas") {
          totalBelumDibayar += element.attributes.total;
        }
      });

      setLimitCredit(customer?.attributes?.credit_limit - totalBelumDibayar);
      form.setFieldsValue({
        limitCredit: formatter.format(customer?.attributes?.credit_limit - totalBelumDibayar),
      });

      var tempoDays = customer?.attributes?.credit_limit_duration;
      form.setFieldsValue({
        tempo_days: tempoDays.toString(),
        tempo_time: customer?.attributes?.credit_limit_duration_type,
      });
    }
  }, [customer]);

  async function fetchLatestNoReferensi() {
    const codename = await getUserCodeName();

    const endpoint = `${process.env.NEXT_PUBLIC_URL}/sales-sells?sort[0]=id:desc&pagination[limit]=1&filters[no_sales_sell][$contains]=${codename}/SO/`;
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
      const no = parseInt(latestDaata?.attributes?.no_sales_sell?.split("/")?.[2] || 0) + 1;
      console.log("no", no);
      const latestNoReferensi = `${codename}/SO/${String(no).padStart(5, "0")}/${moment().format("MM/YYYY")}`;
      form.setFieldsValue({
        no_sales_sell: latestNoReferensi,
      });
      return latestNoReferensi;
    }

    console.log("response from fetchLatestNoReferensi", response);
  }

  useEffect(() => {
    // used to reset redux from value before
    clearData();
    fetchLatestNoReferensi();
    form.setFieldsValue({
      customer: customerData?.attributes.name,
    });
    setCustomer(customerData);
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

  const handleEnterSubmit = (e) => {
    if (e.keyCode === 13) {
      onFinish(form.getFieldsValue(), false);
    }
  };

  return (
    <>
      <Head>
        <title>Tambah Order Penjualan</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Tambah Order Penjualan"} />
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

            <Form form={form} name="add" onFinish={(values) => onFinish(values, false)} onFinishFailed={validateError}>
              <div className="w-full flex flex-wrap justify-start -mx-3 mb-6 mt-4">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_sales_sell"
                    // initialValue={categorySale}
                    rules={[
                      {
                        required: true,
                        message: "Nomor Penjualan tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input style={{ height: "40px" }} placeholder="Mengambil nomor..." />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Customer onChangeCustomer={setCustomer} page={"SALES"} />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="tempo_days" initialValue={"0"} noStyle>
                    <Input
                      size="large"
                      style={{
                        width: "50%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="tempo_time" initialValue={"Hari"} noStyle>
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
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="limitCredit" noStyle>
                    <Input
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      suffix="Limit Kredit"
                      disabled
                      defaultValue={formatter.format(limitCredit)}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex md:w-4/4 mb-2 mt-2 mx-0  md:mb-0">
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
                      <p className="px-4 py-2 m-0 text-white">SIMPAN UNTUK PEMESANAN PENJUALAN</p>
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

export default PesananSales;
