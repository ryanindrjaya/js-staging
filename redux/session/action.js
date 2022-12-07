const actions = {
  setSession: (message) => ({
    type: "SET_SESSION",
    message,
  }),

  clearSession: () => ({
    type: "CLEAR_SESSION",
  }),
};
