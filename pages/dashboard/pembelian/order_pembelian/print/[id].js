import React from "react";
import nookies from "nookies";
import { PrinterOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";

const Print = ({ props }) => {
  console.log("props", props);
  const name = process.env.STAKEHOLDER_NAME;
  const noPO = props.purchases.data.attributes.no_po;
  const date = new Date(props.purchases.data.attributes.order_date).toLocaleDateString("id-ID");
  const supplierName = props.purchases.data.attributes.supplier?.data?.attributes?.name;
  const supplierAddress = props.purchases.data.attributes.supplier?.data?.attributes?.address;
  const catatan = props.purchases.data.attributes?.additional_note;

  const destination = props.purchases.data.attributes.location.data.attributes;
  const destionationName = destination.name;
  const destinationStreet = `${destination?.street || ""} `;
  const destinationAddress = `${destination?.city || ""} ${destination?.province || ""} ${
    destination?.postal_code || ""
  } ${destination?.country || ""}`;

  const items = props.purchases.data.attributes.purchase_details.data;
  const deliveryFee = props.purchases.data.attributes.delivery_fee;
  const TotalHarga = props.purchases.data.attributes.delivery_total;

  var index = 0;

  const getHargaSatuan = (unit, index) => {
    var price = 0;

    price = props.purchases.data.attributes.purchase_details.data[index - 1].attributes.unit_price;

    // const product =
    //   props.purchases.data.attributes.purchase_details.data[index - 1]
    //     .attributes.products.data[0];

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

    const discInput = props.purchases.data.attributes.purchase_details.data[index - 1].attributes.disc;

    const product = props.purchases.data.attributes.purchase_details.data[index - 1].attributes.products.data[0];

    const detail = props.purchases.data.attributes.purchase_details.data[index - 1].attributes;

    for (let index = 1; index < 6; index++) {
      if (product.attributes[`unit_${index}`] === unit) {
        disc1 = detail.dp1 ?? product?.attributes?.[`unit_${index}_dp1`] ?? 0;
        disc2 = detail.dp2 ?? product?.attributes?.[`unit_${index}_dp2`] ?? 0;
        disc3 = detail.dp3 ?? product?.attributes?.[`unit_${index}_dp3`] ?? 0;
      }
    }

    return `${formatter.format(discInput)}, ${disc1}%, ${disc2}%, ${disc3}%`;
  };

  const getSubTotal = (index) => {
    var subTotal = props.purchases.data.attributes.purchase_details.data[index - 1].attributes.sub_total;
    return formatter.format(subTotal);
  };

  const getTotalProduct = () => {
    var total = 0;
    props.purchases.data.attributes.purchase_details.data.forEach((element) => {
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
            <span className="text-sm font-semibold text-gray-600 text-left">
              {formatter.format(props.purchases.data?.attributes?.[`additional_fee_${index}_sub`])}
            </span>
          </div>
        );
      }
    });
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

  const getTotalPesanan = () => {
    var total = 0;

    // sub total produk
    props.purchases.data.attributes.purchase_details.data.forEach((element) => {
      total = total + element.attributes.sub_total;
    });

    // biaya pengiriman
    total = total + (props.purchases.data.attributes?.delivery_fee || 0);

    // biaya tambahan
    [1, 2, 3, 4, 5].forEach((index) => {
      total = total + (props.purchases.data.attributes?.[`additional_fee_${index}_sub`] || 0);
    });

    return formatter.format(total);
  };

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
          <div className="">NO : {noPO}</div>
          <div className="">Tanggal : {date}</div>
        </div>
      </div>
      <div className="font-bold text-lg flex justify-center mb-5">ORDER PEMBELIAN</div>
      <div className="flex justify-between mb-3">
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
      </div>
      <div className="flex justify-between">
        <table className="w-full">
          <tr className="p-1">
            <th className="border-2 p-1">NO</th>
            <th className="border-2 p-1">ITEM</th>
            <th className="border-2 p-1">TOTAL UNIT</th>
            <th className="border-2 p-1">HARGA SATUAN</th>
            <th className="border-2 p-1">DISC</th>
            <th className="border-2 p-1">TOTAL HARGA</th>
          </tr>
          {items.map((element) => {
            index++;
            return (
              <tr>
                <td className="border-2 p-1">{index}</td>
                <td className="border-2 p-1">{element.attributes.products.data[0].attributes.name}</td>
                <td className="border-2 p-1">
                  {element.attributes.total_order} {element.attributes.unit_order}
                </td>
                <td className="border-2 p-1">{getHargaSatuan(element.attributes.unit_order, index)}</td>
                <td className="border-2 p-1">{getProductDisc(element.attributes.unit_order, index)}</td>
                <td className="border-2 p-1">{getSubTotal(index)}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="flex justify-between">
        {/* <div>
          <div className="font-bold  text-sm uppercase mt-4 flex justify-start">TAMBAHAN :</div>
          <div className=" text-sm uppercase mt-2 flex flex-col justify-start">{getAdditionalFee()}</div>
        </div> */}
        <div>
          <div className="font-bold  text-sm uppercase mt-3 flex justify-end">TOTAL HARGA : {getTotalProduct()}</div>
          <div className="font-bold  text-sm uppercase mt-4 flex justify-end">
            BIAYA PENGIRIMAN : {formatter.format(deliveryFee)}
          </div>
          <div className="font-bold  text-sm uppercase mt-4 flex justify-end">TOTAL PESANAN : {getTotalPesanan()}</div>
        </div>
      </div>

      <div className={`flex ${catatan ? "justify-between" : "justify-end"} w-full items-start`}>
        {catatan && (
          <div>
            <div className="font-bold  text-sm uppercase mt-4 flex justify-start">CATATAN :</div>
            <div className="text-sm uppercase flex justify-start">{catatan}</div>
          </div>
        )}
        <div>
          <div className="font-bold  text-sm uppercase flex justify-end">HORMAT KAMI</div>
          <div className="font-bold  text-sm uppercase mt-5 flex justify-end">_____________________________</div>
        </div>
      </div>
    </div>
  );
};

Print.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases/" + id + "?populate=deep";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };
  const res = await fetch(endpoint, options);
  const purchases = await res.json();

  return {
    props: {
      purchases,
    },
  };
};

export default Print;
