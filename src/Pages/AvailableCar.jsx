import axios from "axios";
import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";

const AvailableCar = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchAllCars();
  }, []);

  const fetchAllCars = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/cars`);
      const availableCars = data.filter((car) => car.availability); // ফিল্টার করে শুধু ট্রু ভেলু রাখছে
      setCars(availableCars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <div className="mx-auto w-9/12">
      {cars.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car._id} car={car}></CarCard>
          ))}
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
