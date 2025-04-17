"use client";

import React, { useReducer } from "react";
import useReducerLogger from "@/app/hooks/useReducerLogger"; // Adjust import path as needed

// ... (Reducer setup remains the same)
interface CounterState {
  count: number;
}
type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET"; payload: number };
const initialState: CounterState = { count: 0 };
function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "SET":
      return { count: action.payload };
    default:
      throw new Error("Unhandled action type");
  }
}

const UseReducerLoggerExample: React.FC = () => {
  // Use the logger hook *instead* of useReducer
  const [state, dispatch] = useReducerLogger(
    counterReducer,
    initialState,
    undefined, // No initializer function needed here
    "CounterReducer" // Optional name for logs
  );

  const handleSet = () => {
    const value = prompt("Enter new count:", "0");
    if (value !== null) {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue)) {
        dispatch({ type: "SET", payload: numValue });
      }
    }
  };

  // ... (JSX remains the same)
  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useReducerLogger Example
      </h2>

      <p className="text-center">
        Check the browser console to see logs for each dispatched action and
        state change.
      </p>

      <div className="p-4 border rounded bg-gray-50 text-center">
        <h3 className="text-lg font-medium mb-2">Counter State:</h3>
        <p className="text-4xl font-bold mb-4">{state.count}</p>

        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => dispatch({ type: "INCREMENT" })}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Increment
          </button>
          <button
            onClick={() => dispatch({ type: "DECREMENT" })}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Decrement
          </button>
          <button
            onClick={handleSet}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Set Value
          </button>
          <button
            onClick={() => dispatch({ type: "SET", payload: 0 })} // Reset example
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset (Set to 0)
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        The <code>useReducerLogger</code> hook acts as a drop-in replacement for{" "}
        <code>useReducer</code>, automatically logging actions and state changes
        during development.
      </p>
    </div>
  );
};

export default UseReducerLoggerExample;
