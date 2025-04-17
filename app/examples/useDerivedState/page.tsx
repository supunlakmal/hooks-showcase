"use client";

import React, { useState } from "react";
import useDerivedState from "@/app/hooks/useDerivedState"; // Adjust import path
// import { HookDocumentation } from "@/components/hook-documentation";
// import { CodeBlock } from "@/components/code-block";
// import useDerivedStateDoc from "@/docs/useDerivedState.md";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  lastLoginTime?: number; // Added for demonstrating non-dependency update
}

// Child component using derived state
const UserProfile: React.FC<{ user: User }> = React.memo(({ user }) => {
  console.log("[UserProfile Render] Props received:", user);

  // Derive fullName only when user.firstName or user.lastName changes
  const fullName = useDerivedState(() => {
    console.log("==> [Derived State Calculation] Calculating fullName...");
    return `${user.firstName} ${user.lastName}`;
  }, [user.firstName, user.lastName]);

  // Derive permissions string only when user.isAdmin changes
  const permissions = useDerivedState(() => {
    console.log("==> [Derived State Calculation] Calculating permissions...");
    return user.isAdmin ? "Admin" : "Standard User";
  }, [user.isAdmin]);

  // This state is NOT derived and doesn't depend on props
  const [profileVisits, setProfileVisits] = useState(0);

  return (
    <div className="border p-4 rounded bg-gray-50 space-y-2">
      <h3 className="text-lg font-semibold">User Profile (Child Component)</h3>
      <p>ID: {user.id}</p>
      <p>
        Full Name (Derived):{" "}
        <span className="font-semibold text-blue-600">{fullName}</span>
      </p>
      <p>
        Permissions (Derived):{" "}
        <span className="font-semibold text-purple-600">{permissions}</span>
      </p>
      <p>
        Last Login (Prop):{" "}
        {user.lastLoginTime
          ? new Date(user.lastLoginTime).toLocaleTimeString()
          : "N/A"}
      </p>
      <p>Profile Visits (Local State): {profileVisits}</p>
      <button
        onClick={() => setProfileVisits((v) => v + 1)}
        className="mt-2 px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
      >
        Increment Visits (Local State)
      </button>
    </div>
  );
});
UserProfile.displayName = "UserProfile"; // For React DevTools

// Parent component managing the base user state
const UseDerivedStateExample: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 101,
    firstName: "Alice",
    lastName: "Smith",
    isAdmin: false,
    lastLoginTime: Date.now(),
  });

  const updateFirstName = () => {
    setCurrentUser((prev) => ({
      ...prev,
      firstName: prev.firstName === "Alice" ? "Alicia" : "Alice",
    }));
  };

  const updateLastName = () => {
    setCurrentUser((prev) => ({
      ...prev,
      lastName: prev.lastName === "Smith" ? "Jones" : "Smith",
    }));
  };

  const toggleAdmin = () => {
    setCurrentUser((prev) => ({ ...prev, isAdmin: !prev.isAdmin }));
  };

  const updateLastLogin = () => {
    // This update should NOT cause fullName or permissions to recalculate
    setCurrentUser((prev) => ({ ...prev, lastLoginTime: Date.now() }));
  };

  const exampleCode = `
  import React, { useState } from "react";
  import useDerivedState from "@/app/hooks/useDerivedState";

  interface User { firstName: string; lastName: string; }

  const UserDisplay: React.FC<{ user: User }> = ({ user }) => {
    // Recalculates only when firstName or lastName changes
    const fullName = useDerivedState(() => {
      console.log("Calculating fullName...");
      return \`\${user.firstName} \${user.lastName}\`;
    }, [user.firstName, user.lastName]);

    return <p>Full Name: {fullName}</p>;
  };

  const App: React.FC = () => {
    const [user, setUser] = useState({ firstName: "John", lastName: "Doe" });
    // Other state that might cause re-renders
    const [counter, setCounter] = useState(0);

    return (
      <div>
        <UserDisplay user={user} />
        <button onClick={() => setUser({ ...user, firstName: "Jane" }) }>
          Change Name
        </button>
        <button onClick={() => setCounter(c => c + 1)}>
          Increment Counter (Forces Render)
        </button>
        <p>Check console to see when "Calculating fullName..." is logged.</p>
      </div>
    );
  };
  `;

  return (
    // <HookDocumentation markdownContent={useDerivedStateDoc}>
    <div>
      <h2 className="text-xl font-semibold mb-4">useDerivedState Example</h2>
      <p className="text-sm mb-4">
        This hook computes derived state memoized based on dependencies, similar
        to <code>useMemo</code>. Open the console to see when the derived values
        (Full Name, Permissions) are recalculated.
      </p>

      <div className="space-y-4">
        <UserProfile user={currentUser} />

        <div className="flex flex-wrap gap-2 p-3 border rounded bg-white">
          <h4 className="w-full text-md font-medium mb-1">Parent Controls:</h4>
          <button
            onClick={updateFirstName}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Change First Name
          </button>
          <button
            onClick={updateLastName}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Change Last Name
          </button>
          <button
            onClick={toggleAdmin}
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
          >
            Toggle Admin Status
          </button>
          <button
            onClick={updateLastLogin}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
          >
            Update Last Login (Force Parent Render)
          </button>
        </div>

        <p className="text-sm mt-4 p-3 border rounded bg-yellow-50 border-yellow-200">
          <strong>Observe:</strong> Changing First/Last Name recalculates "Full
          Name". Toggling Admin recalculates "Permissions". Updating "Last
          Login" (or clicking "Increment Visits" in the child) re-renders
          components but should <strong className="text-green-700">NOT</strong>{" "}
          trigger the derived state recalculations in the console.
        </p>
      </div>

      {/* <CodeBlock code={exampleCode} language="tsx" title="Example Usage Code (Simplified)" /> */}
      {/* </HookDocumentation> */}
    </div>
  );
};

export default UseDerivedStateExample;
