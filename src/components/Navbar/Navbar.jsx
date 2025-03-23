import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

function Navbar() {
  return (
    <>
      <div className="navbar bg-light px-5 flex justify-between items-center lg:px-30 border-solid border-1 border-gray-100 sticky top-0 z-100 bg-white">
        <div className="flex">
          <Link to="/">
            <img src={Logo} alt="Ironhack logo" className="w-40" />
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="menu menu-horizontal px-1 hidden md:flex items-center">
            <li className="">
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/teachers"}>Teachers</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact Us</Link>
            </li>
          </ul>

          <div className="btns hidden sm:flex items-center">
            <Link to={"/login"} className="hover:bg-white px-1">
              <button className="btn bg-main shadow-none text-white hover:bg-main-dark border-none">
                Login
              </button>
            </Link>
            <Link to={"/register"} className="hover:bg-white px-1">
              <button className="btn bg-white border-solid border-2 border-main shadow-none text-main hover:border-main-dark hover:bg-main-dark hover:text-white border-none">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-square md:hidden text-main"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </label>
        </div>
      </div>

      {/* side menu */}
      <div className="drawer z-1000">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="side flex flex-col justify-between menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <div className="head">
              <div className="logo mb-5">
                <Link to="/">
                  <img src={Logo} alt="Ironhack logo" className="w-40" />
                </Link>
              </div>

              <ul className="">
                {/* Sidebar content here */}
                <li className="">
                  <Link to={"/"} className="flex items-center">
                    <span className="text-md text-blue-800">+</span> Home
                  </Link>
                </li>
                <li>
                  <Link to={"/teachers"} className="flex items-center">
                    <span className="text-md text-blue-800">+</span>Teachers
                  </Link>
                </li>
                <li>
                  <Link to={"/contact"} className="flex items-center">
                    <span className="text-md text-blue-800">+</span>Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="btns flex sm:hidden items-center">
              <Link to={"/login"} className="hover:bg-white px-1 flex-1">
                <button className="btn bg-main shadow-none text-white hover:bg-main-dark border-none w-full">
                  Login
                </button>
              </Link>
              <Link to={"/register"} className="hover:bg-white px-1 flex-1">
                <button className="btn bg-white border-solid border-2 border-main shadow-none text-main hover:border-main-dark hover:bg-main-dark hover:text-white border-none w-full">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
