import React from "react";

export default function calculatePrice(
  row,
  products,
  productTotalPrice,
  productSubTotal,
  setTotalPrice,
  index,
  setProductSubTotal
) {
  var priceUnit = row.attributes[`buy_price_1`];
  var qty = 1;

  var Dp1 = row.attributes?.unit_1_dp1;
  var Dp2 = row.attributes?.unit_1_dp2;
  var Dp3 = row.attributes?.unit_1_dp3;
  var disc = getProductDisc(products, index, row.attributes.unit_1);

  // check if Dp1, Dp2, Dp3 changed
  if (products.productInfo[index]?.d1) {
    Dp1 = products.productInfo[index].d1 ?? 1;
  } else if (
    products.productInfo[index]?.d1 === 0 ||
    products.productInfo[index]?.d1 === null
  ) {
    Dp1 = 0;
  }

  if (products.productInfo[index]?.d2) {
    Dp2 = products.productInfo[index].d2 ?? 1;
  } else if (
    products.productInfo[index]?.d2 === 0 ||
    products.productInfo[index]?.d2 === null
  ) {
    Dp2 = 0;
  }

  if (products.productInfo[index]?.d3) {
    Dp3 = products.productInfo[index].d3 ?? 1;
  } else if (
    products.productInfo[index]?.d3 === 0 ||
    products.productInfo[index]?.d3 === null
  ) {
    Dp3 = 0;
  }

  // check if price changed
  if (
    products.productInfo[index]?.unit_price ||
    products.productInfo[index]?.priceUnit
  ) {
    priceUnit =
      products.productInfo[index].unit_price ??
      products.productInfo[index]?.priceUnit;
  }

  // check if qty changed
  if (products.productInfo[index]?.qty) {
    qty = products.productInfo[index]?.qty ?? 1;
  }

  // check if disc changed
  if (products.productInfo[index]?.disc !== undefined) {
    disc =
      products.productInfo[index]?.disc !== undefined
        ? products.productInfo[index]?.disc
        : 0;
  }

  priceUnit = priceUnit - disc;

  var price1 = calculatePercentage(priceUnit, Dp1);
  var price2 = calculatePercentage(price1, Dp2);
  var price3 = calculatePercentage(price2, Dp3);

  // set product price after disc & sub total
  productTotalPrice[index] = price3;
  productSubTotal[index] = price3 * qty;

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

const getProductDisc = (products, index, defaultUnit) => {
  // get purchase discount by selected unit
  var disc = 0;
  if (products?.productList?.length > 0) {
    const units = ["unit_1", "unit_2", "unit_3", "unit_4", "unit_5"];
    const productInfoUnit = products.productInfo[index]?.unit || defaultUnit;

    units.forEach((unit, idx) => {
      if (productInfoUnit === products.productList[index]?.attributes?.[unit]) {
        disc =
          products.productList[index].attributes[
            `purchase_discount_${idx + 1}`
          ];
      }
    });
  }

  return disc;
};
