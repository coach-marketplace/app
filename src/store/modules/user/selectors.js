export const getProfileInfos = (store) => {
    return store.user.profileData;
};

export const getChangePasswordInfos = (store) => {
    return store.user.passwordData;
}

export const getBodyInfos = (store) => {
    return store.user.bodyData;
}