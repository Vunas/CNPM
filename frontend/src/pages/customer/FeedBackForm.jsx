import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import feedbackApi from "../../api/feedbackApi";

const FeedbackForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("orderid");
  const returnUrl = `/home`;

  const [feedbackData, setFeedbackData] = useState({
    customerName: "",
    email: "",
    message: "",
    orderId: orderId || "",
    rating: 5,
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFeedbackData((prevData) => ({
      ...prevData,
      orderId: orderId || "",
    }));
  }, [orderId]);

  const handleChange = (e) => {
    setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });

    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleRatingChange = (event) => {
    setFeedbackData({ ...feedbackData, rating: parseInt(event.target.value) });
    setErrorMessage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (feedbackData.rating === 0) {
      setErrorMessage("Please select a rating.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await feedbackApi.create(feedbackData);
      setSuccessMessage("Thank you for your feedback!");

      setFeedbackData({
        customerName: "",
        email: "",
        message: "",
        orderId: orderId || "",
        rating: 0,
      });

      setTimeout(() => {
        navigate(returnUrl);
      }, 2000);
    } catch (err) {
      console.error("Failed to send feedback:", err);
      setErrorMessage("Failed to send feedback. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    navigate(returnUrl);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <React.Fragment key={i}>
          <input
            type="radio"
            name="rating"
            value={i}
            id={`star${i}`}
            className="hidden"
            checked={feedbackData.rating === i}
            onChange={handleRatingChange}
            required={i === 1}
          />
          <label
            htmlFor={`star${i}`}
            className={`cursor-pointer text-2xl ${
              i <= feedbackData.rating ? "text-yellow-400" : "text-gray-300"
            } hover:text-yellow-400`}
          >
            ★
          </label>
        </React.Fragment>
      );
    }
    return stars;
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Back button */}
        <button
          onClick={handleGoBack}
          className="text-gray-700 hover:text-black mr-2 flex items-center mb-4 transition duration-200 ease-in-out"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Feedback Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex space-x-2 mt-2">{renderStars()}</div>
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              required
              value={feedbackData.customerName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={feedbackData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@example.com"
            />
          </div>

          {/* Message (Content) */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Feedback
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="4"
              value={feedbackData.message}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Share your thoughts here..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <p className="text-green-600 text-center mt-4 font-semibold">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-red-600 text-center mt-4 font-semibold">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
