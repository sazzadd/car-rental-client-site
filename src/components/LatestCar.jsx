import axios from "axios";
import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import AOS from "aos";
import "aos/dist/aos.css";

const LatestCar = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS
    fetchLatestCars();
  }, []);

  const fetchLatestCars = async () => {
    try {
      const { data } = await axios.get(
        `https://server-site-gules.vercel.app/cars`
      );
      // Limit to only 6 latest cars
      setCars(data.slice(0, 6));
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <div className="mx-auto w-10/12 py-12">
      <h2
        data-aos="zoom-in"
        className="relative text-center text-3xl md:text-4xl font-semibold text-gray-800 mb-12 pb-2"
      >
        🚗 Latest Cars for You 🚗
        <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-20 bg-[#FF4C30] rounded-full"></span>
      </h2>

      {cars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cars.map((car) => (
            <div key={car._id} data-aos="fade-up">
              <CarCard car={car}></CarCard>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16">
          <img
            src="/no-cars.svg"
            alt="No Cars Available"
            className="w-48 h-48 mb-6"
            data-aos="fade-up"
          />
          <h3
            className="text-2xl font-semibold text-gray-700"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Sorry! No Latest Cars Available
          </h3>
          <p
            className="text-gray-500 text-lg mt-2 text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Please check back later for the newest additions to our collection.
          </p>
        </div>
      )}
    </div>
  );
};

export default LatestCar;
