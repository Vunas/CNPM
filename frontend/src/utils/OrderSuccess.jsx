import { useEffect } from "react";
import Lottie from "lottie-react";
import orderSucceed from "../assets/gif/order-success.json";
import { useNavigate } from "react-router-dom";
import { Celebration } from "@mui/icons-material";

const OrderSuccess = ({ response }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(
      () => navigate(`/invoice`, { state: { orderData: response } }),
      6500
    );

    return () => clearTimeout(timer);
  }, [navigate, response]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-screen">
      <div className="rounded-lg p-6 sm:p-8 md:p-10 text-center max-w-md w-full">
        <div className="w-72 h-72 mx-auto mb-6">
          <Lottie animationData={orderSucceed} play={true} loop={false} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-4">
          <Celebration sx={{ fontSize: 60 }} /> Order Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Your order has been successfully processed. Thank you for shopping!
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
