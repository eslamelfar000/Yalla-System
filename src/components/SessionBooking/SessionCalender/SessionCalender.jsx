import React, { use, useCallback, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./calendar.css";
import { Events } from "./Data";
import { useDispatch, useSelector } from "react-redux";
import { updateBooking } from "../../../Store/Reducer/bookingSlice";
import TimeLine from "../Controller/TimeLine";
import AlertModal from "../Controller/AlertModal";

function SessionCalender() {
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions
  const lessonNumber = useSelector((state) => state.booking.booking.lessons); // Get lesson number from Redux store
  const [selectedBooking, setSelectedBooking] = useState([]); // Store selected event ID
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Check if a slot is available for selection
  const isSlotAvailable = (start, end) => {
    return Events.some(
      (event) =>
        new Date(event.start).getTime() === new Date(start).getTime() &&
        new Date(event.end).getTime() === new Date(end).getTime()
    );
  };

  const handleDeleteWebEvent = (eventId) => {
    setSelectedBooking(selectedBooking.filter((e) => e.id !== eventId));
  };

  // Handle event selection
  const handleEventClick = useCallback(
    (info) => {
      setSelectedBooking((prev) => {
        const isAlreadySelected = prev.some(
          (event) => event.id === info.event.id
        );

        let updatedSelection;
        if (isAlreadySelected) {
          // Unselect event (remove from list)
          // updatedSelection = prev.filter((event) => event.id !== info.event.id);
          handleDeleteWebEvent(info.event.id); // Call the delete function
        } else {
          if (prev.length >= lessonNumber) {
            setShowModal(true); // Show modal if limit is reached
            return prev; // Prevent adding more
          }

          // Select new event
          const newSelection = {
            id: info.event.id,
            title: info.event.title,
            start: info.event.start.toISOString(), // Convert to string for Redux
            end: info.event.end.toISOString(),
          };

          updatedSelection = [...prev, newSelection];
        }

        // 🔹 Update Redux state after selection change
        setTimeout(() => {
          dispatch(updateBooking({ eventDate: updatedSelection }));
        }, 0);

        return updatedSelection;
      });
    },
    [lessonNumber, dispatch]
  );

  useEffect(() => {
    if (selectedBooking.length > 0) {
      // Update Redux state with selected bookings
      dispatch(updateBooking({ eventDate: selectedBooking }));
    } else {
      dispatch(updateBooking({ eventDate: [] })); // Reset if no events are selected
    }
  },[selectedBooking, dispatch]);

  // Handle slot selection - Prevent selecting empty slots
  const handleSelect = (info) => {
    if (!isSlotAvailable(info.startStr, info.endStr)) {
      return; // Do nothing if the slot is empty
    }
    setSelectedBooking(info.startStr);
  };

  return (
    <div className="cover hidden md:block pt-10">
      {/* warrning modal */}
      <AlertModal
        lessons={lessonNumber}
        show={showModal}
        setShow={setShowModal}
      />
      ;{/* ------------------- */}
      <div className="md:w-[90%] xl:w-[70%] mx-auto">
        <div className="keys flex items-center gap-5 mb-5">
          <div className="flex items-center gap-2">
            <div className="open w-4 h-4 bg-[#4caf50] rounded-full"></div>
            <p className="text-sm font-[400]">Available</p>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="not w-4 h-4 bg-second border-1 border-solid border-second-dark rounded-full"></div>
            <p className="text-sm font-[400]">Not Available</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="booked w-4 h-4 bg-[repeating-linear-gradient(45deg,_transparent,_transparent_1px,_#ccc_1px,_#eee_3px)] bg-gray-400 rounded-full"></div>
            <p className="text-sm font-[400]">Booked</p>
          </div>

          <div className="flex items-center gap-2 ">
            <div className="selected w-4 h-4 bg-main rounded-full"></div>
            <p className="text-sm font-[400]">Booked by you</p>
          </div>
        </div>

        <FullCalendar
          dayCellClassNames={"day-cell"}
          slotLabelClassNames={"slot-label"}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            right: "today prev next",
            left: "title",
          }}
          height={"auto"}
          allDaySlot={false}
          slotEventOverlap={false}
          dayHeaderClassNames={"day-header"}
          initialView="timeGridWeek"
          selectable={true}
          selectMirror={true}
          selectOverlap={false}
          selectAllow={(selectInfo) =>
            isSlotAvailable(selectInfo.startStr, selectInfo.endStr)
          } // Prevent selection of empty cells
          select={handleSelect}
          eventClick={handleEventClick}
          slotMinTime="09:00:00"
          slotMaxTime="20:30:00"
          slotDuration="00:30:00"
          slotLabelInterval="00:30:00"
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
          }}
          validRange={{
            start: new Date(),
          }}
          views={{
            timeGridWeek: { type: "timeGrid", duration: { days: 7 } },
          }}
          events={Events}
          eventClassNames={(eventInfo) => {
            const isSelected = selectedBooking.some(
              (event) => event.id === eventInfo.event.id
            );

            if (isSelected) return "selected-event"; // Apply selected style
            if (eventInfo.event.extendedProps.status === "booked")
              return "booked-event";
            return "open-event";
          }}
        />
      </div>
      <TimeLine handleDeleteWebEvent={handleDeleteWebEvent} />
    </div>
  );
}

export default SessionCalender;
