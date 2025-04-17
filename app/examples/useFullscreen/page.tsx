"use client";

import React, { useRef } from "react";
import useFullscreen from "@/app/hooks/useFullscreen"; // Adjust import path as needed

const UseFullscreenExample: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    isSupported,
  } = useFullscreen(targetRef as React.RefObject<HTMLElement>);

  const videoStyle: React.CSSProperties = {
    maxWidth: "100%", // Ensure video fits container
    display: "block", // Prevents extra space below
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">useFullscreen Example</h2>
      {!isSupported ? (
        <p className="text-red-500">
          Fullscreen API not supported by this browser.
        </p>
      ) : (
        <div>
          <p className="text-lg mb-4">
            Current state:{" "}
            <span
              className={`font-medium ${
                isFullscreen ? "text-green-500" : "text-gray-500"
              }`}
            >
              {isFullscreen ? "Fullscreen" : "Normal"}
            </span>
          </p>

          {/* Target element for fullscreen */}
          <div
            ref={targetRef}
            className={`border-2 border-blue-500 p-4 mb-4 ${
              isFullscreen ? "bg-gray-100" : "bg-white"
            }`}
          >
            <p className="mb-4">
              This div and its contents will go fullscreen.
            </p>
            {/* Example with a video element */}
            <video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              controls
              style={videoStyle}
              width="400" // Initial width
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Controls */}
          <div className="space-x-2">
            <button
              onClick={enterFullscreen}
              disabled={isFullscreen}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Enter Fullscreen
            </button>
            <button
              onClick={exitFullscreen}
              disabled={!isFullscreen}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              Exit Fullscreen
            </button>
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Toggle Fullscreen
            </button>
          </div>
        </div>
      )}

      <p className="text-xs mt-4">
        <em>
          (Note: The Fullscreen API is supported in most modern browsers. If not
          supported, the hook will indicate that the API is not available.)
        </em>
      </p>
    </div>
  );
};

export default UseFullscreenExample;
