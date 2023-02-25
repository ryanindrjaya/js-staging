import React from "react";
import nookies from "nookies";
import * as moment from "moment";

var tempListId = [];
const cookies = nookies.get(null, "token");
var index = 0;

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

const updateRetur = (
  products,
  productTotalPrice,
  productSubTotal,
  setListId,
  url,
  value,
  returData
) => { console.log("update", value);

  products.productList.forEach((element) => {
    // value detail 
    tempListId = [];
    const id = index;
    var qty = products?.productInfo[id]?.qty ?? 1;
    var unit = products?.productInfo[id]?.unit ?? element.attributes.unit_1;
    var unitPrice = products?.productInfo[id]?.priceUnit;
    var unitPriceAfterDisc = productTotalPrice[id] ?? element.attributes.buy_price_1;
    var subTotal = unitPriceAfterDisc * qty;
    var batch = value?.batch[id];
    var expired_date = new Date(value?.expired_date[id]);
    //var location = value?.product_location[id];
    var location = null;

    var idDetail = returData?.data[0]?.attributes.retur_details?.data[index].id;
    console.log("detail", qty, unit, unitPrice, subTotal, id, batch, expired_date, location, element, returData, idDetail);
    PUTRetur(
    qty,
    unit,
    unitPrice,
    subTotal,
    batch,
    expired_date,
    location,
    url,
    element.id,
    setListId,
    products,
    idDetail,
    );

    index++;
  });
  index = 0;

  
};

const PUTRetur = async (
  qty,
  unit,
  unitPrice,
  subTotal,
  batch,
  expired_date,
  location,
  url,
  id,
  setListId,
  products,
  idDetail,
) => {
  var data = {
    data: {
      qty: qty,
      unit: unit,
      harga_satuan: unitPrice,
      sub_total: parseInt(subTotal),
      batch: batch,
      expired_date: expired_date,
      location: location,
      products: { id: id },
    },
  };

  const endpoint = process.env.NEXT_PUBLIC_URL + "/retur-details/" + idDetail;
  const JSONdata = JSON.stringify(data);
  const options = {
    method: "PUT",
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

export default updateRetur;
