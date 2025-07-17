import React from "react";

function ReviewsSkeleton() {
  return (
    <div className="cover animate-pulse">
      <div className="sec-head mb-5 w-full">
        <div className="w-48 h-6 bg-gray-200 rounded mb-2"></div>
      </div>
      <div className="cards flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="item bg-second p-5 rounded-md">
              <div className="top flex gap-5 justify-between items-start lg:items-center">
                <div className="flex flex-col md:flex-row gap-3 items-center">
                  <div className="avatar overflow-hidden rounded-full w-15 h-15 bg-gray-200">
                    <div className="w-full h-full bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="w-24 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="bottom mt-5">
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gray-200 rounded"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewsSkeleton;
