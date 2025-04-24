'use client';
import React, { useState } from "react";
import { useTimeout } from "@supunlakmal/hooks";

function TimeoutExample() {
    const [message, setMessage] = useState("Waiting...");

    useTimeout(() => {
        setMessage("Timeout triggered!");
    }, 3000);

    return (
        <div>
            <h1>useTimeout Example</h1>
            <p>{message}</p>
        </div>
    );
}

export default TimeoutExample;