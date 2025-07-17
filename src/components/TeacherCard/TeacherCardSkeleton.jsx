import React from "react";

function TeacherCardSkeleton() {
  return (
    <div className="card overflow-hidden relative bg-white border-solid border-2 border-second w-85 pt-4 transition duration-300 rounded-xl animate-pulse">
      {/* New tag skeleton */}
      <div className="absolute -rotate-40 top-2 -left-12 bg-gray-200 text-sm font-[500] px-15 py-1">
        <div className="w-8 h-4 bg-gray-300 rounded"></div>
      </div>

      {/* Image skeleton */}
      <figure>
        <div className="img-box w-35 h-35 btn-circle overflow-hidden bg-gray-200 rounded-full mx-auto">
          <div className="w-full h-full bg-gray-300 rounded-full"></div>
        </div>
      </figure>

      <div className="card-body">
        {/* Header skeleton */}
        <div className="card-head flex justify-between">
          <div className="name">
            <div className="w-32 h-6 bg-gray-200 rounded mb-2"></div>
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="review">
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Center content skeleton */}
        <div className="card-center my-3">
          <ul className="flex justify-between">
            <li>
              <div className="w-40 h-4 bg-gray-200 rounded"></div>
            </li>
            <li>
              <div className="w-8 h-4 bg-gray-200 rounded"></div>
            </li>
          </ul>
        </div>

        {/* Footer skeleton */}
        <div className="card-end">
          <ul className="flex justify-between mb-10">
            <li>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
            </li>
            <li>
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
            </li>
          </ul>
          <div className="card-actions">
            <div className="w-full h-12 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherCardSkeleton;
