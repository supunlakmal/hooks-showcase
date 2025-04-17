"use client";

import React, { CSSProperties } from "react";
// Adjust path if necessary


// Basic global styles would typically be in a separate CSS file
// Here, we inject a <style> tag for simplicity in this example.
const GlobalStyle = () => (
  <style jsx global>{`
    body {
      transition: background-color 0.3s ease, color 0.3s ease;
      font-family: sans-serif;
      line-height: 1.6;
    }
    .content-box {
      padding: 20px;
      margin-top: 20px;
      border-radius: 8px;
      border: 1px solid;
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }
    button {
      margin: 5px;
      padding: 10px 15px;
      cursor: pointer;
      border-radius: 4px;
      border: 1px solid;
      transition: background-color 0.2s ease, border-color 0.2s ease,
        color 0.2s ease;
    }

    /* Light mode styles (applied when <html> has class 'light') */
    html.light body {
      background-color: #ffffff;
      color: #212529;
    }
    html.light .content-box {
      background-color: #f8f9fa;
      border-color: #dee2e6;
    }
    html.light button {
      background-color: #e9ecef;
      border-color: #ced4da;
      color: #495057;
    }
    html.light button:hover {
      background-color: #dee2e6;
    }

    /* Dark mode styles (applied when <html> has class 'dark') */
    html.dark body {
      background-color: #212529;
      color: #e9ecef;
    }
    html.dark .content-box {
      background-color: #343a40;
      border-color: #495057;
    }
    html.dark button {
      background-color: #495057;
      border-color: #6c757d;
      color: #f8f9fa;
    }
    html.dark button:hover {
      background-color: #6c757d;
    }
  `}</style>
);

function DarkModeExamplePage() {
  const { isDarkMode, toggle, enable, disable, set } = useDarkMode();

  // Style for the main container of this example
  const containerStyle: CSSProperties = {
    padding: "20px",
    maxWidth: "600px",
    margin: "20px auto",
  };

  return (
    <>
      <GlobalStyle /> {/* Apply the styles */}
      <div style={containerStyle}>
        <h1>useDarkMode Example</h1>
        <p>
          Toggles dark/light mode, persists choice in localStorage, and applies
          class to `&lt;html&gt;`.
        </p>

        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            background: "rgba(128,128,128,0.1)",
            borderRadius: "5px",
          }}
        >
          Current Mode: <strong>{isDarkMode ? "🌙 Dark" : "☀️ Light"}</strong>
        </div>

        <div>
          <button onClick={toggle}>Toggle Mode</button>
          <button onClick={enable}>Enable Dark Mode</button>
          <button onClick={disable}>Disable Dark Mode</button>
        </div>
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => set(true)}>Set Dark (using set)</button>
          <button onClick={() => set(false)}>Set Light (using set)</button>
        </div>

        {/* Example content box that uses the global styles */}
        <div className="content-box">
          This is a content box. Its appearance changes based on the selected
          theme (light/dark) thanks to the styles applied via the class on the
          `&lt;html&gt;` tag.
        </div>
      </div>
    </>
  );
}

export default DarkModeExamplePage;
