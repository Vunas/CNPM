import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import orderApi from "../api/orderApi";

export default function OrderDetailPage({ order, onStatusChange }) {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (!order?.orderId) return;

    const fetchDetails = async () => {
      try {
        const res = await orderApi.getOrderDetails(order.orderId);
        console.log("Kết quả chi tiết đơn hàng:", res); //  XEM LOG
        setDetails(res);
      } catch (err) {
        console.error(" Lỗi khi lấy chi tiết đơn hàng:", err);
        setDetails([]);
      }
    };

    fetchDetails();
  }, [order]);

  if (!order) return null;

  const handleUpdateStatus = async (status) => {
    try {
      await orderApi.updateOrder(order.orderId, {
        orderStatus: status,
        tableId: order.tableId || null,
        accountId: order.accountId || null,
        restaurantId: order.restaurantId, 
        customerContact: order.customerContact, 
        paymentMethod: order.paymentMethod || null,
        totalPrice: order.totalPrice, 
        orderType: order.orderType,
        status: order.status,
      });
      alert("Thao tác thành công!");
      setDetails([]); 
      if (typeof onStatusChange === "function") {
        onStatusChange(null);
      }
    
    } catch (err) {
      alert("Cập nhật trạng thái thất bại!");
    }
  };
  
  
  

  return (
    <div className="justify-center">
      <h2 className="text-2xl font-bold mb-2 justify-center flex">
        Chi Tiết Đơn Hàng
      </h2>
      <p className="text-lg">ID Đơn: {order.orderId}</p>
      <p>
        Ngày đặt:{" "}
        {order.orderDate
          ? new Date(order.orderDate).toLocaleString()
          : "Không rõ"}
      </p>
      <p>
        Tổng:{" "}
        {order.totalPrice
          ? parseFloat(order.totalPrice).toLocaleString()
          : "Không rõ"}{" "}
        đ
      </p>
      <p>Loại đơn: {order.orderType}</p>
      <p>Trạng thái: {order.orderStatus}</p>

      <h3 className="font-semibold mt-4">Chi tiết sản phẩm:</h3>
      <ul className="list-disc pl-6">
  {Array.isArray(details) && details.length > 0 ? (
    details.map((item, index) => (
      <li key={index}>
        {item.productName || "Sản phẩm không tên"} - SL: {item.quantity} - Giá:{" "}
        {item.price !== undefined
          ? Number(item.price).toLocaleString("vi-VN")
          : "?"}{" "}
        đ
      </li>
    ))
  ) : (
    <li>Không có chi tiết đơn hàng</li>
  )}
</ul>

      <div className="mt-4 space-x-2">
        <Button
          variant="contained"
          color="success"
          onClick={() => handleUpdateStatus("Prepared")}
        >
          Xác Nhận
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleUpdateStatus("Cancelled")}
        >
          Hủy Đơn
        </Button>
      </div>
    </div>
  );
}