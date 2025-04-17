"use client";

import React from "react";
import useWindowSize from "@/app/hooks/useWindowSize"; // Adjust import path as needed

const UseWindowSizeExample: React.FC = () => {
  // Get the current window size
  const { width, height } = useWindowSize();

  // Determine a breakpoint example
  const isSmall = width !== undefined && width < 768;
  const isMedium = width !== undefined && width >= 768 && width < 1024;
  const isLarge = width !== undefined && width >= 1024;

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useWindowSize Example
      </h2>

      <p className="text-center">
        Resize your browser window to see the dimensions update.
      </p>

      {/* Display Dimensions */}
      <div className="p-4 border rounded bg-gray-50 text-center">
        <h3 className="text-lg font-medium mb-2">Current Window Size:</h3>
        {width !== undefined && height !== undefined ? (
          <p className="text-lg font-mono">
            Width: <span className="bg-gray-200 px-1 rounded">{width}px</span>,
            Height: <span className="bg-gray-200 px-1 rounded">{height}px</span>
          </p>
        ) : (
          <p className="text-gray-500 italic">Loading size...</p> // Initial state before first effect runs
        )}
      </div>

      {/* Breakpoint Example */}
      <div className="p-4 border rounded bg-blue-50">
        <h3 className="text-lg font-medium mb-2 text-blue-800">
          Breakpoint Demo:
        </h3>
        {isSmall && <p className="text-blue-700">Small Layout (&lt; 768px)</p>}
        {isMedium && (
          <p className="text-blue-700">Medium Layout (768px - 1023px)</p>
        )}
        {isLarge && <p className="text-blue-700">Large Layout (&ge; 1024px)</p>}
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        The <code>useWindowSize</code> hook returns the current width and height
        of the browser window, updating automatically on resize.
      </p>
    </div>
  );
};

export default UseWindowSizeExample;
