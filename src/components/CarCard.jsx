import React from "react";
import { FaCar, FaCheckCircle, FaGasPump, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  const {
    _id,
    carModel,
    dailyRentalPrice,
    availability,
    vehicleRegistrationNumber,
    features,
    description,
    bookingCount,
    imageUrl,
    location,
  } = car;

  return (
    <div className="max-w-sm mx-auto rounded-lg shadow-lg overflow-hidden bg-white border border-gray-200">
      {/* Car Image with Price Badge */}
      <div className="relative">
        <img
          src={imageUrl} // Updated with your image URL
          alt="Car"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-[#FF4C30] text-white text-sm font-bold px-4 py-1 rounded-full shadow-md">
          $49/Day
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center text-sm mb-6">
            <FaCheckCircle
              className={`inline-block mr-2 ${
                availability ? "text-green-500" : "text-red-500"
              }`}
            />
            <span
              className={`text-xl font-semibold ${
                availability ? "text-green-500" : "text-red-500"
              }`}
            >
              {availability ? "Available" : "Not Available"}
            </span>
          </div>
        </div>

        {/* Car Title */}
        <h2 className="text-xl font-semibold text-gray-800">{carModel}</h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2">
          Komodo Island is one of the only places in the world where you can
          spot...
        </p>

        {/* Features */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-700 text-sm">
            <FaUserFriends className="mr-2 text-[#FF4C30]" />
            Seat Capacity: 4 People
          </div>
          <div className="flex items-center text-gray-700 text-sm">
            <FaCar className="mr-2 text-[#FF4C30]" />
            Total Doors: 4 Doors
          </div>
          <div className="flex items-center text-gray-700 text-sm">
            <FaGasPump className="mr-2 text-[#FF4C30]" />
            Fuel Tank: 450 Liters
          </div>
        </div>

        {/* Button */}
        <div className="mt-5">
          {/* Button */}
          <div className="mt-5">
            <Link to={`/carDetails/${_id}`}>
              <button className="w-full bg-white text-black border border-black font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 hover:bg-[#FF4C30] hover:text-white">
                Rent Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
