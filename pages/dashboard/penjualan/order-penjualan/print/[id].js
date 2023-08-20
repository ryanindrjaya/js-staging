import React from "react";
import nookies from "nookies";
import { PrinterOutlined } from "@ant-design/icons";

CetakPesananSales.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sells/" + id + "?populate=deep";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };
  const res = await fetch(endpoint, options);
  const sales = await res.json();

  if (res.status !== 200) {
  }

  return {
    props: {
      sales,
    },
  };
};

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 2,
});

function CetakPesananSales({ props }) {
  const { sales } = props;

  // stakeholder info
  const name = "APOTEK SEJATI";
  const address = "Jl. Merdeka Timur No.2-10, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65119";
  const phone = "(0341) 325837/369339/322208";

  const data = sales.data.attributes;
  const customer = data.customer.data?.attributes;

  // header left
  const date = data.sale_date; // "2023-04-08"
  const formattedDate = new Date(date).toLocaleDateString("en-GB");
  console.log(formattedDate); // "08/04/2023"

  // header right
  const customerName = customer.name;
  const customerAddress = customer.address;
  const customerPhone = customer.phone;
  const faktur = data.no_sales_sell;

  // details
  const details = data?.sales_sell_details?.data ?? [];
  console.log("details", details);

  // footer
  const maker = data?.added_by;
  const totalPemesanan = details?.reduce((acc, curr) => {
    const attributes = curr.attributes;
    const unitPrice = attributes?.unit_price || 0;
    const qty = attributes?.qty || 0;
    const disc1 = attributes?.disc1 || 0;
    const disc2 = attributes?.disc2 || 0;

    const total = unitPrice * qty;
    const totalDisc1 = (total * disc1) / 100;
    const totalDisc2 = (total * disc2) / 100;

    return acc + total - totalDisc1 - totalDisc2;
  }, 0);

  const print = () => {
    window.print();
    return false;
  };

  return (
    <div className="mx-20 my-3">
      <div className="flex justify-end mb-5">
        <button onClick={print} class="print:hidden rounded-full bg-sky-400 px-4 py-2 font-bold text-white">
          <span>
            <PrinterOutlined className="mr-1 text-lg" />
          </span>{" "}
          Cetak Dokumen
        </button>
      </div>

      <div id="printableArea" className="text-center">
        <div className="font-bold text-2xl">ORDER PENJUALAN</div>
      </div>

      <div id="printableArea" className="mt-5 flex justify-between">
        <div className="text-md">
          <div className="font-bold">{name}</div>
          <div className="">{address}</div>
          <div className="">TLP : {phone}</div>
          <div className="font-bold mt-5">Tanggal : {formattedDate}</div>
        </div>
        <div>
          <div className="">KEPADA YTH.</div>
          <div className="font-bold">{customerName}</div>
          <div className="">{customerAddress}</div>
          <div className="">HP : {customerPhone}</div>
          <div className="font-bold mt-4">Nomor Order Penjualan : {faktur}</div>
        </div>
      </div>

      <div id="printableArea" className="">
        <table className="w-full border mt-5">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-left font-bold border-r">TOTAL UNIT</th>
              <th className="py-3 px-4 text-left font-bold border-r">NAMA PRODUK</th>
              <th className="py-3 px-4 text-left font-bold border-r">D1</th>
              <th className="py-3 px-4 text-left font-bold border-r">D2</th>
              <th className="py-3 px-4 text-left font-bold">TOTAL HARGA</th>
            </tr>
          </thead>
          <tbody>
            {details?.map((item, index) => {
              const attributes = item.attributes;
              const unitPrice = attributes?.unit_price || 0;
              const qty = attributes?.qty || 0;
              const disc1 = attributes?.disc1 || 0;
              const disc2 = attributes?.disc2 || 0;

              const total = unitPrice * qty;
              const totalDisc1 = (total * disc1) / 100;
              const totalDisc2 = (total * disc2) / 100;

              const subTotal = total - totalDisc1 - totalDisc2;
              return (
                <tr key={index} className="border">
                  <td className="py-3 px-4 border-r">{attributes?.qty + " " + attributes?.unit}</td>
                  <td className="py-3 px-4 border-r">{attributes.product?.data?.attributes?.name}</td>
                  <td className="py-3 px-4 border-r">{`${attributes?.disc1 ?? 0}%`}</td>
                  <td className="py-3 px-4 border-r">{`${attributes?.disc2 ?? 0}%`}</td>
                  <td className="py-3 px-4">{formatter.format(subTotal)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div id="printableArea" className="mt-3 flex justify-between">
        <div>
          <p className="font-bold text-lg">Catatan</p>
          <p>
            Barang yang sudah dibeli melebihi 1, hari tidak dapat <br />
            ditukar/dikembalikan kecuali ada kesepakatan
          </p>
          <p>DIBUAT OLEH {maker}</p>
        </div>
        <div>
          <p className="font-bold text-sm m-1">TOTAL ORDER PENJUALAN : {formatter.format(totalPemesanan)}</p>
          <p className="font-bold text-sm m-1">Total Pesanan : {formatter.format(totalPemesanan)}</p>
        </div>
      </div>
    </div>
  );
}

export default CetakPesananSales;
