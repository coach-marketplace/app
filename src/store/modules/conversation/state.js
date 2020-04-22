import { INITIAL_ACTION_STATE } from "../../../helper/constants";

export default {
  list: [],
  actions: {
    getAll: { ...INITIAL_ACTION_STATE },
    getOne: { ...INITIAL_ACTION_STATE },
    // create: { ...INITIAL_ACTION_STATE },
  },
};
