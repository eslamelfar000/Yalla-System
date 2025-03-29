import React, { useEffect } from "react";
import { RiErrorWarningLine } from "react-icons/ri";

function AlertModal({ lessons, show ,setShow }) {
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
        <h3 className="font-bold text-red-500">
          <RiErrorWarningLine className="w-15 h-15" />
        </h3>
        <p className="py-4">You can only select up to {lessons} lessons.</p>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn bg-main text-white"
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
