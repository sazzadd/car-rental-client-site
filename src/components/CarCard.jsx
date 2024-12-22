import React from "react";
import {
  FaArrowRight,
  FaCarSide,
  FaCog,
  FaSuitcaseRolling,
  FaUserFriends,
} from "react-icons/fa";

const CarCard = ({ car }) => {
  const {
    carModel,
    dailyRentalPrice,
    availability,
    vehicleRegistrationNumber,
    features,
    description,
    bookingCount,
    image,
    location,
    category,
    passenger,
    doors,
    bags,
    transmission,
  } = car;

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300">
      {/* Car Image */}
      <img src={image} alt={carModel} className="w-full h-40 object-cover" />

      <div className="p-4">
        {/* Availability Badge */}
        <span
          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
            availability
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {availability ? "Available" : "Not Available"}
        </span>

        {/* Category */}
        <span className="block mt-2 text-sm font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {category}
        </span>

        {/* Model */}
        <h3 className="text-lg font-semibold text-gray-800 mt-2">
          {carModel}
        </h3>

        {/* Details */}
        <div className="flex items-center justify-between text-gray-600 text-sm mt-4">
          <div className="flex items-center gap-1">
            <FaUserFriends /> {passenger} Passenger
          </div>
          <div className="flex items-center gap-1">
            <FaCarSide /> {doors} Door
          </div>
        </div>
        <div className="flex items-center justify-between text-gray-600 text-sm mt-2">
          <div className="flex items-center gap-1">
            <FaSuitcaseRolling /> {bags}
          </div>
          <div className="flex items-center gap-1">
            <FaCog /> {transmission}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t flex items-center justify-between">
        <span className="text-lg font-bold text-gray-800">
          ${dailyRentalPrice}/day
        </span>
        <button className="bg-[#ff4c30f5] flex items-center text-white p-2 rounded-full hover:bg-orange-600 transition">
          <span className="mr-1">Book Now</span>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CarCard;
