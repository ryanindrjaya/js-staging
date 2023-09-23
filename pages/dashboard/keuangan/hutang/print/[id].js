import React from "react";
import nookies from "nookies";
import { PrinterOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";
import router from "next/router";

const Print = ({ props }) => {
  console.log("pro", props);
  const data = props.hutang.data;
  const noHutang = data.attributes.no_hutang;
  const date = new Date(data.attributes.tanggal_pembayaran).toLocaleDateString("id-ID");
  const details = data.attributes.debt_details.data;
  const sisa_hutang_jatuh_tempo = data.attributes.sisa_hutang_jatuh_tempo;
  const total_hutang_jatuh_tempo = data.attributes.total_hutang_jatuh_tempo;
  const total_pembayaran = data.attributes.total_pembayaran;

  var index = 0;

  const print = () => {
    window.print();
    return false;
  };

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

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
        <div className="font-bold text-lg uppercase mb-5">KEELOLA</div>
      </div>
      <div className="font-bold text-lg flex justify-center mb-5">PEMBAYARAN HUTANG PEMBELIAN</div>
      <div className="flex justify-between mb-5">
        <div>
          <div className="font-bold text-sm uppercase">Nama Supplier : {/*{supplierName}*/}</div>
          <div>{/*{supplierAddress}*/}</div>
        </div>
        <div>
          <div className="font-bold  text-sm uppercase">NO : {noHutang}</div>
          <div className="font-bold  text-sm uppercase">Tanggal : {date}</div>
        </div>
      </div>
      <div className="flex justify-between">
        <table className="w-full">
          <tr className="p-2">
            <th className="border-2 p-2">NO</th>
            <th className="border-2 p-2">NO LPB</th>
            <th className="border-2 p-2">NO NOTA SUPPLIER</th>
            <th className="border-2 p-2">NILAI LPB</th>
            <th className="border-2 p-2">RETUR BELI</th>
            <th className="border-2 p-2">HUTANG JT</th>
            <th className="border-2 p-2">TUNAI</th>
            <th className="border-2 p-2">TRANSFER</th>
            <th className="border-2 p-2">GIRO</th>
            <th className="border-2 p-2">CREDIT NOTE</th>
            <th className="border-2 p-2">OTH INC</th>
            <th className="border-2 p-2">SISA HUTANG JT</th>
          </tr>
          {details.map((element) => {
            console.log("element", element);
            index++;
            return (
              <tr>
                <td className="border-2 p-2">{index}</td>
                <td className="border-2 p-2">{element.attributes.purchasing.data.attributes.no_purchasing}</td>
                <td className="border-2 p-2">{element.attributes.purchasing.data.attributes.no_nota_suppplier}</td>
                <td className="border-2 p-2 text-end">
                  {formatter.format(element.attributes.purchasing.data.attributes.total_purchasing)}
                </td>
                <td className="border-2 p-2 text-end">{formatter.format(element.attributes.total_retur)}</td>
                <td className="border-2 p-2 text-end">
                  {formatter.format(
                    element.attributes.purchasing.data.attributes.total_purchasing - element.attributes.total_retur
                  )}
                </td>
                <td className="border-2 p-2 text-end">{formatter.format(element.attributes.tunai)}</td>
                <td className="border-2 p-2 text-end">{formatter.format(element.attributes.transfer)}</td>
                <td className="border-2 p-2 text-end">{formatter.format(element.attributes.giro)}</td>
                <td className="border-2 p-2 text-end">{formatter.format(element.attributes.cn)}</td>
                <td className="border-2 p-2 text-end">{formatter.format(element.attributes.oth)}</td>
                <td className="border-2 p-2 text-end">{formatter.format(element.attributes.sisa_hutang)}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="font-bold text-sm uppercase mt-20 flex justify-end">TOTAL ITEM : {details.length}</div>
      <div className="font-bold text-lg uppercase mt-2 flex justify-end">
        TOTAL HUTANG JATUH TEMPO : {formatter.format(total_hutang_jatuh_tempo)}
      </div>
      <div className="font-bold text-lg uppercase mt-2 flex justify-end">
        TOTAL PEMBAYARAN : {formatter.format(total_pembayaran)}
      </div>
      <div className="font-bold text-lg uppercase mt-2 flex justify-end">
        SISA HUTANG JATUH TEMPO : {formatter.format(sisa_hutang_jatuh_tempo)}
      </div>
      <div className=" text-sm uppercase mt-2 flex justify-end"></div>

      <div className="font-bold text-lg uppercase mt-4 flex justify-start">CATATAN : </div>
      <div className="text-sm mt-1 flex justify-start">
        Mohon untuk menghubungi kami kembali jika ada perubahan harga
      </div>

      {/*<div className="font-bold  text-sm uppercase mt-10 flex justify-end">HORMAT KAMI</div>*/}
      {/*<div className="font-bold  text-sm uppercase mt-10 flex justify-end">_____________________________</div>*/}
    </div>
  );
};

Print.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/debts/" + id + "?populate=deep";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };
  const res = await fetch(endpoint, options);
  const hutang = await res.json();

  return {
    props: {
      hutang,
    },
  };
};

export default Print;
