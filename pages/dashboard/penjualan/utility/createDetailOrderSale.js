import React from "react";
import nookies from "nookies";
import * as moment from "moment";

var tempListId = [];
const cookies = nookies.get(null, "token");

var id = 0;

const createDetailOrderSale = (
  values,
  products,
  setListId,
  url
) => {
  products.productList.forEach((element) => { console.log("element",element,products)
    //default value
    var qty = 1;
    var unit = element.attributes.unit_1;
    var unitPrice = element.attributes.buy_price_1;
    var elementId = element.id;
    tempListId = [];

    qty = products.productInfo[id]?.qty ?? 1;
    unit = products.productInfo[id]?.unit ?? element.attributes.unit_1;
    unitPrice = products.productInfo?.[id]?.unit_price ?? element.attributes.buy_price_1;

    var d1 = products.productInfo[id]?.d1;
    var d2 = products.productInfo[id]?.d2;

    POSTSaleDetail(
      qty,
      unit,
      unitPrice,
      id,
      setListId,
      products,
      elementId,
      d1,
      d2,
      url
    );
    id++;
  });
};

const POSTSaleDetail = async (
  qty,
  unit,
  unitPrice,
  id,
  setListId,
  products,
  elementId,
  d1,
  d2,
  url
) => {
  var data = {
    data: {
      qty : qty,
      unit : unit,
      unit_price : unitPrice,
      product: { id: elementId },
      disc1: d1,
      disc2: d2,
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

export default createDetailOrderSale;
