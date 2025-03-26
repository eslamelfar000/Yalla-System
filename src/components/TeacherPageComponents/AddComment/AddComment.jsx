import { Rating } from "@smastrom/react-rating";
import React, { useState } from "react";

function AddComment() {
    const [rating, setRating] = useState(0);

  return (
    <>
      <div className="cover p-5 bg-white rounded-md mt-5 shadow-lg">
        <h2 className="text-xl opacity-80 pb-5 mb-5 text-center border-b-1 border-solid border-second-dark">
          Give Cody your feedback
        </h2>

        <form action="" className="flex flex-col gap-5 ">
          <div className="rate flex justify-center">
            <Rating
              style={{ maxWidth: 200 }}
              value={rating}
              onChange={setRating}
              isRequired
            />
          </div>

          <textarea
            cols="30"
            rows="5"
            placeholder="Your comment"
            className="border-1 border-second-dark border-solid focus:outline-none p-4 rounded-md focus:border-main text-sm"
          ></textarea>
          <button className="btn bg-main text-white hover:bg-white border-1 border-solid border-main hover:text-main transition-colors">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddComment;
