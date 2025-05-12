import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import orderApi from "../../api/orderApi";
import Loading from "../../utils/Loading/Loading";
import { QRCodeCanvas } from "qrcode.react";
import { Print, ShoppingCart } from "@mui/icons-material";
import { format } from "date-fns";

export default function Invoice() {
  const location = useLocation();
  const orderData = location.state?.orderData;
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(orderData);

  useEffect(() => {
    const fetchData = async () => {
      if (!orderData?.orderId) {
        setError(new Error("Order ID is missing."));
        setLoading(false);
        return;
      }
      try {
        const dataOrder = await orderApi.getOrderDetails(orderData.orderId);
        setOrderDetails(dataOrder);
      } catch (e) {
        console.error("Failed to fetch order details:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [orderData]); // Depend on orderData to refetch if it changes

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loading /> {/* Assuming Loading component provides a visual spinner */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">
            Failed to load invoice data: {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Information Missing
          </h2>
          <p className="text-gray-700">
            Order data not found. Please ensure you navigated here correctly.
          </p>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const feedbackUrl = `${window.location.origin}/feedback?orderid=${orderData.orderId}&tableid=${orderData.tableId}`;
  const orderUrl = `http://localhost:5173/order?restaurantid=${orderData.restaurant?.restaurantId}&restauranttableid=${orderData.restaurantTable?.tableId}`;

  // Helper for currency formatting
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NOK",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 print:block print:p-0">
      <div
        id="invoice"
        className="max-w-2xl w-full bg-white shadow-xl rounded-lg p-8 print:shadow-none print:rounded-none print:border-0"
      >
        {/* Header */}
        <div className="text-center mb-8 border-b pb-4 border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
            INVOICE
          </h1>
          <p className="text-md text-gray-600">Thank you for your order!</p>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8 text-gray-700 text-base">
          <div>
            <p className="font-semibold text-gray-800 mb-1">Order Details:</p>
            <p>
              <span className="font-medium">Order ID:</span> {orderData.orderId}
            </p>
            <p>
              <span className="font-medium">Order Date:</span>{" "}
              {format(new Date(orderData.orderDate), "d/M/yyyy, HH:mm:ss")}
            </p>
            <p>
              <span className="font-medium">Payment Method:</span>{" "}
              {orderData.paymentMethod}
            </p>
          </div>
          <div className="md:text-right">
            <p className="font-semibold text-gray-800 mb-1">Total Amount:</p>
            <p className="text-2xl font-bold text-green-700">
              {formatCurrency(orderData.totalPrice)}
            </p>
          </div>
        </div>

        {/* Product Details */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">
          Item Details
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left border-b border-gray-200">
                  Product
                </th>
                <th className="py-3 px-6 text-center border-b border-gray-200">
                  Quantity
                </th>
                <th className="py-3 px-6 text-right border-b border-gray-200">
                  Unit Price
                </th>
                <th className="py-3 px-6 text-right border-b border-gray-200">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-base font-light">
              {orderDetails.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {item.productName}
                  </td>
                  <td className="py-3 px-6 text-center">{item.quantity}</td>
                  <td className="py-3 px-6 text-right">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="py-3 px-6 text-right">
                    {formatCurrency(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold text-lg text-gray-800">
                <td colSpan="3" className="py-4 px-6 text-right">
                  Grand Total:
                </td>
                <td className="py-4 px-6 text-right">
                  {formatCurrency(orderData.totalPrice)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* QR Code for Feedback */}
        <div
          className="flex flex-col items-center justify-center mt-8 pt-4 border-t border-gray-200 bg-blue-50 rounded-lg p-6 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-100"
          onClick={() => (window.location.href = feedbackUrl)}
          title="Click to provide feedback"
        >
          <p className="text-lg font-semibold text-blue-800 mb-3">
            Scan for Feedback:
          </p>
          <QRCodeCanvas value={feedbackUrl} size={140} level="H" />
          <p className="text-sm text-gray-600 mt-3">
            Your feedback is important to us!
          </p>
        </div>

        {/* Print Button - Hidden when printing */}
        <div className="print:hidden mt-8 text-center">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePrint}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 gap-4 rounded-lg shadow-md transition duration-300 ease-in-out"
            sx={{ paddingY: "12px", fontSize: "1.1rem" }}
          >
            Print Invoice
            <Print/>
          </Button>
          <div className="my-4 text-gray-500">Or</div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => (window.location.href = orderUrl)}
            className="gap-4 bg-gradient-to-r from-purple-500 to-pink-300 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
            sx={{ paddingY: "12px", fontSize: "1.1rem" }}
          >
            Proceed with the order
            <ShoppingCart/>
          </Button>
        </div>
      </div>
    </div>
  );
}
