"use client";

import React, { useState, useRef } from "react";
// Adjust path if necessary


function EventListenerExamplePage() {
  const [windowScrollY, setWindowScrollY] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 1. Listener for window scroll events
  const handleScroll = () => {
    setWindowScrollY(window.scrollY);
  };
  useEventListener("scroll", handleScroll); // Defaults to window

  // 2. Listener for clicks on a specific button element
  const handleButtonClick = () => {
    setClickCount((prev) => prev + 1);
  };
  useEventListener(
    "click",
    handleButtonClick,
    buttonRef as React.RefObject<EventTarget>
  );

  // Style to make the page scrollable
  const pageStyle: React.CSSProperties = {
    minHeight: "200vh", // Make page very tall to enable scrolling
    paddingBottom: "50px",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "15px",
  };

  const fixedInfoStyle: React.CSSProperties = {
    position: "fixed",
    top: "80px", // Adjust as needed based on your layout
    right: "20px",
    background: "rgba(0, 0, 0, 0.7)",
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
    zIndex: 1000,
  };

  return (
    <div style={pageStyle}>
      <h1>useEventListener Example</h1>
      <p>Attaches event listeners declaratively and safely.</p>

      {/* Fixed info box */}
      <div style={fixedInfoStyle}>
        Window Scroll Y: {windowScrollY.toFixed(0)}px
        <br />
        Button Clicks: {clickCount}
      </div>

      <h2>Example 1: Window Scroll</h2>
      <p>Scroll down the page to see the 'Window Scroll Y' value update.</p>

      <h2>Example 2: Element Click</h2>
      <p>Click the button below to see the 'Button Clicks' count update.</p>
      <button ref={buttonRef} style={buttonStyle}>
        Click Me!
      </button>

      {/* Add some content to make scrolling meaningful */}
      <div
        style={{
          marginTop: "50vh",
          height: "50px",
          background: "#eee",
          textAlign: "center",
          lineHeight: "50px",
        }}
      >
        Scroll past this point...
      </div>
      <div
        style={{
          marginTop: "50vh",
          height: "50px",
          background: "#ddd",
          textAlign: "center",
          lineHeight: "50px",
        }}
      >
        ...and this point...
      </div>
      <div
        style={{
          marginTop: "50vh",
          height: "50px",
          background: "#ccc",
          textAlign: "center",
          lineHeight: "50px",
        }}
      >
        ...and this point.
      </div>
    </div>
  );
}

export default EventListenerExamplePage;
