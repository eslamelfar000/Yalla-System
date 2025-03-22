import React from 'react'
import Carousel from '../Carousel/Carousel';
import BG from "../../assets/BG.png";
import BG2 from "../../assets/BG2.png";

import ChatData from './Data';

function HomeSlider() {
  return (
    <>
      <div className="home-slider pt-10 pb-50 user-select-none">
        <div className="head text-center mb-15">
          <h1 className="text-3xl font-bold">The Impact We’ve Made</h1>
        </div>

        <div className="flex justify-center relative">
          <div className="imgs user-select-none">
            <img src={BG} alt="" className="bg1 w-[90%] lg:w-[50%] md:bottom-100" />
            <img src={BG2} alt="" className="bg2 w-[85%] lg:w-[45%]" />
          </div>
          <Carousel data={ChatData}/>
        </div>
      </div>
    </>
  );
}

export default HomeSlider