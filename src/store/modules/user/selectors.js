//import API from "../../../services/api"
//import initialState from "./state";

export const getProfileInfos = (store) => {
    console.log(store.user)
    return store.user.profileData;
};