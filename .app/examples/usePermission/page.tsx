"use client";

import React from "react";
import usePermission from "@/app/hooks/usePermission"; // Adjust import path as needed

const PermissionStatus: React.FC<{ permissionName: string }> = ({
  permissionName,
}) => {
  const { state, isSupported, query } = usePermission({
    name: permissionName as PermissionName,
  });

  let statusMessage = "Querying...";
  if (!isSupported) {
    statusMessage = "Permissions API not supported.";
  } else {
    switch (state) {
      case "granted":
        statusMessage = "Permission Granted ✅";
        break;
      case "prompt":
        statusMessage = "Permission Not Requested (Prompt) 🤔";
        break;
      case "denied":
        statusMessage = "Permission Denied 🚫";
        break;
      case "querying":
        statusMessage = "Querying permission status...";
        break;
      case "unsupported":
        statusMessage = "Permission or API not supported.";
        break;
    }
  }

  return (
    <li className="mb-4">
      <strong>{permissionName}:</strong> {statusMessage}
      {isSupported && state !== "querying" && (
        <button
          onClick={query}
          className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Re-Query
        </button>
      )}
    </li>
  );
};

const UsePermissionExample: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">usePermission Example</h2>
      <p className="text-sm mb-4">
        Checking status for various permissions using the Permissions API.
      </p>

      <ul className="space-y-2">
        {/* Standard permissions */}
        <PermissionStatus permissionName="geolocation" />
        <PermissionStatus permissionName="notifications" />
        <PermissionStatus permissionName="camera" />
        <PermissionStatus permissionName="microphone" />
        {/* Example of a potentially unsupported/non-standard permission */}
        <PermissionStatus permissionName="accelerometer" />
        <PermissionStatus permissionName="clipboard-read" />
        <PermissionStatus permissionName="clipboard-write" />
      </ul>

      <p className="text-xs mt-4">
        <em>
          (Note: Actual status depends on your browser and previous
          interactions.)
        </em>
      </p>
    </div>
  );
};

export default UsePermissionExample;
