import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaSort, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const MyPostedCar = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [sortOption, setSortOption] = useState("newest");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarsByEmail();
    AOS.init();
  }, [user]);

  const fetchCarsByEmail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://server-site-gules.vercel.app/myposted/${user?.email}`
      );
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (cars) => {
    if (sortOption === "newest") {
      return cars.sort(
        (a, b) =>
          new Date(`${b.submissionDate} ${b.submissionTime}`).getTime() -
          new Date(`${a.submissionDate} ${a.submissionTime}`).getTime()
      );
    } else if (sortOption === "oldest") {
      return cars.sort(
        (a, b) =>
          new Date(`${a.submissionDate} ${a.submissionTime}`).getTime() -
          new Date(`${b.submissionDate} ${b.submissionTime}`).getTime()
      );
    } else if (sortOption === "priceAsc") {
      return cars.sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice);
    } else if (sortOption === "priceDesc") {
      return cars.sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice);
    } else {
      return cars;
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://server-site-gules.vercel.app/cars/${id}`);
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

  const openModal = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const carData = {
      carModel: form.carModel.value,
      dailyRentalPrice: form.dailyRentalPrice.value,
      location: form.location.value,
      availability: form.availability.value === "available",
      imageUrl: form.imageUrl.value,
      vehicleRegNumber: form.vehicleRegNumber.value,
      description: form.description.value,
    };

    try {
      await axios.put(
        `https://server-site-gules.vercel.app/update-car/${selectedCar._id}`,
        carData
      );
      Swal.fire({
        title: "Success!",
        text: "Updated successfully!",
        icon: "success",
      });
      fetchCarsByEmail();
      setShowModal(false);
    } catch (err) {
      console.log(err);
      toast.error("Error updating car");
    }
  };

  return (
    <div className="container px-6 mt-16 mx-auto pt-12 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Posted Cars</h2>
        <span className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full shadow-md">
          {cars.length} Cars
        </span>
      </div>

      <div className="flex justify-end mb-4">
        <div className="relative inline-block w-full sm:w-40">
          {/* Dropdown with Default "Sort By" */}
          <select
            className="block  w-full px-4 py-2 pr-10 border border-[#ff4c30] rounded-md shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff4c30] focus:border-[#ff4c30] transition duration-200"
            value={sortOption}
            onChange={handleSortChange}
          >
            {/* Default Option */}
            <option value="" hidden>
              Sort By
            </option>
            <option value="newest">Date Added (Newest)</option>
            <option value="oldest">Date Added (Oldest)</option>
            <option value="priceAsc">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
          </select>
          {/* Sort Icon */}
          <FaSort className="absolute top-3 right-3 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          {/* <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-transparent rounded-full"></div> */}
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : cars.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-700">
              No Data Found
            </h3>
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
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Car Model
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Availability
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Posted Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {handleSort(cars).map((car, index) => (
                <tr key={car._id} className="hover:bg-gray-50 border-b">
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center">
                      <img
                        src={car.imageUrl}
                        alt="Car"
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        <div className="font-medium text-gray-800">
                          {car.carModel}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {car.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    ${car.dailyRentalPrice} / day
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                        car.availability
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {car.availability ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {car.submissionDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <button
                      onClick={() => openModal(car)}
                      className="text-blue-500 hover:text-blue-700 mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => confirmDelete(car._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-lg overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-6">
              Update Car Information
            </h2>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="carModel"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Car Model
                  </label>
                  <input
                    type="text"
                    id="carModel"
                    name="carModel"
                    defaultValue={selectedCar.carModel}
                    className="input input-bordered w-full mt-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dailyRentalPrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Daily Rental Price
                  </label>
                  <input
                    type="number"
                    id="dailyRentalPrice"
                    name="dailyRentalPrice"
                    defaultValue={selectedCar.dailyRentalPrice}
                    className="input input-bordered w-full mt-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    defaultValue={selectedCar.location}
                    className="input input-bordered w-full mt-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="availability"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Availability
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    defaultValue={
                      selectedCar.availability ? "available" : "unavailable"
                    }
                    className="select select-bordered w-full mt-2"
                  >
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="imageUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    defaultValue={selectedCar.imageUrl}
                    className="input input-bordered w-full mt-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="vehicleRegNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Vehicle Registration Number
                  </label>
                  <input
                    type="text"
                    id="vehicleRegNumber"
                    name="vehicleRegNumber"
                    defaultValue={selectedCar.vehicleRegNumber}
                    className="input input-bordered w-full mt-2"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    defaultValue={selectedCar.description}
                    rows="4"
                    className="textarea textarea-bordered w-full mt-2"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline mr-4"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPostedCar;
