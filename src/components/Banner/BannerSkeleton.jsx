import React from "react";

function BannerSkeleton() {
  return (
    <div className="cover flex justify-center items-center bg-second">
      <div className="max-w-6xl px-6 mx-auto grid grid-cols-12 items-center py-20">
        <div className="left col-span-12 md:col-span-7 pr-10 xl:pr-30 mb-10 lg:mb-0">
          <div className="header flex items-center gap-3 mb-10">
            <div className="border-r-2 border-second-dark border-solid pr-5 mr-2">
              <div className="h-[100px] w-[150px] bg-gray-300 rounded-lg animate-pulse"></div>
            </div>
            <div className="h-[100px] w-[150px] bg-gray-300 rounded-lg animate-pulse"></div>
          </div>

          <div className="h-8 bg-gray-300 rounded animate-pulse w-full mb-5"></div>
          <div className="h-8 bg-gray-300 rounded animate-pulse w-3/4 mb-5"></div>

          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-5/6"></div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 h-full w-full flex-1 flex justify-center items-center">
          <div className="h-96 bg-gray-300 rounded-lg animate-pulse w-full"></div>
        </div>
      </div>
    </div>
  );
}

export default BannerSkeleton;
