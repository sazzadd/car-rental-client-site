import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const MainLayouts = () => {
  return (
    <div className="overflow-x-hidden ">
      {/* Navbar */}

      <NavBar></NavBar>

      {/* Outlet */}
      <Outlet></Outlet>
      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default MainLayouts;
