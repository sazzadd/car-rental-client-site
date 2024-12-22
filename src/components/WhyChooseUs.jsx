import React from "react";
import { FaCar, FaDollarSign, FaClipboardCheck, FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion"; // Import motion from Framer Motion

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Point 1: Wide Variety of Cars */}
          <motion.div
            className="flex flex-col items-center bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FaCar className="text-5xl text-[#FF4C30] mb-6" />
            <h3 className="text-xl font-medium text-gray-800 mb-3">Wide Variety of Cars</h3>
            <p className="text-gray-600 text-center">
              From budget-friendly options to luxury vehicles, we have something for everyone.
            </p>
          </motion.div>

          {/* Point 2: Affordable Prices */}
          <motion.div
            className="flex flex-col items-center bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FaDollarSign className="text-5xl text-[#FF4C30] mb-6" />
            <h3 className="text-xl font-medium text-gray-800 mb-3">Affordable Prices</h3>
            <p className="text-gray-600 text-center">
              Competitive daily rates you can count on, ensuring value for your money.
            </p>
          </motion.div>

          {/* Point 3: Easy Booking Process */}
          <motion.div
            className="flex flex-col items-center bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FaClipboardCheck className="text-5xl text-[#FF4C30] mb-6" />
            <h3 className="text-xl font-medium text-gray-800 mb-3">Easy Booking Process</h3>
            <p className="text-gray-600 text-center">
              Seamlessly book your ride in just a few clicks, no hassle involved.
            </p>
          </motion.div>

          {/* Point 4: Customer Support */}
          <motion.div
            className="flex flex-col items-center bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <FaHeadset className="text-5xl text-[#FF4C30] mb-6" />
            <h3 className="text-xl font-medium text-gray-800 mb-3">Customer Support</h3>
            <p className="text-gray-600 text-center">
              24/7 assistance for all your queries and concerns, we're always here to help.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
