export default function setHargaValue(
  form,
  changedValues,
  allValues,
  unit,
  firstInput
) {
  // =====================================================================
  //                             UNIT 1
  // =====================================================================

  if (unit == "1") {
    const hargaPembelian_unit1 =
      changedValues.buy_price_1 || allValues.buy_price_1 || null;
    const hargaDiskon_unit1 =
      changedValues.purchase_discount_1 ||
      allValues.purchase_discount_1 ||
      null;
    const hargaJual_unit1 =
      changedValues.sold_price_1 || allValues.sold_price_1 || null;
    const hargaPricelist_unit1 =
      changedValues.pricelist_1 || allValues.pricelist_1 || null;

    const qty_unit2 = changedValues.qty_2 || allValues.qty_2 || null;
    const qty_unit3 = changedValues.qty_3 || allValues.qty_3 || null;
    const qty_unit4 = changedValues.qty_4 || allValues.qty_4 || null;
    const qty_unit5 = changedValues.qty_5 || allValues.qty_5 || null;

    const hargaPembelian_unit2 = parseFloatFormat(
      hargaPembelian_unit1,
      qty_unit2
    );
    const diskonPembelian_unit2 = parseFloatFormat(
      hargaDiskon_unit1,
      qty_unit2
    );
    const hargaPricelist_unit2 = parseFloatFormat(
      hargaPricelist_unit1,
      qty_unit2
    );
    const hargaJual_unit2 = parseFloatFormat(hargaJual_unit1, qty_unit2);

    const hargaPembelian_unit3 = parseFloatFormat(
      hargaPembelian_unit2,
      qty_unit3
    );
    const diskonPembelian_unit3 = parseFloatFormat(
      diskonPembelian_unit2,
      qty_unit3
    );
    const hargaPricelist_unit3 = parseFloatFormat(
      hargaPricelist_unit2,
      qty_unit3
    );
    const hargaJual_unit3 = parseFloatFormat(hargaJual_unit2, qty_unit3);

    const hargaPembelian_unit4 = parseFloatFormat(
      hargaPembelian_unit3,
      qty_unit4
    );
    const diskonPembelian_unit4 = parseFloatFormat(
      diskonPembelian_unit3,
      qty_unit4
    );
    const hargaPricelist_unit4 = parseFloatFormat(
      hargaPricelist_unit3,
      qty_unit4
    );
    const hargaJual_unit4 = parseFloatFormat(hargaJual_unit3, qty_unit4);

    const hargaPembelian_unit5 = parseFloatFormat(
      hargaPembelian_unit4,
      qty_unit5
    );
    const diskonPembelian_unit5 = parseFloatFormat(
      diskonPembelian_unit4,
      qty_unit5
    );
    const hargaPricelist_unit5 = parseFloatFormat(
      hargaPricelist_unit4,
      qty_unit5
    );
    const hargaJual_unit5 = parseFloatFormat(hargaJual_unit4, qty_unit5);

    form.setFieldsValue({
      buy_price_1: changedValues.qty_1 !== null ? hargaPembelian_unit1 : null,
      purchase_discount_1:
        changedValues.qty_1 !== null ? hargaDiskon_unit1 : null,
      sold_price_1: changedValues.qty_1 !== null ? hargaJual_unit1 : null,
      pricelist_1: changedValues.qty_1 !== null ? hargaPricelist_unit1 : null,
    });

    if (qty_unit2) {
      form.setFieldsValue({
        buy_price_2: hargaPembelian_unit2,
        purchase_discount_2: diskonPembelian_unit2,
        sold_price_2: hargaJual_unit2,
        pricelist_2: hargaPricelist_unit2,
      });
    }

    if (qty_unit3) {
      form.setFieldsValue({
        buy_price_3: hargaPembelian_unit3,
        purchase_discount_3: diskonPembelian_unit3,
        sold_price_3: hargaJual_unit3,
        pricelist_3: hargaPricelist_unit3,
      });
    }

    if (qty_unit4) {
      form.setFieldsValue({
        buy_price_4: hargaPembelian_unit4,
        purchase_discount_4: diskonPembelian_unit4,
        sold_price_4: hargaJual_unit4,
        pricelist_4: hargaPricelist_unit4,
      });
    }

    if (qty_unit5) {
      form.setFieldsValue({
        buy_price_5: hargaPembelian_unit5,
        purchase_discount_5: diskonPembelian_unit5,
        sold_price_5: hargaJual_unit5,
        pricelist_5: hargaPricelist_unit5,
      });
    }
  }

  // =====================================================================
  //                             UNIT 2
  // =====================================================================

  if (unit == "2") {
    const hargaPembelian_unit1 =
      changedValues.buy_price_1 || allValues.buy_price_1 || null;
    const qty_unit2 = changedValues.qty_2 || allValues.qty_2 || null;
    const hargaDiskon_unit1 =
      changedValues.purchase_discount_1 ||
      allValues.purchase_discount_1 ||
      null;
    const hargaJual_unit1 =
      changedValues.sold_price_1 || allValues.sold_price_1 || null;
    const hargaPricelist_unit1 =
      changedValues.pricelist_1 || allValues.pricelist_1 || null;

    const qty_unit3 = changedValues.qty_3 || allValues.qty_3 || null;
    const qty_unit4 = changedValues.qty_4 || allValues.qty_4 || null;
    const qty_unit5 = changedValues.qty_5 || allValues.qty_5 || null;

    const hargaPembelian_unit2 =
      changedValues.buy_price_2 ??
      parseFloatFormat(hargaPembelian_unit1, qty_unit2);

    const diskonPembelian_unit2 =
      changedValues.purchase_discount_2 ??
      parseFloatFormat(hargaDiskon_unit1, qty_unit2);

    const hargaPricelist_unit2 =
      changedValues.pricelist_2 ??
      parseFloatFormat(hargaPricelist_unit1, qty_unit2);

    const hargaJual_unit2 =
      changedValues.sold_price_2 ??
      parseFloatFormat(hargaJual_unit1, qty_unit2);

    const hargaPembelian_unit3 = parseFloatFormat(
      hargaPembelian_unit2,
      qty_unit3
    );
    const diskonPembelian_unit3 = parseFloatFormat(
      diskonPembelian_unit2,
      qty_unit3
    );
    const hargaPricelist_unit3 = parseFloatFormat(
      hargaPricelist_unit2,
      qty_unit3
    );
    const hargaJual_unit3 = parseFloatFormat(hargaJual_unit2, qty_unit3);

    const hargaPembelian_unit4 = parseFloatFormat(
      hargaPembelian_unit3,
      qty_unit4
    );
    const diskonPembelian_unit4 = parseFloatFormat(
      diskonPembelian_unit3,
      qty_unit4
    );
    const hargaPricelist_unit4 = parseFloatFormat(
      hargaPricelist_unit3,
      qty_unit4
    );
    const hargaJual_unit4 = parseFloatFormat(hargaJual_unit3, qty_unit4);

    const hargaPembelian_unit5 = parseFloatFormat(
      hargaPembelian_unit4,
      qty_unit5
    );
    const diskonPembelian_unit5 = parseFloatFormat(
      diskonPembelian_unit4,
      qty_unit5
    );
    const hargaPricelist_unit5 = parseFloatFormat(
      hargaPricelist_unit4,
      qty_unit5
    );
    const hargaJual_unit5 = parseFloatFormat(hargaJual_unit4, qty_unit5);

    if (qty_unit2) {
      form.setFieldsValue({
        buy_price_2: hargaPembelian_unit2,
        purchase_discount_2: diskonPembelian_unit2,
        sold_price_2: hargaJual_unit2,
        pricelist_2: hargaPricelist_unit2,
      });
    }

    if (qty_unit3) {
      form.setFieldsValue({
        buy_price_3: hargaPembelian_unit3,
        purchase_discount_3: diskonPembelian_unit3,
        sold_price_3: hargaJual_unit3,
        pricelist_3: hargaPricelist_unit3,
      });
    }

    if (qty_unit4) {
      form.setFieldsValue({
        buy_price_4: hargaPembelian_unit4,
        purchase_discount_4: diskonPembelian_unit4,
        sold_price_4: hargaJual_unit4,
        pricelist_4: hargaPricelist_unit4,
      });
    }

    if (qty_unit5) {
      form.setFieldsValue({
        buy_price_5: hargaPembelian_unit5,
        purchase_discount_5: diskonPembelian_unit5,
        sold_price_5: hargaJual_unit5,
        pricelist_5: hargaPricelist_unit5,
      });
    }
  } else if (unit === "3" && firstInput) {
    // =====================================================================
    //                             UNIT 3
    // =====================================================================

    const hargaPembelian_unit2 =
      changedValues.buy_price_2 || allValues.buy_price_2 || null;
    const qty_unit3 = changedValues.qty_3 || allValues.qty_3 || null;
    const hargaDiskon_unit2 =
      changedValues.purchase_discount_2 ||
      allValues.purchase_discount_2 ||
      null;
    const hargaJual_unit2 =
      changedValues.sold_price_2 || allValues.sold_price_2 || null;
    const hargaPricelist_unit2 =
      changedValues.pricelist_2 || allValues.pricelist_2 || null;

    const qty_unit4 = changedValues.qty_4 || allValues.qty_4 || null;
    const qty_unit5 = changedValues.qty_5 || allValues.qty_5 || null;

    const hargaPembelian_unit3 =
      changedValues.buy_price_3 ??
      parseFloatFormat(hargaPembelian_unit2, qty_unit3);

    const diskonPembelian_unit3 =
      changedValues.purchase_discount_3 ??
      parseFloatFormat(hargaDiskon_unit2, qty_unit3);

    const hargaPricelist_unit3 =
      changedValues.pricelist_3 ??
      parseFloatFormat(hargaPricelist_unit2, qty_unit3);

    const hargaJual_unit3 =
      changedValues.sold_price_3 ??
      parseFloatFormat(hargaJual_unit2, qty_unit3);

    const hargaPembelian_unit4 = parseFloatFormat(
      hargaPembelian_unit3,
      qty_unit4
    );
    const diskonPembelian_unit4 = parseFloatFormat(
      diskonPembelian_unit3,
      qty_unit4
    );
    const hargaPricelist_unit4 = parseFloatFormat(
      hargaPricelist_unit3,
      qty_unit4
    );
    const hargaJual_unit4 = parseFloatFormat(hargaJual_unit3, qty_unit4);

    const hargaPembelian_unit5 = parseFloatFormat(
      hargaPembelian_unit4,
      qty_unit5
    );
    const diskonPembelian_unit5 = parseFloatFormat(
      diskonPembelian_unit4,
      qty_unit5
    );
    const hargaPricelist_unit5 = parseFloatFormat(
      hargaPricelist_unit4,
      qty_unit5
    );
    const hargaJual_unit5 = parseFloatFormat(hargaJual_unit4, qty_unit5);

    if (qty_unit3) {
      form.setFieldsValue({
        buy_price_3: hargaPembelian_unit3,
        purchase_discount_3: diskonPembelian_unit3,
        sold_price_3: hargaJual_unit3,
        pricelist_3: hargaPricelist_unit3,
      });
    }
    if (qty_unit4) {
      console.log("ubah unit 4", hargaPembelian_unit4);
      form.setFieldsValue({
        buy_price_4: hargaPembelian_unit4,
        purchase_discount_4: diskonPembelian_unit4,
        sold_price_4: hargaJual_unit4,
        pricelist_4: hargaPricelist_unit4,
      });
    }

    if (qty_unit5) {
      form.setFieldsValue({
        buy_price_5: hargaPembelian_unit5,
        purchase_discount_5: diskonPembelian_unit5,
        sold_price_5: hargaJual_unit5,
        pricelist_5: hargaPricelist_unit5,
      });
    }
  } else if (unit === "4" && firstInput) {
    // =====================================================================
    //                             UNIT 4
    // =====================================================================

    const hargaPembelian_unit3 =
      changedValues.buy_price_3 || allValues.buy_price_3 || null;
    const qty_unit4 = changedValues.qty_4 || allValues.qty_4 || null;
    const hargaDiskon_unit3 =
      changedValues.purchase_discount_3 ||
      allValues.purchase_discount_3 ||
      null;
    const hargaJual_unit3 =
      changedValues.sold_price_3 || allValues.sold_price_3 || null;
    const hargaPricelist_unit3 =
      changedValues.pricelist_3 || allValues.pricelist_3 || null;

    const qty_unit5 = changedValues.qty_5 || allValues.qty_5 || null;

    const hargaPembelian_unit4 =
      changedValues.buy_price_4 ??
      parseFloatFormat(hargaPembelian_unit3, qty_unit4);

    const diskonPembelian_unit4 =
      changedValues.purchase_discount_4 ??
      parseFloatFormat(hargaDiskon_unit3, qty_unit4);

    const hargaPricelist_unit4 =
      changedValues.pricelist_4 ??
      parseFloatFormat(hargaPricelist_unit3, qty_unit4);

    const hargaJual_unit4 =
      changedValues.sold_price_4 ??
      parseFloatFormat(hargaJual_unit3, qty_unit4);

    const hargaPembelian_unit5 = parseFloatFormat(
      hargaPembelian_unit4,
      qty_unit5
    );
    const diskonPembelian_unit5 = parseFloatFormat(
      diskonPembelian_unit4,
      qty_unit5
    );
    const hargaPricelist_unit5 = parseFloatFormat(
      hargaPricelist_unit4,
      qty_unit5
    );
    const hargaJual_unit5 = parseFloatFormat(hargaJual_unit4, qty_unit5);

    if (qty_unit4) {
      form.setFieldsValue({
        buy_price_4: hargaPembelian_unit4,
        purchase_discount_4: diskonPembelian_unit4,
        sold_price_4: hargaJual_unit4,
        pricelist_4: hargaPricelist_unit4,
      });
    }

    if (qty_unit5) {
      form.setFieldsValue({
        buy_price_5: hargaPembelian_unit5,
        purchase_discount_5: diskonPembelian_unit5,
        sold_price_5: hargaJual_unit5,
        pricelist_5: hargaPricelist_unit5,
      });
    }
  } else if (unit === "5" && firstInput) {
    // =====================================================================
    //                             UNIT 5
    // =====================================================================
    const hargaPembelian_unit4 =
      changedValues.buy_price_4 || allValues.buy_price_4 || null;
    const qty_unit5 = changedValues.qty_5 || allValues.qty_5 || null;
    const hargaDiskon_unit4 =
      changedValues.purchase_discount_4 ||
      allValues.purchase_discount_4 ||
      null;
    const hargaJual_unit4 =
      changedValues.sold_price_4 || allValues.sold_price_4 || null;
    const hargaPricelist_unit4 =
      changedValues.pricelist_4 || allValues.pricelist_4 || null;

    const hargaPembelian_unit5 = parseFloatFormat(
      hargaPembelian_unit4,
      qty_unit5
    );
    const diskonPembelian_unit5 = parseFloatFormat(
      hargaDiskon_unit4,
      qty_unit5
    );
    const hargaPricelist_unit5 = parseFloatFormat(
      hargaPricelist_unit4,
      qty_unit5
    );
    const hargaJual_unit5 = parseFloatFormat(hargaJual_unit4, qty_unit5);

    if (qty_unit5) {
      form.setFieldsValue({
        buy_price_5: changedValues.buy_price_5 ?? hargaPembelian_unit5,
        purchase_discount_5:
          changedValues.purchase_discount_5 ?? diskonPembelian_unit5,
        sold_price_5: changedValues.sold_price_5 ?? hargaJual_unit5,
        pricelist_5: changedValues.pricelist_5 ?? hargaPricelist_unit5,
      });
    }
  }
}

const parseFloatFormat = (value1, value2) => {
  var newValue = Number.parseFloat(value1 / value2).toFixed(2);
  return newValue;
};

export function setHargaNew(form, name, value) {
  form.setFieldsValue({
    [name]: 3000,
  });
  console.log("ubah unit");
  console.log(name, value);
}
