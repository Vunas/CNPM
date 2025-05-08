import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import feedbackApi from "../api/feedbackApi";

export default function FeedbackSender() {
  const [feedback, setFeedback] = useState({
    customerName: "",
    email: "",
    message: "",
    orderId: "o-001",
  });

  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
    await feedbackApi.create(feedback);
      setSuccess(true);
      setFeedback({ customerName: "", email: "", message: "", orderId: "o-001" });
    } catch (err) {
      setSuccess(false);
    }
  };

  return (
    <Paper className="p-6 max-w-lg mx-auto mt-10 shadow-lg">
      <Typography variant="h5" className="mb-4 font-bold text-center">
        Gửi phản hồi
      </Typography>
      <TextField
        label="Tên khách hàng"
        name="customerName"
        fullWidth
        value={feedback.customerName}
        onChange={handleChange}
        className="mb-4"
      />
      <TextField
        label="Email"
        name="email"
        fullWidth
        value={feedback.email}
        onChange={handleChange}
        className="mb-4"
      />
      <TextField
        label="Nội dung"
        name="message"
        fullWidth
        multiline
        rows={4}
        value={feedback.message}
        onChange={handleChange}
        className="mb-4"
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        Gửi phản hồi
      </Button>
      {success === true && <p className="text-green-600 mt-2">Gửi thành công!</p>}
      {success === false && <p className="text-red-600 mt-2">Gửi thất bại!</p>}
    </Paper>
  );
}
