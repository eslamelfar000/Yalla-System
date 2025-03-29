import React, { useEffect, useState } from "react";
import BookingType from "./BookingType/BookingType";
import SessionCalender from "./SessionCalender/SessionCalender";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setStep } from "../../Store/Reducer/stepSlice";
import Control from "./Controller/Control";
import ResponsiveCalendar from "./SessionCalender/ResponsiveCalendar";
import Steps from "./Controller/Steps";

function Page() {
  const { pathname } = useLocation();
  const currentStep = useSelector((state) => state.step.currentStep);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setStep("bookingType"));
    }, 0);
  }, [pathname]);

  return (
    <>
      <Steps
        text={
          currentStep === "bookingType"
            ? "Select your booking type"
            : "Select your lessons"
        }

        activeStep={currentStep}
      />
      {currentStep === "bookingType" && <BookingType />}
      {currentStep === "sessionCalendar" && <ResponsiveCalendar />}
      {currentStep === "sessionCalendar" && <SessionCalender />}

      <Control />
    </>
  );
}

export default Page;
