import axiosClient from "./axiosClient";

const restaurantApi = {
  getRestaurants: () => axiosClient.get("/restaurant"),
  createRestaurant: (data) => axiosClient.post("/restaurant", data),
  updateRestaurant: (id, data) => axiosClient.put(`/restaurant/${id}`, data),
  deleteRestaurant: (id) => axiosClient.delete(`/restaurant/${id}`),
};

export default restaurantApi;
