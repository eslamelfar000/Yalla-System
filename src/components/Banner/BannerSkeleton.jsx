import React from "react";

function BannerSkeleton() {
  return (
    <div className="cover flex justify-center items-center bg-second lg:h-110">
      <div className="lg:flex w-[90%] md:w-[80%] xl:w-[70%] justify-between items-center py-20">
        <div className="left flex-2 pr-10 xl:pr-30 mb-10 lg:mb-0">
          <div className="header flex items-center gap-3 mb-10">
            <div className="h-8 bg-gray-300 rounded animate-pulse w-32"></div>
            <div className="h-12 bg-gray-300 rounded animate-pulse w-20"></div>
          </div>

          <div className="h-12 bg-gray-300 rounded animate-pulse w-full mb-5"></div>
          <div className="h-12 bg-gray-300 rounded animate-pulse w-3/4 mb-5"></div>

          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-5/6"></div>
          </div>
        </div>

        <div className="right h-full flex-1 flex justify-center items-center">
          <div className="h-96 bg-gray-300 rounded animate-pulse w-full max-w-md"></div>
        </div>
      </div>
    </div>
  );
}

export default BannerSkeleton;
