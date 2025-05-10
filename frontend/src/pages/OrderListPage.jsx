import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import OrderDetailPage from "../components/OrderDetailForKitchen";
import orderApi from "../api/orderApi";

export default function OrderListPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    try {
      const dataOrder = await orderApi.getOrders();
      console.log("📦 Dữ liệu đơn hàng:", dataOrder);
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex gap-6 w-[70vw]">
      {/* Cột trái - Đơn Đang Chế Biến chiếm 40% */}
      <div className="w-2/5 space-y-4 overflow-y-auto bg-white p-4 rounded shadow">
        <h1 className="text-xl font-bold border-b pb-2 mb-4 text-orange-700">⏳ Đơn Đang Chế Biến</h1>
        {loading && <p>Đang tải đơn hàng...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {ordersData
          .filter((order) => order.orderStatus === "Processing")
          .map((order) => (
            <Paper
              key={order.orderId}
              className="p-4 hover:bg-orange-50 transition cursor-pointer border"
              onClick={() => setSelectedOrder(order)}
            >
              <p className="font-semibold text-gray-800">🆔 {order.orderId}</p>
              <p>Trạng thái: <b>{order.orderStatus}</b></p>
              <p>
                Tổng Tiền:{" "}
                <span className="text-orange-600 font-medium">
                  {order.totalPrice
                    ? parseFloat(order.totalPrice).toLocaleString()
                    : "?"} đ
                </span>
              </p>
              <p>Loại đơn: {order.orderType || "Không rõ"}</p>
            </Paper>
          ))}
      </div>

      {/* Cột phải - Chi tiết đơn hàng chiếm 60% */}
      <div className="w-3/5 bg-white p-6 rounded shadow overflow-y-auto">
        {selectedOrder ? (
          <OrderDetailPage
            order={selectedOrder}
            onStatusChange={(value) => {
              if (value === null) setSelectedOrder(null);
              loadOrders();
            }}
          />
        ) : (
          <p className="text-gray-500 italic text-center">
            Hãy chọn một đơn hàng để xem chi tiết
          </p>
        )}
      </div>
    </div>
  );
}
