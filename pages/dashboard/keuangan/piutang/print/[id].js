import React from "react";
import nookies from "nookies";
import { PrinterOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";
import router from "next/router";

const Print = ({ props }) => {
  const data = props.piutang.data;
  //const nopiutang = data.attributes.no_piutang;
  //const date = new Date(data.attributes.tanggal_pembayaran).toLocaleDateString("id-ID");
  const details = data.attributes.credit_details.data;
  //const sisa_hutang_jatuh_tempo = data.attributes.sisa_hutang_jatuh_tempo;
  //const total_hutang_jatuh_tempo = data.attributes.total_hutang_jatuh_tempo;
  //const total_pembayaran = data.attributes.total_pembayaran;

  var index = 0; console.log("data", data);

  const print = () => {
    window.print();
    return false;
  };

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  function formatMyDate(value, locale = "id-ID") {
    return new Date(value).toLocaleDateString(locale);
  }

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

      <div className="font-bold text-lg flex justify-center mb-5">DAFTAR PENAGIHAN PIUTANG</div>
      <div className="flex justify-between mb-5">
        <div>
          <div className="font-bold text-sm uppercase">Nama Sales : {data?.attributes?.users_permissions_user?.data?.attributes?.name}</div>
          <div className="font-bold text-sm uppercase">Area : {data?.attributes?.area?.data?.attributes?.name}</div>
          <div className="font-bold text-sm uppercase">Wilayah : {data?.attributes?.wilayah?.data?.attributes?.name}</div>
          <div>{/*{supplierAddress}*/}</div>
        </div>
        <div>
          <div className="font-bold  text-sm uppercase">No penagihan : {data?.attributes?.no_piutang}</div>
          <div className="font-bold  text-sm uppercase">Tanggal : {formatMyDate(data?.attributes?.tanggal)}</div>
        </div>
      </div>
      <div className="flex justify-between">
        <table className="w-full">
          <tr className="p-2">
            <th className="border-2 p-2">NO INVOICE</th>
            <th className="border-2 p-2">TANGGAL INVOICE</th>
            <th className="border-2 p-2">PELANGGAN</th>
            <th className="border-2 p-2">NILAI INVOICE</th>
            <th className="border-2 p-2">TOTAL RETUR JUAL</th>
            <th className="border-2 p-2">TOTAL PEMBAYARAN</th>
            <th className="border-2 p-2">SISA PIUTANG</th>
          </tr>
          {details.map((element) => { console.log("details", element);
            index++;
            return (
              <tr>
                {/*<td className="border-2 p-2">{index}</td>*/}
                <td className="border-2 p-2">{
                    element?.attributes?.sales_sale?.data?.attributes?.no_sales_sale ??
                    element?.attributes?.panel_sale?.data?.attributes?.no_panel_sale ??
                    element?.attributes?.non_panel_sale?.data?.attributes?.no_non_panel_sale
                }</td>
                <td className="border-2 p-2">{formatMyDate(
                    element?.attributes?.sales_sale?.data?.attributes?.sale_date ??
                    element?.attributes?.panel_sale?.data?.attributes?.sale_date ??
                    element?.attributes?.non_panel_sale?.data?.attributes?.sale_date ??
                    element?.attributes?.sales_sale?.data?.attributes?.createdAt ??
                    element?.attributes?.panel_sale?.data?.attributes?.createdAt ??
                    element?.attributes?.non_panel_sale?.data?.attributes?.createdAt
                )}</td>
                <td className="border-2 p-2">{
                    element?.attributes?.sales_sale?.data?.attributes?.customer?.data?.attributes?.name ??
                    element?.attributes?.panel_sale?.data?.attributes?.customer?.data?.attributes?.name ??
                    element?.attributes?.non_panel_sale?.data?.attributes?.customer?.data?.attributes?.name
                }</td>
                <td className="border-2 p-2">{formatter.format(
                    element?.attributes?.sales_sale?.data?.attributes?.total ??
                    element?.attributes?.panel_sale?.data?.attributes?.total ??
                    element?.attributes?.non_panel_sale?.data?.attributes?.total
                )}</td>
                <td className="border-2 p-2">{formatter.format(element?.attributes?.total_retur)}</td>
                <td className="border-2 p-2">{formatter.format(parseFloat(
                    element?.attributes?.tunai + element?.attributes?.transfer + element?.attributes?.giro
                ))}</td>
                <td className="border-2 p-2">{formatter.format(element?.attributes?.sisa_piutang)}</td>
                {/*<td className="border-2 p-2">{element.attributes.purchasing.data.attributes.no_nota_suppplier}</td>*/}
                {/*<td className="border-2 p-2 text-end">{formatter.format(element.attributes.purchasing.data.attributes.total_purchasing)}</td>*/}
                {/*<td className="border-2 p-2 text-end">{formatter.format(element.attributes.total_retur)}</td>*/}
                {/*<td className="border-2 p-2 text-end">*/}
                {/*  {formatter.format(element.attributes.purchasing.data.attributes.total_purchasing - element.attributes.total_retur)}*/}
                {/*</td>*/}
                {/*<td className="border-2 p-2 text-end">{formatter.format(element.attributes.tunai)}</td>*/}
                {/*<td className="border-2 p-2 text-end">{formatter.format(element.attributes.transfer)}</td>*/}
                {/*<td className="border-2 p-2 text-end">{formatter.format(element.attributes.giro)}</td>*/}
                {/*<td className="border-2 p-2 text-end">{formatter.format(element.attributes.cn)}</td>*/}
                {/*<td className="border-2 p-2 text-end">{formatter.format(element.attributes.oth)}</td>*/}
                {/*<td className="border-2 p-2 text-end">{formatter.format(element.attributes.sisa_hutang)}</td>*/}
              </tr>
            );
          })}
        </table>
      </div>
      {/*<div className="font-bold text-sm uppercase mt-20 flex justify-end">TOTAL ITEM : {details.length}</div>*/}
      {/*<div className="font-bold text-lg uppercase mt-2 flex justify-end">TOTAL HUTANG JATUH TEMPO : {formatter.format(total_hutang_jatuh_tempo)}</div>*/}
      {/*<div className="font-bold text-lg uppercase mt-2 flex justify-end">TOTAL PEMBAYARAN : {formatter.format(total_pembayaran)}</div>*/}
      {/*<div className="font-bold text-lg uppercase mt-2 flex justify-end">SISA HUTANG JATUH TEMPO : {formatter.format(sisa_hutang_jatuh_tempo)}</div>*/}
      <div className=" text-sm uppercase mt-2 flex justify-end"></div>

      <div className="font-bold text-lg uppercase mt-4 flex justify-start">CATATAN : </div>
      <div className="text-sm mt-1 flex justify-start">Mohon untuk menghubungi kami kembali jika ada perubahan harga</div>

      {/*<div className="font-bold  text-sm uppercase mt-10 flex justify-end">HORMAT KAMI</div>*/}
      {/*<div className="font-bold  text-sm uppercase mt-10 flex justify-end">_____________________________</div>*/}
    </div>
  );
};

Print.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/credits/" + id + "?populate=deep";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };
  const res = await fetch(endpoint, options);
  const piutang = await res.json();

  return {
    props: {
      piutang,
    },
  };
};

export default Print;
