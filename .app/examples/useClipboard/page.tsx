"use client";

import React, { useState } from "react";
// Adjust path if necessary


function ClipboardExamplePage() {
  const { value: clipboardValue, error, copy, paste } = useClipboard();
  const [textToCopy, setTextToCopy] = useState("Text to be copied!");
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [pasteStatus, setPasteStatus] = useState<string | null>(null);

  const handleCopy = async () => {
    setCopyStatus("Attempting to copy...");
    try {
      await copy(textToCopy);
      setCopyStatus("Text copied successfully! ✅");
      setTimeout(() => setCopyStatus(null), 2500); // Clear status after timeout
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setCopyStatus(`Copy failed: ${message} ❌`);
      console.error("Copy error:", err);
      setTimeout(() => setCopyStatus(null), 4000);
    }
  };

  const handlePaste = async () => {
    setPasteStatus("Attempting to paste...");
    try {
      const pastedText = await paste(); // This reads and updates clipboardValue
      setPasteStatus(`Pasted successfully! ✅`);
      // clipboardValue will update automatically via the hook's state
      setTimeout(() => setPasteStatus(null), 2500);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setPasteStatus(`Paste failed: ${message} ❌ (Check browser permissions)`);
      console.error("Paste error:", err);
      setTimeout(() => setPasteStatus(null), 4000);
    }
  };

  // Basic styling
  const sectionStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "5px",
    background: "#f9f9f9",
  };
  const buttonStyle: React.CSSProperties = {
    padding: "8px 12px",
    marginRight: "10px",
    cursor: "pointer",
  };
  const statusStyle: React.CSSProperties = {
    display: "inline-block",
    marginLeft: "10px",
    padding: "3px 8px",
    borderRadius: "3px",
    fontSize: "0.9em",
  };
  const successStyle: React.CSSProperties = {
    ...statusStyle,
    color: "green",
    backgroundColor: "#e6ffed",
  };
  const errorStyle: React.CSSProperties = {
    ...statusStyle,
    color: "red",
    backgroundColor: "#ffeeee",
  };
  const infoStyle: React.CSSProperties = {
    ...statusStyle,
    color: "#333",
    backgroundColor: "#eee",
  };
  const valueBoxStyle: React.CSSProperties = {
    display: "block",
    background: "#eee",
    padding: "10px",
    minHeight: "1.5em",
    marginTop: "10px",
    borderRadius: "4px",
    fontFamily: "monospace",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>useClipboard Example</h1>
      <p>Interact with the system clipboard (copy/paste).</p>
      <p>
        <i>
          Note: Browser permissions might be required, especially for paste.
        </i>
      </p>

      {/* Copy Section */}
      <div style={sectionStyle}>
        <h2>Copy to Clipboard</h2>
        <textarea
          value={textToCopy}
          onChange={(e) => setTextToCopy(e.target.value)}
          rows={3}
          style={{
            width: "calc(100% - 20px)",
            padding: "8px",
            marginBottom: "10px",
          }}
        />
        <br />
        <button
          onClick={handleCopy}
          style={buttonStyle}
          disabled={copyStatus?.includes("Attempting")}
        >
          Copy Input Text
        </button>
        {copyStatus && (
          <span
            style={
              copyStatus.includes("failed")
                ? errorStyle
                : copyStatus.includes("successfully")
                ? successStyle
                : infoStyle
            }
          >
            {copyStatus}
          </span>
        )}
      </div>

      {/* Paste Section */}
      <div style={sectionStyle}>
        <h2>Paste from Clipboard</h2>
        <button
          onClick={handlePaste}
          style={buttonStyle}
          disabled={pasteStatus?.includes("Attempting")}
        >
          Paste Here
        </button>
        {pasteStatus && (
          <span
            style={
              pasteStatus.includes("failed")
                ? errorStyle
                : pasteStatus.includes("successfully")
                ? successStyle
                : infoStyle
            }
          >
            {pasteStatus}
          </span>
        )}
        <p style={{ marginTop: "15px", marginBottom: "5px" }}>
          Last value read from clipboard by hook:
        </p>
        <strong style={valueBoxStyle}>
          {clipboardValue ?? <i>[Nothing read yet or error occurred]</i>}
        </strong>
      </div>

      {/* Hook Error State */}
      {error && (
        <p style={{ marginTop: "15px", color: "red", fontWeight: "bold" }}>
          Clipboard Hook Error: {error.message}
        </p>
      )}
    </div>
  );
}

export default ClipboardExamplePage;
