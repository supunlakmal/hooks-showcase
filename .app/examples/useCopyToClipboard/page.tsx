"use client";

import React, { useState } from "react";
// Adjust the import path if your hooks are located elsewhere


function CopyToClipboardExamplePage() {
  const [textToCopy, setTextToCopy] = useState("Copy this text!");
  const [copyStatus, copy] = useCopyToClipboard(); // Hook returns [status, copyFn]

  const handleCopyClick = async () => {
    await copy(textToCopy); // Call the copy function from the hook
  };

  return (
    <div>
      <h1>useCopyToClipboard Example</h1>
      <p>Copies text to the clipboard using the hook.</p>

      <textarea
        value={textToCopy}
        onChange={(e) => setTextToCopy(e.target.value)}
        rows={4}
        style={{
          width: "90%",
          maxWidth: "400px",
          marginBottom: "10px",
          padding: "5px",
        }}
      />
      <br />
      <button onClick={handleCopyClick} style={{ padding: "8px 15px" }}>
        Copy Text
      </button>

      <div style={{ marginTop: "15px", height: "20px" }}>
        {copyStatus === true && (
          <p style={{ color: "green", margin: 0 }}>Successfully copied!</p>
        )}
        {copyStatus === false && (
          <p style={{ color: "red", margin: 0 }}>
            Failed to copy. Browser might not support it or permission denied.
          </p>
        )}
        {copyStatus === null && (
          <p style={{ color: "grey", margin: 0 }}>
            Click the button to copy the text.
          </p>
        )}
      </div>
    </div>
  );
}

export default CopyToClipboardExamplePage;
