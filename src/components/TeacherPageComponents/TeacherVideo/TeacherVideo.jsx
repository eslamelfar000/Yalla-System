import React from 'react'

function TeacherVideo() {
  return (
    <>
      <div className="cover">
        <div className="video shadow-lg">
          <iframe
            width="100%"
            height="231"
            src="https://www.youtube.com/embed/9hlfAW_R89M?si=VT87_1luizExtM1T"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            className="md:h-96 xl:h-51"
          ></iframe>
        </div>

        <div className="book bg-white p-5 rounded-md mt-5 shadow-lg">
          <div className="head flex justify-between items-center mb-5 border-b-1 border-second border-solid pb-5">
            <h2 className="text-xl opacity-60 font-[600]"> Session / Hour</h2>
            <span className="text-2xl font-bold">55 $</span>
          </div>

          <ul className="flex flex-col gap-5 mt-10">
            <li>
              <button className="btn shadow-none border-none w-full bg-main text-white rounded-md hover:bg-white border-1 border-solid border-main hover:text-main transition-colors">
                Schedule a Lesson now
              </button>
            </li>
            <li>
              <button className="btn shadow-none border-none w-full bg-second-dark rounded-md hover:bg-white border-1 border-solid border-second-dark hover:border-main hover:text-main transition-colors">
                Contact teacher
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default TeacherVideo