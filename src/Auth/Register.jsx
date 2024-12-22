import React, { useContext, useState } from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLock,
  AiOutlineUser,
} from "react-icons/ai";
import { MdEmail, MdPhotoCamera } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const { createNewUser, setUser, user, updateUserProfile } =
    useContext(AuthContext);

  // ===========================
  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value; // Fixed the field name

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return; // Stop the form submission if validation fails
    }


    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        // Debug log to verify photo URL


        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
  
            toast.success("Registration successful!");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile.");
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage || "An error occurred during registration.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-md p-8 shadow-lg border border-gray-300 rounded-lg bg-white">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Create an Account
        </h1>
        <p className="text-gray-600 text-center text-sm">
          Please fill in your details to register.
        </p>

        {/* Form */}
        <form onSubmit={handleSignUp} className="mt-6">
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <div className="relative">
              <AiOutlineUser
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbbd05] focus:border-transparent"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <MdEmail
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbbd05] focus:border-transparent"
              />
            </div>
          </div>

          {/* Photo URL Field */}
          <div className="mb-4">
            <label
              htmlFor="photoURL"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Photo URL
            </label>
            <div className="relative">
              <MdPhotoCamera
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                name="photo"
                type="text"
                id="photoURL"
                placeholder="Enter your photo URL"
                className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbbd05] focus:border-transparent"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <AiOutlineLock
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbbd05] focus:border-transparent"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-400 focus:outline-none"
              >
                {passwordVisible ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-[#fbbd05] hover:bg-yellow-500 rounded-lg font-medium text-lg focus:outline-none focus:ring-2 focus:ring-[#fbbd05]"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-[#fbbd05] hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
