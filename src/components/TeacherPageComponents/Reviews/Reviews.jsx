import { Rating } from "@smastrom/react-rating";
import React from "react";

function Reviews({ name, rating, img, comment }) {
  return (
    <>
      <div className="cover">
        <div className="grid">
          <div className="item bg-second p-5 rounded-md">
            <div className="top">
              <div className="flex gap-3 items-center">
                <div className="avatar overflow-hidden rounded-full w-15 h-15">
                  <img src={img} alt="" />
                </div>
                <div className="info">
                  <h2 className="text-md font-[500] ml-1">{name}</h2>
                  <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
                </div>
              </div>
            </div>

            <div className="bottom mt-5">
              <p className="opacity-60 text-md">
                {comment || "No comment provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reviews;
