import React from "react";
import nookies from "nookies";
import * as moment from "moment";

var tempListId = [];
const cookies = nookies.get(null, "token");

var id = 0;

const createDetailOrderSale = async (values, products, setListId, url, lokasiGudang) => {
  const dataToPost = [];
  const detailIds = [];

  for (let index = 0; index < products.productList.length; index++) {
    const element = products.productList[index];
    //default value
    var qty = 1;
    var unit = element.attributes.unit_1;
    var unitPrice = element.attributes.sold_price_1;
    var elementId = element.id;
    tempListId = [];

    qty = products.productInfo[index]?.qty ?? 1;
    unit = products.productInfo[index]?.unit ?? element.attributes.unit_1;
    unitPrice = products.productInfo?.[index]?.priceUnit ?? element.attributes.sold_price_1;

    var d1 = products.productInfo[index]?.d1;
    var d2 = products.productInfo[index]?.d2;

    const inventory = lokasiGudang?.[index];

    const id = await POSTSaleDetail(
      qty,
      unit,
      unitPrice,
      index,
      setListId,
      products,
      elementId,
      d1,
      d2,
      url,
      inventory
    );

    detailIds.push(id);
  }

  setListId(detailIds);
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
    return res.data?.id;
  }
};

export default createDetailOrderSale;
