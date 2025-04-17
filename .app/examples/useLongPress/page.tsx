"use client";

import React, { useState, useCallback, useRef } from "react";
import useLongPress from "@/app/hooks/useLongPress"; // Adjust import path as needed

const UseLongPressExample: React.FC = () => {
  const [status, setStatus] = useState<string>("Idle");
  const [longPressCount, setLongPressCount] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onLongPress = useCallback(() => {
    setStatus("Long Press Detected!");
    setLongPressCount((prev) => prev + 1);
    console.log("Long press event triggered");
    // Prevent click event from firing after long press completes
    // This logic might need adjustment based on exact hook behavior
  }, []);

  const onStart = useCallback(() => {
    setStatus("Pressing...");
    console.log("Press started");
  }, []);

  const onEnd = useCallback(
    (event: MouseEvent | TouchEvent, isLongPress: boolean) => {
      // We need a way to distinguish click from long press end if hook doesn't provide it.
      // Assuming hook clears timer before onEnd for long press.
      // If it's not a long press, we can perhaps infer it was a click here.
      // This part is tricky without knowing the exact implementation detail
      // or if the hook provides a way to differentiate.
      // Let's manually track clicks for this example.
      if (!isLongPress) {
        if (status === "Pressing...") {
          setStatus("Clicked!");
          setClickCount((prev) => prev + 1);
          console.log("Click event inferred");
        }
      } else {
        // If it was a long press, status is already set by onLongPress
        // We might just reset to Idle here or rely on the useEffect below.
      }
      console.log(`Press ended. Was long press: ${isLongPress}`);
    },
    [status]
  );

  const onCancel = useCallback(() => {
    setStatus("Press Cancelled");
    console.log("Press cancelled");
  }, []);

  useLongPress(buttonRef as React.RefObject<HTMLElement>, onLongPress, {
    threshold: 500,
    onStart: onStart,
    onCancel: onCancel,
  });

  const handleClick = () => {
    if (status !== "Long Press Detected!") {
      setStatus("Clicked!");
      setClickCount((prev) => prev + 1);
      console.log("Manual click handler fired");
    }
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (status !== "Idle" && status !== "Pressing...") {
      timer = setTimeout(() => setStatus("Idle"), 1500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [status]);

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useLongPress Example
      </h2>

      <p className="text-center">Press and hold or click the button below.</p>

      <div className="flex justify-center">
        <button
          ref={buttonRef}
          onClick={handleClick}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 select-none cursor-pointer transition-colors duration-150"
        >
          Press Me (Hold or Click)
        </button>
      </div>

      <div className="mt-4 p-3 border rounded bg-gray-50 text-center">
        <p className="text-lg font-medium">
          Status:{" "}
          <span
            className={`font-bold ${
              status.includes("Long Press")
                ? "text-purple-600"
                : status === "Clicked!"
                ? "text-green-600"
                : "text-gray-700"
            }`}
          >
            {status}
          </span>
        </p>
        <p>Long Presses: {longPressCount}</p>
        <p>Clicks: {clickCount}</p>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        This hook attaches listeners to the referenced element to detect long
        presses. It uses callbacks for different press states.
      </p>
    </div>
  );
};

export default UseLongPressExample;
