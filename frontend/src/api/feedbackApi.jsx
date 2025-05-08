// src/api/feedbackApi.js
import axiosClient from "./axiosClient";

const feedbackApi = {
  getAll: () => axiosClient.get("/feedback"),
  get: (id) => axiosClient.get(`/feedback/${id}`),
  create: (data) => axiosClient.post("/feedback", data),
  update: (id, data) => axiosClient.put(`/feedback/${id}`, data),
  delete: (id) => axiosClient.delete(`/feedback/${id}`),
};

export default feedbackApi;
