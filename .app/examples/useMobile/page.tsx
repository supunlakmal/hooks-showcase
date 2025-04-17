"use client";

import React from "react";
import useMobile from "@/app/hooks/use-mobile"; // Adjust import path as needed (matches filename)

const UseMobileExample: React.FC = () => {
  const isMobile = useMobile(); // Default breakpoint might be 768px (check hook implementation if needed)
  // You can also pass a custom breakpoint:
  // const isMobileCustom = useMobile(1024);

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useMobile Example
      </h2>

      <p className="text-center">
        Resize your browser window to see the detection change.
      </p>

      <div className="p-4 border rounded bg-gray-50 text-center">
        <p className="text-lg font-medium">
          Is Mobile Viewport? (based on default breakpoint)
        </p>
        <p
          className={`text-2xl font-bold mt-2 ${
            isMobile ? "text-green-600" : "text-red-600"
          }`}
        >
          {isMobile ? "Yes" : "No"}
        </p>
      </div>

      {/* Example of conditional rendering based on mobile status */}
      <div className="p-4 border rounded bg-blue-50">
        <h3 className="text-lg font-medium mb-2">Conditional Content:</h3>
        {isMobile ? (
          <p className="text-blue-700">
            Showing mobile-specific content or layout.
          </p>
        ) : (
          <p className="text-blue-700">
            Showing desktop/larger screen content.
          </p>
        )}
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        The <code>useMobile</code> hook provides a simple boolean state
        indicating if the current window width is below a specified breakpoint
        (defaults typically around tablet sizes).
      </p>
    </div>
  );
};

export default UseMobileExample;
