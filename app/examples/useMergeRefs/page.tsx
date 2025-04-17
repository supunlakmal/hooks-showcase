"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import useMergeRefs from "@/app/hooks/useMergeRefs"; // Adjust import path as needed

// ... (FancyInput component remains the same)
interface FancyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const FancyInput = React.forwardRef<HTMLInputElement, FancyInputProps>(
  (props, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className="p-2 border border-blue-300 rounded w-full"
      />
    );
  }
);
FancyInput.displayName = "FancyInput";

const UseMergeRefsExample: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const internalRef = useRef<HTMLInputElement>(null);
  const forwardedRef = useRef<HTMLInputElement>(null);

  // Specify the type argument for useMergeRefs to match the refs being passed
  const mergedRef = useMergeRefs<HTMLInputElement | null>(
    internalRef,
    forwardedRef
  );

  // ... (useEffect for internalRef remains the same)
  useEffect(() => {
    if (internalRef.current) {
      console.log(
        "Internal Ref - Input width:",
        internalRef.current.offsetWidth
      );
    }
  }, [isFocused]);

  // ... (focusInput using forwardedRef remains the same)
  const focusInput = () => {
    forwardedRef.current?.focus();
  };

  // ... (checkMergedRef using internalRef/forwardedRef remains the same)
  const checkMergedRef = () => {
    if (internalRef.current) {
      alert(
        `Internal Ref (via merged) points to element with tag: ${internalRef.current.tagName}. Value: ${internalRef.current.value}`
      );
    } else if (forwardedRef.current) {
      alert(
        `Forwarded Ref (via merged) points to element with tag: ${forwardedRef.current.tagName}. Value: ${forwardedRef.current.value}`
      );
    } else {
      alert("Merged ref target is currently null.");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useMergeRefs Example
      </h2>

      <p className="text-center">
        This example demonstrates merging an internal ref and a forwarded ref
        onto a single component instance using a callback ref.
      </p>

      <div className="p-4 border rounded bg-gray-50 space-y-2">
        <label
          htmlFor="fancyInput"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Fancy Input Component:
        </label>
        <FancyInput
          id="fancyInput"
          ref={mergedRef} // Pass the callback ref function
          placeholder="Type here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <p className="text-sm mt-1">
          Focus Status: {isFocused ? "Focused" : "Blurred"} (Internal ref might
          log width on change)
        </p>
      </div>

      {/* ... (Buttons remain the same) ... */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={focusInput}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Focus Input (via Forwarded Ref)
        </button>
        <button
          onClick={checkMergedRef}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Check Merged Ref Target
        </button>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        The <code>useMergeRefs</code> hook returns a callback ref function that
        updates all provided refs when the referenced element is mounted or
        unmounted.
      </p>
    </div>
  );
};

export default UseMergeRefsExample;
