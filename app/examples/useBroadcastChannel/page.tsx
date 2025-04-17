"use client";

import React, { useState } from "react";


interface MyData {
  message: string;
  timestamp: number;
  fromTabId?: string; // Add a simple identifier
}

// Generate a simple "tab ID" for demo purposes
const tabId = Math.random().toString(36).substring(2, 7);

function BroadcastChannelPage() {
  // Use 'demo-channel' for communication
  const { data, postMessage } = useBroadcastChannel<MyData>("demo-channel");
  const [messageToSend, setMessageToSend] = useState("");
  const [messageLog, setMessageLog] = useState<MyData[]>([]);

  const sendMessage = () => {
    if (!messageToSend.trim()) return;

    const newMessage: MyData = {
      message: messageToSend,
      timestamp: Date.now(),
      fromTabId: tabId,
    };
    postMessage(newMessage);
    logMessage("Sent", newMessage);
    setMessageToSend(""); // Clear input after sending
  };

  const logMessage = (prefix: string, msgData: MyData | null) => {
    if (!msgData) return;
    const logEntry = { ...msgData, logPrefix: prefix }; // Add prefix for display
    setMessageLog((prev) => [...prev, logEntry].slice(-10)); // Keep last 10 messages
  };

  // Log received messages
  React.useEffect(() => {
    if (data && data.fromTabId !== tabId) {
      // Only log messages from other tabs
      logMessage("Received", data);
    }
  }, [data]); // Effect runs when 'data' (received message) changes

  const logBoxStyle: React.CSSProperties = {
    height: "200px",
    overflowY: "scroll",
    border: "1px solid #eee",
    padding: "5px",
    marginTop: "15px",
    fontSize: "0.9em",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  };

  return (
    <div>
      <h1>useBroadcastChannel Example</h1>
      <p>Enables cross-tab/window communication (same origin).</p>
      <p>
        <strong>Open this page in another browser tab to test!</strong>
      </p>
      <p>Current Tab ID (for demo): {tabId}</p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginTop: "15px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          placeholder="Type a message..."
          style={{ padding: "8px", minWidth: "200px" }}
        />
        <button onClick={sendMessage} style={{ padding: "8px 15px" }}>
          Send Message to Other Tabs
        </button>
      </div>

      <h3>Message Log (Max 10):</h3>
      <div style={logBoxStyle}>
        {messageLog.length === 0 && "No messages sent or received yet."}
        {messageLog.map((log: any, index) => (
          <div
            key={index}
            style={{ marginBottom: "5px", borderBottom: "1px dotted #ccc" }}
          >
            <strong>{log.logPrefix}</strong> (from {log.fromTabId || "N/A"} @{" "}
            {new Date(log.timestamp).toLocaleTimeString()}):
            <br />
            <code>{log.message}</code>
          </div>
        ))}
      </div>

      <h3>Last Received Data State:</h3>
      {data ? (
        <pre
          style={{
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p>No message received yet from other tabs.</p>
      )}
    </div>
  );
}

export default BroadcastChannelPage;
