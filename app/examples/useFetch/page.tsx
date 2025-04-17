"use client";

import React from "react";
// Adjust path if necessary


// Define an interface for the expected post structure
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function FetchExamplePage() {
  // Use the hook to fetch an array of posts
  const {
    data: posts,
    loading,
    error,
  } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts?_limit=10" // Fetch only 10 posts for the example
  );

  const containerStyle: React.CSSProperties = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  };

  const listStyle: React.CSSProperties = {
    listStyle: "none",
    padding: 0,
  };

  const listItemStyle: React.CSSProperties = {
    border: "1px solid #eee",
    borderRadius: "5px",
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#f9f9f9",
  };

  const titleStyle: React.CSSProperties = {
    margin: "0 0 10px 0",
    fontSize: "1.2em",
    color: "#333",
  };

  const bodyStyle: React.CSSProperties = {
    margin: 0,
    color: "#555",
  };

  const statusStyle: React.CSSProperties = {
    padding: "20px",
    textAlign: "center",
    fontSize: "1.1em",
  };

  if (loading) {
    return (
      <div style={statusStyle}>
        Loading posts...{" "}
        <span role="img" aria-label="loading">
          ⏳
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...statusStyle, color: "red" }}>
        Error fetching posts: {error.message}{" "}
        <span role="img" aria-label="error">
          ❌
        </span>
      </div>
    );
  }

  if (!posts) {
    // This case might happen if the fetch completes but returns no data (or null url initially)
    return (
      <div style={statusStyle}>No posts found or fetch not initiated.</div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1>useFetch Example</h1>
      <p>Fetches a list of posts from JSONPlaceholder API.</p>
      <ul style={listStyle}>
        {posts.map((post) => (
          <li key={post.id} style={listItemStyle}>
            <h2 style={titleStyle}>{post.title}</h2>
            <p style={bodyStyle}>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchExamplePage;
