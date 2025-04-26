import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong";
  }
};

export const getProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong";
  }
};

export const refreshToken = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/refresh-token`, {
      token,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong";
  }
};
