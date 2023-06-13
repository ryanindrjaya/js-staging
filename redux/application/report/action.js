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

  clearValue: () => ({
    type: "CLEAR_DATA",
  }),
};
