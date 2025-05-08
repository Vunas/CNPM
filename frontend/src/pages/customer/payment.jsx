import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import orderApi from "../../api/orderApi";
import CreditCardForm from "../../components/payment/CreditCardForm";
import VNPayInfo from "../../components/payment/VNPayInfor";
import CashOnDeliveryInfo from "../../components/payment/CashOnDeliveryInfo";
import { Block } from "@mui/icons-material";

function Payment({ setSnackbar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { cart, restaurantId, restaurantTableId } = location.state || {};

  if (!cart || !restaurantId || !restaurantTableId) {
    return (
      <div className="text-center text-red-600 mt-10">
        Missing required order data. Please return to the order page.
      </div>
    );
  }

  const getButtonStyle = (method) => ({
    display: method === "vnpay" ? "none" : "block",
  });


  const handlePay = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    if (paymentMethod === "creditCard") {
      if (!cardNumber || !expiryDate || !cvv) {
        setErrorMessage("Please fill in all card details.");
        setIsSubmitting(false);
        return;
      }
    }

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
      paymentMethod,
      customerContact: "user@example.com",
      restaurantId,
      tableId: restaurantTableId,
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
        navigate(
          `/order?restaurantid=${restaurantId}&restauranttableid=${restaurantTableId}`,
        );
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNumber") setCardNumber(value);
    else if (name === "expiryDate") setExpiryDate(value);
    else if (name === "cvv") setCvv(value);
  };

  return (
    <div className="mx-auto mt-8 p-6 w-full max-w-[500px] min-h-[450px] bg-white shadow rounded">
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate("/order")}
          className="text-gray-700 hover:text-black mr-2"
        >
          ← Back
        </button>
        <h2 className="text-lg font-bold flex-grow text-center">Payment</h2>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="mb-4 flex justify-between">
          <div>
            <div className="font-semibold">Business Name</div>
            <div className="text-sm text-gray-600">{cart.length} item(s)</div>
          </div>
          <div className="font-bold text-lg">
            {cart.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2)} NOK
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-3">
            {errorMessage}
          </div>
        )}

        {/* Payment method selection */}
        <div className="mb-4">
          <label className="flex items-center mb-2">
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === "creditCard"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Credit Card
          </label>

          <label className="flex items-center mb-2">
            <input
              type="radio"
              name="paymentMethod"
              value="vnpay"
              checked={paymentMethod === "vnpay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            VNPay
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="cashOnDelivery"
              checked={paymentMethod === "cashOnDelivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Cash on Delivery
          </label>
        </div>

        {/* Conditional forms */}
        {paymentMethod === "creditCard" && (
          <CreditCardForm
            cardNumber={cardNumber}
            expiryDate={expiryDate}
            cvv={cvv}
            onChange={handleInputChange}
          />
        )}
        {paymentMethod === "vnpay" && (
          <VNPayInfo 
            cart={cart} 
            returnUrl={`/order?restaurantid=${restaurantId}&restauranttableid=${restaurantTableId}`} 
            resId = {restaurantId}
            TableId = {restaurantId}
            setSnackbar={setSnackbar}
          />
        )}

        {paymentMethod === "cashOnDelivery" && <CashOnDeliveryInfo />}

        <button
          onClick={handlePay}
          disabled={isSubmitting}
          className={`w-full py-3 mt-2 text-white rounded ${
            isSubmitting ? "bg-green-300" : "bg-green-500 hover:bg-green-600"
          }`}
          style={getButtonStyle(paymentMethod)}
        >
          {isSubmitting ? "Processing..." : "Confirm & Pay"}
        </button>
      </div>
    </div>
  );
}

export default Payment;
