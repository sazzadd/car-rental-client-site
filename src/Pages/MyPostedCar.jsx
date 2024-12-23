import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyPostedCar = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCarsByEmail();
  }, [user]);

  const fetchCarsByEmail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/myposted/${user?.email}`
      );
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:5000/cars/${id}`);
      setCars((prevCars) => prevCars.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire("Deleted!", "Your car has been deleted.", "success");
      }
    });
  };

  return (
    <div className="container px-6 mx-auto pt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Posted Cars</h2>
        <span className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full shadow-md">
          {cars.length} Cars
        </span>
      </div>

      {cars.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-700">No Data Found</h3>
            <p className="text-gray-500 mt-4">
              You haven’t posted any cars yet. Add your cars to start renting!
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Car Model</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Availability</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Posted Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr key={car._id} className="hover:bg-gray-50 border-b">
                  <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center">
                      <img
                        src={car.imageUrl}
                        alt="Car"
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        <div className="font-medium text-gray-800">{car.carModel}</div>
                        <div className="text-gray-500 text-sm">{car.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    ${car.dailyRentalPrice} / day
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        car.availability
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {car.availability ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(car.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => confirmDelete(car._id)}
                        className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPostedCar;
