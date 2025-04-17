"use client";

import React, { useState, useMemo, useCallback } from "react";
// Corrected import type to default
import useWhyDidYouUpdate from "@/app/hooks/useWhyDidYouUpdate";
// Commented out missing components/markdown
// import { HookDocumentation } from "@/components/hook-documentation";
// import { CodeBlock } from "@/components/code-block";
// import useWhyDidYouUpdateDoc from "@/docs/useWhyDidYouUpdate.md";

interface CounterProps {
  count: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Counter: React.FC<CounterProps> = React.memo((props) => {
  // Use the hook to track prop changes
  useWhyDidYouUpdate("Counter", props);

  console.log("Counter rendered"); // Log to see when the actual render happens

  return (
    <div style={props.style} className="border p-4 rounded mt-2">
      <p className="text-lg font-medium">Child Component (Counter)</p>
      <p>Count: {props.count}</p>
      <button
        onClick={props.onClick}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment Count (Callback from Parent)
      </button>
      <p className="text-sm mt-1">This component is wrapped in React.memo.</p>
    </div>
  );
});
Counter.displayName = "Counter"; // Add display name for better debugging

const UseWhyDidYouUpdateExample: React.FC = () => {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");
  const [otherState, setOtherState] = useState(0); // State that doesn't affect Counter

  // --- Option 1: Problematic Props (will cause Counter to re-render unnecessarily) ---
  // Uncomment these lines and comment out the optimized versions below to see the effect
  // const counterStyle = { padding: '10px', backgroundColor: theme === 'light' ? '#eee' : '#333', color: theme === 'light' ? '#333' : '#eee' };
  // const handleIncrement = () => setCount(c => c + 1);

  // --- Option 2: Optimized Props ---
  // 1. Memoize the style object
  const counterStyle = useMemo(
    () => ({
      padding: "10px",
      borderRadius: "4px",
      backgroundColor: theme === "light" ? "#f0f0f0" : "#444",
      color: theme === "light" ? "#333" : "#f0f0f0",
      border: "1px solid #ccc",
    }),
    [theme]
  );
  // 2. Memoize the callback function
  const handleIncrement = useCallback(() => {
    setCount((c) => c + 1);
  }, []); // Empty dependency array means this function reference never changes

  // Use the hook on the Parent component itself to see when it re-renders
  useWhyDidYouUpdate("ParentComponent", {
    count,
    theme,
    otherState,
    counterStyle,
    handleIncrement,
  });

  console.log("ParentComponent rendered");

  const exampleCode = `
  'use client';
  import React, { useState, useMemo, useCallback } from 'react';
  import { useWhyDidYouUpdate } from '@/app/hooks/useWhyDidYouUpdate';

  interface CounterProps {
    count: number;
    style?: React.CSSProperties;
    onClick?: () => void;
  }

  // Wrap Counter with React.memo for optimization
  const Counter: React.FC<CounterProps> = React.memo((props) => {
    // Use the hook inside the component you want to debug
    useWhyDidYouUpdate('Counter', props);

    console.log('Counter rendered');

    return (
      <div style={props.style}>
        <p>Count: {props.count}</p>
        <button onClick={props.onClick}>Increment</button>
      </div>
    );
  });
  Counter.displayName = 'Counter';

  const ParentComponent: React.FC = () => {
    const [count, setCount] = useState(0);
    const [theme, setTheme] = useState('light');

    // --- Problematic Props ---
    // const counterStyle = { padding: '10px', backgroundColor: theme === 'light' ? '#eee' : '#333' };
    // const handleIncrement = () => setCount(c => c + 1);

    // --- Optimized Props ---
    const counterStyle = useMemo(() => ({
       padding: '10px',
       backgroundColor: theme === 'light' ? '#eee' : '#333'
    }), [theme]);
    const handleIncrement = useCallback(() => {
        setCount(c => c + 1);
    }, []);

    useWhyDidYouUpdate('ParentComponent', { count, theme, counterStyle, handleIncrement });

    return (
      <div>
        <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </button>
        <Counter count={count} style={counterStyle} onClick={handleIncrement} />
      </div>
    );
  };

  export default ParentComponent;
  `;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Live Example: Why Did You Update Demo
      </h2>
      <div className="border p-4 rounded mb-4 space-y-3">
        <p className="text-sm">
          Interact with the buttons below and check your browser's developer
          console. The <code>useWhyDidYouUpdate</code> hook will log messages
          indicating which props caused the 'Counter' or 'ParentComponent' to
          re-render.
        </p>
        <div>
          <button
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 mr-2"
          >
            Toggle Theme (Current: {theme})
          </button>
          <span className="text-sm italic">
            (Changes <code>counterStyle</code> prop via useMemo dependency)
          </span>
        </div>
        <div>
          <button
            onClick={handleIncrement} // Uses the memoized handleIncrement
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
          >
            Increment Count (Parent State)
          </button>
          <span className="text-sm italic">
            (Changes <code>count</code> prop directly)
          </span>
        </div>
        <div>
          <button
            onClick={() => setOtherState((s) => s + 1)}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2"
          >
            Change Unrelated Parent State
          </button>
          <span className="text-sm italic">
            (Re-renders Parent, but ideally not the memoized Counter)
          </span>
        </div>

        {/* Using the memoized version + memoized props is optimal */}
        <Counter count={count} style={counterStyle} onClick={handleIncrement} />

        <p className="text-sm mt-4">
          - When using optimized props (<code>useMemo</code> for{" "}
          <code>style</code>, <code>useCallback</code> for <code>onClick</code>
          ), changing the theme should re-render the Parent but{" "}
          <strong className="text-green-600">NOT</strong> cause the 'Counter'
          component to log prop changes or re-render (thanks to{" "}
          <code>React.memo</code>).
        </p>
        <p className="text-sm">
          - Incrementing the count{" "}
          <strong className="text-orange-600">WILL</strong> cause the 'Counter'
          to re-render and log the change in the <code>count</code> prop.
        </p>
        <p className="text-sm">
          - Changing unrelated parent state should re-render the Parent but{" "}
          <strong className="text-green-600">NOT</strong> the memoized
          'Counter'.
        </p>
        <p className="text-sm">
          - Try commenting out the <code>useMemo</code>/<code>useCallback</code>{" "}
          versions and uncommenting the "Problematic Props" in the code to see
          how 'Counter' re-renders unnecessarily when the theme changes.
        </p>
      </div>

      {/* <CodeBlock code={exampleCode} language="tsx" title="Example Usage Code" /> */}
    </div>
  );
};

export default UseWhyDidYouUpdateExample;
