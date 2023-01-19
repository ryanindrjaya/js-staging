const actions = {
  ADD_PRODUCT: "ADD_PRODUCT",
  REMOVE_PRODUCT: "REMOVE_PRODUCT",

  addProduct: (product) => ({
    type: actions.ADD_PRODUCT,
    product,
  }),

  removeProduct: (index) => ({
    type: "REMOVE_PRODUCT",
    index,
  }),

  changeProductUnit: (index, product, unit) => ({
    type: "CHANGE_PRODUCT_UNIT",
    unit,
    product,
    index,
  }),

  changeProductQty: (qty, product, index) => ({
    type: "CHANGE_PRODUCT_QTY",
    qty,
    product,
    index,
  }),

  changeProductD1: (d1, product, index) => ({
    type: "CHANGE_PRODUCT_D1",
    d1,
    product,
    index,
  }),

  changeProductD2: (d2, product, index) => ({
    type: "CHANGE_PRODUCT_D2",
    d2,
    product,
    index,
  }),

  changeProductD3: (d3, product, index) => ({
    type: "CHANGE_PRODUCT_D3",
    d3,
    product,
    index,
  }),

  changeProductDisc: (disc, product, index) => ({
    type: "CHANGE_PRODUCT_DISC",
    disc,
    product,
    index,
  }),

  changeProductMargin: (margin, product, index) => ({
    type: "CHANGE_PRODUCT_MARGIN",
    margin,
    product,
    index,
  }),

  changeProductPrice: (unit_price, product, index) => ({
    type: "CHANGE_PRODUCT_PRICE",
    unit_price,
    product,
    index,
  }),

  setPriceAfterDisc: (price, product) => ({
    type: "SET_PRICE_AFTER_DISC",
    price,
    product,
    index,
  }),

  setPriceAfterDisc: (subTotal, product, index) => ({
    type: "SET_SUBTOTAL",
    subTotal,
    product,
    index,
  }),

  setInitialProduct: (product) => ({
    type: "SET_INITIAL_PRODUCT",
    product,
    qty,
    unit,
    unitIndex,
    priceUnit,
    disc,
    priceAfterDisc,
    subTotal,
    index,
  }),

  setSaleInitialProduct: (product, index) => ({
    type: "SET_SALE_INITIAL_PRODUCT",
    product,
    qty,
    unit,
    unitIndex,
    priceUnit,
    disc,
    margin,
    priceAfterDisc,
    subTotal,
    index,
  }),

  setPreOrderData: (data) => ({
    type: "SET_PREORDER_DATA",
    data,
  }),

  clearValue: () => ({
    type: "CLEAR_DATA",
  }),
};
