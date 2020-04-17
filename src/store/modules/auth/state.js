import { INITIAL_ACTION_STATE } from "../../../helper/constants";

export default {
  token: null,
  authUser: null,
  actions: {
    autoLogin: { ...INITIAL_ACTION_STATE },
    login: { ...INITIAL_ACTION_STATE },
    register: { ...INITIAL_ACTION_STATE },
  },
};
