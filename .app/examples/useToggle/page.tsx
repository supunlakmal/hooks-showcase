"use client";

import React from "react";
import useToggle from "@/app/hooks/useToggle"; // Adjust import path as needed

const UseToggleExample: React.FC = () => {
  // Example 1: Default initial state (false)
  const [isToggled, toggle] = useToggle();

  // Example 2: Explicit initial state (true)
  const [isInitiallyTrue, toggleInitiallyTrue] = useToggle(true);

  // Example 3: Toggling with specific values (optional, if hook supports it - check impl.)
  // Some toggle hooks might allow: toggle(true) or toggle(false)
  // Let's assume this one is a simple toggle for now.

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useToggle Example
      </h2>

      <p className="text-center">A simple hook to manage boolean state.</p>

      {/* Example 1: Default Initial State */}
      <div className="p-4 border rounded bg-gray-50 text-center">
        <h3 className="text-lg font-medium mb-2">Toggle (Initial: false)</h3>
        <p className="text-2xl font-bold mb-3">
          State:{" "}
          <span
            className={`px-2 py-1 rounded ${
              isToggled
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {isToggled ? "ON" : "OFF"}
          </span>
        </p>
        <button
          onClick={() => toggle()} // Call the toggle function
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Toggle State
        </button>
      </div>

      {/* Example 2: Explicit Initial State */}
      <div className="p-4 border rounded bg-gray-50 text-center">
        <h3 className="text-lg font-medium mb-2">Toggle (Initial: true)</h3>
        <p className="text-2xl font-bold mb-3">
          State:{" "}
          <span
            className={`px-2 py-1 rounded ${
              isInitiallyTrue
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {isInitiallyTrue ? "ON" : "OFF"}
          </span>
        </p>
        <button
          onClick={() => toggleInitiallyTrue()} // Call the toggle function for this instance
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Toggle State
        </button>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        The <code>useToggle</code> hook provides a boolean state and a function
        to toggle it between true and false.
      </p>
    </div>
  );
};

export default UseToggleExample;
