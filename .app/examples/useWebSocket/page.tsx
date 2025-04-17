"use client";

import React, { useState, useCallback } from "react";
import useWebSocket, { ReadyState } from "@/app/hooks/useWebSocket"; // Adjust import path as needed

const UseWebSocketExample: React.FC = () => {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Disconnected");

  // WebSocket URL - replace with your WebSocket server URL
  const wsUrl = "wss://echo.websocket.org"; // Example echo server

  const { sendMessage, lastMessage, readyState, error, connect, disconnect } =
    useWebSocket(wsUrl, {
      onOpen: () => {
        console.log("WebSocket connection opened");
        setConnectionStatus("Connected");
      },
      onClose: () => {
        console.log("WebSocket connection closed");
        setConnectionStatus("Disconnected");
      },
      onMessage: (event) => {
        console.log("Message received:", event.data);
        setReceivedMessages((prev) => [...prev, event.data]);
      },
      onError: (event) => {
        console.error("WebSocket error:", event);
        setConnectionStatus("Error");
      },
      reconnectLimit: 3,
      reconnectIntervalMs: 5000,
    });

  const handleSendMessage = useCallback(() => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  }, [message, sendMessage]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getConnectionStatusColor = () => {
    switch (readyState) {
      case ReadyState.Connecting:
        return "text-yellow-500";
      case ReadyState.Open:
        return "text-green-500";
      case ReadyState.Closing:
        return "text-yellow-500";
      case ReadyState.Closed:
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">useWebSocket Example</h2>
      <p className="text-sm mb-4">
        Manages a WebSocket connection with automatic reconnection and message
        handling.
      </p>

      <div className="mb-4">
        <p className="text-sm">
          Connection Status:{" "}
          <span className={`font-medium ${getConnectionStatusColor()}`}>
            {connectionStatus}
          </span>
        </p>
        {error && (
          <p className="text-sm text-red-500 mt-2">Error: {error.toString()}</p>
        )}
      </div>

      <div className="space-x-2 mb-4">
        <button
          onClick={connect}
          disabled={readyState === ReadyState.Open}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Connect
        </button>
        <button
          onClick={disconnect}
          disabled={readyState !== ReadyState.Open}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          Disconnect
        </button>
      </div>

      <div className="mb-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="w-full p-2 border rounded"
          rows={3}
        />
        <button
          onClick={handleSendMessage}
          disabled={readyState !== ReadyState.Open}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Send Message
        </button>
      </div>

      <div className="border rounded p-4 bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Received Messages</h3>
        <ul className="space-y-2">
          {receivedMessages.map((msg, index) => (
            <li key={index} className="text-sm">
              {msg}
            </li>
          ))}
          {receivedMessages.length === 0 && (
            <li className="text-sm text-gray-500">No messages received yet.</li>
          )}
        </ul>
      </div>

      <p className="text-xs mt-4">
        Note: This example uses a public WebSocket echo server. In a real
        application, replace the URL with your WebSocket server endpoint.
      </p>
    </div>
  );
};

export default UseWebSocketExample;
