import axios from "axios";
import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";

const LatestCar = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchLatestCars();
  }, []);

  const fetchLatestCars = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/cars`);
      // Limit to only 6 latest cars
      setCars(data.slice(0, 6));
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <div className="mx-auto w-10/12 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
        🚗 Latest Cars for You 🚗
      </h2>

      {cars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car}></CarCard>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16">
          <img
            src="/no-cars.svg"
            alt="No Cars Available"
            className="w-48 h-48 mb-6"
          />
          <h3 className="text-2xl font-semibold text-gray-700">
            Sorry! No Latest Cars Available
          </h3>
          <p className="text-gray-500 text-lg mt-2 text-center">
            Please check back later for the newest additions to our collection. 
          </p>
        </div>
      )}
    </div>
  );
};

export default LatestCar;
