import axios from "axios";
import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";

const LatestCar = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    fetchAllJobs();
  }, []);
  const fetchAllJobs = async () => {
    const { data } = await axios.get(`http://localhost:5000/cars`);
    setCars(data);
  };
  console.log(cars);
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-12">
        Latest Car
      </h2>
      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car._id} car={car}></CarCard>
        ))}
      </div>
    </div>
  );
};

export default LatestCar;
