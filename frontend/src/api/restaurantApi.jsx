import axiosClient from "./axiosClient";

const restaurantApi = {
  getRestaurants: () => axiosClient.get("/restaurant"),
  createRestaurant: (data) => axiosClient.post("/restaurant/create", data),
  updateRestaurant: (id, data) =>
    axiosClient.put(`/restaurant/update/${id}`, data),
  deleteRestaurant: (id) => axiosClient.delete(`/restaurant/delete/${id}`),
};

export default restaurantApi;
