// formatter and parser input number
// export const formatterNumber = (val) => {
//   const newValue = Number(val).toFixed(2);

//   if (!val) return 0;

//   return `${newValue}`
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//     .replace(/\.(?=\d{0,2}$)/g, ".");
// };

export const parserNumber = (val) => {
  let newValue = Number.parseFloat(
    val.replace(/\$\s?|(\,*)/g, "").replace(/(\,{1})/g, ".")
  ).toFixed(2);

  let rounded = Number(newValue).toFixed(2);

  if (!val) return 0;
  return rounded;
};

// formatter and parser input number
export const formatterNumber = (val, unit) => {
  if (!val) return 0;

  const newValue = `${val}`
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .replace(/\.(?=\d{0,2}$)/g, ".");

  let test = Number.parseFloat(
    newValue.replace(/\$\s?|(\,*)/g, "").replace(/(\,{1})/g, ".")
  ).toFixed(2);

  let rounded = Number(test).toFixed(2);
  console.log("unit", unit);
  if (
    unit === "buy_price_1" ||
    unit === "purchase_discount_1" ||
    unit === "pricelist_1" ||
    unit === "sold_price_1" ||
    unit === "sold_price_2" ||
    unit === "sold_price_3" ||
    unit === "sold_price_4" ||
    unit === "sold_price_5"
  ) {
    return newValue;
  } else {
    const newRounded = `${rounded}`
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      .replace(/\.(?=\d{0,2}$)/g, ".");

    return newRounded;
  }
};

// export const parserNumber = (val) => {
//   if (!val) return 0;
//   return Number.parseFloat(
//     val.replace(/\$\s?|(\,*)/g, "").replace(/(\,{1})/g, ",")
//   ).toFixed(2);
// };
