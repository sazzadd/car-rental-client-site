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
      <img
        src={car.imageUrl}
        alt={car.carModel}
        className="w-36 h-36 object-cover rounded-md mr-4"
      />
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
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchAllCars();
    AOS.init({ duration: 1200 });
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, sortOption]);

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
    let searchResults = cars.filter((car) =>
      car.carModel.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOption === "dateNewest") {
      searchResults.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (sortOption === "dateOldest") {
      searchResults.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    } else if (sortOption === "priceLowest") {
      searchResults.sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice);
    } else if (sortOption === "priceHighest") {
      searchResults.sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice);
    }

    setFilteredCars(searchResults);
  };

  return (
    <div className="mx-auto w-9/12">
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
        <div className="flex items-center space-x-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff4c30]"
          >
            <option value="">Sort By</option>
            <option value="dateNewest">Date Added: Newest First</option>
            <option value="dateOldest">Date Added: Oldest First</option>
            <option value="priceLowest">Price: Lowest First</option>
            <option value="priceHighest">Price: Highest First</option>
          </select>
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
      </div>

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
                data-aos="zoom-in"
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
