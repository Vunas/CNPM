import axiosClient from "./axiosClient";

const categoryApi = {
  getCategories: () => axiosClient.get("/category"),
  createCategory: (data) => axiosClient.post("/category/create", data),
  updateCategory: (id, data) => axiosClient.put(`/category/update/${id}`, data),
  deleteCategory: (id) => axiosClient.delete(`/category/delete/${id}`),
};

export default categoryApi;
