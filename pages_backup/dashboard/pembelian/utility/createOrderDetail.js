import React from "react";
import nookies from "nookies";
import * as moment from "moment";

var tempListId = [];
const cookies = nookies.get(null, "token");

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

const createDetailOrder = (
  products,
  productTotalPrice,
  productSubTotal,
  setListId,
  url,
  value
) => {
  products.productList.forEach((element) => {
    console.log(products);
    console.log(products.productInfo);
    console.log("productTotalPrice", productTotalPrice);
    console.log("productSubTotal", productSubTotal);

    // default value
    tempListId = [];
    const id = element.id;
    var qty = products?.productInfo?.[id]?.qty ?? 1;
    var disc = products?.productInfo?.[id]?.disc ?? 0;
    var unit = products.productInfo?.[id]?.unit ?? element.attributes.unit_1;
    //var unitPrice = getUnitPrice(element, unit);
    var unitPrice = value.harga_satuan?.[id];
    if(value.harga_satuan?.[id] == undefined){
        unitPrice = element.attributes.buy_price_1;
    }

    var unitPriceAfterDisc =
      productTotalPrice?.[id] ?? element.attributes.buy_price_1;
    var subTotal = unitPriceAfterDisc * qty;

    //console.log("detail nich :",qty, disc, unit, unitPrice, unitPriceAfterDisc, subTotal);

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
  url
) => {
  var data = {
    data: {
      total_order: String(qty),
      unit_order: unit,
      unit_price: parseInt(unitPrice),
      unit_price_after_disc: parseInt(unitPriceAfterDisc),
      sub_total: parseInt(subTotal),
      products: { id: id },
      disc: parseInt(disc),
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
