import axios from "axios";

export const authStart = () => {
  return {
    type: "AUTH_START"
  };
};

export const authSuccess = authData => {
  return { type: "AUTH_SUCCESS", authData };
};

export const authFail = error => {
  return { type: "AUTH_FAIL", error };
};

export const authLogin = payload => {
  return { type: "AUTH_LOGIN", payload };
};

export const auth = (email, password) => {
  console.log("ACTIONS_AUTH...", email, password);
  return dispatch => {
    console.log("dispatch", dispatch);
    // dispatch(authStart());
    // dispatch(authSuccess({ id: 1, name: "kev" }));
    axios.get("https://jsonplaceholder.typicode.com/users/1").then(results => {
      console.log("results", results);
      dispatch(authLogin(results.data.name));
    });
    // .catch(e => {
    //   dispatch(authFail(e));
    // });
  };
  // return { type: "AUTH_LOGIN", payload: email };
};
