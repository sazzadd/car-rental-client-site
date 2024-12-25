import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(true);
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
  console.log(booked);
  return (
    <div>
      <h1>my booking</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>index</th>
              <th>Car Model</th>
              <th>Booking Date</th>
              <th>Total Price</th>
              <th>Booking Status</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {booked.map((book, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="rounded h-12 w-12">
                        <img
                          src={book.imageUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{book.carModel}</div>
                      <div className="text-sm opacity-50">{book.location}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {book.bookedLocalTime}
                  <br />
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs"> null</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooking;
