import React from "react";
import Banner from "../components/Banner";
import LatestCar from "../components/LatestCar";
import UserTestimonials from "../components/UserTestimonials";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      {/* banner */}
      <Banner></Banner>
      {/* Why Choose Us  */}
      <section className="w-11/12 mx-auto">
        <WhyChooseUs></WhyChooseUs>
      </section>
      {/* latest Car */}
      <LatestCar></LatestCar>
      {/*User testimonial */}
      <section className="w-11/12 mx-auto">
        <UserTestimonials></UserTestimonials>
      </section>
    </div>
  );
};

export default Home;
