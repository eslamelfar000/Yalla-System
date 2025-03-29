import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../../Store/Reducer/stepSlice";

function BackButton({ selected }) {

      const dispatch = useDispatch();
      const currentStep = useSelector((state) => state.step.currentStep);
      
  return (
    <>
      <button
        className={`btn text-main font-[600] bg-second py-2 px-5 rounded-xl shadow-none border-2 border-solid border-main hover:bg-main hover:text-white`}
        onClick={() => {
          dispatch(
            currentStep === "sessionCalendar"
              ? setStep("bookingType")
              : setStep("sessionCalendar")
          );
        }}
      >
        Back
      </button>
    </>
  );
}

export default BackButton;
