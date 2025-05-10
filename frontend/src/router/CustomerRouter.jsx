import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Order from "../pages/Order";
import Payment from "../pages/customer/payment";
import QRCodePage from "../pages/customer/QRCodePage";
import Homepage from "../pages/customer/homepage";
import Home from "../pages/customer/home";

const CustomerRouter = () => {
  const [snackBar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const handleSnackbarClose = () => setSnackbar({ ...snackBar, open: false });

  return (
    <div className="flex">
      {/* Nội dung chính */}
      <div className="flex-1 p-4">
        <Routes>
          <Route path="order" element={<Order replace />} />
          <Route
            path="payment"
            element={<Payment setSnackbar={setSnackbar} />}
          />
          <Route path="qrcodepage" element={<QRCodePage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>

      <Snackbar
        open={snackBar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackBar.type}
          variant="filled"
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomerRouter;
