import React from "react";
import { FaCar } from "react-icons/fa";

const Banner = () => {
  return (
    <div
      className="relative w-full h-[600px] bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/MSfzd1s/11.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide drop-shadow-lg animate-fade-in">
          Fuel Your Dreams with Action!
        </h1>
        <p className="mt-6 text-lg md:text-2xl max-w-2xl font-medium drop-shadow-md animate-slide-up">
          Drive premium and exotic cars like never before. Start your journey today and redefine the road!
        </p>
        <button
          className="mt-8 px-8 py-4 bg-[#FF4C30] hover:bg-[#FF2200] text-white rounded-full shadow-xl text-lg font-semibold flex items-center gap-3 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl animate-bounce-on-hover"
          onClick={() => (window.location.href = "/available-cars")}
        >
          <FaCar className="text-2xl" />
          View Available Cars
        </button>
      </div>
    </div>
  );
};

export default Banner;
