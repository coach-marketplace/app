import { INITIAL_ACTION_STATE } from "../../../helper/constants";

export default {
  token: null,
  actions: {
    login: { ...INITIAL_ACTION_STATE },
    register: { ...INITIAL_ACTION_STATE },
  },
};
