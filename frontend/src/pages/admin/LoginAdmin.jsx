import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Snackbar, Alert } from "@mui/material";
import { login, loginWithGoogle } from "../../api/auth";

const clientId = import.meta.env.GOOGLE_CLIENT_ID;

const LoginAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message
          ? `Error: ${err.message}`
          : "Login failed. Please try again.!",
        severity: "error",
      });
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;

      await loginWithGoogle(idToken);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message
          ? `Error: ${err.message}`
          : "Google login failed. Please try again!",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prevSnackbar) => ({ ...prevSnackbar, open: false }));
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Login</h1>
          <p className="text-gray-600 mb-6">
            Use your Google account or enter your credentials to log in.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
          <div className="my-4 text-gray-500">Or</div>
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              handleGoogleLogin(credentialResponse)
            }
            onError={() =>
              setSnackbar({
                open: true,
                message: "Google login error.",
                severity: "error",
              })
            }
          />
          <p className="text-gray-500 mt-4 text-sm">
            If you encounter any issues logging in, please contact support.
          </p>
        </div>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginAdmin;
