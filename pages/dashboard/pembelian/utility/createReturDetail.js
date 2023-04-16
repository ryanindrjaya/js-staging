import React from "react";
import nookies from "nookies";
import * as moment from "moment";

var tempListId = [];
const cookies = nookies.get(null, "token");
var index = 0;

const getUnitPrice = (data, unit) => {
  var unitIndex = 1;
  for (let index = 1; index < 6; index++) {
    if (data.attributes[`unit_${index}`] === unit) {
      unitIndex = index;
    }
  }

  var selectedUnit = data.attributes[`buy_price_${unitIndex}`];
  return selectedUnit;
};

const createReturDetail = (
  products,
  productTotalPrice,
  productSubTotal,
  setListId,
  url,
  value
) => {
  products.productList.forEach((element) => {
    console.log("productTotalPrice", productTotalPrice);
    console.log("productSubTotal", productSubTotal, products, value);
    // default value
    tempListId = [];
    const id = index;
    var qty = products?.productInfo[id]?.qty ?? 1;
    var disc = products?.productInfo[id]?.disc ?? 0;
    var unit = products?.productInfo[id]?.unit ?? element.attributes.unit_1;
    //var unitPrice = getUnitPrice(element, unit);
    var unitPrice = value?.harga_satuan[id];
    if (value?.harga_satuan[id] == undefined) {
      unitPrice = element.attributes.buy_price_1;
    }
    //var disc = products?.productInfo[id]?.disc ?? 0;
    var d1 =
      products?.productInfo[id]?.d1 ?? element.attributes[`unit_1_dp1`] ?? 0;
    var d2 =
      products?.productInfo[id]?.d2 ?? element.attributes[`unit_1_dp2`] ?? 0;
    var d3 =
      products?.productInfo[id]?.d3 ?? element.attributes[`unit_1_dp3`] ?? 0;

    var unitPriceAfterDisc = productTotalPrice[id];
    var subTotal = productSubTotal?.[id];
    //var subTotal = unitPriceAfterDisc * qty;]
    var batch = value?.batch[id];
    var expired_date = new Date(value?.expired_date[id]);
    var location = value?.product_location[id];
    //console.log("detail", qty, disc, unit, unitPrice, unitPriceAfterDisc, subTotal, id, batch, expired_date, location);
    POSTReturDetail(
      qty,
      disc,
      unit,
      unitPrice,
      unitPriceAfterDisc,
      d1,
      d2,
      d3,
      subTotal,
      element.id,
      setListId,
      products,
      batch,
      expired_date,
      location,
      url
    );

    index++;
  });

  index = 0;
};

const POSTReturDetail = async (
  qty,
  disc,
  unit,
  unitPrice,
  unitPriceAfterDisc,
  d1,
  d2,
  d3,
  subTotal,
  id,
  setListId,
  products,
  batch,
  expired_date,
  location,
  url
) => {
  var data = {
    data: {
      qty: String(qty),
      unit: unit,
      d1: d1,
      d2: d2,
      d3: d3,
      disc: disc,
      //harga_satuan: parseInt(unitPrice),
      harga_satuan: unitPrice,
      sub_total: parseFloat(subTotal),
      products: { id: id },
      batch: batch,
      expired_date: expired_date,
      location: location,
    },
  };

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

  const req = await fetch(endpoint, options);
  const res = await req.json();

  if (req.status === 200) {
    tempListId.push(res.data?.id);
    if (tempListId.length === products.productList.length) {
      setListId(tempListId);
    }
  }
};

export default createReturDetail;
