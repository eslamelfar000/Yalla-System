import React, { useState } from "react";

function TeacherInfo({ teacher }) {
  const [activeTab, setActiveTab] = useState("about-me");
  const [more, setMore] = useState(false);



  // Handle case where teacher is undefined
  if (!teacher) {
    return (
      <div className="teacher-info mb-7 pb-7 border-b-2 border-solid border-second">
        <div className="text-center py-8">
          <div className="text-gray-500">No teacher data available</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="teacher-info mb-7 pb-7 border-b-2 border-solid border-second w-full">
        <div className="top sm:flex gap-7 mb-15">
          <figure className="flex-1avatar overflow-hidden rounded-full w-25 h-25 mb-5 sm:mb-0 border-2 border-solid border-main p-1">
            <img
              src={
                teacher?.image ===
                "https://indigo-ferret-819035.hostingersite.com/"
                  ? "https://randomuser.me/api/portraits/men/1.jpg"
                  : teacher?.image
              }
              alt={teacher?.name || "teacher avatar"}
              className="object-cover w-full h-full rounded-full"
            />
          </figure>
          <div className="info flex-1">
            <h2 className="text-xl font-[600]">
              {teacher?.name || "Teacher Name"}
            </h2>
            <span className="opacity-50 text-md">
              {teacher?.role || "Teacher"}
            </span>
            <div className="speak flex gap-2 mt-3">
              <span className="opacity-60">Speak: </span>
              <ul className="flex gap-2">
                {teacher?.languages ? (
                  <span className="text-main">
                    {teacher?.languages}
                  </span>
                ) : (
                  <span className="text-main">No Language Added</span>
                )}
              </ul>
            </div>

            <div className="cer sm:flex gap-2 mt-3">
              <span className="opacity-60">Certificate: </span>
              <p className="text-main">
                {teacher?.certificate || "No Certificate Added"}
              </p>
            </div>
          </div>
        </div>

        <div className="end">
          <ul className="flex gap-5 mb-3">
            <li>
              <button
                onClick={() => setActiveTab("about-me")}
                className={`${
                  activeTab === "about-me"
                    ? "opacity-100 border-b-1 border-main"
                    : ""
                } text-main bg-whte font-[500] opacity-60  border-solid  trnsition user-select-none cursor-pointer`}
              >
                About Me
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("about-course")}
                className={`${
                  activeTab === "about-course"
                    ? "opacity-100 border-b-1 border-main"
                    : ""
                } text-main bg-whte font-[500] opacity-60  border-solid  trnsition user-select-none cursor-pointer`}
              >
                About Course
              </button>
            </li>
          </ul>

          {activeTab === "about-me" ? (
            <div className="about-me">
              <p className="opacity-60 text-md">
                {teacher?.about_me?.slice(0, more ? 5000 : 300) || "No data"}
                {!more && "...."}
              </p>
              <button
                onClick={() => setMore(!more)}
                className="btn p-0 shadow-none text-main-light bg-white hover:bg-white border-none font-[400] opacity-90 cursor-pointer"
              >
                Read {more ? "Less" : "More"}
              </button>
            </div>
          ) : (
            <div className="about-course">
              <p className="opacity-60 text-md">
                {teacher?.about_course?.slice(0, more ? 5000 : 500) ||
                  "No data"}
                {!more && "...."}
              </p>
              <button
                onClick={() => setMore(!more)}
                className="btn p-0 shadow-none text-main-light bg-white hover:bg-white border-none font-[400] opacity-90 cursor-pointer"
              >
                Read {more ? "Less" : "More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TeacherInfo;
