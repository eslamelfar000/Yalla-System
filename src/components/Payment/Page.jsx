import React, { useState } from "react";
import PaymentMethods from "./PaymentMethods";
import PaymentDetails from "./PaymentDetails";

function Page() {

  const [selected, setSelected] = useState(false);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };


  return (
    <>
      <div className="cover flex justify-center items-start min-h-[calc(100vh-10rem)]">
        <div className="cover lg:flex justify-center items-start  gap-5 py-15 w-[95%] md:w-[80%] lg:w-[90%] 2xl:w-[70%]">
          <PaymentMethods handleSelect={handleSelect} selected={selected} />
          <PaymentDetails selected={selected} />
        </div>
      </div>
    </>
  );
}

export default Page;
