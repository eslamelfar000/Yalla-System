import { Rating } from "@smastrom/react-rating";
import React from "react";

function Reviews({ name, rating, img }) {
  return (
    <>
      <div className="cover">
          <div className="grid">
            <div className="item bg-second p-5 rounded-md">
              <div className="top flex gap-5 justify-between items-start lg:items-center">
                <div className="flex flex-col md:flex-row gap-3 items-center">
                  <div className="avatar overflow-hidden rounded-full w-15 h-15">
                    <img
                      src={img}
                      alt=""
                    />
                  </div>
                  <h2 className="text-md font-[500]">{name}</h2>
                </div>

                <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
              </div>

              <div className="bottom mt-5">
                <p className="opacity-60 text-md">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default Reviews;
