import React from "react";
import man from "../../assets/man.png";
import { PiCircleFill } from "react-icons/pi";
import { useSelector } from "react-redux";

function PaymentDetails({ selectedPayment }) {
  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const booking = useSelector((state) => state.booking?.booking);

  return (
    <>
      <div className="cover xl:flex-1 bg-second rounded-lg shadow-md lg:sticky top-20">
        <div className="info p-5 border-b border-border">
          <div className="user flex items-center mb-7">
            <figure className="img overflow-hidden  w-25 h-25 flex justify-center items-center">
              <img src={man} alt="" className="object-cover" />
            </figure>

            <div className="user-data opacity-50">
              <h2 className="font-bold text-md ml-3">Mohamed Alaa</h2>
              <p className="text-sm ml-5">60 min / 1 Lesson</p>
              <p className="text-sm ml-5 mb-0">Zoom Meeting</p>
              <p className="text-sm ml-3 -mt-1">____________</p>
            </div>
          </div>

          <div className="lessons">
            <h3 className="text-md font-bold opacity-60 mb-2">
              {booking?.lessons > 1
                ? booking?.lessons + " " + "Lessons"
                : booking?.lessons + " " + "Lesson"}
            </h3>

            <ul className="flex flex-col gap-3">
              {booking?.eventDate?.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-2">
                    <PiCircleFill className="text-main w-3 h-3 inline-block" />
                    <p className="text-sm opacity-50 font-[400]">
                      {formatDate(item?.start)} -{" "}
                      {new Date(item?.end).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="pay-details p-5">
          <div className="total flex justify-between items-center text-xl font-bold opacity-60 mx-5 pt-3 pb-10">
            <h1 className="">Total</h1>
            <div className="price flex items-center gap-1 text-xl">
              <h3>{booking?.price}</h3>
              <span>{booking?.currency}</span>
            </div>
          </div>

          <div className="ok">
            <label className="fieldset-label mb-5 user-select-none flex items-center gap-4">
              <input
                type="checkbox"
                className="checkbox text-main border-main checkbox-sm rounded-sm"
              />
              <span>
                I agree to the{" "}
                <a href="" className="text-main underline">
                  Terms and Conditions.
                </a>
              </span>
            </label>
            <button
              disabled={!selectedPayment}
              className={`btn bg-main w-full text-second rounded-lg px-5 py-6 hover:bg-second hover:text-main transition-all duration-300 text-xl border-2 ${
                selectedPayment && "border-main"
              } shadow-none`}
            >
              Pay {booking?.price} {booking?.currency}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentDetails;
