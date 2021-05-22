import React, { useState } from "react";
import ReactModal from "react-modal";

const customStyles = {
  content: {
    height: "100px",
    width: "50%",
    transform: " translateX(50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
};

export const ContactInfoDialog = ({ user, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseModal = (event) => {
    event.stopPropagation();
    onClose();
    setIsOpen(false);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Minimal Modal Example"
      ariaHideApp={false}
      style={customStyles}
    >
      <div>{user?.cell}</div>
      <div>{user?.phone}</div>
      <div>{user?.email}</div>
      <button onClick={(event) => handleCloseModal(event)}>close</button>
    </ReactModal>
  );
};
