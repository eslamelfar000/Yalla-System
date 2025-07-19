import Cookies from "js-cookie";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function TeacherVideo({ teacher }) {
  const navigate = useNavigate();

  // Handle case where teacher is undefined
  if (!teacher) {
    return (
      <div className="cover">
        <div className="text-center py-8 text-gray-500">
          No teacher data available
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="cover">
        <div className="video shadow-lg">
          <iframe
            width="100%"
            height="231"
            src={
              teacher?.video ||
              "https://www.youtube.com/embed/9hlfAW_R89M?si=VT87_1luizExtM1T"
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            className="md:h-96 xl:h-51"
          ></iframe>
        </div>

        <div className="book bg-white p-5 rounded-md mt-5 shadow-lg">
          <div className="head flex justify-between items-center mb-5 border-b-1 border-second border-solid pb-5">
            <h2 className="text-xl opacity-60 font-[600]">
              {" "}
              Lesson price start from
            </h2>
            <span className="text-2xl font-bold">
              {teacher?.package_before_price || "0"} $
            </span>
          </div>

          <ul className="flex flex-col gap-5 mt-10">
            <li>
              {localStorage.getItem("user_data") &&
              Cookies.get("auth_token") ? (
                <Link to={`/booking/${teacher?.user_id}`}>
                  <button className="btn shadow-none border-none w-full bg-main text-white rounded-md hover:bg-white border-1 border-solid border-main hover:text-main transition-colors">
                    Schedule a Lesson now
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    toast.warning("Please login to contact the teacher", {
                      duration: 5000,
                      action: {
                        label: "Login",
                        onClick: () => {
                          navigate("/login");
                        },
                      },
                    });
                  }}
                  className="btn shadow-none border-none w-full bg-main text-white rounded-md hover:bg-white border-1 border-solid border-main hover:text-main transition-colors"
                >
                  Schedule a Lesson now
                </button>
              )}
            </li>
            <li>
              <button
                onClick={() => {
                  if (
                    JSON.parse(localStorage.getItem("user_data"))
                      ?.assiend_teacher?.id === teacher?.user_id &&
                    JSON.parse(localStorage.getItem("user_data"))
                      ?.assiend_teacher !== null &&
                    Cookies.get("auth_token")
                  ) {
                    navigate("/chat");
                  } else if (
                    localStorage.getItem("user_data") &&
                    Cookies.get("auth_token") &&
                    JSON.parse(localStorage.getItem("user_data"))
                      ?.assiend_teacher?.id !== teacher?.user_id &&
                    JSON.parse(localStorage.getItem("user_data"))
                      ?.assiend_teacher !== null
                  ) {
                    toast.warning("You are not assigned to this teacher", {
                      duration: 5000,
                      action: {
                        label: "close",
                      },
                    });
                  } else {
                    toast.warning("Please login to contact the teacher", {
                      duration: 5000,
                      action: {
                        label: "Login",
                        onClick: () => {
                          navigate("/login");
                        },
                      },
                    });
                  }
                }}
                className="btn shadow-none border-none w-full bg-second-dark rounded-md hover:bg-white border-1 border-solid border-second-dark hover:border-main hover:text-main transition-colors"
              >
                Contact teacher
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default TeacherVideo;
