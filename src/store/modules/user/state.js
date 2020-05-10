import { INITIAL_ACTION_STATE } from "../../../helper/constants";

export default {
  current: null,
  physicalMetrics: [],
  actions: {
    fetchAuthUser: { ...INITIAL_ACTION_STATE },
    fetchUserProfile: { status: "", error: "", data: {} },
    updateUserProfile: { ...INITIAL_ACTION_STATE },
    updatePassword: { status: "", error: "" },
    fetchPhysicalMetrics: { status: "", error: "" },
    addPhysicalMetrics: { status: "", error: "" },
  },
};
