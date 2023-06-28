import React from "react";
import nookies from "nookies";
import { PrinterOutlined } from "@ant-design/icons";

const Print = ({ props }) => {
  console.log("props", props);
  const name = process.env.STAKEHOLDER_NAME;
  const noLPB = props.purchases.data.attributes.no_purchasing;
  const noPO = props?.purchases?.data?.attributes?.purchase?.data?.attributes?.no_po || "-";
  const noNotaSupplier = props?.purchases?.data?.attributes?.no_nota_suppplier || "-";
  const noNota = props.purchases.data.attributes.no_bbm ?? "-";
  const date = new Date(props.purchases.data.attributes.date_purchasing).toLocaleDateString("id-ID");
  const supplierName = props.purchases.data.attributes.supplier.data.attributes.name;
  const supplierAddress = props.purchases.data.attributes.supplier.data.attributes.address;

  const destination = props.purchases.data.attributes.location.data.attributes;
  const destionationName = destination.name;
  const destinationStreet = `${destination?.street || ""} `;
  const destinationAddress = `${destination?.city || ""} ${destination?.province || ""} ${
    destination?.postal_code || ""
  } ${destination?.country || ""}`;

  const items = props.purchases.data.attributes.purchasing_details.data;
  const deliveryFee = props.purchases.data.attributes.delivery_fee;
  const TotalHarga = props.purchases.data.attributes.total_purchasing;

  var index = 0;

  const getHargaSatuan = (unit, index) => {
    var price = 0;
    price = props.purchases.data.attributes.purchasing_details.data[index - 1].attributes.unit_price;
    // const product = props.purchases.data.attributes.purchasing_details.data[index - 1].attributes.product.data;

    // for (let index = 1; index < 6; index++) {
    //   if (product.attributes[`unit_${index}`] === unit) {
    //     price = product.attributes[`buy_price_${index}`];
    //   }
    // }

    return formatter.format(price);
  };

  const getProductDisc = (unit, index) => {
    var disc1 = 0;
    var disc2 = 0;
    var disc3 = 0;

    const discInput = props.purchases.data.attributes.purchasing_details.data[index - 1].attributes.disc;

    const product = props.purchases.data.attributes.purchasing_details.data[index - 1].attributes.product.data;

    const detail = props.purchases.data.attributes.purchasing_details.data[index - 1].attributes;

    for (let index = 1; index < 6; index++) {
      if (product.attributes[`unit_${index}`] === unit) {
        disc1 = detail.dp1;
        disc2 = detail.dp2;
        disc3 = detail.dp3;
      }
    }

    return `${formatter.format(discInput)}, ${disc1}%, ${disc2}%, ${disc3}%`;
  };

  const getSubTotal = (index) => {
    var subTotal = props.purchases.data.attributes.purchasing_details.data[index - 1].attributes.sub_total;
    return formatter.format(subTotal);
  };

  const getTotalProduct = () => {
    var total = 0;
    props.purchases.data.attributes.purchasing_details.data.forEach((element) => {
      total = total + element.attributes.sub_total;
    });

    return formatter.format(total);
  };

  const getAdditionalFee = () => {
    return [1, 2, 3, 4, 5].map((index) => {
      if (props.purchases.data?.attributes?.[`additional_fee_${index}_desc`]) {
        return (
          <div key={index} className="grid grid-cols-2 gap-7">
            <div className="w-full flex justify-between">
              <span className="text-sm font-semibold text-gray-600">
                {props.purchases.data?.attributes?.[`additional_fee_${index}_desc`]}
              </span>

              <span className="text-sm font-semibold ml-5 text-gray-600 text-right">:</span>
            </div>
            <span className="text-sm font-semibold text-gray-600 text-right">
              {formatter.format(props.purchases.data?.attributes?.[`additional_fee_${index}_sub`])}
            </span>
          </div>
        );
      }
    });
  };

  const getProductPriceAfterDisc = (index) => {
    var price = props.purchases.data.attributes.purchasing_details.data[index - 1].attributes.unit_price_after_disc;

    return formatter.format(price);
  };

  const getDPP = () => {
    var isDPPactive = props.purchases.data.attributes.DPP_active;

    var total = 0;
    props.purchases.data.attributes.purchasing_details.data.forEach((element) => {
      total = total + element.attributes.sub_total;
    });

    if (isDPPactive) {
      return total / 1.11;
    }

    return 0;
  };

  const getPPN = () => {
    var dppPrice = getDPP();
    var ppnPrice = 0;
    var isDPPactive = props.purchases.data.attributes.DPP_active;

    if (isDPPactive) {
      console.log("ppn price", dppPrice * 0.11);
      ppnPrice = dppPrice * 0.11;
      return ppnPrice;
    }

    return ppnPrice;
  };

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
        <div className="font-bold text-lg">{name}</div>
        <div>
          <div className="">NO : {noLPB}</div>
          <div className="">Tanggal : {date}</div>
        </div>
      </div>
      <div className="font-bold text-lg flex justify-center mb-5">LEMBAR PENERIMAAN BARANG</div>
      <div className="flex justify-between mb-5">
        <div>
          <div className="font-bold text-sm">KEPADA</div>
          <div className="font-bold text-sm uppercase">Nama Supplier : {supplierName}</div>
          <div>{supplierAddress}</div>
          <div className="font-bold  text-sm uppercase mt-4">NO NOTA SUPPLIER : {noNotaSupplier}</div>
          <div className="font-bold  text-sm uppercase">NO BBM : {noNota}</div>
        </div>
        <div>
          <div className="font-bold  text-sm uppercase">ALAMAT PENGIRIMAN : {destionationName}</div>
          <div>{destinationStreet}</div>
          <div>{destinationAddress}</div>
          <div className="font-bold  text-sm uppercase mt-4">NO PO : {noPO}</div>
        </div>
      </div>
      <div className="flex justify-between">
        <table className="w-full">
          <tr className="p-2">
            <th className="border-2 p-2">NO</th>
            <th className="border-2 p-2">ITEM</th>
            <th className="border-2 p-2">TOTAL UNIT</th>
            <th className="border-2 p-2">HARGA SATUAN</th>
            <th className="border-2 p-2">DISC</th>
            <th className="border-2 p-2">HRG SATUAN SETELAH DISC</th>
            <th className="border-2 p-2">TOTAL HARGA</th>
          </tr>
          {items.map((element) => {
            index++;
            return (
              <tr>
                <td className="border-2 p-2">{index}</td>
                <td className="border-2 p-2">{element.attributes.product.data.attributes.name}</td>
                <td className="border-2 p-2">
                  {element.attributes.total_order} {element.attributes.unit_order}
                </td>
                <td className="border-2 p-2">{getHargaSatuan(element.attributes.unit_order, index)}</td>
                <td className="border-2 p-2">{getProductDisc(element.attributes.unit_order, index)}</td>
                <td className="border-2 p-2">{getProductPriceAfterDisc(index)}</td>
                <td className="border-2 p-2">{getSubTotal(index)}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="flex w-full justify-between ">
        <div>
          <div className="font-bold  text-sm uppercase mt-3 flex justify-start">TAMBAHAN :</div>
          <div className=" text-sm uppercase mt-2 flex flex-col justify-start">{getAdditionalFee()}</div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="font-bold  text-sm uppercase flex justify-end">TOTAL HARGA : {getTotalProduct()}</div>
          <div className="grid grid-cols-2 mt-3 gap-7">
            <div className="w-full flex justify-between">
              <span className="text-sm font-semibold text-gray-600">DPP</span>

              <span className="text-sm font-semibold ml-5 text-gray-600 text-right">:</span>
            </div>
            <span className="text-sm font-semibold text-gray-600 text-right">{formatter.format(getDPP())}</span>
          </div>
          <div className="grid grid-cols-2 gap-7">
            <div className="w-full flex justify-between">
              <span className="text-sm font-semibold text-gray-600">PPN</span>

              <span className="text-sm font-semibold ml-5 text-gray-600 text-right">:</span>
            </div>
            <span className="text-sm font-semibold text-gray-600 text-right">{formatter.format(getPPN())}</span>
          </div>
          <div className="grid grid-cols-2 gap-7">
            <div className="w-full flex justify-between">
              <span className="text-sm font-semibold text-gray-600">BIAYA PENGIRIMAN</span>

              <span className="text-sm font-semibold ml-5 text-gray-600 text-right">:</span>
            </div>
            <span className="text-sm font-semibold text-gray-600 text-right">{formatter.format(deliveryFee)}</span>
          </div>
        </div>
      </div>
      <div className="font-bold justify-end text-sm uppercase mt-4 flex">
        TOTAL PESANAN : {formatter.format(TotalHarga)}
      </div>

      <div className="font-bold justify-end  text-sm uppercase mt-10 flex">HORMAT KAMI</div>
      <div className="font-bold justify-end  text-sm uppercase mt-10 flex pb-4">_____________________________</div>
    </div>
  );
};

Print.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings/" + id + "?populate=deep";
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
    context.res.writeHead(302, {
      Location: "/signin?session=false",
      "Content-Type": "text/html; charset=utf-8",
    });
    context?.res?.end();

    return {};
  }

  return {
    props: {
      purchases,
    },
  };
};

export default Print;
