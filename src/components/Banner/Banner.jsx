import React from "react";
import logo from "../../assets/logo.png";
import banner from "../../assets/banner.png";

function Banner() {
  return (
    <>
      <div className="cover flex justify-center items-center bg-second lg:h-110">
        <div className="lg:flex w-[90%] md:w-[80%] xl:w-[70%] justify-between items-center py-20">
          <div className="left flex-2 pr-10 xl:pr-30 mb-10 lg:mb-0">
            <div className="header flex items-center gap-3 mb-10">
              <h2 className="text-3xl font-[600] border-r-2 border-second-dark border-solid pr-5">
                empathy.
              </h2>
              <img src={logo} alt="" className="w-50 pl-5" />
            </div>

            <h1 className="text-4xl xl:text-5xl font-[600] mb-5">
              Support doesn't end with a claim
            </h1>

            <p className="opacity-90 text-sm lg:text-md mb-5">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo.
            </p>

            <button className="btn bg-second text-main shadow-none border-1 border-solid border-main hover:bg-main hover:text-white transoition ">
              Get Started
            </button>
          </div>

          <div className="right h-full flex-1 flex justify-center items-center">
            <img src={banner} alt="" className="w-100" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
