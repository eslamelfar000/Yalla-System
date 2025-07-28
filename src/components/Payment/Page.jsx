import React, { useState } from "react";
import PaymentMethods from "./PaymentMethods";
import PaymentDetails from "./PaymentDetails";
import { useSelector } from "react-redux";

function Page() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [payboxFile, setPayboxFile] = useState(null);
  const booking = useSelector((state) => state.booking?.booking);

  // Check if this is a pay after booking
  const isPayAfter = booking?.type === "payafter";

  const handleSelect = (method) => {
    setSelectedPayment(method);
  };

  const handleFileChange = (file) => {
    setPayboxFile(file);
  };

  return (
    <>
      <div className="cover flex justify-center items-start lg:min-h-[calc(100vh-10rem)]">
        <div
          className={`cover lg:flex justify-center items-start gap-5 py-5 lg:py-15 w-[92%] md:w-[80%] lg:w-[90%] 2xl:w-[70%] ${
            isPayAfter ? "justify-center" : ""
          }`}
        >
          {!isPayAfter && (
            <PaymentMethods
              handleSelect={handleSelect}
              selected={selectedPayment}
              onFileChange={handleFileChange}
              setPayboxFile={setPayboxFile}
              payboxFile={payboxFile}
            />
          )}
          <PaymentDetails
            selectedPayment={selectedPayment}
            payboxFile={payboxFile}
          />
        </div>
      </div>
    </>
  );
}

export default Page;
