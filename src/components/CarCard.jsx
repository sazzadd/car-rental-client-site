import { parse } from "date-fns";
import React from "react";
import {
  FaCarSide,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
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
    submissionDate,
    submissionTime,
    count,
  } = car;

  // Combine the submission date and time into a single string and parse it
  const submissionDateTime = `${submissionDate} ${submissionTime}`;
  const parsedDate = parse(
    submissionDateTime,
    "dd/MM/yyyy hh:mm:ss a",
    new Date()
  );

  // Get the exact distance from now including hours, minutes, and seconds
  const now = new Date();
  const diffInSeconds = Math.floor((now - parsedDate) / 1000); // Total seconds difference

  const hours = Math.floor(diffInSeconds / 3600); // Calculate hours
  const minutes = Math.floor((diffInSeconds % 3600) / 60); // Calculate minutes
  const seconds = diffInSeconds % 60; // Calculate seconds

  // Construct the time difference string
  const timeAgo = `${hours} hours, ${minutes} minutes`;

  return (
    <div className="max-w-sm mx-auto rounded-lg h-full shadow-lg overflow-hidden flex flex-col bg-white border border-gray-200 transform transition-transform duration-300 hover:scale-105">
      {/* Car Image with Price Badge */}
      <div className="relative">
        <img
          src={imageUrl} // Updated with your image URL
          alt="Car"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-[#FF4C30] text-white text-sm font-bold px-4 py-1 rounded-full shadow-md">
          ${dailyRentalPrice}/Day
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        {/* Availability */}
        <div className="flex items-center mb-2">
          <div className="flex items-center text-sm mb-2">
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
              {availability ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>

        {/* Car Title */}
        <h2 className="text-xl font-semibold text-gray-800">{carModel}</h2>

        {/* Description */}

        <p className="text-gray-500 text-sm mt-2">
          {" "}
          {description.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </p>

        {/* Location */}
        <div className="mt-4 flex items-center text-sm text-gray-600">
          <FaMapMarkerAlt className="mr-2 text-[#FF4C30]" />
          <p className="text-gray-500 text-sm">{location}</p>
        </div>

        {/* Posted Time */}
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <FaClock className="mr-2 text-[#FF4C30]" />
          <span>Posted {timeAgo} ago</span>
        </div>

        {/* Total Rented */}
        <div className="mt-4 flex items-center text-sm text-gray-600">
          <FaCarSide className="mr-2 text-[#FF4C30]" />
          <span className="text-[18px] bold">Total Rented: {count}</span>
        </div>

        {/* Button */}

        <div className="mt-5">
          <Link to={`/carDetails/${_id}`}>
            <button className="w-full bg-white text-black border border-black font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 hover:bg-[#FF4C30] hover:text-white">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
