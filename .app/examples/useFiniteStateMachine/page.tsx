"use client";

import React, { useState, useEffect, useCallback } from "react";
import useFiniteStateMachine, {
  StateMachineConfig,
} from "@/app/hooks/useFiniteStateMachine"; // Adjust import path
// import { HookDocumentation } from "@/components/hook-documentation";
// import { CodeBlock } from "@/components/code-block";
// import useFiniteStateMachineDoc from "@/docs/useFiniteStateMachine.md";

// Define State, Event, and Context types
type FetchState = "idle" | "loading" | "success" | "error";
type FetchEvent = "FETCH" | "SUCCESS" | "ERROR" | "RETRY";
interface FetchContext {
  data?: any;
  error?: string;
  retries: number;
}

// Define the state machine configuration
const fetchMachineConfig: StateMachineConfig<
  FetchState,
  FetchEvent,
  FetchContext
> = {
  initial: "idle",
  context: {
    retries: 0, // Initial context
    data: undefined,
    error: undefined,
  },
  states: {
    idle: {
      on: {
        FETCH: "loading", // Transition to loading on FETCH event
      },
      entry: [(ctx) => ({ retries: 0, data: undefined, error: undefined })], // Reset context on entering idle
    },
    loading: {
      entry: [
        (ctx) => console.log("Entering loading state, retries:", ctx.retries),
      ],
      on: {
        SUCCESS: {
          target: "success", // Transition to success on SUCCESS event
          actions: [
            (ctx, payload) => ({ data: payload, error: undefined }), // Update context with data
          ],
        },
        ERROR: {
          target: "error", // Transition to error on ERROR event
          actions: [
            (ctx, payload) => ({ error: payload, data: undefined }), // Update context with error
          ],
        },
      },
      exit: [(ctx) => console.log("Exiting loading state.")],
    },
    success: {
      on: {
        FETCH: "loading", // Allow fetching again
      },
      entry: [(ctx) => ({ retries: 0 })], // Reset retries on success
    },
    error: {
      on: {
        RETRY: {
          target: "loading", // Transition back to loading on RETRY
          actions: [
            (ctx) => ({ retries: ctx.retries + 1 }), // Increment retry count
          ],
          cond: (ctx) => ctx.retries < 3, // Condition: only retry if retries < 3
        },
        FETCH: "idle", // Allow fetching again (go back to idle to reset context fully)
      },
    },
  },
};

// --- Component Using the State Machine ---
const UseFiniteStateMachineExample: React.FC = () => {
  const { currentState, context, send, matches } =
    useFiniteStateMachine(fetchMachineConfig);
  const [userId, setUserId] = useState("1");

  // Define the async operation
  const performFetch = useCallback(async () => {
    console.log(
      `Performing fetch for user ${userId}, attempt ${context.retries + 1}`
    );
    send("FETCH");
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Simulate failure sometimes, especially on retries
      if (Math.random() < 0.4 && context.retries < 3) {
        throw new Error(
          `Simulated Network Error on attempt ${context.retries + 1}`
        );
      }
      if (!userId || isNaN(Number(userId))) {
        throw new Error("Invalid User ID");
      }

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      send({ type: "SUCCESS", payload: data });
    } catch (error: any) {
      send({
        type: "ERROR",
        payload: error.message || "An unknown error occurred",
      });
    }
  }, [send, userId, context.retries]); // Include context.retries if fetch logic depends on it

  const handleRetry = () => {
    // Send RETRY event. The machine logic handles transition and actions.
    send("RETRY");
    // Re-fetch needs to happen as a side effect of entering the 'loading' state again.
    // We'll trigger it manually here for simplicity, but in a real app,
    // this might be triggered by an effect monitoring the state transition to loading AFTER a RETRY.
    // NOTE: Need to ensure the state transition actually happens before calling performFetch again
    // This manual call might race with the state update.
    setTimeout(() => {
      if (matches("loading")) {
        // Check if state changed to loading after RETRY
        performFetch();
      }
    }, 0);
  };

  const exampleCode = `
  import useFiniteStateMachine, { StateMachineConfig } from "@/app/hooks/useFiniteStateMachine";

  type LightState = 'green' | 'yellow' | 'red';
  type LightEvent = 'TIMER' | 'POWER_OUTAGE' | 'POWER_RESTORED';
  type LightContext = { timerDuration: number };

  const trafficLightMachine: StateMachineConfig<LightState, LightEvent, LightContext> = {
    initial: 'green',
    context: { timerDuration: 5 },
    states: {
      green: { on: { TIMER: 'yellow' } },
      yellow: { on: { TIMER: 'red' } },
      red: { on: { TIMER: 'green' } },
    },
  };

  function TrafficLight() {
    const { currentState, send } = useFiniteStateMachine(trafficLightMachine);
    // ... (effect to send TIMER event) ...
    return <p>Current Light: {currentState}</p>;
  }
  `;

  return (
    // <HookDocumentation markdownContent={useFiniteStateMachineDoc}>
    <div>
      <h2 className="text-xl font-semibold mb-4">
        useFiniteStateMachine Example: Data Fetcher
      </h2>
      <p className="text-sm mb-4">
        Simulates fetching user data with loading, success, error, and retry
        states managed by a state machine.
      </p>

      <div className="p-4 border rounded bg-gray-50 space-y-3 mb-4">
        <div>
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700 mr-2"
          >
            User ID:
          </label>
          <input
            id="userId"
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            disabled={matches("loading")}
            min="1"
            max="10"
            className="p-2 border rounded focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200 w-24"
          />
        </div>

        {/* Action Buttons - Render based on current state */}
        <div className="flex flex-wrap gap-2">
          {(matches("idle") || matches("success") || matches("error")) && (
            <button
              onClick={performFetch}
              disabled={matches("loading")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {matches("success") || matches("error")
                ? "Fetch Again"
                : "Fetch User Data"}
            </button>
          )}

          {matches("error") && context.retries < 3 && (
            <button
              onClick={handleRetry}
              disabled={matches("loading")}
              className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 disabled:opacity-50"
            >
              Retry (Attempt {context.retries + 1} of 3)
            </button>
          )}
        </div>
      </div>

      {/* Status Display */}
      <div className="p-4 border rounded bg-white">
        <h4 className="font-semibold mb-2">Machine Status:</h4>
        <p>
          Current State:{" "}
          <code
            className={`px-2 py-1 rounded text-xs font-medium ${
              matches("loading")
                ? "bg-yellow-100 text-yellow-800"
                : matches("success")
                ? "bg-green-100 text-green-800"
                : matches("error")
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {currentState}
          </code>
        </p>
        <p>
          Retries: <span className="font-mono">{context.retries}</span>
        </p>

        {matches("loading") && (
          <p className="text-yellow-700 mt-2">Fetching data...</p>
        )}

        {matches("success") && context.data && (
          <div className="mt-2 text-green-700">
            <p>Success!</p>
            <pre className="text-xs bg-green-50 p-2 rounded mt-1 overflow-x-auto">
              {JSON.stringify(context.data, null, 2)}
            </pre>
          </div>
        )}
        {matches("error") && context.error && (
          <div className="mt-2 text-red-700">
            <p>Error:</p>
            <pre className="text-xs bg-red-50 p-2 rounded mt-1 overflow-x-auto">
              {context.error}
            </pre>
            {context.retries >= 3 && (
              <p className="font-medium mt-1">Max retries reached.</p>
            )}
          </div>
        )}
      </div>

      {/* <CodeBlock code={exampleCode} language="tsx" title="Example State Machine Config (Traffic Light)" /> */}
      {/* </HookDocumentation> */}
    </div>
  );
};

export default UseFiniteStateMachineExample;
