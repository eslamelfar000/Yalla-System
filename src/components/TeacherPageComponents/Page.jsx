import React from "react";
import TeacherInfo from "./TeacherInfo/TeacherInfo";
import TeacherVideo from "./TeacherVideo/TeacherVideo";
import AddComment from "./AddComment/AddComment";
import ShowReviews from "./Reviews/ShowReviews";

function Page({ teacherId }) {
  return (
    <>
      <div className="bg-second">
        <div className="lg:hidden p-5">
          <div className=" p-5 bg-white rounded-md shadow-lg">
            <TeacherInfo />
          </div>
        </div>
        <div className=" p-5  xl:w-[80%] flex flex-col-reverse lg:flex-row justify-between mx-auto gap-5">
          <div className="left flex-2 bg-white p-5 rounded-md shadow-lg">
            <div className="cover lg:flex hidden">
              <TeacherInfo />
            </div>
            <ShowReviews />
          </div>

          <div className="right flex-1 rounded-md">
            <TeacherVideo />
            <AddComment teacherId={teacherId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
