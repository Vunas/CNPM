import axiosClient from "./axiosClient";

const productApi = {
  getProducts: () => axiosClient.get("/product"),
  createProduct: (data) => axiosClient.post("/product/create", data),
  updateProduct: (id, data) => axiosClient.put(`/product/update/${id}`, data),
  deleteProduct: (id) => axiosClient.delete(`/product/delete/${id}`),
};

export default productApi;
