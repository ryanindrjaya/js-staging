const initState = {
  list: [],
  info: {},
  preData: {},
  supplier: [],
  searchParameters: {},
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

    case "SET_PREORDER_DATA":
      return {
        ...state,
        preData: {
          data: action.data,
        },
      };

    case "ADD_SUPPLIER":
      state.supplier.push(action.supplier);
      return {
        ...state,
        supplier: [...state.supplier],
      };

    case "ADD_PARAMETER":
      let searchParameters = state.searchParameters;
      return {
        ...state,
        searchParameters: {
          ...searchParameters,
          [0]: {
            supplier: action.supplier,
            range: action.range,
            debt: action.debt
          },
        },
      };

    case "CLEAR_DATA":
      state = { list: [], info: {}, preData: {}, supplier: [], searchParameters: {}};
      return state;

    default:
      return state;
  }
}
