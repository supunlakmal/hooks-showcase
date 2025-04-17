"use client";

import React, { CSSProperties } from "react";
// Adjust path if necessary


function DeviceOrientationExamplePage() {
  const { alpha, beta, gamma, absolute, isSupported } = useDeviceOrientation();

  // Helper function to format angles nicely
  const formatAngle = (angle: number | null): string => {
    return angle !== null ? angle.toFixed(1) + "°" : "N/A";
  };

  // Styling
  const containerStyle: CSSProperties = {
    padding: "20px",
    fontFamily: "sans-serif",
  };
  const listStyle: React.CSSProperties = {
    listStyle: "none",
    padding: "15px",
    margin: "15px 0",
    border: "1px solid #eee",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  };
  const listItemStyle: React.CSSProperties = {
    padding: "8px 0",
    borderBottom: "1px solid #eee",
  };
  const lastItemStyle: React.CSSProperties = {
    ...listItemStyle,
    borderBottom: "none",
  };
  const labelStyle: React.CSSProperties = {
    display: "inline-block",
    minWidth: "150px",
    fontWeight: "bold",
    marginRight: "10px",
  };
  const warningStyle: React.CSSProperties = {
    color: "red",
    border: "1px dashed red",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#ffeeee",
  };
  const noteStyle: React.CSSProperties = {
    color: "#555",
    fontSize: "0.9em",
    marginTop: "15px",
  };
  const visualizerStyle: CSSProperties = {
    marginTop: "30px",
    width: "150px",
    height: "150px",
    backgroundColor: "#e0f7fa",
    border: "2px solid #00796b",
    borderRadius: "50%", // Make it round
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.5em",
    // Apply rotations based on orientation data
    transform: `rotateZ(${(alpha ?? 0).toFixed(1)}deg) rotateX(${(
      beta ?? 0
    ).toFixed(1)}deg) rotateY(${(gamma ?? 0).toFixed(1)}deg)`,
    transition: "transform 0.1s linear", // Smoother transition
    transformStyle: "preserve-3d", // Needed for 3D rotations to look right
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };
  const northStyle: CSSProperties = {
    position: "absolute",
    top: "0",
    fontSize: "0.5em",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <h1>useDeviceOrientation Example</h1>
      <p>Tracks the physical orientation of the device.</p>

      {!isSupported ? (
        <p style={warningStyle}>
          Warning: Device Orientation API (`DeviceOrientationEvent`) is not
          supported by your browser, device, or current context (HTTPS may be
          required).
        </p>
      ) : (
        <div>
          <p style={noteStyle}>
            Note: You might need to be on HTTPS. Values update as you
            tilt/rotate your device.
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <span style={labelStyle}>Alpha (Z rotation):</span>{" "}
              {formatAngle(alpha)}
            </li>
            <li style={listItemStyle}>
              <span style={labelStyle}>Beta (X tilt):</span> {formatAngle(beta)}
            </li>
            <li style={listItemStyle}>
              <span style={labelStyle}>Gamma (Y tilt):</span>{" "}
              {formatAngle(gamma)}
            </li>
            <li style={lastItemStyle}>
              <span style={labelStyle}>Absolute:</span>{" "}
              {absolute ? "Yes" : "No"}
            </li>
          </ul>

          {/* Simple visualizer */}
          <p>Visualizer (attempts to orient based on data):</p>
          <div style={visualizerStyle}>
            <span style={northStyle}>N</span>
            🧭
          </div>
        </div>
      )}
    </div>
  );
}

export default DeviceOrientationExamplePage;
