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
  var tipeTransaksi = props.tipeTransaksi;
  
  console.log("contex", data);

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
      {tipeTransaksi == "Pembelian" ? (
        <div>
        <h5 className="-mt-10">Laporan Pembelian</h5>
        <table name="pembelian" className="w-full text-xs">
          <thead>
          <tr className="p-2">
            <th className="border-2 p-1">NO</th>
            <th className="border-2 p-1">NAMA PRODUK</th>
            <th className="border-2 p-1">JUMLAH</th>
            <th className="border-2 p-1">HARGA SATUAN</th>
            <th className="border-2 p-1">DISC</th>
            <th className="border-2 p-1">HARGA SATUAN STLH DISKON</th>
            <th className="border-2 p-1">SUBTOTAL</th>
          </tr>
          </thead>
          {data.list.map((row) => {
            index++;
            var totalAkhir = 0;
            return(
            <tbody>
              <tr>
                <td className="border-2 p-1 align-text-top w-fit">{index}</td>
                <td className="border-2 p-1 w-fit">
                  <tr>
                    <td>Supplier : {row?.attributes?.supplier?.data?.attributes?.name}</td>
                  </tr>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                  <tr>
                    <td key={index}>{element?.attributes?.product?.data?.attributes?.name}</td>
                  </tr>
                  ))}
                </td>
                <td className="border-2 p-1 w-fit">
                  <tr>
                    <td>Tanggal : {formatMyDate(row?.attributes?.date_purchasing)}</td>
                  </tr>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                  <tr>
                    <td key={index}>{element?.attributes?.total_order} {element?.attributes?.unit_order}</td>
                  </tr>
                  ))}
                </td>
                <td className="border-2 p-1 w-fit">
                  <tr>
                    <td>No : {row?.attributes?.no_purchasing}</td>
                  </tr>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                  <tr>
                    <td key={index}>{formatter.format(element?.attributes?.unit_price)}</td>
                  </tr>
                  ))}
                </td>
                <td className="border-2 p-1 w-fit">
                  <tr>
                    <td>No Supplier : {row?.attributes?.no_nota_suppplier}</td>
                  </tr>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                    <tr key={index}>
                      <td>{formatter.format(element?.attributes?.disc ?? 0)}</td>
                      <td>{element?.attributes?.dp1 ?? 0}%</td>
                      <td>{element?.attributes?.dp2 ?? 0}%</td>
                      <td>{element?.attributes?.dp3 ?? 0}%</td>
                    </tr>
                  ))}
                </td>
                <td className="border-2 p-1 w-fit">
                  <tr>
                    <td>Tempo : {row?.attributes?.tempo_days} {row?.attributes?.tempo_time}</td>
                  </tr>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                    <tr>
                      <td key={index}>{formatter.format(element?.attributes?.unit_price_after_disc)}</td> 
                    </tr>
                  ))}
                </td>
                <td className="border-2 p-1 w-fit">
                  <tr><td className="p-2"> </td></tr>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => {
                    totalAkhir += element?.attributes.sub_total;
                    return (
                    <tr className="text-right">
                      <td key={index}>{formatter.format(element?.attributes?.sub_total)}</td>
                    </tr>
                    );
                  })}
                </td>
              </tr>
              <tr>
                <td className="border-2 p-1 text-right mr-2" colspan="6">Subtotal : </td>
                <td className="border-2 p-1">{formatter.format(totalAkhir)}</td>
              </tr>
            </tbody>
            );
          })}
        </table>
        </div>
          ) : (
          <div hidden></div>
        )}    

        {tipeTransaksi == "Retur" ? (
        <div className="-mt-10">
        <h5 className="mt-3">Laporan Return</h5>
        <table name="retur" className="w-full text-xs">
          <thead>
          <tr className="p-2">
            <th className="border-2 p-1">NO</th>
            <th className="border-2 p-1">NAMA PRODUK</th>
            <th className="border-2 p-1">JUMLAH</th>
            <th className="border-2 p-1">HARGA SATUAN</th>
            <th className="border-2 p-1">DISC</th>
            <th className="border-2 p-1">HARGA SATUAN STLH DISKON</th>
            <th className="border-2 p-1">SUBTOTAL</th>
          </tr>
          </thead>
          {data.list.map((row) => {
            return(
              row.attributes?.returs?.data?.length != 0 ? (
                  row.attributes?.returs?.data?.map((element, index) => {
                    index++;
                    return(
                    <tbody>
                      <tr>
                        <td className="border-2 p-1 align-text-top w-fit">{index}</td>
                        <td className="border-2 p-1 w-fit">
                          <tr>
                            <td>Supplier : {row.attributes.supplier.data.attributes.name}</td>
                          </tr>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<tr key={idx}>
                              <td>{item.attributes.products.data[0].attributes.name}</td>
                            </tr>)
                          )}
                        </td>
                        <td className="border-2 p-1 w-fit">
                          <tr>
                            <td>Tanggal : {formatMyDate(row.attributes.date_purchasing)}</td>
                          </tr>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<tr key={idx}>
                              <td>{item.attributes.qty} {item.attributes.unit}</td>
                            </tr>)
                          )}
                        </td>
                        <td className="border-2 p-1 w-fit">
                          <tr>
                            <td>No : {element.attributes.no_retur}</td>
                          </tr>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<tr key={idx}>
                              <td>{formatter.format(item.attributes.harga_satuan)}</td>
                            </tr>)
                          )}
                        </td>
                        <td className="border-2 p-1 w-fit">
                          <tr>
                            <td>Nota Supp : {element.attributes.no_nota_suppplier ?? "tidak ada"}</td>
                          </tr>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<tr key={idx}>
                              <td className="p-2"></td>
                            </tr>)
                          )}
                        </td>
                        <td className="border-2 p-1 w-fit">
                          <tr>
                            <td>Tempo : {row?.attributes?.tempo_days} {row?.attributes?.tempo_time} | </td>
                            <td>No Pembelian : {row.attributes.no_purchasing}</td>
                          </tr>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<tr key={idx}>
                              <td className="p-2"></td>
                            </tr>)
                          )}
                        </td>
                        <td className="border-2 p-1 w-fit">
                          <tr>
                            <td className="p-1"></td>
                          </tr>
                          {element.attributes.retur_details.data.map((item, idx) =>
                            (<tr key={idx}>
                              <td>{formatter.format(item.attributes.sub_total)}</td>
                            </tr>)
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="border-2 p-1 text-right mr-2" colspan="6">Subtotal : </td>
                        <td className="border-2 p-1">{formatter.format( element.attributes.retur_details.data.reduce((total, row) => total += row.attributes.sub_total, 0) )}</td>
                      </tr>
                    </tbody>
                    );
                  })
                ) : (
                <tr hidden></tr>
              )
            );
          })}
        </table>
        </div>
        ) : (
          <div hidden></div>
        )}

        {tipeTransaksi == "undefined" ? (
        <div>
        <h5 className="-mt-10">Laporan Pembelian</h5>
        <table name="pembelian" className="w-full text-xs">
          <thead>
          <tr className="p-2">
            <th className="border-2 p-1">NO</th>
            <th className="border-2 p-1">NAMA PRODUK</th>
            <th className="border-2 p-1">JUMLAH</th>
            <th className="border-2 p-1">HARGA SATUAN</th>
            <th className="border-2 p-1">DISC</th>
            <th className="border-2 p-1">HARGA SATUAN STLH DISKON</th>
            <th className="border-2 p-1">SUBTOTAL</th>
          </tr>
          </thead>
          {data.list.map((row) => {
            index++;
            var totalAkhir = 0;
            return(
            <tbody>
              <tr>
                <td className="border-2 p-1 align-text-top w-fit">{index}</td>
                <td className="border-2 p-1 w-fit">
                  <tr>
                    <td>Supplier : {row?.attributes?.supplier?.data?.attributes?.name}</td>
                  </tr>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                  <tr>
                    <td key={index}>{element?.attributes?.product?.data?.attributes?.name}</td>
                  </tr>
                  ))}
                </td>
                <td className="border-2 p-1 w-fit">
                  <tr>
                    <td>Tanggal : {formatMyDate(row?.attributes?.date_purchasing)}</td>
                  </tr>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                  <tr>
                    <td key={index}>{element?.attributes?.total_order} {element?.attributes?.unit_order}</td>
                  </tr>
                  ))}
                </td>
                <td className="border-2 p-1 w-fit">
                  <tr>
                    <td>No : {row?.attributes?.no_purchasing}</td>
                  </tr>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                  <tr>
                    <td key={index}>{formatter.format(element?.attributes?.unit_price)}</td>
                  </tr>
                  ))}
                </td>
                <td className="border-2 p-1 w-fit">
                  <tr>
                    <td>No Supplier : {row?.attributes?.no_nota_suppplier}</td>
                  </tr>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                    <tr key={index}>
                      <td>{formatter.format(element?.attributes?.disc ?? 0)}</td>
                      <td>{element?.attributes?.dp1 ?? 0}%</td>
                      <td>{element?.attributes?.dp2 ?? 0}%</td>
                      <td>{element?.attributes?.dp3 ?? 0}%</td>
                    </tr>
                  ))}
                </td>
                <td className="border-2 p-1 w-fit">
                  <tr>
                    <td>Tempo : {row?.attributes?.tempo_days} {row?.attributes?.tempo_time}</td>
                  </tr>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                    <tr>
                      <td key={index}>{formatter.format(element?.attributes?.unit_price_after_disc)}</td> 
                    </tr>
                  ))}
                </td>
                <td className="border-2 p-1 w-fit">
                  <tr><td className="p-2"> </td></tr>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => {
                    totalAkhir += element?.attributes.sub_total;
                    return (
                    <tr className="text-right">
                      <td key={index}>{formatter.format(element?.attributes?.sub_total)}</td>
                    </tr>
                    );
                  })}
                </td>
              </tr>
              <tr>
                <td className="border-2 p-1 text-right mr-2" colspan="6">Subtotal : </td>
                <td className="border-2 p-1">{formatter.format(totalAkhir)}</td>
              </tr>
            </tbody>
            );
          })}
        </table>

        <h5 className="mt-3">Laporan Return</h5>
        <table name="retur" className="w-full text-xs">
          <thead>
          <tr className="p-2">
            <th className="border-2 p-1">NO</th>
            <th className="border-2 p-1">NAMA PRODUK</th>
            <th className="border-2 p-1">JUMLAH</th>
            <th className="border-2 p-1">HARGA SATUAN</th>
            <th className="border-2 p-1">DISC</th>
            <th className="border-2 p-1">HARGA SATUAN STLH DISKON</th>
            <th className="border-2 p-1">SUBTOTAL</th>
          </tr>
          </thead>
          {data.list.map((row) => {
            return(
              row.attributes?.returs?.data?.length != 0 ? (
                  row.attributes?.returs?.data?.map((element, index) => {
                    index++;
                    return(
                    <tbody>
                      <tr>
                        <td className="border-2 p-1 align-text-top w-fit">{index}</td>
                        <td className="border-2 p-1 w-fit">
                          <tr>
                            <td>Supplier : {row.attributes.supplier.data.attributes.name}</td>
                          </tr>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<tr key={idx}>
                              <td>{item.attributes.products.data[0].attributes.name}</td>
                            </tr>)
                          )}
                        </td>
                        <td className="border-2 p-1 w-fit">
                          <tr>
                            <td>Tanggal : {formatMyDate(row.attributes.date_purchasing)}</td>
                          </tr>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<tr key={idx}>
                              <td>{item.attributes.qty} {item.attributes.unit}</td>
                            </tr>)
                          )}
                        </td>
                        <td className="border-2 p-1 w-fit">
                          <tr>
                            <td>No : {element.attributes.no_retur}</td>
                          </tr>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<tr key={idx}>
                              <td>{formatter.format(item.attributes.harga_satuan)}</td>
                            </tr>)
                          )}
                        </td>
                        <td className="border-2 p-1 w-fit">
                          <tr>
                            <td>Nota Supp : {element.attributes.no_nota_suppplier ?? "tidak ada"}</td>
                          </tr>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<tr key={idx}>
                              <td className="p-2"></td>
                            </tr>)
                          )}
                        </td>
                        <td className="border-2 p-1 w-fit">
                          <tr>
                            <td>Tempo : {row?.attributes?.tempo_days} {row?.attributes?.tempo_time} | </td>
                            <td>No Pembelian : {row.attributes.no_purchasing}</td>
                          </tr>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<tr key={idx}>
                              <td className="p-2"></td>
                            </tr>)
                          )}
                        </td>
                        <td className="border-2 p-1 w-fit">
                          <tr>
                            <td className="p-1"></td>
                          </tr>
                          {element.attributes.retur_details.data.map((item, idx) =>
                            (<tr key={idx}>
                              <td>{formatter.format(item.attributes.sub_total)}</td>
                            </tr>)
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="border-2 p-1 text-right mr-2" colspan="6">Subtotal : </td>
                        <td className="border-2 p-1">{formatter.format( element.attributes.retur_details.data.reduce((total, row) => total += row.attributes.sub_total, 0) )}</td>
                      </tr>
                    </tbody>
                    );
                  })
                ) : (
                <tr hidden></tr>
              )
            );
          })}
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
  var tipeTransaksi = context?.query?.data;
  
  return {
    props: {
      tipeTransaksi,
    },
  };
};

export default Print;
