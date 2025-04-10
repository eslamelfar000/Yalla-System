import React, { useState } from "react";
import { RiPaypalLine } from "react-icons/ri";
import { PiCreditCard, PiPlusCircle } from "react-icons/pi";
import paybox from "../../assets/paybox.png";
import paypal from "../../assets/paypal.png";
import masterCard from "../../assets/master.png";
import AddNewCard from "./AddNewCard";

function PaymentMethods({ handleSelect }) {
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState([]);

  return (
    <>
      <div className="cover mb-5 lg:mb-0 h-auto bg-second px-2 rounded-lg shadow-md flex-2 pb-5 lg:sticky top-20">
        <div className="title mb-3 border-b py-4 px-5 border-second-dark">
          <h1 className="text-xl font-bold text-pay">Payment Methods</h1>
        </div>

        <div className="methods text-pay">
          <ul className="flex flex-col md:mx-7">
            <li className="group px-5 py-7">
              <button
                className={`w-full hover:bg-gray-200 flex justify-between items-center p-2 px-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  open && "bg-gray-200"
                }`}
                onClick={() => setOpen(!open)}
              >
                <div className="item-info flex items-center gap-4">
                  <div className="icon">
                    <PiCreditCard className="text-pay w-8 h-8" />
                  </div>

                  <span className="text-md font-[600] opacity-80">
                    Debit / credit card
                  </span>
                </div>

                <div
                  className={`add flex items-center gap-2 opacity-60 cursor-pointer group-hover:opacity-100 transition-all duration-300 user-select-none ${
                    open && "opacity-100"
                  }`}
                >
                  <PiPlusCircle className="w-6 h-6" />
                  <span>Add New Card</span>
                </div>
              </button>
            </li>

            {/* Add New Card Component */}
            <AddNewCard
              open={open}
              setOpen={setOpen}
              setCards={setCards}
              cards={cards}
            />

            <div className={`flex justify-center`}>
              <hr className="w-[60%] opacity-20" />
            </div>

            {cards.map((card) => {
              return (
                <li key={card.id} className="px-5 py-7">
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
                      className="radio radio-main!"
                      value={card.cardNumber}
                    />
                  </label>
                </li>
              );
            })}

            {cards.length > 0 && (
              <div className="flex justify-center">
                <hr className="w-[60%] opacity-20" />
              </div>
            )}

            <li className="px-5 py-7">
              <label
                onClick={() => handleSelect("paypal")}
                className="fieldset-label item hover:bg-gray-200 flex justify-between items-center p-2 px-3 rounded-lg cursor-pointer transition-all duration-300"
              >
                <div className="item-info flex items-center gap-4">
                  <figure className="icon w-10 h-10 flex justify-center items-center rounded-sm bg-white p-2">
                    <img src={paypal} alt="" />
                  </figure>
                  <span className="text-md font-[600]">PayPal</span>
                </div>

                <input
                  type="radio"
                  name="pay"
                  className="radio radio-main!"
                  value="paypal"
                />
              </label>
            </li>

            <div className="flex justify-center">
              <hr className="w-[60%] opacity-20" />
            </div>

            <li className="px-5 py-7">
              <label
                onClick={() => handleSelect("paybox")}
                className="fieldset-label item hover:bg-gray-200 flex justify-between items-center p-2 px-3 rounded-lg cursor-pointer transition-all duration-300"
              >
                <div className="item-info flex items-center gap-4">
                  <figure className="icon w-10 h-10 flex justify-center items-center rounded-sm bg-white">
                    <img src={paybox} alt="object-cover" />
                  </figure>
                  <span className="text-md font-[600]">PayBox</span>
                </div>

                <input
                  type="radio"
                  name="pay"
                  className="radio"
                  value={"paybox"}
                />
              </label>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default PaymentMethods;
