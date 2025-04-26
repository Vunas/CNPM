import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderListPage from "./pages/OrderListPage";
import Order from "./pages/Order";
import { getProfile } from "./api/auth";
import LoginAdmin from "./pages/admin/LoginAdmin";

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
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
        <Route path="/" element={<OrderListPage />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </Router>
  );
}
