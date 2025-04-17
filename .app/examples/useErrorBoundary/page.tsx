"use client";

import React, { useState, CSSProperties } from "react";
// Adjust path if necessary


// Note: This example focuses on using the hook's state and control functions.
// It does NOT implement a full React Error Boundary component to *catch* render errors.
// You would typically use this hook *within* or *alongside* a boundary component
// (e.g., from `react-error-boundary` or a custom class component).

function ErrorBoundaryExamplePage() {
  const { error, resetBoundary, showBoundary } = useErrorBoundary();
  const [isLoading, setIsLoading] = useState(false);

  // Simulate an operation that might fail async
  const simulateAsyncOperation = async (shouldFail: boolean) => {
    setIsLoading(true);
    resetBoundary(); // Clear previous errors before starting
    console.log("Simulating async operation...");
    try {
      await new Promise<void>((resolve, reject) =>
        setTimeout(() => {
          if (shouldFail) {
            console.log("Async operation failed!");
            reject(
              new Error(
                `Simulated Async Error @ ${new Date().toLocaleTimeString()}`
              )
            );
          } else {
            console.log("Async operation succeeded.");
            resolve();
          }
        }, 1000)
      );
      alert("Async operation succeeded!");
    } catch (caughtError) {
      // If it fails, use the hook to show the error
      if (caughtError instanceof Error) {
        console.log("Caught async error, showing boundary...");
        showBoundary(caughtError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Styling
  const containerStyle: CSSProperties = {
    padding: "20px",
  };
  const buttonStyle: CSSProperties = {
    padding: "10px 15px",
    margin: "5px",
    cursor: "pointer",
    minWidth: "180px",
  };
  const errorBoxStyle: CSSProperties = {
    border: "2px solid red",
    padding: "15px",
    margin: "20px 0",
    backgroundColor: "#ffeeee",
    borderRadius: "5px",
  };

  return (
    <div style={containerStyle}>
      <h1>useErrorBoundary Example</h1>
      <p>Manages error state for programmatic boundary display and reset.</p>
      <p>
        <i>
          Note: This hook itself doesn't catch errors; it manages state for an
          Error Boundary component.
        </i>
      </p>

      {/* Display the error if one is set by the hook */}
      {error ? (
        <div style={errorBoxStyle} role="alert">
          <h2>An Error Occurred!</h2>
          <p>
            This fallback UI is shown because the hook's `error` state is set.
          </p>
          <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>
            {error.message}
          </pre>
          <button
            onClick={resetBoundary}
            style={{ ...buttonStyle, background: "#ffc107" }}
          >
            Reset Error State (using hook)
          </button>
        </div>
      ) : (
        <div>
          <p>No error currently reported by the hook.</p>
          <p>
            Click a button below to simulate an async operation that might fail:
          </p>
          <button
            onClick={() => simulateAsyncOperation(false)}
            disabled={isLoading}
            style={{ ...buttonStyle, background: "#28a745", color: "white" }}
          >
            {isLoading ? "Working..." : "Simulate Success"}
          </button>
          <button
            onClick={() => simulateAsyncOperation(true)}
            disabled={isLoading}
            style={{ ...buttonStyle, background: "#dc3545", color: "white" }}
          >
            {isLoading ? "Working..." : "Simulate Async Failure"}
          </button>
          <p style={{ marginTop: "10px", fontSize: "0.9em", color: "#555" }}>
            A failure will use `showBoundary(error)` to set the error state
            above.
          </p>
        </div>
      )}
    </div>
  );
}

export default ErrorBoundaryExamplePage;
