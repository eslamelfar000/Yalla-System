import React, { useState } from "react";
import { Events } from "./Data";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./calendar.css";

function ResponsiveCalendar() {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const handleSelect = (day) => {
    if (day) {
      setSelectedDay(day); // Only update if a new day is selected
    }
  };

  return (
    <>
      <div className="cover block md:hidden py-10">
        <div className="call flex justify-center items-center border-b-1 border-solid border-second-dark rounded-lg mb-5 pb-5">
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
            {Events?.filter((event) => {
              if (!event?.start) return false; // Skip if event has no start date

              const eventDate = new Date(event.start);
              const selectedDate =
                selectedDay instanceof Date
                  ? selectedDay
                  : new Date(selectedDay);

              // Check if event is not booked and matches selected date
              return (
                event.status !== "booked" &&
                eventDate.getDate() === selectedDate.getDate() &&
                eventDate.getMonth() === selectedDate.getMonth()
              );
            }).length > 0 ? (
              Events?.filter((event) => {
                if (!event?.start) return false;

                const eventDate = new Date(event.start);
                const selectedDate =
                  selectedDay instanceof Date
                    ? selectedDay
                    : new Date(selectedDay);

                return (
                  event.status !== "booked" &&
                  eventDate.getDate() === selectedDate.getDate() &&
                  eventDate.getMonth() === selectedDate.getMonth()
                );
              }).map((event) => (
                <div
                  key={event.id}
                  className="border border-solid border-border rounded-lg p-2 opacity-70 cursor-pointer user-select-none"
                >
                  <div className="w-full font-[400] flex gap-1 items-center justify-center">
                    <span className="text-center">
                      {new Date(event.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      <span className="mx-1">-</span>
                      {new Date(event.end).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <>
                <p className="absolute w-full mt-10 text-center text-sm font-[400] bg-second-dark p-2 rounded-lg text-main">
                  No Session found for this day
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResponsiveCalendar;
