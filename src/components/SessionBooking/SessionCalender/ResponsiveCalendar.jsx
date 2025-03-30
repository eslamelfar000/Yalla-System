import React, { useEffect, useState } from "react";
import { Events } from "./Data";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./calendar.css";
import { useDispatch, useSelector } from "react-redux";
import AlertModal from "../Controller/AlertModal";
import { updateBooking } from "../../../Store/Reducer/bookingSlice";
import TimeLine from "../Controller/TimeLine";

function ResponsiveCalendar() {
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedEvents, setSelectedEvents] = useState([]);
  const lessonNumber = useSelector((state) => state.booking.booking.lessons); // Get lesson number from Redux store
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleSelect = (day) => {
    if (day) {
      setSelectedDay(day); // Only update if a new day is selected
    }
  };


  const handleSelectEvent = (event) => {
    const isSelected = selectedEvents.some((e) => e.id === event.id);

    if (isSelected) {
      // Deselect the event
      setSelectedEvents(selectedEvents.filter((e) => e.id !== event.id));
      dispatch(updateBooking({ eventDate: selectedEvents }));
    } else if (selectedEvents.length < lessonNumber) {
      // Select event if within the limit
      setSelectedEvents([...selectedEvents, event]);
    } else {
      setShowModal(true); // Show modal if limit is reached
    }
  };

  useEffect(() => {
    if (selectedEvents.length > 0) {
      dispatch(updateBooking({ eventDate: selectedEvents }));
    } else {
      dispatch(updateBooking({ eventDate: [] })); // Reset if no events are selected
    }
  }, [selectedEvents, dispatch]);

  const filteredEvents = Events?.filter((event) => {
    if (!event?.start && !event?.end) return false;

    const eventDate = new Date(event?.start);
    const selectedDate =
      selectedDay instanceof Date ? selectedDay : new Date(selectedDay);

    return (
      event.status !== "booked" &&
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear() // Ensure the same year
    );
  });

  // console.log(Events);
  

  return (
    <>
      <div className="cover block md:hidden">
        {/* warrning modal */}
        <AlertModal
          lessons={lessonNumber}
          show={showModal}
          setShow={setShowModal}
        />
        ;{/* ------------------- */}
        <div className="call flex justify-center items-center border-b-1 border-solid border-second-dark rounded-lg">
          <DayPicker
            animate
            mode="single"
            disabled={[
              { before: new Date() }, // Disable all past days (today is selectable)
            ]}
            selected={selectedDay}
            onSelect={handleSelect}
          />
        </div>
        <div className="time flex justify-center items-center">
          <div className="relative grid text-[12px] place-content-center grid-cols-2 sm:grid-cols-3 gap-2 mt-5 w-[95%] md:w-[90%] lg:w-[70%] xl:w-[50%]">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => {
                const isSelected = selectedEvents.some(
                  (e) => e.id === event.id
                );

                return (
                  <div
                    key={event.id}
                    onClick={() => handleSelectEvent(event)}
                    className={`border border-solid border-border hover:border-main rounded-lg p-2 cursor-pointer user-select-none transition-all duration-200 ${
                      isSelected ? "bg-main text-white border-main" : ""
                    }`}
                  >
                    <div className="w-full font-[400] flex gap-1 items-center justify-center">
                      <span className="text-center">
                        {new Date(event.start).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="mx-1">-</span>
                      <span>
                        {new Date(event.end).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="cover mb-20">
                <p className="absolute w-full mt-10 text-center text-sm font-[400] bg-second-dark p-2 rounded-lg text-main">
                  No Lessons found for this day
                </p>
              </div>
            )}
            ;
          </div>
        </div>
        <TimeLine />
      </div>
    </>
  );
}

export default ResponsiveCalendar;
