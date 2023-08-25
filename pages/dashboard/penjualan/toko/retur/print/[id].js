import React, { useState } from "react";
import nookies from "nookies";
import moment from "moment";
import { PrinterOutlined } from "@ant-design/icons";

export default function PrintRetur({ id, data }) {
  // stakeholder info
  const stakeholderName = "APOTEK SEJATI";
  const stakeholderAddress = "Jl. Merdeka Timur No.2-10, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65119";
  const stakeholderPhone = "(0341) 325837/369339/322208";
  const stakeholderWA = "089523886198";
  const stakeholderNPWP = "75.777.135.7.623.000";

  const { attributes } = data?.data;
  const details = attributes?.retur_store_sale_details?.data ?? [];

  const [totalPembelian, setTotalPembelian] = useState(0);

  console.log("attributes", attributes);

  // number format
  const numberFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  const calculateDiscount = ({ price, disc = 0, margin = 0, disc1 = 0, disc2 = 0 }) => {
    // unit price + margin% -> disc -> disc1 -> disc2
    const unitPrice = price + (price * margin) / 100;
    const discPrice = unitPrice - disc;
    const disc1Price = discPrice - (discPrice * disc1) / 100;
    const disc2Price = disc1Price - (disc1Price * disc2) / 100;

    return disc2Price;
  };

  const BiayaTambahan = () => {
    return [1, 2, 3].map((item) => {
      if (attributes?.[`additional_fee_${item}_sub`]) {
        return (
          <>
            <p className="m-0">BIAYA TAMBAHAN {item}</p>
            <p className="m-0">: {attributes?.[`additional_fee_${item}_sub`]}</p>
          </>
        );
      }
    });
  };

  const print = () => {
    window.print();
    return false;
  };

  return (
    <div className="print:max-w-full print:pt-0 pt-3 max-w-3xl mx-auto">
      <div className="print:hidden flex justify-end mb-5">
        <button onClick={print} class="print:hidden rounded-full bg-sky-400 px-4 py-2 font-bold text-white">
          <span>
            <PrinterOutlined className="mr-1 text-lg" />
          </span>{" "}
          Cetak Dokumen
        </button>
      </div>

      <div className="text-center border-b mb-2 pb-2 border-black">
        <p className="font-bold m-0">{stakeholderName}</p>
        <p className="m-0">{stakeholderAddress}</p>
        <p className="m-0">TLP {stakeholderPhone}</p>
        <p className="m-0">WA : {stakeholderWA}</p>
        <p className="m-0">NPWP : {stakeholderNPWP}</p>
      </div>

      <div className="font-bold grid grid-cols-8 mb-2">
        {/* NO */}
        <p className="m-0 col-span-2">NO</p>
        <p className="m-0 col-span-6">: {attributes?.no_retur_store_sale}</p>

        <p className="m-0 col-span-2">TANGGAL</p>
        <p className="m-0 col-span-6">: {moment(attributes?.retur_date).format("DD/MM/YYYY")}</p>

        <p className="m-0 col-span-2">USER</p>
        <p className="m-0 col-span-6 uppercase">: {attributes?.added_by}</p>

        <p className="m-0 col-span-2">CUSTOMER</p>
        <p className="m-0 col-span-6 uppercase">: {attributes?.customer_name}</p>
      </div>

      <table className="w-full border mt-3">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-1 px-2 text-left font-bold border-r">QTY</th>
            <th className="py-1 px-2 text-left font-bold border-r">NAMA PRODUK</th>
            <th className="py-1 px-2 text-left font-bold border-r">HARGA SAT</th>
            <th className="py-1 px-2 text-left font-bold">SUB TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {details?.map((item, index) => {
            const detail = item.attributes;

            const hargaSatuan = calculateDiscount({
              price: detail?.unit_price,
              disc: detail?.disc,
              margin: detail?.margin,
              disc1: detail?.disc1,
              disc2: detail?.disc2,
            });

            const subTotal = hargaSatuan * detail?.qty;

            // setTotalPembelian((prev) => prev + subTotal);

            return (
              <tr key={index} className="border">
                <td className="py-1 px-2 border-r">{detail?.qty + " " + detail?.unit}</td>
                <td className="py-1 px-2 border-r">{detail.product?.data?.attributes?.name}</td>
                <td className="py-1 px-2 border-r">
                  {numberFormat.format(hargaSatuan).replace("Rp", "").replace(",00", "")}
                </td>
                <td className="py-1 px-2">{numberFormat.format(subTotal).replace("Rp", "").replace(",00", "")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-between mt-3 items-start">
        <p className="font-bold">ITEM : {details?.length}</p>

        <div className="grid font-bold gap-x-6 grid-cols-2">
          <p className="m-0">TOTAL PEMBELIAN</p>
          <p className="m-0">: {numberFormat.format(attributes?.total)}</p>
          <p className="m-0">DPP</p>
          <p className="m-0">: {numberFormat.format(attributes?.total / 1.11)}</p>
          <p className="m-0">PPN</p>
          <p className="m-0">: {numberFormat.format(((attributes?.total / 1.11) * 11) / 100)}</p>
          <BiayaTambahan />
          <p className="m-0">TOTAL BAYAR</p>
          <p className="m-0">: {numberFormat.format(attributes?.total)}</p>
        </div>
      </div>

      <p className="fixed bottom-5 m-0 left-5 italic text-gray-500">DIBUAT OLEH : {attributes?.added_by ?? "Admin"}</p>
    </div>
  );
}

PrintRetur.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const cookies = nookies.get(ctx);

  const endpoint = `${process.env.NEXT_PUBLIC_URL}/retur-store-sales/${id}?populate=deep`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
  };

  const res = await fetch(endpoint, options);
  const data = await res.json();

  return { id, data };
};
