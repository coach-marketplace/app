export const getAuthUser = (store) => {
  return {
    status: store.user.actions.fetchAuthUser,
    data: store.user.current,
  };
};

export const getUserData = (store) => store.user.current;

export const getUpdateUserProfileStatus = (store) =>
  store.user.actions.updateUserProfile;

export const getChangePasswordInfos = (store) => {
  return store.user.actions.updatePassword;
};

export const getBodyInfos = (store) => {
  return store.user.actions.fetchPhysicalMetrics;
};
