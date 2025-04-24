'use client';
import React, { useState } from "react";
import { useRouteChange } from "@supunlakmal/hooks";

function RouteChangeExample() {
    const [message, setMessage] = useState("No route change detected.");

    useRouteChange(() => {
        setMessage("Route has changed!");
    });

    return (
        <div>
            <h1>useRouteChange Example</h1>
            <p>{message}</p>
        </div>
    );
}

export default RouteChangeExample;