import React, { useState, useEffect } from "react";
import vnpayLogo from "../../assets/VNPAY.png";
import orderApi from "../../api/orderApi";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

const VNPayInfo = ({ cart, isDineIn, resId, tableId, setSnackbar }) => {
  const [isGeneratingQr, setIsGeneratingQr] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    let qrScanTimer;
    if (paymentStatus === "showing_qr") {
      qrScanTimer = setTimeout(() => {
        handleCreateOrderAfterScan();
      }, 6000);
    }

    return () => clearTimeout(qrScanTimer);
  }, [paymentStatus]);

  const handleShowQrCode = () => {
    if (isGeneratingQr) return;
    setIsGeneratingQr(true);
    setPaymentStatus("showing_qr");
    setQrCodeData(
      `SimulatedVNPayPayment|Amount:0|TotalActualAmount:${totalPrice}|Timestamp:${Date.now()}`
    );
    setSnackbar({
      open: true,
      message: "QR Code generated. Simulating scan...",
      type: "info",
    });
  };

  const handleCreateOrderAfterScan = async () => {
    setIsGeneratingQr(false);
    setQrCodeData("");
    setIsSubmittingOrder(true);

    const orderDetails = cart.map((item) => ({
      productId: item.productID,
      quantity: item.quantity,
      price: item.price,
    }));

    const orderData = {
      totalPrice: totalPrice,
      paymentMethod: "Credit Card",
      customerContact: "user@example.com",
      restaurantId: resId,
      tableId: tableId,
      orderType: isDineIn ? "Dine-in" : "Takeaway",
    };


    try {
      const response = await orderApi.createOrder(
        JSON.parse(localStorage.getItem("currentOrder")) || "",
        orderData,
        orderDetails
      );
      if (response) {
        setSnackbar({
          open: true,
          message: "Payment confirmed! Your order is placed.",
          type: "success",
        });
        setPaymentStatus("success");
        setTimeout(() => {
          navigate(`/invoice`, { state: { orderData: response } });
        }, 1500);
      } else {
        throw new Error(
          response?.error || "Unknown error during order creation"
        );
      }
    } catch (error) {
      console.error("Error creating order after scan:", error);
      setSnackbar({
        open: true,
        message:
          "Failed to create order: " +
          (error.response?.data?.message || error.message),
        type: "error",
      });
      setPaymentStatus("error");
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <div className="text-center p-4 bg-blue-50 rounded-md">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">
        VNPay Payment
      </h3>
      <p className="mb-2">
        You will be redirected to VNPay to complete your payment.
      </p>

      {/* Hiển thị nút khi ở trạng thái idle hoặc có lỗi */}
      {(paymentStatus === "idle" || paymentStatus === "error") && (
        <div className="flex flex-col md:flex-row items-center justify-center p-4 gap-4">
          <img
            src={vnpayLogo}
            alt="vnpay logo"
            className="w-20 object-contain"
          />
          <button
            onClick={handleShowQrCode}
            disabled={isGeneratingQr || isSubmittingOrder}
            className={`bg-blue-500 text-white py-2 px-4 rounded transition-colors duration-300
            ${
              isGeneratingQr || isSubmittingOrder
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
          >
            Proceed to VNPAY
          </button>
        </div>
      )}

      {paymentStatus === "showing_qr" && qrCodeData && (
        <div className="flex flex-col items-center mt-4 p-4 bg-white shadow-md rounded-lg animate-fade-in-up">
          <h4 className="text-xl font-bold text-green-700 mb-3">
            Scan This QR
          </h4>
          <QRCodeCanvas
            value={qrCodeData}
            size={180}
            level={"H"}
            className="border-2 border-gray-200 p-1 rounded-md"
          />
          <p className="text-gray-600 mt-3 text-sm">
            Simulating payment... QR will disappear in 6 seconds.
          </p>
          <div className="mt-4 w-full h-2 bg-blue-200 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full animate-pulse-width"></div>
          </div>
        </div>
      )}

      {/* Hiển thị thông báo thành công */}
      {paymentStatus === "success" && (
        <div className="flex flex-col items-center mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fade-in">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-600 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-bold text-lg">Payment Successful!</p>
          <p className="text-sm">Your order has been confirmed.</p>
        </div>
      )}

      {paymentStatus === "error" && (
        <div className="flex flex-col items-center mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-fade-in">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-600 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-bold text-lg">Payment Failed!</p>
          <p className="text-sm">Please try again or choose another method.</p>
        </div>
      )}
    </div>
  );
};

export default VNPayInfo;
