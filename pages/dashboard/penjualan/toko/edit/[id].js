import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Form, Input, InputNumber, Select, Button, Spin, notification, Modal } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import SearchBar from "../../../../../components/Form/AddOrder/SearchBar";
import StoreSaleTable from "../../../../../components/ReactDataTable/Selling/StoreSaleTable";
import createSaleFunc from "../../utility/createSale";
import createDetailSaleFunc from "../../utility/createDetailSale";
import calculatePrice from "../../utility/calculatePrice";
import DateTimeComponent from "../../../../../components/DateTime/dateTime";
import Coa from "@iso/components/Form/AddCost/SearchCOA";
import CoaSale from "@iso/components/Form/AddSale/SearchCOA";
import nookies from "nookies";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import confirm from "antd/lib/modal/confirm";
import moment from "moment";

EditToko.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const req = await fetchData(cookies);
  const user = await req.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  const reqCustomer = await fetchCustomer(cookies);
  const customer = await reqCustomer.json();

  const reqUserDoc = await fetchUserDoc(cookies, user.codename);
  const userDoc = await reqUserDoc.json();
  const userLastDocNumber = userDoc.meta.pagination.total + 1;

  const initialData = await fetchInitialData(cookies, context.query.id);

  const reqStoreAccounts = await fetchStoreAccounts(cookies);
  const storeAccounts = await reqStoreAccounts.json();

  return {
    props: {
      user,
      userLastDocNumber,
      locations,
      customer,
      initialData,
      storeAccounts,
    },
  };
};

const fetchInitialData = async (cookies, id) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + `/store-sales/${id}?populate=deep`;
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

const fetchUserDoc = async (cookies, userCodeName) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-indexed month, so add 1 to get the current month
  const currentYear = currentDate.getFullYear();

  const startDate = new Date(currentYear, currentMonth - 1, 1); // create a new date object for the first day of the current month
  const endDate = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999); // create a new date object for the last day of the current month

  const startISOString = startDate.toISOString();
  const endISOString = endDate.toISOString();

  const endpoint =
    process.env.NEXT_PUBLIC_URL +
    `/store-sales?filters[no_store_sale][$contains]=${userCodeName}&filters[createdAt][$gte]=${startISOString}&filters[createdAt][$lte]=${endISOString}`;

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

const fetchLocation = async (cookies) => {
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

const fetchStoreAccounts = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/store-accounts?populate=*&filters[type][$eq]=TAMBAHAN LAIN 1"+
  "&filters[type][$eq]=TAMBAHAN LAIN 2"+
  "&filters[type][$eq]=TAMBAHAN LAIN 3"+
  "&filters[type][$eq]=ONGKIR&filters[setting][$eq]=true";
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

function EditToko({ props }) {
  console.log("props", props);
  const cookies = nookies.get(null, "token");
  const products = useSelector((state) => state.Sales);
  const dispatch = useDispatch();

  var selectedProduct = products?.productList;
  const locations = props.locations.data;
  const user = props.user;
  const userCodeName = user.codename || "-";

  const userLastDocNumber = props.userLastDocNumber;

  const initialValues = props.initialData?.data; console.log(initialValues, "initialValues");
  const storeAccounts = props.storeAccounts;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [additionalFee, setAdditionalFee] = useState();
  const [isFetchinData, setIsFetchingData] = useState(false);

  const [dataValues, setDataValues] = useState();
  const [selectedCategory, setSelectedCategory] = useState("BEBAS");
  const [selectedLocationId, setSelectedLocationId] = useState();
  const [dataLocationStock, setDataLocationStock] = useState();

  const [listId, setListId] = useState([]);
  const [productTotalPrice, setProductTotalPrice] = useState({});
  const [productSubTotal, setProductSubTotal] = useState({});
  const [discType, setDiscType] = useState();
  const [discPrice, setDiscPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [dppPrice, setdppPrice] = useState(0);
  const [ppnPrice, setppnPrice] = useState(0);

  const [dppActive, setDPPActive] = useState(true);
  const [ppnActive, setPPNActive] = useState(true);
  const [isDPPActive, setIsDPPActive] = useState(true);
  const [discMax, setDiscMax] = useState();
  const [discValue, setDiscValue] = useState(0);

  //Akun COA
  const [akunCOAONGKIR, setAkunCOAONGKIR] = useState();
  const [akunCOALAIN, setAkunCOALAIN] = useState();
  const [akunCOALAIN2, setAkunCOALAIN2] = useState();
  const [akunCOALAIN3, setAkunCOALAIN3] = useState();

  const router = useRouter();
  const { TextArea } = Input;
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var date = today.getDate() + "/" + mm + "/" + yyyy;
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  let dppValue = 0;
  let ppnValue = 0;

  // DPP & PPN
  const [dpp, setDPP] = useState(0);
  const [ppn, setPPN] = useState(0);

  // temp
  const [biayaTambahan, setBiayaTambahan] = useState();
  const [biayaPengiriman, setBiayaPengiriman] = useState(0);

  const [lokasiGudang, setLokasiGudang] = useState();

  const tempList = [];
  const [info, setInfo] = useState();

  // customer
  const [customer, setCustomer] = useState();

  // NO Store Sale
  const trxNumber = String(userLastDocNumber).padStart(3, "0");
  const [categorySale, setCategorySale] = useState(`${userCodeName}/${trxNumber}/${mm}/${yyyy}`);

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
      console.log("error", error);
      setDataLocationStock({
        ...dataLocationStock,
        [idx]: "Error fetching stock data",
      });
    }
  };

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const checkReturQty = async (values) => {
    try {
      const cannotBeReturnedProducts = [];

      const promises = products.productList.map(async (product, index) => {
        const qty = values?.jumlah_qty?.[index] ?? 1;
        const unitIndex = values?.jumlah_option?.[index] ?? 1;
        let productUnit = product.attributes?.[`unit_${unitIndex}`];
        const gudangLocatioId = selectedLocationId;

        if (typeof unitIndex === "string") {
          productUnit = unitIndex;
        }

        const returData = {
          location: gudangLocatioId,
          product: product.id,
          unit: productUnit,
          qty: qty,
        };

        const endpoint = `${process.env.NEXT_PUBLIC_URL}/product/check`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
          body: JSON.stringify(returData),
        };

        const req = await fetch(endpoint, options);
        const res = await req.json();
        console.log("repsonse", res, JSON.stringify(returData));
        if (!res?.available) {
          cannotBeReturnedProducts.push(product.attributes.name);
        }
      });

      await Promise.all(promises);
      console.log("cannotBeReturnedProducts", cannotBeReturnedProducts);
      if (cannotBeReturnedProducts.length > 0) {
        Modal.error({
          title: "Retur Gagal",
          content: (
            <div>
              <p>Item ini tidak bisa dilakukan retur. Silahkan cek kembali stok gudang yang tersedia:</p>
              <ul>
                {cannotBeReturnedProducts.map((product) => (
                  <li key={product}>{product === undefined ? "" : `- ${product}`} </li>
                ))}
              </ul>
            </div>
          ),
        });

        return true;
      }

      return false;
    } catch (error) {
      console.log("error", error);

      return false;
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

  const updateDetailData = async (data, id) => {
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/store-sale-details/${id}`;
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
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/store-sale-details`;
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

  const createMasterData = async (data) => {
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/store-sales/${initialValues.id}`;
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

  const checkStokGudang = () => {
    console.log("dataLocationStock", dataLocationStock);
    const availableStock = Object.values(dataLocationStock).every((stock) => stock);

    return availableStock;
  };

  const onFinish = async (values, accept) => {
    if (accept) {
      const stokAda = checkStokGudang();

      if (!stokAda) {
        notification["error"]({
          message: "Stok tidak tersedia",
          description: "Stok tidak tersedia di gudang. Silahkan cek kembali",
        });
        return;
      }

      setLoading(true);
      try {
        /* 
      TODO:
      * 1. Update Detail Penjualan Toko
      * 2. Update Penjualan Toko
      */

        console.log("data values", values);

        // master Penjualan Toko
        values.location = selectedLocationId;
        values.dpp = dpp;
        values.ppn = ppn;
        values.total = grandTotal;

        const sanitizedValues = cleanData(values);

        const editedProduct = products.productInfo;
        const details = products.productList?.map(({ attributes, id }, idx) => ({
          qty: editedProduct?.[idx]?.qty || 1,
          unit: editedProduct?.[idx]?.unit || attributes?.unit_1,
          unit_price: editedProduct?.[idx]?.priceUnit || attributes?.sold_price_1,
          disc: editedProduct?.[idx]?.disc || 0,
          disc1: editedProduct?.[idx]?.d1 || attributes?.disc_1_1,
          disc2: editedProduct?.[idx]?.d2 || attributes?.unit_1_dp2,
          expired_date: values?.expired_date?.[idx]?.format("YYYY-MM-DD") || null,
          product: id,
          relation_id: editedProduct?.[idx]?.relation_id,
          margin: editedProduct?.[idx]?.margin || 0,
          sub_total: productSubTotal?.[idx],
          inventory: lokasiGudang?.[idx],
        }));

        console.log("details", details);

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

        sanitizedValues.store_sale_details = detailsId;

        // update master PO
        const res = await createMasterData(sanitizedValues);
        console.log("response create master ==>", res);

        if (res?.data?.id) {
          notification.success({
            message: "Berhasil mengubah data",
            description: "Data Penjualan Toko berhasil diubah. Silahkan cek pada halaman Penjualan Toko",
          });
          router.replace("/dashboard/penjualan/toko");
        } else {
          notification.error({
            message: "Gagal mengubah data",
            description: "Data Penjualan Toko gagal diubah. Silahkan cek data anda dan coba lagi",
          });
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        notification.error({
          message: "Gagal menambahkan data",
          description: "Data Penjualan Toko gagal dibuat. Silahkan cek data anda dan coba lagi",
        });
        setLoading(false);
      }
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
    await createDetailSaleFunc(
      dataValues,
      products,
      productTotalPrice,
      productSubTotal,
      setListId,
      "/store-sale-details",
      form,
      lokasiGudang
    );
  };

  const createSale = async (values) => {
    values.sale_date = today;
    values.added_by = user.name;
    values.category = selectedCategory;
    values.dpp = dppPrice;
    values.ppn = ppnPrice;
    values.customer = customer;
    values.delivery_fee = biayaPengiriman;
    values.gudang_out = lokasiGudang;
    await createSaleFunc(grandTotal, totalPrice, values, listId, form, router, "/store-sales/", "store sale");
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

  const calculatePriceAfterDisc = (row, index) => {
    const total = calculatePrice(row, products, productTotalPrice, productSubTotal, setTotalPrice, index);
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
    if (disc.disc_value > totalPrice) {
      newTotal = 0;
      notification["error"]({
        message: "Disc tidak sesuai",
        description: "Disc tetap tidak boleh melebihi total",
      });
    }
    setDiscPrice(newTotal);
    setDiscValue(disc.disc_value);
  };

  const setTotalPriceWithPercentDisc = (disc) => {
    var newTotal = 0;

    newTotal = totalPrice - (totalPrice * disc.disc_value) / 100;
    if (newTotal < 0) newTotal = 0;
    if (disc.disc_value > 100) {
      newTotal = 0;
      notification["error"]({
        message: "Disc tidak sesuai",
        description: "Disc persentase tidak boleh 100%",
      });
    }
    setDiscPrice(newTotal);
    setDiscValue((totalPrice * disc.disc_value) / 100);
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
      setGrandTotal(discPrice + parseFloat(biayaPengiriman) + parseFloat(biayaTambahan));
    } else {
      setGrandTotal(totalPrice + parseFloat(biayaPengiriman) + parseFloat(biayaTambahan));
    }
  }, [biayaPengiriman, biayaTambahan, totalPrice, discPrice]);

  // useEffect(() => {
  //   console.log("product", products);
  //   if (products.productList.length > 0) {
  //     products.productList.forEach((item, idx) => {
  //       const selectedUnit = products.productInfo[idx]?.unitIndex;
  //       getProductAtLocation(selectedUnit, item?.id);
  //     });
  //   }
  // }, [products?.productList, products?.productInfo]);

  useEffect(() => {
    sumAdditionalPrice();
  }, [additionalFee]);

  useEffect(() => {
    dppValue = totalPrice / 1.11;
    ppnValue = (dppValue * 11) / 100;
    dppActive ? setdppPrice(dppValue) : setdppPrice(0);
    ppnActive ? setppnPrice(ppnValue) : setppnPrice(0);
  }, [dppActive, ppnActive, grandTotal, isDPPActive]);

  useEffect(() => {
    // set max value
    if (discType == "Tetap") setDiscMax(totalPrice);
    if (discType == "Persentase") setDiscMax(100);
  }, [discType]);

  useEffect(() => {
    dispatch({ type: "CLEAR_DATA" });
    clearData();

    if (initialValues) {
      const getStockData = async (productId, indexUnit, i) => {
        const stock = await getStockAtLocation(productId, indexUnit, i);

        setDataLocationStock((prev) => ({
          ...prev,
          [i]: stock,
        }));
      };

      console.log(initialValues);
      form.setFieldsValue({
        ...initialValues.attributes,
        sale_date: moment(initialValues.attributes?.sale_date),
        no_store_sale: initialValues.attributes?.no_sales_sale,
        customer_id: initialValues.attributes?.customer?.data?.id,
        location: {
          label: initialValues.attributes?.location?.data?.attributes?.name,
          value: initialValues.attributes?.location?.data?.id,
        },
      });

      if (initialValues.attributes?.dpp) {
        setDPPActive("DPP");
        setPPNActive("PPN");
      }

      if (initialValues.attributes?.delivery_fee) {
        setBiayaPengiriman(initialValues.attributes?.delivery_fee);
      }

      if (initialValues.attributes?.disc_value) {
        if (initialValues.attributes?.disc_type == "Tetap") {
          setDiscType("Tetap");
          setTotalPriceWithFixedDisc(initialValues.attributes?.disc_value);
        } else {
          setDiscType("Persentase");
          setTotalPriceWithPercentDisc(initialValues.attributes?.disc_value);
        }
      }

      [1, 2, 3].forEach((i) => {
        if (initialValues.attributes?.[`additional_fee_${i}_sub`]) {
          setAdditionalFee({
            ...additionalFee,
            [`additional_fee_${i}_sub`]: initialValues.attributes?.[`additional_fee_${i}_sub`],
          });
          form.setFieldsValue({
            [`additional_fee_${i}_desc`]: initialValues.attributes?.[`additional_fee_${i}_desc`],
          });
        }
      });

      setSelectedLocationId(initialValues.attributes?.location?.data?.id);
      setCustomer(initialValues.attributes?.customer?.data);

      if (initialValues.attributes.store_sale_details?.data.length > 0) {
        const details = initialValues.attributes.store_sale_details.data;

        for (let i = 0; i < details.length; i++) {
          const element = details[i];
          const index = i;

          const product = element.attributes?.product?.data;
          const unit = element?.attributes?.unit;

          let unitIndex = 1;

          for (let i = 1; 1 <= 5; i++) {
            if (product?.attributes?.[`unit_${i}`] === unit) {
              unitIndex = i;

              break;
            }
          }

          setLokasiGudang((prev) => ({
            ...prev,
            [index]: element.attributes?.inventory,
          }));

          getStockData(product?.id, unitIndex, index);

          form.setFieldsValue({
            ...initialValues.attributes,
            product_location: {
              [index]: element.attributes?.location?.data?.id,
            },
            harga_satuan: {
              [index]: element.attributes?.unit_price,
            },
            expired_date: {
              [index]: moment(element.attributes?.expired_date),
            },
            margin: {
              [index]: element.attributes?.margin,
            },
            jumlah_qty: {
              [index]: element.attributes?.qty,
            },
            jumlah_option: {
              [index]: unitIndex,
            },
          });

          console.log("element ==>", element);

          dispatch({
            type: "SET_INITIAL_PRODUCT",
            product,
            index,
            qty: parseInt(element.attributes?.qty || 0),
            unit,
            priceUnit: element.attributes?.unit_price || 0,
            disc: element.attributes?.disc || 0,
            d1: element.attributes?.disc1,
            d2: element.attributes?.disc2,
            unitIndex: unitIndex,
            relation_id: element.id,
            margin: element.attributes?.margin || 0,
          });

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
      router.replace("/dashboard/penjualan/sales");
    }

    if (storeAccounts.data.length > 0){

      storeAccounts.data.map((item) => {
        if (item.attributes.type === "ONGKIR") {
          setAkunCOAONGKIR(item.attributes.chart_of_account.data);
        }
        else if (item.attributes.type === "TAMBAHAN LAIN 1"){
          setAkunCOALAIN(item.attributes.chart_of_account.data);
        } 
        else if (item.attributes.type === "TAMBAHAN LAIN 2"){
          setAkunCOALAIN2(item.attributes.chart_of_account.data);
        } 
        else if (item.attributes.type === "TAMBAHAN LAIN 3"){
          setAkunCOALAIN3(item.attributes.chart_of_account.data);
        } 
      });
    }

    // reset redux state when component unmount / ondestroy
    return () => {
      dispatch({ type: "CLEAR_DATA" });
    };
  }, []);

  useEffect(() => {
    if(akunCOAONGKIR){
      form.setFieldsValue({
        akunCOA: {
          label: `${akunCOAONGKIR?.attributes?.nama}`,
          value: akunCOAONGKIR?.id,
        }
      });
    } 
    
    if(akunCOALAIN || akunCOALAIN2 || akunCOALAIN3){
      form.setFieldsValue({
        akun: {
          label: `${akunCOALAIN?.attributes?.nama}`,
          value: akunCOALAIN?.id,
        },
        lain_coa1: {
          label: `${akunCOALAIN?.attributes?.nama}`,
          value: akunCOALAIN?.id,
        },
        lain_coa2: {
          label: `${akunCOALAIN2?.attributes?.nama}`,
          value: akunCOALAIN2?.id,
        },
        lain_coa3: {
          label: `${akunCOALAIN3?.attributes?.nama}`,
          value: akunCOALAIN3?.id,
        }
      });
    }

  }, [akunCOAONGKIR, akunCOALAIN]);

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

  const buttonProps = {
    BEBAS: {
      className: "bg-cyan-700 rounded-md m-1 text-sm",
      selectedClassName: "bg-white rounded-md border border-cyan-700 m-1 text-sm",
      label: "BEBAS",
    },
    RESEP: {
      className: "bg-cyan-700 rounded-md m-1 text-sm",
      selectedClassName: "bg-white rounded-md border border-cyan-700 m-1 text-sm",
      label: "RESEP",
    },
  };

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Head>
        <title>Edit Penjualan Toko</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Penjualan Toko"} />
          <LayoutContent>
            <Row justify="space-between">
              <button disabled className="bg-yellow-500 rounded-md">
                <p className="px-3 py-2 m-0 font-bold text-white uppercase">{selectedCategory}</p>
              </button>
              <div>
                {Object.keys(buttonProps).map((category) => (
                  <button
                    key={category}
                    onClick={() => handleButtonClick(category)}
                    className={
                      selectedCategory === category
                        ? buttonProps[category].selectedClassName
                        : buttonProps[category].className
                    }
                  >
                    <p className={`px-4 py-2 m-0 text-${selectedCategory === category ? "cyan-700" : "white"}`}>
                      {buttonProps[category].label}
                    </p>
                  </button>
                ))}

                <button className="bg-cyan-700 rounded-md m-1 text-sm">
                  <p className="px-4 py-2 m-0 text-white">Laporan Penjualan</p>
                </button>
              </div>
              <div>
                <p>{user.name}</p>
              </div>
            </Row>

            <Form
              form={form}
              name="add"
              initialValues={initialValues?.data?.attributes}
              onFinish={(values) => onFinish(values, false)}
              onFinishFailed={validateError}
            >
              <DateTimeComponent />
              <div className="w-full flex flex-wrap justify-start -mx-3 mb-6 mt-1">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_store_sale"
                    initialValue={categorySale}
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
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="customer_name">
                    <Input style={{ height: "40px" }} placeholder="Nama Pelanggan" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="address">
                    <Input style={{ height: "40px" }} placeholder="Alamat" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="phone">
                    <Input style={{ height: "40px" }} placeholder="No. Telp" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="faktur">
                    <Input style={{ height: "40px" }} placeholder="Faktur" />
                  </Form.Item>
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
                <div className="w-full md:w-4/4 px-3 mb-2 mt-5 md:mb-0">
                  <StoreSaleTable
                    products={products}
                    productTotalPrice={productTotalPrice}
                    setTotalPrice={setTotalPrice}
                    setProductTotalPrice={setProductTotalPrice}
                    calculatePriceAfterDisc={calculatePriceAfterDisc}
                    productSubTotal={productSubTotal}
                    setProductSubTotal={setProductSubTotal}
                    dataLocationStock={dataLocationStock}
                    formObj={form}
                    getProduct={getProductAtLocation}
                  />
                </div>
              )}
              <div className="flex justify-end">
                <p className="font-bold">Total Item : {products.productList.length} </p>
              </div>
              <div className="flex justify-end transition-all">
                <Row>
                  <p className="font-bold">Total Harga :</p>
                  {discPrice === 0 ? (
                    <p></p>
                  ) : (
                    <p className="font-bold text-red-500 ml-2">{formatter.format(discPrice || 0)}</p>
                  )}
                  {discPrice === 0 ? (
                    <p className="font-bold ml-2">{formatter.format(totalPrice || 0)}</p>
                  ) : (
                    <p className="font-bold line-through ml-2 ">{formatter.format(totalPrice || 0)}</p>
                  )}
                </Row>
              </div>{" "}
              <div className="flex justify-end transition-all">
                <Row>
                  <p className="font-bold">DPP :</p>
                  {discPrice === 0 ? (
                    <p></p>
                  ) : (
                    <p className="font-bold text-red-500 ml-2">
                      {isDPPActive ? formatter.format(dppPrice - discValue) : formatter.format(0)}
                    </p>
                  )}

                  {""}

                  {discPrice === 0 ? (
                    <p className="font-bold ml-2">{isDPPActive ? formatter.format(dppPrice) : formatter.format(0)}</p>
                  ) : (
                    <p className="font-bold line-through ml-2 ">
                      {isDPPActive ? formatter.format(dppPrice) : formatter.format(0)}
                    </p>
                  )}
                </Row>
              </div>
              <div className="flex justify-end transition-all">
                <Row>
                  <p className="font-bold">PPN :</p>
                  {discPrice === 0 ? (
                    <p></p>
                  ) : (
                    <p className="font-bold text-red-500 ml-2">
                      {isDPPActive ? formatter.format(ppnPrice - discValue) : formatter.format(0)}
                    </p>
                  )}
                  {discPrice === 0 ? (
                    <p className="font-bold ml-2">{isDPPActive ? formatter.format(ppnPrice) : formatter.format(0)}</p>
                  ) : (
                    <p className="font-bold line-through ml-2 ">
                      {isDPPActive ? formatter.format(ppnPrice) : formatter.format(0)}
                    </p>
                  )}
                </Row>
              </div>
              <div className="w-full flex flex-wrap -mx-3 mb-1">
                <div className="w-full md:w-1/3 px-3 mt-5 ">
                  <Form.Item name="disc_type">
                    <Select
                      //disabled={products.productList.length === 0}
                      onChange={setDiscType}
                      placeholder="Pilih Jenis Diskon"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      disabled
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
                <div className="w-full md:w-1/3 px-3 mt-5 ">
                  <Form.Item name="disc_value" noStyle>
                    <InputNumber
                      //disabled={products.productList.length === 0}
                      onChange={setTotalWithDisc}
                      size="large"
                      min={0}
                      max={discMax}
                      placeholder="Diskon"
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="w-full flex flex-wrap -mx-3 my-1 ">
                <div className="w-full md:w-1/3 px-3">
                  <Form.Item name="DPP_active">
                    <Select
                      placeholder="Pakai DPP"
                      defaultValue={dppActive}
                      onChange={(e) => {
                        // isDPPActive(e);
                        setIsDPPActive(e);
                        setDPPActive(e);
                      }}
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value={true} key={"DPP"}>
                        DPP
                      </Select.Option>
                      <Select.Option value={false} key={"Active"}>
                        Tidak Ada
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <Form.Item name="PPN_active">
                    <Select
                      placeholder="Pakai PPN"
                      onChange={(e) => {
                        // isDPPActive(e);
                        setIsDPPActive(e);
                        setPPNActive(e);
                      }}
                      defaultValue={ppnActive}
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value={true} key={"PPN"}>
                        PPN
                      </Select.Option>
                      <Select.Option value={false} key={"Active"}>
                        Tidak Ada
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="w-full flex flex-wrap -mx-3 mb-1">
                <div className="w-full md:w-1/3 px-3">
                  <div className="w-full md:w-full mb-2 md:mb-0">
                    <Form.Item name="delivery_coa" noStyle>
                      <CoaSale onChange={setAkunCOAONGKIR} selectedAkun={akunCOAONGKIR} disabled/>
                    </Form.Item>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-3 ">
                  <Form.Item name="delivery_fee" noStyle>
                    <InputNumber
                      placeholder="Titipan Ongkir"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      onChange={setBiayaPengiriman}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="w-full flex md:w-3/4 justify-end mb-2">
                <p className="mb-4 font-bold text-center">Biaya Tambahan Lain Lain</p>
              </div>
              <div className="w-full flex flex-wrap justify-end mb-3">
                <div className="w-full md:w-1/3 px-3 mb-2 text-center md:mb-0">
                  <p className="mb-4 font-bold">Akun</p>
                  <Form.Item name="lain_coa1">
                    <Select
                      disabled
                      size="large"
                      style={{ width: "100%" }}
                    >
                    </Select>
                  </Form.Item>
                  <Form.Item name="lain_coa2">
                    <Select
                      disabled
                      size="large"
                      style={{ width: "100%" }}
                    >
                    </Select>
                  </Form.Item>
                  <Form.Item name="lain_coa3">
                    <Select
                      disabled
                      size="large"
                      style={{ width: "100%" }}
                    >
                    </Select>
                  </Form.Item>
                </div>
                
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
                </div>
              </div>
              <div className="flex justify-end">
                <p className="font-bold text-lg">Total Penjualan: {formatter.format(grandTotal)}</p>
              </div>
              <div className="w-full flex justify-between">
                <Form.Item name="sale_staff" className="w-full">
                  <TextArea rows={4} placeholder="Catatan Staff" />
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

export default EditToko;
