"use client";

import React, { useRef, useState } from "react";
import useVisibility from "@/app/hooks/useVisibility"; // Adjust import path as needed

const UseVisibilityExample: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  // Use the hook, passing the ref and IntersectionObserver options
  const isVisible = useVisibility(targetRef as React.RefObject<Element>, {
    threshold: 0.1, // Trigger when 10% of the element is visible
    // root: null, // Use viewport as root (default)
    // rootMargin: '0px', // No margin (default)
    initialIsVisible: false, // Assume not visible initially
    // disconnectOnVisible: false, // Keep observing (default)
  });

  // Log changes for demonstration (optional)
  React.useEffect(() => {
    console.log(
      `Element visibility changed: ${isVisible ? "Visible" : "Not Visible"}`
    );
  }, [isVisible]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useVisibility Example
      </h2>

      <p className="text-center max-w-lg mx-auto">
        This hook uses the Intersection Observer API to detect when an element
        enters or leaves the viewport (or its root container). Scroll down to
        bring the target element into view.
      </p>

      {/* Placeholder content to create scroll space */}
      <div className="h-[80vh] bg-gray-100 flex items-center justify-center border-y">
        <p className="text-gray-500">Scroll Down...</p>
      </div>

      {/* Target Element to Observe */}
      <div
        ref={targetRef}
        className={`p-6 border-4 rounded transition-all duration-500 ease-in-out transform ${
          isVisible
            ? "border-green-500 bg-green-50 scale-100 opacity-100"
            : "border-red-500 bg-red-50 scale-90 opacity-50"
        }`}
      >
        <h3 className="text-lg font-medium mb-2 text-center">Target Element</h3>
        <p className="text-center">Am I visible?</p>
      </div>

      {/* Status Display */}
      <div className="p-4 border rounded shadow-md max-w-md mx-auto sticky bottom-4 bg-white/80 backdrop-blur-sm z-10">
        <h3 className="text-lg font-medium mb-2">
          Visibility Status (from hook):
        </h3>
        <p
          className={`font-bold text-center text-xl ${
            isVisible ? "text-green-600" : "text-red-600"
          }`}
        >
          {isVisible ? "Visible" : "Not Visible"}
        </p>
        {/* Error handling would need to be added separately if needed, 
            e.g., checking for IntersectionObserver support outside the hook */}
      </div>

      {/* More placeholder content */}
      <div className="h-[80vh] bg-gray-100 flex items-center justify-center border-y">
        <p className="text-gray-500">More scroll space...</p>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        The <code>useVisibility</code> hook returns a boolean indicating element
        visibility based on Intersection Observer options.
      </p>
      <p className="text-xs text-gray-600 text-center">
        Browser compatibility:{" "}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#browser_compatibility"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          MDN Docs
        </a>
        .
      </p>
    </div>
  );
};

export default UseVisibilityExample;
