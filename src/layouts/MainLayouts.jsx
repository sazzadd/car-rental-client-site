import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const MainLayouts = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
