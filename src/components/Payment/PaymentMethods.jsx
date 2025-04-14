import React, { useEffect, useState } from "react";
import {  PiNumberCircleFourLight, PiNumberCircleOneThin, PiNumberCircleThreeThin, PiNumberCircleTwoThin } from "react-icons/pi";
import paybox from "../../assets/paybox.png";
import paypal from "../../assets/paypal.png";
import credit from "../../assets/credit_card.webp";
import visa from "../../assets/visa.svg";
import mastercard from "../../assets/mastercard.svg";
import {  CircleAlertIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

function PaymentMethods({ handleSelect, selected }) {
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if(selected === "paybox"){
      setOpen(true)
    }else{
      setOpen(false)
    }
  },[selected])

  return (
    <>
      <div className="cover mb-5 lg:mb-0 h-auto bg-second px-2 rounded-lg shadow-md flex-2 pb-5 lg:sticky top-20">
        <div className="title mb-3 border-b py-4 px-5 border-second-dark">
          <h1 className="text-xl font-bold text-pay">Payment Methods</h1>
        </div>

        <div className="methods text-pay">
          <ul className="flex flex-col md:mx-7">
            <li className="px-5 py-5">
              <label
                onClick={() => handleSelect("cards")}
                className="fieldset-label item hover:bg-gray-200 flex justify-between items-center p-2 px-3 rounded-lg cursor-pointer transition-all duration-300"
              >
                <div className="item-info flex items-center gap-4">
                  <figure className="icon size-12 flex justify-center items-center rounded-sm bg-white p-2">
                    <img src={credit} alt="" />
                  </figure>
                  <span className="text-md font-[600]">Credit Card</span>
                </div>

                <div className="cover flex items-center gap-5">
                  <div className="imgs flex items-center gap-1">
                    <span>
                      <img src={visa} alt="visa" className="size-7" />
                    </span>
                    <span>
                      <img
                        src={mastercard}
                        alt="mastercard"
                        className="size-7"
                      />
                    </span>
                  </div>

                  <input
                    type="radio"
                    name="pay"
                    className="radio border-1 border-main!"
                    value="cards"
                  />
                </div>
              </label>
            </li>

            <div className={`flex justify-center`}>
              <hr className="w-[60%] opacity-20" />
            </div>

            {/* {cards.map((card) => {
              return (
                <li key={card.id} className="px-5 py-5">
                  <label
                    onClick={onSelect(card.number)}
                    className="fieldset-label item hover:bg-gray-200 flex justify-between items-center p-2 px-3 rounded-lg cursor-pointer transition-all duration-300"
                  >
                    <div className="item-info flex items-center gap-4">
                      <figure className="icon w-10 h-10 flex justify-center items-center rounded-sm bg-white p-2">
                        <img src={masterCard} alt="" />
                      </figure>
                      <div className="info">
                        <h2 className="font-[600] text-md">
                          Credit card ends with :
                        </h2>
                        <span className="text-sm font-[400] opacity-70 flex gap-1">
                          <span>****</span>
                          <span>{card.number.slice(-4)}</span>
                        </span>
                      </div>
                    </div>

                    <input
                      type="radio"
                      name="pay"
                      className="radio radio-main! border-main"
                      value={card.cardNumber}
                    />
                  </label>
                </li>
              );
            })} */}

            {cards.length > 0 && (
              <div className="flex justify-center">
                <hr className="w-[60%] opacity-20" />
              </div>
            )}

            <li className="px-5 py-5">
              <label
                onClick={() => handleSelect("paypal")}
                className="fieldset-label item hover:bg-gray-200 flex justify-between items-center p-2 px-3 rounded-lg cursor-pointer transition-all duration-300"
              >
                <div className="item-info flex items-center gap-4">
                  <figure className="icon size-12 flex justify-center items-center rounded-sm bg-white p-2">
                    <img src={paypal} alt="" />
                  </figure>
                  <span className="text-md font-[600]">PayPal</span>
                </div>

                <input
                  type="radio"
                  name="pay"
                  className="radio border-1 border-main!"
                  value="paypal"
                />
              </label>
            </li>

            <div className="flex justify-center">
              <hr className="w-[60%] opacity-20" />
            </div>

            <li className="px-5 py-5">
              <label
                onClick={() => {
                  handleSelect("paybox");
                }}
                className={`w-full hover:bg-gray-200 flex justify-between items-center p-2 px-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  open && "bg-gray-200"
                }`}
              >
                <div className="item-info flex items-center gap-4">
                  <figure className="icon size-12 flex justify-center items-center rounded-sm bg-white">
                    <img src={paybox} alt="object-cover" />
                  </figure>
                  <span className="text-md font-[600]">PayBox</span>
                </div>

                <input
                  type="radio"
                  name="pay"
                  className="radio border-1 border-main!"
                  value={"paybox"}
                />
              </label>

              <div
                className={`drop flex overflow-hidden transition-all duration-300 ${
                  open ? "max-h-1000" : "max-h-0"
                }`}
              >
                <ul className="flex flex-col p-5 w-full gap-3 bg-white rounded-lg shadow-md mt-3">
                  <li className="flex items-center gap-2">
                    <PiNumberCircleOneThin className="size-8 lg:size-6 text-main" />
                    <p>
                      Transfer Money to this phone number : [ +201045873234 ]
                    </p>
                  </li>
                  <li className="flex items-center gap-2">
                    <PiNumberCircleTwoThin className="size-6 text-main" />
                    <p>Taka a screenshot after transaction</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <PiNumberCircleThreeThin className="size-6 text-main" />
                    <p>Upload this screenshot</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <PiNumberCircleFourLight className="size-6 text-main" />
                    <div className="grid ">
                      <Input id="picture" type="file" className="" />
                    </div>
                  </li>
                  <li className="flex justify-center my-5">
                    <hr className="w-[70%]" />
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleAlertIcon className="size-12 lg:size-7 text-red-400" />
                    <div className="grid ">
                      <p>
                        Note that the booking will only be confirmed after
                        confirmation that the payment has been made successfully
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default PaymentMethods;
