import React, { useState } from "react";
import PaymentMethods from "./PaymentMethods";
import PaymentDetails from "./PaymentDetails";

function Page() {

  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleSelect = (method) => {
    setSelectedPayment(method);
  };

  return (
    <>
      <div className="cover flex justify-center items-start lg:min-h-[calc(100vh-10rem)]">
        <div className="cover lg:flex justify-center items-start  gap-5 py-5 lg:py-15 w-[92%] md:w-[80%] lg:w-[90%] 2xl:w-[70%]">
          <PaymentMethods
            handleSelect={handleSelect}
            selected={selectedPayment}
          />
          <PaymentDetails selectedPayment={selectedPayment} />
        </div>
      </div>
    </>
  );
}

export default Page;
