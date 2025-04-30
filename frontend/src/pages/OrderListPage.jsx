import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import OrderDetailPage from "../components/OrderDetailPageForKItchen";
import orderApi from "../api/orderApi";

export default function OrderListPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    try {
      const dataOrder = await orderApi.getOrders();
      console.log("Dữ liệu đơn hàng:", dataOrder);
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
    <div className="p-6 bg-gray-100 h-screen flex gap-6">
      <div className="w-1/4 space-y-4 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Danh Sách Đơn Hàng (Confirmed)</h1>
        {loading && <p>Đang tải đơn hàng...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {ordersData
          .filter((order) => order.orderStatus === "Processing")
          .map((order) => (
            <Paper
              key={order.orderId}
              className="p-4 cursor-pointer hover:bg-gray-200"
              onClick={() => setSelectedOrder(order)}
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

      <div className="w-3/4 bg-white p-6 shadow-md overflow-y-auto">
        {selectedOrder ? (
          <OrderDetailPage order={selectedOrder} onStatusChange={loadOrders} />
        ) : (
          <p className="text-gray-500">Chọn một đơn hàng để xem chi tiết</p>
        )}
      </div>
      
    </div>
  );
}
