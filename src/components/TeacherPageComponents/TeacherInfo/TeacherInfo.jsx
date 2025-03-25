import React, { useState } from "react";

function TeacherInfo() {
  const [activeTab, setActiveTab] = useState("about-me");
  const [more, setMore] = useState(false);

  return (
    <>
      <div className="teacher-info mb-7 pb-7 border-b-2 border-solid border-second">
        <div className="top sm:flex gap-7 mb-15">
          <figure className="avatar overflow-hidden rounded-full w-25 h-25 mb-5 sm:mb-0">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="teacher avatar"
              className="object-cover"
            />
          </figure>
          <div className="info">
            <h2 className="text-xl font-[600]">Cody Fisher</h2>
            <span className="opacity-50 text-md">Arabic Teacher</span>
            <div className="speak flex gap-2 mt-3">
              <span className="opacity-60">Speak: </span>
              <ul className="flex gap-2">
                <li className="text-main">Arabic,</li>
                <li className="text-main">English,</li>
                <li className="text-main">Hebrew</li>
              </ul>
            </div>

            <div className="cer sm:flex gap-2 mt-3">
              <span className="opacity-60">Certificate: </span>
              <p className="text-main">
                Native Arabic and International Certified Teacher with 5 years
                of Experience
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
                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore`.slice(
                  0,
                  more ? 5000 : 300
                )}
                <span className={`${more ? "hidden" : ""}`}>......</span>
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
                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore
                
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore
                `.slice(0, more ? 5000 : 500)}
                <span className={`${more ? "hidden" : ""}`}>......</span>
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
