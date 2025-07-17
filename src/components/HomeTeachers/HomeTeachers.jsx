import React from "react";
import TeacherCard from "../TeacherCard/TeacherCard";
import Teachers from "./Data";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import TeacherCardSkeleton from "../TeacherCard/TeacherCardSkeleton";
function HomeTeachers({ teachers, isLoading }) {
  console.log("teachers", teachers);
  const homeTeacher = teachers || Teachers || [];
  return (
    <>
      <div className="cover py-20 items-center justify-center">
        <div className="sec-head mb-10 text-center w-full">
          <h1 className="text-3xl font-bold">Get To Know Our Teachers</h1>
        </div>
        <div className="cards flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading
              ? // Show skeleton cards while loading
                Array.from({ length: 6 }).map((_, index) => (
                  <TeacherCardSkeleton key={`skeleton-${index}`} />
                ))
              : homeTeacher
                  ?.map((teacher, index) => (
                    <TeacherCard key={teacher.id || index} teacher={teacher} />
                  ))
                  .slice(0, 6)}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Link to={"/teachers"}>
            <button className="btn bg-white border-2 border-solid border-main rounded-xl text-main  hover:bg-main hover:text-white">
              Show More
              <ArrowRightIcon width={20} />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomeTeachers;
