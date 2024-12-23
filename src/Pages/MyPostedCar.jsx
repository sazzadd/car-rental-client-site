import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MyPostedCar = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  useEffect(() => {
    fetchAllJobs();
  }, [user]);
  const fetchAllJobs = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/cars/${user?.email}`
    );
    setJobs(data);
  };
  console.log(cars);
  return <div></div>;
};

export default MyPostedCar;
