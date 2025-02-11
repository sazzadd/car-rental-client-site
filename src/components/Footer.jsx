import React from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white">
      <footer className="footer w-11/12 mx-auto items-center p-6 flex flex-wrap justify-between">
        {/* Logo and Copyright */}
        <aside className="flex items-center space-x-3">
          <img
            src="https://i.ibb.co/R3kZbZ9/Screenshot-2024-12-22-120040-removebg-preview.png"
            alt="Logo"
            className="h-10 w-10 rounded-full border-2 border-[#ff4c30]"
          />
          <p className="text-sm">
            <span className="text-[#ff4c30] font-semibold">Car Rental Hub</span>
            <br />
            Copyright © {new Date().getFullYear()} - All rights reserved
          </p>
        </aside>

        {/* Social Media Links */}
        <nav className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="https://github.com/sazzadd"
            target="_blank"
            className="hover:text-[#ff4c30] transition-colors duration-300"
            aria-label="Twitter"
          >
            <FaGithub size={25}></FaGithub>
           
          </a>
          <a
            href="#"
            className="hover:text-[#ff4c30] transition-colors duration-300"
            aria-label="YouTube"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a
            href="#"
            className="hover:text-[#ff4c30] transition-colors duration-300"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </nav>

        {/* Quick Links */}
        <ul className="flex flex-wrap space-x-6 mt-4 md:mt-0 text-sm">
          <li>
            <Link to="/" className="hover:text-[#ff4c30] transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-[#ff4c30] transition-colors">
              Available Car
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
