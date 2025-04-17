"use client";

import React, { useRef, CSSProperties } from "react";
// Adjust path if necessary


// --- Custom Menu Component ---
interface CustomMenuProps {
  position: { x: number; y: number };
  onClose: () => void;
  onSelect: (option: string) => void;
}

const CustomMenu: React.FC<CustomMenuProps> = ({
  position,
  onClose,
  onSelect,
}) => {
  const menuStyle: CSSProperties = {
    position: "fixed", // Use fixed to position relative to viewport
    top: position.y,
    left: position.x,
    background: "white",
    border: "1px solid #ccc",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    padding: "5px 0",
    zIndex: 1100,
    minWidth: "120px",
    borderRadius: "4px",
  };

  const itemStyle: CSSProperties = {
    padding: "8px 16px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    onClose(); // Close menu after selection
  };

  // Simple effect to focus the menu container or first item for potential keyboard nav
  const menuRef = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    menuRef.current?.focus();
  }, []);

  return (
    <div ref={menuRef} style={menuStyle} tabIndex={-1}>
      <div style={itemStyle} onClick={() => handleSelect("Action 1")}>
        Action 1 🚀
      </div>
      <div style={itemStyle} onClick={() => handleSelect("Action 2")}>
        Action 2 ✨
      </div>
      <hr
        style={{ margin: "4px 0", border: "none", borderTop: "1px solid #eee" }}
      />
      <div style={itemStyle} onClick={() => handleSelect("Close This Menu")}>
        Close This Menu
      </div>
    </div>
  );
};

// --- Page using the hook ---
function ContextMenuExamplePage() {
  const targetAreaRef = useRef<HTMLDivElement>(null);
  // Assert type for the hook
  const {
    isOpen,
    position,
    close: closeMenu,
  } = useContextMenu(targetAreaRef as React.RefObject<HTMLElement>);
  const [lastAction, setLastAction] = React.useState<string>("None yet");

  const handleMenuSelect = (option: string) => {
    console.log("Selected:", option);
    setLastAction(option);
    // You could trigger different functions based on the option here
  };

  const targetStyle: CSSProperties = {
    width: "90%",
    maxWidth: "400px",
    height: "250px",
    backgroundColor: "#e3f2fd",
    border: "2px dashed #1976d2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    marginTop: "20px",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "1.1em",
    color: "#1976d2",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>useContextMenu Example</h1>
      <p>
        Right-click inside the blue dashed area below to trigger a custom menu.
      </p>

      <div ref={targetAreaRef} style={targetStyle}>
        Right-Click Target Area
      </div>

      <p style={{ marginTop: "20px" }}>
        Last selected action: <strong>{lastAction}</strong>
      </p>

      {/* Conditionally render the custom menu */}
      {isOpen && (
        <CustomMenu
          position={position}
          onClose={closeMenu}
          onSelect={handleMenuSelect}
        />
      )}

      <p style={{ marginTop: "30px", color: "#555" }}>
        Clicking outside the target area or scrolling will close the menu.
      </p>
    </div>
  );
}

export default ContextMenuExamplePage;
