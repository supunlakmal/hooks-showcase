"use client";

import React, { useState, useCallback, CSSProperties } from "react";


function AnimationPage() {
  const [position, setPosition] = useState(0); // State to animate
  const [logs, setLogs] = useState<string[]>([]);

  const log = (message: string) => {
    setLogs((prev) =>
      [...prev, `${new Date().toLocaleTimeString()}: ${message}`].slice(-10)
    ); // Keep last 10 logs
  };

  // Animation callback: Update position based on progress
  const animationCallback = useCallback(
    (progress: number, elapsed: number) => {
      // Example: Linear movement from 0 to 200 pixels
      const newPosition = progress * 200;
      setPosition(newPosition);
      // Avoid excessive logging in the callback itself unless debugging
      // console.log(`Elapsed: ${elapsed.toFixed(0)}ms, Progress: ${progress.toFixed(2)}, Position: ${newPosition.toFixed(2)}px`);
    },
    [] // Empty dependency array as setPosition is stable
  );

  const handleComplete = useCallback(() => {
    log("Animation complete!");
  }, []);

  const { start, stop, reset, isRunning } = useAnimation(animationCallback, {
    duration: 1500, // Animate over 1.5 seconds
    onComplete: handleComplete,
  });

  const handleStart = () => {
    log("Starting animation...");
    start();
  };

  const handleStop = () => {
    log("Stopping animation.");
    stop();
  };

  const handleReset = () => {
    log("Resetting animation.");
    reset();
    // Manually reset visual state if needed (useAnimation doesn't call callback on reset)
    setPosition(0);
  };

  const boxStyle: CSSProperties = {
    width: "50px",
    height: "50px",
    backgroundColor: "dodgerblue",
    position: "relative",
    left: `${position}px`, // Apply the animated position
    marginTop: "20px",
    borderRadius: "4px",
  };

  const logBoxStyle: React.CSSProperties = {
    height: "150px",
    overflowY: "scroll",
    border: "1px solid #eee",
    padding: "5px",
    marginTop: "15px",
    fontSize: "0.9em",
    fontFamily: "monospace",
    whiteSpace: "pre-line",
  };

  return (
    <div>
      <h1>useAnimation Example</h1>
      <p>
        Controls a <code>requestAnimationFrame</code> loop over a specified
        duration.
      </p>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={handleReset}>Reset</button>
        <span>
          Status: <strong>{isRunning ? "Running" : "Stopped"}</strong>
        </span>
      </div>

      <div
        style={{
          width: "250px",
          height: "60px",
          border: "1px solid #ccc",
          overflow: "hidden",
          paddingLeft: "5px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={boxStyle}></div>
      </div>

      <h3>Logs:</h3>
      <div style={logBoxStyle}>
        {logs.length > 0 ? logs.join("\n") : "Click Start..."}
      </div>
    </div>
  );
}

export default AnimationPage;
