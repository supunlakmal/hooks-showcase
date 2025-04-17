"use client";

import React from "react";


// --- Default Breakpoints Component ---
function ResponsiveComponent() {
  const activeBreakpoint = useBreakpoint();

  let content = 'Screen size is below "sm" breakpoint (or SSR).';

  if (activeBreakpoint === "sm") {
    content = "Active breakpoint: sm (640px and up)";
  } else if (activeBreakpoint === "md") {
    content = "Active breakpoint: md (768px and up)";
  } else if (activeBreakpoint === "lg") {
    content = "Active breakpoint: lg (1024px and up)";
  } else if (activeBreakpoint === "xl") {
    content = "Active breakpoint: xl (1280px and up)";
  } else if (activeBreakpoint === "2xl") {
    content = "Active breakpoint: 2xl (1536px and up)";
  }

  return (
    <div>
      <h2>Default Breakpoints Demo</h2>
      <p>Resize your browser window to see the active breakpoint change.</p>
      <p
        style={{
          fontWeight: "bold",
          marginTop: "15px",
          padding: "10px",
          background: "#f0f0f0",
          border: "1px solid #ccc",
          minHeight: "1.5em",
        }}
      >
        {content}
      </p>
    </div>
  );
}

// --- Custom Breakpoints Component ---
const customMinBreakpoints = {
  small: "(min-width: 500px)",
  medium: "(min-width: 900px)",
  large: "(min-width: 1400px)",
};

type CustomBreakpointKey = keyof typeof customMinBreakpoints;

function CustomBreakpointComponent() {
  const activeBreakpoint =
    useBreakpoint<CustomBreakpointKey>(customMinBreakpoints);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Custom Breakpoints Demo</h2>
      <p>
        Using custom min-width breakpoints: 500px (small), 900px (medium),
        1400px (large).
      </p>
      <p
        style={{
          fontWeight: "bold",
          marginTop: "15px",
          padding: "10px",
          background: "#e0f0e0",
          border: "1px solid #ccc",
          minHeight: "1.5em",
        }}
      >
        Active custom breakpoint: {activeBreakpoint ?? "Below 500px"}
      </p>
    </div>
  );
}

// --- Main Page ---
function BreakpointPage() {
  return (
    <div>
      <h1>useBreakpoint Example</h1>
      <p>Determines the active responsive breakpoint based on window width.</p>
      <ResponsiveComponent />
      <CustomBreakpointComponent />
    </div>
  );
}

export default BreakpointPage;
