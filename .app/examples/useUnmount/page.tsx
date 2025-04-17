"use client";

import React, { useState } from "react";
import useUnmount from "@/app/hooks/useUnmount"; // Adjust import path as needed
import useMount from "@/app/hooks/useMount"; // Using useMount for contrast/setup

const ChildComponent: React.FC = () => {
  useMount(() => {
    // Runs only on mount
    console.log("ChildComponent Mounted!");
    alert(
      "ChildComponent is mounting. Check console for unmount log when hidden."
    );
    // Example: Setup subscription or listener
    // window.addEventListener('resize', handleResize);
  });

  useUnmount(() => {
    // This function runs only once when the component unmounts
    console.log("ChildComponent Unmounted! (logged by useUnmount)");
    alert("ChildComponent has unmounted! Check the console.");

    // Example: Cleanup subscription or listener
    // window.removeEventListener('resize', handleResize);
  });

  return (
    <div className="p-4 border rounded bg-red-100 border-red-300">
      <p className="font-medium text-red-800">Child Component</p>
      <p className="text-sm text-red-700">
        I log a message and show an alert when I unmount using{" "}
        <code>useUnmount</code>.
      </p>
    </div>
  );
};

const UseUnmountExample: React.FC = () => {
  const [showChild, setShowChild] = useState<boolean>(true); // Start with child visible

  useUnmount(() => {
    console.log(
      "UseUnmountExample Unmounted! (logged by useUnmount) - unlikely in this demo setup"
    );
  });

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useUnmount Example
      </h2>

      <p className="text-center">
        This hook executes a function only once when the component unmounts.
      </p>

      <div className="flex justify-center">
        <button
          onClick={() => setShowChild(!showChild)}
          className={`px-4 py-2 text-white rounded hover:opacity-90 ${
            showChild ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {showChild ? "Hide (Unmount)" : "Show (Mount)"} Child Component
        </button>
      </div>

      {/* Conditionally render the child component */}
      {showChild && <ChildComponent />}

      <p className="text-xs text-gray-600 mt-4 text-center">
        Toggle the child component to see the <code>useUnmount</code> effect
        trigger when it disappears.
      </p>
    </div>
  );
};

export default UseUnmountExample;
