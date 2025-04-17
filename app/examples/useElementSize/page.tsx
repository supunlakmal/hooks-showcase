"use client";

import React from "react";
// Adjust path if necessary


function ElementSizeExamplePage() {
  // Get the callback ref and the size state from the hook
  // Specify the element type (e.g., HTMLDivElement) for the callback ref
  const [resizableRef, { width, height }] = useElementSize<HTMLDivElement>();

  const containerStyle: React.CSSProperties = {
    width: "80%", // Make the container resizable
    minWidth: "200px",
    maxWidth: "600px",
    margin: "20px auto",
    padding: "15px",
    resize: "both", // Allow resizing by dragging
    overflow: "auto", // Needed for resize handle
    border: "2px solid steelblue",
    backgroundColor: "#f0f8ff",
  };

  const measuredBoxStyle: React.CSSProperties = {
    backgroundColor: "lightcoral",
    padding: "20px",
    margin: "10px",
    color: "white",
    textAlign: "center",
    minHeight: "50px", // Give it some initial size
  };

  return (
    <div>
      <h1>useElementSize Example</h1>
      <p>Tracks the width and height of an element.</p>
      <p>
        Try resizing the blue container below by dragging its bottom-right
        corner. The dimensions of the inner red box will be updated.
      </p>

      <div style={containerStyle}>
        Container (resizable)
        <div ref={resizableRef} style={measuredBoxStyle}>
          <strong>Measured Element</strong>
          <br />
          Width: {width > 0 ? `${width.toFixed(1)}px` : "Calculating..."}
          <br />
          Height: {height > 0 ? `${height.toFixed(1)}px` : "Calculating..."}
        </div>
      </div>
    </div>
  );
}

export default ElementSizeExamplePage;
