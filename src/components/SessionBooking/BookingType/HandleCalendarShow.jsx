import { useState, useEffect } from "react";
import ResponsiveCalendar from "../SessionCalender/ResponsiveCalendar";
import SessionCalender from "../SessionCalender/SessionCalender";
import { useDispatch } from "react-redux";
import { updateBooking } from "../../../Store/Reducer/bookingSlice";


const HandleCalendarShow = ({ currentStep }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    setTimeout(() => {
      dispatch(updateBooking({ eventDate: [] }));
    }, 0);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <>
      {currentStep === "sessionCalendar" &&
        (isMobile ? <ResponsiveCalendar /> : <SessionCalender />)}
    </>
  );
};

export default HandleCalendarShow;
