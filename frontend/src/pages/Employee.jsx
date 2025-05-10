import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import orderApi from "../api/orderApi";
import OrderDetailPageButForEmployees from "../components/OrderDetailForEmployee";
import OrderDetailPageButWithoutOptions from "../components/OrderDetailPageButWithoutOption";

export default function Employee() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedFromPending, setSelectedFromPending] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    try {
      const dataOrder = await orderApi.getOrders();
      console.log("👉 Dữ liệu đơn hàng:", dataOrder);
      setOrdersData(dataOrder);
    } catch (e) {
      setError("Lỗi khi tải đơn hàng", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSelectOrder = (order, fromPending) => {
    setSelectedOrder(order);
    setSelectedFromPending(fromPending);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-[70vw] flex gap-6">
      {/* Cột trái - Đơn hàng Pending */}
      <div className="w-1/3 space-y-4 overflow-y-auto bg-white p-4 rounded shadow">
        <h1 className="text-xl font-bold border-b pb-2 mb-4 text-green-700">
          🕒 Đơn Cần Xác Nhận
        </h1>
        {loading && <p>Đang tải đơn hàng...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {ordersData
          .filter((o) => o.orderStatus === "Pending")
          .map((order) => (
            <Paper
              key={order.orderId}
              className="p-4 hover:bg-green-50 transition cursor-pointer border"
              onClick={() => handleSelectOrder(order, true)}
            >
              <p className="font-semibold text-gray-800">🆔 {order.orderId}</p>
              <p>
                Trạng thái: <b>{order.orderStatus}</b>
              </p>
              <p>
                Tổng Tiền:{" "}
                <span className="text-green-600 font-medium">
                  {order.totalPrice
                    ? parseFloat(order.totalPrice).toLocaleString()
                    : "?"}{" "}
                  đ
                </span>
              </p>
              <p>Loại đơn: {order.orderType || "Không rõ"}</p>
            </Paper>
          ))}
      </div>

      {/* Cột giữa - Chi tiết đơn hàng */}
      <div className="w-1/3 bg-white p-6 rounded shadow overflow-y-auto">
        {selectedOrder ? (
          selectedFromPending ? (
            <OrderDetailPageButForEmployees
              order={selectedOrder}
              onStatusChange={(val) => {
                if (val === null) setSelectedOrder(null);
                loadOrders();
              }}
            />
          ) : (
            <OrderDetailPageButWithoutOptions
              order={selectedOrder}
              onStatusChange={loadOrders}
            />
          )
        ) : (
          <p className="text-gray-500 italic text-center">
            Hãy chọn đơn hàng để xem chi tiết
          </p>
        )}
      </div>

      {/* Cột phải - Tất cả đơn */}
      <div className="w-1/3 space-y-4 overflow-y-auto bg-white p-4 rounded shadow">
        <h1 className="text-xl font-bold border-b pb-2 mb-4 text-blue-700">📋 Tất Cả Đơn Hàng</h1>
        {ordersData.filter(o => o.orderStatus !== "Pending").map((order) => (
          <Paper
            key={order.orderId}
            className="p-4 hover:bg-blue-50 transition cursor-pointer border"
            onClick={() => handleSelectOrder(order, false)}
          >
            <p className="font-semibold text-gray-800">🆔 {order.orderId}</p>
            <p>
              Trạng thái: <b>{order.orderStatus}</b>
            </p>
            <p>
              Tổng Tiền:{" "}
              <span className="text-blue-600 font-medium">
                {order.totalPrice
                  ? parseFloat(order.totalPrice).toLocaleString()
                  : "?"}{" "}
                đ
              </span>
            </p>
            <p>Loại đơn: {order.orderType || "Không rõ"}</p>
          </Paper>
        ))}
      </div>
    </div>
  );
}
