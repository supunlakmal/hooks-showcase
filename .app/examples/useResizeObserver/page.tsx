"use client";

import React, { useState, useRef, useEffect } from "react";
import useResizeObserver from "@/app/hooks/useResizeObserver"; // Adjust import path as needed

const UseResizeObserverExample: React.FC = () => {
  const targetRef = useRef<HTMLTextAreaElement>(null);
  const [dimensions, setDimensions] = useState<{
    width?: number;
    height?: number;
  }>({});
  const [error, setError] = useState<string | null>(null);

  // Use the hook, passing the ref with type assertion
  const resizeEntry = useResizeObserver(targetRef as React.RefObject<Element>);

  // Use useEffect to react to changes in the resizeEntry
  useEffect(() => {
    if (resizeEntry) {
      // Check if the browser supports contentRect (most modern browsers do)
      if (resizeEntry.contentRect) {
        setDimensions({
          width: resizeEntry.contentRect.width,
          height: resizeEntry.contentRect.height,
        });
        setError(null); // Clear error on successful update
        console.log("Target element resized:", resizeEntry.contentRect);
      } else {
        // Fallback or error if contentRect is not available
        setError("ResizeObserverEntry.contentRect not available.");
        console.warn("ResizeObserverEntry.contentRect not available.");
      }
    } else {
      // Optional: Handle the initial null state if needed
      // setDimensions({}); // Reset dimensions if entry becomes null (e.g., unmount)
    }
    // NOTE: ResizeObserver itself has error handling mechanisms, but this hook design
    // doesn't directly expose them. Errors typically manifest as the observer stopping.
  }, [resizeEntry]); // Re-run effect when the entry changes

  return (
    <div className="p-4 border rounded shadow-md max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useResizeObserver Example
      </h2>

      <p className="text-center">
        Resize the text area below (e.g., by dragging its corner if your browser
        supports it) to see its dimensions update.
      </p>

      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Observed Element:</h3>
        <textarea
          ref={targetRef}
          className="w-full h-24 p-2 border border-blue-400 rounded resize overflow-auto"
          placeholder="Try resizing this textarea..."
          defaultValue="Resize me..."
        />
      </div>

      <div className="p-4 border rounded bg-green-50">
        <h3 className="text-lg font-medium mb-2 text-green-800">
          Observed Dimensions:
        </h3>
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : dimensions.width !== undefined &&
          dimensions.height !== undefined ? (
          <p>
            Width:{" "}
            <span className="font-mono bg-green-200 px-1 py-0.5 rounded">
              {dimensions.width.toFixed(2)}px
            </span>
            , Height:{" "}
            <span className="font-mono bg-green-200 px-1 py-0.5 rounded">
              {dimensions.height.toFixed(2)}px
            </span>
          </p>
        ) : (
          <p className="text-gray-500 italic">
            Observing... Try resizing the element.
          </p>
        )}
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        The <code>useResizeObserver</code> hook returns the latest{" "}
        <code>ResizeObserverEntry</code> for the target element. Use{" "}
        <code>useEffect</code> to react to changes in the entry.
      </p>
      <p className="text-xs text-gray-600 text-center">
        Browser compatibility:{" "}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver#browser_compatibility"
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

export default UseResizeObserverExample;
