import React, { useEffect, useState } from "react";
import BookingType from "./BookingType/BookingType";
import SessionCalender from "./SessionCalender/SessionCalender";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setStep } from "../../Store/Reducer/stepSlice";
import Control from "./Controller/Control";
import ResponsiveCalendar from "./SessionCalender/ResponsiveCalendar";
import Steps from "./Controller/Steps";
import HandleCalendarShow from "./SessionCalender/HandleCalendarShow";
import AlertModal from "../AlertModal/AlertModal";
import LoaderPage from "../LoaderPage/LoaderPage";

function Page() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.step.currentStep);
    const booking = useSelector((state) => state.booking?.booking);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('error');

  useEffect(() => {
    setTimeout(() => {
      dispatch(setStep("bookingType"));
    }, 0);
  }, [pathname]);

  return (
    <>
      {/* loadin */}
      {loading && <LoaderPage />}

      <Steps
        text={
          currentStep === "bookingType"
            ? "Select your booking type"
            : "Select your lessons"
        }
        activeStep={currentStep}
      />
      {currentStep === "bookingType" && <BookingType />}

      <HandleCalendarShow
        currentStep={currentStep}
        loading={loading}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <Control
        activeLoading={setLoading}
        setShowModal={setShowModal}
        setStatus={setStatus}
      />
    </>
  );
}

export default Page;
