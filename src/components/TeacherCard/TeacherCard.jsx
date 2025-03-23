import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Rating } from "@smastrom/react-rating";
import React from "react";
import { Link } from "react-router-dom";

function TeacherCard({ name, role, rating, languages, price, img }) {
  return (
    <>
      <div className="group card bg-second hover:bg-main w-85 shadow-sm bg-second pt-4 transition duration-300">
        <div className="card-img flex justify-center">
          <div className="img-box h-35 w-35 btn-circle overflow-hidden group-hover:scale-130 group-hover:-translate-y-2 transition duration-300">
            <img
              src={img}
              alt="Shoes"
              className="w-full h-full object-cover "
            />
          </div>
        </div>
        <div className="card-body">
          <div className="card-head flex justify-between">
            <div className="name">
              <h2 className="card-title text-xl font-[700] group-hover:text-white transition duration-300">
                {name}
              </h2>
              <p className="opacity-60 group-hover:text-white  transition duration-300">
                {role}
              </p>
            </div>

            <div className="review">
              <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
            </div>
          </div>

          <div className="card-center my-3">
            <ul className="flex justify-between">
              <li>
                <span className="font-[600] opacity-70 group-hover:text-white transition duration-300">
                  Speak :{" "}
                </span>
                {languages.map((language, index) => (
                  <span
                    key={index}
                    className="font-[600] text-main cursor-pointer group-hover:text-white transition duration-300"
                  >
                    {language} <span className="mx-1">,</span>
                  </span>
                ))}
              </li>

              <li>
                <span className="opacity-70 group-hover:text-white transition duration-300 ">+2</span>
              </li>
            </ul>
          </div>

          <div className="card-end">
            <ul className="flex justify-between mb-10">
              <li>
                <p className="opacity-60 font-[600] group-hover:text-white transition duration-300">
                  Lesson Price :
                </p>
              </li>
              <li className="">
                <Link to="/">
                  <EyeIcon
                    width={25}
                    className="opacity-70 hover:text-black transition duration-300 hover:opacity-100 group-hover:text-white"
                  />
                </Link>
              </li>
            </ul>
            <div className="card-actions ">
              <button
                className="
                btn bg-main text-white w-full hover:bg-black rounded-xl 
                border-none flex justify-between items-center shadow-none border-none 
                group-hover:bg-white group-hover:text-main hover:text-white transition duration-300"
              >
                <span>Book Session Now</span>
                <ArrowRightIcon width={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherCard;
