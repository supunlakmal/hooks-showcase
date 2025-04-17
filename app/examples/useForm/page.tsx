"use client";

import React, { useState } from "react";
// Adjust path if necessary


// Define the structure of our form data
interface ContactFormData {
  name: string;
  email: string;
  message: string;
  agreedToTerms: boolean;
}

function FormExamplePage() {
  const initialValues: ContactFormData = {
    name: "",
    email: "",
    message: "",
    agreedToTerms: false,
  };

  // Use the hook to manage form state
  const { values, handleChange, handleSubmit, resetForm } =
    useForm<ContactFormData>(initialValues);

  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  // This function will be called when the form is submitted successfully
  const handleFormSubmit = (formData: ContactFormData) => {
    console.log("Form Data Submitted:", formData);
    setSubmissionStatus(`Submitting data for ${formData.name}...`);
    // Simulate an API call
    setTimeout(() => {
      setSubmissionStatus(
        `Thank you, ${formData.name}! Your message has been received.`
      );
      // Optionally reset the form after successful submission
      // resetForm();
    }, 1500);
  };

  // Basic styling for the form
  const formStyle: React.CSSProperties = {
    maxWidth: "500px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#f9f9f9",
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };
  const inputStyle: React.CSSProperties = {
    display: "block",
    width: "calc(100% - 16px)", // Adjust for padding
    padding: "8px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };
  const checkboxLabelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  };
  const checkboxInputStyle: React.CSSProperties = {
    marginRight: "10px",
  };
  const buttonStyle: React.CSSProperties = {
    padding: "10px 15px",
    marginRight: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };
  const submitButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#007bff",
    color: "white",
  };
  const resetButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#6c757d",
    color: "white",
  };
  const statusStyle: React.CSSProperties = {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid green",
    borderRadius: "4px",
    backgroundColor: "#e6ffed",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>useForm Example</h1>
      <p>Manages form state, input changes, and submission.</p>

      <form onSubmit={handleSubmit(handleFormSubmit)} style={formStyle}>
        <label htmlFor="name" style={labelStyle}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name" // Must match key in initialValues
          value={values.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label htmlFor="email" style={labelStyle}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label htmlFor="message" style={labelStyle}>
          Message:
        </label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange} // Also works for textareas
          required
          rows={4}
          style={{ ...inputStyle, height: "auto" }}
        />

        <label style={checkboxLabelStyle}>
          <input
            type="checkbox"
            name="agreedToTerms" // Must match key
            checked={values.agreedToTerms} // Use 'checked' for checkboxes
            onChange={handleChange}
            required
            style={checkboxInputStyle}
          />
          I agree to the terms and conditions
        </label>

        <div>
          <button
            type="submit"
            style={submitButtonStyle}
            disabled={!values.agreedToTerms}
          >
            Submit
          </button>
          <button type="button" onClick={resetForm} style={resetButtonStyle}>
            Reset Form
          </button>
        </div>

        {submissionStatus && <div style={statusStyle}>{submissionStatus}</div>}
      </form>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#eee",
          borderRadius: "4px",
        }}
      >
        <h3>Current Form State:</h3>
        <pre>
          <code>{JSON.stringify(values, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}

export default FormExamplePage;
