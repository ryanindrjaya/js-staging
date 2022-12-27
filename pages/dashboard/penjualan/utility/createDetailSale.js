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
  products.productList.forEach((element) => {
    // default value
    var qty = 1;
    var disc = 0;
    var margin = 0;
    var unit = element.attributes.unit_1;
    var unitPrice = element.attributes.buy_price_1;
    var unitPriceAfterDisc = element.attributes.buy_price_1;
    var subTotal = unitPriceAfterDisc * qty;

    const id = element.id;
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
    var d1 = products.productInfo[id]?.d1 ?? element.attributes.unit_1_dp1;
    var d2 = products.productInfo[id]?.d2 ?? element.attributes.unit_1_dp2;
    var d3 = products.productInfo[id]?.d3 ?? element.attributes.unit_1_dp3;
    margin = products.productInfo[id]?.margin ?? 0;

    POSTSaleDetail(
      qty,
      disc,
      unit,
      unitPrice,
      subTotal,
      id,
      setListId,
      products,
      newExptDate,
      d1,
      d2,
      d3,
      margin,
      url
    );
  });
};

const POSTSaleDetail = async (
  qty,
  disc,
  unit,
  unitPrice,
  subTotal,
  id,
  setListId,
  products,
  expDate,
  d1,
  d2,
  //d3,
  margin,
  url
) => {
  var data = {
    data: {
      qty : qty,
      unit : unit,
      unit_price : unitPrice,
      sub_total: parseInt(subTotal),
      product: { id: id },
      disc: parseInt(disc),
      expired_date: expDate,
      disc1 : d1,
      disc2 : d2,
      //disc3 : d3,
      margin : margin
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
