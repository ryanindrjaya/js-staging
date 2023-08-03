const initState = {
  sessionMessage: "",
  moduls: [],
};

export default function Reducer(state = initState, action) {
  switch (action.type) {
    case "SET_SESSION":
      return {
        ...state,
        sessionMessage: action.message,
        moduls: action.moduls,
      };
    case "CLEAR_SESSION":
      return {
        ...state,
        sessionMessage: "",
        moduls: [],
      };
    default:
      return state;
  }
}
