import // fetchUserProfileInfosPending,
// fetchUserProfileInfosSuccess,
// fetchUserProfileInfosFailed,
// updateUserProfileInfosPending,
// updateUserProfileInfosSuccess,
// updateUserProfileInfosFailed,
// fetchUserProfilePending,
// fetchUserProfileSuccess,
// fetchUserProfileFailed,
// updateUserProfilePending,
// updateUserProfileSuccess,
// updateUserProfileFailed,
// updateUserPasswordPending,
// updateUserPasswordSuccess,
// updateUserPasswordFailed,
// fetchUserPhysicalMetricsPending,
// fetchUserPhysicalMetricsSuccess,
// fetchUserPhysicalMetricsFailed,
// addUserPhysicalMetricsPending,
// addUserPhysicalMetricsSuccess,
// addUserPhysicalMetricsFailed,
"./actions";

import API from "../../../services/api";
import store from "../..";

// export const fetchUserProfileInfos = () => {
//   return (dispatch) => {
//     dispatch(fetchUserProfileInfosPending());
//     API.get("user/" + store.getState().user.current._id)
//       .then((response) => {
//         dispatch(fetchUserProfileInfosSuccess(response.data));
//       })

//       .catch((error) => {
//         dispatch(
//           fetchUserProfileFailed({
//             message: "We could not retrieve your data. Please try again later.",
//           })
//         );
//       });
//   };
// };

// export const updateUserProfileInfos = (updatedProfileData) => {
//   return (dispatch) => {
//     dispatch(updateUserProfileInfosPending());
//     API.post("user/" + store.getState().user.current._id, updatedProfileData)
//       .then((response) => {
//         dispatch(updateUserProfileInfosSuccess(updatedProfileData));
//       })
//       .catch((error) => {
//         dispatch(
//           updateUserProfileFailed({
//             message:
//               "We could not update your profile. Please try again later.",
//           })
//         );
//       });
//   };
// };

// export const changeUserPassword = (passwords) => {
//   return (dispatch) => {
//     dispatch(updateUserPasswordPending());
//     if (passwords.newPwd !== passwords.newPwdConf || passwords.newPwd === "") {
//       dispatch(
//         updateUserPasswordFailed({
//           message: "passwords don't match or are empty",
//         })
//       );
//     } else {
//       API.post("user/password/" + store.getState().auth.authUser._id, {
//         currentPassword: passwords.oldPwd,
//         newPassword: passwords.newPwd,
//       })
//         .then((response) => {
//           dispatch(
//             updateUserPasswordSuccess({
//               message: "your password has been successfully changed",
//             })
//           );
//         })
//         .catch((error) => {
//           //TODO: how to get error public message?
//           dispatch(
//             updateUserPasswordFailed({
//               message:
//                 "We could not update your password. Please try again later.",
//             })
//           );
//         });
//     }
//   };
// };

// export const fetchUserBodyInfos = () => {
//   return (dispatch) => {
//     dispatch(fetchUserPhysicalMetricsPending());
//     API.get("user/body/" + store.getState().auth.authUser._id)
//       .then((response) => {
//         dispatch(fetchUserPhysicalMetricsSuccess(response.data));
//       })
//       .catch((error) => {
//         dispatch(
//           fetchUserPhysicalMetricsFailed({
//             message: "We could not retrieve your data. Please try again later.",
//           })
//         );
//       });
//   };
// };

// export const updateUserBodyInfos = (updatedBodyData) => {
//   return (dispatch) => {
//     dispatch(addUserPhysicalMetricsPending());
//     API.post("user/body/" + store.getState().auth.authUser._id, updatedBodyData)
//       .then((response) => {
//         updatedBodyData.message = "We updated your data successfully!";
//         dispatch(addUserPhysicalMetricsSuccess(updatedBodyData));
//       })
//       .catch((error) => {
//         dispatch(
//           addUserPhysicalMetricsFailed({
//             message: "We could not update your data. Please try again later.",
//           })
//         );
//       });
//   };
// };
