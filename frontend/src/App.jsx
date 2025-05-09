import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import OrderListPage from "./pages/OrderListPage";
import Order from "./pages/Order";
import { getProfile } from "./api/auth";
import LoginAdmin from "./pages/admin/LoginAdmin";
import Payment from "./pages/customer/payment";
import QRCodePage from "./pages/customer/QRCodePage";
import CustomerRouter from "./router/CustomerRouter";
import Employee from "./pages/Employee"
import Feedback from "./pages/Feedback"
import Homepage from "./pages/customer/homepage";
export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [snackBarLogin, setSnackbarLogin] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const handleLoginSuccess = async (token) => {
    setToken(token);
    try {
      const userProfile = await getProfile(token);
      setUser(userProfile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  return (
    <Router>
      {/* <div>
        {!token ? (
          <LoginAdmin onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div>
            <h1>Welcome, {user?.username}</h1>
          </div>
        )}
      </div> */}
      <Routes>

        <Route path="/orderlistpage" element={<OrderListPage />} />
        <Route path="/" element={<Navigate to="/qrcodepage" />} />
        <Route path="/*" element={<CustomerRouter snackBar={snackBarLogin} setSnackbar={setSnackbarLogin}/>} />
                
        <Route path="/order" element={<Order />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/feedback" element={<Feedback/>} />
      </Routes>
    </Router>
  );
}
