"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import useRouteChange from "@/app/hooks/useRouteChange"; // Adjust import path as needed
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

// Component that uses the hook
const RouteChangeDetector: React.FC = () => {
  const [changeCount, setChangeCount] = useState<number>(0);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  // Get current path and search params from Next.js hooks
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Update displayed URL whenever Next.js detects a change
  useEffect(() => {
    setCurrentUrl(`${pathname}?${searchParams.toString()}`);
  }, [pathname, searchParams]);

  // Define the callback for the useRouteChange hook
  const handleRouteChange = useCallback(() => {
    console.log("Route change detected by useRouteChange!");
    // Increment count
    setChangeCount((prev) => prev + 1);
    // Update URL display based on current location (might lag slightly behind actual change)
    setCurrentUrl(window.location.href);
  }, []);

  // Use the hook with the single callback
  useRouteChange(handleRouteChange);

  return (
    <div className="p-4 border rounded shadow-md max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useRouteChange Example
      </h2>

      <p className="text-center">
        Navigate between the links below. The hook detects changes via history
        API patching and popstate.
      </p>

      <div className="flex justify-center space-x-4 mb-4">
        {/* Use standard Link components for navigation */}
        <Link
          href="/examples/useRouteChange?section=home"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Home
        </Link>
        <Link
          href="/examples/useRouteChange?section=about"
          className="text-blue-600 underline hover:text-blue-800"
        >
          About
        </Link>
        <Link
          href="/examples/useRouteChange?section=contact"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Contact
        </Link>
      </div>

      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Detection Status:</h3>
        <p>
          Route Changes Detected:{" "}
          <span className="font-bold text-xl">{changeCount}</span>
        </p>
        <p className="text-sm mt-1">
          Current URL (reported by effect/callback):
        </p>
        <code className="block text-xs bg-gray-200 p-1 rounded break-all">
          {currentUrl || "Loading..."}
        </code>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        The <code>useRouteChange</code> hook takes a single callback executed on
        detected route changes. It doesn't provide specific start/end URLs.
      </p>
      <p className="text-xs text-orange-600 mt-1 text-center">
        Note: Patching browser history methods might have side effects or
        conflicts with framework routing (like Next.js App Router).
      </p>
    </div>
  );
};

// Wrap in Suspense as usePathname/useSearchParams require it
const UseRouteChangeExample: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading Navigation...</div>}>
      <RouteChangeDetector />
    </Suspense>
  );
};

export default UseRouteChangeExample;
