import React, { useState } from "react";
import TeacherCard from "../TeacherCard/TeacherCard";
import TeacherCardSkeleton from "../TeacherCard/TeacherCardSkeleton";
import Teachers from "../HomeTeachers/Data";
import { useGetData } from "@/hooks/useGetData";
import TeachersPagination from "../ui/teachers-pagination";
import { SearchIcon } from "lucide-react";

function AllTeacherSection() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: teachersData,
    isLoading,
    error,
  } = useGetData({
    endpoint: `teachers?page=${currentPage}`,
    queryKey: ["teachers", currentPage],
  });

  // Use API data if available, otherwise fall back to static data
  const teachersToShow = teachersData?.data?.teachers || Teachers || [];
  const pagination = teachersData?.data?.pagination;

  return (
    <>
      <div className="cover items-center justify-center pb-20">
        <div className="sec-head my-10 text-center w-full">
          <h1 className="text-3xl font-bold">Get To Know Our Teachers</h1>
          <span className="text-main">__________________</span>

          {/* Show error state */}
          {error && (
            <div className="mt-4 text-sm text-red-500">
              Failed to load teachers from API, showing demo data
            </div>
          )}
        </div>
        <div className="cards flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
              // Show skeleton cards while loading
              Array.from({ length: pagination?.per_page || 6 }).map(
                (_, index) => <TeacherCardSkeleton key={`skeleton-${index}`} />
              )
            ) : // Show actual teacher cards
            teachersToShow?.length > 0 ? (
              teachersToShow?.map((teacher, index) => (
                <TeacherCard key={teacher.id || index} teacher={teacher} />
              ))
            ) : (
              <div className="text-center font-bold col-span-3 flex flex-col justify-center items-center h-full">
                <img
                  src={"/not-found.png"}
                  alt="search"
                  className="w-120 h-120"
                />
                <p className="text-main bg-main/30 rounded-lg p-3 px-10 text-lg">
                  No Teachers Found
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Pagination */}
        {pagination && !isLoading && teachersToShow?.length > 0 && (
          <div className="pagination flex justify-center items-center mt-10">
            <TeachersPagination
              last_page={pagination?.last_page}
              setCurrentPage={setCurrentPage}
              current_page={currentPage}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default AllTeacherSection;
