"use client";

import React from "react";
import useStepper from "@/app/hooks/useStepper"; // Adjust import path as needed

const steps = [
  "Step 1: Account Setup",
  "Step 2: Profile Details",
  "Step 3: Verification",
  "Step 4: Confirmation",
];

const UseStepperExample: React.FC = () => {
  const {
    currentStep, // Current step number (1-indexed)
    totalSteps, // Total number of steps
    isFirstStep, // Boolean: is it the first step?
    isLastStep, // Boolean: is it the last step?
    canGoNextStep, // Boolean: can go forward?
    canGoPreviousStep, // Boolean: can go backward?
    goToNextStep, // Function: go to the next step
    goToPreviousStep, // Function: go to the previous step
    goToStep, // Function: go to a specific step number (1-indexed)
    reset, // Function: reset to the initial step
  } = useStepper({ totalSteps: steps.length, initialStep: 1 });

  // Get the content for the current step (adjusting for 1-based index)
  const currentStepContent = steps[currentStep - 1];

  return (
    <div className="p-4 border rounded shadow-md max-w-lg mx-auto space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useStepper Example
      </h2>

      {/* Step Indicator */}
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      {/* Step Content Area */}
      <div className="p-6 border-2 border-dashed border-indigo-400 rounded bg-indigo-50 min-h-[100px] flex items-center justify-center">
        <p className="text-lg font-medium text-indigo-800 text-center">
          {currentStepContent}
        </p>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center">
        <button
          onClick={goToPreviousStep}
          disabled={!canGoPreviousStep}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          &laquo; Previous
        </button>

        {/* Direct step jump buttons */}
        <div className="flex gap-1">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => goToStep(index + 1)}
              className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${
                currentStep === index + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to Step ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={goToNextStep}
          disabled={!canGoNextStep}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLastStep ? "Finish" : "Next"} &raquo;
        </button>
      </div>

      {/* Reset Button */}
      <div className="text-center mt-4">
        <button
          onClick={reset}
          className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset to Start
        </button>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        The <code>useStepper</code> hook manages the state for multi-step
        processes, providing navigation functions and status flags based on
        total steps.
      </p>
    </div>
  );
};

export default UseStepperExample;
