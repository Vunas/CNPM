import React from "react";
import vnpayLogo from "../../assets/VNPAY.png";

function VNPayInfo() {
  const handleVNPayRedirect = () => {
    console.log("Redirecting to VNPay...");
    // window.location.href = "https://vnpay.vn/payment-link";
  };

  return (
    <div className="mb-4 p-4 bg-white rounded-md border">
      <p className="mb-2">
        You will be redirected to VNPay to complete your payment.
      </p>
      <img src={vnpayLogo} alt="vnpay" className="w-20 mb-3" />
      <button
        onClick={handleVNPayRedirect}
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Proceed to VNPay
      </button>
    </div>
  );
}

export default VNPayInfo;
