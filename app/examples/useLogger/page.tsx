"use client";

import React, { useState, useEffect } from "react";
import useLogger from "@/app/hooks/useLogger"; // Adjust import path as needed

const UseLoggerExample: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("hello");

  // Use the logger hook to track the component's lifecycle and state changes
  useLogger("UseLoggerExample", { count, text });

  // Simulate prop changes (though this component doesn't receive props)
  // In a real scenario, this would log when props passed to this component change.
  useEffect(() => {
    console.log("Component Mounted (logged by standard useEffect)");
    return () => {
      console.log("Component Unmounted (logged by standard useEffect)");
    };
  }, []);

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useLogger Example
      </h2>

      <p className="text-center">
        Check the browser console to see logs from <code>useLogger</code>.
      </p>

      {/* Controls to change state */}
      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">State Controls</h3>
        <div className="flex items-center space-x-4 mb-2">
          <span>Count: {count}</span>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Increment Count
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <span>Text: {text}</span>
          <button
            onClick={() => setText((t) => t + "!")}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Append '!' to Text
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        The <code>useLogger</code> hook logs component mount, unmount, and
        updates (state/prop changes) to the console, prefixed with the component
        name provided.
      </p>
    </div>
  );
};

export default UseLoggerExample;
