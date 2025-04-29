import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderListPage from "./pages/OrderListPage";
import Order from "./pages/Order";
import Employee from "./pages/Employee"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderListPage />} />
        <Route path="/order" element={<Order />} />
        <Route path="/employee" element={<Employee />} />
      </Routes>
    </Router>
  );
}