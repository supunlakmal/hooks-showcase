"use client";

import React, { useState, useCallback } from "react";
import useKeyCombo from "@/app/hooks/useKeyCombo"; // Adjust import path as needed

const UseKeyComboExample: React.FC = () => {
  const [message, setMessage] = useState<string>("Press Ctrl+S or Alt+Shift+K");
  const [lastCombo, setLastCombo] = useState<string>("None");

  const handleSave = useCallback((event: KeyboardEvent) => {
    console.log("Save combo detected!", event);
    setMessage("Save combo (Ctrl+S) pressed!");
    setLastCombo("Ctrl+S");
    // Example: Prevent browser's default save action
    // event.preventDefault();
  }, []);

  const handleAltShiftK = useCallback((event: KeyboardEvent) => {
    console.log("Alt+Shift+K combo detected!", event);
    setMessage("Alt+Shift+K combo pressed!");
    setLastCombo("Alt+Shift+K");
    // Example: Stop propagation if needed
    // event.stopPropagation();
  }, []);

  const handleKeypadPlus = useCallback((event: KeyboardEvent) => {
    console.log("Keypad Add (+) detected!", event);
    setMessage("Keypad Add (+) pressed! (via 'add' key name)");
    setLastCombo("Keypad +");
  }, []);

  // Register the key combinations
  useKeyCombo("ctrl+s", handleSave, { preventDefault: true });
  useKeyCombo("alt+shift+k", handleAltShiftK);
  // Example using a different key name ('add' for Numpad +)
  useKeyCombo("add", handleKeypadPlus, { event: "keyup" }); // Trigger on release

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">useKeyCombo Example</h2>
      <p className="text-sm mb-4">
        Detects specific keyboard combinations (shortcuts). Try pressing the
        following combos anywhere on the page:
      </p>
      <ul className="list-disc list-inside mb-4 text-sm">
        <li>
          <code>Ctrl + S</code> (Prevent default behavior is on)
        </li>
        <li>
          <code>Alt + Shift + K</code>
        </li>
        <li>
          <code>Numpad +</code> (Triggers on key release)
        </li>
      </ul>
      <div className="mt-4 p-4 border rounded bg-gray-100">
        <p className="font-medium">Status:</p>
        <p id="key-combo-status" className="text-lg text-blue-600">
          {message}
        </p>
        <p className="text-xs mt-2">
          Last detected combo: <code id="last-combo">{lastCombo}</code>
        </p>
      </div>
    </div>
  );
};

export default UseKeyComboExample;
