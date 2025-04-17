"use client";

import React, { useState, CSSProperties } from "react";
// Adjust path if necessary


// Define the structure for our sample data
interface SampleData {
  id: number;
  productName: string;
  category: string;
  unitPrice: number;
  unitsInStock: number;
  orderDate: string;
}

// Sample dataset
const sampleData: SampleData[] = [
  {
    id: 101,
    productName: "Laptop Pro",
    category: "Electronics",
    unitPrice: 1499.99,
    unitsInStock: 50,
    orderDate: "2023-01-15",
  },
  {
    id: 102,
    productName: "Wireless Mouse",
    category: "Accessories",
    unitPrice: 25.5,
    unitsInStock: 250,
    orderDate: "2023-01-17",
  },
  {
    id: 103,
    productName: "Mechanical Keyboard",
    category: "Accessories",
    unitPrice: 110.0,
    unitsInStock: 100,
    orderDate: "2023-02-01",
  },
  {
    id: 104,
    productName: "4K Monitor",
    category: "Electronics",
    unitPrice: 399.0,
    unitsInStock: 75,
    orderDate: "2023-02-10",
  },
  {
    id: 105,
    productName: "Standing Desk",
    category: "Furniture",
    unitPrice: 299.95,
    unitsInStock: 30,
    orderDate: "2023-03-05",
  },
  {
    id: 106,
    productName: "Webcam HD",
    category: "Accessories",
    unitPrice: 45.0,
    unitsInStock: 150,
    orderDate: "2023-03-12",
  },
];

// Define how data maps to Excel columns
const columns = [
  { key: "id", label: "Product ID" },
  { key: "productName", label: "Product Name" },
  { key: "category", label: "Category" },
  { key: "unitPrice", label: "Price per Unit" },
  { key: "unitsInStock", label: "Stock Quantity" },
  { key: "orderDate", label: "Last Order Date" },
];

function ExportToExcelExamplePage() {
  // The hook returns the export function directly
  const exportToExcel = useExportToExcel();
  // We can manage loading state separately if needed
  const [isExporting, setIsExporting] = useState(false);
  const [fileName, setFileName] = useState("product-report");

  const handleExport = async () => {
    setIsExporting(true);
    // Ensure filename has .xlsx extension
    const finalFileName = fileName.endsWith(".xlsx")
      ? fileName
      : `${fileName}.xlsx`;
    console.log(`Exporting data as: ${finalFileName}`);
    try {
      // Simulate potential async nature or delay if needed
      await new Promise((resolve) => setTimeout(resolve, 50)); // Small delay
      exportToExcel(sampleData, columns, finalFileName);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. See console for details.");
    } finally {
      setIsExporting(false);
    }
  };

  // Styling
  const containerStyle: CSSProperties = {
    padding: "20px",
    fontFamily: "sans-serif",
    maxWidth: "800px",
    margin: "20px auto",
  };
  const inputGroupStyle: CSSProperties = {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };
  const inputStyle: CSSProperties = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    flexGrow: 1,
  };
  const buttonStyle: CSSProperties = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
    fontSize: "1em",
  };
  const tableStyle: CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };
  const thStyle: CSSProperties = {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
    backgroundColor: "#f2f2f2",
  };
  const tdStyle: CSSProperties = {
    border: "1px solid #ddd",
    padding: "10px",
  };

  return (
    <div style={containerStyle}>
      <h1>useExportToExcel Example</h1>
      <p>Exports the data displayed below into an Excel file (.xlsx).</p>
      <p>
        <i>Note: Requires the `xlsx` library to be installed.</i>
      </p>

      <div style={inputGroupStyle}>
        <label htmlFor="fileName" style={{ fontWeight: "bold" }}>
          Filename:
        </label>
        <input
          type="text"
          id="fileName"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          style={inputStyle}
          placeholder="Enter filename (without extension)"
        />
        <span>.xlsx</span>
        <button
          onClick={handleExport}
          disabled={isExporting}
          style={buttonStyle}
        >
          {isExporting ? "Exporting..." : "Export to Excel"}
        </button>
      </div>

      <h3>Sample Data Table:</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={thStyle}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sampleData.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => {
                const value = row[col.key as keyof SampleData];
                return (
                  <td key={`${row.id}-${col.key}`} style={tdStyle}>
                    {/* Basic formatting for price with type check */}
                    {col.key === "unitPrice" && typeof value === "number"
                      ? `$${value.toFixed(2)}`
                      : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExportToExcelExamplePage;
