export const getProfileInfos = (store) => {
  return store.user.actions.fetchUserProfile;
};

export const getChangePasswordInfos = (store) => {
  return store.user.actions.updatePassword;
};

export const getBodyInfos = (store) => {
  return store.user.actions.fetchPhysicalMetrics;
};
