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
import Employee from "../pages/admin/Employee";
import OrderListPage from "../pages/admin/OrderListPage";
import Feedback from "../pages/admin/FeedBack";
import Order from "../pages/admin/Order";
import TableStatus from "../pages/admin/TableStatus";
import Loading from "../utils/Loading/Loading";

const AdminRoutes = () => {
  const [loading, setLoading] = useState(true);
  const handleSnackbarClose = () =>
    setSnackbarLogin({ ...snackBarLogin, open: false });
  const [user, setUser] = useState(null);
  const [isLogin, setLogin] = useState(false);
  const [snackBarLogin, setSnackbarLogin] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await getProfile();
      if (userProfile) {
        if (localStorage.getItem("login")) {
          localStorage.removeItem("login");
          setSnackbarLogin({
            open: true,
            message: "Login successfully!",
            type: "success",
          });
        }
        setUser(userProfile.account);
        setLogin(true);
      }
    };
    fetchProfile();
    setLoading(false);
  }, []);
  if (loading) return <Loading />;

  if (!isLogin) return <LoginAdmin />;
  if (user && user.role === "Employee") {
    return (
      <div className="flex absolute w-screen h-screen inset-0">
        <Routes>
          {" "}
          <Route path="/" element={<Navigate to="table" />} />
          <Route path="table" element={<TableStatus user={user} />} />
          <Route path="*" element={<Page404 href={"/admin"} />} />
        </Routes>
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
  }
  if (user && user.role === "Kitchen") {
    return (
      <div className="flex absolute w-screen h-screen inset-0">
        <Routes>
          {" "}
          <Route path="/" element={<Navigate to="kitchen" />} />
          <Route path="kitchen" element={<OrderListPage />} />
          <Route path="*" element={<Page404 href={"/admin"} />} />
        </Routes>
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
  }
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
          <Route path="order" element={<Order />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/orderlistpage" element={<OrderListPage />} />
          <Route path="table" element={<TableStatus user={user} />} />
          <Route path="/feedback" element={<Feedback />} />
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
