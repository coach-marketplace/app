import { INITIAL_ACTION_STATE } from "../../../helper/constants";

export default {
  current: null,
  physicalMetrics: [],
  actions: {
    fetchAuthUser: { ...INITIAL_ACTION_STATE },
    fetchUserProfile: { status: "", error: "" },
    updateUserProfile: { status: "", error: "" },
    updatePassword: { status: "", error: "" },
    fetchPhysicalMetrics: { status: "", error: "" },
    addPhysicalMetrics: { status: "", error: "" },
  },
};
