import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBooking } from "../../../Store/Reducer/bookingSlice";

function BookingType() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const [selectedBeforeNum, setSelectedBeforeNum] = useState(1);

  const [selectedAfterNum, setSelectedAfterNum] = useState(1);

  const [selected, setSelected] = useState("free");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateBooking({
        lessons: 1,
      })
    );
  }, [selected]);

  

  return (
    <>
      <div className="py-5">
        <div className="cover flex justify-center items-center ">
          <div className="w-[90%] md:w-[70%] xl:w-[50%] mx-auto">
            <ul className="w-full p-0 m-0">
              <li
                className="w-full"
                onClick={() => {
                  setSelected("free"),
                    setSelectedAfterNum(1),
                    setSelectedBeforeNum(1),
                    dispatch(updateBooking({
                      bookingType: "free",
                      name: "Free Trail Lesson",
                      price: 0,
                      lessons: 1,
                    }));
                }}
              >
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

              <li
                className="w-full"
                onClick={() => {
                  setSelected("before"),
                    setSelectedAfterNum(1),
                    dispatch(
                      updateBooking({
                        bookingType: "before",
                        name: "Pay Before Sessions",
                        price: 130,
                      })
                    );
                }}
              >
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

                  {selected === "before" && (
                    <div className="lesson mt-5">
                      <p>How many lessons you want to book?</p>
                      <div className="flex justify-center">
                        <ul className="grid grid-cols-5 lg:flex justify-center gap-5 mt-4">
                          {numbers.map((num) => (
                            <li
                              key={num}
                              className={`text-sm p-2 text-center w-10 rounded-full border-1 border-solid border-main text-main ${
                                selectedBeforeNum === num
                                  ? "bg-main text-white"
                                  : "bg-white"
                              }`}
                              onClick={() => {setSelectedBeforeNum(num),
                                dispatch(
                                  updateBooking({
                                    lessons: num,
                                  })
                                );
                              }}
                            >
                              {num}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </li>

              <li
                className="w-full"
                onClick={() => {
                  setSelected("after"),
                    setSelectedBeforeNum(1),
                    dispatch(updateBooking({
                      bookingType: "after",
                      name: "Pay After Sessions",
                      price: 150,
                    }));

                }}
              >
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

                  {selected === "after" && (
                    <div className="lesson mt-5">
                      <p>How many lessons you want to book?</p>
                      <div className="flex justify-center">
                        <ul className="grid grid-cols-2 md:flex justify-center gap-5 mt-4">
                          {numbers.map((num) => (
                            <li
                              key={num}
                              className={`text-sm p-2 text-center w-10 rounded-full border-1 border-solid border-main text-main ${
                                selectedAfterNum === num
                                  ? "bg-main text-white"
                                  : "bg-white"
                              }`}
                              onClick={() => {setSelectedAfterNum(num),
                                dispatch(
                                  updateBooking({
                                    lessons: num,
                                  })
                                );
                              }}
                            >
                              {num}
                            </li>
                          )).slice(0, 2)}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </>
  );
}

export default BookingType;
