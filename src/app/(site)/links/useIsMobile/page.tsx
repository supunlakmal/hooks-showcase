'use client';
import React from "react";
import { useIsMobile } from "@supunlakmal/hooks";

function IsMobileExample() {
    const isMobile = useIsMobile();

    return (
        <div>
            <h1>useIsMobile Example</h1>
            <p>{isMobile ? "You are on a mobile device." : "You are on a desktop device."}</p>
        </div>
    );
}

export default IsMobileExample;