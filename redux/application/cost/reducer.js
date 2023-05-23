const initState = {
  list: [],
  info: {},
  preData: {},
  akun: [],
};

export default function Reducer(state = initState, action) {
  switch (action.type) {
    case "ADD_AKUN_COA":
      state.akun.push(action.akun);
      return {
        ...state,
        akun: [...state.akun],
      };

    case "REMOVE_AKUN":
      state.akun.splice(action.index, 1);
      let infoData = state.akun;
      delete infoData[action.index];
      return {
        ...state,
        akun: [...state.akun],
      };

    case "ADD_LIST":
      state.list.push(action.list);
      return {
        ...state,
        list: [...state.list],
      };

    case "REMOVE_LIST":
      state.list.splice(action.index, 1);
      let infoCopy = state.info;
      delete infoCopy[action.index];
      return {
        ...state,
        list: [...state.list],
        info: infoCopy,
      };

    case "CHANGE_ID":
    var dataId = action.id;
    var id = action.index;
    //var data = action.listData.attributes;

      return {
        ...state,
        info: {
          ...state.info,
          [id]: {
            ...state.info[id],
            id: dataId,
          },
        },
      };

    case "CHANGE_TOTAL_HUTANG_JATUH_TEMPO":
    var totalHutangJatuhTempo = action.totalHutangJatuhTempo;
    var id = action.index;
    //var data = action.listData.attributes;

      return {
        ...state,
        info: {
          ...state.info,
          [id]: {
            ...state.info[id],
            totalHutangJatuhTempo: totalHutangJatuhTempo,
          },
        },
      };

    case "CHANGE_DATA_SISAHUTANG":
    var sisahutang = action.sisahutang;
    var id = action.index;
    //var data = action.listData.attributes;

      return {
        ...state,
        info: {
          ...state.info,
          [id]: {
            ...state.info[id],
            sisahutang: sisahutang,
          },
        },
      };

    case "CHANGE_PILIH_DATA":
    var pilihdata = action.pilihData;
    var id = action.index;
    //var data = action.listData.attributes;

      return {
        ...state,
        info: {
          ...state.info,
          [id]: {
            ...state.info[id],
            pilihData: pilihdata,
          },
        },
      };

    case "CHANGE_DATA_TUNAI":
    var tunai = action.tunai;
    var id = action.index;
    //var data = action.listData.attributes;

      return {
        ...state,
        info: {
          ...state.info,
          [id]: {
            ...state.info[id],
            tunai: tunai,
          },
        },
      };

    case "CHANGE_DATA_TRANSFER":
    var transfer = action.transfer;
    var id = action.index;
    //var data = action.listData.attributes;

      return {
        ...state,
        info: {
          ...state.info,
          [id]: {
            ...state.info[id],
            transfer: transfer,
          },
        },
      };

    case "CHANGE_DATA_GIRO":
    var giro = action.giro;
    var id = action.index;
    //var data = action.listData.attributes;

      return {
        ...state,
        info: {
          ...state.info,
          [id]: {
            ...state.info[id],
            giro: giro,
          },
        },
      };

    case "CHANGE_DATA_CN":
    var cn = action.cn;
    var id = action.index;
    //var data = action.listData.attributes;

      return {
        ...state,
        info: {
          ...state.info,
          [id]: {
            ...state.info[id],
            cn: cn,
          },
        },
      };

    case "CHANGE_DATA_OTH":
    var oth = action.oth;
    var id = action.index;
    //var data = action.listData.attributes;

      return {
        ...state,
        info: {
          ...state.info,
          [id]: {
            ...state.info[id],
            oth: oth,
          },
        },
      };

    case "SET_PREORDER_DATA":
      return {
        ...state,
        preData: {
          data: action.data,
        },
      };

    case "CLEAR_DATA":
      state = { akun: [], list: [], info: {}, preData: {} };
      return state;

    default:
      return state;
  }
}
