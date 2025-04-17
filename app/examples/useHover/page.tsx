"use client";

import React, { CSSProperties } from "react";
// Adjust path if necessary


function HoverExamplePage() {
  // Example 1: Hovering over a div
  const [divRef, isDivHovered] = useHover<HTMLDivElement>();

  // Example 2: Hovering over a button
  const [buttonRef, isButtonHovered] = useHover<HTMLButtonElement>();

  // Example 3: Hovering over an image
  const [imageRef, isImageHovered] = useHover<HTMLImageElement>();

  // Styling
  const commonStyle: CSSProperties = {
    padding: "30px",
    margin: "20px auto",
    border: "2px solid",
    textAlign: "center",
    cursor: "default",
    transition:
      "background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease",
    borderRadius: "8px",
    maxWidth: "400px",
  };

  const divStyle: CSSProperties = {
    ...commonStyle,
    borderColor: isDivHovered ? "dodgerblue" : "#ccc",
    backgroundColor: isDivHovered ? "#e0f7ff" : "white",
    transform: isDivHovered ? "scale(1.03)" : "scale(1)",
  };

  const buttonStyle: CSSProperties = {
    padding: "15px 25px",
    fontSize: "1em",
    cursor: "pointer",
    border: `2px solid ${isButtonHovered ? "green" : "#aaa"}`,
    backgroundColor: isButtonHovered ? "lightgreen" : "#eee",
    transition:
      "background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease",
    transform: isButtonHovered ? "scale(1.1)" : "scale(1)",
    display: "block",
    margin: "20px auto",
  };

  const imageContainerStyle: CSSProperties = {
    ...commonStyle,
    padding: "10px",
    borderColor: isImageHovered ? "orange" : "#ccc",
    backgroundColor: isImageHovered ? "#fff3e0" : "white",
    transform: isImageHovered ? "scale(1.03)" : "scale(1)",
  };

  const imageStyle: CSSProperties = {
    maxWidth: "100%",
    height: "auto",
    opacity: isImageHovered ? 0.8 : 1,
    transition: "opacity 0.3s ease",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>useHover Example</h1>
      <p>Tracks whether the mouse pointer is hovering over an element.</p>

      {/* Example 1: Div */}
      <div ref={divRef} style={divStyle}>
        {isDivHovered ? " hovering on this DIV! 🎉" : "Hover over this DIV"}
      </div>

      {/* Example 2: Button */}
      <button ref={buttonRef} style={buttonStyle}>
        {isButtonHovered
          ? " hovering on the BUTTON! 👍"
          : "Hover over this BUTTON"}
      </button>

      {/* Example 3: Image */}
      <div ref={imageRef} style={imageContainerStyle}>
        <p style={{ margin: "0 0 10px 0" }}>
          {" "}
          {isImageHovered
            ? " hovering on the IMAGE! 🖼️"
            : "Hover over this IMAGE"}
        </p>
        <img
          src="https://via.placeholder.com/300x150/ddd/808080?text=Sample+Image"
          alt="Placeholder"
          style={imageStyle}
        />
      </div>
    </div>
  );
}

export default HoverExamplePage;
