import { cn } from "@/lib/utils";
import React from "react";
import { BiHome } from "react-icons/bi";
import { Link } from "react-router-dom";

function AuthImageSide({ image, className }) {
  return (
    <div
      className={cn(
        "right md:flex-1 w-full h-auto md:h-full bg-[#335FA2] flex justify-center items-center relative",
        className
      )}
    >
      <img
        src={image}
        alt=""
        className="w-full object-contain hidden md:block"
      />

      <div className="back absolute top-4 right-4 z-10 text-white">
        <Link
          to="/"
          className="text-main md:text-white flex items-center gap-2 p-2 rounded-lg transition duration-300"
        >
          Back To Home
          <BiHome className="h-8 w-8 bg-white text-main btn-circle p-1" />
        </Link>
      </div>
    </div>
  );
}

export default AuthImageSide;
