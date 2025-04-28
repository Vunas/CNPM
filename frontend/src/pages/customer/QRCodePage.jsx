import React from "react";
import { QRCodeSVG } from "qrcode.react";

function QRCodePage() {
  const restaurantId = "r-001";
  const restaurantTableId = "t-001";
  const orderUrlWithParams = `http://localhost:5173/order?restaurantid=${restaurantId}&restauranttableid=${restaurantTableId}`;

  return (
    <div>
      <QRCodeSVG value={orderUrlWithParams} size={256} level="H" />
    </div>
  );
}

export default QRCodePage;
