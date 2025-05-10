import axiosClient from "./axiosClient";

const categoryApi = {
  getCategories: () => axiosClient.get("/category"),
  createCategory: (data) => axiosClient.post("/category", data),
  updateCategory: (id, data) => axiosClient.put(`/category/${id}`, data),
  deleteCategory: (id) => axiosClient.delete(`/category//${id}`),
};

export default categoryApi;
