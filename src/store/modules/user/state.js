import {
    FETCH_USER_PROFILE_INFOS_PENDING,
    FETCH_USER_BODY_INFOS_PENDING,
} from "./constants"

export default {
    profileData : {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        status: FETCH_USER_PROFILE_INFOS_PENDING,
        message: "",
    },
    passwordData : {
        status: "",
        message:"",
    },
    bodyData : {
        height: {
            value: "",
            metric: "",
        },
        weight: [{
            date: "",
            value: "",
            metric: "",
        }],
        birthDate: "",
        gender: "",
        status: FETCH_USER_BODY_INFOS_PENDING,
        message: "",
    }
}