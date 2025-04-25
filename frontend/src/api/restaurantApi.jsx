import axiosClient from "./axiosClient";

const restaurantApi = {
  getRestaurants: () => axiosClient.get("/restaurants"),
  createRestaurant: (data) => axiosClient.post("/restaurants/create", data),
  updateRestaurant: (id, data) =>
    axiosClient.put(`/restaurants/update/${id}`, data),
  deleteRestaurant: (id) => axiosClient.delete(`/restaurants/delete/${id}`),
};

export default restaurantApi;
