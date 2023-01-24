const initState = {
  list: [],
  info: {},
  preData: {},
};

export default function Reducer(state = initState, action) {
  switch (action.type) {
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

    case "CHANGE_DATA_SUBTOTAL":
    var subtotal = action.subtotal;
    var id = action.index;
    //var data = action.listData.attributes;

      return {
        ...state,
        info: {
          ...state.info,
          [id]: {
            ...state.info[id],
            subtotal: subtotal,
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
      state = { list: [], info: {}, preData: {} };
      return state;

    default:
      return state;
  }
}
