"use client";

import React, { useState, useEffect } from "react";
import useScrollPosition from "@/app/hooks/useScrollPosition"; // Using this to know *when* to show the button
import useScrollToTop from "@/app/hooks/useScrollToTop"; // The hook we are demonstrating

const UseScrollToTopExample: React.FC = () => {
  // Get window scroll position to decide when to show the button
  const { y: scrollY } = useScrollPosition();
  const [showButton, setShowButton] = useState(false);

  // Get the function to scroll to top from the hook
  // Pass options object for smooth scrolling
  const scrollToTop = useScrollToTop({ behavior: "smooth" });

  // Show button when scrolled down a certain amount
  useEffect(() => {
    setShowButton(scrollY > 300); // Show after scrolling 300px
  }, [scrollY]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useScrollToTop Example
      </h2>

      <p className="text-center max-w-lg mx-auto">
        This hook provides a simple function to smoothly scroll the window back
        to the top (or a specified position). Scroll down the page to reveal the
        'Scroll to Top' button.
      </p>

      {/* Placeholder content to make window scrollable */}
      <div className="h-[200vh] bg-gradient-to-b from-gray-100 to-gray-300 border-y border-gray-300 pt-10">
        <p className="text-center text-gray-500">Scroll down...</p>
        <p className="text-center text-gray-500 mt-96">Further down...</p>
        <p className="text-center text-gray-500 mt-96">Almost there...</p>
      </div>

      {/* Conditionally render the button */}
      {showButton && (
        <button
          onClick={scrollToTop} // Call the function returned by the hook
          className="fixed bottom-10 right-10 px-5 py-3 bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-700 transition duration-150 ease-in-out z-20 animate-bounce" // Added bounce for visibility
          aria-label="Scroll to top"
          title="Scroll to Top"
        >
          &uarr; Top {/* Using HTML entity for up arrow */}
        </button>
      )}

      <p className="text-xs text-gray-600 mt-4 text-center">
        The button appears when scrollY {">"} 300px. Clicking it uses the
        function returned by{" "}
        <code>useScrollToTop(&#123; behavior: 'smooth' &#125;)</code>.
      </p>
    </div>
  );
};

export default UseScrollToTopExample;
