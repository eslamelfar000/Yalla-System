import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import image from "../../assets/image.png";


function Carousel({data}) {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // ✅ Track active slide

  return (
    <>
      <div className="slider w-[90%] lg:w-200 relative">
        <Swiper
          spaceBetween={10}
          //   loop={true}
          className="mySwiper user-select-none"
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          
          {data?.map((item) => (
            <SwiperSlide key={item.id} className="">
            <div className="slide flex flex-col md:flex-row justify-center items-center md:items-end">
              <div className="slide-img">
                <figure className="w-80 h-full">
                  <img src={image} alt="" className="object-full" />
                </figure>
              </div>
              <div className="slide-body bg-second h-105 text-left p-5 lg:pr-20 flex flex-col justify-center">
                <h2 className="font-[600] mb-5 text-2xl">{item.name}</h2>
                <p className="text-[18px] font-[450] opacity-70">
                  {item.paragraph}
                </p>
              </div>
            </div>
          </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className={`cursor-pointer absolute top-1/2 -left-5 lg:-left-20  transform -translate-y-1/2 text-main text-4xl z-10 ${
            activeIndex === 0 ? "opacity-50" : "opacity-100"
          }`}
          onClick={() => swiperInstance && swiperInstance.slidePrev()}
        >
          ❮
        </button>
        <button
          className={`cursor-pointer absolute top-1/2 -right-5 lg:-right-20 transform -translate-y-1/2 text-main text-4xl z-10 transition-opacity ${
            swiperInstance && activeIndex === swiperInstance.slides.length - 1
              ? "opacity-50"
              : "opacity-100"
          }`}
          onClick={() => swiperInstance && swiperInstance.slideNext()}
        >
          ❯
        </button>
      </div>
    </>
  );
}

export default Carousel;
