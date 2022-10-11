import React from "react";

export default function calculatePrice(
  row,
  products,
  productTotalPrice,
  productSubTotal,
  setTotalPrice
) {
  var priceUnit = row.attributes[`buy_price_1`];
  var qty = 1;
  var disc = 0;

  const defaultDp1 = row.attributes?.unit_1_dp1;
  const defaultDp2 = row.attributes?.unit_1_dp2;
  const defaultDp3 = row.attributes?.unit_1_dp3;

  // check if price changed
  if (products.productInfo[row.id]?.priceUnit) {
    priceUnit =
      products.productInfo[row.id].priceUnit ?? row.attributes[`buy_price_1`];
  }

  // check if qty changed
  if (products.productInfo[row.id]?.qty) {
    qty = products.productInfo[row.id]?.qty ?? 1;
  }

  // check if disc changed
  if (products.productInfo[row.id]?.disc) {
    disc = products.productInfo[row.id]?.disc ?? 0;
  }

  priceUnit = priceUnit - disc;
  var price1 = calculatePercentage(priceUnit, defaultDp1);
  var price2 = calculatePercentage(price1, defaultDp2);
  var price3 = calculatePercentage(price2, defaultDp3);

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
