import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const MainLayouts = () => {
  return (
    <div>
      {/* Navbar */}
      <section>
        <NavBar></NavBar>
      </section>
      {/* Outlet */}
      <Outlet></Outlet>
      {/* Footer */}
    </div>
  );
};

export default MainLayouts;
