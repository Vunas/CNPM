import React, { useState } from "react";
import vnpayLogo from "../../assets/VNPAY.png";
import orderApi from "../../api/orderApI";


function VNPayInfo({ cart, returnUrl, resId, tableId, setSnackbar }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleVNPayRedirect(orderId, amount, returnUrl) {
    console.log("Redirecting to VNPay...");
    // window.location.href = "https://vnpay.vn/payment-link";
    const response = await fetch(`http://localhost:3000/api/vnpay/create?orderId=${orderId}&amount=${amount}&returnUrl=${encodeURIComponent(returnUrl)}`)

    if (!response.ok) {
      const text = await response.text(); // Get HTML/text instead of JSON
      throw new Error(`Server error: ${response.status}\n${text}`);
    }
    const data = await response.json();
    if (data.paymentUrl) {
      window.location.href = data.paymentUrl; // Redirect to VNPAY
    } else {
      alert('Failed to create payment URL');
    }
  };

  const handlePay = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    const orderDetails = cart.map((item) => ({
      productId: item.productID,
      quantity: item.quantity,
      price: item.price,
    }));

    const orderData = {
      totalPrice: cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      paymentMethod:'Vnpay',
      customerContact: "user@example.com",
      restaurantId: resId,
      tableId: tableId,
    };

    try {
      const response = await orderApi.createOrder(orderData, orderDetails);
      if (response) {
        console.log(response)
        setSnackbar({
          open: true,
          message: "Order created successfully!",
          type: "success",
        });
        handleVNPayRedirect(response.orderId,response.totalPrice,returnUrl)
      } else {
        throw new Error(response?.error || "Unknown error");
      }
    } catch (error) {
      setErrorMessage(error.message || "Unexpected error. Try again.");
      setSnackbar({
        open: true,
        message: "Failed to create order",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="mb-4 p-4 bg-white rounded-md border">
      <p className="mb-2">
        You will be redirected to VNPay to complete your payment.
      </p>
      <img src={vnpayLogo} alt="vnpay" className="w-20 mb-3" />
      <button
        onClick={handlePay}
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Proceed to VNPay
      </button>
    </div>
  );
}

export default VNPayInfo;
