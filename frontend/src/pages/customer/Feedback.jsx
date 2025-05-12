import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Rating } from "@mui/material";
import feedbackApi from "../../api/feedbackApi";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function FeedbackSender() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("orderid");
  const restaurantTableId = searchParams.get("restauranttableid");
  const restaurantId = searchParams.get("restaurantid");
  const returnUrl = `/homepage?restaurantid=${restaurantId}&restauranttableid=${restaurantTableId}`;

  const [feedback, setFeedback] = useState({
    customerName: "",
    email: "",
    message: "",
    orderId: orderId,
    rating: 5,
  });

  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (event, newValue) => {
    setFeedback({ ...feedback, rating: newValue });
  };

  const handleSubmit = async () => {
    try {
      await feedbackApi.create(feedback);
      setSuccess(true);
      setFeedback({ customerName: "", email: "", message: "", orderId: "o-001", rating: 5 });
      homepageNavigate();
    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
  };

  function homepageNavigate() {
    navigate(returnUrl);
  }

  return (
    <Paper className="p-6 max-w-lg mx-auto mt-10 shadow-lg">
      <button onClick={() => homepageNavigate()} className="text-gray-700 hover:text-black mr-2">
        ← Back
      </button>
      <Typography variant="h5" className="mb-4 font-bold text-center">Gửi phản hồi</Typography>
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
      <Typography variant="h6" className="mb-2">Đánh giá</Typography>
      <Rating name="rating" value={feedback.rating} onChange={handleRatingChange} />
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} className="mt-4">
        Gửi phản hồi
      </Button>
      {success === true && <p className="text-green-600 mt-2">Gửi thành công!</p>}
      {success === false && <p className="text-red-600 mt-2">Gửi thất bại!</p>}
    </Paper>
  );
}