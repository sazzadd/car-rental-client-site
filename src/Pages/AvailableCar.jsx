import axios from "axios";
import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";

const AvailableCar = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    fetchAllJobs();
  }, []);
  const fetchAllJobs = async () => {
    const { data } = await axios.get(`http://localhost:5000/cars`);
    setCars(data);
  };
  console.log(cars);

  const {
    carModel,
    dailyRentalPrice,
    availability,
    vehicleRegistrationNumber,
    features = [],
    description,
    imageUrl,
    location,
  } = cars || {};
  return (
    <div className="mx-auto w-9/12">
      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car._id} car={car}></CarCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableCar;
