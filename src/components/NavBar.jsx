import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const NavBar = () => {
  const { user, handleLogOut } = useContext(AuthContext);

  const navLinks = user ? (
    <>
      <li className="mr-4">
        <NavLink
          to="/"
          className="hover:text-[#FF4C30] transition-colors duration-300"
        >
          Home
        </NavLink>
      </li>
      <li className="mr-4">
        <NavLink
          to="/available-cars"
          className="hover:text-[#FF4C30] transition-colors duration-300"
        >
          Available Cars
        </NavLink>
      </li>
      <li className="mr-4">
        <NavLink
          to="/add-car"
          className="hover:text-[#FF4C30] transition-colors duration-300"
        >
          Add Car
        </NavLink>
      </li>
      <li className="mr-4">
        <NavLink
          to="/my-posted-cars"
          className="hover:text-[#FF4C30] transition-colors duration-300"
        >
          My Cars
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-bookings"
          className="hover:text-[#FF4C30] transition-colors duration-300"
        >
          My Bookings
        </NavLink>
      </li>
    </>
  ) : (
    <>
      <li>
        <NavLink
          to="/"
          className="hover:text-[#FF4C30] transition-colors duration-300"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/available-cars"
          className="hover:text-[#FF4C30] transition-colors duration-300"
        >
          Available Cars
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="top-0 z-50  fixed w-full bg-base-100">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            <span className="hidden md:block">
              <img
                src="https://i.ibb.co.com/R3kZbZ9/Screenshot-2024-12-22-120040-removebg-preview.png"
                alt=""
                className="w-10 h-8"
              />
            </span>{" "}
            Car Rental{" "}
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex="0"
                role="button"
                className="btn btn-ghost btn-circle avatar hover:scale-110 transition-all duration-300"
              >
                <div className="w-10 rounded-full border-2 border-yellow-400">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" />
                  ) : (
                    <img
                      alt="Default Profile"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  )}
                </div>
              </div>
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.displayName || "User"}
              ></div>
              <ul
                tabIndex="0"
                className="menu menu-sm z-[1000] absolute dropdown-content bg-white rounded-lg mt-3 w-48 p-2 shadow-lg transition-all duration-300"
              >
                <li className="font-semibold">{user.displayName}</li>

                <li className="font-semibold">
                  <button
                    onClick={handleLogOut}
                    className="w-full py-2 px-4 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="space-x-3 flex">
              <Link
                to="/auth/login"
                className="py-2 px-4 text-sm font-medium text-gray-800 bg-yellow-400 rounded-lg shadow-md border border-yellow-500 hover:bg-yellow-500 hover:text-white transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-md border border-gray-700 hover:bg-gray-700 hover:border-gray-600 transition-all duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
