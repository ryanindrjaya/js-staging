import Head from "next/head";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Row,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Spin,
  notification,
  DatePicker,
} from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import SearchBar from "@iso/components/Form/AddCost/SearchCOA";
import AddJurnalTable from "@iso/components/ReactDataTable/Cost/AddJurnalTable";
//import createOrderSaleFunc from "../utility/createOrderSale";
//import createDetailOrderSaleFunc from "../utility/createDetailOrderSale";
import calculatePrice from "../utility/calculatePrice";
import Customer from "@iso/components/Form/AddSale/CustomerForm";
import nookies from "nookies";

AkunCOA.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqDataUser = await fetchUser(cookies);
  const dataUser = await reqDataUser.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  const reqInven = await fetchInven(cookies);
  const inven = await reqInven.json();

  const reqSale = await fetchSale(cookies);
  const sale = await reqSale.json();

  const reqCustomer = await fetchCustomer(cookies);
  const customer = await reqCustomer.json();

  return {
    props: {
      user,
      dataUser,
      locations,
      inven,
      sale,
      customer,
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

const fetchUser = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users?populate=*";
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sells?populate=deep";
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

const fetchCustomer = async (cookies) => {
  let name = "walk in customer";
  const endpoint =
    process.env.NEXT_PUBLIC_URL + `/customers?filters[name][$contains]=${name}`;
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

function AkunCOA({ props }) {
  const akuns = useSelector((state) => state.Cost); console.log("products", akuns);
  const dispatch = useDispatch();

  var selectedAkun = akuns?.akun;
  const locations = props.locations.data;
  const user = props.user;
  const inven = props.inven.data;
  const sale = props.sale;
  const customerData = props.customer.data[0];
  const dataUser = props.dataUser;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [akunList, setAkunList] = useState([]);
  //const [additionalFee, setAdditionalFee] = useState();
  const [isFetchinData, setIsFetchingData] = useState(false);

  const [dataValues, setDataValues] = useState();
  //const [selectedCategory, setSelectedCategory] = useState("BEBAS");
  //const [deliveryFee, setDeliveryFee] = useState(0);

  const [listId, setListId] = useState([]);
  const [productTotalPrice, setProductTotalPrice] = useState({});
  const [productSubTotal, setProductSubTotal] = useState({});
  useState({});
  //const [discPrice, setDiscPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  useState({});
  const [grandTotal, setGrandTotal] = useState(0);

  const router = useRouter();
  const { TextArea } = Input;
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var date = today.getDate() + "/" + mm + "/" + yyyy;
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

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
  const [categorySale, setCategorySale] = useState(
    `JM/ET/${user.id}/${noSale}/${mm}/${yyyy}`
  );

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onFinish = (values) => {
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
    setLoading(false);
  };

  //const createDetailSale = async () => {
  //  await createDetailOrderSaleFunc(
  //    dataValues,
  //    akuns,
  //    setListId,
  //    "/sales-sell-details"
  //  );
  //};

  //const createSale = async (values) => {
  //  values.sale_date = today;
  //  values.added_by = user.name;
  //  values.customer = customer;
  //  await createOrderSaleFunc(values, listId, form, router);
  //};

  const onChangeAkun = async () => {
    var isDuplicatedData = false;

    tempList.find((item) => {
      akunList.forEach((element) => {
        if (element.id === item.id) isDuplicatedData = true;
      });
    });

    if (!isDuplicatedData) {
      setAkunList((list) => [...list, tempList[0]]);
      //toast.success("Akun berhasil ditambahkan!", {
      //  position: toast.POSITION.TOP_RIGHT,
      //  autoClose: 1000,
      //});
      console.log("duplicated");
    }
    console.log("duplicated", tempList, akunList, !isDuplicatedData);
  };

  //const calculatePriceAfterDisc = (row) => {
  //  const total = calculatePrice(
  //    row,
  //    products,
  //    productTotalPrice,
  //    productSubTotal,
  //    setTotalPrice
  //  );
  //  return formatter.format(total);
  //};

  const clearData = () => {
    dispatch({ type: "CLEAR_DATA" });
    setTotalPrice(0);
  };

  //useEffect(() => {
  //  if (products.productList.length > 0) {
  //    inven.forEach((element) => {
  //      products.productList.forEach((data) => {
  //        if (data.id == element.attributes.products.data[0].id) {
  //          data.stock = element.attributes.total_stock;
  //        }
  //      });
  //    });
  //  }
  //}, [products.productList]);

  useEffect(() => {
    if (listId.length > 0) {
      createSale(dataValues);
    }
  }, [listId]);

  useEffect(() => {
    if (dataValues && info == "sukses") createDetailSale();
  }, [dataValues]);

  useEffect(() => {
    // used to reset redux from value before
    clearData();
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

  return (
    <>
      <Head>
        <title>Penjualan Pesanan Sales</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Jurnal Memo"} />
          <LayoutContent>
            <Form
              form={form}
              name="add"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={validateError}
            >
              <div className="w-full flex flex-wrap justify-start -mx-3 mb-6 mt-4">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="no_jurnal"
                    initialValue={categorySale}
                    rules={[
                      {
                        required: true,
                        message: "Nomor Jurnal tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "40px" }}
                      placeholder="No. Jurnal"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item
                    name="users" //initialValue={"Hari"}
                    noStyle
                  >
                    <Select
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      placeholder="User"
                    >
                      {dataUser.map((element) => {
                        return (
                          <Select.Option value={element.id} key={element.name}>
                            {element.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="tanggal"
                    //initialValue={categorySale}
                    //rules={[
                    //    {
                    //        required: true,
                    //        message: "Nomor Penjualan tidak boleh kosong!",
                    //    },
                    //]}
                  >
                    <DatePicker
                      placeholder="Tanggal Jurnal"
                      size="large"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
                {/*<div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">*/}
                {/*  <Customer onChangeCustomer={setCustomer} />*/}
                {/*</div>*/}
                {/*<div className="w-full md:w-1/4 px-3 mb-2">*/}
                {/*  <Form.Item name="tempo_days" initialValue={"0"} noStyle>*/}
                {/*    <Input*/}
                {/*      size="large"*/}
                {/*      style={{*/}
                {/*        width: "50%",*/}
                {/*      }}*/}
                {/*    />*/}
                {/*  </Form.Item>*/}
                {/*  <Form.Item name="tempo_time" initialValue={"Hari"} noStyle>*/}
                {/*    <Select*/}
                {/*      size="large"*/}
                {/*      style={{*/}
                {/*        width: "50%",*/}
                {/*      }}*/}
                {/*    >*/}
                {/*      <Select.Option value="Hari" key="Hari">*/}
                {/*        Hari*/}
                {/*      </Select.Option>*/}
                {/*      <Select.Option value="Bulan" key="Bulan">*/}
                {/*        Bulan*/}
                {/*      </Select.Option>*/}
                {/*    </Select>*/}
                {/*  </Form.Item>*/}
                {/*</div>*/}
                {/*<div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">*/}
                {/*  <Form.Item*/}
                {/*    name="location"*/}
                {/*    rules={[*/}
                {/*      {*/}
                {/*        required: true,*/}
                {/*        message: "Lokasi tidak boleh kosong!",*/}
                {/*      },*/}
                {/*    ]}*/}
                {/*  >*/}
                {/*    <Select*/}
                {/*      placeholder="Pilih Lokasi"*/}
                {/*      size="large"*/}
                {/*      style={{*/}
                {/*        width: "100%",*/}
                {/*      }}*/}
                {/*    >*/}
                {/*      {locations.map((element) => {*/}
                {/*        return (*/}
                {/*          <Select.Option*/}
                {/*            value={element.id}*/}
                {/*            key={element.attributes.name}*/}
                {/*          >*/}
                {/*            {element.attributes.name}*/}
                {/*          </Select.Option>*/}
                {/*        );*/}
                {/*      })}*/}
                {/*    </Select>*/}
                {/*  </Form.Item>*/}
                {/*</div>*/}
              </div>

              <div className="w-full flex md:w-4/4 px-3 mb-2 mt-2 mx-0  md:mb-0">
                <SearchBar
                  form={form}
                  tempList={tempList}
                  onChange={onChangeAkun}
                  user={user}
                  selectedAkun={selectedAkun}
                  isBasedOnLocation={false}
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
                  <AddJurnalTable
                    data={akuns}
                    formObj={form}
                  />
                </div>
              )}

              {/*<div className="w-full mt-8 flex justify-between">*/}
              {/*  <Form.Item name="sale_note" className="w-full mx-2">*/}
              {/*    <TextArea rows={4} placeholder="Catatan" />*/}
              {/*  </Form.Item>*/}
              {/*</div>*/}

              <div className="w-full flex justify-left">
                <Form.Item>
                  {loading ? (
                    <div className=" flex float-left ml-3 ">
                      <Spin />
                    </div>
                  ) : (
                    <button
                      htmlType="submit"
                      className="bg-cyan-700 rounded-md m-1 text-sm"
                    >
                      <p className="px-4 py-2 m-0 text-white">SIMPAN</p>
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

export default AkunCOA;
