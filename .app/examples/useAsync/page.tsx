"use client";

import React from "react";


// --- Immediate Execution Example ---
interface UserData {
  id: number;
  name: string;
  email: string;
}

const fetchUserData = async (userId: number): Promise<UserData> => {
  console.log(`Fetching user ${userId}...`);
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

function UserProfile({ userId }: { userId: number }) {
  const {
    loading,
    error,
    value: userData,
  } = useAsync<UserData>(() => fetchUserData(userId), true); // Immediate is true by default

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div>Error fetching user data: {error.message}</div>;
  if (!userData) return <div>No user data found.</div>;

  return (
    <div
      style={{ border: "1px solid #eee", padding: "10px", marginTop: "5px" }}
    >
      <h4>User Profile (ID: {userId})</h4>
      <p>
        <strong>Name:</strong> {userData.name}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
    </div>
  );
}

// --- Manual Execution Example ---
const simulateSlowTask = (): Promise<string> => {
  console.log("Starting slow task...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        console.log("Slow task finished.");
        resolve("Task completed successfully!");
      } else {
        console.log("Slow task failed.");
        reject(new Error("Simulated task failure!"));
      }
    }, 2000); // Simulate a 2-second task
  });
};

function ManualAsyncTask() {
  const { loading, error, value, execute } = useAsync<string>(
    simulateSlowTask,
    false // Set immediate to false
  );

  return (
    <div
      style={{ border: "1px solid #eee", padding: "10px", marginTop: "5px" }}
    >
      <h4>Manual Task</h4>
      <button onClick={execute} disabled={loading}>
        {loading ? "Running Task..." : "Start Task"}
      </button>

      {loading && <p>Task is running...</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {value && <p style={{ color: "green" }}>Result: {value}</p>}
    </div>
  );
}

// --- Main Page ---
function AsyncPage() {
  const [userId, setUserId] = React.useState(1);

  return (
    <div>
      <h1>useAsync Example</h1>
      <p>Manages loading, error, and success states for async functions.</p>

      <h2>Immediate Execution Example</h2>
      <p>Fetches user data when the component mounts or `userId` changes.</p>
      <div>
        Select User ID:
        {[1, 2, 3].map((id) => (
          <button
            key={id}
            onClick={() => setUserId(id)}
            style={{
              marginLeft: "5px",
              fontWeight: userId === id ? "bold" : "normal",
            }}
          >
            {id}
          </button>
        ))}
      </div>
      <UserProfile userId={userId} />

      <hr style={{ margin: "20px 0" }} />

      <h2>Manual Execution Example</h2>
      <p>Async task is triggered only when the button is clicked.</p>
      <ManualAsyncTask />
    </div>
  );
}

export default AsyncPage;
