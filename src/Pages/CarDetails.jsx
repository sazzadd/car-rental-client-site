import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CarDetails = () => {
  const [car, setCar] = useState({});
  const { id } = useParams();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchCarData();
  }, [id]);

  const fetchCarData = async () => {
    const { data } = await axios.get(`http://localhost:5000/cars/${id}`);
    setCar(data);
  };

  const {
    carModel,
    dailyRentalPrice,
    availability,
    vehicleRegistrationNumber,
    features = [],
    description,
    imageUrl,
    location,
  } = car || {};
  const handleSubmit =  e => {
    
  }
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="bg-white text-gray-800 p-6 rounded-lg shadow-xl flex flex-col md:flex-row max-w-5xl mx-auto">
        {/* Left Section: Car Image */}
        <div className="w-full md:w-1/2 flex-shrink-0 hover:scale-105 transform transition-all duration-300">
          <img
            src={imageUrl}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
            alt={carModel || "Car"}
          />
        </div>

        {/* Right Section: Car Details */}
        <div className="mt-6 md:mt-0 md:ml-8 flex-1">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
            {carModel}
          </h2>
          <div className="text-gray-700 text-sm mb-4">
            <FaMapMarkerAlt className="inline-block text-[#FF4C30] mr-2" />
            Location: {location || "Not Available"}
          </div>
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
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {description || "No description available."}
          </p>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Features:
          </h4>
          <ul className="list-disc list-inside text-gray-700 text-sm mb-6">
            {features.length > 0
              ? features.map((feature, index) => (
                  <li key={index} className="capitalize">
                    {feature}
                  </li>
                ))
              : "No features listed."}
          </ul>
          <div className="flex items-center text-2xl font-semibold text-gray-800 mb-6">
            <FaDollarSign className="inline-block text-[#FF4C30] mr-2" />
            <span>{dailyRentalPrice} / Day</span>
          </div>

          {/* Date Pickers */}
          <div className="mb-6">
            <p className="text-lg font-medium mb-2">Start Date:</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              dateFormat="MM/dd/yyyy"
              className="border px-4 py-2 rounded-md w-full"
              placeholderText="Select a start date"
            />
          </div>
          <div className="mb-6">
            <p className="text-lg font-medium mb-2">End Date:</p>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate || new Date()}
              dateFormat="MM/dd/yyyy"
              className="border px-4 py-2 rounded-md w-full"
              placeholderText="Select an end date"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="bg-[#FF4C30] text-white px-6 py-2 rounded-lg font-semibold shadow-sm transition-all duration-300 hover:bg-[#FF8560]">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
