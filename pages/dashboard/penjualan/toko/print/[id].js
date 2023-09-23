import React from "react";
import nookies from "nookies";
import { PrinterOutlined } from "@ant-design/icons";
import moment from "moment";

CetakPenjualan.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/store-sales/" + id + "?populate=*,store_sale_details.product";
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

function CetakPenjualan({ props }) {
  const { sales } = props;

  const data = sales.data.attributes;
  console.log("data true", data);

  // stakeholder info
  const name = "KEELOLA";
  const stakeholderAddress = "Jl. Merdeka Timur No.2-10, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65119";
  const stakeholderPhone = "(0341) 325837/369339/322208";

  // header left
  const address = stakeholderAddress;
  const phone = stakeholderPhone;
  const date = data.createdAt; // "2023-04-08"
  const formattedDate = moment(date).format("DD/MM/YYYY HH:mm:ss");
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
  const totalPenjualan = data.dpp + data.ppn;
  const totalBayar = data?.total;
  const isDPPActive = data?.is_dpp_active;
  const dpp = data?.dpp;
  const ppn = data?.ppn;
  // const biayaTambahan = [1, 2, 3].reduce((acc, curr) => {
  //   if (data?.[`additional_fee_${curr}_sub`]) {
  //     console.log(`additional fee ${curr}`, data?.[`additional_fee_${curr}_sub`]);
  //     return acc + data[`additional_fee_${curr}_sub`];
  //   } else {
  //     return acc;
  //   }
  // }, 0);

  // additional cost
  //const addFee = data?.additional_fee_1_sub + data?.additional_fee_2_sub + data?.additional_fee_3_sub ?? 0;
  const deliveryFee = data?.delivery_fee ?? 0;
  var addFee = [];
  if (data.additional_fee_1_desc !== null && data.additional_fee_1_sub !== 0) {
    addFee.push({ ket: data.additional_fee_1_desc, saldo: data.additional_fee_1_sub });
  } else addFee[0] = { ket: null, saldo: 0 };

  if (data.additional_fee_2_desc !== null && data.additional_fee_2_sub !== 0) {
    addFee.push({ ket: data.additional_fee_2_desc, saldo: data.additional_fee_2_sub });
  } else addFee[1] = { ket: null, saldo: 0 };

  if (data.additional_fee_3_desc !== null && data.additional_fee_3_sub !== 0) {
    addFee.push({ ket: data.additional_fee_3_desc, saldo: data.additional_fee_3_sub });
  } else addFee[2] = { ket: null, saldo: 0 };

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
              <th className="py-3 px-4 text-left font-bold border-r">TOTAL UNIT</th>
              <th className="py-3 px-4 text-left font-bold border-r">NAMA PRODUK</th>
              <th className="py-3 px-4 text-left font-bold">TOTAL HARGA</th>
            </tr>
          </thead>
          <tbody>
            {details?.map((item, index) => {
              const attributes = item.attributes;
              console.log("attributes", attributes);
              return (
                <tr key={index} className="border">
                  <td className="py-3 px-4 border-r">{attributes?.qty + " " + attributes?.unit}</td>
                  <td className="py-3 px-4 border-r">{attributes.product?.data?.attributes?.name}</td>
                  <td className="py-3 px-4">{formatter.format(attributes?.sub_total)}</td>
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
            Barang yang sudah dibeli melebihi 1 hari tidak dapat <br />
            ditukar/dikembalikan kecuali ada kesepakatan
          </p>
          <p className="m-0">DIBUAT OLEH {maker}</p>
          <p className="m-0 font-bold">
            <span className="font-normal">TANGGAL CETAK: </span> {moment().format("DD/MM/YYYY HH:mm:ss")}
          </p>
        </div>
        <div>
          <p className="font-bold text-sm m-1">TOTAL PENJUALAN : {formatter.format(totalPenjualan)}</p>
          <p className="font-bold text-sm m-1">DPP : {formatter.format(dpp)}</p>
          <p className="font-bold text-sm m-1">PPN : {formatter.format(ppn)}</p>
          <p className="font-bold text-sm m-1">TITIPAN ONGKIR : {formatter.format(deliveryFee)}</p>
          {/* <p className="font-bold text-sm m-1">BIAYA TAMBAHAN : {formatter.format(biayaTambahan)}</p> */}
          {addFee[0].ket === null && addFee[0].saldo === 0 ? (
            <div hidden />
          ) : (
            <p className="font-bold text-sm m-1">
              {addFee[0].ket} : {formatter.format(addFee[0].saldo)}
            </p>
          )}
          {addFee[1].ket === null && addFee[1].saldo === 0 ? (
            <div hidden />
          ) : (
            <p className="font-bold text-sm m-1">
              {addFee[1].ket} : {formatter.format(addFee[1].saldo)}
            </p>
          )}
          {addFee[2].ket === null && addFee[2].saldo === 0 ? (
            <div hidden />
          ) : (
            <p className="font-bold text-sm m-1">
              {addFee[2].ket} : {formatter.format(addFee[2].saldo)}
            </p>
          )}
          <p className="font-bold text-sm m-1">TOTAL BAYAR : {formatter.format(totalBayar)}</p>
        </div>
      </div>
    </div>
  );
}

export default CetakPenjualan;
