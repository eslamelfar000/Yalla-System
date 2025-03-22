import React from "react";
import  card1 from '../../assets/card-1.png';
import  card2 from '../../assets/card-2.png';
import  card3 from '../../assets/card-3.png';

function HomeCards() {
  return (
    <>
      <div className="flex justify-center py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="group card bg-base-100 w-85">
            <figure className="border-1 border-solid border-main">
              <img
                src={card1}
                alt=""
                className="group-hover:scale-80 transition duration-300"
              />
            </figure>
            <div className="card-body">
              <p className="font-[500] group-hover:text-main-dark transition duration-300">
                Achieve fluency with lessons tailored to your specific goals and
                needs.
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          <div className="group card bg-base-100 w-85">
            <figure className="border-1 border-solid border-main">
              <img
                src={card2}
                alt=""
                className="group-hover:scale-80 transition duration-300"
              />
            </figure>
            <div className="card-body">
              <p className="font-[500] group-hover:text-main-dark transition duration-300">
                Achieve fluency with lessons tailored to your specific goals and
                needs.
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          <div className="group card bg-base-100 w-85">
            <figure className="border-1 border-solid border-main">
              <img
                src={card3}
                alt=""
                className="group-hover:scale-80 transition duration-300"
              />
            </figure>
            <div className="card-body">
              <p className="font-[500] group-hover:text-main-dark transition duration-300">
                Achieve fluency with lessons tailored to your specific goals and
                needs.
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeCards;
