import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllTeachers from "../pages/AllTeachers/AllTeachers";
import RootLayout from "../../RootLayout"; // Ensure you have a layout component


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Root layout containing <Outlet />
    children: [
      {
        index: true, // This means "/" will render <Home />
        element: <Home />,
      },
      {
        path: "/teachers",
        element: <AllTeachers />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);