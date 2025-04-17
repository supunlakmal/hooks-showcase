"use client";

import React, { useState, useEffect } from "react";
import useKeyPress from "@/app/hooks/useKeyPress"; // Adjust import path as needed

const UseKeyPressExample: React.FC = () => {
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);

  // Example 1: Detect 's' key press
  const sKeyPressed = useKeyPress("s");

  // Example 2: Detect 'ArrowUp' key press
  const arrowUpPressed = useKeyPress("ArrowUp");

  // Track the last key pressed manually
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setLastKeyPressed(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Run only once on mount

  return (
    <div className="p-4 border rounded shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">useKeyPress Example</h2>
      <p className="mb-2">Try pressing different keys on your keyboard.</p>

      <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded">
        <p>
          Is 's' key pressed?{" "}
          <span
            className={`font-bold ${
              sKeyPressed ? "text-green-600" : "text-red-600"
            }`}
          >
            {sKeyPressed ? "Yes" : "No"}
          </span>
        </p>
        <p>
          Is 'ArrowUp' key pressed?{" "}
          <span
            className={`font-bold ${
              arrowUpPressed ? "text-green-600" : "text-red-600"
            }`}
          >
            {arrowUpPressed ? "Yes" : "No"}
          </span>
        </p>
        <p>
          Last key pressed:{" "}
          <span className="font-mono bg-gray-200 px-2 py-1 rounded">
            {lastKeyPressed ?? "None"}
          </span>
        </p>
      </div>

      <div className="mt-4 p-4 border border-dashed border-blue-400 rounded">
        <p className="text-sm text-blue-700">Focus this area and press keys:</p>
        <input
          type="text"
          placeholder="Type here to see key presses..."
          className="mt-2 p-2 border border-gray-300 rounded w-full"
          onKeyDown={(e) => e.preventDefault()} // Prevent default input behavior for demo
        />
      </div>

      <p className="text-xs text-gray-500 mt-4">
        This example shows how <code>useKeyPress</code> can detect specific key
        presses or any key press globally.
      </p>
    </div>
  );
};

export default UseKeyPressExample;
