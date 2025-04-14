import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../../Store/Reducer/stepSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

function NextButton({ block, activeLoading, setShowModal }) {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.step.currentStep);
  const booking = useSelector((state) => state.booking?.booking);
  const navigate = useNavigate();

  return (
    <>
      {booking?.bookingType === "free" && currentStep === "sessionCalendar" ? (
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
            activeLoading(true);
            setTimeout(() => {
              activeLoading(false);
              navigate("/", { replace: true });
              toast.success("Your booking request is sent.", {
                description: "Note! your booking will confirmed after 24h.",
                duration: 15000,
                style: {
                  gap: "1rem",
                },
                icon: <CheckBadgeIcon className="size-8 text-green-500" />,

                action: {
                  label: "close",
                },
              });
            }, 3000);
          }}
        >
          Book Now
        </button>
      ) : (
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
            if (currentStep === "bookingType") {
              dispatch(setStep("sessionCalendar"));
            } else if (currentStep === "sessionCalendar") {
              navigate("/payment", { replace: true });
            }
          }}
        >
          Next
        </button>
      )}
    </>
  );
}

export default NextButton;
