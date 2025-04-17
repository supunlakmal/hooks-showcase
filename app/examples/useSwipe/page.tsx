"use client";

import React, { useState, useRef, useCallback } from "react";
import useSwipe from "@/app/hooks/useSwipe"; // Adjust import path as needed

const UseSwipeExample: React.FC = () => {
  const swipeTargetRef = useRef<HTMLDivElement>(null);
  const [swipeDirection, setSwipeDirection] = useState<string>("None");
  const [lastEvent, setLastEvent] = useState<string>("None"); // Keep track of last internal event for demo
  const [touchCoords, setTouchCoords] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });

  // Define swipe handlers
  const handleSwipeLeft = useCallback((event: TouchEvent) => {
    setSwipeDirection("Left");
    setLastEvent("Swiped Left");
    console.log("Swiped Left", event);
  }, []);
  const handleSwipeRight = useCallback((event: TouchEvent) => {
    setSwipeDirection("Right");
    setLastEvent("Swiped Right");
    console.log("Swiped Right", event);
  }, []);
  const handleSwipeUp = useCallback((event: TouchEvent) => {
    setSwipeDirection("Up");
    setLastEvent("Swiped Up");
    console.log("Swiped Up", event);
  }, []);
  const handleSwipeDown = useCallback((event: TouchEvent) => {
    setSwipeDirection("Down");
    setLastEvent("Swiped Down");
    console.log("Swiped Down", event);
  }, []);

  // Manual handlers for touch start/end if needed for UI feedback
  // Note: These are separate from the useSwipe hook itself
  const manualTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setLastEvent("Touch Start");
    const touch = event.touches[0];
    setTouchCoords({ x: touch.clientX, y: touch.clientY });
    setSwipeDirection("None"); // Reset direction on new touch
  };
  const manualTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    setLastEvent("Touch End");
    // Swipe direction is set by the hook's callbacks
  };

  // Use the hook with supported options
  useSwipe(swipeTargetRef as React.RefObject<HTMLElement>, {
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    onSwipeUp: handleSwipeUp,
    onSwipeDown: handleSwipeDown,
    threshold: 50, // Optional: Minimum distance in px to trigger a swipe (default 50 in this hook)
    // preventDefault is handled internally by the hook implementation based on passive listeners
  });

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useSwipe Example
      </h2>

      <p className="text-center">
        Try swiping (or dragging with mouse if touch is simulated) on the blue
        area below.
      </p>

      {/* Swipe Target Area - Add manual touch handlers */}
      <div
        ref={swipeTargetRef}
        onTouchStart={manualTouchStart}
        onTouchEnd={manualTouchEnd}
        className="w-full h-48 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-lg cursor-grab select-none touch-none"
        // touch-none prevents default scroll/zoom behavior, rely on hook for swipe detection
      >
        Swipe Here
      </div>

      {/* Status Display */}
      <div className="p-4 border rounded bg-gray-50 text-sm">
        <h3 className="text-lg font-medium mb-2">Swipe Status:</h3>
        <p>
          Last Detected Swipe Direction:{" "}
          <span className="font-bold font-mono px-1 bg-gray-200 rounded">
            {swipeDirection}
          </span>
        </p>
        <p>
          Last Manual Touch Event:{" "}
          <span className="font-mono px-1 bg-gray-200 rounded">
            {lastEvent}
          </span>
        </p>
        <p>
          Touch Start Coords:{" "}
          <span className="font-mono px-1 bg-gray-200 rounded">
            X: {touchCoords.x?.toFixed(0) ?? "N/A"}, Y:{" "}
            {touchCoords.y?.toFixed(0) ?? "N/A"}
          </span>
        </p>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        The <code>useSwipe</code> hook detects swipe gestures on a target
        element and triggers corresponding callbacks (Left, Right, Up, Down).
      </p>
    </div>
  );
};

export default UseSwipeExample;
