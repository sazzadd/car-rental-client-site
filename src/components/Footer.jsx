import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
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
        <nav className="flex space-x-2 mt-4 md:mt-0">
          <a
            href="https://github.com/sazzadd"
            target="_blank"
            className="hover:text-[#ff4c30] transition-colors duration-300"
            aria-label="Github"
          >
            <FaGithub size={25}></FaGithub>
          </a>
          <a
            href="https://www.linkedin.com/in/sazzadador/"
            target="_blank"
            className="hover:text-[#ff4c30] transition-colors duration-300"
            aria-label="Twitter"
          >
            <FaLinkedin size={25}></FaLinkedin>
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
