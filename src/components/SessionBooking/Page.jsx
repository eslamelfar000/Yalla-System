import React, { useEffect, useState } from "react";
import BookingType from "./BookingType/BookingType";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setStep } from "../../Store/Reducer/stepSlice";
import Control from "./Controller/Control";
import Steps from "./Controller/Steps";
import HandleCalendarShow from "./SessionCalender/HandleCalendarShow";
import LoaderPage from "../LoaderPage/LoaderPage";

function Page({ teacherId }) {
  const currentStep = useSelector((state) => state.step.currentStep);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("error");

  // useEffect(() => {
  //     dispatch(setStep("bookingType"));
  // }, []);

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
        teacherId={teacherId}
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
