const initialState = {
  token: null,
  authUser: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  console.log("REEDUCER", action);
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        loading: true
      };
    case "AUTH_LOGIN":
      return {
        ...state,
        authUser: action.payload,
        loading: true
      };
    case "LOGOUT":
      return {
        ...initialState,
        authUser: "logout"
      };
    default:
      return state;
  }
};

export default reducer;
