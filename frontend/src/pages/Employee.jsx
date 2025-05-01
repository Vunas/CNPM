import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import orderApi from "../api/orderApi";
import OrderDetailPageButForEmployees from "../components/OrderDetailForEmployee";
import OrderDetailPageButWithoutOptions from "../components/OrderDetailPageButWithoutOption";

export default function Employee() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedFromPending, setSelectedFromPending] = useState(false); // <== Ghi nhớ bạn click từ Pending hay All
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    try {
      const dataOrder = await orderApi.getOrders();
      console.log("👉 Dữ liệu đơn hàng:", dataOrder);
      setOrdersData(dataOrder);
    } catch (e) {
      setError("Lỗi khi tải đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSelectOrder = (order, fromPending) => {
    setSelectedOrder(order);
    setSelectedFromPending(fromPending); // true nếu click từ Pending
  };

  return (
    <div className="p-6 bg-gray-100 h-screen flex gap-6">
      {/* Cột 1: Đơn hàng Pending */}
      <div className="w-1/3 space-y-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Đơn Cần Xác Nhận (Pending)</h1>
        {loading && <p>Đang tải đơn hàng...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {ordersData
          .filter((order) => order.orderStatus === "Pending")
          .map((order) => (
            <Paper
              key={order.orderId}
              className="p-4 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectOrder(order, true)}
            >
              <p className="text-lg font-semibold">ID: {order.orderId}</p>
              <p>Trạng thái: {order.orderStatus}</p>
              <p>
                Tổng Tiền:{" "}
                {order.totalPrice
                  ? parseFloat(order.totalPrice).toLocaleString()
                  : "?"}{" "}
                đ
              </p>
              <p>Loại đơn: {order.orderType || "Không rõ"}</p>
            </Paper>
          ))}
      </div>

      {/* Cột 2: Chi tiết đơn hàng */}
      <div className="w-1/3 bg-white p-6 shadow-md overflow-y-auto">
        {selectedOrder ? (
          selectedFromPending ? (
            <OrderDetailPageButForEmployees
              order={selectedOrder}
              onStatusChange={loadOrders}
            />
          ) : (
            <OrderDetailPageButWithoutOptions
              order={selectedOrder}
              onStatusChange={loadOrders}
            />
          )
        ) : (
          <p className="text-gray-500">Chọn một đơn hàng để xem chi tiết</p>
        )}
      </div>

      {/* Cột 3: Tất cả đơn */}
      <div className="w-1/3 space-y-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Tất Cả Đơn Hàng</h1>
        {ordersData.map((order) => (
          <Paper
            key={order.orderId}
            className="p-4 cursor-pointer hover:bg-gray-200"
            onClick={() => handleSelectOrder(order, false)}
          >
            <p className="text-lg font-semibold">ID: {order.orderId}</p>
            <p>Trạng thái: {order.orderStatus}</p>
            <p>
              Tổng Tiền:{" "}
              {order.totalPrice
                ? parseFloat(order.totalPrice).toLocaleString()
                : "?"}{" "}
              đ
            </p>
            <p>Loại đơn: {order.orderType || "Không rõ"}</p>
          </Paper>
        ))}
      </div>
    </div>
  );
}