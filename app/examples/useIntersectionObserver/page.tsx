"use client";

import { useIntersectionObserver } from "@supunlakmal/hooks";
import React, { useRef, CSSProperties } from "react";
// Adjust path if necessary

// --- Component using the hook ---
interface ObserverBoxProps {
  options?: IntersectionObserverInit;
  id: string;
}

const ObserverBox: React.FC<ObserverBoxProps> = ({ options, id }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  // Use the hook, passing the ref and options
  const entry = useIntersectionObserver(
    targetRef as React.RefObject<Element>,
    options
  );
  const isVisible = entry?.isIntersecting;

  // Dynamic styling based on intersection status
  const boxStyle: CSSProperties = {
    margin: "50px auto",
    padding: "40px",
    height: "200px",
    border: `3px solid ${isVisible ? "limegreen" : "tomato"}`,
    borderRadius: "8px",
    backgroundColor: isVisible ? "#e6ffed" : "#fff0f0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    transition:
      "background-color 0.5s ease, border-color 0.5s ease, transform 0.3s ease",
    transform: isVisible ? "scale(1.02)" : "scale(1)",
    boxShadow: isVisible ? "0 4px 15px rgba(0, 200, 0, 0.2)" : "none",
  };

  const thresholdText = options?.threshold
    ? ` (Threshold: ${Array.isArray(options.threshold)
      ? options.threshold.join("/")
      : options.threshold
    })`
    : "";

  return (
    <div ref={targetRef} style={boxStyle}>
      <h3>Target Box {id}</h3>
      <strong>
        Is Visible{thresholdText}: {isVisible ? "✅ Yes" : "❌ No"}
      </strong>
      <p style={{ fontSize: "0.8em", color: "#555", marginTop: "10px" }}>
        Intersection Ratio: {entry?.intersectionRatio.toFixed(2) ?? "N/A"}
      </p>
      {/* Debug: Show raw entry */}
      {/* <pre style={{fontSize: '0.7em', maxHeight: '100px', overflow: 'auto', background: '#eee', padding: '5px'}}><code>{JSON.stringify(entry, null, 2)}</code></pre> */}
    </div>
  );
};

// --- Main Page ---
function IntersectionObserverExamplePage() {
  // Styling for layout
  const containerStyle: CSSProperties = {
    padding: "20px",
    fontFamily: "sans-serif",
  };
  const spacerStyle: CSSProperties = {
    height: "80vh", // Create vertical space to force scrolling
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5em",
    color: "#aaa",
  };

  return (
    <div style={containerStyle}>
      <h1>useIntersectionObserver Example</h1>
      <p>
        Monitors when an element enters or leaves the viewport (or a scrollable
        parent).
      </p>
      <p>Scroll down to see the boxes change appearance when they intersect.</p>

      <div style={spacerStyle}>Scroll Down 👇</div>

      {/* Example 1: Default options (intersects with viewport) */}
      <ObserverBox id="#1 (Viewport)" options={{ threshold: 0.1 }} />

      <div style={spacerStyle}>Keep Scrolling 👇</div>

      {/* Example 2: Higher threshold */}
      <ObserverBox
        id="#2 (Viewport, 50% threshold)"
        options={{ threshold: 0.5 }}
      />

      <div style={spacerStyle}>Almost there 👇</div>

      {/* Example 3: Multiple thresholds */}
      <ObserverBox
        id="#3 (Viewport, 0/25/50/75/100% thresholds)"
        options={{ threshold: [0, 0.25, 0.5, 0.75, 1.0] }}
      />

      <div style={{ ...spacerStyle, height: "40vh" }}>End of page</div>
    </div>
  );
}

export default IntersectionObserverExamplePage;
