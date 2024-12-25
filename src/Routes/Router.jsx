import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import AddCar from "../Pages/AddCar";
import AvailableCar from "../Pages/AvailableCar";
import CarDetails from "../Pages/CarDetails";
import Home from "../Pages/Home";
import MyBooking from "../Pages/MyBooking";
import MyPostedCar from "../Pages/MyPostedCar";
import AuthLayout from "./../Auth/AuthLayout";
import Login from "./../Auth/Login";
import Register from "./../Auth/Register";
import ErrorPage from "./../Pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";

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

        element: (
          <PrivateRoute>
            <CarDetails></CarDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-posted-cars",
        element: <MyPostedCar></MyPostedCar>,
      },
      {
        path: "/my-bookings",

        element: (
          <PrivateRoute>
            <MyBooking></MyBooking>
          </PrivateRoute>
        ),
      },
    ],
    errorElement: <ErrorPage></ErrorPage>,
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
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>, // Display error page for any unmatched routes
  },
]);

export default router;
