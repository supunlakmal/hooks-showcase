"use client";

import React from "react";
import useNetworkSpeed from "@/app/hooks/useNetworkSpeed"; // Adjust import path as needed

const UseNetworkSpeedExample: React.FC = () => {
  // The hook returns the state object directly
  const networkState = useNetworkSpeed();

  // Helper function to format speed (downlink is in Mbps)
  const formatSpeed = (speed?: number): string => {
    if (typeof speed === "undefined") return "N/A";
    if (speed < 1) return `${(speed * 1000).toFixed(2)} Kbps`;
    return `${speed.toFixed(2)} Mbps`;
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useNetworkSpeed Example
      </h2>

      <p className="text-center">
        This hook provides information from the{" "}
        <code className="text-sm">navigator.connection</code> API.
      </p>

      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2 text-center">
          Network Information:
        </h3>
        {!networkState.isSupported ? (
          <p className="text-red-600 text-center">
            Navigator Connection API not supported by this browser.
          </p>
        ) : (
          <div className="space-y-1 text-sm">
            <p>
              Online Status:{" "}
              <span
                className={`font-bold ${
                  navigator.onLine ? "text-green-600" : "text-red-600"
                }`}
              >
                {navigator.onLine ? "Online" : "Offline"}
              </span>
              (from navigator.onLine)
            </p>
            <p>
              Estimated Downlink Speed:{" "}
              <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
                {formatSpeed(networkState.downlink)}
              </span>
            </p>
            <p>
              Max Downlink Speed:{" "}
              <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
                {formatSpeed(networkState.downlinkMax)}
              </span>
            </p>
            <p>
              Effective Connection Type:{" "}
              <span className="font-mono bg-gray-200 px-1 py-0.5 rounded capitalize">
                {networkState.effectiveType || "N/A"}
              </span>
            </p>
            <p>
              Connection Type:{" "}
              <span className="font-mono bg-gray-200 px-1 py-0.5 rounded capitalize">
                {networkState.type || "N/A"}
              </span>
            </p>
            <p>
              Round Trip Time (RTT):{" "}
              <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
                {networkState.rtt ?? "N/A"} ms
              </span>
            </p>
            <p>
              Save Data Enabled:{" "}
              <span
                className={`font-bold ${
                  networkState.saveData ? "text-orange-600" : "text-gray-600"
                }`}
              >
                {networkState.saveData ? "Yes" : "No"}
              </span>
            </p>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        Note: The Network Information API is experimental. Values are estimates
        and support varies across browsers. Check console for updates if
        connection changes.
      </p>
      <p className="text-xs text-gray-600 text-center">
        Browser compatibility:{" "}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/connection#browser_compatibility"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          MDN Docs
        </a>
      </p>
    </div>
  );
};

export default UseNetworkSpeedExample;
