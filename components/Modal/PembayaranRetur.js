import { Form, InputNumber, notification, Row, Select, Spin, Tag } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import PreviewTable from "../ReactDataTable/Selling/PreviewTable";
import nookies from "nookies";

export default function PembayaranRetur({
  data,
  lokasiPenjualan,
  onCancel,
  id,
  refetch,
  retur,
  preview = false,
}) {
  const [form] = Form.useForm();
  const [dataRetur, setDataRetur] = useState(data.retur_store_sale.data.attributes);
  const [totalRetur, setTotalRetur] = useState(parseInt(dataRetur?.total));
  const [payments, setPayments] = useState(data?.payments);

  const [totalPayment, setTotalPayment] = useState(0);
  const [tempoPayment, setTempoPayment] = useState(0);
  const [changePrice, setChangePrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const getGrandTotal = () => {
    var total = 0;

    if (payments.data.length > 0) {
      const lastIndex = payments.data.length - 1;
      const lastPayment = payments.data[lastIndex].attributes;

      total = total + parseFloat(lastPayment?.payment_remaining);

      return parseFloat(total).toFixed(2);
    }

    for (let index = 1; index < 4; index++) {
      total = total + parseFloat(dataRetur?.[`additional_fee_${index}_sub`] || 0);
    }

    total = total + totalRetur;

    if (dataRetur?.disc_value) {
      switch (dataRetur?.disc_type) {
        case "Persentase":
          total = total - (total * dataRetur?.disc_value) / 100;
          break;
        case "Tetap":
          total = total - dataRetur?.disc_value;
          break;
        default:
          break;
      }
    }

    return parseFloat(total).toFixed(2);
  };

  const [grandTotal, setGrandTotal] = useState(getGrandTotal());

  // refresh data
  useEffect(() => {
    form.resetFields();
    const newTotalRetur = data?.retur_store_sale?.data?.attributes?.total;
    setPayments(data?.payments);
    setDataRetur(data?.retur_store_sale?.data?.attributes);
    setTotalRetur(parseInt(newTotalRetur));
  }, [retur]);

  useEffect(() => {
    const getGrandTotal = () => {
      var total = 0;

      if (payments.data.length > 0) {
        const lastIndex = payments.data.length - 1;
        const lastPayment = payments.data[lastIndex].attributes;

        total = total + parseFloat(lastPayment?.payment_remaining);

        return parseFloat(total).toFixed(2);
      }

      for (let index = 1; index < 4; index++) {
        total = total + parseFloat(dataRetur?.[`additional_fee_${index}_sub`] || 0);
      }

      total = total + totalRetur;

      if (dataRetur?.disc_value) {
        switch (dataRetur?.disc_type) {
          case "Persentase":
            total = total - (total * dataRetur?.disc_value) / 100;
            break;
          case "Tetap":
            total = total - dataRetur?.disc_value;
            break;
          default:
            break;
        }
      }

      return parseFloat(total).toFixed(2);
    };

    setGrandTotal(getGrandTotal());
  }, [payments, dataRetur, totalRetur]);

  function formatMyDate(value, locale = "id-ID") {
    return new Date(value).toLocaleDateString(locale);
  }

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const columns = [
    {
      name: "Nama Produk",
      selector: ({ attributes }) => attributes?.product?.data?.attributes?.name,
    },
    {
      name: "Jumlah Retur",
      selector: ({ attributes }) => {
        return `${attributes?.qty} ${attributes?.unit}`;
      },
    },
    {
      name: "Harga Satuan",
      selector: ({ attributes }) => formatter.format(attributes?.unit_price),
    },
    {
      name: "Kadaluwarsa",
      selector: ({ attributes }) => formatMyDate(attributes?.expired_date),
    },
    {
      name: "Sub Total",
      selector: ({ attributes }) => formatter.format(attributes?.sub_total),
    },
  ];

  const setTotal = () => {
    var total = 0;
    var totalTempo = 0;

    const field = form.getFieldsValue();
    for (let index = 1; index < 4; index++) {
      total = total + field[`payment_value_${index}`];
    }

    for (let index = 1; index < 4; index++) {
      totalTempo = totalTempo + parseFloat(dataRetur?.[`additional_fee_${index}_sub`] || 0);
    }

    totalTempo = totalTempo + totalRetur;
    if (dataRetur?.disc_value) {
      switch (dataRetur?.disc_type) {
        case "Persentase":
          totalTempo = totalTempo - (totalTempo * dataRetur?.disc_value) / 100;
          break;
        case "Tetap":
          totalTempo = totalTempo - dataRetur?.disc_value;
          break;
        default:
          break;
      }
    }

    if (payments.data.length > 0) {
      const lastIndex = payments.data.length - 1;
      const lastPayment = payments.data[lastIndex].attributes;

      totalTempo = parseFloat(lastPayment?.payment_remaining);
    }

    var remains = totalTempo - total;

    setTotalPayment(parseFloat(total).toFixed(2));
    if (remains >= 0) {
      setTempoPayment(parseFloat(remains).toFixed(2));
      setChangePrice(0);
    } else {
      setTempoPayment(0);
      setChangePrice(parseFloat(remains * -1).toFixed(2));
    }
  };

  const BiayaTambahan = () => {
    var additionalFee = [];

    for (let index = 1; index < 4; index++) {
      if (dataRetur?.[`additional_fee_${index}_sub`]) {
        additionalFee.push(
          <div className="w-full flex justify-between">
            <p className="m-0 uppercase font-bold">Biaya Tambahan {index}</p>
            <p className="m-0 font-bold text-start">
              {formatter.format(dataRetur?.[`additional_fee_${index}_sub`] || 0).replace("Rp", "")}
            </p>
          </div>
        );
      }
    }

    return additionalFee;
  };

  const onFinish = async (values) => {
    setLoading(true);

    const dateNow = moment().format("YYYY-MM-DD");

    values.payment = totalPayment;
    values.change = changePrice;
    values.payment_remaining = tempoPayment;
    values.total_payment = parseInt(grandTotal);
    values.payment_date = dateNow;

    // put master data retur
    values.store_sale = id;

    const data = {
      data: values,
    };

    await createPayment(data);
  };

  const createPayment = async (data) => {
    const cookies = nookies.get(null);

    const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasing-payments";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSON.stringify(data),
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (req.status === 200) {
      const getNewData = await refetch();

      if (getNewData) {
        openNotificationWithIcon("success");
        onCancel();
        form.resetFields();
        setLoading(false);
      } else {
        openNotificationWithIcon("error");
        setLoading(false);
      }
    } else {
      openNotificationWithIcon("error");
      setLoading(false);
    }
  };

  const openNotificationWithIcon = (type) => {
    if (type === "error") {
      notification[type]({
        message: "Pembayaran gagal",
        description: "Pembayaran retur gagal. Silahkan cek kelengkapan data dan coba lagi",
      });
    } else if (type === "success") {
      notification[type]({
        message: "Pembayaran berhasil",
        description: "Pembayaran retur berhasil. Silahkan cek pada halaman Penjualan",
      });
    }
  };

  const PaymentHistory = () => {
    return payments?.data?.map((payment, index) => {
      return (
        <div className="w-full flex justify-between text-red-500">
          <p className="m-0 uppercase font-bold">Pembayaran {index + 1}</p>
          <p className="m-0 font-bold text-start">
            - {numberFormat(payment?.attributes?.payment || 0)}
          </p>
        </div>
      );
    });
  };

  const showErrorNotifications = () => {
    const error = form.getFieldsError();
    error.forEach((element) => {
      if (element.errors.length > 0) {
        notification["error"]({
          message: "Field Kosong",
          description: element.errors[0],
        });
      }
    });
  };

  const numberFormat = (value) => {
    let angka = value;

    // cek apakah value merupakan angka bulat
    if (value % 1 === 0) {
      angka = parseInt(value);
    }

    var formatted = `${angka}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formatted;
  };

  const StatusPembayaran = () => {
    const lastIndex = payments?.data?.length;
    const lastPayment = payments.data[lastIndex - 1];

    if (lastPayment?.attributes.payment_remaining === lastPayment?.attributes.total_payment) {
      return (
        <div
          className={`bg-[#F50] text-white text-center font-bold text-xl rounded-md border w-1/2 py-2`}
        >
          Belum Dibayar
        </div>
      );
    } else if (
      lastPayment?.attributes.payment_remaining > 0 &&
      lastPayment?.attributes.payment_remaining < lastPayment?.attributes.total_payment
    ) {
      return (
        <div
          className={`bg-[#F4B042] text-white text-center font-bold text-xl rounded-md border w-1/2 py-2`}
        >
          Dibayar Sebagian
        </div>
      );
    } else if (lastPayment?.attributes.payment_remaining <= 0) {
      return (
        <div
          className={`bg-[#87D068] text-white text-center font-bold text-xl rounded-md border w-1/2 py-2`}
        >
          Selesai
        </div>
      );
    } else {
      return (
        <div
          className={`bg-[#F4B042] text-white text-center font-bold text-xl rounded-md border w-1/2 py-2`}
        >
          Dibayar Sebagian
        </div>
      );
    }
  };

  return (
    <Form onFinish={onFinish} onFinishFailed={showErrorNotifications} form={form} className="pb-12">
      <h5 className="text-center font-bold mb-5 text-[#036B82]">
        {preview ? "LIHAT PEMBAYARAN" : "BAYAR RETUR"}
      </h5>

      <div className="w-full flex justify-center">
        <div className="flex gap-x-36">
          <div className="grid grid-cols-2 uppercase gap-1 font-bold">
            <div className="col-span-1">NO FAKTUR</div>
            <div className="col-span-1">{data.faktur}</div>
            <div className="col-span-1">TANGGAL</div>
            <div className="col-span-1">{data.sale_date}</div>
            <div className="col-span-1">CUSTOMER</div>
            <div className="col-span-1">{data.customer_name}</div>
            <div className="col-span-1">LOKASI</div>
            <div className="col-span-1">{lokasiPenjualan}</div>
          </div>
          <div className="grid grid-cols-2 h-1/2 uppercase gap-y-1 gap-x-4 font-bold">
            <div className="col-span-1">NO FAKTUR RETUR</div>
            <div className="col-span-1">{dataRetur?.faktur || "-"}</div>
            <div className="col-span-1">TANGGAL RETUR</div>
            <div className="col-span-1">{dataRetur?.retur_date || "-"}</div>
          </div>
        </div>
      </div>

      <div className="mt-3 w-full">
        <PreviewTable data={dataRetur?.retur_store_sale_details?.data || []} columns={columns} />
      </div>

      <div className="w-full flex justify-between mt-6">
        {/* METODE BAYAR */}
        {preview ? (
          <div className="w-full">
            <p className="m-0 uppercase font-bold mb-2">Status Pembayaran</p>
            <StatusPembayaran />
          </div>
        ) : (
          <div className="w-2/5 flex flex-col gap-y-2">
            <p className="uppercase font-bold text-center">Metode Bayar</p>

            <div>
              <Row justify="start">
                <Form.Item name="payment_value_1" initialValue={0} noStyle>
                  <InputNumber
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    onChange={setTotal}
                    size="large"
                    style={{ width: "40%", marginRight: "15px" }}
                  />
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Harap pilih metode pembayaran",
                    },
                  ]}
                  name="payment_method_1"
                  noStyle
                >
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
                  <InputNumber
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    onChange={setTotal}
                    size="large"
                    style={{ width: "40%", marginRight: "15px" }}
                  />
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
                  <InputNumber
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    onChange={setTotal}
                    size="large"
                    style={{ width: "40%", marginRight: "15px" }}
                  />
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

            <div className="pt-2 w-full flex flex-col items-center">
              <div className="w-[80%] flex justify-between">
                <p className="uppercase font-bold">TOTAL BAYAR</p>
                <p className="font-bold text-start">{numberFormat(totalPayment)}</p>
              </div>
              {tempoPayment > 0 && (
                <div className="w-[80%] flex justify-between">
                  <p className="uppercase font-bold">SISA PEMBAYARAN</p>
                  <p className="font-bold text-start">{numberFormat(tempoPayment)}</p>
                </div>
              )}
              {changePrice > 0 && (
                <div className="w-[80%] flex justify-between">
                  <p className="uppercase font-bold">KEMBALIAN</p>
                  <p className="font-bold text-start">{numberFormat(changePrice)}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* DETAIL RETUR */}
        <div className="w-1/4 flex flex-col gap-y-2 mr-7">
          <div className="w-full flex justify-between">
            <p className="m-0 uppercase font-bold">DPP</p>
            <p className="m-0 font-bold text-start">
              {formatter.format(dataRetur.dpp).replace("Rp", "")}
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p className="m-0 uppercase font-bold">PPN</p>
            <p className="m-0 font-bold text-start">
              {formatter.format(dataRetur.ppn).replace("Rp", "")}
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p className="m-0 uppercase font-bold">TOTAL</p>
            <p className="m-0 font-bold text-start">
              {formatter.format(dataRetur.total).replace("Rp", "")}
            </p>
          </div>

          <BiayaTambahan />

          {dataRetur.disc_type && dataRetur.disc_value ? (
            <div className="w-full flex justify-between text-red-500">
              <p className="m-0 uppercase font-bold">Diskon {dataRetur.disc_type}</p>
              <p className="m-0 font-bold text-start">
                -{" "}
                {dataRetur.disc_type === "Persentase"
                  ? dataRetur.disc_value + "%"
                  : numberFormat(dataRetur.disc_value)}
              </p>
            </div>
          ) : (
            ""
          )}

          {payments.data.length > 0 && <PaymentHistory />}

          <div className="w-full flex justify-between mt-3 ">
            <p className="m-0 uppercase font-extrabold text-2xl">TOTAL</p>
            <p className="m-0 font-extrabold text-start text-2xl">{numberFormat(grandTotal)}</p>
          </div>
        </div>
      </div>

      {preview ? (
        <div className="w-full flex justify-center gap-x-3 mt-3">
          <div
            onClick={onCancel}
            className="bg-cyan-700 w-[40%] cursor-pointer rounded-md m-1 text-sm"
          >
            <p className="px-4 py-2 m-0 text-white text-center">CLOSE</p>
          </div>
        </div>
      ) : (
        <div className="w-full flex gap-x-3 mt-3">
          {loading ? (
            <div className="rounded-md m-1 w-[40%]">
              <Spin className="w-full rounded-md">
                <button
                  disabled={totalPayment <= 0}
                  htmlType="submit"
                  className={`${
                    totalPayment <= 0 ? "opacity-80 cursor-not-allowed" : "opacity-100"
                  } bg-cyan-700 w-full transition-all rounded-md duration-200 text-sm`}
                >
                  <p className="px-4 py-2 m-0 text-white">BAYAR</p>
                </button>
              </Spin>
            </div>
          ) : (
            <button
              disabled={totalPayment <= 0}
              htmlType="submit"
              className={`${
                totalPayment <= 0 ? "opacity-80 cursor-not-allowed" : "opacity-100"
              } bg-cyan-700 w-[40%] transition-all duration-200 rounded-md m-1 text-sm`}
            >
              <p className="px-4 py-2 m-0 text-white">BAYAR</p>
            </button>
          )}
          <button onClick={onCancel} className="bg-cyan-700 w-[40%] rounded-md m-1 text-sm">
            <p className="px-4 py-2 m-0 text-white">CANCEL</p>
          </button>
        </div>
      )}
    </Form>
  );
}
