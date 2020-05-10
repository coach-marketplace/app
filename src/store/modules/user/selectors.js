export const getAuthUser = (store) => {
  return {
    status: store.user.actions.fetchAuthUser,
    data: store.user.current
  }
}

export const getProfileInfos = (store) => {
  return {
    updateUserProfile: {
      status: store.user.actions.updateUserProfile,
    },
    getAuthUser: {
      status: store.user.actions.fetchAuthUser,
    },
    data: store.user.current
  }
};

export const getChangePasswordInfos = (store) => {
  return store.user.actions.updatePassword;
};

export const getBodyInfos = (store) => {
  return store.user.actions.fetchPhysicalMetrics;
};
