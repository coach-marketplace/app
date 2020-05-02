import API from "../../../services/api"
import { 
    accountValidationLoading, 
    accountValidationSuccess, 
    accountValidationFailed 
} from "./actions"

/**
 * validateAccount
 * @param {object} data validation data
 * @param {string} data.userId user id
 * @param {string} data.token validation token
 * @return {void}
 */
export const validateAccount = (data) => {
    return (dispatch) => {
      dispatch(accountValidationLoading());
      API.post("auth/verify-email/", { userId: data.userId, token: data.token })
        .then((response) => {
          dispatch(accountValidationSuccess(response.data));
        })
        .catch((error) => {
          dispatch(accountValidationFailed(error.response.data.public_message));
        });
    };
  };
  