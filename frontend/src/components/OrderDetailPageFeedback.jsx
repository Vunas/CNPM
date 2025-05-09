import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import orderApi from "../api/orderApi";

export default function OrderDetailPageFeedback({ order, onStatusChange }) {
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
      onStatusChange();
    } catch (err) {
      alert("Cập nhật trạng thái thất bại!");
    }
  };
  
  
  

  return (
    <div className="justify-center">
      <h2 className="text-2xl font-bold mb-2 justify-center flex">
        Order detail
      </h2>
      <p className="text-lg">ID Đơn: {order.orderId}</p>
      <p>
        Created:{" "}
        {order.orderDate
          ? new Date(order.orderDate).toLocaleString()
          : "Không rõ"}
      </p>
      <p>
        Total:{" "}
        {order.totalPrice
          ? parseFloat(order.totalPrice).toLocaleString()
          : "Không rõ"}{" "}
        Kr
      </p>
      <p>Order type: {order.orderType}</p>
      <p>Status: {order.orderStatus}</p>

      <h3 className="font-semibold mt-4">Order detail:</h3>
      <ul className="list-disc pl-6">
  {Array.isArray(details) && details.length > 0 ? (
    details.map((item, index) => (
      <li key={index}>
        {item.productName || "Sản phẩm không tên"} - Quantity: {item.quantity} - Price:{" "}
        {item.price !== undefined
          ? Number(item.price*item.quantity).toFixed(2).replace(".", ",")
          : "?"}{" "}
        Kr
      </li>
    ))
  ) : (
    <li>Không có chi tiết đơn hàng</li>
  )}
</ul>

    </div>
  );
}