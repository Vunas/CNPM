import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Snackbar, Alert } from "@mui/material";
import { login } from "../../api/auth";

const clientId =
  "1041605160701-9q21rn06djjtsdlck5ks2mur96eckti0.apps.googleusercontent.com";

const LoginAdmin = ({ onLoginSuccess }) => {
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
      const data = await login(username, password);
      onLoginSuccess(data.token);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response
          ? `Lỗi: ${err.response.data}`
          : "Đăng nhập thất bại. Vui lòng thử lại!",
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Đăng nhập dành cho Admin
          </h1>
          <p className="text-gray-600 mb-6">
            Sử dụng tài khoản Google hoặc nhập thông tin để đăng nhập.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Đăng nhập
            </button>
          </form>
          <div className="my-4 text-gray-500">Hoặc</div>
          <GoogleLogin
            // onSuccess={(credentialResponse) =>
            //   handleGoogleLogin(credentialResponse)
            // }
            onError={() =>
              setSnackbar({
                open: true,
                message: "Lỗi đăng nhập Google.",
                severity: "error",
              })
            }
          />
          <p className="text-gray-500 mt-4 text-sm">
            Nếu gặp vấn đề khi đăng nhập, hãy liên hệ với bộ phận hỗ trợ.
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
