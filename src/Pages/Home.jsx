import React from "react";
import Banner from "../components/Banner";
import LatestCar from "../components/LatestCar";
import SpecialOffers from "../components/SpecialOffers";
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
      <section className="w-11/12 mx-auto">
        <LatestCar></LatestCar>
      </section>
      <section>
        <SpecialOffers></SpecialOffers>
      </section>
      {/*User testimonial */}
      <section >
        <UserTestimonials></UserTestimonials>
      </section>
    </div>
  );
};

export default Home;
