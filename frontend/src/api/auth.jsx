import axiosClient from "./axiosClient";


// const API_URL = "http://localhost:3000/api/auth";

export const login = async (username, password) => {
  try {
    const response = await axiosClient.post(`/auth/login`, {
      username,
      password,
    });
    localStorage.setItem("accessToken",response.accessToken);
    return response;
  } catch (error) {
    console.log(error);
    throw error.response?.data || "Something went wrong";
  }
};

export const logout = () => {
  try {
    localStorage.removeItem("accessToken");
    window.location.reload();
  } catch (error) {
    throw error.response?.message || "Something went wrong";
  }
};

export const getProfile = async (token) => {
  try {
    const response = await axiosClient.get(`/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error.response?.message || "Something went wrong";
  }
};

export const refreshToken = async (token) => {
  try {
    const response = await axiosClient.post(`/auth/refresh-token`, {
      token,
    });
    return response;
  } catch (error) {
    throw error.response?.message || "Something went wrong";
  }
};
