import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CarDetails = () => {
  const [car, setCar] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetchJobData();
  }, [id]);
  const fetchJobData = async () => {
    const { data } = await axios.get(`http://localhost:5000/cars/${id}`);
    setCar(data);
    // setStartDate(new Date(data.deadline));
  };
  const {
    _id,
    carModel,
    dailyRentalPrice,
    availability,
    vehicleRegistrationNumber,
    features,
    description,
    bookingCount,
    image,
    location,
    // bid_count: 0,
  } = car || {};
  console.log(car);
  return (
    <div>
      <div>
        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg flex max-w-3xl mx-auto">
          {/* Left Section: Book Cover Image */}
          <div className="w-1/3 flex-shrink-0">
            <img
              src={image}
              alt="kindpng-7318921"
              className="rounded-lg shadow-lg w-full"
            />
          </div>

          {/* Right Section: Book Details */}
          <div className="ml-6 w-2/3 work-sans">
            {/* Book Title */}
            <h2 className="text-3xl font-semibold mb-2 play-font">
              {carModel}
            </h2>

            <div className="border-t my-3 border"></div>
            <p className="text-gray-400 text-sm mb-4">
              description:{description}
            </p>
            <div className="border-t my-3 border"></div>
            {/* Review Text */}
            

            {/* Tags */}
            <div className="gap-2 mb-4">
              {/* <span className="bg-green-600 text-xs px-3 py-1 rounded-full">
          #Young Adult
        </span>
        <span className="bg-green-600 text-xs px-3 py-1 rounded-full">
          #Identity
        </span> */}
              <h4 className="text-xl text-black">features</h4>
              {features.map((feature, index) => (
                <li key={index} className="">
                  # {feature}
                </li>
              ))}
            </div>
            <div className="border-t my-3 border"></div>
            {/* Additional Information */}
            <div className="text-gray-400 text-sm mb-4">
              <p>Number of Pages: 281</p>
              <p>Publisher: J.B Lippincott & Co.</p>
              <p>Year of Publishing: 1960</p>
              <p>Rating: </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="btn btn-outline px-4 py-2 rounded-lg">
                Mark as Read
              </button>
              <button className="bg-[#50B1C9] text-white px-4 py-2 rounded-lg">
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
