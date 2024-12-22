import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const AuthLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
