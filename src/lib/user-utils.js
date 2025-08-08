import { useQueryClient } from "@tanstack/react-query";

/**
 * Updates localStorage with user data and invalidates/refetches related queries
 * @param {Object} updatedUserData - The updated user data object
 */
export const updateUserData = (updatedUserData) => {
  // Update localStorage
  localStorage.setItem("yall_user_data", JSON.stringify(updatedUserData));
  
  // Get query client instance
  const queryClient = useQueryClient();
  
  // Invalidate and refetch related queries
  queryClient.invalidateQueries({ queryKey: ["user-data"] });
  queryClient.invalidateQueries({ queryKey: ["user-profile"] });
  queryClient.invalidateQueries({ queryKey: ["current-user"] });
  
  console.log("Updated localStorage and invalidated queries:", updatedUserData);
};

/**
 * Gets current user data from localStorage
 * @returns {Object|null} Current user data or null
 */
export const getCurrentUserData = () => {
  try {
    const localData = localStorage.getItem("yall_user_data");
    return localData ? JSON.parse(localData) : null;
  } catch (error) {
    console.error("Error parsing localStorage user data:", error);
    return null;
  }
};

/**
 * Updates a specific field for the current user
 * @param {string} field - The field name to update
 * @param {any} value - The new value
 */
export const updateUserField = (field, value) => {
  const currentUserData = getCurrentUserData();
  
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
    localStorage.setItem("yall_user_data", JSON.stringify(responseData.data));
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
    "current-user",
    "login-api",
    "register-api"
  ];
  
  if (userDataEndpoints.some(ep => endpoint.includes(ep))) {
    if (responseData?.data) {
      updateLocalStorageFromUserData(responseData);
    }
  }
};

/**
 * Syncs user data across all storage mechanisms
 * @param {Object} userData - The user data to sync
 */
export const syncUserData = (userData) => {
  if (userData) {
    // Update localStorage
    localStorage.setItem("yall_user_data", JSON.stringify(userData));
    
    // Update sessionStorage as backup
    sessionStorage.setItem("yall_user_data", JSON.stringify(userData));
    
    // Trigger storage event for cross-tab sync
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'yall_user_data',
      newValue: JSON.stringify(userData),
      oldValue: localStorage.getItem('yall_user_data'),
      storageArea: localStorage
    }));
    
    console.log("Synced user data across all storage mechanisms:", userData);
  }
};

/**
 * Clears all user data from storage
 */
export const clearUserData = () => {
  localStorage.removeItem("yall_user_data");
  sessionStorage.removeItem("yall_user_data");
  localStorage.removeItem("user_data");
  sessionStorage.removeItem("user_data");
  
  console.log("Cleared all user data from storage");
};