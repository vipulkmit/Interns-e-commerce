import axios from "axios";
import API_CONFIG from "../config/appConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import API_CONFIG from "../config/appconfig";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;

// async function registerUser(data: { email?: string; password?: string; name?: string; confirmPassword?: string; }) {
//   const response = await fetch("/api/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: data.email,
//       password: data.password,
//       name: data.name,
//     }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Failed to register user");
//   }

//   return await response.json();
// }

// export default {registerUser, axiosInstance}
