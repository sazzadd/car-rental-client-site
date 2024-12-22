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
      <h1 className="text-2xl  py-2">Latest card</h1>
      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car._id} car={car}></CarCard>
        ))}
      </div>
    </div>
  );
};

export default LatestCar;
