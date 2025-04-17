"use client";

import React from "react";
import useMediaQuery from "@/app/hooks/useMediaQuery"; // Adjust import path as needed

const UseMediaQueryExample: React.FC = () => {
  // Example media queries
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width: 601px) and (max-width: 1024px)"
  );
  const isLargeScreen = useMediaQuery("(min-width: 1025px)");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isPortrait = useMediaQuery("(orientation: portrait)");

  return (
    <div className="p-4 border rounded shadow-md max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useMediaQuery Example
      </h2>

      <p className="text-center">
        Resize your browser window or change device orientation/theme settings
        to see the values update.
      </p>

      <div className="p-4 border rounded bg-gray-50 space-y-2">
        <h3 className="text-lg font-medium mb-2">Screen Size Detection:</h3>
        <p>
          Small Screen (&lt;= 600px):{" "}
          <span
            className={`font-bold ${
              isSmallScreen ? "text-green-600" : "text-red-600"
            }`}
          >
            {isSmallScreen ? "Yes" : "No"}
          </span>
        </p>
        <p>
          Medium Screen (601px - 1024px):{" "}
          <span
            className={`font-bold ${
              isMediumScreen ? "text-green-600" : "text-red-600"
            }`}
          >
            {isMediumScreen ? "Yes" : "No"}
          </span>
        </p>
        <p>
          Large Screen (&gt; 1024px):{" "}
          <span
            className={`font-bold ${
              isLargeScreen ? "text-green-600" : "text-red-600"
            }`}
          >
            {isLargeScreen ? "Yes" : "No"}
          </span>
        </p>
      </div>

      <div className="p-4 border rounded bg-gray-50 space-y-2">
        <h3 className="text-lg font-medium mb-2">Other Media Features:</h3>
        <p>
          Prefers Dark Mode:{" "}
          <span
            className={`font-bold ${
              prefersDarkMode ? "text-green-600" : "text-red-600"
            }`}
          >
            {prefersDarkMode ? "Yes" : "No"}
          </span>
        </p>
        <p>
          Portrait Orientation:{" "}
          <span
            className={`font-bold ${
              isPortrait ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPortrait ? "Yes" : "No"}
          </span>
        </p>
      </div>

      {/* Conditional Rendering Example */}
      <div className="p-4 border rounded bg-blue-50">
        <h3 className="text-lg font-medium mb-2">Conditional Rendering:</h3>
        {isSmallScreen && (
          <p className="text-blue-700">
            Showing this message only on small screens!
          </p>
        )}
        {isMediumScreen && (
          <p className="text-blue-700">
            This content is optimized for medium screens.
          </p>
        )}
        {isLargeScreen && (
          <p className="text-blue-700">
            Welcome to the large screen experience!
          </p>
        )}
        {prefersDarkMode && (
          <p className="text-purple-700 mt-2">Dark mode preference detected.</p>
        )}
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        The <code>useMediaQuery</code> hook allows components to reactively
        adapt to changes in the browser's media environment based on CSS media
        query strings.
      </p>
    </div>
  );
};

export default UseMediaQueryExample;
