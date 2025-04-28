import axiosClient from "./axiosClient"; // Adjust the path if needed

const orderApi = {
  getOrders: () => axiosClient.get("/order"),
  getOrderById: (orderId) => axiosClient.get(`/order/${orderId}`),
  createOrder: (orderData, orderDetails) =>
    axiosClient.post("/order", { order: orderData, orderDetails }),
  updateOrder: (orderId, orderData) =>
    axiosClient.put(`/order/${orderId}`, orderData),
  deleteOrder: (orderId) => axiosClient.delete(`/order/${orderId}`),
  getOrdersByCustomer: (customerId) =>
    axiosClient.get(`/order/customer/${customerId}`),
  getOrderDetails: (orderId) => axiosClient.get(`/order/${orderId}/details`),
};

export default orderApi;
