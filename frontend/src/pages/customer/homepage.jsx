import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import orderApi from "../../api/orderApi";
import OrderDetailPageButForEmployees from "../../components/OrderDetailForEmployee";
import OrderDetailPageButWithoutOptions from "../../components/OrderDetailPageButWithoutOption";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import OrderDetailPageFeedback from "../../components/OrderDetailPageFeedback";

export default function Homepage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedFromPending, setSelectedFromPending] = useState(false);
  const navigate = useNavigate();
  const [ordersData, setOrdersData] = useState([]);
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get("restaurantid");
  const restaurantTableId = searchParams.get("restauranttableid");
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

  function menuNavigate(){
    navigate(`/order?restaurantid=${restaurantId}&restaurantid=${restaurantId}&restauranttableid=${restaurantTableId}`)
  }
  useEffect(() => {
    loadOrders();
  }, []);

  const handleSelectOrder = (order, fromPending) => {
    setSelectedOrder(order);
    setSelectedFromPending(fromPending);
  };

  return (
    <div className="p-6 bg-gray-50 h-screen flex gap-4 w-[90vw]">
      <div className="w-[60%] bg-white p-4 rounded shadow flex flex-col relative">
        <img
          src="src/assets/Restaurant.jpg"
          alt="Cart"
          className="w-96 h-96 mx-auto border-b-4 border-black"
        />

        <div className="w-full text-center text-2xl font-bold mt-4">
           <img
            src="src/assets/table.png"
            alt="Cart"
            className="w-8 h-8 inline-block mr-2 mb-1"
          />
          TABLE: <span className="text-red-500">{restaurantTableId}</span>
        </div>

        <button 
        className="text-black font-bold mx-auto mt-auto mb-2 text-2xl border-2 border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600 p-4 mb-8 rounded-md pl-6 pr-6"
        onClick={()=>menuNavigate()}
        >
          MENU
        </button>
      </div>



      <div className="w-[20%] space-y-4 overflow-y-auto bg-white p-4 rounded shadow">
        <h1 className="text-xl font-bold border-b pb-2 mb-4 text-blue-700">📋 Order</h1>
        {ordersData.filter(o => o.tableId === "t-001").sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).map((order) => (
          <Paper
            key={order.orderId}
            className="p-4 hover:bg-blue-50 transition cursor-pointer border"
            onClick={() => handleSelectOrder(order, true)}
          >
            <p className="font-semibold text-gray-800">🆔 {order.orderId}</p>
            <p>Status: <b>{order.orderStatus}</b></p>
            <p>
              Total:{" "}
              <span className="text-blue-600 font-medium">
                {order.totalPrice ? parseFloat(order.totalPrice).toFixed(2).replace(".", ",") : "?"} Kr
              </span>
            </p>
            <p>Order type: {order.orderType || "Không rõ"}</p>
          </Paper>
        ))}
      </div>

            {/* Cột giữa - Chi tiết đơn hàng */}
      <div className="w-[20%] bg-white p-6 rounded shadow overflow-y-auto">
        {selectedOrder ? <OrderDetailPageFeedback
              order={selectedOrder}
              onStatusChange={(val) => {
                if (val === null) setSelectedOrder(null);
                loadOrders();
              }}
            /> : (
          <p className="text-gray-500 italic text-center">Hãy chọn đơn hàng để xem chi tiết</p>
        )}
      </div>
    </div>
  );
}
