import axiosClient from "./axiosClient";

const productApi = {
  getProducts: () => axiosClient.get("/product"),
  getProductsActive: () => axiosClient.get("/product/active"),
  getProductsByCategory: (categoryId) =>
    axiosClient.get(`/product/by-category/${categoryId}`),
  createProduct: (data) => axiosClient.post("/product", data),
  updateProduct: (id, data) => axiosClient.put(`/product/${id}`, data),
  lockProduct: (id) => axiosClient.put(`/product/lock/${id}`),
  deleteProduct: (id) => axiosClient.delete(`/product/${id}`),
};

export default productApi;
