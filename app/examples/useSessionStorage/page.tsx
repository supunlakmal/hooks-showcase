"use client";

import React from "react";
import useSessionStorage from "@/app/hooks/useSessionStorage"; // Adjust import path as needed

const UseSessionStorageExample: React.FC = () => {
  // Example 1: Storing a simple string (e.g., temporary user message)
  const [tempMessage, setTempMessage] = useSessionStorage<string>(
    "tempMessage",
    ""
  );

  // Example 2: Storing a number (e.g., session visit count - basic)
  const [visitCount, setVisitCount] = useSessionStorage<number>(
    "sessionVisitCount",
    0
  );

  // Example 3: Storing an object (e.g., temporary form state)
  interface TempFormData {
    email: string;
    agreedToTerms: boolean;
  }
  const [tempForm, setTempForm] = useSessionStorage<TempFormData>(
    "tempFormData",
    {
      email: "",
      agreedToTerms: false,
    }
  );

  // Increment visit count on component mount (simulated)
  React.useEffect(() => {
    setVisitCount((prevCount) => (prevCount ?? 0) + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once per component mount in the session

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempMessage(event.target.value);
  };

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    const isCheckbox = type === "checkbox";
    // Need type assertion for checked property if using generic ChangeEvent
    const checkedValue = (event.target as HTMLInputElement).checked;

    setTempForm((prev) => ({
      ...prev,
      [name]: isCheckbox ? checkedValue : value,
    }));
  };

  // Function to clear specific session storage items
  const clearSessionData = () => {
    setTempMessage(""); // Reset to default
    // Visit count might not be resettable this way, depends on hook logic
    // setVisitCount(0); // If resetting is desired
    setTempForm({ email: "", agreedToTerms: false }); // Reset to default
    // Use sessionStorage.clear() to clear everything for the domain if needed.
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-lg mx-auto space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useSessionStorage Example
      </h2>

      {/* Visit Count Example */}
      <div className="p-4 border rounded bg-purple-50">
        <h3 className="text-lg font-medium mb-2">Session Visit Count</h3>
        <p className="text-lg mb-2">
          This component has been mounted{" "}
          <span className="font-mono bg-purple-200 px-1 py-0.5 rounded">
            {visitCount}
          </span>{" "}
          times this session.
        </p>
        <p className="text-xs text-gray-500 italic">
          Value persists only until the browser tab/window is closed.
        </p>
      </div>

      {/* Temp Message Example */}
      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Temporary Message (String)</h3>
        <label
          htmlFor="messageInput"
          className="block text-sm font-medium text-gray-700"
        >
          Enter a temporary message:
        </label>
        <input
          id="messageInput"
          type="text"
          value={tempMessage}
          onChange={handleMessageChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
        <p className="mt-2 text-sm">
          Stored Message:{" "}
          <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
            {tempMessage || "Empty"}
          </span>
        </p>
        <p className="text-xs text-gray-500 italic">
          Value persists only for the session.
        </p>
      </div>

      {/* Temp Form Data Example */}
      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">
          Temporary Form State (Object)
        </h3>
        <div className="space-y-2">
          <div>
            <label
              htmlFor="emailInput"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              id="emailInput"
              type="email"
              name="email"
              value={tempForm.email}
              onChange={handleFormChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex items-center">
            <input
              id="termsCheckbox"
              type="checkbox"
              name="agreedToTerms"
              checked={tempForm.agreedToTerms}
              onChange={handleFormChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
            />
            <label htmlFor="termsCheckbox" className="text-sm text-gray-700">
              Agree to temporary terms
            </label>
          </div>
        </div>
        <p className="text-xs text-gray-500 italic mt-2">
          Object state persists only for the session.
        </p>
        <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
          {JSON.stringify(tempForm, null, 2)}
        </pre>
      </div>

      {/* Clear Storage Button */}
      <button
        onClick={clearSessionData}
        className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 mt-4"
      >
        Clear All Stored Session Examples
      </button>

      <p className="text-xs text-gray-600 mt-4 text-center">
        This hook synchronizes state with the browser's sessionStorage. Data is
        cleared when the session ends (e.g., closing the tab/browser).
      </p>
    </div>
  );
};

export default UseSessionStorageExample;
