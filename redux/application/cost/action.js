const actions = {
  ADD_PRODUCT: "ADD_LIST",
  REMOVE_PRODUCT: "REMOVE_LIST",

  addList: (list) => ({
    type: "ADD_LIST",
    list,
  }),

  removeList: (index) => ({
    type: "REMOVE_LIST",
    index,
  }),

  changeId: (id, listData, index) => ({
    type: "CHANGE_ID",
    id,
    listData,
    index,
  }),

  changeTotalHutangJatuhTempo: (totalHutangJatuhTempo, listData, index) => ({
    type: "CHANGE_TOTAL_HUTANG_JATUH_TEMPO",
    totalHutangJatuhTempo,
    listData,
    index,
  }),

  changeSisahutang: (sisahutang, listData, index) => ({
    type: "CHANGE_DATA_SISAHUTANG",
    sisahutang,
    listData,
    index,
  }),

  changePilih: (pilihData, listData, index) => ({
    type: "CHANGE_PILIH_DATA",
    pilihData,
    listData,
    index,
  }),

  changeTunai: (tunai, listData, index) => ({
    type: "CHANGE_DATA_TUNAI",
    tunai,
    listData,
    index,
  }),

  changeTransfer: (transfer, listData, index) => ({
    type: "CHANGE_DATA_TRANSFER",
    transfer,
    listData,
    index,
  }),

  changeGiro: (giro, listData, index) => ({
    type: "CHANGE_DATA_GIRO",
    giro,
    listData,
    index,
  }),

  changeCn: (cn, listData, index) => ({
    type: "CHANGE_DATA_CN",
    cn,
    listData,
    index,
  }),

  changeOth: (oth, listData, index) => ({
    type: "CHANGE_DATA_OTH",
    oth,
    listData,
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
