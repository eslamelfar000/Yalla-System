import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { RiCheckDoubleLine, RiErrorWarningLine } from "react-icons/ri";

function AlertModal({show ,setShow,text,status }) {
  useEffect(() => {
    if (show) {
      const modal = document.getElementById("my_modal_1");
      if (modal) {
        modal.showModal();
      }
    }
  }, [show]); // Runs when 'show' changes

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold">
          {status === "error" ? (
            <RiErrorWarningLine className="size-15 text-red-500" />
          ) : (
            <CheckBadgeIcon className="size-15 text-green-500" />
          )}
        </h3>
        <p className="py-4">{text}</p>
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
    </dialog>
  );
}

export default AlertModal;
