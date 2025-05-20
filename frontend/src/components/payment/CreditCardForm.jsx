import React from "react";

function CreditCardForm({ cardNumber, expiryDate, cvv, onChange }) {
  return (
    <div className="mb-4 p-4 bg-white rounded-md border">
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Card number
        </label>
        <input
          type="text"
          name="cardNumber"
          value={cardNumber}
          onChange={onChange}
          className="shadow border rounded w-full py-2 px-3"
          placeholder="XXXX XXXX XXXX XXXX"
        />
      </div>
      <div className="flex">
        <div className="mr-2 w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            MM/YY
          </label>
          <input
            type="text"
            name="expiryDate"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={onChange}
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>
        <div className="ml-2 w-1/2 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            CVV
          </label>
          <input
            type="text"
            name="cvv"
            value={cvv}
            onChange={onChange}
            className="shadow border rounded w-full py-2 px-3"
            placeholder="XXX"
          />
        </div>
      </div>
    </div>
  );
}

export default CreditCardForm;
