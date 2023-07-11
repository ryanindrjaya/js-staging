import React from "react";
import nookies from "nookies";
import { PrinterOutlined } from "@ant-design/icons";

function Td(props) {
  return <td className="border-2 p-2">{props.content}</td>;
}

const Print = ({ props }) => {
  let totalPrice = 0;
  const name = process.env.STAKEHOLDER_NAME;
  const returData = props.purchases.data.attributes;

  const noRetur = returData.no_retur;

  // change date format from yyyy-mm-dd to dd-mm-yyyy
  const returDate = returData.tanggal_retur; // output "2023-04-03"
  // Create a new Date object with the returDate string
  const dateObj = new Date(returDate);

  // Get the day, month, and year values from the date object
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // Add 1 to the month value because it's zero-indexed
  const year = dateObj.getFullYear();

  // Use template literals to create the formatted date string
  const formattedDate = `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}-${year}`;

  const supplierName = returData.supplier.data.attributes.name;
  const supplierAddress = returData.supplier.data.attributes.address;
  const noNota = returData.purchasing.data.attributes.no_nota_suppplier ?? "-";
  const noLPB = returData.purchasing.data.attributes.no_purchasing ?? "-";

  const destination = returData.location.data.attributes;
  const destionationName = destination.name;
  const destinationStreet = destination?.street || "";
  const destinationAddress = `${destination?.city || ""} ${destination?.province || ""} ${
    destination?.postal_code || ""
  } ${destination?.country || ""}`;

  const items = returData.retur_details.data;
  const totalReturn = returData.total_price;

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const print = () => {
    window.print();
    return false;
  };

  return (
    <div className="m-3">
      <div className="flex justify-end mb-5">
        <button onClick={print} class="print:hidden rounded-full bg-sky-400 px-4 py-2 font-bold text-white">
          <span>
            <PrinterOutlined className="mr-1 text-lg" />
          </span>{" "}
          Cetak Dokumen
        </button>
      </div>

      <div id="printableArea" className="flex justify-between">
        <div className="font-bold text-lg">{name}</div>
        <div>
          <div className="font-bold  text-sm uppercase">NO RETUR BELI : {noRetur}</div>
          <div className="font-bold  text-sm uppercase">TANGGAL : {formattedDate}</div>
        </div>
      </div>
      <div className="font-bold text-lg flex justify-center mb-5">RETUR PEMBELIAN</div>
      <div className="flex justify-between mb-5">
        <div>
          <div className="font-bold text-sm">KEPADA</div>
          <div className="font-bold text-sm uppercase">Nama Supplier : {supplierName}</div>
          <div>{supplierAddress}</div>
          <div className="font-bold  text-sm uppercase mt-2">NO NOTA SUPPLIER : {noNota}</div>
        </div>
        <div>
          <div className="font-bold  text-sm uppercase">ALAMAT PENGIRIMAN : {destionationName}</div>
          <div>{destinationStreet}</div>
          <div>{destinationAddress}</div>
          <div className="font-bold  text-sm uppercase mt-4">NO LPB : {noLPB}</div>
        </div>
      </div>
      <div className="flex justify-between">
        <table className="w-full">
          <tr className="p-2">
            <th className="border-2 p-2">NO</th>
            <th className="border-2 p-2">NAMA PRODUK</th>
            <th className="border-2 p-2">TOTAL UNIT</th>
            <th className="border-2 p-2">HARGA SATUAN</th>
            <th className="border-2 p-2">BATCH</th>
            <th className="border-2 p-2">EXPIRED DATE</th>
            <th className="border-2 p-2">TOTAL HARGA</th>
          </tr>
          {items.map((element, index) => {
            const productName = element.attributes.products.data?.[0].attributes.name;
            const qty = element.attributes.qty;
            const unit = element.attributes.unit;
            const totalUnit = qty + " " + unit;
            const hargaSatuan = element.attributes.harga_satuan;
            const batch = element.attributes.batch;

            const expiredDate = element.attributes.expired_date;
            const dateObj = new Date(expiredDate);
            const day = dateObj.getDate();
            const month = dateObj.getMonth() + 1; // Add 1 to the month value because it's zero-indexed
            const year = dateObj.getFullYear();
            const formattedDate = `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}-${year}`;
            const subTotal = element.attributes.sub_total;

            // index++;
            return (
              <tr className="p-2">
                <Td content={index + 1} />
                <Td content={productName} />
                <Td content={totalUnit} />
                <Td content={formatter.format(hargaSatuan)} />
                <Td content={batch} />
                <Td content={formattedDate} />
                <Td content={formatter.format(subTotal)} />
              </tr>
            );
          })}
        </table>
      </div>
      <div className="font-bold  text-sm uppercase mt-3 mb-10 flex justify-end">
        TOTAL HARGA : {formatter.format(totalReturn)}
      </div>

      <div className="h-3.5"></div>

      <div className="flex justify-between">
        <div></div>
        <div>
          <div className="font-bold text-sm uppercase mt-2">DITERIMA OLEH</div>
          <div className="font-bold text-sm uppercase mt-10">_____________________________</div>
        </div>
      </div>

      {/* <div className="font-bold  text-sm uppercase mt-2 flex justify-end">
          DITERIMA OLEH
      </div>
      <div className="font-bold  text-sm uppercase mt-10 flex justify-end">
        _____________________________
      </div> */}
    </div>
  );
};

Print.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/returs/" + id + "?populate=deep";
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

export default Print;
