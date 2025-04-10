import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllTeachers from "../pages/AllTeachers/AllTeachers";
import RootLayout from "../../RootLayout"; // Ensure you have a layout component
import Contact from "../pages/Contact/Contact";
import TeacherPage from "../pages/TeacherPage/TeacherPage";
import BookingPage from "../pages/BookingPage/BookingPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ChatPage from "../pages/Chat/ChatPage";




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
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/teacher-page",
        element: <TeacherPage />,
      },
      {
        path: "/booking",
        element: <BookingPage />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
    ],
  },
]);