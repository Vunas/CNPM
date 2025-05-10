import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import OrderListPage from "./pages/OrderListPage";
import Order from "./pages/Order";
import CustomerRouter from "./router/CustomerRouter";
import AdminRouter from "./router/AdminRouter";
import Employee from "./pages/Employee";
import Page404 from "./pages/Page404";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Router>
        <Routes>
          <Route path="/orderlistpage" element={<OrderListPage />} />
          <Route path="/" element={<Navigate to="/cus/qrcodepage" />} />
          <Route path="/cus/*" element={<CustomerRouter />} />
          <Route path="/admin/*" element={<AdminRouter />} />

          <Route path="/order" element={<Order />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="*" element={<Page404 href={"/admin"} />} />
        </Routes>
      </Router>
    </div>
  );
}
