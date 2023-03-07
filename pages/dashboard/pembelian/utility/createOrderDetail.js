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

const getIndexUnit = (data, idx) => {
  var unitIndex = 1;
  for (let index = 1; index < 6; index++) {
    if (data.attributes[`unit_${index}`] === data.attributes[`unit_${idx + 1}`]) {
      unitIndex = index;
    }
  }

  return unitIndex;
};

const createDetailOrder = (products, productTotalPrice, productSubTotal, setListId, url, value) => {
  products.productList.forEach((element, idx) => {
    console.log("products", products);
    console.log(products.productInfo);
    console.log("productTotalPrice", productTotalPrice);
    console.log("productSubTotal", productSubTotal);
    console.log("element attribute", element.attributes);

    // default value
    tempListId = [];
    const id = element.id;
    const unitByIndex = getIndexUnit(element, idx);
    var qty = products?.productInfo?.[idx]?.qty ?? 1;
    var disc =
      products?.productInfo?.[idx]?.disc ?? element.attributes[`purchase_discount_${unitByIndex}`];
    var unit = products.productInfo?.[idx]?.unit ?? element.attributes[`unit_${unitByIndex}`];
    var dp1 = products.productInfo?.[idx]?.d1 ?? element.attributes[`unit_${unitByIndex}_dp1`] ?? 0;
    var dp2 = products.productInfo?.[idx]?.d2 ?? element.attributes[`unit_${unitByIndex}_dp2`] ?? 0;
    var dp3 = products.productInfo?.[idx]?.d3 ?? element.attributes[`unit_${unitByIndex}_dp3`] ?? 0;
    //var unitPrice = getUnitPrice(element, unit);
    var unitPrice = value.harga_satuan?.[idx];
    if (value.harga_satuan?.[idx] == undefined) {
      unitPrice = element.attributes.buy_price_1;
    }

    var unitPriceAfterDisc = productTotalPrice?.[idx] ?? element.attributes[`buy_price_${idx + 1}`];
    var subTotal = unitPriceAfterDisc * qty;

    console.log("detail nich :", qty, disc, unit, unitPrice, unitPriceAfterDisc, subTotal);

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
      url,
      dp1,
      dp2,
      dp3
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
  url,
  dp1,
  dp2,
  dp3
) => {
  var data = {
    data: {
      total_order: String(qty),
      unit_order: unit,
      unit_price: parseInt(unitPrice),
      unit_price_after_disc: parseFloat(unitPriceAfterDisc || 0).toFixed(2),
      sub_total: parseFloat(subTotal || 0).toFixed(2),
      products: { id: id },
      disc: parseFloat(disc),
      dp1: parseFloat(dp1),
      dp2: parseFloat(dp2),
      dp3: parseFloat(dp3),
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
