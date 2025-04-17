"use client";

import React, { useState, useCallback } from "react";
import useMutation from "@/app/hooks/useMutation"; // Adjust import path
// import { HookDocumentation } from "@/components/hook-documentation";
// import { CodeBlock } from "@/components/code-block";
// import useMutationDoc from "@/docs/useMutation.md";

// Interfaces for our example
interface Post {
  id?: number;
  title: string;
  body: string;
  userId: number;
}

interface ApiError {
  message: string;
  status?: number;
}

// Define the actual async function that performs the mutation
const createPost = async (newPost: Omit<Post, "id">): Promise<Post> => {
  console.log("Attempting to create post:", newPost);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate potential API errors
  if (newPost.title.toLowerCase().includes("error")) {
    const error: ApiError = {
      message: "Simulated server error: Title cannot contain 'error'",
      status: 400, // Bad Request
    };
    console.error("Simulating API error:", error);
    throw error;
  }

  // Simulate a successful API call using JSONPlaceholder
  // In a real app, replace this with your actual fetch/axios call
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      const error: ApiError = {
        message: `Failed to create post: ${response.statusText}`,
        status: response.status,
      };
      console.error("API fetch error:", error);
      throw error;
    }

    const createdPost: Post = await response.json();
    console.log("API success, created post:", createdPost);
    // Note: JSONPlaceholder always returns id 101 for new posts
    return createdPost;
  } catch (networkError: any) {
    console.error("Network or fetch error:", networkError);
    const error: ApiError = {
      message: networkError.message || "A network error occurred.",
    };
    throw error;
  }
};

const UseMutationExample: React.FC = () => {
  const [title, setTitle] = useState("My Awesome Post");
  const [body, setBody] = useState("This is the content of the post.");

  // Use the mutation hook
  const {
    mutate,
    mutateAsync,
    status,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    reset,
  } = useMutation<Post, ApiError, Omit<Post, "id">>(createPost, {
    // Optional callbacks
    onMutate: (variables) => {
      console.log("[onMutate] Mutation started with:", variables);
      // Could be used for optimistic updates
    },
    onSuccess: (createdPost, variables) => {
      console.log("[onSuccess] Post created:", createdPost);
      // Optionally clear form, show success message, invalidate cache, etc.
      // setTitle("");
      // setBody("");
    },
    onError: (err, variables) => {
      console.error("[onError] Mutation failed:", err);
      // Show error notification to the user
    },
    onSettled: (data, error, variables) => {
      console.log(
        "[onSettled] Mutation finished. Data:",
        data,
        "Error:",
        error
      );
      // Always runs after success or error
    },
  });

  const handleMutate = useCallback(() => {
    const newPostData = { title, body, userId: 1 };
    console.log("Calling mutate()...");
    mutate(newPostData); // Fire-and-forget, status handled by hook
  }, [mutate, title, body]);

  const handleMutateAsync = useCallback(async () => {
    const newPostData = { title, body, userId: 1 };
    console.log("Calling mutateAsync()...");
    try {
      const result = await mutateAsync(newPostData);
      console.log("mutateAsync() succeeded in component:", result);
      alert(`Success (via mutateAsync)! Post ID: ${result.id}`);
    } catch (err) {
      console.error("mutateAsync() failed in component:", err);
      // Error is already handled by onError, but can do additional handling here
    }
  }, [mutateAsync, title, body]);

  // Code for the example block (simplified)
  const exampleCode = `
  import React, { useState, useCallback } from "react";
  import useMutation from "@/app/hooks/useMutation";

  interface Post { id?: number; title: string; body: string; userId: number; }
  interface ApiError { message: string; status?: number; }

  const createPost = async (newPost: Omit<Post, 'id'>): Promise<Post> => {
    // ... (API call logic) ...
  };

  const PostCreator: React.FC = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const { mutate, status, isLoading, reset } = 
      useMutation<Post, ApiError, Omit<Post, "id">>(createPost);

    const handleCreate = () => mutate({ title, body, userId: 1 });

    return (
      <div>
        <input value={title} onChange={e => setTitle(e.target.value)} disabled={isLoading} />
        <textarea value={body} onChange={e => setBody(e.target.value)} disabled={isLoading} />
        <button onClick={handleCreate} disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Post"}
        </button>
        <button onClick={reset} disabled={isLoading || status === 'idle'}>Reset</button>
        <p>Status: {status}</p>
      </div>
    );
  };
  `;

  return (
    // <HookDocumentation markdownContent={useMutationDoc}>
    <div>
      <h2 className="text-xl font-semibold mb-4">useMutation Example</h2>
      <div className="border p-4 rounded mb-4 space-y-3 bg-gray-50">
        <p className="text-sm">
          This demonstrates using <code>useMutation</code> to simulate creating
          a blog post. The async operation has a built-in delay and will fail if
          the title contains the word "error" (case-insensitive).
        </p>
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isLoading}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200"
            placeholder="Enter post title (try 'error' to fail)"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium mb-1">
            Body:
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            disabled={isLoading}
            rows={4}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200"
            placeholder="Enter post content"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleMutate}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {status === "loading" ? "Creating (mutate)..." : "Create (mutate)"}
          </button>
          <button
            onClick={handleMutateAsync}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-purple-300"
          >
            {status === "loading"
              ? "Creating (async)..."
              : "Create (mutateAsync)"}
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={isLoading || status === "idle"}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300"
          >
            Reset State
          </button>
        </div>
      </div>

      <div className="border p-4 rounded bg-white space-y-2">
        <h4 className="font-semibold">Mutation Status:</h4>
        <p>
          Status:{" "}
          <code
            className={`px-2 py-1 rounded text-xs font-medium ${
              status === "loading"
                ? "bg-yellow-100 text-yellow-800"
                : status === "success"
                ? "bg-green-100 text-green-800"
                : status === "error"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {status}
          </code>
        </p>
        {isLoading && <p className="text-yellow-700">Processing request...</p>}
        {isSuccess && (
          <div className="text-green-700">
            <p>Success! Last Result:</p>
            <pre className="text-xs bg-green-50 p-2 rounded mt-1">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
        {isError && (
          <div className="text-red-700">
            <p>Error:</p>
            <pre className="text-xs bg-red-50 p-2 rounded mt-1">
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* <CodeBlock code={exampleCode} language="tsx" title="Example Usage Code" /> */}
      {/* </HookDocumentation> */}
    </div>
  );
};

export default UseMutationExample;
