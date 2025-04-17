"use client";

import React, { useState, useEffect } from "react";
import useUpdateEffect from "@/app/hooks/useUpdateEffect"; // Adjust import path as needed
import useMount from "@/app/hooks/useMount"; // For comparison

const UseUpdateEffectExample: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [effectLogs, setEffectLogs] = useState<string[]>([]);

  // Standard useEffect - runs on mount AND update
  useEffect(() => {
    const message = `Standard useEffect ran. Count: ${count}`;
    console.log(message);
    setEffectLogs((prev) => [...prev, message]);
    // Cleanup function for standard useEffect (optional)
    return () => {
      // console.log('Standard useEffect cleanup');
    };
  }, [count]);

  // useMount - runs ONLY on mount
  useMount(() => {
    const message = `useMount ran. Initial Count: ${count}`;
    console.log(message);
    setEffectLogs((prev) => [...prev, message]);
  });

  // useUpdateEffect - runs ONLY on update (skips initial mount)
  useUpdateEffect(() => {
    const message = `useUpdateEffect ran. Count updated to: ${count}`;
    console.log(message);
    setEffectLogs((prev) => [...prev, message]);
    // Cleanup function for useUpdateEffect (optional)
    return () => {
      // console.log('useUpdateEffect cleanup');
    };
  }, [count]); // Dependency array works the same as useEffect

  return (
    <div className="p-4 border rounded shadow-md max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useUpdateEffect Example
      </h2>

      <p className="text-center">
        This hook works like <code>useEffect</code>, but skips the initial
        render. Check the console and the log below.
      </p>

      {/* Controls */}
      <div className="p-4 border rounded bg-gray-50 text-center">
        <p className="text-2xl font-bold mb-3">Count: {count}</p>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment Count (Triggers Effects)
        </button>
      </div>

      {/* Log Display */}
      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Effect Execution Log:</h3>
        <div className="space-y-1 max-h-48 overflow-y-auto text-xs border p-2 rounded bg-white font-mono">
          {effectLogs.map((log, index) => (
            <p
              key={index}
              className={`${
                log.includes("useUpdateEffect")
                  ? "text-green-700"
                  : log.includes("useMount")
                  ? "text-purple-700"
                  : "text-gray-700"
              }`}
            >
              {log}
            </p>
          ))}
          {effectLogs.length === 0 && (
            <p className="text-gray-500 italic">No effects logged yet.</p>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        Notice how <code>useUpdateEffect</code> does not run on the initial
        mount, unlike the standard <code>useEffect</code>.
      </p>
    </div>
  );
};

export default UseUpdateEffectExample;
