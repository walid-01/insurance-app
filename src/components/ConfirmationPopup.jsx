import React from "react";

function ConfirmationPopup({ message, onConfirm, onCancel }) {
  const handleClickOutside = (event) => {
    if (event.target.classList.contains("confirmation-popup")) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 confirmation-popup"
      onClick={handleClickOutside}
    >
      <div className="bg-white p-4 rounded-md shadow-md">
        <p className="mb-3">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            className="py-1 px-2 rounded-md bg-red-500 text-white font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="py-1 px-2 rounded-md bg-green-500 text-white font-medium"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
