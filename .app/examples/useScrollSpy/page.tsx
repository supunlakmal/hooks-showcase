"use client";

import React, { useRef, useEffect } from "react";
import useScrollSpy from "@/app/hooks/useScrollSpy"; // Adjust import path
// import { HookDocumentation } from "@/components/hook-documentation";
// import { CodeBlock } from "@/components/code-block";
// import useScrollSpyDoc from "@/docs/useScrollSpy.md";

// Define section data
const sectionsData = [
  { id: "section-1", title: "Section 1", color: "#ffebee" },
  { id: "section-2", title: "Section 2", color: "#e8f5e9" },
  { id: "section-3", title: "Section 3", color: "#e3f2fd" },
  { id: "section-4", title: "Section 4", color: "#fffde7" },
  { id: "section-5", title: "Section 5", color: "#f3e5f5" },
];

const UseScrollSpyExample: React.FC = () => {
  // Create refs for each section
  const sectionRefs = sectionsData.map(() =>
    useRef<HTMLDivElement | null>(null)
  );
  const containerRef = useRef<HTMLDivElement | null>(null); // Optional: Ref for a scrollable div

  // --- Option 1: Spy on window scroll ---
  const activeSectionIdWindow = useScrollSpy(sectionRefs, {
    offset: 100, // Section becomes active 100px from the top of the viewport
    throttleMs: 150, // Throttle scroll checks
  });

  // --- Option 2: Spy on container scroll (uncomment to use) ---
  // const activeSectionIdContainer = useScrollSpy(sectionRefs, {
  //   containerRef: containerRef, // Specify the container
  //   offset: 50,
  //   throttleMs: 150,
  // });

  // For demo purposes, we'll use the window scroll spy result
  const activeSectionId = activeSectionIdWindow; // Change to activeSectionIdContainer if using Option 2

  // Log active section change
  useEffect(() => {
    console.log("Active Section ID:", activeSectionId);
  }, [activeSectionId]);

  // Function to smoothly scroll to a section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Styles
  const navStyle: React.CSSProperties = {
    position: "sticky",
    top: "0",
    backgroundColor: "white",
    padding: "15px 20px",
    borderBottom: "1px solid #ddd",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  };

  const sectionStyle: React.CSSProperties = {
    height: "100vh", // Make sections fill viewport height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2.5em",
    fontWeight: "bold",
    borderBottom: "2px dashed #ccc",
    scrollMarginTop: "80px", // Offset for sticky nav when scrolling into view
  };

  const buttonStyleBase: React.CSSProperties = {
    padding: "5px 10px",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "1em",
    color: "#555",
  };

  const activeButtonStyle: React.CSSProperties = {
    fontWeight: "bold",
    color: "#007bff",
    textDecoration: "underline",
  };

  const exampleCode = `
  import React, { useRef } from "react";
  import useScrollSpy from "@/app/hooks/useScrollSpy";

  const sectionsData = [
    { id: "section-1", title: "Section 1" },
    { id: "section-2", title: "Section 2" },
    // ... more sections
  ];

  const ScrollSpyComponent: React.FC = () => {
    const sectionRefs = sectionsData.map(() => useRef<HTMLDivElement | null>(null));
    
    // Monitor window scroll, active when section top is 100px from viewport top
    const activeSectionId = useScrollSpy(sectionRefs, { offset: 100 });

    const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: "smooth" });

    return (
      <div>
        <nav style={{ position: "sticky", top: 0, background: 'white', padding: '10px' }}>
          <strong>Active: {activeSectionId || "None"} | Jump To:</strong>
          {sectionsData.map((section, index) => (
            <button 
              key={section.id} 
              onClick={() => scrollToSection(sectionRefs[index])}
              style={{ fontWeight: activeSectionId === section.id ? "bold" : "normal" }}
            >
              {section.title}
            </button>
          ))}
        </nav>

        <div>
          {sectionsData.map((section, index) => (
            <div 
              key={section.id} 
              id={section.id} // ID is essential 
              ref={sectionRefs[index]} // Assign ref
              style={{ height: "100vh", borderBottom: '1px solid #ccc' }} // Example section style
            >
              {section.title}
            </div>
          ))}
        </div>
      </div>
    );
  };
  `;

  return (
    // <HookDocumentation markdownContent={useScrollSpyDoc}>
    <div>
      <h2 className="text-xl font-semibold mb-4">useScrollSpy Example</h2>

      {/* Sticky Navigation */}
      <nav style={navStyle}>
        <strong className="mr-3">
          Active Section:{" "}
          <span className="text-blue-600 font-bold">
            {activeSectionId || "None"}
          </span>{" "}
          | Jump To:
        </strong>
        {sectionsData.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(sectionRefs[index])}
            style={{
              ...buttonStyleBase,
              ...(activeSectionId === section.id ? activeButtonStyle : {}),
            }}
          >
            {section.title}
          </button>
        ))}
      </nav>

      <p className="p-4 text-sm bg-gray-100 my-4 rounded">
        Scroll down the page. The navigation bar above will indicate which
        section is currently considered "active" based on its position relative
        to the top of the viewport (with a 100px offset).
      </p>

      {/* Optional: Scrollable Container Div (uncomment and use activeSectionIdContainer) */}
      {/* <div ref={containerRef} style={{ height: '600px', overflowY: 'auto', border: '2px solid blue', marginTop: '20px' }}> */}
      {/* Content Sections */}
      <div>
        {sectionsData.map((section, index) => (
          <div
            key={section.id}
            id={section.id} // ID is crucial for the hook to return
            ref={sectionRefs[index]} // Assign ref
            style={{
              ...sectionStyle,
              backgroundColor: section.color,
            }}
          >
            {section.title}
          </div>
        ))}
      </div>
      {/* </div> */}

      {/* <CodeBlock code={exampleCode} language="tsx" title="Example Usage Code" /> */}
      {/* </HookDocumentation> */}
    </div>
  );
};

export default UseScrollSpyExample;
