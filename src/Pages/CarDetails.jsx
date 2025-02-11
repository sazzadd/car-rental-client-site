import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import axios from "axios";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheckCircle, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const CarDetails = () => {
  const { user } = useContext(AuthContext);
  const [car, setCar] = useState({});
  const { id } = useParams();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    fetchCarData();
    AOS.init(); // Initialize AOS
  }, [id]);

  const fetchCarData = async () => {
    const { data } = await axios.get(
      `https://server-site-gules.vercel.app/cars/${id}`
    );
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
    hrEmail,
    _id,
  } = car || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if both startDate and endDate are selected
    if (!startDate || !endDate) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in both start and end dates before booking.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return; // Prevent form submission
    }

    const bookedStartDate = format(startDate, "dd-MM-yyyy HH:mm");
    const bookedEndDate = format(endDate, "dd-MM-yyyy HH:mm");
    const bookedLocalTime = format(new Date(), "dd-MM-yyyy HH:mm");
    const bookedEmail = user.email;
    const status = "confirmed";

    // Validation to prevent booking own car
    if (user?.email === hrEmail) {
      return toast.error("Action not permitted");
    }

    const bookedData = {
      bookedStartDate,
      bookedEndDate,
      carLocation: location,
      carHrEmail: hrEmail,
      carId: _id,
      bookedEmail,
      carModel,
      imageUrl,
      dailyRentalPrice,
      bookedLocalTime,
      status,
    };

    try {
      const { data } = await axios.post(
        `https://server-site-gules.vercel.app/add-booked`,
        bookedData
      );
      console.log(data); // Log the response data
      Swal.fire({
        title: "Success!",
        text: "You have successfully booked the car",
        icon: "success",
        confirmButtonText: "Cool",
      })
      .then(() => {
        setIsModalOpen(false); 
      });
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.massage);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className=" justify-center bg-gray-100 my-16 items-center text-gray-800 p-6 rounded-lg shadow-xl flex flex-col md:flex-row max-w-5xl mx-auto">
        {/* Left Section: Car Image */}
        <div
          className="w-full md:w-1/2 flex-shrink-0 transform transition-all duration-300 hover:scale-110 hover:duration-500 ease-in-out"
          data-aos="fade-up" // AOS animation for the left section
        >
          <img
            src={imageUrl}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
            alt={carModel || "Car"}
          />
        </div>

        {/* Right Section: Car Details */}
        <div className="mt-6 md:mt-0 md:ml-8 flex-1" data-aos="fade-up">
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
          {/* Modal Trigger Button */}
          <button
            onClick={toggleModal}
            className="bg-[#FF4C30] text-white px-6 py-2 rounded-lg font-semibold shadow-sm transition-all duration-300 hover:bg-[#FF8560]"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Modal with Animation */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transform transition-all duration-1000 ease-in-out scale-100 hover:scale-105"
          data-aos="zoom-in" // AOS animation for the modal
        >
          <div className="bg-white rounded-lg w-full max-w-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Book Your Car</h2>
            <form onSubmit={handleSubmit}>
              {/* Date Pickers */}
              <div className="mb-6">
                <p className="text-lg font-medium mb-2">Start Date:</p>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
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
                  dateFormat="dd/MM/yyyy"
                  className="border px-4 py-2 rounded-md w-full"
                  placeholderText="Select an end date"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="bg-[#FF4C30] text-white px-6 py-2 rounded-lg font-semibold shadow-sm transition-all duration-300 hover:bg-[#FF8560]">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-300 text-black px-6 py-2 rounded-lg font-semibold shadow-sm transition-all duration-300 hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
