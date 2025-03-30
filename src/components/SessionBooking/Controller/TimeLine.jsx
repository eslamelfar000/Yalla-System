import React, { use, useEffect } from "react";
import BackButton from "../StepsButtons/BackButton";
import NextButton from "../StepsButtons/NextButton";
import { useDispatch, useSelector } from "react-redux";
import { RiAlarmFill } from "react-icons/ri";
import { updateBooking } from "../../../Store/Reducer/bookingSlice";

function TimeLine() {
  const booking = useSelector((state) => state.booking?.booking);
  const currentStep = useSelector((state) => state.step.currentStep);
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  useEffect(() => {
    if (currentStep === "bookingType") {
      dispatch(updateBooking({ eventDate: [] })); // Dispatch immediately with correct data
    }
  }, [currentStep]);


  return (
    <>
      <div className="p-5 lg:px-30 mt-5 md:mt-15 bottom-0 w-full bg-second ">
        <div className="sm:flex-row justify-between items-center">
          <div className="back flex items-center gap-3 mb-5 sm:mb-0">
            {currentStep === "sessionCalendar" && (
              <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                {booking?.eventDate?.length !== 0 ? (
                  booking?.eventDate?.map((date) => {
                    return (
                      <p
                        key={date?.id}
                        className="text-md font-[400] py-1 px-3 text-sm border-1 border-solid border-border rounded-lg flex gap-2 items-center opacity-70"
                      >
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TimeLine;
