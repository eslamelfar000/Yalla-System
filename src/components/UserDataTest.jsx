import React from "react";
import { useCurrentUserData } from "../hooks/useCurrentUserData";
import { useUserDataContext } from "../context/UserDataContext";

const UserDataTest = () => {
  const { userData, isLoading, isAuthenticated } = useCurrentUserData();
  const { updateUserData, updateUserField } = useUserDataContext();

  console.log("UserDataTest - userData:", userData);
  console.log("UserDataTest - isLoading:", isLoading);
  console.log("UserDataTest - isAuthenticated:", isAuthenticated);

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", margin: "10px" }}>
      <h3>User Data Test Component</h3>
      <p>
        <strong>User Data:</strong> {JSON.stringify(userData, null, 2)}
      </p>
      <p>
        <strong>Is Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}
      </p>
      <p>
        <strong>Is Loading:</strong> {isLoading ? "Yes" : "No"}
      </p>

      <button
        onClick={() => {
          const testData = {
            ...userData,
            name: "Test User Updated",
            testField: "test value",
          };
          updateUserData(testData);
        }}
      >
        Update User Data
      </button>

      <button
        onClick={() => {
          updateUserField("name", "Field Updated");
        }}
      >
        Update Name Field
      </button>
    </div>
  );
};

export default UserDataTest;
