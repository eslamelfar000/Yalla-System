import React from "react";
import logo from "../../assets/logo.png";
import banner from "../../assets/banner.png";
import { useSettings } from "../../context/SettingsContext";
import BannerSkeleton from "./BannerSkeleton";

function Banner() {
  const { banner: bannerData, isLoading, error } = useSettings();

  // Show loading skeleton while fetching data
  if (isLoading) {
    return <BannerSkeleton />;
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="cover flex justify-center items-center bg-second lg:h-110">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Error Loading Banner
          </h2>
          <p className="text-gray-600">
            Failed to load banner content. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Extract data from banner settings
  const {
    title = "Support doesn't end with a claim",
    partner_logo = "empathy.",
    description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo.",
    banner = bannerData?.banner,
    logo = bannerData?.logo,
  } = bannerData;

  if (bannerData?.partner === "false") {
    return "";
  }

  return (
    <>
      <div className="cover flex justify-center items-center bg-second">
        <div className="max-w-6xl px-6 mx-auto grid grid-cols-12 items-center py-20">
          <div className="left col-span-12 md:col-span-7 pr-10 xl:pr-30 mb-10 lg:mb-0">
            <div className="header flex items-center gap-3 mb-10">
              <h2 className="text-3xl font-[600] border-r-2 border-second-dark border-solid pr-5 mr-2">
                <img
                  src={partner_logo}
                  alt=""
                  className="w-[150px] h-[100px] rounded-lg object-contain"
                />
              </h2>
              <img
                src={logo}
                alt=""
                className="w-[150px] h-[100px] rounded-lg object-contain"
              />
            </div>

            <h1 className="text-2xl xl:text-3xl font-[600] mb-5">{title}</h1>

            <p className="opacity-90 text-sm lg:text-md mb-5">{description}</p>

            {/* <button className="btn bg-second text-main shadow-none border-1 border-solid border-main hover:bg-main hover:text-white transoition ">
              Get Started
            </button> */}
          </div>

          <div className="col-span-12 md:col-span-5 h-full w-full flex-1 flex justify-center items-center">
            <img
              src={banner}
              alt=""
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
