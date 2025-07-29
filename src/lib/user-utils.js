import { useQueryClient } from "@tanstack/react-query";

/**
 * Updates localStorage with user data and invalidates/refetches related queries
 * @param {Object} updatedUserData - The updated user data object
 */
export const updateUserData = (updatedUserData) => {
  // Update localStorage
  localStorage.setItem("user_data", JSON.stringify(updatedUserData));
  
  // Get query client instance
  const queryClient = useQueryClient();
  
  // Invalidate and refetch related queries
  queryClient.invalidateQueries({ queryKey: ["user-data"] });
  queryClient.invalidateQueries({ queryKey: ["user-profile"] });
  queryClient.invalidateQueries({ queryKey: ["current-user"] });
  
  console.log("Updated localStorage and invalidated queries:", updatedUserData);
};

/**
 * Marks a user's email as verified and updates localStorage
 * @param {Object} user - The user object
 */
export const markEmailAsVerified = (user) => {
  const updatedUser = {
    ...user,
    email_verified_at: new Date().toISOString(),
  };
  
  updateUserData(updatedUser);
};

/**
 * Updates a specific field for the current user
 * @param {string} field - The field name to update
 * @param {any} value - The new value
 */
export const updateUserField = (field, value) => {
  const currentUserData = JSON.parse(localStorage.getItem("user_data") || "null");
  
  if (currentUserData) {
    const updatedUserData = {
      ...currentUserData,
      [field]: value,
    };
    
    updateUserData(updatedUserData);
  }
};

/**
 * Updates localStorage whenever user_data endpoint is called
 * This function should be called after any successful API call to user_data endpoint
 * @param {Object} responseData - The response data from user_data endpoint
 */
export const updateLocalStorageFromUserData = (responseData) => {
  if (responseData?.data) {
    localStorage.setItem("user_data", JSON.stringify(responseData.data));
    console.log("Updated localStorage from user_data endpoint:", responseData.data);
  }
};

/**
 * Handles user data updates from any API endpoint that returns user data
 * @param {string} endpoint - The API endpoint that was called
 * @param {Object} responseData - The response data
 */
export const handleUserDataUpdate = (endpoint, responseData) => {
  // Check if this endpoint returns user data that should update localStorage
  const userDataEndpoints = [
    "user-data",
    "user-profile", 
    "update-profile-api",
    "current-user"
  ];
  
  if (userDataEndpoints.some(ep => endpoint.includes(ep))) {
    if (responseData?.data) {
      updateLocalStorageFromUserData(responseData);
    }
  }
};