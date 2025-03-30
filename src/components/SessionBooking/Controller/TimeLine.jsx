import React, { use, useEffect } from "react";
import BackButton from "../StepsButtons/BackButton";
import NextButton from "../StepsButtons/NextButton";
import { useDispatch, useSelector } from "react-redux";
import { RiAlarmFill, RiCloseCircleFill } from "react-icons/ri";
import { updateBooking } from "../../../Store/Reducer/bookingSlice";

function TimeLine({ handleDeleteMobileEvent, handleDeleteWebEvent }) {
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
      <div className="p-5 lg:px-30 mt-5 md:mt-15 bottom-0 w-full bg-gray-900 text-white">
        <div className="sm:flex-row justify-between items-center">
          <div className="back flex items-center gap-3">
            {currentStep === "sessionCalendar" && (
              <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                {booking?.eventDate?.length !== 0 ? (
                  booking?.eventDate?.map((date) => {
                    return (
                      <div
                        key={date?.id}
                        className="text-md font-[400] py-1 px-3 text-sm border-1 border-solid border-border rounded-lg flex gap-2 justify-between items-center opacity-70"
                      >
                        <div className="span flex items-center gap-1">
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
                        </div>
                        <span
                          className="rounded-full"
                          onClick={() => {
                            window.innerWidth < 768
                              ? handleDeleteMobileEvent(date?.id)
                              : handleDeleteWebEvent(date?.id);
                          }}
                        >
                          <RiCloseCircleFill className="w-5 h-5 text-red-400" />
                        </span>
                      </div>
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
