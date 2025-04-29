import axios from "axios";
import API_CONFIG from "../config/appConfig";
// import API_CONFIG from "../config/appconfig";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("[Request]", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("[Response]", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.log("[Error]", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
