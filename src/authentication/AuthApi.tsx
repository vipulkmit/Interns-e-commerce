// import apiCall from "../services/api/apiServices";
import axiosInstance from "../services/api/axiosInstance";
import ENDPOINTS from "../utils/endpoints";

// const fetchUsers = () => {
//   apiCall(ENDPOINTS.USERS, {
//     method: "GET",
//   })
//     .then((response) => {
//       console.log("Users:", response.data);
//     })
//     .catch((error) => {
//       console.log("API Error:", error.message);
//     });
// };

// // fetchUsers()

// export default fetchUsers;

// apiCall(ENDPOINTS.USERS, {
//   method: "POST",
//   data: {
//     title: "NEW Post",
//     body: "Hello World!",
//   },
// });

export const registerUser = (data: any) =>
  axiosInstance.post(ENDPOINTS.USERS, data);
export const loginUser = (data: any) =>
  axiosInstance.post(ENDPOINTS.LOGIN, data);
export const forgetpassword = (data: any) =>
  axiosInstance.post(ENDPOINTS.FORGET_PASSWORD, data);
export const verifyotp = (data: any) =>
  axiosInstance.post(ENDPOINTS.VERIFY_OTP, data);
export const changepassword = (data: any) =>
  axiosInstance.post(ENDPOINTS.CHANGE_PASSWORD, data);
export const googlelogin = (data: any) =>
  axiosInstance.get(ENDPOINTS.GOOGLE_SIGNUP, data);
export const googleoauth = (data: any) =>
  axiosInstance.get(ENDPOINTS.GOOGLE_OAUTH, data);
