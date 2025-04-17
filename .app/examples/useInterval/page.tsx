"use client";

import React, { useState } from "react";
import useInterval from "@/app/hooks/useInterval"; // Adjust import path as needed

const UseIntervalExample: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [delay, setDelay] = useState<number>(1000);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useInterval(
    () => {
      setCount(count + 1);
    },
    // Delay in milliseconds or null to stop the interval
    isRunning ? delay : null
  );

  const handleDelayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDelay = Number(event.target.value);
    setDelay(newDelay > 0 ? newDelay : 1); // Ensure delay is positive
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">useInterval Example</h2>
      <p className="text-lg mb-2">
        Count:{" "}
        <span className="font-mono bg-gray-100 px-2 py-1 rounded">{count}</span>
      </p>

      <div className="mb-4 space-y-2">
        <div>
          <label
            htmlFor="delayInput"
            className="block text-sm font-medium text-gray-700 mr-2"
          >
            Interval Delay (ms):
          </label>
          <input
            id="delayInput"
            type="number"
            value={delay}
            onChange={handleDelayChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-4 py-2 rounded text-white ${
            isRunning
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isRunning ? "Stop" : "Start"} Interval
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 rounded text-white bg-gray-500 hover:bg-gray-600"
        >
          Reset Count
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        This example demonstrates a counter that increments based on a
        configurable interval using the <code>useInterval</code> hook.
      </p>
    </div>
  );
};

export default UseIntervalExample;
