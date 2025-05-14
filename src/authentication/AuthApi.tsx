import axios from "axios";
import axiosInstance from "../services/api/axiosInstance";
import ENDPOINTS from "../utils/endpoints";

export const registerUser = (data: any) =>
  axiosInstance.post(ENDPOINTS.USERS, data);
<<<<<<< HEAD

export const loginUser = (data: any) => {
  console.log(data, "desufsfnfu");
  return axiosInstance.post(ENDPOINTS.LOGIN, data);
};
=======
export const loginUser = (data: any) =>
  axiosInstance.post(ENDPOINTS.LOGIN, data);
>>>>>>> 25fa5d60af0deab303986e9b52957823f5289d7f
export const forgetpassword = (data: any) =>
  axiosInstance.post(ENDPOINTS.FORGET_PASSWORD, data);
export const verifyotp = (data: any) =>
  axiosInstance.post(ENDPOINTS.VERIFY_OTP, data);
export const googlelogin = (data: any) =>
  axiosInstance.get(ENDPOINTS.GOOGLE_OAUTH, data);
// export const userUpdate = (userId: string, data: any) =>
//   axiosInstance.patch(ENDPOINTS.UPDATE(userId), data);
export const googleoauth = (data: any) =>
  axiosInstance.get(ENDPOINTS.GOOGLE_OAUTH, data);
