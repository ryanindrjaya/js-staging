import React from "react";
import nookies from "nookies";
import { PrinterOutlined } from "@ant-design/icons";
import moment from "moment";
import DataTable from "react-data-table-component";

var formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 2,
});

const Print = ({ selling }) => {
  const data = selling.data?.attributes;
  const print = () => {
    window.print();
    return false;
  };

  console.log("data", selling);

  // stakeholder info
  const stakeholder = "APOTEK SEJATI";
  const stakeholderAddress = "Jl. Merdeka Timur No.2-10, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65119";
  const stakeholderPhone = "(0341) 325837/369339/322208";
  const stakeholderWa = "089523886198";
  const stakeholderNPWP = "75.777.135.7.623.000";

  // customer
  const customer = data.customer?.data?.attributes;

  // details
  const details = data.sales_sale_details?.data;
  const jatuhTempo = moment(data?.sale_date)
    .add(parseInt(data.tempo_days), data.tempo_time === "Hari" ? "d" : "M")
    .format("DD/MM/YYYY");
  const totalPembelian = details.reduce((a, b) => a + b.attributes.sub_total, 0);

  const calculatePercentage = (value, percent) => {
    var newValue = value - (value * percent) / 100;
    return newValue;
  };

  const getHargaNet = (data) => {
    const price = data.unit_price - (data?.disc || 0);
    const priceWithMargin = price + (price * data.margin) / 100;
    const price1 = calculatePercentage(priceWithMargin, data?.disc1 || 0);
    const hargaNet = calculatePercentage(price1, data?.disc2 || 0);

    return formatter.format(hargaNet ?? 0);
  };

  const getHargaSatuan = (data) => {
    const price = data?.unit_price || 0;
    const priceWithMargin = price + (price * data.margin) / 100;

    return formatter.format(priceWithMargin ?? 0);
  };

  return (
    <div className="m-2">
      <div className="flex print:hidden justify-end mb-5">
        <button onClick={print} className=" rounded-full bg-sky-400 px-4 py-2 font-bold text-white">
          <span>
            <PrinterOutlined className="mr-1 text-lg" />
          </span>{" "}
          Cetak Dokumen
        </button>
      </div>

      {/* PRINT */}
      <div className="w-full grid grid-cols-3 gap-x-12 mb-3">
        <div className="stakeholder">
          <p className="m-0 font-semibold">{stakeholder}</p>
          <p className="m-0">{stakeholderAddress}</p>
          <p className="m-0">TLP {stakeholderPhone}</p>
          <div className="grid grid-cols-12  gap-x-1">
            <p className="m-0 col-span-2">WA</p>
            <p className="m-0 col-span-10">: {stakeholderWa}</p>
            <p className="m-0 col-span-2">NPWP</p>
            <p className="m-0 col-span-10">: {stakeholderNPWP}</p>
          </div>
          <div className="grid grid-cols-12 gap-x-1 mt-3 font-bold">
            <p className="m-0 col-span-3">TANGGAL</p>
            <p className="m-0 col-span-9">: {moment(data?.sale_date).format("DD/MM/YYYY")}</p>
            <p className="m-0 col-span-3">TEMPO</p>
            <p className="m-0 col-span-9">
              : {data.tempo_days} {data.tempo_time}
            </p>
            <p className="m-0 col-span-3">TGL JT</p>
            <p className="m-0 col-span-9">: {jatuhTempo}</p>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center">
          <p className="text-2xl font-bold m-0">INVOICE</p>
          <p className="text-sm font-bold">NO INVOICE : {data.no_sales_sale}</p>
        </div>
        <div className="customer flex flex-col items-end">
          <div>
            <p className="m-0 font-semibold">KEPADA YTH :</p>
            <p className="m-0 font-semibold">{customer.name}</p>
            <p className="m-0">
              {customer.address}
              {customer?.city ? `, Kota ${customer.city}` : ""}
            </p>
          </div>
        </div>
      </div>

      <table className="w-full mb-5">
        <tr className="p-2">
          <th className="border-2 p-2">TOTAL UNIT</th>
          <th className="border-2 p-2">NAMA PRODUK</th>
          <th className="border-2 p-2">HARGA SAT</th>
          <th className="border-2 p-2">DISKON RP</th>
          <th className="border-2 p-2">D 1</th>
          <th className="border-2 p-2">D 2</th>
          <th className="border-2 p-2">HARGA NET</th>
          <th className="border-2 p-2">SUB TOTAL</th>
        </tr>
        {details.map(({ attributes }) => {
          return (
            <tr>
              <td className="border-2 p-2">
                {attributes?.qty} {attributes?.unit}
              </td>
              <td className="border-2 p-2">{attributes.product.data.attributes.name}</td>
              <td className="border-2 p-2">{getHargaSatuan(attributes)}</td>
              <td className="border-2 p-2">{formatter.format(attributes?.disc || 0)}</td>
              <td className="border-2 p-2">{attributes?.disc1 ? `${attributes?.disc1}%` : "0%"}</td>
              <td className="border-2 p-2">{attributes?.disc2 ? `${attributes?.disc2}%` : "0%"}</td>
              <td className="border-2 p-2">{getHargaNet(attributes)}</td>
              <td className="border-2 p-2">{formatter.format(attributes?.sub_total || 0)}</td>
            </tr>
          );
        })}
      </table>

      <div className="w-full grid grid-cols-3 gap-x-12">
        <div className="catatan flex flex-col justify-between">
          <div className="mb-4">
            <p className="m-0">
              <span className="font-bold">CATATAN :</span> {data?.sale_note || ""}
            </p>
            <p className="m-0">
              <span className="font-bold">CATATAN STAFF :</span> {data?.sale_staff || ""}
            </p>
          </div>

          <div>
            <p className="m-0">Harga sudah termasuk PPN</p>
            <p className="m-0 uppercase">DIBUAT OLEH : {data.added_by}</p>
            <p className="m-0 font-bold">
              <span className="font-normal">TANGGAL CETAK: </span> {moment().format("DD/MM/YYYY HH:mm:ss")}
            </p>
          </div>
        </div>
        <div className="ttd font-bold flex items-end">
          <div className="w-full flex justify-between">
            <div className="flex flex-col gap-y-14">
              <p className="m-0">Penanggung Jawab</p>
              <div className="w-full flex justify-between">
                <span>{"("}</span>
                <span>{")"}</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-14">
              <p className="m-0">TTD Penerima</p>
              <div className="w-full flex justify-between">
                <span>{"("}</span>
                <span>{")"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pembayaran flex flex-col items-end">
          <div className="grid grid-cols-2 gap-x-8 font-bold">
            <p className="m-0">TOTAL PENJUALAN</p>
            <p className="m-0">: {formatter.format(totalPembelian || 0)}</p>
            <p className="m-0">DPP</p>
            <p className="m-0">: {formatter.format(data?.dpp || 0)}</p>
            <p className="m-0">PPN</p>
            <p className="m-0">: {formatter.format(data?.ppn || 0)}</p>
            <p className="m-0">Biaya Pengiriman</p>
            <p className="m-0">: {formatter.format(data?.delivery_fee || 0)}</p>
            {[1, 2, 3].map((item) => {
              if (data?.[`additional_fee_${item}_sub`] && data?.[`additional_fee_${item}_desc`]) {
                return (
                  <>
                    <p className="m-0">{`Biaya Tambahan ${item}`}</p>
                    <p className="m-0">: {formatter.format(data?.[`additional_fee_${item}_sub`] || 0)}</p>
                  </>
                );
              }
            })}
            <p className="m-0">TOTAL BAYAR</p>
            <p className="m-0">: {formatter.format(data.total || 0)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Print.getInitialProps = async (context) => {
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
  const selling = await res.json();

  return {
    selling,
  };
};

export default Print;
