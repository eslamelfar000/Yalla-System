import React, { useEffect } from 'react'
import { ThreeCircles } from 'react-loader-spinner';
// import { ThreeCirclee } from "react-loader-spinner";

function LoaderPage() {
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }, []);
  return (
    <>
        <div className="fixed z-100 top-0 left-0 h-screen w-full flex justify-center items-center bg-[#0000008a] overflow-hidden">
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="white"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
    </>
  );
}

export default LoaderPage