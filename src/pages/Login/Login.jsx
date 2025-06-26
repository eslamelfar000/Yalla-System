import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import login from "../../assets/login.png";
import AuthImageSide from "@/components/AuthImageSide/AuthImageSide";
import LoginForm from "./LoginForm";

export default function Login() {


  return (
    <div className="cover flex flex-col-reverse md:flex-row justify-between items-center h-screen overflow">
      <div className="left flex-1 w-full h-full flex justify-between items-center">
        <div className="flex flex-col w-[90%] xl:w-[70%] mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 rounded-2xl shadow-xl bg-second">
          <div className="flex flex-col justify-center mx-auto items-center gap-3">
            <img src={logo} alt="Logo" />
          </div>

          <div className="text-md text-[#6B7280] pb-2 mx-auto">
            Login to your account
          </div>

          <LoginForm />

          <p className="text-sm text-center">
            Don’t have an account yet?{" "}
            <Link
              to="/register"
              className="font-medium text-main hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <AuthImageSide image={login} />
    </div>
  );
}
