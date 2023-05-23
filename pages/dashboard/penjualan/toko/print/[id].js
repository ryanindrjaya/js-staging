import React from "react";
import nookies from "nookies";
import { PrinterOutlined } from "@ant-design/icons";

CetakPenjualan.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint =
    process.env.NEXT_PUBLIC_URL + "/store-sales/" + id + "?populate=deep";
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
    context.res.writeHead(302, {
      Location: "/signin?session=false",
      "Content-Type": "text/html; charset=utf-8",
    });
    context?.res?.end();

    return {};
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

function CetakPenjualan({ props }) {
  const { sales } = props;

  const name = process.env.STAKEHOLDER_NAME;
  const data = sales.data.attributes;

  // header left
  const address =
    data.location.data.attributes.street +
    ", " +
    data.location.data.attributes.city +
    ", " +
    data.location.data.attributes.province;
  const phone = data.location.data.attributes.phone;
  const date = data.sale_date; // "2023-04-08"
  const formattedDate = new Date(date).toLocaleDateString("en-GB");
  console.log(formattedDate); // "08/04/2023"

  // header right
  const customerName = data.customer_name;
  const customerAddress = data.address;
  const customerPhone = data.phone;
  const faktur = data.no_store_sale;

  // details
  const details = data?.store_sale_details?.data ?? [];
  console.log("details", details);

  // footer
  const maker = data?.added_by;
  const totalPembelian = data?.total;
  const isDPPActive = data?.is_dpp_active;
  const dpp = data?.dpp;
  const ppn = data?.ppn;

  // additional cost
  const addFee = (data?.additional_fee_1_sub + data?.additional_fee_2_sub + data?.additional_fee_3_sub) ?? 0;
  const deliveryFee = data?.delivery_fee ?? 0;

  const print = () => {
    window.print();
    return false;
  };

  return (
    <div className="mx-20 my-3">
      <div className="flex justify-end mb-5">
        <button
          onClick={print}
          class="print:hidden rounded-full bg-sky-400 px-4 py-2 font-bold text-white"
        >
          <span>
            <PrinterOutlined className="mr-1 text-lg" />
          </span>{" "}
          Cetak Dokumen
        </button>
      </div>

      <div id="printableArea" className="text-center">
        <div className="font-bold text-2xl">FAKTUR PENJUALAN</div>
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
          <div className="font-bold mt-4">Nomor Faktur : {faktur}</div>
        </div>
      </div>

      <div id="printableArea" className="">
        <table className="w-full border mt-5">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-left font-bold border-r">
                TOTAL UNIT
              </th>
              <th className="py-3 px-4 text-left font-bold border-r">
                NAMA PRODUK
              </th>
              <th className="py-3 px-4 text-left font-bold">TOTAL HARGA</th>
            </tr>
          </thead>
          <tbody>
            {details?.map((item, index) => {
              const attributes = item.attributes;
              console.log("attributes", attributes);
              return (
                <tr key={index} className="border">
                  <td className="py-3 px-4 border-r">
                    {attributes?.qty + " " + attributes?.unit}
                  </td>
                  <td className="py-3 px-4 border-r">
                    {attributes.product?.data?.attributes?.name}
                  </td>
                  <td className="py-3 px-4">
                    {formatter.format(attributes?.sub_total)}
                  </td>
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
          <p className="font-bold text-sm m-1">
            TOTAL PEMBELIAN : {formatter.format(totalPembelian)}
          </p>
          <p className="font-bold text-sm m-1">DPP : {formatter.format(dpp)}</p>
          <p className="font-bold text-sm m-1">PPN : {formatter.format(ppn)}</p>
          <p className="font-bold text-sm m-1">
            BIAYA PENGIRIMAN : {formatter.format(deliveryFee)}
          </p>
          <p className="font-bold text-sm m-1">
            BIAYA TAMBAHAN : {formatter.format(addFee)}
          </p>
          <p className="font-bold text-sm m-1">
            Total Bayar : {formatter.format(totalPembelian)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CetakPenjualan;
