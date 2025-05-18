import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "https://cnpm-production-6b4c.up.railway.app/api",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Network error:", error.message);
    }
    throw error;
  }
);

export default axiosClient;
