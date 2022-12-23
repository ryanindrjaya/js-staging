import React from "react";
import nookies from "nookies";
import * as moment from "moment";

var tempListId = [];
const cookies = nookies.get(null, "token");

const createDetailOrderSale = (
  values,
  products,
  setListId,
  url
) => {
  products.productList.forEach((element) => {
    // default value
    var qty = 1;
    var unit = element.attributes.unit_1;
    var unitPrice = element.attributes.buy_price_1;

    const id = element.id;

    qty = products.productInfo[id]?.qty ?? 1;
    unit = products.productInfo[id]?.unit ?? element.attributes.unit_1;
    unitPrice = products.productInfo?.[id]?.priceUnit ?? element.attributes.buy_price_1;

    POSTSaleDetail(
      qty,
      unit,
      unitPrice,
      id,
      setListId,
      products,
      url
    );
  });
};

const POSTSaleDetail = async (
  qty,
  unit,
  unitPrice,
  id,
  setListId,
  products,
  url
) => {
  var data = {
    data: {
      qty : qty,
      unit : unit,
      unit_price : unitPrice,
      product: { id: id },
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
