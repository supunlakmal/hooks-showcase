"use client";

import React, { useState, useCallback } from "react";
import useTranslation from "@/app/hooks/useTranslation"; // Adjust import path as needed

// Define simplified translation resources
const resources = {
  en: {
    greeting: "Hello",
    farewell: "Goodbye",
    button: {
      submit: "Submit",
      cancel: "Cancel",
    },
    message: "This is a sample message.",
    fallbackTest: "This exists only in English.",
  },
  es: {
    greeting: "Hola",
    farewell: "Adiós",
    button: {
      submit: "Enviar",
      cancel: "Cancelar",
    },
    message: "Este es un mensaje de ejemplo.",
  },
  fr: {
    greeting: "Bonjour",
    farewell: "Au revoir",
    button: {
      submit: "Soumettre",
      // cancel key missing for fallback demo
    },
    // message key missing for fallback demo
  },
};

const UseTranslationExample: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<string>("en");

  // Initialize the hook
  const { t, setLanguage, language, isLoaded } = useTranslation(
    resources,
    currentLang
  );

  // Handle language change from UI
  const handleLangChange = useCallback(
    (lang: string) => {
      setLanguage(lang); // Update language via the hook's function
      setCurrentLang(lang); // Update local state if needed for UI
    },
    [setLanguage]
  );

  if (!isLoaded) {
    return <div className="p-4 text-center">Loading translations...</div>;
  }

  return (
    <div className="p-4 border rounded shadow-md max-w-lg mx-auto space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        useTranslation Example
      </h2>

      {/* Language Selector */}
      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Language Control</h3>
        <p className="text-sm mb-2">
          Current Language:{" "}
          <span className="font-bold capitalize">{language}</span>
        </p>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleLangChange("en")}
            disabled={language === "en"}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            English
          </button>
          <button
            onClick={() => handleLangChange("es")}
            disabled={language === "es"}
            className="px-3 py-1 bg-green-500 text-white rounded disabled:opacity-50"
          >
            Spanish
          </button>
          <button
            onClick={() => handleLangChange("fr")}
            disabled={language === "fr"}
            className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
          >
            French
          </button>
        </div>
      </div>

      {/* Translation Examples */}
      <div className="p-4 border rounded bg-indigo-50 space-y-3">
        <h3 className="text-lg font-medium mb-2 text-indigo-800">
          Translations:
        </h3>

        {/* Basic Translation */}
        <p>
          <strong>Basic:</strong> {t("greeting")}
        </p>
        <p>
          <strong>Nested:</strong> {t("button.submit")}
        </p>

        {/* Fallback Language */}
        <p>
          <strong>Fallback (fr):</strong> {t("message", "Default Message")}{" "}
          (Uses fallback)
        </p>
        <p>
          <strong>Fallback (fr):</strong> {t("button.cancel", "Default Cancel")}{" "}
          (Uses fallback)
        </p>
        <p>
          <strong>Fallback (en only):</strong> {t("fallbackTest")} (Exists only
          in EN)
        </p>

        {/* Missing Key */}
        <p>
          <strong>Missing Key:</strong>{" "}
          {t("nonExistentKey", "Fallback for Missing")}
        </p>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        This <code>useTranslation</code> hook provides a <code>t</code> function
        for basic key-based translations with nesting and fallbacks.
      </p>
    </div>
  );
};

export default UseTranslationExample;
