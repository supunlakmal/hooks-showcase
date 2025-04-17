"use client";

import React, { useRef, useState } from "react";
import useDrag from "@/app/hooks/useDrag"; // Adjust import path
// import { HookDocumentation } from "@/components/hook-documentation";
// import { CodeBlock } from "@/components/code-block";
// import useDragDoc from "@/docs/useDrag.md";

// --- Draggable Item Component using the hook ---
interface DraggableItemProps {
  id: string;
  label: string;
  color: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, label, color }) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const { isDragging } = useDrag(
    dragRef as React.RefObject<HTMLDivElement>, // Assert type
    {
      // Data to be transferred
      transferData: { id, label, droppedAt: new Date().toISOString() },
      dataFormat: "application/json", // Important: Use a format the drop zone expects
      dragEffect: "move", // Indicate intent (move, copy, link)
      onDragStart: (e) => {
        console.log(`Drag Start: ${label}`);
        if (e.dataTransfer) {
          // Optional: Can customize effect further here
          e.dataTransfer.effectAllowed = "move";
        }
      },
      onDrag: (e) => {
        // console.log(`Dragging: ${label}`); // Usually too noisy
      },
      onDragEnd: (e) => {
        console.log(
          `Drag End: ${label}, Drop Effect: ${e.dataTransfer?.dropEffect}`
        );
      },
    }
  );

  const style: React.CSSProperties = {
    padding: "12px 15px",
    border: "1px solid #4b5563", // gray-700
    borderRadius: "6px",
    marginBottom: "8px",
    cursor: "grab",
    opacity: isDragging ? 0.5 : 1, // Visual feedback when dragging
    backgroundColor: isDragging ? "#dbeafe" : color, // blue-100 when dragging
    transition: "opacity 0.2s ease, background-color 0.2s ease",
    fontWeight: 500,
  };

  // draggable="true" is added automatically by the hook by default
  return (
    <div ref={dragRef} style={style}>
      {label}
    </div>
  );
};

// --- Drop Zone Component (using standard React/HTML events) ---
const DropZone: React.FC = () => {
  const [droppedItems, setDroppedItems] = useState<any[]>([]);
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Necessary to allow dropping
    event.dataTransfer.dropEffect = "move"; // Indicate this is a valid drop target for 'move'
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
    try {
      // Match the dataFormat used in useDrag
      const dataString = event.dataTransfer.getData("application/json");
      if (!dataString) {
        console.warn(
          "Drop event occurred, but no application/json data found."
        );
        return;
      }
      const data = JSON.parse(dataString);
      console.log("Item Dropped! Data:", data);
      setDroppedItems((prev) => [...prev, data]); // Add to list of dropped items
    } catch (e) {
      console.error("Error parsing dropped data:", e);
      setDroppedItems((prev) => [
        ...prev,
        { error: "Failed to parse dropped data" },
      ]);
    }
  };

  const style: React.CSSProperties = {
    padding: "20px",
    border: `3px dashed ${isOver ? "#2563eb" : "#6b7280"}`, // blue-600 or gray-500
    borderRadius: "8px",
    minHeight: "150px",
    marginTop: "20px",
    backgroundColor: isOver ? "#eff6ff" : "#f9fafb", // blue-50 or gray-50
    transition: "border-color 0.2s ease, background-color 0.2s ease",
    textAlign: "center",
    color: "#374151", // gray-700
  };

  return (
    <div
      style={style}
      onDragOver={handleDragOver} // Handle when draggable is over the zone
      onDrop={handleDrop} // Handle the actual drop
      onDragLeave={handleDragLeave} // Handle when draggable leaves the zone
    >
      <p className="font-medium mb-3">Drop Zone</p>
      {droppedItems.length === 0 ? (
        <p className="text-sm text-gray-500">(Drag items here)</p>
      ) : (
        <ul className="text-left list-disc list-inside text-sm space-y-1">
          {droppedItems.map((item, index) => (
            <li key={index}>
              {item.error ? (
                <span className="text-red-600">{item.error}</span>
              ) : (
                <code>{JSON.stringify(item)}</code>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// --- Main Example Component ---
const UseDragExample: React.FC = () => {
  const exampleCode = `
  import React, { useRef } from "react";
  import useDrag from "@/app/hooks/useDrag";
  
  const Draggable = ({ id, label }) => {
    const dragRef = useRef(null);
    const { isDragging } = useDrag(dragRef, {
      transferData: { id, label },
      dataFormat: "application/json",
      dragEffect: "move",
    });
    return <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>{label}</div>;
  };

  const DropTarget = () => {
    const handleDrop = (e) => {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData("application/json"));
      console.log("Dropped:", data);
    };
    const handleDragOver = (e) => e.preventDefault(); // Allow drop

    return <div onDrop={handleDrop} onDragOver={handleDragOver}>Drop Here</div>;
  };
  `;

  return (
    // <HookDocumentation markdownContent={useDragDoc}>
    <div>
      <h2 className="text-xl font-semibold mb-2">useDrag Example</h2>
      <p className="text-sm mb-4">
        Demonstrates making elements draggable using the HTML Drag and Drop API,
        transferring data to a drop zone.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Draggable Items</h3>
          <DraggableItem
            id="task-101"
            label="Task 1: Implement Feature X"
            color="#fee2e2"
          />
          <DraggableItem
            id="task-102"
            label="Task 2: Fix Bug Y"
            color="#fef3c7"
          />
          <DraggableItem
            id="data-abc"
            label="User Data Record"
            color="#d1fae5"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Drop Target</h3>
          <DropZone />
        </div>
      </div>

      {/* <CodeBlock code={exampleCode} language="tsx" title="Example Usage Code (Simplified)" /> */}
      {/* </HookDocumentation> */}
    </div>
  );
};

export default UseDragExample;
