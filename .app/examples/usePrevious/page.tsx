"use client";

import React, { useState } from "react";
import usePrevious from "@/app/hooks/usePrevious"; // Adjust import path as needed

const UsePreviousExample: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const previousCount = usePrevious(count); // Get the previous value of count

  const [text, setText] = useState<string>("initial");
  const previousText = usePrevious(text); // Get the previous value of text

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        usePrevious Example
      </h2>

      <p className="text-center">
        This hook returns the value of a variable from the previous render.
      </p>

      {/* Counter Example */}
      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Counter</h3>
        <div className="text-center mb-2">
          <p>
            Current Count:{" "}
            <span className="font-mono bg-gray-200 px-1 py-0.5 rounded text-lg font-bold">
              {count}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Previous Count:{" "}
            <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
              {previousCount ?? "undefined"}
            </span>
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          >
            Increment
          </button>
          <button
            onClick={() => setCount(count - 1)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Decrement
          </button>
        </div>
      </div>

      {/* Text Example */}
      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Text Input</h3>
        <div className="text-center mb-2">
          <p>
            Current Text:{" "}
            <span className="font-mono bg-gray-200 px-1 py-0.5 rounded font-bold">
              {text}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Previous Text:{" "}
            <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
              {previousText ?? "undefined"}
            </span>
          </p>
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
          placeholder="Type something..."
        />
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        The 'previous' value updates one render cycle after the 'current' value
        changes. It's useful for comparing props or state between renders.
      </p>
    </div>
  );
};

export default UsePreviousExample;
