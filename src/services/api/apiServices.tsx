import axiosInstance from "./axiosInstance";

const apiCall = (url, config = {}) => {
  return axiosInstance({ url, ...config });
};

export default apiCall;
