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
  console.log("contex", data);
  // const name = process.env.STAKEHOLDER_NAME;
  // const noPO = props.purchases.data.attributes.no_po;
  // const date = new Date(props.purchases.data.attributes.order_date).toLocaleDateString("id-ID");
  // const supplierName = props.purchases.data.attributes.supplier?.data?.attributes?.name;
  // const supplierAddress = props.purchases.data.attributes.supplier?.data?.attributes?.address;

  // const destination = props.purchases.data.attributes.location.data.attributes;
  // const destionationName = destination.name;
  // const destinationStreet = `${destination.street} `;
  // const destinationAddress = `${destination.city} ${destination.province} ${destination.postal_code} ${destination.country}`;

  // const items = props.purchases.data.attributes.purchase_details.data;
  // const deliveryFee = props.purchases.data.attributes.delivery_fee;
  // const TotalHarga = props.purchases.data.attributes.delivery_total;


  // const getHargaSatuan = (unit, index) => {
  //   var price = 0;

  //   price = props.purchases.data.attributes.purchase_details.data[index - 1].attributes.unit_price;

  //   // const product =
  //   //   props.purchases.data.attributes.purchase_details.data[index - 1]
  //   //     .attributes.products.data[0];

  //   // for (let index = 1; index < 6; index++) {
  //   //   if (product.attributes[`unit_${index}`] === unit) {
  //   //     price = product.attributes[`buy_price_${index}`];
  //   //   }
  //   // }

  //   return formatter.format(price);
  // };

  // const getProductDisc = (unit, index) => {
  //   var disc1 = 0;
  //   var disc2 = 0;
  //   var disc3 = 0;

  //   const discInput = props.purchases.data.attributes.purchase_details.data[index - 1].attributes.disc;

  //   const product = props.purchases.data.attributes.purchase_details.data[index - 1].attributes.products.data[0];

  //   const detail = props.purchases.data.attributes.purchase_details.data[index - 1].attributes;

  //   for (let index = 1; index < 6; index++) {
  //     if (product.attributes[`unit_${index}`] === unit) {
  //       disc1 = detail.dp1 ?? product?.attributes?.[`unit_${index}_dp1`] ?? 0;
  //       disc2 = detail.dp2 ?? product?.attributes?.[`unit_${index}_dp2`] ?? 0;
  //       disc3 = detail.dp3 ?? product?.attributes?.[`unit_${index}_dp3`] ?? 0;
  //     }
  //   }

  //   return `${formatter.format(discInput)}, ${disc1}%, ${disc2}%, ${disc3}%`;
  // };

  // const getSubTotal = (index) => {
  //   var subTotal = props.purchases.data.attributes.purchase_details.data[index - 1].attributes.sub_total;
  //   return formatter.format(subTotal);
  // };

  // const getTotalProduct = () => {
  //   var total = 0;
  //   props.purchases.data.attributes.purchase_details.data.forEach((element) => {
  //     total = total + element.attributes.sub_total;
  //   });

  //   return formatter.format(total);
  // };

  // const getAdditionalFee = () => {
  //   var desc1 = props.purchases.data.attributes[`additional_fee_1_desc`];
  //   var desc2 = props.purchases.data.attributes[`additional_fee_2_desc`];
  //   var desc3 = props.purchases.data.attributes[`additional_fee_3_desc`];
  //   var desc4 = props.purchases.data.attributes[`additional_fee_4_desc`];
  //   var desc5 = props.purchases.data.attributes[`additional_fee_5_desc`];

  //   var disc1 = formatter.format(props.purchases.data.attributes[`additional_fee_1_sub`]);
  //   var disc2 = formatter.format(props.purchases.data.attributes[`additional_fee_2_sub`]);
  //   var disc3 = formatter.format(props.purchases.data.attributes[`additional_fee_3_sub`]);
  //   var disc4 = formatter.format(props.purchases.data.attributes[`additional_fee_4_sub`]);
  //   var disc5 = formatter.format(props.purchases.data.attributes[`additional_fee_5_sub`]);

  //   return (
  //     <div className="text-right">
  //       {disc1 !== "Rp 0" ? (
  //         <div>
  //           {desc1} : {disc1}
  //         </div>
  //       ) : (
  //         <div></div>
  //       )}
  //       {disc2 !== "Rp 0" ? (
  //         <div>
  //           {desc2} : {disc2}
  //         </div>
  //       ) : (
  //         <div></div>
  //       )}
  //       {disc3 !== "Rp 0" ? (
  //         <div>
  //           {desc3} : {disc3}
  //         </div>
  //       ) : (
  //         <div></div>
  //       )}
  //       {disc4 !== "Rp 0" ? (
  //         <div>
  //           {desc4} : {disc4}
  //         </div>
  //       ) : (
  //         <div></div>
  //       )}
  //       {disc5 !== "Rp 0" ? (
  //         <div>
  //           {desc5} : {disc5}
  //         </div>
  //       ) : (
  //         <div></div>
  //       )}
  //     </div>
  //   );
  // };

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

      {/* <div id="printableArea" className="flex justify-between">
        <div className="font-bold text-lg">{name}</div>
        <div>
          <div className="">NO : {noPO}</div>
          <div className="">Tanggal : {date}</div>
        </div>
      </div>
      <div className="font-bold text-lg flex justify-center mb-5">ORDER PEMBELIAN</div>
      <div className="flex justify-between mb-5">
        <div>
          <div className="font-bold text-sm">KEPADA</div>
          <div className="font-bold text-sm uppercase">Nama Supplier : {supplierName}</div>
          <div>{supplierAddress}</div>
        </div>
        <div>
          <div className="font-bold  text-sm uppercase">ALAMAT PENGIRIMAN : {destionationName}</div>
          <div>{destinationStreet}</div>
          <div>{destinationAddress}</div>
        </div>
      </div> */}
      <div className="flex justify-between">
        <table className="w-full text-xs">
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
                <p className="-mt-3">Supplier : {row.attributes.supplier.data.attributes.name}</p>
                <p className="-mt-3"><hr/></p>
                {row.attributes.purchasing_details.data.map((element, index) => (
                  <p className="-mt-3" key={index}>{element.attributes.product.data.attributes.name}</p>
                ))}
                <p className="-mt-3"><hr/></p>
              </td>
              <td className="border-2 p-1">
                <p className="-mt-3">Tanggal : {formatMyDate(row.attributes.date_purchasing)}</p>
                <p className="-mt-3"><hr/></p>
                {row.attributes.purchasing_details.data.map((element, index) => (
                  <p className="-mt-3" key={index}>{element.attributes.total_order} {element.attributes.unit_order}</p>
                ))}
                <p className="-mt-3"><hr/></p>
              </td>
              <td className="border-2 p-1">
                <p className="-mt-3">No : {row.attributes.no_purchasing}</p>
                <p className="-mt-3"><hr/></p>
                {row.attributes.purchasing_details.data.map((element, index) => (
                  <p className="-mt-3" key={index}>{formatter.format(element.attributes.unit_price)}</p>
                ))}
                <p className="-mt-3"><hr/></p>
              </td>
              <td className="border-2 p-1">
                <p className="-mt-3">No Supplier : {row.attributes.no_nota_suppplier}</p>
                <p className="-mt-3"><hr/></p>
                {row.attributes.purchasing_details.data.map((element, index) => (
                  <p className="-mt-3" key={index}>
                    <td>{formatter.format(element.attributes.disc ?? 0)}</td>
                    <td>{element.attributes.dp1}%</td>
                    <td>{element.attributes.dp2}%</td>
                    <td>{element.attributes.dp3}%</td>
                  </p>
                ))}
                <p className="-mt-3"><hr/></p>
              </td>
              <td className="border-2 p-1">
                <p className="-mt-3 pt-3 pb-0 align-bottom">Tempo : {row.attributes.tempo_days} {row.attributes.tempo_time}</p>
                <p className="-mt-2"><hr/></p>
                {row.attributes.purchasing_details.data.map((element, index) => (
                  <p className="-mt-3" key={index}>{formatter.format(element.attributes.unit_price_after_disc)}</p> 
                ))}
                <p className="-mt-3"><hr/></p>
                <p className="-mt-3">Subtotal</p>
              </td>
              <td className="border-2 p-1 pb-1">
              <p className="pt-2"><hr/></p>
                {row.attributes.purchasing_details.data.map((element, index) => {
                  totalAkhir += element.attributes.sub_total;
                  return (<p className="-mt-3" key={index}>{formatter.format(element.attributes.sub_total)}</p>);
                })}
                <p className="-mt-3"><hr/></p>
                <p className="-mt-3">{formatter.format(totalAkhir)}</p>
              </td>
              {/* <td className="border-2 p-2">No : {formatter.format(row.attributes.unit_price)}</td>
              <td className="border-2 p-2">DISC</td>
              <td className="border-2 p-2">HARGA SATUAN STLH DISKON</td>
              <td className="border-2 p-2">SUBTOTAL</td> */}
            </tr>
            </tbody>
            );
          })}
          {/* {data.list.map((row) => {
            var cellData = null;
            if(row.attributes?.purchasing_details){
              const cellDetails = row.attributes.purchasing_details.data.map((element, index) => (
                <tr>
                  <td className="border-2 p-2" key={index}>{element.attributes.product.data.attributes.name}</td>
                </tr>
              ));
              cellData = cellDetails;
            }

            var cellRetur = null;
            if(row.attributes?.returs){
            const cellReturNo = row.attributes.returs.data.map((element, index) => (
              <p key={index}>
                <p className="mb-3"><span className="font-bold">Supplier : </span>{row.attributes.supplier.data.attributes.name}</p>
                <p>
                  {element.attributes.retur_details.data.map((item, idx) => 
                    (<p key={idx}>{item.attributes.products.data[0].attributes.name}</p>)
                  )}
                </p>
                <hr/>
                <p className="py-2"></p>
              </p>
            ));
            cellRetur = cellReturNo;
            }

            return( 
              <div className="mt-2">
                {row.attributes?.purchasing_details ? (
                    <div>
                      <tr>
                        <td className="border-2 p-2"><span className="font-bold">Supplier : </span>{row.attributes.supplier.data.attributes.name}</td>
                      </tr>
                      <tr className="p-2">
                      {cellData}
                      </tr>
                    </div>
                    ) : (
                    <div hidden></div>
                  )}

                {row.attributes?.returs ? (
                      <div>
                        <tr>
                          <td className="border-2 p-2"> </td>
                        </tr>
                        <tr>
                          <td className="border-2 p-2">{cellRetur}</td>
                        </tr>
                      </div>
                    ) : (
                      <div hidden></div>
                  )}
                
              </div>
            );
          }
          )} */}
        </table>
      </div>
      {/* <div className="font-bold  text-sm uppercase mt-3 flex justify-end">TOTAL HARGA : {getTotalProduct()}</div>
      <div className="font-bold  text-sm uppercase mt-4 flex justify-end">
        BIAYA PENGIRIMAN : {formatter.format(deliveryFee)}
      </div>
      <div className="font-bold  text-sm uppercase mt-4 flex justify-end">TAMBAHAN :</div>
      <div className=" text-sm uppercase mt-2 flex justify-end">{getAdditionalFee()}</div>

      <div className="font-bold  text-sm uppercase mt-4 flex justify-end">
        TOTAL PESANAN : {formatter.format(TotalHarga)}
      </div> */}
    </div>
  );
};

Print.getInitialProps = async (context) => {

  return {};
};

export default Print;
