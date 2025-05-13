import React, { useState, useEffect, useCallback } from "react";
import feedbackApi from "../../api/feedbackApi";
import Loading from "../../utils/Loading/Loading";
import FeedbackTable from "../../components/admin/Tables/FeedbackTable";
import { Alert, Snackbar } from "@mui/material";

const Feedback = () => {
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  const [snackBar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // Tải danh sách phản hồi
  const fetchData = async () => {
    try {
      const dataFeedback = await feedbackApi.getAll();
      setFeedbacks(Array.isArray(dataFeedback) ? dataFeedback : []);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  // Chức năng xóa phản hồi
  const handleDelete = useCallback(async (id) => {
    try {
      await feedbackApi.delete(id);
      await fetchData();
      setSnackbar({
        open: true,
        message: "Deleted feedback successfully!",
        type: "success",
      });
    } catch (e) {
      setSnackbar({
        open: true,
        message: "Error: " + e.response?.data?.message,
        type: "error",
      });
    }
  }, []);

  // Đóng snackbar
  const handleSnackbarClose = () => setSnackbar({ ...snackBar, open: false });

  if (loading) return <Loading />;
  if (error) {
    return <div>Lỗi khi tải dữ liệu phản hồi: {error.message}</div>;
  }

  return (
    <div className="h-full bg-gray-100 p-4">
      <h1 className="text-2xl m-4 font-bold text-gray-800 mb-6 border-b-4 pb-2">
        Feedback Management
      </h1>

      {/* Bảng hiển thị phản hồi */}
      <FeedbackTable feedbacks={feedbacks} onDelete={handleDelete} />

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackBar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackBar.type}
          variant="filled"
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Feedback;
