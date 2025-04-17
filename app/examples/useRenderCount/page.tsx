"use client";

import React, { useState, useEffect } from "react";
import useRenderCount from "@/app/hooks/useRenderCount"; // Adjust import path as needed

const ChildComponent: React.FC<{ triggerRender: number }> = ({
  triggerRender,
}) => {
  const renderCount = useRenderCount();

  // Effect to show dependency causing re-render
  useEffect(() => {
    console.log(
      `ChildComponent re-rendered due to triggerRender: ${triggerRender}`
    );
  }, [triggerRender]);

  return (
    <div className="p-3 border rounded bg-blue-100 border-blue-300 mt-2">
      <p className="font-medium text-blue-800">Child Component</p>
      <p className="text-sm text-blue-700">
        Render Count: <span className="font-bold">{renderCount}</span>
      </p>
      <p className="text-xs text-blue-600">
        Prop 'triggerRender': {triggerRender}
      </p>
    </div>
  );
};

const UseRenderCountExample: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [childTrigger, setChildTrigger] = useState<number>(0);
  const renderCount = useRenderCount(); // Track renders of the parent component

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useRenderCount Example
      </h2>

      <p className="text-center">
        This hook returns the number of times a component has rendered.
      </p>

      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Parent Component</h3>
        <p className="text-center text-2xl font-bold mb-2">
          Render Count: {renderCount}
        </p>
        <div className="text-center mb-2">
          <p>State 'count': {count}</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setCount((c) => c + 1)} // This will re-render the parent
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Increment Parent State (causes parent render)
          </button>
        </div>
      </div>

      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Child Component Control</h3>
        <div className="flex justify-center">
          <button
            onClick={() => setChildTrigger((t) => t + 1)} // This will re-render parent *and* child
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Update Child Prop (causes parent & child render)
          </button>
        </div>
        <ChildComponent triggerRender={childTrigger} />
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        Updating state in the parent re-renders the parent. Passing new props to
        the child re-renders both (unless memoized).
      </p>
    </div>
  );
};

export default UseRenderCountExample;
