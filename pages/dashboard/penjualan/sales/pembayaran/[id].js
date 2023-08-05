import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import nookies from "nookies";
import { Row, Form, Input, Select, InputNumber, DatePicker, Button, notification, Spin, Collapse } from "antd";
import PurchasingPaymentTable from "../../../../../components/ReactDataTable/Purchases/PurchasingPaymentTable";
import * as moment from "moment";
import SalesPaymentTable from "../../../../../components/ReactDataTable/Selling/SalesPaymentTable";
import "moment/locale/id";
moment.locale("id");

Pembayaran.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sales/" + id + "?populate=deep";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };
  const res = await fetch(endpoint, options);
  const purchases = await res.json();

  if (res.status !== 200) {
  }

  return {
    props: {
      purchases,
    },
  };
};

function Pembayaran({ props }) {
  const { TextArea } = Input;
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [totalPayment, setTotalPayment] = useState(0);
  const [tempoPayment, setTempoPayment] = useState(0);
  const [changePrice, setChangePrice] = useState(0);
  const router = useRouter();

  console.log("props", props.purchases.data.attributes.sales_sale_details);

  const data = props.purchases;
  const dataTable = props.purchases.data.attributes.sales_sale_details;
  const noLPB = props.purchases.data.attributes.no_sales_sale;
  const tempoTime = props.purchases.data.attributes.tempo_time;
  const tempoDays = props.purchases.data.attributes.tempo_days;
  const statusPembayaran = props.purchases.data.attributes.status_pembayaran ?? "Belum Lunas";

  // SUPPLIER INFO
  var supplierName = props.purchases.data.attributes.customer?.data?.attributes.name;
  var supplierAddress = props.purchases.data.attributes.customer?.data?.attributes.address;

  // PURCHASING INFO
  var purchasingDate = props.purchases.data.attributes.sale_date;
  var statusPembelian = props.purchases.data.attributes.status;
  var lokasi = props.purchases.data.attributes?.locations?.data?.map((item) => item.attributes.name)?.join(", ") ?? "-";
  var totalItem = props.purchases.data.attributes.sales_sale_details.data?.length ?? 0;
  var deliveryFee = props.purchases.data.attributes.delivery_fee ?? 0;
  var priceAfterDisc = props.purchases.data.attributes.price_after_disc ?? 0;
  var totalPurchasing = props.purchases.data.attributes.total;

  // HISTORY
  var purchasingHistory = props.purchases.data.attributes.purchasing_payments?.data;
  var lastIndex = purchasingHistory.length - 1;
  var paymentRemaining = purchasingHistory[lastIndex]?.attributes.payment_remaining;

  useEffect(() => {
    setTempoPayment(getPriceAfterDisc());
    form.setFieldsValue({
      payment_date: moment(),
    });
  }, []);

  const getPriceAfterDisc = () => {
    // set payment remaining if there's a payment before.
    // if not, then set to default
    if (paymentRemaining >= 0) {
      return paymentRemaining;
    } else {
      if (priceAfterDisc === 0) {
        return totalPurchasing;
      } else {
        return priceAfterDisc;
      }
    }
  };

  const getPriceInclTax = () => {
    if (priceAfterDisc === 0) {
      return totalPurchasing;
    } else {
      return priceAfterDisc;
    }
  };

  const getTotalProduct = () => {
    var total = 0;
    props.purchases.data.attributes.sales_sale_details.data.forEach((element) => {
      total = total + element.attributes.sub_total;
    });

    return total;
  };

  const getAdditionalFee = () => {
    var total = 0;
    for (let index = 1; index < 4; index++) {
      var price = props.purchases.data.attributes?.[`additional_fee_${index}_sub`] || 0;
      total = total + price;
    }

    return total;
  };

  const getDiscPrice = () => {
    var total = 0;
    if (props.purchases.data.attributes.disc_type === "Tetap") {
      total = props.purchases.data.attributes.disc_value;
    } else if (props.purchases.data.attributes.disc_type === "Persentase") {
      var totalProduct = getTotalProduct();
      total = totalProduct - totalProduct * props.purchases.data.attributes.disc_value;
    }
    return total;
  };

  const getDPP = () => {
    var priceDisc = props.purchases.data.attributes?.price_after_disc ?? 0;
    var totalPurchasing = props.purchases.data.attributes.total;
    var dppValue = 0;

    if (props.purchases.data.attributes?.ppn) {
      if (priceDisc !== 0) {
        dppValue = priceDisc / 1.11;
      } else {
        dppValue = totalPurchasing / 1.11;
      }
    }

    return dppValue;
  };

  const getPPN = () => {
    var dppPrice = getDPP();
    var ppnPrice = 0;
    var isPPNactive = props.purchases.data.attributes.PPN_active;
    var totalPurchasing = props.purchases.data.attributes.total_purchasing;

    if (isPPNactive) {
      ppnPrice = totalPurchasing - dppPrice;
    }

    return ppnPrice;
  };

  const setTotal = () => {
    var total = 0;

    const field = form.getFieldsValue();
    for (let index = 1; index < 4; index++) {
      total = total + field[`payment_value_${index}`];
    }

    var totalTempo = getPriceAfterDisc();
    var remains = totalTempo - total;

    setTotalPayment(total);
    if (remains >= 0) {
      setTempoPayment(remains);
      setChangePrice(0);
    } else {
      setTempoPayment(0);
      setChangePrice(remains * -1);
    }
  };

  const getFirstPayment = () => {
    var firstPayment = 0;
    var paymentHistory = props.purchases.data.attributes.purchasing_payments.data[0]?.attributes?.payment;

    if (paymentHistory) {
      firstPayment = paymentHistory;
    }

    return firstPayment;
  };

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onFinish = async (values) => {
    setLoading(true);
    var isValid = true;

    // checking payment method
    if (totalPayment === 0) {
      isValid = false;
      notification["error"]({
        message: `Pembayaran kosong`,
        description: "Tidak ada pembayaran yang dilakukan. Silahkan masukan jumlah pembayaran yang akan dilakukan",
      });
    }

    for (let index = 1; index < 4; index++) {
      if (values[`payment_value_${index}`]) {
        if (values[`payment_method_${index}`] === null || values[`payment_method_${index}`] === undefined) {
          notification["error"]({
            message: `Metode Pembayaran ${index} Kosong`,
            description: "Silahkan pilih metode pembayaran terlebih dahulu",
          });
          isValid = false;
        }
      }
    }

    // if valid go to next steo
    if (isValid) await createPayment(values);

    setLoading(false);
  };

  const createPayment = async (values) => {
    var date = new Date(values.payment_date);
    var newDate = moment
      .utc(date)
      .utcOffset(7 * 60)
      .format();

    values.payment_date = newDate;
    values.payment = totalPayment;
    values.payment_remaining = tempoPayment;
    values.total_payment = getPriceInclTax();
    values.change = changePrice;
    values.sales_sale = { id: props.purchases.data.id };

    const data = {
      data: values,
    };

    const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasing-payments";
    const JSONdata = JSON.stringify(data);
    const cookies = nookies.get(null, "token");
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
      // check if payments paid off already
      if (values.payment_remaining === 0) {
        await getPaymentData(res.data.id);
      }

      router.replace("/dashboard/penjualan/sales");
      notification["success"]({
        message: `Pembayaran Berhasil`,
        description: "Pembayaran berhasil ditambahkan ke dalam pembelian. Silahkan cek untuk detail lebih lanjut",
      });
    }
  };

  const getPaymentData = async (paymentId) => {
    const id = props.purchases.data.id;
    const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sales/" + id + "?populate=deep";
    const cookies = nookies.get(null, "token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    await setPaymentStatus(res.data.attributes, paymentId);
  };

  const setPaymentStatus = async (data, paymentId) => {
    const id = props.purchases.data.id;

    for (const key in data) {
      if (data[key] === null) {
        delete data[key];
      }
    }

    var list = [];
    data.sales_sale_details.data.forEach((element) => {
      list.push({ id: element.id });
    });

    data.status_pembayaran = "Lunas";
    data.customer = { id: data.customer.data.id };
    data.sales_sell = { id: data.sales_sell?.data?.id };
    data.sales_sale_details = list;
    data.purchasing_payments = [...data?.purchasing_payments?.data?.map(({ id }) => id), paymentId];

    const postData = { data: data };
    const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sales/" + id;
    const JSONdata = JSON.stringify(postData);
    const cookies = nookies.get(null, "token");
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
      notification["success"]({
        message: `Pembayaran Lunas`,
        description: "Pembayaran pada transaksi ini sudah lunas. Silahkan cek kembali status pembayaran",
      });
    }
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

  return (
    <>
      <Head>
        <title>Pembayaran Penjualan</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Pembayaran Penjualan"} />
          <LayoutContent>
            <Form form={form} name="add" onFinishFailed={onFinishFailed} onFinish={onFinish}>
              <div>
                <Row justify="space-between">
                  <p className="text-sm font-bold">NO : {noLPB}</p>
                  <p className="text-sm font-bold">
                    Tempo : {tempoDays} {tempoTime}
                  </p>
                </Row>
              </div>

              <div className="mt-2">
                <Row justify="space-between flex flex-wrap -mx-3 mb-3">
                  <div className="w-1/3">
                    <p className="text-sm m-0 pt-1">Nama Customer : {supplierName}</p>
                    <p className="text-sm m-0 pt-1">Alamat Customer : {supplierAddress}</p>
                  </div>
                  <div className="w-1/3 uppercase">
                    {statusPembayaran === "Belum Lunas" ? (
                      <p className="text-lg m-0 pt-1 font-bold text-red-500">{statusPembayaran}</p>
                    ) : (
                      <p className="text-lg m-0 pt-1 font-bold text-green-400">{statusPembayaran}</p>
                    )}
                  </div>

                  <div className="mt-14 md:mt-1">
                    <p className="text-sm m-0 pt-1 right-16">Tanggal Penjualan : {purchasingDate}</p>
                    <p className="text-sm m-0 pt-1">Status Penjualan : {statusPembelian}</p>
                    <p className="text-sm m-0 pt-1">Lokasi Gudang : {lokasi}</p>
                    <button
                      type="button"
                      className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex mb-4 mt-4"
                    >
                      <div className="text-white text-center text-sm font-bold">
                        <a className="text-white no-underline text-xs sm:text-xs">Lihat Dokumen</a>
                      </div>
                    </button>
                  </div>
                </Row>
              </div>

              <div>
                <SalesPaymentTable data={dataTable} />
              </div>

              <div className="mt-5 mr-5 mb-5">
                <Row justify="space-between">
                  <div className="w-full md:w-1/3">
                    <Form.Item name="disc_description" noStyle>
                      <Input size="large" placeholder="Keterangan Diskon"></Input>
                    </Form.Item>
                    <div className="pt-3">
                      <Row justify="start">
                        <Form.Item name="disc_value" initialValue={0} noStyle>
                          <InputNumber size="large" style={{ width: "50%" }} />
                        </Form.Item>

                        <Form.Item name="disc_type" noStyle>
                          <Select placeholder="Jenis Diskon" size="large" style={{ width: "50%" }}>
                            <Select.Option value="Tetap" key="Tetap">
                              Tetap
                            </Select.Option>
                            <Select.Option value="Persentase" key="Persentase">
                              Persentase
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </Row>
                    </div>
                    <div className="pt-3 w-full md:w-1/3">
                      <Form.Item
                        name="payment_date"
                        rules={[
                          {
                            required: true,
                            message: "Tanggal Pembayaran tidak boleh kosong!",
                          },
                        ]}
                      >
                        <DatePicker
                          placeholder="Tanggal Pembayaran"
                          size="large"
                          format={"DD/MM/YYYY"}
                          style={{ width: "200%" }}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <p className="text-sm m-0 pt-1  text-start">
                        Saldo Di muka : {formatter.format(getFirstPayment())}
                      </p>
                      <p className="text-sm m-0 pt-1  text-start">
                        Jumlah Pembayaran : {formatter.format(totalPayment)}
                      </p>
                    </div>

                    <div className="pt-3">
                      <Row justify="start">
                        <Form.Item name="payment_value_1" initialValue={0} noStyle>
                          <InputNumber onChange={setTotal} size="large" style={{ width: "40%", marginRight: "15px" }} />
                        </Form.Item>

                        <Form.Item name="payment_method_1" noStyle>
                          <Select placeholder="Metode Pembayaran" size="large" style={{ width: "55%" }}>
                            <Select.Option value="Bank 1" key="Bank 1">
                              Bank 1
                            </Select.Option>
                            <Select.Option value="Bank 2" key="Bank 2">
                              Bank 2
                            </Select.Option>
                            <Select.Option value="Bank 3" key="Bank 3">
                              Bank 3
                            </Select.Option>
                            <Select.Option value="Cash On Delivery" key="Cash On Delivery">
                              Cash On Delivery
                            </Select.Option>
                            <Select.Option value="Bayar Langsung" key="Bayar Langsung">
                              Bayar Langsung
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </Row>
                    </div>
                    <div className="pt-3">
                      <Row justify="start">
                        <Form.Item name="payment_value_2" initialValue={0} noStyle>
                          <InputNumber onChange={setTotal} size="large" style={{ width: "40%", marginRight: "15px" }} />
                        </Form.Item>

                        <Form.Item name="payment_method_2" noStyle>
                          <Select placeholder="Metode Pembayaran" size="large" style={{ width: "55%" }}>
                            <Select.Option value="Bank 1" key="Bank 1">
                              Bank 1
                            </Select.Option>
                            <Select.Option value="Bank 2" key="Bank 2">
                              Bank 2
                            </Select.Option>
                            <Select.Option value="Bank 3" key="Bank 3">
                              Bank 3
                            </Select.Option>
                            <Select.Option value="Cash On Delivery" key="Cash On Delivery">
                              Cash On Delivery
                            </Select.Option>
                            <Select.Option value="Bayar Langsung" key="Bayar Langsung">
                              Bayar Langsung
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </Row>
                    </div>
                    <div className="pt-3">
                      <Row justify="start">
                        <Form.Item name="payment_value_3" initialValue={0} noStyle>
                          <InputNumber onChange={setTotal} size="large" style={{ width: "40%", marginRight: "15px" }} />
                        </Form.Item>

                        <Form.Item name="payment_method_3" noStyle>
                          <Select placeholder="Metode Pembayaran" size="large" style={{ width: "55%" }}>
                            <Select.Option value="Bank 1" key="Bank 1">
                              Bank 1
                            </Select.Option>
                            <Select.Option value="Bank 2" key="Bank 2">
                              Bank 2
                            </Select.Option>
                            <Select.Option value="Bank 3" key="Bank 3">
                              Bank 3
                            </Select.Option>
                            <Select.Option value="Cash On Delivery" key="Cash On Delivery">
                              Cash On Delivery
                            </Select.Option>
                            <Select.Option value="Bayar Langsung" key="Bayar Langsung">
                              Bayar Langsung
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </Row>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm m-0 pt-1  text-start">Total Item : {totalItem}</p>
                    <p className="text-sm m-0 pt-1  text-start">Total Harga : {formatter.format(getTotalProduct())}</p>
                    <p className="text-sm m-0 pt-1  text-start">Diskon : -{formatter.format(getDiscPrice())}</p>
                    <p className="text-sm m-0 pt-1  text-start">Biaya Kirim : {formatter.format(deliveryFee)}</p>
                    <p className="text-sm m-0 pt-1  text-start">Biaya Lain : {formatter.format(getAdditionalFee())}</p>
                    <p className="text-sm m-0 pt-4  text-start">DPP : {formatter.format(getDPP())}</p>
                    <p className="text-sm m-0 pt-1  text-start">PPN : {formatter.format(getPPN())}</p>
                    <p className="text-lg m-0 pt-4 font-bold text-start">TOTAL PEMBAYARAN INC PAJAK :</p>
                    <p className="text-lg m-0 pt-1 font-bold text-start">{formatter.format(getPriceInclTax())}</p>
                    <p className="text-sm m-0 pt-5 font-bold text-start">
                      PEMBAYARAN TEMPO : {formatter.format(tempoPayment)}
                    </p>
                    <p className="text-sm m-0 pt-1 font-bold text-start">
                      Total Pembayaran : {formatter.format(getPriceInclTax())}
                    </p>
                    <p className="text-sm m-0 pt-1 font-bold text-start">
                      Total Kembali : {formatter.format(changePrice)}
                    </p>
                  </div>
                </Row>
              </div>

              <div>
                <Form.Item name="additional_note">
                  <TextArea rows={4} placeholder="Catatan Tambahan" />
                </Form.Item>
              </div>

              <div className="my-5">
                <p className="font-bold">Riwayat Pembayaran</p>
                {purchasingHistory.map((element) => {
                  var date = moment(element.attributes.payment_date).format("DD MMMM YYYY");
                  return (
                    <Collapse accordion>
                      <Panel header={date} key={date}>
                        <p>{`Pembayaran 1 : ${formatter.format(element.attributes.payment_value_1)} (${
                          element.attributes.payment_method_1
                        })`}</p>
                        <p>
                          {`Pembayaran 2 : ${formatter.format(element.attributes.payment_value_2)} (${
                            element.attributes.payment_method_2 ?? "-"
                          })`}
                        </p>
                        <p>
                          {`Pembayaran 3 : ${formatter.format(element.attributes.payment_value_3)} (${
                            element.attributes.payment_method_3 ?? "-"
                          })`}
                        </p>

                        <p className="font-bold pt-5">{`Pembayaran : ${formatter.format(
                          element.attributes.payment
                        )}`}</p>
                        <p className="font-bold">{`Total Pembayaran : ${formatter.format(
                          element.attributes.total_payment
                        )}`}</p>
                        <p className="font-bold">{`Sisa Pembayaran : ${formatter.format(
                          element.attributes.payment_remaining
                        )}`}</p>
                        <p className="font-bold">{`Kembalian : ${formatter.format(element.attributes.change)}`}</p>
                        <p className="pt-5 italic">{`Catatan : ${element.attributes.additional_note ?? "-"}`}</p>
                      </Panel>
                    </Collapse>
                  );
                })}
              </div>

              <Form.Item className="mt-5">
                {loading ? (
                  <div className=" flex float-left ml-3 ">
                    <Spin />
                  </div>
                ) : (
                  <Button htmlType="submit" className=" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1">
                    Simpan
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

export default Pembayaran;
