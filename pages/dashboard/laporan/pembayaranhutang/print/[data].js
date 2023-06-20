import React from "react";
import nookies from "nookies";
import { PrinterOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';

const Print = ({ props }) => {
  console.log("props", props);
  const data = useSelector(state => state.Report);
  var index = 0;
  // var pembelianShowData = true;
  // var returShowData = true;
  var tipeLaporan = props.tipeLaporan;
  
  console.log("contex", data, tipeLaporan);

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

      <div className="justify-between">
        {tipeLaporan == "Detail" ? (
        <div> detail
        </div>
          ) : (
          <div hidden></div>
        )}    

        {tipeLaporan == "Rekap" ? (
        <div> Rekap
          <table name="pembelian" className="w-full text-xs">
          <thead>
          <tr className="p-2">
            <th className="border-2 p-1">No Pembayaran</th>
            <th className="border-2 p-1">Tgl Bayar</th>
            <th className="border-2 p-1">Nota Supplier</th>
            <th className="border-2 p-1">No LPB</th>
            <th className="border-2 p-1">Tgl LPB</th>
            <th className="border-2 p-1">Nilai LPB</th>
            <th className="border-2 p-1">Total Nilai RB</th>
            <th className="border-2 p-1">Tunai</th>
            <th className="border-2 p-1">Transfer</th>
            <th className="border-2 p-1">Giro</th>
            <th className="border-2 p-1">Saldo Hutang</th>
          </tr>
          </thead>
          {data.list.map((row) => {
          index++;
          return(
          <tbody>
            <tr>
              <td className="border-2 p-1">Supplier : {row.attributes?.supplier?.data?.attributes?.name}</td>
              <td className="border-2 p-1">
                <td>Tempo : </td>
                <td>{row.attributes?.debt_details.data[0].attributes.purchasing.data.attributes.tempo_days}</td>
                <td>{row.attributes?.debt_details.data[0].attributes.purchasing.data.attributes.tempo_time}</td>
              </td>
              <td className="border-2 p-1">
                <td className="p-2"></td>
              </td>
              <td className="border-2 p-1">
                <td className="p-2"></td>
              </td>
              <td className="border-2 p-1">
                <td className="p-2"></td>
              </td>
              <td className="border-2 p-1">
                <td>{formatter.format(row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.purchasing.data.attributes.total_purchasing, 0))}</td>
              </td>
              <td className="border-2 p-1">
                <td>
                {formatter.format(
                  row.attributes.debt_details.data.reduce((totalRetur, row) => {
                    let total = 0;
                    total = row.attributes.purchasing.data.attributes.returs.data.reduce(
                      (accumulator, item) => accumulator + item.attributes.total_price,
                      0
                    );
                    return totalRetur + total;
                  }, 0)
                )}
                </td>
              </td>
              <td className="border-2 p-1">
                <td>{formatter.format(row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.tunai, 0))}</td>
              </td>
              <td className="border-2 p-1">
                <td>{formatter.format(row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.transfer, 0))}</td>
              </td>
              <td className="border-2 p-1">
                <td>{formatter.format(row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.giro, 0))}</td>
              </td>
              <td className="border-2 p-1">
                <td>{formatter.format(row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.sisa_hutang, 0))}</td>
              </td>
            </tr>
          </tbody>
          );
          }
          )}
          </table>
        </div>
        ) : (
          <div hidden></div>
        )}

      </div>

    </div>
  );
};

Print.getInitialProps = async (context) => {
  //const cookies = nookies.get(context);
  var tipeLaporan = context?.query?.data;
  
  return {
    props: {
      tipeLaporan,
    },
  };
};

export default Print;
