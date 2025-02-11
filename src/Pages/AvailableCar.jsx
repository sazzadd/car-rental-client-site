import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaList, FaSearch, FaThLarge } from "react-icons/fa";
import CarCard from "../components/CarCard";

const ListCarCard = ({ car }) => {
  return (
    <div
      className="flex flex-col md:flex-row items-center border p-4 rounded-md shadow-md hover:shadow-lg transition-shadow bg-white"
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-easing="ease-in-out"
    >
      <img
        src={car.imageUrl}
        alt={car.carModel}
        className="w-full md:w-36 h-36 object-cover rounded-md md:mr-4 mb-4 md:mb-0"
      />
      <div className="flex flex-col justify-center space-y-2 text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center">
          {car.carModel}
        </h2>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-black">Price:</span> $
          {car.dailyRentalPrice} / Day
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-black">Type:</span>{" "}
          {car.description}
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
  const [carModelQuery, setCarModelQuery] = useState("");
  const [carLocationQuery, setCarLocationQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchAllCars();
    AOS.init({ duration: 1200 });
  }, []);

  useEffect(() => {
    handleSearch();
  }, [carModelQuery, carLocationQuery, sortOption]);

  const fetchAllCars = async () => {
    try {
      const { data } = await axios.get(
        `https://server-site-gules.vercel.app/cars`
      );
      const availableCars = data.filter((car) => car.availability);
      setCars(availableCars);
      setFilteredCars(availableCars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleSearch = () => {
    let searchResults = cars;

    if (carModelQuery) {
      searchResults = searchResults.filter((car) =>
        car.carModel.toLowerCase().includes(carModelQuery.toLowerCase())
      );
    }

    if (carLocationQuery) {
      searchResults = searchResults.filter((car) =>
        car.location.toLowerCase().includes(carLocationQuery.toLowerCase())
      );
    }

    if (sortOption === "dateNewest") {
      searchResults.sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice);
    } else if (sortOption === "dateOldest") {
      searchResults.sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice);
    } else if (sortOption === "priceLowest") {
      searchResults.sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice);
    } else if (sortOption === "priceHighest") {
      searchResults.sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice);
    }

    setFilteredCars(searchResults);
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl min-h-screen">
      <div className="bg-[#f8f9fa] rounded-md shadow-md p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between space-y-4 sm:space-y-0">
          {/* Search by Model */}
          <div className="relative border-[#ff4c30] border rounded-md  w-full sm:w-auto sm:mr-4">
            <FaSearch className="absolute  mt-3 left-3 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search by car model..."
              value={carModelQuery}
              onChange={(e) => setCarModelQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4c30]"
            />
          </div>

          {/* Search by Location */}
          <div className="relative border-[#ff4c30] border rounded-md w-full sm:w-auto sm:mr-4">
            <FaSearch className="absolute mt-3 left-3 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search by location..."
              value={carLocationQuery}
              onChange={(e) => setCarLocationQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4c30]"
            />
          </div>

          {/* Sort and View Mode */}
          <div className="flex items-center space-x-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className=" border-[#ff4c30] border   rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff4c30]"
            >
              <option value="">Sort By</option>

              <option value="priceLowest">Price: Lowest First</option>
              <option value="priceHighest">Price: Highest First</option>
            </select>
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="flex items-center px-4 py-2 bg-[#ff4c30] text-white rounded-md hover:bg-[#e0432c] focus:outline-none shadow-lg"
            >
              {viewMode === "grid" ? (
                <>
                  <FaList className="mr-2 text-xl" /> List View
                </>
              ) : (
                <>
                  <FaThLarge className="mr-2 text-xl" /> Grid View
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {filteredCars.length > 0 ? (
        <div
          className={`mt-8 grid gap-8 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "flex flex-col"
          }`}
        >
          {filteredCars.map((car) =>
            viewMode === "grid" ? (
              <div key={car._id} data-aos="zoom-in" data-aos-duration="800">
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
          <div className="flex justify-center items-center py-16">
            {/* <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-transparent rounded-full"></div> */}
            <span className="loading loading-ring loading-lg"></span>
          </div>
          <h2 className="text-xl font-semibold">No cars available</h2>
          <p>Please check back later for available cars.</p>
        </div>
      )}
    </div>
  );
};

export default AvailableCar;
