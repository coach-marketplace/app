const initialActionsState = {
  loading: false,
  error: null,
  success: false
};

export default {
  token: null,
  authUser: null,
  actions: {
    auto_login: { ...initialActionsState },
    login: { ...initialActionsState }
  }
};
