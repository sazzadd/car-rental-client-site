import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { differenceInDays, parse } from "date-fns";
import {
  FaCalendarCheck,
  FaCar,
  FaMoneyBillWave,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { AuthContext } from "../Provider/AuthProvider";

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchCarsByEmail();
  }, [user]);

  const fetchCarsByEmail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/booked/${user?.email}`
      );
      setBooked(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = (startDate, endDate, dailyPrice) => {
    const start = parse(startDate, "dd-MM-yyyy HH:mm", new Date());
    const end = parse(endDate, "dd-MM-yyyy HH:mm", new Date());
    const days = differenceInDays(end, start);
    return days * parseFloat(dailyPrice);
  };

  const handleModifyDateClick = (booking) => {
    setSelectedBooking(booking);
    setStartDate(booking.bookedStartDate);
    setEndDate(booking.bookedEndDate);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedBooking(null);
    setStartDate("");
    setEndDate("");
  };

const handleDateSubmit = async () => {
  if (!selectedBooking) return;

  const updatedData = {
    bookedStartDate: startDate,
    bookedEndDate: endDate,
  };

  try {
    // Update booking in the database
    const response = await axios.put(
      `http://localhost:5000/booked/${selectedBooking._id}`,
      updatedData
    );

    if (response.data.modifiedCount > 0) {
      // Update the UI
      setBooked((prev) =>
        prev.map((booking) =>
          booking._id === selectedBooking._id
            ? { ...booking, ...updatedData }
            : booking
        )
      );
      alert("Booking updated successfully!");
    } else {
      alert("Failed to update booking. Please try again.");
    }
  } catch (error) {
    console.error("Error updating booking:", error);
    alert("An error occurred. Please try again later.");
  } finally {
    handleModalClose();
  }
};


  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-[#FF4C30] text-center mb-8">
          My Bookings
        </h1>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center">
            <div className="loader"></div>
          </div>
        )}

        {/* No Data Available */}
        {booked.length === 0 && !loading && (
          <div className="text-center bg-white p-6 rounded-lg shadow-lg">
            <FaCar className="text-[#FF4C30] text-5xl mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800">
              No Bookings Found
            </h2>
            <p className="text-gray-600 mt-2">
              It seems like you have not booked any car yet.
            </p>
          </div>
        )}

        {/* Booking Table */}
        {!loading && booked.length > 0 && (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="table-auto w-full border-collapse">
              <thead className="bg-[#FF4C30] text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Index</th>
                  <th className="py-3 px-4 text-left">Car Model</th>
                  <th className="py-3 px-4 text-left">Booking Date</th>
                  <th className="py-3 px-4 text-left">Total Price</th>
                  <th className="py-3 px-4 text-left">Booking Status</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {booked.map((book, index) => (
                  <tr key={book._id} className="border-b hover:bg-gray-100">
                    <td className="py-4 px-4">{index + 1}</td>
                    <td className="py-4 px-4 flex items-center gap-3">
                      <img
                        src={book.imageUrl}
                        alt={book.carModel}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-bold text-gray-800">
                          {book.carModel}
                        </div>
                        <div className="text-sm text-gray-500">
                          {book.location}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaRegCalendarAlt />
                        Start Time: {book.bookedStartDate}
                      </div>
                      <br />
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaRegCalendarAlt />
                        End Time: {book.bookedEndDate}
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <FaMoneyBillWave />
                        Per Day Price: {book.dailyRentalPrice}
                      </div>
                      <br />
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <FaMoneyBillWave />
                        Total Price:{" "}
                        {calculateTotalPrice(
                          book.bookedStartDate,
                          book.bookedEndDate,
                          book.dailyRentalPrice
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            book.bookingStatus === "confirmed"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {book.bookingStatus === "confirmed"
                            ? "Confirmed"
                            : "Pending"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        <button
                          className="bg-[#FF4C30] text-white px-4 py-2 rounded-lg hover:bg-[#FF8560] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <GiCancel className="inline-block" /> Cancel
                        </button>
                        <button
                          className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
                          onClick={() => handleModifyDateClick(book)}
                        >
                          <FaCalendarCheck className="inline-block" /> Modify Date
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Modify Booking Dates
              </h2>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Start Date</label>
                <input
                  type="datetime-local"
                  className="w-full p-2 border rounded-lg"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">End Date</label>
                <input
                  type="datetime-local"
                  className="w-full p-2 border rounded-lg"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleModalClose}
                >
                  Close
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleDateSubmit}
                >
                  update 
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
