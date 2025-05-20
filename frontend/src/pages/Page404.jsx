import React from "react";
import notFound from "../assets/gif/notFound.json";
import Lottie from "lottie-react";

const Page404 = ({ href }) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen font-arvo fixed inset-0 z-50"
      // style={{ backgroundColor: "rgb(253, 227, 253)" }}
    >
      <div
        className="relative w-96 h-96 sm:h-[500px] sm:w-[600px]  mb-2"

      >
        <Lottie animationData={notFound} play={true} loop={true} />
      </div>

      <div className="text-center mt-10">
        <h2 className="text-4xl font-bold text-gray-700">Oops! You're lost</h2>
        <p className="text-lg text-gray-600 mt-3">
          The page you're looking for can't be found.
        </p>
        <a
          href={href || "/"}
          className="mt-6 inline-block px-6 py-3 rounded-lg hover:bg-green-200 transition-transform transform hover:scale-105 shadow-lg"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Page404;
