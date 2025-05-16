import axiosClient from "./axiosClient";

const orderApi = {
  getOrders: () => axiosClient.get("/order"),
  getOrderById: (orderId) => axiosClient.get(`/order/${orderId}`),
  createOrder: (currentOrder, orderData, orderDetails) =>
    axiosClient.post("/order", {
      currentOrder,
      order: orderData,
      orderDetails,
    }),
  updateOrder: (orderId, orderData) =>
    axiosClient.put(`/order/${orderId}`, orderData),
  deleteOrder: (orderId) => axiosClient.delete(`/order/${orderId}`),
  getOrdersByCustomer: (customerId) =>
    axiosClient.get(`/order/customer/${customerId}`),
  getOrderDetails: (orderId) =>
    axiosClient.get(`/order-detail/order/${orderId}`),
};

export default orderApi;
