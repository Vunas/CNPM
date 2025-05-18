import React from "react";
import notFoundGif from "../assets/gif/notfound.gif";

const Page404 = ({ href }) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen font-arvo fixed inset-0 z-50"
      style={{ backgroundColor: "rgb(253, 227, 253)" }}
    >
      <div
        className="relative w-2/4 h-96 bg-cover bg-center rounded-lg"
        style={{
          backgroundImage: `url(${notFoundGif})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="text-center mt-10">
        <h2 className="text-4xl font-bold text-gray-700">Oops! You're lost</h2>
        <p className="text-lg text-gray-600 mt-3">
          The page you're looking for can't be found.
        </p>
        <a
          href={href || "http://st:5173"}
          className="mt-6 inline-block px-6 py-3 bg-pink-100 text-pink-800 rounded-lg hover:bg-pink-200 transition-transform transform hover:scale-105 shadow-lg"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Page404;
