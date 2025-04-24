'use client';
import React, { useReducer } from "react";
import { useReducerLogger } from "@supunlakmal/hooks";

function ReducerLoggerExample() {
    const initialState = { count: 0 };

    const reducer = (state, action) => {
        switch (action.type) {
            case "increment":
                return { count: state.count + 1 };
            case "decrement":
                return { count: state.count - 1 };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducerLogger(reducer, initialState);

    return (
        <div>
            <h1>useReducerLogger Example</h1>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
            <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
        </div>
    );
}

export default ReducerLoggerExample;