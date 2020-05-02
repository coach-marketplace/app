import { INITIAL_ACTION_STATE } from "../../../helper/constants";
import { LOGIN_LOADING, ACCOUNT_VALIDATION_LOADING } from "./constants";

export default {
  token: null,
  actions: {
    autoLogin: { ...INITIAL_ACTION_STATE },
    login: { ...INITIAL_ACTION_STATE },
    register: { ...INITIAL_ACTION_STATE },
    accountValidation: {
      state: ACCOUNT_VALIDATION_LOADING,
      error: null,
    }
  },
};
