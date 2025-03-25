import React from "react";
import Reviews from "./Reviews";
import Teachers from "../../HomeTeachers/Data";

function ShowReviews() {
  return (
    <>
      <div className="cover">
        <div className="sec-head mb-5 w-full">
          <h1 className="text-xl font-bold">63 Review (4.3) </h1>
        </div>
        <div className="cards flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Teachers?.map((teacher, index) => (
              <Reviews
                key={index}
                name={teacher.name}
                rating={teacher.rating}
                img={teacher.img}
              />
            )).slice(0, 4)}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowReviews;
