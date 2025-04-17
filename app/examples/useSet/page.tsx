"use client";

import React, { useState } from "react";
import useSet from "@/app/hooks/useSet"; // Adjust import path as needed

const UseSetExample: React.FC = () => {
  const [set, { add, remove, clear, reset, has, toggle }] = useSet<string>(
    new Set(["apple", "banana"])
  );

  const [addInput, setAddInput] = useState<string>("");
  const [toggleInput, setToggleInput] = useState<string>("");
  const [hasInput, setHasInput] = useState<string>("");

  const handleAdd = () => {
    if (addInput) {
      add(addInput);
      setAddInput("");
    } else {
      alert("Please enter an item to add.");
    }
  };

  const handleToggle = () => {
    if (toggleInput) {
      toggle(toggleInput);
      setToggleInput("");
    } else {
      alert("Please enter an item to toggle.");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-lg mx-auto space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-center">useSet Example</h2>

      {/* Display Set Contents */}
      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Current Set Contents:</h3>
        {set.size === 0 ? (
          <p className="text-gray-500 italic">Set is empty.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {[...set].map((item) => (
              <span
                key={item}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded border border-blue-400"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Add Item */}
      <div className="p-4 border rounded">
        <h3 className="text-lg font-medium mb-2">Add Item</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Item to add (e.g., cherry)"
            value={addInput}
            onChange={(e) => setAddInput(e.target.value)}
            className="p-2 border border-gray-300 rounded flex-grow"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* Toggle Item */}
      <div className="p-4 border rounded">
        <h3 className="text-lg font-medium mb-2">Toggle Item</h3>
        <p className="text-xs mb-1 text-gray-600">
          Adds the item if not present, removes it if present.
        </p>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Item to toggle (e.g., apple)"
            value={toggleInput}
            onChange={(e) => setToggleInput(e.target.value)}
            className="p-2 border border-gray-300 rounded flex-grow"
          />
          <button
            onClick={handleToggle}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Toggle
          </button>
        </div>
      </div>

      {/* Check Item */}
      <div className="p-4 border rounded">
        <h3 className="text-lg font-medium mb-2">Check if Item Exists</h3>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Item to check (e.g., banana)"
            value={hasInput}
            onChange={(e) => setHasInput(e.target.value)}
            className="p-2 border border-gray-300 rounded flex-grow"
          />
          <span
            className={`font-bold px-2 py-1 rounded ${
              hasInput && has(hasInput)
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }"`}
          >
            {hasInput
              ? has(hasInput)
                ? "Exists"
                : "Does not exist"
              : "Check..."}
          </span>
        </div>
      </div>

      {/* Other Controls */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => remove("banana")} // Example: Remove 'banana' if it exists
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove 'banana'
        </button>
        <button
          onClick={clear}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Clear Set
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Reset to Initial
        </button>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        This hook provides a convenient way to manage Set state in React,
        offering actions like add, remove, toggle, clear, and reset.
      </p>
    </div>
  );
};

export default UseSetExample;
