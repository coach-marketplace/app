import { INITIAL_ACTION_STATE_NEW } from "../../../helper/constants";

export default {
  current: null,
  physicalMetrics: [],
  actions: {
    addPhysicalMetrics: { ...INITIAL_ACTION_STATE_NEW },
    fetchAuthUser: { ...INITIAL_ACTION_STATE_NEW },
    fetchPhysicalMetrics: { ...INITIAL_ACTION_STATE_NEW },
    update: { ...INITIAL_ACTION_STATE_NEW },
    updatePassword: { ...INITIAL_ACTION_STATE_NEW },
  },
};
