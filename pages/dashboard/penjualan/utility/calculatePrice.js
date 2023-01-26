import React from "react";

export default function calculatePrice(row, products, productTotalPrice, productSubTotal, setTotalPrice, index) {
  var priceUnit = row.attributes[`buy_price_1`];
  var qty = 1;
  var disc = 0;
  var margin = 0;

  var Dp1 = row.attributes?.unit_1_dp1;
  var Dp2 = row.attributes?.unit_1_dp2;

  // check if Dp1, Dp2, Dp3 changed
  if (products.productInfo[index]?.d1) {
    Dp1 = products.productInfo[index].d1 ?? 1;
  } else if (products.productInfo[index]?.d1 === 0 || products.productInfo[index]?.d1 === null) {
    Dp1 = 0;
  }

  if (products.productInfo[index]?.d2) {
    Dp2 = products.productInfo[index].d2 ?? 1;
  } else if (products.productInfo[index]?.d2 === 0 || products.productInfo[index]?.d2 === null) {
    Dp2 = 0;
  }

  // check if price changed
  if (products.productInfo[index]?.priceUnit) {
    priceUnit = products.productInfo[index].priceUnit ?? row.attributes[`buy_price_1`];
  }

  // check if qty changed
  if (products.productInfo[index]?.qty) {
    qty = products.productInfo[index]?.qty ?? 1;
  }

  // check if disc changed
  if (products.productInfo[index]?.disc) {
    disc = products.productInfo[index]?.disc ?? 0;
  }

  // check if margin changed
  if (products.productInfo[index]?.margin) {
    margin = products.productInfo[index]?.margin ?? 0;
  }

  priceUnit = priceUnit - disc;
  priceUnit = priceUnit + (priceUnit*margin/100);
  var price1 = calculatePercentage(priceUnit, Dp1);
  var price2 = calculatePercentage(price1, Dp2);

  // set product price after disc & sub total
  productTotalPrice[index] = price2;
  productSubTotal[index] = price2 * qty;

  // set all product total
  var total = 0;
  for (var key in productSubTotal) {
    total = total + productSubTotal[key];
  }
  setTotalPrice(total);
  return productTotalPrice[index];
}

const calculatePercentage = (value, percent) => {
  var newValue = value - (value * percent) / 100;
  return newValue;
};
