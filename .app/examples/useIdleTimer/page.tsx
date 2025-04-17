"use client";

import React, { useState, useCallback, CSSProperties } from "react";
// Adjust path if necessary


function IdleTimerExamplePage() {
  const [status, setStatus] = useState("Active");
  const [lastActivity, setLastActivity] = useState(new Date());
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [timerValue, setTimerValue] = useState(5); // Timeout in seconds

  const handleOnIdle = useCallback(() => {
    setStatus("Idle 💤");
    setIsPromptVisible(true);
    console.log(`User became idle at ${new Date().toLocaleTimeString()}.`);
    // Here you might: Show logout warning, pause video, etc.
  }, []);

  const handleOnActive = useCallback(() => {
    setStatus("Active ✅");
    setLastActivity(new Date()); // Record activity time
    setIsPromptVisible(false);
    console.log(`User became active at ${new Date().toLocaleTimeString()}.`);
  }, []);

  // Use the idle timer hook
  const isIdle = useIdleTimer({
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    timeout: timerValue * 1000, // Convert seconds to milliseconds
    debounce: 250, // Debounce events slightly
  });

  // Function to manually reset the timer (simulates activity)
  const forceActivity = () => {
    // Triggering any event the hook listens to works
    window.dispatchEvent(new Event("mousemove"));
    // Or call handleOnActive directly if you want to bypass debounce
    // handleOnActive();
    alert("Simulated activity and reset the timer!");
  };

  // Styling
  const containerStyle: CSSProperties = {
    padding: "20px",
    maxWidth: "600px",
    margin: "20px auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    background: isIdle ? "#fff3cd" : "#e2f0ff",
  };
  const statusBoxStyle: CSSProperties = {
    fontSize: "1.5em",
    fontWeight: "bold",
    margin: "20px 0",
    color: isIdle ? "orange" : "green",
  };
  const promptStyle: CSSProperties = {
    padding: "20px",
    border: "2px solid orange",
    borderRadius: "5px",
    background: "#fff9e6",
    marginTop: "20px",
  };
  const buttonStyle: CSSProperties = {
    padding: "10px 15px",
    margin: "10px 5px",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>useIdleTimer Example</h1>
      <p>
        Detects user inactivity. Set the timeout duration below and then stop
        interacting with the page (no mouse move, scroll, key press).
      </p>

      <div style={containerStyle}>
        <h2>Idle Status Monitor</h2>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="timeout">Idle Timeout (seconds): </label>
          <input
            type="number"
            id="timeout"
            value={timerValue}
            onChange={(e) =>
              setTimerValue(Math.max(1, parseInt(e.target.value, 10)))
            }
            min="1"
            style={{ padding: "5px", width: "60px" }}
          />
        </div>
        <div>Last Activity Detected: {lastActivity.toLocaleTimeString()}</div>
        <div style={statusBoxStyle}>Current Status: {status}</div>
        <p>
          (Hook reports <code>isIdle</code>: {isIdle ? "true" : "false"})
        </p>

        {isPromptVisible && (
          <div style={promptStyle}>
            <h3>Are you still there?</h3>
            <p>You've been idle for over {timerValue} seconds.</p>
            <button onClick={forceActivity} style={buttonStyle}>
              I'm Here!
            </button>
            <p style={{ fontSize: "0.8em" }}>
              Any activity (like clicking the button) will reset the timer.
            </p>
          </div>
        )}

        {!isPromptVisible && (
          <button onClick={forceActivity} style={buttonStyle}>
            Simulate Activity (Reset Timer)
          </button>
        )}
      </div>

      <textarea
        placeholder="Try typing here to reset the timer..."
        rows={3}
        style={{ width: "90%", marginTop: "20px", padding: "10px" }}
      ></textarea>
    </div>
  );
}

export default IdleTimerExamplePage;
