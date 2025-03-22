import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/teacher",
        element: 'hi',
    },
    {
        path: "/login",
        element: 'hi',
    },
    {
        path: "/register",
        element: 'hi',
    },

])