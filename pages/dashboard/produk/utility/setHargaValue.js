export default function setHargaValue(form, changedValues, allValues, fieldName, firstInput) {
  if (fieldName === "qty_2" && firstInput) {
    const hargaPembelian_unit1 = changedValues.buy_price_1 || allValues.buy_price_1 || 0;
    const qty_unit2 = changedValues.qty_2 || changedValues.qty_2 || 0;
    const hargaDiskon_unit1 = changedValues.purchase_discount_1 || allValues.purchase_discount_1 || null;
    const hargaJual_unit1 = changedValues.sold_price_1 || allValues.sold_price_1 || 0;
    const hargaPricelist_unit1 = changedValues.pricelist_1 || allValues.pricelist_1 || 0;

    const hargaPembelian_unit2 = hargaPembelian_unit1 / qty_unit2;
    const diskonPembelian_unit2 = hargaDiskon_unit1 / qty_unit2;
    const hargaJual_unit2 = hargaJual_unit1 / qty_unit2;
    const hargaPricelist_unit2 = hargaPricelist_unit1 / qty_unit2;

    form.setFieldsValue({
      buy_price_2: changedValues.qty_2 !== null ? Math.round(hargaPembelian_unit2) : null,
      purchase_discount_2: changedValues.qty_2 !== null ? Math.round(diskonPembelian_unit2) : null,
      sold_price_2: changedValues.qty_2 !== null ? Math.round(hargaJual_unit2) : null,
      pricelist_2: changedValues.qty_2 !== null ? hargaPricelist_unit2 : null,
    });
  } else if (fieldName === "qty_3" && firstInput) {
    const hargaPembelian_unit2 = changedValues.buy_price_2 || allValues.buy_price_2 || 0;
    const qty_unit3 = changedValues.qty_3 || changedValues.qty_3 || 0;
    const hargaDiskon_unit2 = changedValues.purchase_discount_2 || allValues.purchase_discount_2 || null;
    const hargaJual_unit2 = changedValues.sold_price_2 || allValues.sold_price_2 || 0;
    const hargaPricelist_unit2 = changedValues.pricelist_2 || allValues.pricelist_2 || 0;

    const hargaPembelian_unit3 = hargaPembelian_unit2 / qty_unit3;
    const diskonPembelian_unit3 = hargaDiskon_unit2 / qty_unit3;
    const hargaJual_unit3 = hargaJual_unit2 / qty_unit3;
    const hargaPricelist_unit3 = hargaPricelist_unit2 / qty_unit3;

    form.setFieldsValue({
      buy_price_3: changedValues.qty_3 !== null ? Math.round(hargaPembelian_unit3) : null,
      purchase_discount_3: changedValues.qty_3 !== null ? Math.round(diskonPembelian_unit3) : null,
      sold_price_3: changedValues.qty_3 !== null ? Math.round(hargaJual_unit3) : null,
      pricelist_3: changedValues.qty_3 !== null ? hargaPricelist_unit3 : null,
    });
  } else if (fieldName === "qty_4" && firstInput) {
    const hargaPembelian_unit3 = changedValues.buy_price_3 || allValues.buy_price_3 || 0;
    const qty_unit4 = changedValues.qty_4 || changedValues.qty_4 || 0;
    const hargaDiskon_unit3 = changedValues.purchase_discount_3 || allValues.purchase_discount_3 || null;
    const hargaJual_unit3 = changedValues.sold_price_3 || allValues.sold_price_3 || 0;
    const hargaPricelist_unit3 = changedValues.pricelist_3 || allValues.pricelist_3 || 0;

    const hargaPembelian_unit4 = hargaPembelian_unit3 / qty_unit4;
    const diskonPembelian_unit4 = hargaDiskon_unit3 / qty_unit4;
    const hargaJual_unit4 = hargaJual_unit3 / qty_unit4;
    const hargaPricelist_unit4 = hargaPricelist_unit3 / qty_unit4;

    form.setFieldsValue({
      buy_price_4: changedValues.qty_4 !== null ? Math.round(hargaPembelian_unit4) : null,
      purchase_discount_4: changedValues.qty_4 !== null ? Math.round(diskonPembelian_unit4) : null,
      sold_price_4: changedValues.qty_4 !== null ? hargaJual_unit4 : null,
      pricelist_4: changedValues.qty_4 !== null ? hargaPricelist_unit4 : null,
    });
  } else if (fieldName === "qty_5" && firstInput) {
    const hargaPembelian_unit4 = changedValues.buy_price_4 || allValues.buy_price_4 || 0;
    const qty_unit5 = changedValues.qty_5 || changedValues.qty_5 || 0;
    const hargaDiskon_unit4 = changedValues.purchase_discount_4 || allValues.purchase_discount_4 || null;
    const hargaJual_unit4 = changedValues.sold_price_4 || allValues.sold_price_4 || 0;
    const hargaPricelist_unit4 = changedValues.pricelist_4 || allValues.pricelist_4 || 0;

    const hargaPembelian_unit5 = hargaPembelian_unit4 / qty_unit5;
    const diskonPembelian_unit5 = hargaDiskon_unit4 / qty_unit5;
    const hargaJual_unit5 = hargaJual_unit4 / qty_unit5;
    const hargaPricelist_unit5 = hargaPricelist_unit4 / qty_unit5;

    form.setFieldsValue({
      buy_price_5: changedValues.qty_5 !== null ? Math.round(hargaPembelian_unit5) : null,
      purchase_discount_5: changedValues.qty_5 !== null ? Math.round(diskonPembelian_unit5) : null,
      sold_price_5: changedValues.qty_5 !== null ? Math.round(hargaJual_unit5) : null,
      pricelist_5: changedValues.qty_5 !== null ? hargaPricelist_unit5 : null,
    });
  }
}
