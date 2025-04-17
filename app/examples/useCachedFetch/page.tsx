"use client";

import React, { useState } from "react";


interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// --- Component to display user data ---
const UserDisplay: React.FC<{ userId: number; instanceId: string }> = ({
  userId,
  instanceId,
}) => {
  const { data, error, isLoading, status, refetch } = useCachedFetch<User>(
    userId ? `https://jsonplaceholder.typicode.com/users/${userId}` : null, // Fetch only if userId is valid
    {
      ttl: 15 * 1000, // Cache for 15 seconds for quicker demo
      // cacheOnlyIfFresh: true // Uncomment to only use cache if fresh
    }
  );

  console.log(`[Instance ${instanceId}] User ${userId} - Status: ${status}`);

  return (
    <div
      style={{
        border: "1px solid lightgray",
        margin: "10px",
        padding: "10px",
        opacity: isLoading ? 0.6 : 1,
        minHeight: "150px",
      }}
    >
      <h4>Instance: {instanceId}</h4>
      {isLoading && <p>Loading user {userId}...</p>}
      {error && (
        <p style={{ color: "red" }}>
          Error fetching user {userId}: {error.message}
        </p>
      )}
      {!isLoading && !error && !data && status !== "loading" && (
        <p>No data for user {userId}.</p>
      )}
      {data && (
        <>
          <p>
            User: {data.name} (@{data.username})
          </p>
          <p>Email: {data.email}</p>
          <p>Status: {status}</p>
        </>
      )}
      <div style={{ marginTop: "10px", display: "flex", gap: "5px" }}>
        <button onClick={() => refetch()} disabled={isLoading}>
          Refetch
        </button>
        <button
          onClick={() => refetch({ ignoreCache: true })}
          disabled={isLoading}
        >
          Refetch (Bypass Cache)
        </button>
      </div>
    </div>
  );
};

// --- Main App component ---
function CachedFetchPage() {
  const [selectedUserId, setSelectedUserId] = useState<number>(1);
  const [showUser, setShowUser] = useState<boolean>(true);

  return (
    <div>
      <h2>useCachedFetch Demo</h2>
      <p>Select a user ID. Data is cached in memory for 15 seconds.</p>
      <p>
        <strong>Check the browser's Network tab</strong> to see when actual
        fetch requests occur vs. when data is served from cache.
      </p>
      <div>
        <strong>Select User: </strong>
        {[1, 2, 3, 4, 5].map((id) => (
          <button
            key={id}
            onClick={() => setSelectedUserId(id)}
            style={{
              fontWeight: selectedUserId === id ? "bold" : "normal",
              marginLeft: "5px",
            }}
          >
            User {id}
          </button>
        ))}
        <button
          onClick={() => setShowUser((s) => !s)}
          style={{ marginLeft: "20px" }}
        >
          {showUser ? "Hide User Display" : "Show User Display"}
        </button>
      </div>

      {showUser && <UserDisplay userId={selectedUserId} instanceId="A" />}

      {/* Render another instance for the same user to demonstrate cache sharing */}
      {showUser && (
        <div>
          <p
            style={{
              textAlign: "center",
              margin: "15px 0",
              fontWeight: "bold",
            }}
          >
            --- Another Instance requesting User {selectedUserId} ---
          </p>
          <UserDisplay userId={selectedUserId} instanceId="B" />
        </div>
      )}
    </div>
  );
}

export default CachedFetchPage;
