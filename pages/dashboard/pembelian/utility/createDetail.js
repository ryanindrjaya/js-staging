import React from "react";
import nookies from "nookies";
import * as moment from "moment";

var tempListId = [];
const cookies = nookies.get(null, "token");

const getIndexUnit = (data, idx) => {
  var unitIndex = 1;
  for (let index = 1; index < 6; index++) {
    if (data.attributes[`unit_${index}`] === data.attributes[`unit_${idx + 1}`]) {
      unitIndex = index;
    }
  }

  return unitIndex;
};

const createDetailOrder = (values, products, productTotalPrice, productSubTotal, setListId, url) => {
  // console.log(values);
  console.log("values", values);
  console.log("product", products);
  console.log("productList", products.productList);
  products.productList.forEach((element, idx) => {
    var subTotal = unitPriceAfterDisc * qty;

    const id = element.id;

    var batch = values.batch[idx];
    var location = values.product_location[idx];
    var expDate = new Date(values.expired_date[idx]);
    var newExptDate = moment
      .utc(expDate)
      .utcOffset(7 * 60)
      .format();

    var qty = products.productInfo[idx]?.qty ?? 1;
    var disc = products.productInfo[idx]?.disc ?? 0;
    var unit = products.productInfo?.[idx]?.unit ?? element.attributes.unit_1;
    var unitPrice = products.productInfo?.[idx]?.priceUnit ?? element.attributes.buy_price_1;
    var unitPriceAfterDisc = productTotalPrice?.[idx];
    var subTotal = productSubTotal?.[idx];
    var dp1 = products.productInfo?.[idx]?.d1 ?? element.attributes[`unit_1_dp1`] ?? 0;
    var dp2 = products.productInfo?.[idx]?.d2 ?? element.attributes[`unit_1_dp2`] ?? 0;
    var dp3 = products.productInfo?.[idx]?.d3 ?? element.attributes[`unit_1_dp3`] ?? 0;

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
  batch,
  location,
  expDate,
  url,
  dp1,
  dp2,
  dp3
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

  console.log("res create detail", res);

  if (req.status === 200) {
    tempListId.push(res.data?.id);
    if (tempListId.length === products.productList.length) {
      setListId(tempListId);
    }
  }
};

export default createDetailOrder;
