import { EyeIcon } from "@heroicons/react/24/outline";
import { Rating } from "@smastrom/react-rating";
import React from "react";
import { Link } from "react-router-dom";

function TeacherCard({ name, role, rating, languages, price, img }) {
  return (
    <>
      <div className="card bg-base-100 w-85 shadow-sm bg-second pt-4">
        <figure>
          <div className="img-box w-35 h-35 btn-circle overflow-hidden">
            <img src={img} alt="Shoes" className="w-full h-full object-full" />
          </div>
        </figure>
        <div className="card-body">
          <div className="card-head flex justify-between">
            <div className="name">
              <h2 className="card-title text-xl font-[700]">{name}</h2>
              <p className="opacity-60">{role}</p>
            </div>

            <div className="review">
              <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
            </div>
          </div>

          <div className="card-center my-3">
            <ul className="flex justify-between">
              <li>
                <span className="font-[600] opacity-70">Speak : </span>
                {languages.map((language, index) => (
                  <span
                    key={index}
                    className="font-[600] text-main cursor-pointer"
                  >
                    {language} <span className="mx-1">,</span>
                  </span>
                ))}
              </li>

              <li>
                <span className="opacity-70">+2</span>
              </li>
            </ul>
          </div>

          <div className="card-end">
            <ul className="flex justify-between mb-10">
              <li>
                <p className="opacity-60 font-[600]">Lesson Price :</p>
              </li>
              <li className="opacity-70">
                <Link to="/">
                  <EyeIcon width={25} />
                </Link>
              </li>
            </ul>
            <div className="card-actions ">
              <button className="btn bg-main text-white w-full hover:bg-main-dark">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherCard;
