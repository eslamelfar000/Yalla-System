import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Rating } from "@smastrom/react-rating";
import React from "react";
import { Link } from "react-router-dom";

function TeacherCard({ name, role, rating, languages, price, img }) {
  return (
    <>
      <div className="card  hover:-translate-y-3 bg-white border-solid border-2 border-second hover:bg-second w-85 pt-4 transition duration-300 hover:shadow-xl rounded-xl">
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
              <li className="">
                <Link to="/">
                  <EyeIcon
                    width={25}
                    className="opacity-70 hover:text-main transition duration-300 hover:opacity-100"
                  />
                </Link>
              </li>
            </ul>
            <div className="card-actions ">
              <Link to={'/teacher-page'} className="w-full">
                <button className="btn bg-main text-white w-full hover:bg-main-dark rounded-xl border-none shadow-none flex justify-between items-center">
                  <span>Book Session Now</span>
                  <ArrowRightIcon width={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherCard;
