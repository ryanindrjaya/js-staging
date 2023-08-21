import React from "react";
import nookies from "nookies";
import * as moment from "moment";

var tempListId = [];
const cookies = nookies.get(null, "token");

var id = 0;

const createDetailOrderSale = (values, products, setListId, url, lokasiGudang) => {
  const dataToPost = [];
  products.productList.forEach((element, idx) => {
    console.log("element", element, products);
    //default value
    var qty = 1;
    var unit = element.attributes.unit_1;
    var unitPrice = element.attributes.sold_price_1;
    var elementId = element.id;
    tempListId = [];

    qty = products.productInfo[idx]?.qty ?? 1;
    unit = products.productInfo[idx]?.unit ?? element.attributes.unit_1;
    unitPrice = products.productInfo?.[idx]?.priceUnit ?? element.attributes.sold_price_1;

    var d1 = products.productInfo[idx]?.d1;
    var d2 = products.productInfo[idx]?.d2;

    const inventory = lokasiGudang?.[idx];

    dataToPost.push({ qty, unit, unitPrice, idx, setListId, products, elementId, d1, d2, url, inventory });
  });

  dataToPost.reverse().forEach((element) => {
    POSTSaleDetail(
      element.qty,
      element.unit,
      element.unitPrice,
      element.id,
      element.setListId,
      element.products,
      element.elementId,
      element.d1,
      element.d2,
      element.url,
      element.inventory
    );
  });
};

const POSTSaleDetail = async (qty, unit, unitPrice, id, setListId, products, elementId, d1, d2, url, inventory) => {
  var data = {
    data: {
      qty: qty,
      unit: unit,
      unit_price: unitPrice,
      product: { id: elementId },
      disc1: d1,
      disc2: d2,
      inventory: inventory,
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
