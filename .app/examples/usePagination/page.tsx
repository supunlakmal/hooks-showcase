"use client";

import React, { useState, useMemo } from "react";
import usePagination from "@/app/hooks/usePagination"; // Adjust import path as needed

// Sample data (replace with your actual data source)
const ALL_ITEMS = Array.from({ length: 53 }, (_, i) => `Item ${i + 1}`);

const UsePaginationExample: React.FC = () => {
  // Call the hook with the configuration object
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    startIndex,
    endIndex,
    canGoPreviousPage,
    canGoNextPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    setItemsPerPage,
  } = usePagination({
    totalItems: ALL_ITEMS.length,
    initialItemsPerPage: 10,
  });

  // Calculate the data for the current page
  const currentPageData = useMemo(() => {
    // Ensure endIndex doesn't go beyond the array length
    const safeEndIndex = Math.min(endIndex, ALL_ITEMS.length - 1);
    return ALL_ITEMS.slice(startIndex, safeEndIndex + 1);
  }, [startIndex, endIndex]);

  return (
    <div className="p-4 border rounded shadow-md max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        usePagination Example
      </h2>

      {/* Configuration Controls */}
      <div className="p-3 border rounded bg-gray-50 flex flex-wrap gap-4 items-center justify-center">
        <div>
          <label htmlFor="pageSizeInput" className="text-sm font-medium mr-2">
            Items Per Page:
          </label>
          <select
            id="pageSizeInput"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="p-1 border border-gray-300 rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="text-sm text-gray-700">
          Total Items: {ALL_ITEMS.length} (Using sample data)
        </div>
      </div>

      {/* Display Current Page Data */}
      <div className="p-4 border rounded">
        <h3 className="text-lg font-medium mb-2">
          Current Page ({currentPage} / {totalPages})
        </h3>
        <p className="text-xs mb-2 text-gray-600">
          Showing items {startIndex + 1} to {endIndex + 1}
        </p>
        {currentPageData.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {currentPageData.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No items on this page.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={goToPreviousPage}
          disabled={!canGoPreviousPage}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          &laquo; Previous
        </button>

        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => goToPage(1)}
          disabled={!canGoPreviousPage}
          className={`px-2 py-1 text-xs rounded ${
            !canGoPreviousPage ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          1
        </button>
        {totalPages > 1 && (
          <button
            onClick={() => goToPage(totalPages)}
            disabled={!canGoNextPage}
            className={`px-2 py-1 text-xs rounded ${
              !canGoNextPage ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {totalPages}
          </button>
        )}

        <button
          onClick={goToNextPage}
          disabled={!canGoNextPage}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Next &raquo;
        </button>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        This hook simplifies client-side pagination logic by handling page
        calculations and providing navigation functions based on total items and
        items per page.
      </p>
    </div>
  );
};

export default UsePaginationExample;
