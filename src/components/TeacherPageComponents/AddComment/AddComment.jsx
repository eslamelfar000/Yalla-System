import { Rating } from "@smastrom/react-rating";
import React, { useState } from "react";

function AddComment() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

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
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            disabled={rating !== 0 && comment !== "" ? false : true}
            className={`btn ${
              rating !== 0 && comment !== ""
                ? ""
                : "cursor-not-allowed opacity-50"
            } bg-white text-main hover:bg-main border-1 border-solid border-main hover:text-white transition-colors`}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddComment;
