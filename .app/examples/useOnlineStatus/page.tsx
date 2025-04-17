"use client";

import React from "react";
import useOnlineStatus from "@/app/hooks/useOnlineStatus"; // Adjust import path as needed

const UseOnlineStatusExample: React.FC = () => {
  const isOnline = useOnlineStatus();

  return (
    <div className="p-4 border rounded shadow-md max-w-sm mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useOnlineStatus Example
      </h2>

      <p className="text-center">
        This hook detects the browser's online/offline status.
      </p>

      <div
        className="p-6 border-2 rounded text-center"
        style={{
          borderColor: isOnline
            ? "#4ade80" /* green-400 */
            : "#f87171" /* red-400 */,
        }}
      >
        <p className="text-lg font-medium">Current Status:</p>
        <p
          className={`text-3xl font-bold mt-2 ${
            isOnline ? "text-green-600" : "text-red-600"
          }`}
        >
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>

      {/* Example: Conditionally disable a button when offline */}
      <div className="text-center">
        <button
          disabled={!isOnline}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => alert("Action performed while online!")}
        >
          Perform Online Action
        </button>
        {!isOnline && (
          <p className="text-xs text-red-500 mt-1">
            Button disabled because you are offline.
          </p>
        )}
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        Try disconnecting from your network or using browser developer tools to
        simulate offline status. The status should update automatically.
      </p>
    </div>
  );
};

export default UseOnlineStatusExample;
