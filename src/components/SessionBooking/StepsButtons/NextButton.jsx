import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../../Store/Reducer/stepSlice";

function NextButton({ selected, block }) {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.step.currentStep);
  const booking = useSelector((state) => state.booking?.booking);

  return (
    <>
      <button
        disabled={block}
        className={`btn text-white font-[600] bg-main py-2 px-5 rounded-xl shadow-none border-2 ${
          (booking?.eventDate?.length !== 0 &&
            booking?.lessons === booking?.eventDate?.length &&
            "border-main hover:border-main-dark") ||
          (currentStep === "bookingType" &&
            "border-main hover:border-main-dark")
        }  border-solid hover:bg-main-dark  transition-all duration-300 `}
        onClick={() => {
          dispatch(setStep("sessionCalendar"));
        }}
      >
        Next
      </button>
    </>
  );
}

export default NextButton;
