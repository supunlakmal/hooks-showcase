"use client";

import React, { useRef, useState, CSSProperties } from "react";
// Adjust path if necessary


function DraggableExamplePage() {
  const dragRef1 = useRef<HTMLDivElement>(null);
  const dragRef2 = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<HTMLDivElement>(null);

  // --- Uncontrolled Draggable Box ---
  const { position: pos1, isDragging: isDragging1 } = useDraggable(
    dragRef1 as React.RefObject<HTMLElement>,
    {
      initialPosition: { x: 20, y: 20 },
      boundsRef: boundsRef,
      onDragStart: (pos, e) => console.log("[Box 1] Drag Start:", pos),
      onDrag: (pos, e) => {
        /* console.log("[Box 1] Dragging:", pos) */
      }, // Often too noisy
      onDragEnd: (pos, e) => console.log("[Box 1] Drag End:", pos),
    }
  );

  // --- Controlled Draggable Box ---
  const [controlledPos, setControlledPos] = useState({ x: 150, y: 100 });
  const { isDragging: isDragging2 } = useDraggable(
    dragRef2 as React.RefObject<HTMLElement>,
    {
      boundsRef: boundsRef,
      position: controlledPos, // Pass state for position
      onPositionChange: setControlledPos, // Hook calls this to update state
      onDragStart: (pos, e) =>
        console.log("[Box 2 Controlled] Drag Start:", pos),
      onDragEnd: (pos, e) => console.log("[Box 2 Controlled] Drag End:", pos),
    }
  );
  const position2 = controlledPos; // Use the controlled state for styling

  // Styling
  const boundsStyle: CSSProperties = {
    width: "90%",
    height: "500px",
    maxWidth: "700px",
    border: "2px dashed #6c757d",
    position: "relative", // Needed for bounds calculations and absolute children
    marginTop: "20px",
    overflow: "hidden", // Ensures boxes stay within visual bounds
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  };

  const getBoxStyle = (isDragging: boolean, color: string): CSSProperties => ({
    width: "120px",
    height: "80px",
    backgroundColor: isDragging ? "#adb5bd" : color,
    border: `2px solid ${isDragging ? "#495057" : "black"}`,
    color: isDragging ? "#f8f9fa" : "black",
    borderRadius: "4px",
    position: "absolute", // Required for transform positioning
    left: 0, // Initial offset is 0, transform handles actual position
    top: 0,
    cursor: isDragging ? "grabbing" : "grab",
    touchAction: "none", // Important for touch devices
    userSelect: "none", // Prevent text selection during drag
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "0.9em",
    transition: "background-color 0.2s ease, border-color 0.2s ease",
    // Note: The transform style is applied dynamically by the hook
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>useDraggable Example</h1>
      <p>Drag elements using pointer events, with boundary constraints.</p>
      <p>
        Demonstrates both uncontrolled (internal state) and controlled (external
        state) modes.
      </p>

      <div ref={boundsRef} style={boundsStyle}>
        {/* Uncontrolled Box */}
        <div
          ref={dragRef1}
          style={{
            ...getBoxStyle(isDragging1, "#ffc107"),
            transform: `translate(${pos1.x}px, ${pos1.y}px)`,
          }}
        >
          Uncontrolled
          <span>
            ({pos1.x.toFixed(0)}, {pos1.y.toFixed(0)})
          </span>
        </div>

        {/* Controlled Box */}
        <div
          ref={dragRef2}
          style={{
            ...getBoxStyle(isDragging2, "#17a2b8"),
            transform: `translate(${position2.x}px, ${position2.y}px)`,
          }}
        >
          Controlled
          <span>
            ({position2.x.toFixed(0)}, {position2.y.toFixed(0)})
          </span>
        </div>
      </div>

      {/* Button to reset controlled state externally */}
      <button
        onClick={() => setControlledPos({ x: 150, y: 100 })}
        style={{ marginTop: "15px", padding: "8px 12px" }}
        disabled={position2.x === 150 && position2.y === 100}
      >
        Reset Controlled Box Position
      </button>
    </div>
  );
}

export default DraggableExamplePage;
