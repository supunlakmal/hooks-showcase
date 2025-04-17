"use client";

import React, { useCallback, useState } from "react";
// Adjust path if necessary


function CountdownExamplePage() {
  const [message, setMessage] = useState<string | null>(null);

  // Callback for when the countdown finishes
  const handleComplete = useCallback(() => {
    setMessage("🚀 Countdown finished! Launch!");
    // Clear the message after a few seconds
    setTimeout(() => setMessage(null), 4000);
  }, []);

  // Use the countdown hook
  const { remainingSeconds, isRunning, start, pause, reset } = useCountdown({
    seconds: 15, // Start at 15 seconds
    interval: 100, // Update every 100ms for smoother display
    autoStart: false, // Don't start automatically
    onComplete: handleComplete,
  });

  // Basic styling
  const containerStyle: React.CSSProperties = {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    maxWidth: "400px",
    margin: "20px auto",
    textAlign: "center",
    background: "#f9f9f9",
  };
  const timeStyle: React.CSSProperties = {
    fontSize: "2.5em",
    fontWeight: "bold",
    margin: "10px 0",
    color: "#333",
  };
  const statusStyle: React.CSSProperties = {
    fontStyle: "italic",
    color: isRunning ? "green" : "orange",
    marginBottom: "20px",
  };
  const buttonStyle: React.CSSProperties = {
    padding: "10px 15px",
    margin: "5px",
    cursor: "pointer",
    minWidth: "100px",
    border: "none",
    borderRadius: "4px",
  };
  const startButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#28a745",
    color: "white",
  };
  const pauseButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#ffc107",
    color: "black",
  };
  const resetButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
    color: "white",
  };
  const messageStyle: React.CSSProperties = {
    marginTop: "20px",
    padding: "10px",
    background: "#e2f0ff",
    border: "1px solid #b8d6f5",
    borderRadius: "4px",
    color: "#0056b3",
    fontWeight: "bold",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>useCountdown Example</h1>
      <p>Manages a countdown timer with controls.</p>

      <div style={containerStyle}>
        <h2>Countdown Timer</h2>
        <div style={timeStyle}>{remainingSeconds.toFixed(1)}s</div>
        <div style={statusStyle}>
          {isRunning ? "Running" : "Paused / Stopped"}
        </div>
        <div>
          {!isRunning ? (
            <button
              onClick={start}
              disabled={remainingSeconds <= 0}
              style={startButtonStyle}
            >
              Start / Resume
            </button>
          ) : (
            <button onClick={pause} style={pauseButtonStyle}>
              Pause
            </button>
          )}
          <button onClick={reset} style={resetButtonStyle}>
            Reset (to 15s)
          </button>
        </div>
        {message && <div style={messageStyle}>{message}</div>}
      </div>
    </div>
  );
}

export default CountdownExamplePage;
