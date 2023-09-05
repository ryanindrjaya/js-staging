import React from "react";
import nookies from "nookies";
import * as moment from "moment";

const cookies = nookies.get(null, "token");

const createDetailSale = async (
  values,
  products,
  productTotalPrice,
  productSubTotal,
  setListId,
  url,
  form,
  lokasiGudang
) => {
  const detailIds = [];

  for (let index = 0; index < products.productList.length; index++) {
    const element = products.productList[index];

    // default value
    var qty = 1;
    var disc = 0;
    var margin = 0;
    var unit = element.attributes.unit_1;
    var unitPrice = element.attributes.sold_price_1;
    var unitPriceAfterDisc = element.attributes.sold_price_1;
    var subTotal = 0;
    const productLoc = form.getFieldValue("product_location") ?? values?.location;
    console.log("productLoc", productLoc);

    var expDate = values.expired_date?.[id];
    var newExptDate = moment
      .utc(expDate)
      .utcOffset(7 * 60)
      .format();

    var elementId = element.id;
    qty = products.productInfo[index]?.qty ?? 1;
    disc = products.productInfo[index]?.disc ?? 0;
    unit = products.productInfo[index]?.unit ?? element.attributes.unit_1;
    unitPrice = products.productInfo[index]?.priceUnit ?? element.attributes.sold_price_1;
    unitPriceAfterDisc = productTotalPrice?.[index];
    subTotal = productSubTotal?.[index];
    var d1 = products.productInfo[index]?.d1 ?? element.attributes.disc_1_1;
    var d2 = products.productInfo[index]?.d2 ?? 0;
    margin = products.productInfo[index]?.margin ?? 0;
    var productLocationId = productLoc?.[index] ?? productLoc;
    const dataGudang = lokasiGudang?.[index];

    console.log("data gudang", dataGudang);

    const id = await POSTSaleDetail(
      qty,
      disc,
      unit,
      unitPrice,
      subTotal,
      id,
      elementId,
      setListId,
      products,
      newExptDate,
      d1,
      d2,
      //d3,
      margin,
      productLocationId,
      url,
      dataGudang
    );

    detailIds.push(id);
  }

  setListId(detailIds);
};
export const createDetailReturSale = async (
  values,
  products,
  productTotalPrice,
  productSubTotal,
  setListId,
  url,
  form,
  lokasiGudang,
  items
) => {
  const detailIds = [];

  for (let index = 0; index < items.length; index++) {
    const element = items[index];

    // default value
    var qty = 1;
    var disc = 0;
    var margin = 0;
    var unit = element.attributes.unit_1;
    var unitPrice = element.attributes.sold_price_1;
    var unitPriceAfterDisc = element.attributes.sold_price_1;
    var subTotal = 0;
    const productLoc = form.getFieldValue("product_location") ?? values?.location;
    console.log("productLoc", productLoc);

    var expDate = values.expired_date?.[id];
    var newExptDate = moment
      .utc(expDate)
      .utcOffset(7 * 60)
      .format();

    var elementId = element.id;
    qty = products.productInfo[element.index]?.qty ?? 1;
    disc = products.productInfo[element.index]?.disc ?? 0;
    unit = products.productInfo[element.index]?.unit ?? element.attributes.unit_1;
    unitPrice = products.productInfo[element.index]?.priceUnit ?? element.attributes.sold_price_1;
    unitPriceAfterDisc = productTotalPrice?.[element.index];
    subTotal = productSubTotal?.[element.index];
    var d1 = products.productInfo[element.index]?.d1 ?? element.attributes.disc_1_1;
    var d2 = products.productInfo[element.index]?.d2 ?? 0;
    margin = products.productInfo[element.index]?.margin ?? 0;
    var productLocationId = productLoc?.[element.index] ?? productLoc;
    const dataGudang = lokasiGudang?.[element.index];

    console.log("data gudang", dataGudang);

    const id = await POSTSaleDetail(
      qty,
      disc,
      unit,
      unitPrice,
      subTotal,
      id,
      elementId,
      setListId,
      products,
      newExptDate,
      d1,
      d2,
      //d3,
      margin,
      productLocationId,
      url,
      dataGudang
    );

    detailIds.push(id);
  }

  setListId(detailIds);
};

const POSTSaleDetail = async (
  qty,
  disc,
  unit,
  unitPrice,
  subTotal,
  id,
  elementId,
  setListId,
  products,
  expDate,
  d1,
  d2,
  //d3,
  margin,
  productLocationId,
  url,
  dataGudang
) => {
  var data = {
    data: {
      qty: qty,
      unit: unit,
      unit_price: unitPrice,
      sub_total: parseFloat(subTotal),
      product: { id: elementId },
      disc: parseFloat(disc),
      expired_date: expDate,
      disc1: d1,
      disc2: d2,
      margin: margin,
      location: productLocationId,
      inventory: dataGudang,
    },
  };
  console.log("data", data);

  const endpoint = process.env.NEXT_PUBLIC_URL + url;
  const JSONdata = JSON.stringify(data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
    body: JSONdata,
  };

  console.log("data", JSONdata);

  const req = await fetch(endpoint, options);
  const res = await req.json();

  if (req.status === 200) {
    return res.data?.id;
  }
};

export default createDetailSale;
