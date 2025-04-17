"use client";

import React, { useState } from "react";
import useStateWithHistory from "@/app/hooks/useStateWithHistory"; // Adjust import path as needed

const UseStateWithHistoryExample: React.FC = () => {
  const {
    state,
    setState,
    history,
    pointer,
    back,
    forward,
    go,
    canUndo,
    canRedo,
  } = useStateWithHistory<string>("Initial State", 5); // Pass capacity directly

  const [inputValue, setInputValue] = useState<string>("");

  const handleSet = () => {
    if (inputValue) {
      setState(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-lg mx-auto space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useStateWithHistory Example
      </h2>

      {/* Current Value */}
      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Current Value:</h3>
        <p className="text-2xl font-mono bg-gray-200 px-2 py-1 rounded text-center">
          {state}
        </p>
      </div>

      {/* Set New Value */}
      <div className="p-4 border rounded">
        <h3 className="text-lg font-medium mb-2">Set New Value</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Enter new state value..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="p-2 border border-gray-300 rounded flex-grow"
          />
          <button
            onClick={handleSet}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Set Value
          </button>
        </div>
      </div>

      {/* History Controls */}
      <div className="p-4 border rounded bg-indigo-50">
        <h3 className="text-lg font-medium mb-2 text-indigo-800">
          History Controls:
        </h3>
        <div className="flex justify-center items-center gap-4 mb-3">
          <button
            onClick={back}
            disabled={!canUndo}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            &laquo; Back (Undo)
          </button>
          <span className="text-sm text-gray-700">
            History Pointer: {pointer}
          </span>
          <button
            onClick={forward}
            disabled={!canRedo}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            Forward (Redo) &raquo;
          </button>
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className="text-sm">Go to index:</span>
          <input
            type="number"
            min="0"
            max={history.length - 1}
            onChange={(e) => go(Number(e.target.value))}
            className="p-1 border border-gray-300 rounded w-16 text-center"
            value={pointer}
          />
        </div>
      </div>

      {/* History Display */}
      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">History (Capacity: 5):</h3>
        <div className="space-y-1 max-h-32 overflow-y-auto text-sm border p-2 rounded bg-white">
          {history.map((item: string, index: number) => (
            <p
              key={index}
              className={`font-mono px-1 rounded ${
                index === pointer ? "bg-yellow-200 font-bold" : "bg-gray-100"
              }`}
            >
              {index}: {JSON.stringify(item)}
            </p>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        This hook enhances <code>useState</code> by maintaining a history of
        state changes, allowing undo/redo functionality.
      </p>
    </div>
  );
};

export default UseStateWithHistoryExample;
