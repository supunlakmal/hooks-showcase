"use client";

import React, { useState } from "react";
import useMount from "@/app/hooks/useMount"; // Adjust import path as needed

const ChildComponent: React.FC = () => {
  useMount(() => {
    // This function runs only once when the component mounts
    console.log("ChildComponent Mounted! (logged by useMount)");
    alert("ChildComponent has mounted! Check the console.");

    // Example: Perform an initial fetch or setup
    // const fetchData = async () => { ... };
    // fetchData();

    // Cleanup function (optional)
    // Although useMount typically doesn't need cleanup like useEffect,
    // if you start something that needs stopping, you might structure differently
    // or use a standard useEffect.
    // For cleanup related *only* to mount effect, you might structure inside:
    // const subscription = setupSubscription();
    // return () => unmountSubscription(subscription);
    // However, useUnmount is generally preferred for unmount-specific logic.
  });

  return (
    <div className="p-4 border rounded bg-green-100 border-green-300">
      <p className="font-medium text-green-800">Child Component</p>
      <p className="text-sm text-green-700">
        I log a message to the console and show an alert on mount using{" "}
        <code>useMount</code>.
      </p>
    </div>
  );
};

const UseMountExample: React.FC = () => {
  const [showChild, setShowChild] = useState<boolean>(false);

  useMount(() => {
    console.log("UseMountExample Mounted! (logged by useMount)");
  });

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useMount Example
      </h2>

      <p className="text-center">
        This hook executes a function only once when the component mounts.
      </p>

      <div className="flex justify-center">
        <button
          onClick={() => setShowChild(!showChild)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showChild ? "Hide" : "Show"} Child Component
        </button>
      </div>

      {/* Conditionally render the child component */}
      {showChild && <ChildComponent />}

      <p className="text-xs text-gray-600 mt-4 text-center">
        Toggle the child component to see the <code>useMount</code> effect
        trigger when it appears. The parent component also uses{" "}
        <code>useMount</code> for its own mount log.
      </p>
    </div>
  );
};

export default UseMountExample;
