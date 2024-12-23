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
    setStartDate(new Date(data.deadline));
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
  return <div>car details</div>;
};

export default CarDetails;
