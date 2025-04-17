"use client";

import React, { useState } from "react";
import useMap from "@/app/hooks/useMap"; // Adjust import path as needed

const UseMapExample: React.FC = () => {
  const [map, actions] = useMap<string, number>([
    ["apples", 5],
    ["bananas", 3],
  ]);

  const { set, remove, clear, reset, get } = actions;

  const [keyInput, setKeyInput] = useState<string>("");
  const [valueInput, setValueInput] = useState<string>("");
  const [removeKeyInput, setRemoveKeyInput] = useState<string>("");

  const handleAddOrUpdate = () => {
    const value = parseInt(valueInput, 10);
    if (keyInput && !isNaN(value)) {
      set(keyInput, value);
      setKeyInput("");
      setValueInput("");
    } else {
      alert("Please enter a valid key (string) and value (number).");
    }
  };

  const handleRemove = () => {
    if (removeKeyInput) {
      remove(removeKeyInput);
      setRemoveKeyInput("");
    } else {
      alert("Please enter a key to remove.");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-lg mx-auto space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-center">useMap Example</h2>

      {/* Display Map Contents */}
      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Current Map Contents:</h3>
        {map.size === 0 ? (
          <p className="text-gray-500 italic">Map is empty.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {[...map.entries()].map(([key, value]) => (
              <li key={key}>
                <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
                  {key}
                </span>
                : {value}
              </li>
            ))}
          </ul>
        )}
        <p className="text-sm mt-2">
          Value for 'apples': {get("apples") ?? "Not found"}
        </p>
      </div>

      {/* Add/Update Item */}
      <div className="p-4 border rounded">
        <h3 className="text-lg font-medium mb-2">Add / Update Item</h3>
        <div className="flex flex-col sm:flex-row gap-2 mb-2">
          <input
            type="text"
            placeholder="Key (e.g., oranges)"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            className="p-2 border border-gray-300 rounded flex-grow"
          />
          <input
            type="number"
            placeholder="Value (e.g., 10)"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            className="p-2 border border-gray-300 rounded flex-grow"
          />
        </div>
        <button
          onClick={handleAddOrUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full sm:w-auto"
        >
          Set Key/Value
        </button>
      </div>

      {/* Remove Item */}
      <div className="p-4 border rounded">
        <h3 className="text-lg font-medium mb-2">Remove Item</h3>
        <div className="flex flex-col sm:flex-row gap-2 mb-2">
          <input
            type="text"
            placeholder="Key to remove"
            value={removeKeyInput}
            onChange={(e) => setRemoveKeyInput(e.target.value)}
            className="p-2 border border-gray-300 rounded flex-grow"
          />
          <button
            onClick={handleRemove}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full sm:w-auto"
          >
            Remove Key
          </button>
        </div>
      </div>

      {/* Other Controls */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={clear}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Clear Map
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Reset to Initial
        </button>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        This hook provides a convenient way to manage Map state in React,
        offering actions like set, remove, clear, and reset.
      </p>
    </div>
  );
};

export default UseMapExample;
