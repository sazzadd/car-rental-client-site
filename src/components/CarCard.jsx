import React from "react";
import { FaArrowRight, FaCarSide, FaSuitcaseRolling, FaCalendarAlt } from "react-icons/fa";

const CarCard = ({ car }) => {
  const {
    carModel,
    dailyRentalPrice,
    availability,
    image,
    category,
    passenger,
    doors,
    bags,
    transmission,
  } = car;

  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
      {/* Car Image */}
      <div className="relative w-full h-56">
        <img
          src={image}
          alt={carModel}
          className="w-full h-full object-cover rounded-t-lg"
        />
        {/* Semi-transparent Overlay for Better Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40"></div>
        <div className="absolute top-2 left-2 z-10">
          {/* Availability Badge */}
          <span
            className={`px-4 py-1 text-xs font-semibold rounded-full ${availability ? "bg-gradient-to-r from-[#FF4C30] to-[#FF8A57] text-white" : "bg-gradient-to-r from-gray-400 to-gray-600 text-white"}`}
          >
            {availability ? "Available" : "Not Available"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Category */}
        <span className="block text-sm font-semibold text-gray-500 uppercase">{category}</span>

        {/* Car Model */}
        <h3 className="text-2xl font-semibold text-gray-800 hover:text-[#FF4C30] transition-all duration-200">
          {carModel}
        </h3>

        {/* Details */}
        <div className="flex flex-wrap gap-6 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <FaCarSide className="text-gray-500" /> {doors} Doors
          </div>
          <div className="flex items-center gap-1">
            <FaSuitcaseRolling className="text-gray-500" /> {bags} Bags
          </div>
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-gray-500" /> Posted: 22/12/2024
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 bg-gray-50 border-t flex items-center justify-between space-x-4">
        <span className="text-2xl font-bold text-gray-800">${dailyRentalPrice}/day</span>
        <button className="flex items-center gap-2 bg-gradient-to-r from-[#FF4C30] to-[#FF8A57] text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-[#FF4C30] focus:ring-offset-2">
          <span className="text-lg font-semibold">Book Now</span>
          <FaArrowRight className="transition-transform duration-200 transform hover:translate-x-2" />
        </button>
      </div>
    </div>
  );
};

export default CarCard;
