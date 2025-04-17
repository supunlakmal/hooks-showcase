"use client";

import React, { useRef } from "react";
import useVirtualList from "@/app/hooks/useVirtualList"; // Adjusted import path
// import { HookDocumentation } from "@/components/hook-documentation";
// import { CodeBlock } from "@/components/code-block";
// import useVirtualListDoc from "@/docs/useVirtualList.md";

// Generate a large list of items
const allItems = Array.from({ length: 10000 }, (_, index) => ({
  id: index,
  text: `Item ${index + 1}`,
}));

const ITEM_HEIGHT = 35; // Each item will be 35px tall

const UseVirtualListExample: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    virtualItems, // The items to render
    totalHeight, // Total scrollable height
    innerRef, // Ref for the inner container element
  } = useVirtualList({
    list: allItems,
    itemHeight: ITEM_HEIGHT,
    containerRef: containerRef,
    overscan: 10, // Render 10 extra items above/below viewport
  });

  const containerStyle: React.CSSProperties = {
    height: "500px", // Height of the scrollable viewport
    width: "400px",
    maxWidth: "100%",
    overflowY: "auto",
    border: "1px solid #ccc",
    position: "relative", // Needed for positioning context of innerRef
    margin: "0 auto", // Center the container
  };

  // Style for each absolutely positioned virtual item
  const itemStyleBase: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    height: `${ITEM_HEIGHT}px`,
    display: "flex",
    alignItems: "center",
    paddingLeft: "15px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
  };

  // NOTE: The example code block generation is commented out as the CodeBlock component seems unavailable.
  // const exampleCode = `...`;

  return (
    // <HookDocumentation markdownContent={useVirtualListDoc}>
    <div>
      <h2 className="text-xl font-semibold mb-2">
        Virtual List Example (10,000 Items)
      </h2>
      <p className="text-sm mb-4">
        Scroll down the list below. Although there are 10,000 items in the data
        source, only a small subset is rendered in the DOM at any time. Open
        your browser's developer tools and inspect the elements inside the
        scrollable container to verify.
      </p>

      <div ref={containerRef} style={containerStyle}>
        {/* The inner div holds the total height and acts as positioning context */}
        <div ref={innerRef}>
          {virtualItems.map((virtualItem) => (
            <div
              key={virtualItem.index} // Use index as key for virtual items
              style={{
                ...itemStyleBase,
                top: `${virtualItem.offsetTop}px`, // Position item correctly
                // Alternate background for visibility
                backgroundColor:
                  virtualItem.index % 2 === 0 ? "#f9f9f9" : "white",
              }}
            >
              #{virtualItem.index + 1}: {virtualItem.data.text}
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-sm mt-2">
        Total theoretical list height:{" "}
        <code className="bg-gray-200 px-1 rounded">{totalHeight}px</code>
      </p>

      {/* <CodeBlock code={exampleCode} language="tsx" title="Example Usage Code"/> */}
      {/* </HookDocumentation> */}
    </div>
  );
};

export default UseVirtualListExample;
