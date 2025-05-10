import axiosClient from "./axiosClient";

const accountApi = {
  getAccounts: () => axiosClient.get("/account"),
  createAccount: (data) => axiosClient.post("/account", data),
  updateAccount: (id, data) => axiosClient.put(`/account/${id}`, data),
  lockAccount: (id) => axiosClient.put(`/account/lock/${id}`),
  deleteAccount: (id) => axiosClient.delete(`/account/${id}`),
};

export default accountApi;
