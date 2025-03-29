import React, { use, useEffect } from "react";
import BackButton from "../StepsButtons/BackButton";
import NextButton from "../StepsButtons/NextButton";
import { useDispatch, useSelector } from "react-redux";
import { RiAlarmFill } from "react-icons/ri";
import { updateBooking } from "../../../Store/Reducer/bookingSlice";

function Control() {
  const booking = useSelector((state) => state.booking?.booking);
  const currentStep = useSelector((state) => state.step.currentStep);
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions

  // const formatDate = (dateString) => {
  //   return new Intl.DateTimeFormat("en-US", {
  //     weekday: "short",
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   }).format(new Date(dateString));
  // };

  useEffect(() => {
    if (currentStep === "bookingType") {
      dispatch(updateBooking({ eventDate: [] })); // Dispatch immediately with correct data
    }
  }, [currentStep]);

  // console.log(booking);

  return (
    <>
      <div className="bottom p-5 lg:px-30 sticky bottom-0 w-full bg-second z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="back flex items-center gap-3 mb-5 sm:mb-0">
            <div className="cover flex items-center gap-3">
              {currentStep !== "bookingType" && (
                <BackButton selected={booking?.bookingType} />
              )}
              <div className="img overflow-hidden rounded-full w-10 h-10">
                <img
                  src="https://randomuser.me/api/portraits/men/2.jpg"
                  alt=""
                />
              </div>
            </div>
            
            <p className="text-md font-[400] py-1 px-3 text-sm border-1 border-solid border-border rounded-lg flex gap-1 opacity-70 items-center">
              <span>
                {booking?.bookingType === "free"
                  ? "Free Trail Lesson"
                  : booking?.bookingType === "before"
                  ? "Pay Before Sessions"
                  : "Pay After Sessions"}
              </span>
              {booking?.bookingType !== "free" && (
                <>
                  <span>|</span>
                  <span className="flex items-center gap-1">
                    <span>{booking?.lessons}</span>
                    <span>{booking?.lessons > 1 ? "Lessons" : "Lesson"}</span>
                  </span>
                </>
              )}
            </p>

            {/* {currentStep === "sessionCalendar" && (
              <div className="grid grid-cols-2 gap-2">
                {booking?.eventDate?.length !== 0 ? (
                  booking?.eventDate?.map((date) => {
                    return (
                      <p className="text-md font-[400] py-1 px-3 text-sm border-1 border-solid border-border rounded-lg flex gap-2 items-center opacity-70">
                        <span>
                          <RiAlarmFill />
                        </span>
                        <span>
                          {formatDate(date?.start)} -
                          {new Date(date?.end).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </p>
                    );
                  })
                ) : (
                  <p className="text-md font-[400] py-1 px-3 text-sm border-1 border-solid border-border rounded-lg flex gap-2 items-center opacity-70">
                    <span>
                      <RiAlarmFill />
                    </span>
                    <span>No Time Set</span>
                  </p>
                )}
              </div>
            )} */}
          </div>
          <div className="next flex items-center gap-5">
            <div className="price">
              <p className="text-3xl font-[600]">
                {booking?.price} {booking?.currency}
              </p>
            </div>
            <NextButton
              selected={booking?.bookingType}
              block={
                currentStep === "sessionCalendar"
                  ? booking?.eventDate?.length === 0 ||
                    (booking?.eventDate?.length !== booking?.lessons && true)
                  : false
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Control;
