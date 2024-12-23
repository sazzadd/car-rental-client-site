import axios from "axios";
import React, { useContext } from "react";
import { FaCar, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "./../Provider/AuthProvider";

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddCarSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const carData = Object.fromEntries(formData.entries());

    const { features, ...newCar } = carData;

    // Split features into an array
    const arr = features.split("\n");
    newCar.features = arr;

    // Submission date and time
    const now = new Date();
    newCar.submissionDate = now.toLocaleDateString();
    newCar.submissionTime = now.toLocaleTimeString();
    newCar.hrEmail = user.email;
    newCar.hrName = user.displayName;

    try {
      await axios.post(`http://localhost:5000/add-car`, newCar);
      Swal.fire({
        title: "Success!",
        text: "Car Added Successfully",
        icon: "success",
        confirmButtonText: "Cool",
      });
      navigate("/my-posted-cars");
    } catch (err) {
      console.error(err);
      toast.error("Error adding the car. Please try again.");
    }
  };

  return (
    <div
      className="py-12 min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200"
      style={{
        backgroundImage: "url('https://i.ibb.co/ZgHQN7x/banner-image-1.png')",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg p-10 backdrop-blur-md border-2 border-orange-200">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Add <span className="text-[#FF4C30]">Car</span> for Rental
        </h2>
        <form onSubmit={handleAddCarSubmit} className="space-y-6">
          {/* Car Model */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Car Model <FaCar className="inline ml-1 text-[#FF4C30]" />
            </label>
            <input
              type="text"
              name="carModel"
              placeholder="Enter car model (e.g., Toyota Corolla)"
              className="input input-bordered w-full focus:ring-2 focus:ring-[#FF4C30]"
              required
            />
          </div>

          {/* Daily Rental Price */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Daily Rental Price{" "}
              <FaDollarSign className="inline ml-1 text-green-500" />
            </label>
            <input
              type="number"
              name="dailyRentalPrice"
              placeholder="Enter daily rental price (e.g., 50)"
              className="input input-bordered w-full focus:ring-2 focus:ring-[#FF4C30]"
              required
            />
          </div>

          {/* Availability */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Availability
            </label>
            <select
              name="availability"
              id="availability"
              className="select select-bordered w-full focus:ring-2 focus:ring-[#FF4C30]"
              required
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          {/* Vehicle Registration Number */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Vehicle Registration Number
            </label>
            <input
              type="text"
              name="vehicleRegNumber"
              placeholder="Enter vehicle registration number"
              className="input input-bordered w-full focus:ring-2 focus:ring-[#FF4C30]"
              required
            />
          </div>

          {/* Features */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Features
            </label>
            <textarea
              name="features"
              placeholder="Give each feature as a new line."
              className="textarea textarea-bordered w-full focus:ring-2 focus:ring-[#FF4C30]"
              required
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Provide a brief description of the car"
              className="textarea textarea-bordered w-full focus:ring-2 focus:ring-[#FF4C30]"
              required
            />
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              placeholder="Enter image URL"
              className="input input-bordered w-full focus:ring-2 focus:ring-[#FF4C30]"
              required
            />
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Location <FaMapMarkerAlt className="inline ml-1 text-blue-500" />
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter car location"
              className="input input-bordered w-full focus:ring-2 focus:ring-[#FF4C30]"
              required
            />
          </div>

          {/* Submit Button */}
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-[#FF4C30] to-[#FF3B20] hover:from-[#FF3B20] hover:to-[#FF4C30] text-white font-bold py-3 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              Save Car Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
