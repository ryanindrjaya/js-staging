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

  changeProductDisc: (disc, product) => ({
    type: "CHANGE_PRODUCT_DISC",
    disc,
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
};
