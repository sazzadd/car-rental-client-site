import axios from "axios";
import { differenceInDays, parse } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { FaCar, FaTrash } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import Swal from "sweetalert2";
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

    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to update the booking dates?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedData = {
          bookedStartDate: startDate,
          bookedEndDate: endDate,
        };

        try {
          const response = await axios.put(
            `http://localhost:5000/booked/${selectedBooking._id}`,
            updatedData
          );

          if (response.data.modifiedCount > 0) {
            setBooked((prev) =>
              prev.map((booking) =>
                booking._id === selectedBooking._id
                  ? { ...booking, ...updatedData }
                  : booking
              )
            );
            Swal.fire("Success!", "Booking updated successfully!", "success");
          } else {
            Swal.fire(
              "Failed!",
              "Failed to update booking. Try again.",
              "error"
            );
          }
        } catch (error) {
          console.error("Error updating booking:", error);
          Swal.fire(
            "Error!",
            "An error occurred. Please try again later.",
            "error"
          );
        } finally {
          handleModalClose();
        }
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-[#FF4C30] text-center mb-8">
          <FaCar className="inline-block mr-2 text-5xl" /> My Bookings
        </h1>

        {loading && (
          <div className="flex justify-center items-center">
            <div className="loader"></div>
          </div>
        )}

        {booked.length === 0 && !loading && (
          <div className="text-center bg-white p-6 rounded-lg shadow-lg">
            <FaCar className="text-[#FF4C30] text-5xl mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800">
              No Bookings Found
            </h2>
          </div>
        )}

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
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <img
                          src={book.imageUrl}
                          alt="Car"
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <div className="font-medium text-gray-800">
                            {book.carModel}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {book.carLocation}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      Start: {book.bookedStartDate}
                      <br />
                      End: {book.bookedEndDate}
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-800">
                        <div className="flex text-sm">
                          <p>per day cost:</p>
                          <p> {book.dailyRentalPrice} $</p>
                        </div>
                        <div className="flex text-sm">
                          <p>total cost: </p>
                          <span className="font-bold text-[#FF4C30]">
                            {calculateTotalPrice(
                              book.bookedStartDate,
                              book.bookedEndDate,
                              book.dailyRentalPrice
                            )}{" "}
                            $
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-lg ${
                          book.bookingStatus === "confirmed"
                            ? "bg-green-200 text-green-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {book.bookingStatus === "confirmed"
                          ? "Confirmed"
                          : "Pending"}
                      </span>
                    </td>
                    {/* <td className="py-4 px-4">
                      <button
                        className="bg-blue-400 flex text-white px-4 py-2 rounded-lg hover:bg-blue-500 items-center"
                        onClick={() => handleModifyDateClick(book)}
                      >
                        <SlCalender className="mr-2" /> Modify Date
                      </button>
                    </td> */}
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button
                          className="bg-blue-400 flex text-white px-4 py-2 rounded-lg hover:bg-blue-500 items-center"
                          onClick={() => handleModifyDateClick(book)}
                        >
                          <SlCalender className="mr-2" /> Modify Date
                        </button>
                        <button
                          className="bg-red-500 flex text-white px-4 py-2 rounded-lg hover:bg-red-600 items-center"
                          //   onClick={() => handleCancelBooking(book._id)}
                        >
                          <FaTrash className="mr-2" /> Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-bold mb-4 text-center text-[#FF4C30]">
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
              <div className="flex justify-between">
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
                  Update
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
