import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import AddCar from "../Pages/AddCar";
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
        path: "/add-car", // /auth/login path
        element: <AddCar></AddCar>,
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
