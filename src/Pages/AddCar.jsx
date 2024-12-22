import React from "react";
import { FaCar, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";

const AddCar = () => {
  return (
    <div
      className="py-12 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/ZgHQN7x/banner-image-1.png')",
        backgroundPosition: "right bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div className="w-full max-w-4xl bg-white bg-opacity-50 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Car for Rental
        </h2>
        <form className="space-y-6">
          {/* Car Model */}
          <div className="form-control">
            <label className="label font-medium text-gray-600">
              Car Model <FaCar className="inline ml-1 text-red-500" />
            </label>
            <input
              type="text"
              name="carModel"
              placeholder="Enter car model (e.g., Toyota Corolla)"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Daily Rental Price */}
          <div className="form-control">
            <label className="label font-medium text-gray-600">
              Daily Rental Price{" "}
              <FaDollarSign className="inline ml-1 text-green-500" />
            </label>
            <input
              type="number"
              name="dailyRentalPrice"
              placeholder="Enter daily rental price (e.g., 50)"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Availability */}
          <div className="form-control">
            <label className="label font-medium text-gray-600">
              Availability
            </label>
            <select
              name="availability"
              className="select select-bordered w-full"
              required
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          {/* Vehicle Registration Number */}
          <div className="form-control">
            <label className="label font-medium text-gray-600">
              Vehicle Registration Number
            </label>
            <input
              type="text"
              name="vehicleRegNumber"
              placeholder="Enter vehicle registration number"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Features */}
          <div className="form-control">
            <label className="label font-medium text-gray-600">
              Features (e.g., GPS, AC, etc.)
            </label>
            <input
              type="text"
              name="features"
              placeholder="Enter features (comma separated)"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Provide a brief description of the car"
              className="textarea textarea-bordered w-full"
              required
            />
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label font-medium text-gray-600">
              Image URL (for car image)
            </label>
            <input
              type="url"
              name="imageUrl"
              placeholder="Enter image URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label font-medium text-gray-600">
              Location <FaMapMarkerAlt className="inline ml-1 text-blue-500" />
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter car location"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-full">
              Save Car Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
