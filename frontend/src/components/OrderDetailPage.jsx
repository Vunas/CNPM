import React from "react";
import { Button } from "@mui/material";

export default function OrderDetailPage({ order }) {
  if (!order) return null;

  return (
    <div className="justify-center ">
      <h2 className="text-2xl font-bold mb-2 justify-center flex">Chi Tiết Đơn Hàng</h2>
      <p className="text-lg">ID Đơn: {order.orderId}</p>
      <p>Ngày đặt: {new Date(order.orderDate).toLocaleString()}</p>
      <p>Tổng: {order.orderTotalPrice.toLocaleString()} đ</p>
      <p>Loại đơn: {order.extraType}</p>
      <p>Trạng thái: {order.orderStatus}</p>

      <h3 className="font-semibold mt-4">Chi tiết sản phẩm:</h3>
      <ul className="list-disc pl-6">
        {order.orderDetails.map((item, index) => (
          <li key={index}>
            {item.name} - SL: {item.quantity} - Giá: {item.price.toLocaleString()} đ
          </li>
        ))}
      </ul>

      <div className="mt-4 space-x-2">
        <Button variant="contained" color="success">Xác Nhận</Button>
        <Button variant="contained" color="error">Hủy Đơn</Button>
      </div>
    </div>
  );
}