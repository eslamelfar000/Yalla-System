import React, { useEffect } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { ThreeCircles } from "react-loader-spinner";


function AlertModal({ show, note, setShow, loading }) {
  useEffect(() => {
    const modal = document.getElementById("my_modal_1");
    if (show) {
      if (modal) {
        modal.showModal();
      }
    } else {
      modal.close();
    }
  }, [show]); // Runs when 'show' changes

  return (
    <dialog id="my_modal_1" className="modal">
      {loading ? (
        <div
          className={`modal-box flex flex-col items-center justify-center py-30`}
        >
          <ThreeCircles
            visible={true}
            height="70"
            width="70"
            color="#5685CE"
            ariaLabel="three-circles-loading"
          />
        </div>
      ) : (
        <div className="modal-box">
          <div>
            <div className="item flex gap-3 items-center">
              <figure className="font-bold rounded-full border-2 border-main p-1">
                <img
                  src={note?.notification?.avatar ?? ""}
                  alt={note?.notification?.avatar ?? ""}
                  className="size-15 rounded-full"
                />
              </figure>

              <div className="">
                <h2 className="font-bold text-lg text-main">
                  {note?.notification?.fullName}
                </h2>
                <p className="text-sm font-normal">
                  {note?.notification?.role}
                </p>
              </div>
            </div>

            <div className="icon absolute z-0 top-2 right-2">
              <MdNotificationsActive className="size-25 opacity-5" />
            </div>
          </div>

          <div className="message my-10 flex gap-3 items-end">
            <p className="text-md font-normal opacity-80">
              {note?.notification?.message}
            </p>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn bg-main text-white rounded-lg border-none hover:bg-main-dark"
                onClick={() => setShow(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </dialog>
  );
}

export default AlertModal;
