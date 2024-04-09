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
        <p>{message}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
