import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import NavBar from "../components/admin/NavBar/NavBar";
import Account from "../pages/admin/Account";
import LoginAdmin from "../pages/admin/LoginAdmin";
import { getProfile } from "../api/auth";
import Product from "../pages/admin/Product";
import Category from "../pages/admin/Category";
import Page404 from "../pages/Page404";
import Restaurant from "../pages/admin/Restaurant";
import RestaurantTablePage from "../pages/admin/RestaurantTablePage";
import Statistics from "../pages/admin/Statistics";

const AdminRoutes = () => {
  const handleSnackbarClose = () =>
    setSnackbarLogin({ ...snackBarLogin, open: false });
  const [isLogin, setLogin] = useState(false);
  const [snackBarLogin, setSnackbarLogin] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const handleLoginSuccess = async () => {
    setSnackbarLogin({
      open: true,
      message: "Login successfully!",
      type: "success",
    });
    setLogin(true);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await getProfile();
      if (userProfile) {
        setLogin(true);
      }
    };
    fetchProfile();
  }, []);

  if (!isLogin) return <LoginAdmin onLoginSuccess={handleLoginSuccess} />;
  return (
    <div className="flex absolute w-screen h-screen inset-0">
      <NavBar />
      {/* Nội dung chính */}
      <div className="relative flex-1 h-screen overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="account" />} />
          <Route path="account" element={<Account replace />} />
          <Route path="product" element={<Product />} />
          <Route path="category" element={<Category />} />
          <Route path="restaurant" element={<Restaurant />} />
          <Route path="restaurantTable" element={<RestaurantTablePage />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="*" element={<Page404 href={"/admin"} />} />
        </Routes>
      </div>

      <Snackbar
        open={snackBarLogin.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackBarLogin.type}
          variant="filled"
        >
          {snackBarLogin.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminRoutes;
