import axiosClient from "./axiosClient";

const restaurantTableApi = {
  getTables: () => axiosClient.get("/restaurant-table"),
  createTable: (data) => axiosClient.post("/restaurant-table", data),
  updateTable: (id, data) => axiosClient.put(`/restaurant-table/${id}`, data),
  deleteTable: (id) => axiosClient.delete(`/restaurant-table/${id}`),
  updateTableStatus: (id, newStatus) =>
    axiosClient.put(`/restaurant-table/${id}/status`, { status: newStatus }),
};

export default restaurantTableApi;
