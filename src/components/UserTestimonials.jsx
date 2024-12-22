import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS
import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";

// Array of testimonials
const testimonials = [
  {
    name: "John Doe",
    image:
      "https://t3.ftcdn.net/jpg/08/55/27/12/360_F_855271283_jnI9si4M9Ev89YUk8W7UcjblQDoy3JcI.jpg",
    rating: 5,
    text: "Amazing service and great cars. Highly recommend!",
  },
  {
    name: "Jane Smith",
    image:
      "https://media.istockphoto.com/id/1230749818/photo/portrait-of-smiling-male-owner-of-fashion-store-standing-in-front-of-clothing-display.jpg?s=612x612&w=0&k=20&c=xoWhF-hrQcbMEPDYncHiHF8HJX2YgmYt7T-KLCPZIpY=",
    rating: 4,
    text: "Very satisfied with the rental experience, the cars are top-notch.",
  },
  {
    name: "Mary Williams",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJLXGVOByPdPaKy75tt5W3ege8iewGhx8GD2DrND8oD1iGyNiU4jjQSL9aktTukOXSETA&usqp=CAU",
    rating: 5,
    text: "Best experience ever! The cars were clean and in great condition.",
  },
  {
    name: "Jhon Smith",
    image: "https://opresponse.com/wp-content/uploads/2018/02/img-07.jpg",
    rating: 5,
    text: "The cars were clean and in great condition. Best experience ever!",
  },
];

const UserTestimonials = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="container mx-auto text-center">
        <h2
          data-aos="zoom-in"
          className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-12"
        >
          What Our Customers Say
        </h2>

        {/* Testimonials Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-aos="flip-left"
              className="relative group bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110"
            >
              <div className="absolute -top-8">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mb-4 border-4 border-[#FF4C30] transition-transform duration-500 transform group-hover:rotate-6 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mt-12 mb-3">
                {testimonial.name}
              </h3>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p
                className="text-gray-600 text-center italic"
                data-aos="slide-up"
              >
                {testimonial.text}
              </p>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-30 rounded-lg transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTestimonials;
