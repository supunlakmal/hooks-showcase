"use client";

import React, { useState, useEffect } from "react";
// Adjust path if necessary
import useDeepCompareEffect from "@/app/hooks/useDeepCompareEffect";

// Define a complex data structure
interface ComplexObject {
  id: number;
  config: {
    enabled: boolean;
    values: number[];
    nested?: { flag: boolean };
  };
  name?: string;
}

// Child component that receives complex props
const SettingsDisplay: React.FC<{ settings: ComplexObject }> = ({
  settings,
}) => {
  const [renderCount, setRenderCount] = useState(0);
  const [effectRunCount, setEffectRunCount] = useState(0);
  const [deepEffectRunCount, setDeepEffectRunCount] = useState(0);

  // Standard useEffect
  useEffect(() => {
    console.log("[Standard useEffect] Running. Dependency:", settings);
    setEffectRunCount((c) => c + 1);
  }, [settings]);

  // useDeepCompareEffect
  useDeepCompareEffect(() => {
    console.log("[Deep Compare useEffect] Running. Dependency:", settings);
    setDeepEffectRunCount((c) => c + 1);
  }, [settings]);

  // Increment render count on each render
  useEffect(() => {
    setRenderCount((c) => c + 1);
  });

  // Basic styling
  const containerStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "15px",
    marginTop: "15px",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  };
  const countStyle: React.CSSProperties = {
    fontWeight: "bold",
    padding: "2px 6px",
    borderRadius: "3px",
    display: "inline-block",
    minWidth: "20px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h3>Child Component (`SettingsDisplay`)</h3>
      <p>
        Receives potentially new object reference (`settings`) on each parent
        render.
      </p>
      <pre>
        Current Settings Prop:
        <code>{JSON.stringify(settings, null, 2)}</code>
      </pre>
      <p>
        Child Render Count:{" "}
        <span style={{ ...countStyle, background: "#eee" }}>{renderCount}</span>
      </p>
      <p>
        Standard <code>useEffect</code> Run Count:{" "}
        <span style={{ ...countStyle, background: "#ffe0e0" }}>
          {effectRunCount}
        </span>
      </p>
      <p>
        Deep Compare <code>useEffect</code> Run Count:{" "}
        <span style={{ ...countStyle, background: "#e0ffe0" }}>
          {deepEffectRunCount}
        </span>
      </p>
    </div>
  );
};

// Parent component controlling the props
function DeepCompareEffectExamplePage() {
  const [id, setId] = useState(1);
  const [enabled, setEnabled] = useState(true);
  const [flag, setFlag] = useState(true);
  const [forceRender, setForceRender] = useState(0);

  // IMPORTANT: This creates a NEW object reference on EVERY render of ParentComponent.
  const currentSettings: ComplexObject = {
    id: id,
    config: {
      enabled: enabled,
      values: [10, 20, 30], // Keeping array reference stable for this demo
      nested: { flag: flag },
    },
    name: "Fixed Name", // Doesn't change
  };

  const buttonStyle: React.CSSProperties = {
    padding: "8px 12px",
    margin: "5px",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>useDeepCompareEffect Example</h1>
      <p>
        Compares <code>useEffect</code> (shallow compare) with{" "}
        <code>useDeepCompareEffect</code> (deep compare).
      </p>
      <p>
        Click buttons to see when each effect runs (check console and run counts
        below).
      </p>

      <div style={{ margin: "15px 0" }}>
        <button style={buttonStyle} onClick={() => setId((i) => i + 1)}>
          Change ID (Deep Change)
        </button>
        <button style={buttonStyle} onClick={() => setEnabled((e) => !e)}>
          Toggle Enabled (Deep Change)
        </button>
        <button style={buttonStyle} onClick={() => setFlag((f) => !f)}>
          Toggle Nested Flag (Deep Change)
        </button>
        <button
          style={buttonStyle}
          onClick={() => setForceRender((c) => c + 1)}
        >
          Force Parent Render (No Change)
        </button>
      </div>

      <SettingsDisplay settings={currentSettings} />

      <div
        style={{
          marginTop: "20px",
          borderTop: "1px solid #eee",
          paddingTop: "15px",
        }}
      >
        <h4>Explanation</h4>
        <ul>
          <li>
            Standard <code>useEffect</code> runs if the <code>settings</code>{" "}
            object *reference* changes (which happens on every parent render
            here) OR if its content changes.
          </li>
          <li>
            <code>useDeepCompareEffect</code> runs *only* if the *content* of
            the <code>settings</code> object changes, regardless of the
            reference.
          </li>
          <li>
            Clicking "Force Parent Render" creates a new `settings` object
            reference but with the same content. Notice how standard `useEffect`
            runs again, but `useDeepCompareEffect` does not.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DeepCompareEffectExamplePage;
