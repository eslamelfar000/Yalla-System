import React from "react";

function TeacherVideoSkeleton() {
  return (
    <div className="cover animate-pulse">
      {/* Video skeleton */}
      <div className="video shadow-lg">
        <div className="w-full h-72 bg-gray-200 rounded-md">
          <div className="w-full h-full bg-gray-300 rounded-md"></div>
        </div>
      </div>

      {/* Booking card skeleton */}
      <div className="book bg-white p-5 rounded-md mt-5 shadow-lg">
        <div className="head flex justify-between items-center mb-5 border-b-1 border-second border-solid pb-5">
          <div className="w-32 h-6 bg-gray-200 rounded"></div>
          <div className="w-16 h-8 bg-gray-200 rounded"></div>
        </div>

        <ul className="flex flex-col gap-5 mt-10">
          <li>
            <div className="w-full h-12 bg-gray-200 rounded-md"></div>
          </li>
          <li>
            <div className="w-full h-12 bg-gray-200 rounded-md"></div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TeacherVideoSkeleton;
