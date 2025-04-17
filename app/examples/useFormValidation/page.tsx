"use client";

import React from "react";
import useFormValidation, {
  ValidationSchema,
  ValidationRule,
  FormValues,
} from "@/app/hooks/useFormValidation"; // Adjust import path
// import { HookDocumentation } from "@/components/hook-documentation";
// import { CodeBlock } from "@/components/code-block";
// import useFormValidationDoc from "@/docs/useFormValidation.md";

// --- Shared Validation Rules ---
const required: ValidationRule<any> = (value) =>
  value === "" || value === null || value === undefined || value === false
    ? "This field is required"
    : undefined;

const isEmail: ValidationRule<any> = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(String(value))
    ? "Invalid email address"
    : undefined;

const minLength =
  (min: number): ValidationRule<any> =>
  (value) =>
    value && String(value).length < min
      ? `Must be at least ${min} characters`
      : undefined;

const isNumber: ValidationRule<any> = (value) =>
  value !== "" && isNaN(Number(value)) ? "Must be a valid number" : undefined;

const minValue =
  (min: number): ValidationRule<any> =>
  (value) =>
    value !== "" && Number(value) < min ? `Must be at least ${min}` : undefined;

// --- Form Interface and Initial Values ---
interface MyFormValues extends FormValues {
  name: string;
  email: string;
  age: number | "";
  subscribe: boolean;
  feedback: string;
  role: string;
}

const initialFormData: MyFormValues = {
  name: "",
  email: "",
  age: "",
  subscribe: false,
  feedback: "",
  role: "developer",
};

// --- Validation Schema ---
const formSchema: ValidationSchema<MyFormValues> = {
  name: [required, minLength(3)],
  email: [required, isEmail],
  age: [required, isNumber, minValue(18)],
  feedback: (value, fieldName, values) => {
    // Conditional validation: feedback required only if subscribed
    if (values.subscribe && !value) {
      return "Feedback is required when subscribed";
    }
    return undefined; // No error if not subscribed or if feedback is provided
  },
  // No validation needed for 'subscribe' or 'role' in this example
};

// --- Form Component ---
const UseFormValidationExample: React.FC = () => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    hasErrors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue, // Example of manually setting field value
    validateField, // Example of manual validation
  } = useFormValidation<MyFormValues>({
    initialValues: initialFormData,
    validationSchema: formSchema,
    validateOnChange: true, // Default
    validateOnBlur: true, // Default
    validateOnSubmit: true, // Default
  });

  // Your actual submission logic
  const handleFormSubmit = async (formValues: MyFormValues) => {
    console.log("Form Submitted. Values:", formValues);
    alert("Form submission initiated! Check the console.");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Simulated submission successful!");
    alert("Form submitted successfully! Form will reset.");
    // Optionally reset form after successful submission
    resetForm();
  };

  const handlePrefill = () => {
    // Example of using setFieldValue
    setFieldValue("name", "Jane Doe");
    setFieldValue("email", "jane.doe@example.com");
    setFieldValue("age", 30);
    // Manually trigger validation after prefilling if needed
    // validateField('name');
    // validateField('email');
    // validateField('age');
  };

  const exampleCode = `
    // (See hook documentation for full example structure)
    import useFormValidation, { ValidationSchema, ValidationRule } from "@/app/hooks/useFormValidation";

    const required: ValidationRule<any> = (value) => !value ? "Required" : undefined;
    const isEmail: ValidationRule<any> = (value) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid email" : undefined;

    interface FormVals { name: string; email: string; }
    const initialVals: FormVals = { name: "", email: "" };
    const schema: ValidationSchema<FormVals> = {
      name: [required],
      email: [required, isEmail],
    };

    function MyFormComponent() {
      const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = 
        useFormValidation<FormVals>({
          initialValues: initialVals,
          validationSchema: schema,
        });

      const onSubmit = async (formValues: FormVals) => {
        console.log("Submitting:", formValues);
        await new Promise(res => setTimeout(res, 1000));
      };

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Name</label>
            <input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
            {touched.name && errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <label>Email</label>
            <input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
            {touched.email && errors.email && <p>{errors.email}</p>}
          </div>
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </form>
      );
    }
  `;

  return (
    // <HookDocumentation markdownContent={useFormValidationDoc}>
    <div>
      <h2 className="text-xl font-semibold mb-4">useFormValidation Example</h2>
      <p className="text-sm mb-4">
        A registration form demonstrating various validation rules and hook
        features.
      </p>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        className="space-y-4 p-4 border rounded bg-gray-50"
      >
        {/* General error message */}
        {hasErrors &&
          !isSubmitting &&
          Object.keys(touched).some(
            (k) => touched[k as keyof MyFormValues]
          ) && (
            <p className="text-sm text-red-600 p-2 bg-red-100 border border-red-300 rounded">
              Please review the errors below before submitting.
            </p>
          )}

        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.name && touched.name}
            aria-describedby={
              errors.name && touched.name ? "name-error" : undefined
            }
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.name && touched.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && touched.name && (
            <p id="name-error" className="mt-1 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.email && touched.email}
            aria-describedby={
              errors.email && touched.email ? "email-error" : undefined
            }
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.email && touched.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {errors.email && touched.email && (
            <p id="email-error" className="mt-1 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Age Field */}
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.age && touched.age}
            aria-describedby={
              errors.age && touched.age ? "age-error" : undefined
            }
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.age && touched.age ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.age && touched.age && (
            <p id="age-error" className="mt-1 text-xs text-red-600">
              {errors.age}
            </p>
          )}
        </div>

        {/* Role Field */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role:
          </label>
          <select
            id="role"
            name="role"
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur} // Track touched for select
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </select>
          {/* No validation error shown for role */}
        </div>

        {/* Subscribe Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="subscribe"
            name="subscribe"
            checked={values.subscribe}
            onChange={handleChange}
            onBlur={handleBlur} // Track touched for checkbox
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="subscribe"
            className="ml-2 block text-sm text-gray-900"
          >
            Subscribe to newsletter?
          </label>
        </div>

        {/* Feedback Textarea (conditionally required) */}
        <div>
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-700"
          >
            Feedback {values.subscribe ? "(Required)" : "(Optional)"}:
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={values.feedback}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={3}
            aria-invalid={!!errors.feedback && touched.feedback}
            aria-describedby={
              errors.feedback && touched.feedback ? "feedback-error" : undefined
            }
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.feedback && touched.feedback
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder={
              values.subscribe
                ? "Please provide feedback if subscribing"
                : "Optional feedback"
            }
          />
          {errors.feedback && touched.feedback && (
            <p id="feedback-error" className="mt-1 text-xs text-red-600">
              {errors.feedback}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
          >
            Reset Form
          </button>
          <button
            type="button"
            onClick={handlePrefill}
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            Prefill Data
          </button>
        </div>
      </form>

      {/* Debug Display */}
      <div className="mt-6 p-4 border rounded bg-gray-800 text-gray-100 text-xs font-mono space-y-2">
        <h4 className="text-sm font-semibold text-gray-300">Debug State:</h4>
        <pre>Values: {JSON.stringify(values, null, 2)}</pre>
        <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
        <pre>Touched: {JSON.stringify(touched, null, 2)}</pre>
        <pre>Is Submitting: {isSubmitting.toString()}</pre>
        <pre>Has Errors: {hasErrors.toString()}</pre>
      </div>

      {/* <CodeBlock code={exampleCode} language="tsx" title="Example Usage Code (Simplified)" /> */}
      {/* </HookDocumentation> */}
    </div>
  );
};

export default UseFormValidationExample;
