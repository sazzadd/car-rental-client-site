import React from "react";

const SpecialOffers = () => {
  const offers = [
    { title: "15% Off Weekend Rentals", description: "Book now and save big on weekend trips!", buttonText: "Learn More" },
    { title: "Luxury Cars at $99/Day", description: "This holiday season, drive in style!", buttonText: "Book Now" },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg rounded-lg p-6 transform transition duration-500 hover:scale-105"
              data-aos="slide-up"
            >
              <div className="absolute top-0 left-0 bg-[#FF4C30] w-2 h-full rounded-l-lg"></div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {offer.title}
              </h3>
              
              <p className="mt-2 text-gray-600">{offer.description}</p>
              <button
                className="mt-4 bg-[#FF4C30] text-white py-2 px-4 rounded-md shadow hover:bg-red-600"
              >
                {offer.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
