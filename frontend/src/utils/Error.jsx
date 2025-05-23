import Lottie from "lottie-react";
import ErrorAnimation from "../assets/gif/error.json";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "aos/dist/aos.css";

const Error = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-arvo fixed inset-0 z-50">
      <div
        className="relative w-96 h-96 sm:h-[500px] sm:w-[600px] mb-2"
        data-aos="fade-up"
        data-aos-duration="400"
      >
        <Lottie animationData={ErrorAnimation} play={true} loop={true} />
      </div>

      <div
        className="text-center mt-10"
        data-aos="zoom-in"
        data-aos-delay="900"
      >
        <h2 className="text-xl sm:text-4xl font-bold text-red-600 flex gap-2 justify-center items-center">
          {" "}
          <ErrorOutlineIcon
            sx={{ fontSize: { xs: 40, sm: 50, md: 60 } }}
            className="relative"
          />
          Oops! An error has occurred
        </h2>
        <p className="text-lg text-gray-600 mt-3 text-wrap">
          {error || "An unexpected error has occurred on the website."}
        </p>
      </div>
    </div>
  );
};

export default Error;
