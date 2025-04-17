"use client";

import React, { useState, useRef, CSSProperties } from "react";
// Adjust path if necessary

// --- Modal Component with Focus Trap ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null); // Ref for the container
  const closeButtonRef = useRef<HTMLButtonElement>(null); // Ref for initial focus

  // Activate focus trap when the modal is open
  useFocusTrap(
    modalRef as React.RefObject<HTMLElement>, // Assert type here
    isOpen, // Only trap when modal is open
    closeButtonRef as React.RefObject<HTMLElement> // Assert type here too
  );

  if (!isOpen) {
    return null;
  }

  // Basic modal styling
  const modalStyle: CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "30px",
    background: "white",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    zIndex: 1050,
    minWidth: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const overlayStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: 1040,
  };

  const inputStyle: CSSProperties = {
    padding: "8px",
    width: "calc(100% - 16px)",
    marginBottom: "10px",
  };

  const buttonStyle: CSSProperties = {
    padding: "10px 15px",
    cursor: "pointer",
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      {/* Attach ref to the outermost div of the modal content */}
      <div
        ref={modalRef}
        style={modalStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title">Focus Trap Modal</h2>
        <p>
          Press `Tab` or `Shift+Tab`. Focus should remain within this modal.
        </p>
        <label>
          Email:{" "}
          <input type="email" placeholder="Enter email" style={inputStyle} />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            placeholder="Enter password"
            style={inputStyle}
          />
        </label>
        <select style={{ ...inputStyle, width: "100%" }}>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
        <button onClick={onClose} style={buttonStyle}>
          Submit Form
        </button>
        {/* Attach ref to the element that should receive initial focus */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          style={{ ...buttonStyle, marginTop: "auto", background: "#eee" }}
        >
          Close Modal
        </button>
      </div>
    </>
  );
};

// --- Main Page Component ---
function FocusTrapExamplePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pageButtonStyle: CSSProperties = {
    padding: "10px 15px",
    margin: "5px",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>useFocusTrap Example</h1>
      <p>
        Keeps keyboard focus within a designated area, essential for accessible
        modals.
      </p>

      <button
        onClick={() => setIsModalOpen(true)}
        style={{ ...pageButtonStyle, background: "lightblue" }}
      >
        Open Modal
      </button>

      {/* The Modal component contains the focus trap logic */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div
        style={{
          marginTop: "30px",
          borderTop: "1px solid #ccc",
          paddingTop: "20px",
        }}
      >
        <h3>Other Focusable Elements</h3>
        <p>
          Try tabbing here when the modal is closed. When the modal is open, you
          shouldn't be able to tab to these elements.
        </p>
        <button style={pageButtonStyle}>Outside Button 1</button>
        <input
          type="text"
          placeholder="Outside Input"
          style={{ padding: "8px", margin: "5px" }}
        />
        <button style={pageButtonStyle}>Outside Button 2</button>
      </div>
    </div>
  );
}

export default FocusTrapExamplePage;
