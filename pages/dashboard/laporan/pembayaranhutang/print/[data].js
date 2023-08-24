import React from "react";
import nookies from "nookies";
import { PrinterOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import moment from "moment";

const Print = ({ props }) => {
  console.log("props", props);
  const data = useSelector(state => state.Report);
  var index = 0;
  //var totalHarga = 0;
  var dataSupplier = [];
  var totalHarga = [];
  // var pembelianShowData = true;
  // var returShowData = true;
  var tipeLaporan = props.tipeLaporan;
  var searchParameters = data.searchParameters[0];
  
  console.log("contex", data, tipeLaporan);

  var totalHarga = [];
  var totalNilaiLPB = 0;
  var totalRetur = 0;
  var totalTunai = 0;
  var totalTransfer = 0;
  var totalGiro = 0;
  var totalSisaHutang = 0;
  var idPurchasing = null;
  //var tempData = debt;

  const tableRef = React.useRef(null);
  const print = () => {
    //window.print();
    const isPrintSuccessful = window.print();
    // Close the print window if the print dialog was canceled
    if (!isPrintSuccessful) {
      window.close();
    }
    return false;
  };

  const rekapTanggal = (search) => {
    var currentDate = search.range[0];
    const defaultEndDate = currentDate.clone().subtract(1, 'month').endOf('month'); // Get the end of the previous month
    return formatMyDate(defaultEndDate);
  }

  const rekapSaldoHutang = (item, data) => {
    var totalSaldoHutang = 0;
    var idPurchasing = 0;
      //totalSaldoHutang = 0;
      
      if(searchParameters?.supplier?.id === item.id || searchParameters?.supplier === null){
        
        data.data.map((row) => {
            var rowDate = moment(row.attributes.tanggal_pembayaran);
            var startDate = moment(searchParameters?.range[0]).subtract(1, 'month').startOf('month');;
            var endDate = moment(searchParameters?.range[1]).subtract(1, 'month').endOf('month');

            if (item.id === row.attributes?.supplier?.data?.id) {

              row.attributes.debt_details.data.forEach((row) => {
                if (
                  idPurchasing !== row.attributes?.purchasing?.data?.id &&
                  rowDate.isSameOrAfter(startDate, 'day') &&
                  rowDate.isSameOrBefore(endDate, 'day')
                  ) {
                  idPurchasing = row.attributes?.purchasing?.data?.id;
                  totalSaldoHutang += row.attributes.sisa_hutang;
                
                } else if (
                  idPurchasing === row.attributes?.purchasing?.data?.id &&
                  rowDate.isSameOrAfter(startDate, 'day') &&
                  rowDate.isSameOrBefore(endDate, 'day')
                  ) {
                  var sisa =
                    row.attributes.tunai +
                    row.attributes.transfer +
                    row.attributes.giro +
                    row.attributes.sisa_hutang;
                  totalSaldoHutang = (totalSaldoHutang - sisa) + row.attributes.sisa_hutang;
                }
              });

            }    
        })
      }
        
    return (formatter.format(totalSaldoHutang));
  }

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  function formatMyDate(value, locale = "id-ID") {
    return new Date(value).toLocaleDateString(locale);
  }

  useEffect(() => {
    print();
  }, []);

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

      <div className="justify-between" style={{ margin: '5pt' }}>
      {tipeLaporan === "Detail" ? (
        <div ref={tableRef}> Detail
          <table name="detail" className="w-full text-xs" >
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
              <th className="border-2 p-1">CN</th>
              <th className="border-2 p-1">DN</th>
            </tr>
          </thead>
          <tbody>
            {data.supplier.map((item) => {

              if(searchParameters?.supplier?.id === item.id || searchParameters?.supplier === null){
                return(
                  <React.Fragment key={item.id}>
                  <tr>
                    <td className="border-2 p-1 align-top" colSpan={4}>Supplier : {item.attributes.name}</td>
                    <td className="border-2 p-1 align-top" colSpan={2}>Tempo : 0</td>
                    <td className="border-2 p-1 align-top" >Saldo Per : </td>
                    <td className="border-2 p-1 align-top" >{rekapTanggal(searchParameters)}</td>
                    <td className="border-2 p-1 align-top align-left" colSpan={3}>{rekapSaldoHutang(item, searchParameters.debt)}</td>
                    <td className="border-2 p-1 align-top align-left" />
                    <td className="border-2 p-1 align-top align-left" />
                  </tr>

                  {data.list.map((row) => {
                    // var totalTunai = 0;
                    if (item.id === row.attributes?.supplier?.data?.id) {
                      var sumRetur = row.attributes.debt_details.data.reduce((total, row) => {
                        if (row.attributes.purchasing?.data?.attributes?.returs) {
                          var totalRetur = row.attributes.purchasing.data.attributes.returs.data.reduce(
                            (sum, item) => (sum + item.attributes.total_price),
                            0
                          );
                          return total + totalRetur;
                        } else {
                          return total + 0;
                        }
                      }, 0);
                      
                      totalRetur = sumRetur;

                      var sumTunai = row.attributes.debt_details.data.reduce(
                        (total, row) => (total += row.attributes.tunai),
                        0
                      );
                      totalTunai += sumTunai;
                      var sumTransfer = row.attributes.debt_details.data.reduce(
                        (total, row) => (total += row.attributes.transfer),
                        0
                      );
                      totalTransfer += sumTransfer;
                      var sumGiro = row.attributes.debt_details.data.reduce(
                        (total, row) => (total += row.attributes.giro),
                        0
                      );
                      totalGiro += sumGiro;

                      row.attributes.debt_details.data.forEach((row) => {
                        if (idPurchasing !== row.attributes?.purchasing?.data?.id) {
                          idPurchasing = row.attributes?.purchasing?.data?.id;
                          totalSisaHutang += row.attributes.sisa_hutang;
                          totalNilaiLPB += row.attributes?.purchasing?.data?.attributes?.total_purchasing;
                        } else if (idPurchasing === row.attributes?.purchasing?.data?.id) {
                          var sisa =
                            row.attributes.tunai +
                            row.attributes.transfer +
                            row.attributes.giro +
                            row.attributes.sisa_hutang;
                          totalSisaHutang = (totalSisaHutang - sisa) + row.attributes.sisa_hutang;
                        }
                      });

                      return (
                        <React.Fragment key={row.attributes?.no_hutang}>
                          <tr>
                            <td className="border-2 p-1 align-top ">{row.attributes?.no_hutang}</td>
                            <td className="border-2 p-1 align-top ">
                              {formatMyDate(row.attributes?.tanggal_pembayaran)}
                            </td>
                            <td className="border-2 p-1">
                              {row.attributes.debt_details.data.map((element, index) => (
                                <React.Fragment key={index}>
                                  <tr>{element.attributes.purchasing.data.attributes.no_nota_suppplier}</tr>
                                </React.Fragment>
                              ))}
                            </td>
                            <td className="border-2 p-1">
                              {row.attributes.debt_details.data.map((element, index) => (
                                <React.Fragment key={index}>
                                  <tr>{element.attributes.purchasing.data.attributes.no_purchasing}</tr>
                                </React.Fragment>
                              ))}
                            </td>
                            <td className="border-2 p-1">
                              {row.attributes.debt_details.data.map((element, index) => (
                                <React.Fragment key={index}>
                                  <tr>{formatMyDate(element.attributes.purchasing.data.attributes.date_purchasing)}</tr>
                                </React.Fragment>
                              ))}
                            </td>
                            <td className="border-2 p-1">
                              {row.attributes.debt_details.data.map((element, index) => (
                                <React.Fragment key={index}>
                                  <tr className="text-right">
                                    {formatter.format(element.attributes.purchasing.data.attributes.total_purchasing)}
                                  </tr>
                                </React.Fragment>
                              ))}
                            </td>
                            <td className="border-2 p-1">
                              {row.attributes.debt_details.data.map((row, index) => {
                                var totalRetur = 0;
                                if(row.attributes.purchasing?.data?.attributes?.returs){
                                  row.attributes.purchasing.data.attributes.returs.data.forEach((item) => {
                                    totalRetur += item.attributes.total_price;
                                  });
                                }
                                return (
                                  <React.Fragment key={index}>
                                    <tr className="text-right">{formatter.format(totalRetur)}</tr>
                                  </React.Fragment>
                                );
                              }
                              )}
                            </td>
                            <td className="border-2 p-1">
                              {row.attributes.debt_details.data.map((element, index) => (
                                <React.Fragment key={index}>
                                  <tr className="text-right">{formatter.format(element.attributes.tunai)}</tr>
                                </React.Fragment>
                              ))}
                            </td>
                            <td className="border-2 p-1">
                              {row.attributes.debt_details.data.map((element, index) => (
                                <React.Fragment key={index}>
                                  <tr className="text-right">{formatter.format(element.attributes.transfer)}</tr>
                                </React.Fragment>
                              ))}
                            </td>
                            <td className="border-2 p-1">
                              {row.attributes.debt_details.data.map((element, index) => (
                                <React.Fragment key={index}>
                                  <tr className="text-right">{formatter.format(element.attributes.giro)}</tr>
                                </React.Fragment>
                              ))}
                            </td>
                            <td className="border-2 p-1">
                              {row.attributes.debt_details.data.map((element, index) => {
                                var totalRetur = 0;
                                if(element.attributes.purchasing?.data?.attributes?.returs){
                                  element.attributes.purchasing.data.attributes.returs.data.forEach((item) => {
                                    totalRetur += item.attributes.total_price;
                                  });
                                }
                                return (
                                  <React.Fragment key={index}>
                                    <tr className="text-right">{formatter.format(element.attributes.sisa_hutang - totalRetur)}</tr>
                                  </React.Fragment>
                                );
                              })}
                            </td>
                            <td className="border-2 p-1"/>
                            <td className="border-2 p-1"/>
                          </tr>
                        </React.Fragment>
                      );
                    }
                    return null;
                  })}

                  <tr>
                    <td className="border-2 p-1" colSpan={4}></td>
                    
                    <td className="border-2 p-1">Subtotal :</td>
                    <td className="border-2 p-1">{formatter.format(totalNilaiLPB)}</td>
                    <td className="border-2 p-1">{formatter.format(totalRetur)}</td>
                    <td className="border-2 p-1">{formatter.format(totalTunai)}</td>
                    <td className="border-2 p-1">{formatter.format(totalTransfer)}</td>
                    <td className="border-2 p-1">{formatter.format(totalGiro)}</td>
                    <td className="border-2 p-1">{formatter.format(totalSisaHutang)}</td>
                    <td className="border-2 p-1"/>
                    <td className="border-2 p-1"/>
                  </tr>
                  <tr hidden>
                    {totalNilaiLPB = 0}
                    {totalRetur = 0}
                    {totalTunai = 0}
                    {totalTransfer = 0}
                    {totalGiro = 0}
                    {totalSisaHutang = 0}
                  </tr>

                  </React.Fragment>
                );
              }
            })}
          </tbody>
          </table>
        </div>
          ) : (
          <div hidden></div>
        )}    

        {tipeLaporan == "Rekap" ? (
        <div ref={tableRef}> Rekap
          <table name="pembelian" className="w-full text-xs" >
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
              <th className="border-2 p-1">CN</th>
              <th className="border-2 p-1">DN</th>
            </tr>
          </thead>
          <tbody>
            {data.supplier.map((item) => {

              if(searchParameters?.supplier?.id === item.id || searchParameters?.supplier === null){
                return(
                  <React.Fragment key={item.id}>
                  <tr>
                    <td className="border-2 p-1 align-top" colSpan={4}>Supplier : {item.attributes.name}</td>
                    <td className="border-2 p-1 align-top" colSpan={2}>Tempo : 0</td>
                    <td className="border-2 p-1 align-top" >Saldo Per : </td>
                    <td className="border-2 p-1 align-top" >{rekapTanggal(searchParameters)}</td>
                    <td className="border-2 p-1 align-top align-left" colSpan={3}>{rekapSaldoHutang(item, searchParameters.debt)}</td>
                    <td className="border-2 p-1 align-top align-left" />
                    <td className="border-2 p-1 align-top align-left" />
                  </tr>

                  {data.list.map((row) => {
                    // var totalTunai = 0;
                    if (item.id === row.attributes?.supplier?.data?.id) {
                      var sumRetur = row.attributes.debt_details.data.reduce((total, row) => {
                        if (row.attributes.purchasing?.data?.attributes?.returs) {
                          var totalRetur = row.attributes.purchasing.data.attributes.returs.data.reduce(
                            (sum, item) => (sum + item.attributes.total_price),
                            0
                          );
                          return total + totalRetur;
                        } else {
                          return total + 0;
                        }
                      }, 0);
                      
                      totalRetur = sumRetur;

                      var sumTunai = row.attributes.debt_details.data.reduce(
                        (total, row) => (total += row.attributes.tunai),
                        0
                      );
                      totalTunai += sumTunai;
                      var sumTransfer = row.attributes.debt_details.data.reduce(
                        (total, row) => (total += row.attributes.transfer),
                        0
                      );
                      totalTransfer += sumTransfer;
                      var sumGiro = row.attributes.debt_details.data.reduce(
                        (total, row) => (total += row.attributes.giro),
                        0
                      );
                      totalGiro += sumGiro;

                      row.attributes.debt_details.data.forEach((row) => {
                        if (idPurchasing !== row.attributes?.purchasing?.data?.id) {
                          idPurchasing = row.attributes?.purchasing?.data?.id;
                          totalSisaHutang += row.attributes.sisa_hutang;
                          totalNilaiLPB += row.attributes?.purchasing?.data?.attributes?.total_purchasing;
                        } else if (idPurchasing === row.attributes?.purchasing?.data?.id) {
                          var sisa =
                            row.attributes.tunai +
                            row.attributes.transfer +
                            row.attributes.giro +
                            row.attributes.sisa_hutang;
                          totalSisaHutang = (totalSisaHutang - sisa) + row.attributes.sisa_hutang;
                        }
                      });

                    }
                    return null;
                  })}

                  <tr>
                    <td className="border-2 p-1" colSpan={4}></td>
                    
                    <td className="border-2 p-1">Subtotal :</td>
                    <td className="border-2 p-1">{formatter.format(totalNilaiLPB)}</td>
                    <td className="border-2 p-1">{formatter.format(totalRetur)}</td>
                    <td className="border-2 p-1">{formatter.format(totalTunai)}</td>
                    <td className="border-2 p-1">{formatter.format(totalTransfer)}</td>
                    <td className="border-2 p-1">{formatter.format(totalGiro)}</td>
                    <td className="border-2 p-1">{formatter.format(totalSisaHutang)}</td>
                    <td className="border-2 p-1"/>
                    <td className="border-2 p-1"/>
                  </tr>
                  <tr hidden>
                    {totalNilaiLPB = 0}
                    {totalRetur = 0}
                    {totalTunai = 0}
                    {totalTransfer = 0}
                    {totalGiro = 0}
                    {totalSisaHutang = 0}
                  </tr>

                  </React.Fragment>
                );
              }
            })}
          </tbody>
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
