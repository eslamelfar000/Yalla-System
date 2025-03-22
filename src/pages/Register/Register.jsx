import React from "react";
import logo from "../../assets/logo.png";
import signup from "../../assets/login1.jpg";
import { Link } from "react-router-dom";
import { BiHome, BiUser } from "react-icons/bi";
import { UserIcon } from "@heroicons/react/20/solid";
import { MdEmail, MdOutlineMailOutline, MdPassword } from "react-icons/md";

function Register() {
  return (
    <>
      <div className="cover flex flex-col-reverse md:flex-row justify-between items-center md:h-screen">
        <div className="left flex-1 w-full h-full flex justify-between items-center">
          <div className="flex flex-col w-[90%] xl:w-[70%] mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 rounded-2xl shadow-xl bg-second">
            <div className="flex flex-col justify-center mx-auto items-center gap-3 pb-4">
              <div>
                <img src={logo} alt="Logo" width="" />
              </div>
            </div>
            <div className="text-sm font-light text-[#6B7280] pb-8 mx-auto">
              Create your account
            </div>
            <form className="flex flex-col">
              <div className="pb-2">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-[#111827]"
                >
                  Full Name
                </label>
                <div className="relative text-gray-400">
                  <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                    <BiUser className="w-6 h-6" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    id="email"
                    className="pl-12 mb-2 bg-white text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-main block w-full p-2.5 rounded-l-lg py-3 px-4"
                    placeholder="full name"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div className="pb-2">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-[#111827]"
                >
                  Email Address
                </label>
                <div className="relative text-gray-400">
                  <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                    <MdOutlineMailOutline className="w-6 h-6" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="pl-12 mb-2 bg-white text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-main block w-full p-2.5 rounded-l-lg py-3 px-4"
                    placeholder="name@gmail.com"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div className="pb-2">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-[#111827]"
                >
                  Password
                </label>
                <div className="relative text-gray-400">
                  <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                    <MdPassword className="w-6 h-6" />
                  </span>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••••"
                    className="pl-12 mb-2 bg-white text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-main block w-full p-2.5 rounded-l-lg py-3 px-4"
                    autocomplete="new-password"
                    aria-autocomplete="list"
                  />
                </div>
              </div>
              <div className="pb-6">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-[#111827]"
                >
                  Confirm Password
                </label>
                <div className="relative text-gray-400">
                  <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                    <MdPassword className="w-6 h-6" />
                  </span>
                  <input
                    type="password"
                    name="confirm-password"
                    id="password"
                    placeholder="••••••••••"
                    className="pl-12 mb-2 bg-white text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-main block w-full p-2.5 rounded-l-lg py-3 px-4"
                    autocomplete="new-password"
                    aria-autocomplete="list"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-[#FFFFFF] bg-main hover:bg-main-dark transition cursor-pointer focus:ring-4 focus:outline-hidden focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
              >
                Sign Up
              </button>
              <div className="text-sm font-light text-mian text-center">
                Don't have an accout yet?{" "}
                <Link
                  to={"/login"}
                  href="#"
                  className="font-medium text-main hover:underline"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="right md:flex-1 w-full h-auto md:h-full bg-[#335FA2] flex justify-center items-center relative">
          <img
            src={signup}
            alt=""
            className="saturate-60 contrast-80 w-80 md:w-auto"
          />

          <div className="back absolute top-4 right-4 z-10 text-white">
            <Link to="/" className="text-white flex items-center gap-2">
              Back To Home
              <BiHome className="h-8 w-8 bg-white text-main btn-circle p-1" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
