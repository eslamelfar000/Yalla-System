import React, { useState } from "react";

function BookingType() {
  const numberBefore = [1, 2, 3, 4, 5, 6, 7, 8];
  const [selectedBeforeNum, setSelectedBeforeNum] = useState(0);

  const numberAfter = [1, 2];
  const [selectedAfterNum, setSelectedAfterNum] = useState(0);

  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="py-10">
        <div className="head">
          <h1 className="py-5 text-2xl font-[700] border-b-1 border-solid border-second mb-10 text-center">
            Select your booking type
          </h1>
        </div>
        <div className="cover py-5 flex justify-center items-center ">
          <div className="w-[90%] md:w-[70%] xl:w-[50%] mx-auto">
            <ul className="w-full p-0 m-0">
              <li className="w-full" onClick={() => setSelected("free")}>
                <div
                  className={`p-5 rounded-xl mb-10 w-full border-1 border-solid border-border transition-all duration-300 hover:bg-second cursor-pointer ${
                    selected === "free" && "bg-second border-main"
                  }`}
                >
                  <h2 className="text-xl font-[600] text-left mb-3">
                    Free Trail Lesson
                  </h2>
                  <p className="text-sm opacity-70 mb-5">
                    You have a free lesson for trusting us in your learning
                    journey
                  </p>

                  <div className="hour flex justify-between items-center">
                    <p className="text-lg font-[500]">1 hour</p>
                    <p className="text-xl font-[600]">0 ILS</p>
                  </div>
                </div>
              </li>

              <li className="w-full" onClick={() => {setSelected("before"), setSelectedAfterNum(0)}}>
                <div
                  className={`p-5 rounded-xl mb-10 w-full border-1 border-solid border-border transition-all duration-300 hover:bg-second cursor-pointer ${
                    selected === "before" && "bg-second border-main"
                  }`}
                >
                  <h2 className="text-xl font-[600] text-left mb-3">
                    Pay Before Sessions
                  </h2>
                  <p className="text-sm opacity-70 mb-5">
                    Book more than 2 sessions and pay in advance before
                    attending
                  </p>

                  <div className="hour flex justify-between items-center">
                    <p className="text-lg font-[500]">1 hour</p>
                    <p className="text-xl font-[600] flex items-center gap-1">
                      <span> 130 ILS</span>
                      <span>(Session)</span>
                    </p>
                  </div>

                  <div className="lesson mt-5">
                    <p>How many lessons you want to book?</p>
                    <div className="flex justify-center">
                      <ul className="grid grid-cols-5 lg:flex justify-center gap-5 mt-4">
                        {numberBefore.map((num) => (
                          <li
                            key={num}
                            className={`text-sm p-2 text-center w-10 rounded-full border-1 border-solid border-main text-main ${
                              selectedBeforeNum === num
                                ? "bg-main text-white"
                                : "bg-white"
                            }`}
                            onClick={() => setSelectedBeforeNum(num)}
                          >
                            {num}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>

              <li className="w-full" onClick={() => {setSelected("after"), setSelectedBeforeNum(0)}}>
                <div
                  className={`p-5 rounded-xl mb-10 w-full border-1 border-solid border-border transition-all duration-300 hover:bg-second cursor-pointer ${
                    selected === "after" && "bg-second border-main"
                  }`}
                >
                  <h2 className="text-xl font-[600] text-left mb-3">
                    Pay After Sessions
                  </h2>
                  <p className="text-sm opacity-70 mb-5">
                    Book 1 or 2 sessions now and pay after completing them
                  </p>

                  <div className="hour flex justify-between items-center">
                    <p className="text-lg font-[500]">1 hour</p>
                    <p className="text-xl font-[600] flex items-center gap-1">
                      <span> 150 ILS</span>
                      <span>(Session)</span>
                    </p>
                  </div>

                  <div className="lesson mt-5">
                    <p>How many lessons you want to book?</p>
                    <div className="flex justify-center">
                      <ul className="grid grid-cols-2 md:flex justify-center gap-5 mt-4">
                        {numberAfter.map((num) => (
                          <li
                            key={num}
                            className={`text-sm p-2 text-center w-10 rounded-full border-1 border-solid border-main text-main ${
                              selectedAfterNum === num
                                ? "bg-main text-white"
                                : "bg-white"
                            }`}
                            onClick={() => setSelectedAfterNum(num)}
                          >
                            {num}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bottom px-5 lg:px-30 mt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="back flex items-center gap-3 mb-5 sm:mb-0">
                <div className="img overflow-hidden rounded-full w-10 h-10">
                  <img
                    src="https://randomuser.me/api/portraits/men/2.jpg"
                    alt=""
                  />
                </div>
                 {selected !== null && (
                <p className="text-md font-[400] py-2 px-3 border-1 border-solid border-border rounded-xl flex gap-2">
                  <span>
                    {selected === "free"
                      ? "Free Trail Lesson"
                      : selected === "before"
                      ? "Pay Before Sessions"
                      : "Pay After Sessions"}
                  </span>
                  {selected !== "free" && (
                    <>
                      <span>|</span>
                      <span>
                        {selected === "before"
                          ? selectedBeforeNum
                          : selectedAfterNum}{" "}
                        Lessons
                      </span>
                    </>
                  )}
                </p>
                 )}
              </div>
            <div className="next flex items-center gap-5">
              <div className="price">
                <p className="text-3xl font-[600]">130 ILS</p>
              </div>
              <button
                disabled={!selected || (selected === "before" && !selectedBeforeNum) || (selected === "after" && !selectedAfterNum)}
                className={`btn text-white font-[600] bg-main py-2 px-10 rounded-xl shadow-none border-2 border-solid ${
                  selected === "free" && "border-main" || (selected === "before" && selectedBeforeNum) && "border-main" || (selected === "after" && selectedAfterNum) && "border-main"
                } hover:bg-white hover:text-main`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingType;
