"use client";

import React from "react";
import useLocalStorage from "@/app/hooks/useLocalStorage"; // Adjust import path as needed

const UseLocalStorageExample: React.FC = () => {
  // Example 1: Storing a simple string (e.g., username)
  const [username, setUsername] = useLocalStorage<string>("username", "Guest");

  // Example 2: Storing a number (e.g., counter)
  const [count, setCount] = useLocalStorage<number>("counter", 0);

  // Example 3: Storing an object (e.g., user preferences)
  interface Preferences {
    theme: "light" | "dark";
    notificationsEnabled: boolean;
  }
  const [preferences, setPreferences] = useLocalStorage<Preferences>(
    "userPreferences",
    {
      theme: "light",
      notificationsEnabled: true,
    }
  );

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const toggleTheme = () => {
    setPreferences((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  const toggleNotifications = () => {
    setPreferences((prev) => ({
      ...prev,
      notificationsEnabled: !prev.notificationsEnabled,
    }));
  };

  // Function to clear specific local storage items
  const clearStorage = () => {
    setUsername("Guest"); // Reset to default
    setCount(0); // Reset to default
    setPreferences({ theme: "light", notificationsEnabled: true }); // Reset to default
    // Note: You might need to manually remove keys if the hook doesn't handle removal on default set
    // Alternatively, use localStorage.removeItem('key') directly if needed.
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-lg mx-auto space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useLocalStorage Example
      </h2>

      {/* Username Example */}
      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Username (String)</h3>
        <label
          htmlFor="usernameInput"
          className="block text-sm font-medium text-gray-700"
        >
          Edit Username:
        </label>
        <input
          id="usernameInput"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
        <p className="mt-2 text-sm">
          Stored Username:{" "}
          <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
            {username}
          </span>
        </p>
        <p className="text-xs text-gray-500 italic">
          Value persists across page reloads.
        </p>
      </div>

      {/* Counter Example */}
      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Counter (Number)</h3>
        <p className="text-lg mb-2">
          Count:{" "}
          <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
            {count}
          </span>
        </p>
        <button
          onClick={incrementCount}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment Count
        </button>
        <p className="text-xs text-gray-500 italic mt-2">
          Value persists across page reloads.
        </p>
      </div>

      {/* Preferences Example */}
      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Preferences (Object)</h3>
        <p>
          Current Theme:{" "}
          <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
            {preferences.theme}
          </span>
        </p>
        <p>
          Notifications:{" "}
          <span
            className={`font-mono px-1 py-0.5 rounded ${
              preferences.notificationsEnabled
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {preferences.notificationsEnabled ? "Enabled" : "Disabled"}
          </span>
        </p>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Toggle Theme
          </button>
          <button
            onClick={toggleNotifications}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Toggle Notifications
          </button>
        </div>
        <p className="text-xs text-gray-500 italic mt-2">
          Object state persists across page reloads.
        </p>
      </div>

      {/* Clear Storage Button */}
      <button
        onClick={clearStorage}
        className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4"
      >
        Clear All Stored Examples
      </button>

      <p className="text-xs text-gray-600 mt-4 text-center">
        This hook synchronizes state with the browser's localStorage. Try
        modifying the values and reloading the page.
      </p>
    </div>
  );
};

export default UseLocalStorageExample;
