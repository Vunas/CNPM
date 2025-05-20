import React from "react";

function CashOnDeliveryInfo() {
  return (
    <div className="mb-4 p-4 rounded-md border text-center bg-yellow-50 ">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">
        Cash on Delivery
      </h3>
      <p>Please confirm your order. You will pay upon receiving your order.</p>
      <p className="text-sm text-gray-500 mt-2">
        Please prepare the exact amount for faster service.
      </p>
    </div>
  );
}

export default CashOnDeliveryInfo;
