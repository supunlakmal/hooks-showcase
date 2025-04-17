"use client";

import React, { CSSProperties } from "react";
// Adjust path if necessary


function DeviceMotionExamplePage() {
  const {
    acceleration,
    accelerationIncludingGravity,
    rotationRate,
    interval,
    isSupported,
  } = useDeviceMotion();

  // Helper to format motion data object (X, Y, Z)
  const formatMotionData = (
    data: {
      x: number | null;
      y: number | null;
      z: number | null;
    } | null,
    unit: string
  ): React.ReactNode => {
    if (!data) return <i>N/A</i>;
    const x = data.x?.toFixed(2) ?? "N/A";
    const y = data.y?.toFixed(2) ?? "N/A";
    const z = data.z?.toFixed(2) ?? "N/A";
    return (
      <span>
        X: <strong>{x}</strong>, Y: <strong>{y}</strong>, Z:{" "}
        <strong>{z}</strong> {unit}
      </span>
    );
  };

  // Helper to format rotation data object (alpha, beta, gamma)
  const formatRotationRate = (
    data: {
      alpha: number | null;
      beta: number | null;
      gamma: number | null;
    } | null,
    unit: string
  ): React.ReactNode => {
    if (!data) return <i>N/A</i>;
    const alpha = data.alpha?.toFixed(2) ?? "N/A";
    const beta = data.beta?.toFixed(2) ?? "N/A";
    const gamma = data.gamma?.toFixed(2) ?? "N/A";
    return (
      <span>
        α: <strong>{alpha}</strong>, β: <strong>{beta}</strong>, γ:{" "}
        <strong>{gamma}</strong> {unit}
      </span>
    );
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
    minWidth: "250px",
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

  return (
    <div style={containerStyle}>
      <h1>useDeviceMotion Example</h1>
      <p>Tracks device acceleration and rotation rates.</p>

      {!isSupported ? (
        <p style={warningStyle}>
          Warning: Device Motion API (`DeviceMotionEvent`) is not supported by
          your browser or device.
        </p>
      ) : (
        <div>
          <p style={noteStyle}>
            Note: Accessing motion data often requires <strong>HTTPS</strong>{" "}
            and <strong>user permission</strong> (which this hook doesn't
            request). If values are not updating, check browser console and
            permissions.
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              {" "}
              <span style={labelStyle}>Acceleration:</span>{" "}
              {formatMotionData(acceleration, "m/s²")}
            </li>
            <li style={listItemStyle}>
              {" "}
              <span style={labelStyle}>Acceleration w/ Gravity:</span>{" "}
              {formatMotionData(accelerationIncludingGravity, "m/s²")}
            </li>
            <li style={listItemStyle}>
              {" "}
              <span style={labelStyle}>Rotation Rate:</span>{" "}
              {formatRotationRate(rotationRate, "deg/s")}
            </li>
            <li style={lastItemStyle}>
              {" "}
              <span style={labelStyle}>Update Interval:</span>{" "}
              {interval !== null ? `${interval} ms` : <i>N/A</i>}
            </li>
          </ul>
          <p style={noteStyle}>Try moving or shaking your device.</p>
        </div>
      )}
    </div>
  );
}

export default DeviceMotionExamplePage;
