"use client";

import React, { useState, useEffect } from "react";
import useIsFirstRender from "@/app/hooks/useIsFirstRender"; // Adjust the import path
// import { HookDocumentation } from "@/components/hook-documentation";
// import { CodeBlock } from "@/components/code-block";
// import useIsFirstRenderDoc from "@/docs/useIsFirstRender.md";

const UseIsFirstRenderExample: React.FC = () => {
  const isFirstRender = useIsFirstRender();
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Example: Log only on the first render
    if (isFirstRender) {
      console.log(
        "useIsFirstRender Example: Component mounted (first render)!"
      );
      // You could perform initial setup, data fetching etc. here
    } else {
      console.log("useIsFirstRender Example: Component re-rendered.");
    }
    // Note: Depending on your ESLint rules, you might need to include isFirstRender
    // in the dependency array, although its value effectively changes only once.
  }, [isFirstRender]);

  const handleRerender = () => {
    setCount((c) => c + 1);
  };

  const exampleCode = `
  import React, { useState, useEffect } from "react";
  import useIsFirstRender from "@/app/hooks/useIsFirstRender";

  function MyComponent() {
    const isFirstRender = useIsFirstRender();
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (isFirstRender) {
        console.log("Component rendered for the first time!");
        // Perform initial setup or data fetching here
      } else {
        console.log("Component re-rendered.");
      }
    }, [isFirstRender]);

    return (
        <div>
            <p>{isFirstRender ? "First Render!" : "Subsequent Render."}</p>
            <button onClick={() => setCount(c => c + 1)}>Force Re-render</button>
        </div>
    );
  }
  `;

  return (
    // <HookDocumentation markdownContent={useIsFirstRenderDoc}>
    <div>
      <h2 className="text-xl font-semibold mb-4">useIsFirstRender Example</h2>
      <div className="border p-4 rounded space-y-3">
        <p className="text-lg">
          Component Render Status:
          <span
            className={`font-bold ${
              isFirstRender ? "text-green-600" : "text-orange-600"
            }`}
          >
            {isFirstRender
              ? " This is the First Render"
              : " This is a Subsequent Render"}
          </span>
        </p>
        <p className="text-sm">
          Check the browser console. A message is logged indicating whether it's
          the first render or a re-render.
        </p>
        <button
          onClick={handleRerender}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Force Re-render (Current Count: {count})
        </button>
      </div>

      {/* <CodeBlock code={exampleCode} language="tsx" title="Example Usage Code" /> */}
      {/* </HookDocumentation> */}
    </div>
  );
};

export default UseIsFirstRenderExample;
