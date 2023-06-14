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
