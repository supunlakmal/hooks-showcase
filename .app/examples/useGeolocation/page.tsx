"use client";

import React from "react";
// Adjust path if necessary


function GeolocationExamplePage() {
  const {
    loading,
    latitude,
    longitude,
    accuracy,
    altitude,
    altitudeAccuracy,
    heading,
    speed,
    timestamp,
    error,
  } = useGeolocation({ enableHighAccuracy: true }); // Request high accuracy

  const containerStyle: React.CSSProperties = {
    padding: "20px",
    fontFamily: "sans-serif",
  };

  const statusStyle: React.CSSProperties = {
    padding: "15px",
    border: "1px dashed #ccc",
    borderRadius: "5px",
    marginBottom: "20px",
    textAlign: "center",
  };

  const dataListStyle: React.CSSProperties = {
    listStyle: "none",
    padding: 0,
    border: "1px solid #eee",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  };

  const listItemStyle: React.CSSProperties = {
    padding: "10px 15px",
    borderBottom: "1px solid #eee",
  };

  const lastListItemStyle: React.CSSProperties = {
    ...listItemStyle,
    borderBottom: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: "bold",
    minWidth: "150px",
    display: "inline-block",
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={statusStyle}>
          Loading geolocation data...{" "}
          <span role="img" aria-label="loading">
            🌍
          </span>
          <br />
          (Please ensure browser location permissions are granted)
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div
          style={{
            ...statusStyle,
            border: "1px dashed red",
            color: "red",
            backgroundColor: "#ffeeee",
          }}
        >
          Error getting location: {error.message}{" "}
          <span role="img" aria-label="error">
            ❌
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1>useGeolocation Example</h1>
      <p>
        Tracks the user's geographic location using the browser's Geolocation
        API.
      </p>
      {latitude !== null && longitude !== null ? (
        <ul style={dataListStyle}>
          <li style={listItemStyle}>
            <span style={labelStyle}>Latitude:</span> {latitude}
          </li>
          <li style={listItemStyle}>
            <span style={labelStyle}>Longitude:</span> {longitude}
          </li>
          <li style={listItemStyle}>
            <span style={labelStyle}>Accuracy:</span>{" "}
            {accuracy ? `${accuracy.toFixed(2)} meters` : "N/A"}
          </li>
          <li style={listItemStyle}>
            <span style={labelStyle}>Altitude:</span>{" "}
            {altitude ? `${altitude.toFixed(2)} meters` : "N/A"}
          </li>
          <li style={listItemStyle}>
            <span style={labelStyle}>Altitude Accuracy:</span>{" "}
            {altitudeAccuracy ? `${altitudeAccuracy.toFixed(2)} meters` : "N/A"}
          </li>
          <li style={listItemStyle}>
            <span style={labelStyle}>Heading:</span>{" "}
            {heading !== null ? `${heading.toFixed(2)} degrees` : "N/A"}
          </li>
          <li style={listItemStyle}>
            <span style={labelStyle}>Speed:</span>{" "}
            {speed !== null ? `${speed.toFixed(2)} m/s` : "N/A"}
          </li>
          <li style={lastListItemStyle}>
            <span style={labelStyle}>Timestamp:</span>{" "}
            {timestamp ? new Date(timestamp).toLocaleString() : "N/A"}
          </li>
        </ul>
      ) : (
        <div style={statusStyle}>
          Location data not yet available or permissions denied.
        </div>
      )}
    </div>
  );
}

export default GeolocationExamplePage;
