// formatter and parser input number
// export const formatterNumber = (val) => {
//   const newValue = Number(val).toFixed(2);

//   if (!val) return 0;

//   return `${newValue}`
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//     .replace(/\.(?=\d{0,2}$)/g, ".");
// };

const locale = "id-ID";

export const formatterNumber = (value) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "IDR",
    // minimumFractionDigits: 2,
  })
    .format(value)
    .replace("Rp", "")
    .trim();
};

export const parserNumber = (val) => {
  try {
    // for when the input gets clears
    if (typeof val === "string" && !val.length) {
      val = "0.0";
    }

    // detecting and parsing between comma and dot
    var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
    var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
    var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
    reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
    //  => 1232.21 €

    // removing everything except the digits and dot
    reversedVal = reversedVal.replace(/[^0-9.]/g, "");
    //  => 1232.21

    // appending digits properly
    const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
    const needsDigitsAppended = digitsAfterDecimalCount > 2;

    if (needsDigitsAppended) {
      reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
    }

    return Number.isNaN(reversedVal) ? 0 : reversedVal;
  } catch (error) {
    console.error(error);
  }
};

// export const parserNumber = (val) => {
//   if (!val) return 0;
//   return Number.parseFloat(
//     val.replace(/\$\s?|(\,*)/g, "").replace(/(\,{1})/g, ",")
//   ).toFixed(2);
// };
