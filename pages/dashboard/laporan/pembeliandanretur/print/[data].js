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
                <td className="border-2 p-1 align-text-top">{index}</td>
                <td className="border-2 p-1">
                  <p className="-mt-2 -mb-1">Supplier : {row?.attributes?.supplier?.data?.attributes?.name}</p>
                  <p className="-mt-3"><hr/></p>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                    <p className="-mt-3" key={index}>{element?.attributes?.product?.data?.attributes?.name}</p>
                  ))}
                  <p className="-mt-3"><hr/></p>
                </td>
                <td className="border-2 p-1">
                  <p className="-mt-2 -mb-1">Tanggal : {formatMyDate(row?.attributes?.date_purchasing)}</p>
                  <p className="-mt-3"><hr/></p>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                    <p className="-mt-3" key={index}>{element?.attributes?.total_order} {element?.attributes?.unit_order}</p>
                  ))}
                  <p className="-mt-3"><hr/></p>
                </td>
                <td className="border-2 p-1">
                  <p className="-mt-2 -mb-1">No : {row?.attributes?.no_purchasing}</p>
                  <p className="-mt-3"><hr/></p>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                    <p className="-mt-3" key={index}>{formatter.format(element?.attributes?.unit_price)}</p>
                  ))}
                  <p className="-mt-3"><hr/></p>
                </td>
                <td className="border-2 p-1">
                  <p className="-mt-1 -mb-1">No Supplier : {row?.attributes?.no_nota_suppplier}</p>
                  <p className="-mt-3"><hr/></p>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                    <p className="-mt-3" key={index}>
                      <td>{formatter.format(element?.attributes?.disc ?? 0)}</td>
                      <td>{element?.attributes?.dp1}%</td>
                      <td>{element?.attributes?.dp2}%</td>
                      <td>{element?.attributes?.dp3}%</td>
                    </p>
                  ))}
                  <p className="-mt-3"><hr/></p>
                </td>
                <td className="border-2 p-1">
                  <p className="-mt-4 -mb-1 pt-3 pb-0 align-bottom">Tempo : {row?.attributes?.tempo_days} {row?.attributes?.tempo_time}</p>
                  <p className="-mt-3"><hr/></p>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                    <p className="-mt-3" key={index}>{formatter.format(element?.attributes?.unit_price_after_disc)}</p> 
                  ))}
                  <p className="-mt-3"><hr/></p>
                  <p className="-mt-3 mb-1">Subtotal</p>
                </td>
                <td className="border-2 p-1 pb-1">
                <p className="-mt-3pt-2"><hr/></p>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => {
                    totalAkhir += element?.attributes.sub_total;
                    return (<p className="-mt-3" key={index}>{formatter.format(element?.attributes?.sub_total)}</p>);
                  })}
                  <p className="-mt-3"><hr/></p>
                  <p className="-mt-3 mb-0">{formatter.format(totalAkhir)}</p>
                </td>
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
            <tbody>
              {row.attributes?.returs?.data?.length != 0 ? (
                  row.attributes?.returs?.data?.map((element, index) => {
                    index++;
                    return(
                    <tr key={index}>
                      <td className="border-2 p-1 align-text-top">{index}</td>
                      <td className="border-2 p-1">
                        <p className="-mb-4 -mt-2"><span className="font-bold">Supplier : </span>{row.attributes.supplier.data.attributes.name}</p>
                        <p className="-mt-3"><hr/></p>
                        <p>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<p className="-mt-3" key={idx}>{item.attributes.products.data[0].attributes.name}</p>)
                          )}
                        </p>
                        <p className="-mt-3"><hr/></p>
                      </td>
                      <td className="border-2 p-1">
                        <p className="-mb-4 -mt-2"><span className="font-bold">Tanggal : </span>{formatMyDate(row.attributes.date_purchasing)}</p>
                        <p className="-mt-3"><hr/></p>
                        <p>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<p className="-mt-3"  key={idx}>{item.attributes.qty} {item.attributes.unit}</p>)
                          )}
                        </p>
                        <p className="-mt-3"><hr/></p>
                      </td>
                      <td className="border-2 p-1">
                        <p className="-mb-4 -mt-2"><span className="font-bold">No : </span>{element.attributes.no_retur}</p>
                        <p className="-mt-3"><hr/></p>
                        <p>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<p className="-mt-3" key={idx}>{formatter.format(item.attributes.harga_satuan)}</p>)
                          )}
                        </p>
                        <p className="-mt-3"><hr/></p>
                      </td>
                      <td className="border-2 p-1">
                      <p className="-mb-4 -mt-2"><span className="font-bold">Nota Supp : </span>{element.attributes.no_nota_suppplier ?? "tidak ada"}</p>
                        <p className="-mt-3"><hr/></p>
                        <p>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<p className="-mt-3 py-2" key={idx}></p>)
                          )}
                        </p>
                        <p className="-mt-3"><hr/></p>
                      </td>
                      <td className="border-2 p-1">
                      <p className="-mb-4 mt-0"><span className="font-bold">Tempo : </span>{row.attributes.tempo_days} {row.attributes.tempo_time}</p>
                        <p className="-mt-3"><hr/></p>
                        <p>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<p className="-mt-3 py-2" key={idx}></p>)
                          )}
                        </p>
                        <p className="-mt-3"><hr/></p>
                        <p className="-mt-3 mb-1">Subtotal</p>
                      </td>
                      <td className="border-2 p-1">
                      <p className="-mb-4 mt-0"><span className="font-bold">No Pembelian : </span>{row.attributes.no_purchasing}</p>
                        <p className="-mt-3"><hr/></p>
                        <p>
                          {element.attributes.retur_details.data.map((item, idx) =>
                            (<p className="-mt-3" key={idx}>{formatter.format(item.attributes.sub_total)}</p>)
                          )}
                        </p>
                        <p className="-mt-3"><hr/></p>
                        <p className="-mt-3 mb-1">{formatter.format( element.attributes.retur_details.data.reduce((total, row) => total += row.attributes.sub_total, 0) )}</p>
                      </td>
                    </tr>
                    );
                  })
                ) : (
                <tr hidden></tr>
              )}
            </tbody>
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
                <td className="border-2 p-1 align-text-top">{index}</td>
                <td className="border-2 p-1">
                  <p className="-mt-2 -mb-1">Supplier : {row?.attributes?.supplier?.data?.attributes?.name}</p>
                  <p className="-mt-3"><hr/></p>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                    <p className="-mt-3" key={index}>{element?.attributes?.product?.data?.attributes?.name}</p>
                  ))}
                  <p className="-mt-3"><hr/></p>
                </td>
                <td className="border-2 p-1">
                  <p className="-mt-2 -mb-1">Tanggal : {formatMyDate(row?.attributes?.date_purchasing)}</p>
                  <p className="-mt-3"><hr/></p>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                    <p className="-mt-3" key={index}>{element?.attributes?.total_order} {element?.attributes?.unit_order}</p>
                  ))}
                  <p className="-mt-3"><hr/></p>
                </td>
                <td className="border-2 p-1">
                  <p className="-mt-2 -mb-1">No : {row?.attributes?.no_purchasing}</p>
                  <p className="-mt-3"><hr/></p>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                    <p className="-mt-3" key={index}>{formatter.format(element?.attributes?.unit_price)}</p>
                  ))}
                  <p className="-mt-3"><hr/></p>
                </td>
                <td className="border-2 p-1">
                  <p className="-mt-1 -mb-1">No Supplier : {row?.attributes?.no_nota_suppplier}</p>
                  <p className="-mt-3"><hr/></p>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                    <p className="-mt-3" key={index}>
                      <td>{formatter.format(element?.attributes?.disc ?? 0)}</td>
                      <td>{element?.attributes?.dp1}%</td>
                      <td>{element?.attributes?.dp2}%</td>
                      <td>{element?.attributes?.dp3}%</td>
                    </p>
                  ))}
                  <p className="-mt-3"><hr/></p>
                </td>
                <td className="border-2 p-1">
                  <p className="-mt-4 -mb-1 pt-3 pb-0 align-bottom">Tempo : {row?.attributes?.tempo_days} {row?.attributes?.tempo_time}</p>
                  <p className="-mt-3"><hr/></p>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => (
                    <p className="-mt-3" key={index}>{formatter.format(element?.attributes?.unit_price_after_disc)}</p> 
                  ))}
                  <p className="-mt-3"><hr/></p>
                  <p className="-mt-3 mb-1">Subtotal</p>
                </td>
                <td className="border-2 p-1 pb-1">
                <p className="-mt-3pt-2"><hr/></p>
                  {row.attributes?.purchasing_details?.data?.map((element, index) => {
                    totalAkhir += element?.attributes.sub_total;
                    return (<p className="-mt-3" key={index}>{formatter.format(element?.attributes?.sub_total)}</p>);
                  })}
                  <p className="-mt-3"><hr/></p>
                  <p className="-mt-3 mb-0">{formatter.format(totalAkhir)}</p>
                </td>
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
            <tbody>
              {row.attributes?.returs?.data?.length != 0 ? (
                  row.attributes?.returs?.data?.map((element, index) => {
                    index++;
                    return(
                    <tr key={index}>
                      <td className="border-2 p-1 align-text-top">{index}</td>
                      <td className="border-2 p-1">
                        <p className="-mb-4 -mt-2"><span className="font-bold">Supplier : </span>{row.attributes.supplier.data.attributes.name}</p>
                        <p className="-mt-3"><hr/></p>
                        <p>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<p className="-mt-3" key={idx}>{item.attributes.products.data[0].attributes.name}</p>)
                          )}
                        </p>
                        <p className="-mt-3"><hr/></p>
                      </td>
                      <td className="border-2 p-1">
                        <p className="-mb-4 -mt-2"><span className="font-bold">Tanggal : </span>{formatMyDate(row.attributes.date_purchasing)}</p>
                        <p className="-mt-3"><hr/></p>
                        <p>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<p className="-mt-3"  key={idx}>{item.attributes.qty} {item.attributes.unit}</p>)
                          )}
                        </p>
                        <p className="-mt-3"><hr/></p>
                      </td>
                      <td className="border-2 p-1">
                        <p className="-mb-4 -mt-2"><span className="font-bold">No : </span>{element.attributes.no_retur}</p>
                        <p className="-mt-3"><hr/></p>
                        <p>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<p className="-mt-3" key={idx}>{formatter.format(item.attributes.harga_satuan)}</p>)
                          )}
                        </p>
                        <p className="-mt-3"><hr/></p>
                      </td>
                      <td className="border-2 p-1">
                      <p className="-mb-4 -mt-2"><span className="font-bold">Nota Supp : </span>{element.attributes.no_nota_suppplier ?? "tidak ada"}</p>
                        <p className="-mt-3"><hr/></p>
                        <p>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<p className="-mt-3 py-2" key={idx}></p>)
                          )}
                        </p>
                        <p className="-mt-3"><hr/></p>
                      </td>
                      <td className="border-2 p-1">
                      <p className="-mb-4 mt-0"><span className="font-bold">Tempo : </span>{row.attributes.tempo_days} {row.attributes.tempo_time}</p>
                        <p className="-mt-3"><hr/></p>
                        <p>
                          {element.attributes.retur_details.data.map((item, idx) => 
                            (<p className="-mt-3 py-2" key={idx}></p>)
                          )}
                        </p>
                        <p className="-mt-3"><hr/></p>
                        <p className="-mt-3 mb-1">Subtotal</p>
                      </td>
                      <td className="border-2 p-1">
                      <p className="-mb-4 mt-0"><span className="font-bold">No Pembelian : </span>{row.attributes.no_purchasing}</p>
                        <p className="-mt-3"><hr/></p>
                        <p>
                          {element.attributes.retur_details.data.map((item, idx) =>
                            (<p className="-mt-3" key={idx}>{formatter.format(item.attributes.sub_total)}</p>)
                          )}
                        </p>
                        <p className="-mt-3"><hr/></p>
                        <p className="-mt-3 mb-1">{formatter.format( element.attributes.retur_details.data.reduce((total, row) => total += row.attributes.sub_total, 0) )}</p>
                      </td>
                    </tr>
                    );
                  })
                ) : (
                <tr hidden></tr>
              )}
            </tbody>
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
