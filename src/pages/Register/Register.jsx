import React from "react";
import logo from "../../assets/logo.png";
import signup from "../../assets/sign-up.png";
import { Link } from "react-router-dom";
import AuthImageSide from "@/components/AuthImageSide/AuthImageSide";
import RegisterForm from "./RegisterForm";


function Register() {

  return (
    <div className="relative block md:flex md:flex-row justify-between items-start h-screen py-10 md:py-0">
      <div className="left flex-1 w-full h-full flex justify-center items-start md:items-center">
        <div className="flex flex-col w-[90%] xl:w-[70%] mx-auto p-8 md:p-10 2xl:p-12 rounded-2xl shadow-xl bg-second">
          {/* Header */}
          <div className="flex flex-col justify-center mx-auto items-center gap-3">
            <img src={logo} alt="Logo" />
          </div>
          <div className="text-sm font-light text-[#6B7280] pb-4 mx-auto">
            Create your account
          </div>
          <RegisterForm />

          {/* Link */}
          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold underline text-main">
              Login
            </Link>
          </p>
        </div>
      </div>

        <AuthImageSide image={signup} className={'hidden md:block'} />
    </div>
  );
}

export default Register;
