import React, { use, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Header from "../Profile/HeaderProfile";

function Navbar() {
  const [active, setActive] = useState("home");
  const [isLogin, setIsLogin] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      setActive("home");
    } else if (pathname === "/teachers") {
      setActive("teachers");
    } else if (pathname === "/contact") {
      setActive("contact");
    }
  }, [pathname]);

  return (
    <>
      <div className="navbar bg-light px-5 flex justify-between items-center lg:px-30 border-solid border-1 border-gray-100 sticky top-0 z-100 bg-white">
        <div className="flex">
          <Link to="/">
            <img src={Logo} alt="Ironhack logo" className="w-40" />
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="menu menu-horizontal px-1 hidden md:flex items-center gap-2">
            <li className="">
              <Link
                to={"/"}
                className={`${
                  active === "home" && "border-main!"
                } border-b-2 border-solid border-white hover:border-main rounded-none transition `}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/teachers"}
                className={`${
                  active === "teachers" && "border-main!"
                } border-b-2 border-solid border-white hover:border-main rounded-none transition`}
              >
                Teachers
              </Link>
            </li>
            <li>
              <Link
                to={"/contact"}
                className={`${
                  active === "contact" && "border-main!"
                } border-b-2 border-solid border-white hover:border-main rounded-none transition`}
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {isLogin ? (
            <Header />
          ) : (
            <div className="btns hidden sm:flex items-center">
              <Link to={"/login"} className="hover:bg-white px-1">
                <button className="btn bg-main rounded shadow-none text-white hover:bg-main-dark border-none">
                  Login
                </button>
              </Link>
              <Link to={"/register"} className="hover:bg-white px-1">
                <button className="btn bg-white border-solid border-2 border-main shadow-none text-main hover:border-main-dark hover:bg-main-dark hover:text-white border-none">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            tabIndex={0}
            role="button"
            className="btn p-0! bg-transparent hover:bg-transparent border-none md:hidden text-main"
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

          <div className="side flex flex-col justify-between menu bg-second text-base-content min-h-full w-80 p-4">
            <div className="head">
              <div className="logo mb-5 flex justify-center items-center">
                <Link to="/">
                  <img src={Logo} alt="Ironhack logo" className="w-40" />
                </Link>
              </div>

              <ul className="flex flex-col gap-3">
                {/* Sidebar content here */}
                <li className="">
                  <Link
                    to={"/"}
                    className={`${
                      active === "home" && "border-main!"
                    } flex items-center border-b-2 border-solid border-second hover:border-main rounded-none transition`}
                  >
                    <span className="text-md text-blue-800">+</span> Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/teachers"}
                    className={`${
                      active === "teachers" && "border-main!"
                    } flex items-center border-b-2 border-solid border-second hover:border-main rounded-none transition`}
                  >
                    <span className="text-md text-blue-800">+</span>Teachers
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/contact"}
                    className={`${
                      active === "contact" && "border-main!"
                    } flex items-center border-b-2 border-solid border-second hover:border-main rounded-none transition`}
                  >
                    <span className="text-md text-blue-800">+</span>Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {!isLogin && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
