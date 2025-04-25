import axiosClient from "./axiosClient";

const accountApi = {
  getAccounts: () => axiosClient.get("/accounts"),
  createAccount: (data) => axiosClient.post("/accounts/create", data),
  updateAccount: (id, data) => axiosClient.put(`/accounts/update/${id}`, data),
  deleteAccount: (id) => axiosClient.delete(`/accounts/delete/${id}`),
};

export default accountApi;
