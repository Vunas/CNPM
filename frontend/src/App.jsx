import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CustomerRouter from "./router/CustomerRouter";
import AdminRouter from "./router/AdminRouter";
import Page404 from "./pages/Page404";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/qrcodepage" />} />
        <Route path="/*" element={<CustomerRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />

        <Route path="*" element={<Page404 href={"/admin"} />} />
      </Routes>
    </div>
  );
}
