const actions = {
  ADD_LIST: "ADD_LIST",
  REMOVE_LIST: "REMOVE_LIST",

  addList: (list) => ({
    type: "ADD_LIST",
    list,
  }),

  removeList: (index) => ({
    type: "REMOVE_LIST",
    index,
  }),

  setPreData: (data) => ({
    type: "SET_PREORDER_DATA",
    data,
  }),

  addSupplier: (supplier) => ({
    type: "ADD_SUPPLIER",
    supplier,
  }),

  addParameter: (supplier, range) => ({
    type: "ADD_PARAMETER",
    supplier,
    range,
    debt
  }),

  clearValue: () => ({
    type: "CLEAR_DATA",
  }),
};
