import React from "react";
import {
  FaCalendarAlt,
  FaCarSide,
  FaCheckCircle,
  FaDollarSign,
} from "react-icons/fa";

const CarCard = () => {
  const car = {
    image: "https://via.placeholder.com/300", // Replace with your car image URL
    model: "Toyota Camry 2023",
    price: 45,
    availability: true,
    datePosted: "2 days ago",
  };

  return (
    <div className="">
      <div className="">
        {/* Single Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border hover:shadow-2xl transition-all duration-300">
          <img
            src={car.image}
            alt={car.model}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <FaCarSide className="text-blue-500 mr-2" /> {car.model}
            </h2>
            <p className="text-gray-600 flex items-center mt-2">
              <FaDollarSign className="text-green-500 mr-2" />
              Daily Price: ${car.price}/day
            </p>
            <p
              className={`flex items-center mt-2 ${
                car.availability ? "text-green-600" : "text-red-600"
              }`}
            >
              <FaCheckCircle className="mr-2" />
              {car.availability ? "Available" : "Not Available"}
            </p>
            <p className="text-gray-500 flex items-center mt-2">
              <FaCalendarAlt className="mr-2" />
              Posted: {car.datePosted}
            </p>
          </div>
          <div className="p-4 bg-gray-50">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all">
              Rent Now
            </button>
          </div>
        </div>
        {/* Duplicate the card for demo purposes */}
        {/* You can loop over an array of cars in a real implementation */}
      </div>
    </div>
  );
};

export default CarCard;
