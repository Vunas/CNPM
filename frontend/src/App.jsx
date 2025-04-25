import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderListPage from "./pages/OrderListPage";
import Order from "./pages/Order";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderListPage />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </Router>
  );
}