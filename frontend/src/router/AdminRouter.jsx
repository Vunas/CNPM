import React from "react";
import { Routes, Route } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AdminRoutes = ({ snackBarLogin, setSnackbarLogin }) => {
  const handleSnackbarClose = () =>
    setSnackbarLogin({ ...snackBarLogin, open: false });

  return (
    <div className="flex">
      {/* Nội dung chính */}
      <div className="flex-1 p-4">
        <Routes></Routes>
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
