"use client";

import React, { useState, useCallback } from "react";
import useTimeout from "@/app/hooks/useTimeout"; // Adjust import path as needed

const UseTimeoutExample: React.FC = () => {
  const [message, setMessage] = useState<string>(
    "Click the button to show a message for 3 seconds."
  );
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  // State to control the delay passed to the hook
  const [timeoutDelay, setTimeoutDelay] = useState<number | null>(null);

  // Callback to hide the message - this will run when the timeout executes
  const hideMessage = useCallback(() => {
    setIsMessageVisible(false);
    setMessage("Message hidden after timeout.");
    setTimeoutDelay(null); // Reset delay after execution
    console.log("Timeout executed: Message hidden");
  }, []);

  // Use the timeout hook - it runs when timeoutDelay is a number
  useTimeout(hideMessage, timeoutDelay);

  const showAndStartTimeout = () => {
    setMessage("This message will disappear in 3 seconds...");
    setIsMessageVisible(true);
    setTimeoutDelay(3000); // Set the delay to start the timeout
    console.log("Timeout scheduled with delay 3000ms");
  };

  const cancelTimeout = () => {
    setTimeoutDelay(null); // Set delay to null to clear the timeout
    setMessage("Timeout cancelled.");
    setIsMessageVisible(true); // Keep message visible if cancelled
    console.log("Timeout cleared by setting delay to null");
  };

  // Determine if the timeout is active based on the delay state
  const isActive = timeoutDelay !== null;

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useTimeout Example
      </h2>

      <p className="text-center">
        Manage delayed function execution by controlling the delay value.
      </p>

      {/* Message Area */}
      <div className="p-4 border rounded bg-gray-50 min-h-[60px] flex items-center justify-center">
        {isMessageVisible ? (
          <p className="text-lg text-center font-medium text-blue-700">
            {message}
          </p>
        ) : (
          <p className="text-lg text-center text-gray-500">{message}</p> // Show initial/hidden message
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={showAndStartTimeout}
          disabled={isActive} // Disable start if delay is not null
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Show Message & Start Timeout
        </button>
        <button
          onClick={cancelTimeout}
          disabled={!isActive} // Disable clear if delay is null
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          Cancel Timeout
        </button>
      </div>

      <p className="text-center text-sm mt-2">
        Timeout Active:{" "}
        <span
          className={`font-bold ${
            isActive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isActive ? "Yes" : "No"}
        </span>
      </p>

      <p className="text-xs text-gray-600 mt-4 text-center">
        The <code>useTimeout</code> hook runs the callback after the specified
        delay. Set delay to <code>null</code> to prevent/clear the timeout.
      </p>
    </div>
  );
};

export default UseTimeoutExample;
