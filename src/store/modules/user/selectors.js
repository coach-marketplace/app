export const getProfileInfos = (store) => {
    return store.user.profileData;
};

export const getChangePasswordInfos = (store) => {
    return store.user.passwordData;
}