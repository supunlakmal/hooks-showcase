"use client";

import React, { useState, useEffect } from "react";
// Adjust the import path if your hooks are located elsewhere


function DebounceExamplePage() {
  const [inputValue, setInputValue] = useState("");
  // Debounce the inputValue with a 500ms delay
  const debouncedValue = useDebounce(inputValue, 500);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    // This effect will run 500ms after the user stops typing
    if (debouncedValue) {
      const newLog = `API call simulation for: "${debouncedValue}" at ${new Date().toLocaleTimeString()}`;
      console.log(newLog);
      setLog((prevLog) => [...prevLog, newLog].slice(-5)); // Keep last 5 logs
    } else {
      // Optionally handle the case where the debounced value becomes empty
      const emptyLog = `Input cleared at ${new Date().toLocaleTimeString()}`;
      console.log(emptyLog);
      setLog((prevLog) => [...prevLog, emptyLog].slice(-5));
    }
    // Dependency array ensures this runs only when debouncedValue changes
  }, [debouncedValue]);

  const logBoxStyle: React.CSSProperties = {
    height: "150px",
    overflowY: "scroll",
    border: "1px solid #ccc",
    padding: "10px",
    marginTop: "15px",
    fontSize: "0.9em",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    background: "#f9f9f9",
  };

  return (
    <div>
      <h1>useDebounce Example</h1>
      <p>
        Debounces a value, useful for delaying actions like API calls on input.
      </p>
      <p>
        Type into the input field below. An action (logged below) will only
        trigger 500ms after you stop typing.
      </p>

      <input
        type="text"
        placeholder="Type here..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ padding: "8px", width: "300px", marginBottom: "10px" }}
      />

      <div>
        <strong>Current Value:</strong> {inputValue || <em>(empty)</em>}
      </div>
      <div>
        <strong>Debounced Value (after 500ms):</strong>{" "}
        {debouncedValue || <em>(empty)</em>}
      </div>

      <h3>Simulated Action Log (Last 5):</h3>
      <div style={logBoxStyle}>
        {log.length === 0
          ? "No actions triggered yet."
          : log.map((entry, index) => (
              <div key={index} style={{ marginBottom: "5px" }}>
                {entry}
              </div>
            ))}
      </div>
    </div>
  );
}

export default DebounceExamplePage;
