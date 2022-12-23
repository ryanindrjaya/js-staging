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
import StoreSaleTable from "../../../../components/ReactDataTable/Selling/StoreSaleTable";
import createSaleFunc from "../utility/createSale";
import createDetailSaleFunc from "../utility/createDetailSale";
import calculatePrice from "../utility/calculatePrice";
import nookies from "nookies";

Toko.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  const reqInven = await fetchInven(cookies);
  const inven = await reqInven.json();

  const reqStoreSale = await fetchStoreSale(cookies);
  const storeSale = await reqStoreSale.json();

  return {
    props: {
      user,
      locations,
      inven,
      storeSale
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

const fetchStoreSale = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/store-sales?populate=deep";
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

const fetchInven = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/inventories?populate=deep";
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

function Toko({ props }) {
  const products = useSelector((state) => state.Order);
  const dispatch = useDispatch();

  var selectedProduct = products?.productList;
  const locations = props.locations.data;
  const user = props.user;
  const inven = props.inven.data;
  const storeSale = props.storeSale;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [additionalFee, setAdditionalFee] = useState();
  const [isFetchinData, setIsFetchingData] = useState(false);

  const [dataValues, setDataValues] = useState();
  const [selectedCategory, setSelectedCategory] = useState("BEBAS");
  const [deliveryFee, setDeliveryFee] = useState(0);

  const [listId, setListId] = useState([]);
  const [productTotalPrice, setProductTotalPrice] = useState({});
  const [productSubTotal, setProductSubTotal] = useState({});
  const [discType, setDiscType] = useState();
  const [discPrice, setDiscPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const [dppActive, setDPPActive] = useState("Active");
  const [ppnActive, setPPNActive] = useState("Active");

  const router = useRouter();
  const { TextArea } = Input;
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var date = today.getDate()+'/'+mm+'/'+yyyy;
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  // DPP & PPN
  const [dpp, setDPP] = useState(0);
  const [ppn, setPPN] = useState(0);

  // temp
  const [biayaTambahan, setBiayaTambahan] = useState();
  const [biayaPengiriman, setBiayaPengiriman] = useState(0);

  const cookies = nookies.get(null, "token");
  const tempList = [];
  const [info, setInfo] = useState();

  // NO Store Sale
  var noStoreSale = String(storeSale?.meta?.pagination.total + 1).padStart(3, "0");
  const [categorySale, setCategorySale] = useState(`TB/ET/${user.id}/${noStoreSale}/${mm}/${yyyy}`);

  const handleBiayaPengiriman = (values) => {
    setBiayaPengiriman(values.target.value);
  }; 

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onFinish = (values) => {
    setLoading(true);
    setInfo("sukses");
    storeSale.data.forEach((element) => {
      if (values.no_store_sale == element.attributes.no_store_sale) {
          notification["error"]({
              message: "Gagal menambahkan data",
              description:
                  "Data gagal ditambahkan, karena no penjualan sama",
          });
          setInfo("gagal");
      } 
    });
    setDataValues(values);
    setLoading(false);
  };

  const createDetailSale = async () => {
    await createDetailSaleFunc(dataValues, products, productTotalPrice, productSubTotal, setListId, "/store-sale-details");
  };

  const createSale = async (values) => {
    values.sale_date = today;
    values.added_by = user.name;
    values.category = selectedCategory;
    values.dpp = dpp;
    values.ppn = ppn;
    await createSaleFunc(grandTotal, totalPrice, values, listId, form, router);
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

  const onChangeNoSale = () => {
    if(selectedCategory == "BEBAS") form.setFieldValue("no_store_sale", `TR/ET/${user.id}/${noStoreSale}/${mm}/${yyyy}`);
    if(selectedCategory == "RESEP") form.setFieldValue("no_store_sale", `TB/ET/${user.id}/${noStoreSale}/${mm}/${yyyy}`);
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

  useEffect(() => {
    if(products.productList.length > 0){ 
        inven.forEach((element) => {
            products.productList.forEach((data) => {
              if (data.id == element.attributes.products.data[0].id) {
                data.stock = element.attributes.total_stock;
              }  
            });
          }
        );
    }
  }, [products.productList]);

  useEffect(() => {
    sumAdditionalPrice();
  }, [additionalFee]);

  useEffect(() => {
    if (listId.length > 0) {
      createSale(dataValues);
    }
  }, [listId]);

  useEffect(() => {
    if (dataValues && info == "sukses") createDetailSale();
  }, [dataValues]);

  useEffect(() => {
    // set dpp dan ppn
    if(dppActive == "DPP"){
      setDPP(grandTotal / 1.11);
    } if(ppnActive == "PPN"){
      setPPN((grandTotal / 1.11) * 11 / 100);
    } else {
      setDPP(0);
      setPPN(0);
    }
  }, [dppActive, ppnActive]);

  useEffect(() => {
    // used to reset redux from value before
    clearData();
  }, []);

  return (
    <>
      <Head>
        <title>Penjualan Sales</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Penjualan Sales"} />
          <LayoutContent>
            <div className="w-full flex justify-between mx-2 mt-1">
                <div className="w-full justify-start md:w-1/3">
                  <p>{date} {time}</p>
                </div>
                <div className="w-full flex justify-center md:w-1/3">
                  <button
                    //onClick={() => setSelectedCategory("RESEP")}
                    className="bg-cyan-700 rounded-md m-1 text-sm"
                  >
                    <p className="px-4 py-2 m-0 text-white">Laporan Penjualan Hari Ini</p>
                  </button>
                </div>
                <div className="w-full flex justify-end text-right md:w-1/3">
                  <p>{user.name}</p>
                </div>
            </div>

            <Form
              form={form}
              name="add"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >

              <div className="w-full flex flex-wrap justify-start -mx-3 mb-6 mt-5">
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
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="customer_name"
                    initialValue="Walk In Customer"
                    rules={[
                      {
                        required: true,
                        message: "Nama Pelanggan tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "40px" }}
                      placeholder="Nama Pelanggan"
                    />
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
                  <Form.Item name="tempo_days" initialValue={0} noStyle>
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
                          <Select.Option
                            value={element.id}
                            key={element.attributes.name}
                          >
                            {element.attributes.name}
                          </Select.Option>
                        );
                      })}
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
                    <StoreSaleTable
                      products={products}
                      productTotalPrice={productTotalPrice}
                      setTotalPrice={setTotalPrice}
                      setProductTotalPrice={setProductTotalPrice}
                      calculatePriceAfterDisc={calculatePriceAfterDisc}
                      productSubTotal={productSubTotal}
                      locations={locations}
                      formObj={form}
                    />
                  </div>
              )}

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
                      placeholder="Diskon"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/3 px-3">
                  <Form.Item noStyle>
                    <Input
                      size="large"
                      style={{
                        width: "60%",
                      }}
                      value="Biaya Pengiriman"
                      disabled
                    />
                  </Form.Item>
                  <Form.Item name="delivery_fee" initialValue={0} noStyle>
                    <Input
                      size="large"
                      style={{
                        width: "40%",
                      }}
                      onChange={handleBiayaPengiriman}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex flex-wrap -mx-3 my-1 ">
                <div className="w-full md:w-1/3 px-3">
                  <Form.Item name="DPP_active">
                    <Select
                      placeholder="Pakai DPP"
                      //onChange={setDPPActive}
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
                <div className="w-full md:w-1/3 px-3">
                  <Form.Item name="PPN_active">
                    <Select
                      placeholder="Pakai PPN"
                      //onChange={setDPPActive}
                      onChange={setPPNActive}
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

              <div className="w-full flex md:w-3/4 justify-end mb-2">
                <p className="mb-4 font-bold text-center">Biaya Tambahan Lain Lain</p>
              </div>
              <div className="w-full flex flex-wrap justify-end mb-3">
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

              <div className="w-full flex flex-wrap justify-end mb-3">
                <Form.Item name="dpp" value={dpp} className="w-full h-2 md:w-1/2 mx-2">
                  <span> DPP </span> <span>: {formatter.format(dpp)}</span>
                </Form.Item>
                <Form.Item name="ppn" value={ppn} className="w-full h-2 md:w-1/2 mx-2">
                  <span> PPN </span> <span>: {formatter.format(ppn)}</span>
                </Form.Item>
                <Form.Item name="grandtotal" value={totalPrice} className="w-full h-2 md:w-1/2 mx-2">
                  <span> Total </span> <span>: {formatter.format(totalPrice)}</span>
                </Form.Item>
                <Form.Item name="biayaPengiriman" value={biayaPengiriman} className="w-full h-2 md:w-1/2 mx-2">
                  <span> Biaya Pengiriman </span> <span>: {formatter.format(biayaPengiriman)}</span>
                </Form.Item>
                <Form.Item name="biayaTambahan" value={biayaTambahan} className="w-full h-2 md:w-1/2 mx-2">
                  <span> Biaya Tambahan </span> <span>: {formatter.format(biayaTambahan)}</span>
                </Form.Item>

                <Form.Item name="grandTotal" value={grandTotal} className="w-full h-2 md:w-1/2 mx-2 mt-3 text-lg">
                  <span> Total </span>  <span>: {formatter.format(grandTotal)}</span>
                </Form.Item>
              </div>

              <div className="w-full flex justify-between">
                <Form.Item name="sale_note" className="w-full md:w-1/2 mx-2">
                  <TextArea rows={4} placeholder="Catatan Penjualan" />
                </Form.Item>
                <Form.Item name="sale_staff" className="w-full md:w-1/2 mx-2">
                  <TextArea rows={4} placeholder="Catatan Staff" />
                </Form.Item>
              </div>

              <div  className="w-full flex justify-center">
                  <Form.Item>
                    {loading ? (
                      <div className=" flex float-left ml-3 ">
                        <Spin />
                      </div>
                    ) : (
                      <button htmlType="submit" className="bg-cyan-700 rounded-md m-1 text-sm">
                        <p className="px-4 py-2 m-0 text-white">
                          SIMPAN DAN CETAK UNTUK PEMBAYARAN PIUTANG
                        </p>
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

export default Toko;
