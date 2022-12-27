import React from "react";

export default function calculatePrice(row, products, productTotalPrice, productSubTotal, setTotalPrice) {
  var priceUnit = row.attributes[`buy_price_1`];
  var qty = 1;
  var disc = 0;
  var margin = 0;

  var Dp1 = row.attributes?.unit_1_dp1;
  var Dp2 = row.attributes?.unit_1_dp2;
  var Dp3 = row.attributes?.unit_1_dp3;

  // check if Dp1, Dp2, Dp3 changed
  if (products.productInfo[row.id]?.d1) {
    Dp1 = products.productInfo[row.id].d1 ?? 1;
  } else if (products.productInfo[row.id]?.d1 === 0 || products.productInfo[row.id]?.d1 === null) {
    Dp1 = 0;
  }

  if (products.productInfo[row.id]?.d2) {
    Dp2 = products.productInfo[row.id].d2 ?? 1;
  } else if (products.productInfo[row.id]?.d2 === 0 || products.productInfo[row.id]?.d2 === null) {
    Dp2 = 0;
  }

  if (products.productInfo[row.id]?.d3) {
    Dp3 = products.productInfo[row.id].d3 ?? 1;
  } else if (products.productInfo[row.id]?.d3 === 0 || products.productInfo[row.id]?.d3 === null) {
    Dp3 = 0;
  }

  // check if price changed
  if (products.productInfo[row.id]?.priceUnit) {
    priceUnit = products.productInfo[row.id].priceUnit ?? row.attributes[`buy_price_1`];
  }

  // check if qty changed
  if (products.productInfo[row.id]?.qty) {
    qty = products.productInfo[row.id]?.qty ?? 1;
  }

  // check if disc changed
  if (products.productInfo[row.id]?.disc) {
    disc = products.productInfo[row.id]?.disc ?? 0;
  }

  // check if margin changed
  if (products.productInfo[row.id]?.margin) {
    margin = products.productInfo[row.id]?.margin ?? 0;
  }

  priceUnit = priceUnit - disc;
  priceUnit = priceUnit - margin;
  var price1 = calculatePercentage(priceUnit, Dp1);
  var price2 = calculatePercentage(price1, Dp2);
  var price3 = calculatePercentage(price2, Dp3);

  // set product price after disc & sub total
  productTotalPrice[row.id] = price3;
  productSubTotal[row.id] = price3 * qty;

  // set all product total
  var total = 0;
  for (var key in productSubTotal) {
    total = total + productSubTotal[key];
  }
  setTotalPrice(total);
  return productTotalPrice[row.id];
}

const calculatePercentage = (value, percent) => {
  var newValue = value - (value * percent) / 100;
  return newValue;
};
