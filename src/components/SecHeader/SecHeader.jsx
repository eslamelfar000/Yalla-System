import React from "react";
import teachback from "../../assets/back1.jpg";

function SecHeader({ title, subtitle, size }) {
  return (
    <>
      <div
        className={`relative w-full bg-cover bg-center bg-no-repeat ${
          size ? "hidden lg:flex" : "flex"
        }`}
        style={{ backgroundImage: `url(${teachback})` }}
      >
        <div className="mb-10 text-center w-full py-20 before:bg-black before:opacity-70 before:absolute before:left-0 before:top-0 before:w-full before:h-full before:z-0">
          <div className="z-10 relative">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-5">
              {title}
            </h1>
            <h1 className="text-main text-4xl md:text-5xl font-bold">
              {subtitle}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default SecHeader;
