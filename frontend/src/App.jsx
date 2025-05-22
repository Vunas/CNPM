import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CustomerRouter from "./router/CustomerRouter";
import AdminRouter from "./router/AdminRouter";
import Page404 from "./pages/Page404";
import AOS from "aos";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
    return () => {};
  }, []);
  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/*" element={<CustomerRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />

        <Route path="*" element={<Page404 href={"/admin"} />} />
      </Routes>
    </div>
  );
}
