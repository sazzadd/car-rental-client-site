import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import AddCar from "../Pages/AddCar";
import AvailableCar from "../Pages/AvailableCar";
import CarDetails from "../Pages/CarDetails";
import Home from "../Pages/Home";
import AuthLayout from "./../Auth/AuthLayout";
import Login from "./../Auth/Login";
import Register from "./../Auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/add-car", 
        element: <AddCar></AddCar>,
      },
      {
        path: "/available-cars",
        element: <AvailableCar></AvailableCar>,
      },
      {
        path: "/carDetails/:id", 
        element: <CarDetails></CarDetails>,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login", // /auth/login path
        element: <Login></Login>,
      },
      {
        path: "register", // /auth/register path
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
