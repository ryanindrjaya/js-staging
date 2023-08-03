const actions = {
  setSession: (message, moduls) => ({
    type: "SET_SESSION",
    message,
    moduls,
  }),

  clearSession: () => ({
    type: "CLEAR_SESSION",
  }),
};
