"use client";

import React, { useState, useEffect, useCallback } from "react";
import useThrottle from "@/app/hooks/useThrottle"; // Adjust import path as needed

const UseThrottleExample: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [eventCount, setEventCount] = useState<number>(0);
  const [throttledCount, setThrottledCount] = useState<number>(0);
  const [throttledValue, setThrottledValue] = useState<string>("");

  const THROTTLE_DELAY = 500; // ms

  // Throttle the search term state update
  const throttledSearchTerm = useThrottle(searchTerm, THROTTLE_DELAY);

  // Simulate an expensive operation based on the throttled value
  useEffect(() => {
    if (throttledSearchTerm !== throttledValue) {
      console.log(
        `Expensive operation triggered with throttled value: ${throttledSearchTerm}`
      );
      setThrottledValue(throttledSearchTerm); // Update the displayed throttled value
      setThrottledCount((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [throttledSearchTerm]); // Only run when the throttled value changes

  // Handler for the input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setEventCount((prev) => prev + 1);
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useThrottle Example
      </h2>

      <p className="text-center">
        Type rapidly in the input below. The 'Throttled Value' and console logs
        will update at most once every {THROTTLE_DELAY}ms.
      </p>

      {/* Input Field */}
      <div className="p-4 border rounded bg-gray-50">
        <label
          htmlFor="searchInput"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Search Term:
        </label>
        <input
          id="searchInput"
          type="text"
          placeholder="Type quickly here..."
          value={searchTerm}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Value Display */}
      <div className="p-4 border rounded bg-blue-50 text-sm space-y-1">
        <h3 className="text-lg font-medium mb-2 text-blue-800">Values:</h3>
        <p>
          Raw Input Value:{" "}
          <span className="font-mono bg-blue-100 px-1 rounded">
            {searchTerm}
          </span>
        </p>
        <p>
          Throttled Value (updates every {THROTTLE_DELAY}ms):{" "}
          <span className="font-mono bg-blue-100 px-1 rounded font-bold">
            {throttledSearchTerm}
          </span>
        </p>
      </div>

      {/* Event Counts */}
      <div className="p-4 border rounded bg-green-50 text-sm space-y-1">
        <h3 className="text-lg font-medium mb-2 text-green-800">Counts:</h3>
        <p>
          'onChange' Events Fired:{" "}
          <span className="font-mono bg-green-100 px-1 rounded">
            {eventCount}
          </span>
        </p>
        <p>
          Throttled Updates Triggered:{" "}
          <span className="font-mono bg-green-100 px-1 rounded">
            {throttledCount}
          </span>
        </p>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        The <code>useThrottle</code> hook limits the rate at which a value
        updates. Useful for performance optimization with rapidly changing
        inputs.
      </p>
    </div>
  );
};

export default UseThrottleExample;
