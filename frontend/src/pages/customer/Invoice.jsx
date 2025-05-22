import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import orderApi from "../../api/orderApi";
import Loading from "../../utils/Loading/Loading";
import { QRCodeCanvas } from "qrcode.react";
import { Print, ShoppingCart } from "@mui/icons-material";
import { format } from "date-fns";
import Error from "../../utils/Error";

export default function Invoice() {
  const location = useLocation();
  const orderData = location.state?.orderData;
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!orderData?.orderId) {
        setError("Order ID is missing.");
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
  }, [orderData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <Error error={`Failed to load invoice data: ${error}`} />;
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-600 mb-2 sm:mb-4">
            Information Missing
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">
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
  const orderUrl = `${window.location.origin}/order?restaurantid=${orderData.restaurant?.restaurantId}&restauranttableid=${orderData.restaurantTable?.tableId}`;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NOK",
    }).format(amount);
  };

  return (
    <div className="w-screen bg-gray-100 flex  justify-center sm:p-4 print:block print:p-0 overflow-scroll">
      <div
        id="invoice"
        className="max-w-screen sm:max-w-2xl w-full bg-white shadow-xl rounded-lg p-4 print:shadow-none print:rounded-none print:border-0"
      >
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8 border-b pb-2 sm:pb-4 border-gray-200">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 mb-1 sm:mb-2 tracking-tight">
            INVOICE
          </h1>
          <p className="text-sm sm:text-md text-gray-600">
            Thank you for your order!
          </p>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-4 mb-4 sm:mb-8 text-gray-700 text-sm sm:text-base">
          <div>
            <p className="font-semibold text-gray-800 mb-0.5 sm:mb-1">
              Order Details:
            </p>
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
          <div className="sm:text-right">
            <p className="font-semibold text-gray-800 mb-0.5 sm:mb-1">
              Total Amount:
            </p>
            <p className="text-xl sm:text-2xl font-bold text-green-700">
              {formatCurrency(orderData.totalPrice)}
            </p>
          </div>
        </div>

        {/* Product Details */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4 border-b pb-1 sm:pb-2 border-gray-200">
          Item Details
        </h2>
        <div className="overflow-x-auto mb-4 sm:mb-8">
          <table className="min-w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-50 text-gray-600 uppercase text-xs sm:text-sm leading-normal">
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left border-b border-gray-200">
                  Product
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-center border-b border-gray-200">
                  Qty
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-right border-b border-gray-200">
                  Unit Price
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-right border-b border-gray-200">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 font-light">
              {orderDetails.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-2 px-3 sm:py-3 sm:px-6 text-left whitespace-nowrap">
                    {item.productName}
                  </td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6 text-center">
                    {item.quantity}
                  </td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6 text-right">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6 text-right">
                    {formatCurrency(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold text-sm sm:text-lg text-gray-800">
                <td
                  colSpan="3"
                  className="py-2 sm:py-4 px-3 sm:px-6 text-right"
                >
                  Grand Total:
                </td>
                <td className="py-2 sm:py-4 px-3 sm:px-6 text-right">
                  {formatCurrency(orderData.totalPrice)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* QR Code for Feedback */}
        <div
          className="flex flex-col items-center justify-center mt-4 sm:mt-8 pt-2 sm:pt-4 border-t border-gray-200 bg-blue-50 rounded-lg p-3 sm:p-6 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-100"
          onClick={() => (window.location.href = feedbackUrl)}
          title="Click to provide feedback"
        >
          <p className="text-sm sm:text-lg font-semibold text-blue-800 mb-1 sm:mb-3">
            Scan for Feedback:
          </p>
          <QRCodeCanvas value={feedbackUrl} size={100} level="H" />
          <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-3 text-center">
            Your feedback is important to us!
          </p>
        </div>

        {/* Print Button - Hidden when printing */}
        <div className="print:hidden mt-4 sm:mt-8 text-center">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePrint}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 gap-2 sm:gap-4 rounded-lg shadow-md transition duration-300 ease-in-out text-sm sm:text-base"
            sx={{ fontSize: "0.9rem" }}
          >
            Print
            <Print fontSize="small" />
          </Button>
          <div className="my-2 sm:my-4 text-gray-500 text-xs sm:text-sm">
            Or
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => (window.location.href = orderUrl)}
            className="gap-2 sm:gap-4 bg-gradient-to-r from-purple-500 to-pink-300 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-lg transition duration-300 ease-in-out text-sm sm:text-base"
            sx={{ fontSize: "0.9rem" }}
          >
            Continue Order
            <ShoppingCart fontSize="small" />
          </Button>
        </div>
      </div>
    </div>
  );
}
