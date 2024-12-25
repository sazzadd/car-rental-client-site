import axios from "axios";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { FaThLarge, FaList, FaSearch } from "react-icons/fa";
import CarCard from "../components/CarCard";

const ListCarCard = ({ car }) => {
  return (
    <div
      className="flex items-center border p-4 rounded-md shadow-md hover:shadow-lg transition-shadow bg-white"
      data-aos="fade-up" // Add animation effect
      data-aos-duration="800" // Animation duration
      data-aos-easing="ease-in-out" // Animation easing
    >
      {/* Car Image */}
      <img
        src={car.imageUrl}
        alt={car.carModel}
        className="w-36 h-36 object-cover rounded-md mr-4"
      />
      {/* Car Details */}
      <div className="flex flex-col justify-center space-y-2">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          {car.carModel}
        </h2>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-black">Price:</span> ${car.dailyRentalPrice} / Day
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-black">Type:</span> {car.description}
        </p>
        <p className="text-lg text-gray-600 flex items-center">
          <span className="font-medium text-black">Availability:</span>{" "}
          {car.availability ? (
            <span className="ml-1 text-green-500 font-medium">Available</span>
          ) : (
            <span className="ml-1 text-red-500 font-medium">Not Available</span>
          )}
        </p>
      </div>
    </div>
  );
};

const AvailableCar = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAllCars();
    AOS.init({ duration: 1200 }); // Initialize AOS with custom duration
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const fetchAllCars = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/cars`);
      const availableCars = data.filter((car) => car.availability);
      setCars(availableCars);
      setFilteredCars(availableCars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleSearch = () => {
    const searchResults = cars.filter((car) =>
      car.carModel.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCars(searchResults);
  };

  return (
    <div className="mx-auto w-9/12">
      {/* Search Bar */}
      <div className="flex items-center justify-between mt-4">
        <div className="relative flex items-center w-full max-w-md">
          <FaSearch className="absolute left-3 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search by car model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4c30]"
          />
        </div>
        {/* Toggle Button */}
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          className="flex items-center px-4 py-2 bg-[#ff4c30] text-white rounded-md hover:bg-[#e0432c] focus:outline-none shadow-lg"
        >
          {viewMode === "grid" ? (
            <>
              <FaList className="mr-2 text-xl" /> Switch to List View
            </>
          ) : (
            <>
              <FaThLarge className="mr-2 text-xl" /> Switch to Grid View
            </>
          )}
        </button>
      </div>

      {/* Conditional Rendering Based on View Mode */}
      {filteredCars.length > 0 ? (
        <div
          className={`mt-8 xl:mt-16 ${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
              : "flex flex-col gap-6"
          }`}
        >
          {filteredCars.map((car) =>
            viewMode === "grid" ? (
              <div
                key={car._id}
                data-aos="zoom-in" // Animation for grid mode
                data-aos-duration="800"
              >
                <CarCard car={car}></CarCard>
              </div>
            ) : (
              <div key={car._id}>
                <ListCarCard car={car}></ListCarCard>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="text-center mt-16">
          <h2 className="text-xl font-semibold">No cars available</h2>
          <p>Please check back later for available cars.</p>
        </div>
      )}
    </div>
  );
};

export default AvailableCar;
