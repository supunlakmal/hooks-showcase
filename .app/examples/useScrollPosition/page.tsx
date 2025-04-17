"use client";

import React, { useState, useRef, useEffect } from "react";
import useScrollPosition from "@/app/hooks/useScrollPosition"; // Adjust import path as needed

const UseScrollPositionExample: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Option 1: Track window scroll position
  const windowScrollPos = useScrollPosition(); // No args means track window

  // Option 2: Track scroll position of a specific element (with type assertion)
  const elementScrollPos = useScrollPosition(
    scrollContainerRef as React.RefObject<Element>
  );

  // ... (rest of the component remains the same) ...
  // State to show effects
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Effect based on window scroll
  useEffect(() => {
    // Show button when scrolled down 200px
    setShowScrollToTop(windowScrollPos.y > 200);
  }, [windowScrollPos]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useScrollPosition Example
      </h2>

      {/* Window Scroll Info */}
      <div className="p-4 border rounded shadow-md max-w-md mx-auto sticky top-4 bg-white/80 backdrop-blur-sm z-10">
        <h3 className="text-lg font-medium mb-2">Window Scroll Position:</h3>
        <p>
          X:{" "}
          <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
            {windowScrollPos.x.toFixed(0)}px
          </span>
        </p>
        <p>
          Y:{" "}
          <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
            {windowScrollPos.y.toFixed(0)}px
          </span>
        </p>
      </div>

      {/* Element Scroll Info */}
      <div className="p-4 border rounded shadow-md max-w-lg mx-auto space-y-4">
        <h3 className="text-lg font-medium mb-2">Element Scroll Position:</h3>
        <div
          ref={scrollContainerRef}
          className="w-full h-48 overflow-auto border border-blue-400 rounded bg-blue-50 p-2"
        >
          <p className="mb-2 text-sm">Scroll this container:</p>
          <div className="h-96 bg-gradient-to-b from-blue-200 to-blue-400 rounded flex items-center justify-center text-white font-bold">
            Tall Content
          </div>
          <p className="mt-2 text-sm">More content below...</p>
        </div>
        <p className="mt-2">
          Element X:{" "}
          <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
            {elementScrollPos.x.toFixed(0)}px
          </span>
        </p>
        <p>
          Element Y:{" "}
          <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
            {elementScrollPos.y.toFixed(0)}px
          </span>
        </p>
      </div>

      {/* Example effect button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 px-4 py-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 z-20"
          aria-label="Scroll to top"
        >
          ↑ Top
        </button>
      )}

      {/* Placeholder content to make window scrollable */}
      <div className="h-[150vh] bg-gray-100 border-t border-gray-300 pt-4">
        <p className="text-center text-gray-500">Scroll down the page...</p>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        The <code>useScrollPosition</code> hook tracks scroll coordinates,
        either for the window or a specific scrollable element ref.
      </p>
    </div>
  );
};

export default UseScrollPositionExample;
