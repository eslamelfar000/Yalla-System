import React from "react";

function TeacherInfoSkeleton() {
  return (
    <div className="teacher-info mb-7 pb-7 border-b-2 border-solid border-second animate-pulse">
      <div className="top sm:flex gap-7 mb-15">
        {/* Avatar skeleton */}
        <div className="avatar overflow-hidden rounded-full w-25 h-25 mb-5 sm:mb-0 bg-gray-200">
          <div className="w-full h-full bg-gray-300 rounded-full"></div>
        </div>

        {/* Info skeleton */}
        <div className="info">
          <div className="w-48 h-6 bg-gray-200 rounded mb-2"></div>
          <div className="w-32 h-4 bg-gray-200 rounded mb-3"></div>

          {/* Languages skeleton */}
          <div className="speak flex gap-2 mt-3">
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
            <div className="flex gap-2">
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Certificate skeleton */}
          <div className="cer sm:flex gap-2 mt-3">
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
            <div className="w-80 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="end">
        <div className="flex gap-5 mb-3">
          <div className="w-20 h-6 bg-gray-200 rounded"></div>
          <div className="w-24 h-6 bg-gray-200 rounded"></div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-3">
          <div className="w-full h-4 bg-gray-200 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
          <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
          <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default TeacherInfoSkeleton;
