const initState = {
  sessionMessage: "",
};

export default function Reducer(state = initState, action) {
  switch (action.type) {
    case "SET_SESSION":
      return {
        ...state,
        sessionMessage: action.message,
      };
    case "CLEAR_SESSION":
      return {
        ...state,
        sessionMessage: "",
      };
    default:
      return state;
  }
}
