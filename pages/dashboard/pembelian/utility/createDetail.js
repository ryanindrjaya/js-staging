import React from "react";
import nookies from "nookies";
import * as moment from "moment";

var tempListId = [];
const cookies = nookies.get(null, "token");

const createDetailOrder = (
  values,
  products,
  productTotalPrice,
  productSubTotal,
  setListId,
  url
) => {
  // console.log(values);
  console.log("values", values);
  console.log("product", products);
  console.log("productList", products.productList);
  products.productList.forEach((element) => {
    // default value
    var qty = 1;
    var disc = 0;
    var unit = element.attributes.unit_1;
    var unitPrice = element.attributes.buy_price_1;
    var unitPriceAfterDisc = element.attributes.buy_price_1;
    var subTotal = unitPriceAfterDisc * qty;

    const id = element.id;
    var batch = values.batch[id];
    var location = values.product_location[id];
    var expDate = new Date(values.expired_date[id]);
    var newExptDate = moment
      .utc(expDate)
      .utcOffset(7 * 60)
      .format();

    qty = products.productInfo[id]?.qty ?? 1;
    disc = products.productInfo[id]?.disc ?? 0;
    unit = products.productInfo[id]?.unit ?? element.attributes.unit_1;
    unitPrice =
      products.productInfo?.[id]?.priceUnit ?? element.attributes.buy_price_1;
    unitPriceAfterDisc = productTotalPrice?.[id];
    subTotal = productSubTotal?.[id];

    console.log("new data", batch, location, expDate, newExptDate);

    POSTPurchaseDetail(
      qty,
      disc,
      unit,
      unitPrice,
      unitPriceAfterDisc,
      subTotal,
      id,
      setListId,
      products,
      batch,
      location,
      newExptDate,
      url
    );
  });
};

const POSTPurchaseDetail = async (
  qty,
  disc,
  unit,
  unitPrice,
  unitPriceAfterDisc,
  subTotal,
  id,
  setListId,
  products,
  batch,
  location,
  expDate,
  url
) => {
  var data = {
    data: {
      total_order: String(qty),
      unit_order: unit,
      unit_price: unitPrice,
      unit_price_after_disc: parseInt(unitPriceAfterDisc),
      sub_total: parseInt(subTotal),
      product: { id: id },
      disc: parseInt(disc),
      batch: batch,
      location: { id: location },
      expired_date: expDate,
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

export default createDetailOrder;
