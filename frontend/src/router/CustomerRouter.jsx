import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Payment from "../pages/customer/payment";
import QRCodePage from "../pages/customer/QRCodePage";
import Homepage from "../pages/customer/homepage";
import Home from "../pages/customer/home";
import About from "../pages/customer/about";
import Contact from "../pages/customer/contact";
import FeedbackSender from "../pages/customer/Feedback";
import Order from "../pages/customer/Order";
import Invoice from "../pages/customer/Invoice";
import FeedbackForm from "../pages/customer/FeedBackForm";

const CustomerRouter = () => {
  const [snackBar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const handleSnackbarClose = () => setSnackbar({ ...snackBar, open: false });

  return (
    <div className="flex w-full h-full">
      {/* Nội dung chính */}
      <div className="flex-1">
        <Routes>
          <Route path="order" element={<Order replace />} />
          <Route
            path="payment"
            element={<Payment setSnackbar={setSnackbar} />}
          />
          <Route path="qrcodepage" element={<QRCodePage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/feedback" element={<FeedbackSender />} /> */}
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/feedback" element={<FeedbackForm />} />
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
