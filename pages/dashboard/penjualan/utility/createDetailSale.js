import React from "react";
import nookies from "nookies";
import * as moment from "moment";

var tempListId = [];
const cookies = nookies.get(null, "token");

const createDetailSale = (
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
    //var d1 = products.productInfo[id].d1;
    //var d2 = products.productInfo[id].d2;
    var d1 = element.attributes.unit_1_dp1;
    var d2 = element.attributes.unit_1_dp2;

    const id = element.id;
    //var batch = values.batch[id];
    //var location = values.product_location[id];
    var expDate = values.expired_date?.[id];
    var newExptDate = moment
      .utc(expDate)
      .utcOffset(7 * 60)
      .format();

    qty = products.productInfo[id]?.qty ?? 1;
    disc = products.productInfo[id]?.disc ?? 0;
    unit = products.productInfo[id]?.unit ?? element.attributes.unit_1;
    unitPrice = products.productInfo?.[id]?.priceUnit ?? element.attributes.buy_price_1;
    unitPriceAfterDisc = productTotalPrice?.[id];
    subTotal = productSubTotal?.[id];
    d1 = products.productInfo[id]?.d1 ?? element.attributes.unit_1_dp1;
    d2 = products.productInfo[id]?.d2 ?? element.attributes.unit_1_dp2;

    console.log("new data", products.productInfo[id].d1);
    //console.log("new data detail :", qty, disc, unit, unitPrice, unitPriceAfterDisc, subTotal, expDate, d1, d2, id);

    POSTSaleDetail(
      qty,
      disc,
      unit,
      unitPrice,
      unitPriceAfterDisc,
      subTotal,
      id,
      setListId,
      products,
      //batch,
      //location,
      newExptDate,
      d1,
      d2,
      url
    );
  });
};

const POSTSaleDetail = async (
  qty,
  disc,
  unit,
  unitPrice,
  unitPriceAfterDisc,
  subTotal,
  id,
  setListId,
  products,
  //batch,
  //location,
  expDate,
  d1,
  d2,
  url
) => {
  var data = {
    data: {
      qty : qty,
      unit : unit,
      unit_price : unitPrice,
      //unit_price_after_disc: parseInt(unitPriceAfterDisc),
      sub_total: parseInt(subTotal),
      product: { id: id },
      disc: parseInt(disc),
      //batch: batch,
      //location: { id: location },
      expired_date: expDate,
      disc1 : d1,
      disc2 : d2,
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

export default createDetailSale;
