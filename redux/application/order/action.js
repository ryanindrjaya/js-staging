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

  changeProductUnit: (index, product) => ({
    type: "CHANGE_PRODUCT_UNIT",
    index,
    product,
  }),

  changeProductQty: (qty, product) => ({
    type: "CHANGE_PRODUCT_QTY",
    qty,
    product,
  }),

  changeProductD1: (d1, product) => ({
    type: "CHANGE_PRODUCT_D1",
    d1,
    product,
  }),

  changeProductD2: (d2, product) => ({
    type: "CHANGE_PRODUCT_D2",
    d2,
    product,
  }),

  changeProductD3: (d3, product) => ({
    type: "CHANGE_PRODUCT_D3",
    d3,
    product,
  }),

  changeProductDisc: (disc, product) => ({
    type: "CHANGE_PRODUCT_DISC",
    disc,
    product,
  }),

  changeProductMargin: (margin, product) => ({
    type: "CHANGE_PRODUCT_MARGIN",
    margin,
    product,
  }),

  setPriceAfterDisc: (price, product) => ({
    type: "SET_PRICE_AFTER_DISC",
    price,
    product,
  }),

  setPriceAfterDisc: (subTotal, product) => ({
    type: "SET_SUBTOTAL",
    subTotal,
    product,
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
  }),

  setPreOrderData: (data) => ({
    type: "SET_PREORDER_DATA",
    data,
  }),

  clearValue: () => ({
    type: "CLEAR_DATA",
  }),
};
