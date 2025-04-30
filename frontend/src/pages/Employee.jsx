  import React, { useState } from "react";
  import { Paper } from "@mui/material";
  import OrderDetailPage from "../components/OrderDetailPage";


  export default function Employee() {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const ordersData = [
      {
        orderId: "550e8400-e29b-41d4-a716-446655440000",
        accountId: "123e4567-e89b-12d3-a456-426614174000",
        orderStatus: "Processing",
        orderDate: "2025-04-19T09:35:38.213+07:00",
        orderTotalPrice: 250000,
        extraType: "Lấy tại quầy",
        orderDetails: [
          { productId: "prod-01", name: "Bún bò", quantity: 2, price: 50000 },
          { productId: "prod-02", name: "Phở gà", quantity: 1, price: 60000 },
        ],
      },
      {
        orderId: "550e8400-e29b-41d4-a716-446655440001",
        accountId: "123e4567-e89b-12d3-a456-426614174001",
        orderStatus: "Pending",
        orderDate: "2025-04-18T14:10:20.000+07:00",
        orderTotalPrice: 180000,
        extraType: "Delivery",
        orderDetails: [
          { productId: "prod-03", name: "Cơm gà", quantity: 3, price: 60000 },
        ],
      },
    ];



    return (
      <div className="p-6 bg-gray-100 h-screen flex gap-6">
        {/* Danh sách đơn hàng */}
        <div className="w-1/3 space-y-4">
          <h1 className="text-2xl font-bold mb-4">Danh Sách Đơn Hàng</h1>
          {ordersData
          .filter((order) => order.orderStatus === "Pending")
          .map((order) => (
            <Paper
              key={order.orderId}
              className="p-4 cursor-pointer hover:bg-gray-200"
              onClick={() => setSelectedOrder(order)}
            >
              <p className="text-lg font-semibold">ID: {order.orderId}</p>
              <p>Trạng thái: {order.orderStatus}</p>
              <p>Tổng Tiền: {order.orderTotalPrice.toLocaleString()} đ</p>
              <p>Loại đơn: {order.extraType}</p>
            </Paper>
          ))}
        </div>

        {/* Hiển thị chi tiết đơn hàng nếu có đơn được chọn */}
        <div className="w-2/3 bg-white p-6 shadow-md">
          {selectedOrder ? (
            <OrderDetailPage order={selectedOrder} />
          ) : (
            <p className="text-gray-500">Chọn một đơn hàng để xem chi tiết</p>
          )}
        </div>

        <div className="w-1/3 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Tất Cả Đơn Hàng</h1>
        {ordersData.map((order) => (
          <Paper
          key={order.orderId}
          className="p-4 cursor-pointer hover:bg-gray-200"
          onClick={() => setSelectedOrder(order)}
          >
            <p className="text-lg font-semibold">ID: {order.orderId}</p>
            <p>Trạng thái: {order.orderStatus}</p>
            <p>Tổng Tiền: {order.orderTotalPrice.toLocaleString()} đ</p>
            <p>Loại đơn: {order.extraType}</p>
          </Paper>
        ))}
      </div>
      </div>
    );
  }
