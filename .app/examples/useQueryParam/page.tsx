"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import useQueryParam from "@/app/hooks/useQueryParam"; // Adjust import path as needed

// This component uses the hook and interacts with URL query parameters
const QueryParamInteraction: React.FC = () => {
  const searchParams = useSearchParams(); // Get current search params

  // Use the hook - it manages string values
  const [userParam, setUserParam] = useQueryParam("user", ""); // Default empty string
  const [countParam, setCountParam] = useQueryParam("count", "0"); // Default value '0' (string)

  // State for controlled input, separate from hook state if needed for immediate updates
  const [userInput, setUserInput] = useState(userParam);

  React.useEffect(() => {
    setUserInput(userParam); // Sync input with hook state changes
  }, [userParam]);

  const updateUserParam = (value: string) => {
    setUserParam(value || null); // Set to null if value is empty string to remove param
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserInput(value); // Update local input state immediately
    updateUserParam(value); // Update hook state and URL
  };

  const incrementCountParam = () => {
    const currentCount = parseInt(countParam || "0", 10); // Parse string to number
    const nextCount = isNaN(currentCount) ? 1 : currentCount + 1;
    setCountParam(String(nextCount)); // Update hook state and URL with string value
  };

  const resetParams = () => {
    setUserParam(null); // Setting to null removes the param
    setCountParam(null); // Setting to null removes the param (or back to default '0')
    setUserInput(""); // Also reset local input state
  };

  // Directly read from Next.js searchParams for comparison
  const directUser = searchParams.get("user");
  const directCount = searchParams.get("count");

  return (
    <div className="p-4 border rounded shadow-md max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useQueryParam Example
      </h2>

      <p className="text-center text-sm">
        Modify the input/buttons below to see the URL and the state values
        update.
      </p>

      {/* Display Hook State */}
      <div className="p-3 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">State from Hook (string):</h3>
        <p>
          User:{" "}
          <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
            {userParam || "Not Set"}
          </span>
        </p>
        <p>
          Count:{" "}
          <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
            {countParam || "Not Set"}
          </span>
        </p>
      </div>

      {/* Display Direct Search Params */}
      <div className="p-3 border rounded bg-blue-50">
        <h3 className="text-lg font-medium mb-2 text-blue-800">
          Direct Read from URL (useSearchParams):
        </h3>
        <p>
          User:{" "}
          <span className="font-mono bg-blue-200 text-blue-900 px-1 py-0.5 rounded">
            {directUser ?? "Not Set"}
          </span>
        </p>
        <p>
          Count:{" "}
          <span className="font-mono bg-blue-200 text-blue-900 px-1 py-0.5 rounded">
            {directCount ?? "Not Set"}
          </span>
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <label htmlFor="userInput" className="text-sm font-medium">
            Set User:
          </label>
          <input
            id="userInput"
            type="text"
            placeholder="e.g., alice"
            onChange={handleInputChange}
            value={userInput} // Use local state for controlled input
            className="p-2 border border-gray-300 rounded flex-grow"
          />
        </div>
        <div className="flex items-center gap-2 justify-center">
          <button
            onClick={incrementCountParam}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Increment Count Param
          </button>
          <button
            onClick={resetParams}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset Params
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        This hook synchronizes a state variable (as a string) with URL query
        parameters using native browser APIs (history.replaceState).
      </p>
    </div>
  );
};

// Wrap the component in Suspense because useSearchParams requires it
// Note: This basic useQueryParam doesn't rely on Next.js navigation hooks directly,
// but useSearchParams itself needs Suspense in App Router.
const UseQueryParamExample: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="p-4 text-center">Loading URL parameters...</div>
      }
    >
      <QueryParamInteraction />
    </Suspense>
  );
};

export default UseQueryParamExample;
