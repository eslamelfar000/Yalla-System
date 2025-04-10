import React, { useState } from "react";

const AddNewCard = ({ open, setCards, cards, setOpen }) => {
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    ccv: "",
    type: "Unknown",
  });

  const [isFlipped, setIsFlipped] = useState(false);
  console.log(cards);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      const cleaned = value.replace(/\D/g, "").slice(0, 16);
      const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
      setCardData((prev) => ({ ...prev, number: formatted }));
    } else if (name === "expiry") {
      const cleaned = value.replace(/\D/g, "").slice(0, 4);
      const formatted = cleaned.replace(/(.{2})/, "$1/").slice(0, 5);
      setCardData((prev) => ({ ...prev, expiry: formatted }));
    } else if (name === "ccv") {
      const cleaned = value.replace(/\D/g, "").slice(0, 3);
      setCardData((prev) => ({ ...prev, ccv: cleaned }));
    } else {
      setCardData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddCard = () => {
    if (cardData.number && cardData.expiry && cardData.ccv) {
      setCards([...cards, cardData]);
      setCardData({ number: "", expiry: "", ccv: "", type: "Unknown" });
      setOpen(false);
      setIsFlipped(false);
    }
  };

  const flipToRear = () => setIsFlipped(true);
  const flipToFront = () => setIsFlipped(false);
  const toggleFlip = () => setIsFlipped((prev) => !prev);

  return (
    <main
      className={`flex overflow-hidden transition-all duration-300 ${
        open ? "max-h-1000" : "max-h-0"
      }`}
    >
      <section className="flex w-full lg:w-auto flex-col-reverse bg-white mx-auto p-6 shadow-xl rounded-md">
        <div className="w-full">
          <label className="text-neutral-800 font-bold text-sm mb-2 block">
            Card number:
          </label>
          <input
            type="text"
            name="number"
            onChange={handleInputChange}
            onFocus={flipToFront}
            maxLength={19}
            value={cardData.number}
            placeholder="XXXX XXXX XXXX XXXX"
            className="input-style w-full mb-5 p-2 rounded-md border-2 border-second focus:outline-none focus:border-main transition duration-300"
          />
          <div className="flex gap-x-2 mb-4">
            <div className="flex-1">
              <label className="text-neutral-800 font-bold text-sm mb-2 block">
                Exp. date:
              </label>
              <input
                type="text"
                name="expiry"
                onChange={handleInputChange}
                onFocus={flipToFront}
                maxLength={5}
                value={cardData.expiry}
                placeholder="MM/YY"
                className="input-style p-2 rounded-md border-2 border-second focus:outline-none focus:border-main transition duration-300"
              />
            </div>
            <div className="flex-1">
              <label className="text-neutral-800 font-bold text-sm mb-2 block">
                CCV:
              </label>
              <input
                type="text"
                name="ccv"
                onChange={handleInputChange}
                onFocus={flipToRear}
                maxLength={3}
                value={cardData.ccv}
                placeholder="123"
                className="input-style p-2 rounded-md border-2 border-second focus:outline-none focus:border-main transition duration-300"
              />
            </div>
          </div>

          <div className="confirm mt-10">
            <button
              onClick={handleAddCard}
              className="btn bg-main text-white rounded-md shadow-none hover:bg-main-dark transition-all duration-300"
            >
              Confirm
            </button>
          </div>
        </div>

        <div className="w-full mb-10 user-select-none">
          <div
            className="w-full h-56 md:h-66 user-select-none"
            style={{ perspective: "1000px" }}
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 transform ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              style={{ transformStyle: "preserve-3d" }}
              onClick={toggleFlip}
            >
              {/* Front */}
              <div className="absolute w-full h-full backface-hidden">
                <img
                  src="https://i.ibb.co/swnZ5b1/Front-Side-Card.jpg"
                  className="w-full h-full object-full rounded-xl"
                  alt="front"
                />
                <div className="absolute top-8 left-8 text-white min-h-[calc(40vh-10rem)] flex flex-col justify-between">
                  <div className="num">
                    <p className="font-light">Card Number</p>
                    <p className="font-medium tracking-wider">
                      {cardData.number || "XXXX XXXX XXXX XXXX"}
                    </p>
                  </div>
                  <div className="pt-6 flex justify-between w-full pr-8">
                    <div>
                      <p className="font-light">Expiry</p>
                      <p className="font-medium tracking-wider h-12 md:h-6 w-14">
                        {cardData.expiry || "MM/YY"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Back */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180">
                <img
                  src="https://i.ibb.co/Fn11jBc/Rear-Side-Card.jpg"
                  className="w-full h-full object-cover rounded-xl"
                  alt="back"
                />
                <div className="absolute top-23 md:top-28 right-9 md:right-10 text-black">
                  <p className="text-black bg-white px-2 py-1 w-20 text-center rounded">
                    {cardData.ccv || "XXX"}
                  </p>
                  <p className="text-white text-sm mt-2 text-center">
                    security code
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AddNewCard;
