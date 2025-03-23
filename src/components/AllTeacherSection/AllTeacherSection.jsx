import React from "react";
import TeacherCard from "../TeacherCard/TeacherCard";
import Teachers from "../HomeTeachers/Data";
import teachback from "../../assets/back1.jpg";

function AllTeacherSection() {
  return (
    <>
      <div className="cover items-center justify-center pb-20">
        <div
          className="relative w-full bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: `url(${teachback})` }}
        >
          <div className="mb-10 text-center w-full py-20 md:py-30 before:bg-black before:opacity-70 before:absolute before:left-0 before:top-0 before:w-full before:h-full before:z-0">
            <div className="z-10 relative">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-5">
                Your journey to Arabic fluency
              </h1>
              <h1 className="text-main text-4xl md:text-5xl font-bold">
                Starts here !
              </h1>
            </div>
          </div>
        </div>

        <div className="sec-head my-10 text-center w-full">
          <h1 className="text-3xl font-bold">Get To Know Our Teachers</h1>
          <span className="text-main">__________________</span>
        </div>
        <div className="cards flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Teachers?.map((teacher, index) => (
              <TeacherCard
                key={index}
                name={teacher.name}
                role={teacher.role}
                rating={teacher.rating}
                languages={teacher.languages}
                price={teacher.price}
                img={teacher.img}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllTeacherSection;
