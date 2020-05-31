import { INITIAL_ACTION_STATE_NEW } from "../../../helper/constants";

export default {
  current: null,
  physicalMetrics: [],
  actions: {
    fetchAuthUser: { ...INITIAL_ACTION_STATE_NEW },
    update: { ...INITIAL_ACTION_STATE_NEW },
    changePassword: { ...INITIAL_ACTION_STATE_NEW },
    fetchPhysicalMetrics: { ...INITIAL_ACTION_STATE_NEW },
    addPhysicalMetrics: { ...INITIAL_ACTION_STATE_NEW },
  },
};
