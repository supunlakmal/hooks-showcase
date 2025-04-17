"use client";

import React, { useState, useRef } from "react";
// NOTE: Assuming the hook is in the correct relative path


function ClickOutsideReadmeExamplePage() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Use the hook: call setIsOpen(false) when clicking outside modalRef
  // Using type assertion as done previously to match hook's expectation
  useClickOutside(modalRef as React.RefObject<HTMLElement>, () => {
    if (isOpen) {
      // Only close if it's currently open
      setIsOpen(false);
      console.log("Clicked outside, closing modal.");
    }
  });

  return (
    <div>
      <h1>useClickOutside Example (from README)</h1>
      <p>This example demonstrates closing a modal by clicking outside.</p>
      <button
        onClick={() => setIsOpen(true)}
        style={{ padding: "8px 12px", marginBottom: "10px" }}
      >
        Open Modal
      </button>

      {isOpen && (
        <div
          ref={modalRef} // Attach the ref to the modal container
          style={{
            padding: "20px",
            marginTop: "10px",
            border: "1px solid black",
            backgroundColor: "white",
            display: "inline-block",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Modal Content</h2>
          <p>Click outside this box to close it.</p>
          <button
            onClick={() => setIsOpen(false)}
            style={{ padding: "5px 10px", marginTop: "10px" }}
          >
            Close Manually
          </button>
        </div>
      )}

      <p
        style={{
          marginTop: "20px",
          borderTop: "1px solid #eee",
          paddingTop: "15px",
        }}
      >
        Other page content below the modal example...
      </p>
    </div>
  );
}

export default ClickOutsideReadmeExamplePage;
