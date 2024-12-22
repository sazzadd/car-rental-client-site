import React from "react";
import { FaCar } from "react-icons/fa";

const Banner = () => {
  return (
    <div
      className="relative w-full h-[500px] bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/MSfzd1s/11.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold shadow-lg drop-shadow-md">
          Fuel Your Dreams with Action!
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-xl shadow-md drop-shadow-md">
          Experience premium and exotic cars like never before. Your journey
          begins here!
        </p>
        <button
          className="mt-6 px-6 py-3 bg-[#FF4C30] hover:bg-[#FF2200] text-white rounded-lg shadow-lg text-lg font-semibold flex items-center gap-2 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
          onClick={() => (window.location.href = "/available-cars")}
        >
          <FaCar className="text-xl" />
          View Available Cars
        </button>
      </div>
    </div>
  );
};

export default Banner;
