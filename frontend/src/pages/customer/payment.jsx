import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import orderApi from "../../api/orderApi";
import { useLocation } from "react-router-dom";

function Payment({setSnackbar}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { cart, restaurantId, restaurantTableId } = location.state || {};

  const handleBack = () => {
    navigate("/order");
  };

  const handlePay = async () => {
    console.log(restaurantId + "aaaaaaaaaaaaaaaaa                  "   +restaurantTableId);
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
      paymentMethod: paymentMethod,
      customerContact: "user@example.com",
      restaurantId: restaurantId,
      tableId: restaurantTableId,
    };

    try {
      console.log(orderData);
      const response = await orderApi.createOrder(orderData, orderDetails);
      console.log(response)

      if (response && response.success) {
        console.log("Order created successfully:", response);
        setSnackbar({ open: true, message: "Order created successfully:!", type: "success" });
        navigate(`/order?restaurantid=${restaurantId}&restauranttableid=${restaurantTableId}`, {
          state: { orderId: response.orderId },
        });
      } else {
        console.error(
          "Failed to create order:",
          response ? response.error : "Unknown error"
        );
        setSnackbar({
          open: true,
          message: "Failed to create order:",
          type: "error",
        });
        setErrorMessage(
          response
            ? response.error
            : "Failed to create order. Please try again."
        );
      }
    } catch (error) {
      console.error("Error sending order request:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    console.log(cart);
    navigate("/order");
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "cardNumber":
        setCardNumber(value);
        break;
      case "expiryDate":
        setExpiryDate(value);
        break;
      case "cvv":
        setCvv(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className=" mx-auto mt-8 p-6  rounded-md ">
      {/* Header */}
      <div className="flex items-center mb-5">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <span className="mr-2">&larr;</span>
          <span>Back</span>
        </button>
        <div className="flex-grow text-center font-semibold text-lg">
          PAYMENT
        </div>
        <div className="text-sm text-gray-600">Home &gt; Payment</div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-md p-4 shadow-sm">
        {/* Payment Details */}
        <div className="flex justify-between items-start mb-4 p-4 bg-gray-50 rounded-md">
          <div>
            <div className="font-semibold">
              Business name
              <span className="text-blue-500 text-sm cursor-pointer">
                (expand)
              </span>
            </div>
            <div className="text-gray-600 text-sm">{cart?.length} item(s)</div>
          </div>
          <div className="font-semibold text-lg">
            {cart
              ?.reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toFixed(2)}{" "}
            NOK <span className="text-gray-600 text-sm">inc. VAT</span>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Payment Methods */}
        <div className="mb-4">
          <div className="mb-2">
            <input
              type="radio"
              id="creditCard"
              name="paymentMethod"
              value="creditCard"
              className="mr-2"
              checked={paymentMethod === "creditCard"}
              onChange={handlePaymentMethodChange}
            />
            <label
              htmlFor="creditCard"
              className="flex items-center cursor-pointer"
            >
              <span className="mr-2">Credit Card</span>
              <span className="text-gray-600 text-sm">- credit or debit</span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Visa_brandcard.svg"
                alt="Visa"
                className="w-8 h-auto ml-2"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
                className="w-8 h-auto ml-1"
              />
            </label>
          </div>

          <div className="mb-2">
            <input
              type="radio"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              className="mr-2"
              checked={paymentMethod === "paypal"}
              onChange={handlePaymentMethodChange}
            />
            <label
              htmlFor="paypal"
              className="flex items-center cursor-pointer"
            >
              <span className="mr-2">PayPal</span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
                className="w-16 h-auto ml-2"
              />
            </label>
          </div>

          <div className="mb-2">
            <input
              type="radio"
              id="cashOnDelivery"
              name="paymentMethod"
              value="cashOnDelivery"
              className="mr-2"
              checked={paymentMethod === "cashOnDelivery"}
              onChange={handlePaymentMethodChange}
            />
            <label
              htmlFor="cashOnDelivery"
              className="flex items-center cursor-pointer"
            >
              <span className="mr-2">Cash on Delivery</span>
              <span className="text-gray-600 text-sm">
                - Pay when you receive your order
              </span>
            </label>
          </div>
        </div>

        {/* Credit Card Form (Conditional Rendering) */}
        {paymentMethod === "creditCard" && (
          <div className="mb-4 p-4 bg-white rounded-md border">
            <div className="mb-3">
              <label
                htmlFor="cardNumber"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Card number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={cardNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex">
              <div className="mr-2 w-1/2">
                <label
                  htmlFor="expiryDate"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  MM/YY
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={expiryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ml-2 w-1/2 relative">
                <label
                  htmlFor="cvv"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={cvv}
                  onChange={handleInputChange}
                />
                <span className="absolute right-3 top-8 text-blue-500 cursor-help">
                  ⓘ
                </span>
              </div>
            </div>
          </div>
        )}

        {/* PayPal Instructions (Conditional Rendering) */}
        {paymentMethod === "paypal" && (
          <div className="mb-4 p-4 bg-white rounded-md border">
            <p className="mb-2">
              You will be redirected to PayPal to complete your payment.
            </p>
            <button
              onClick={() => {
                // Logic chuyển hướng đến trang PayPal
                console.log("Redirecting to PayPal...");
                // Trong thực tế, bạn sẽ mở một cửa sổ mới hoặc thay đổi window.location.href
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Proceed to PayPal
            </button>
          </div>
        )}

        {/* Cash on Delivery Instructions (Conditional Rendering) */}
        {paymentMethod === "cashOnDelivery" && (
          <div className="mb-4 p-4 bg-white rounded-md border">
            <p className="mb-2">
              Please confirm your order. You will pay the total amount upon
              delivery.
            </p>
          </div>
        )}

        {/* Payment Button */}
        <button
          onClick={handlePay}
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-3 rounded-md w-full focus:outline-none focus:shadow-outline ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Processing..."
            : `Pay NOK ${cart
                ?.reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}`}
        </button>

        {/* Cancel Payment Button */}
        <button
          onClick={handleCancel}
          className="w-full text-center py-3 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          Cancel payment
        </button>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-xs">
          <span>Powered by</span> <span className="font-semibold">Dinero</span>{" "}
          <span className="font-bold">radical</span>
          <a href="#" className="ml-2 text-blue-500">
            Terms
          </a>
        </div>
      </div>
    </div>
  );
}

export default Payment;
