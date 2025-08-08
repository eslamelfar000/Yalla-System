import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useUserData } from "../hooks/useUserData";
import useAuthToken from "../hooks/use-auth-token";

const UserDataContext = createContext();

export const useUserDataContext = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error(
      "useUserDataContext must be used within a UserDataProvider"
    );
  }
  return context;
};

export const UserDataProvider = ({ children }) => {
  const { getToken } = useAuthToken();
  const token = getToken();
  const {
    data: userData,
    isLoading,
    error,
    updateUserData,
    currentUserData,
  } = useUserData();
  const [localUserData, setLocalUserData] = useState(null);

  // Update local state whenever user data changes
  useEffect(() => {
    if (userData?.data) {
      setLocalUserData(userData.data);
    }
  }, [userData]);

  // Initialize with localStorage data on mount
  useEffect(() => {
    if (token) {
      const storedData = localStorage.getItem("yall_user_data");
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setLocalUserData(parsedData);
        } catch (error) {
          console.error("Error parsing localStorage user data:", error);
        }
      }
    }
  }, [token]);

  // Function to update user data and localStorage
  const updateUserDataAndStorage = useCallback(
    (newUserData) => {
      if (newUserData) {
        // Update localStorage
        localStorage.setItem("yall_user_data", JSON.stringify(newUserData));

        // Update local state
        setLocalUserData(newUserData);

        // Update the query cache
        updateUserData(newUserData);

        console.log("Updated user data and localStorage:", newUserData);
      }
    },
    [updateUserData]
  );

  // Function to update specific user field
  const updateUserField = useCallback(
    (field, value) => {
      if (localUserData) {
        const updatedUserData = {
          ...localUserData,
          [field]: value,
        };
        updateUserDataAndStorage(updatedUserData);
      }
    },
    [localUserData, updateUserDataAndStorage]
  );

  // Function to get current user data (prioritizes API data, falls back to localStorage)
  const getCurrentUser = useCallback(() => {
    return userData?.data || localUserData || currentUserData;
  }, [userData, localUserData, currentUserData]);

  // Function to clear user data (for logout)
  const clearUserData = useCallback(() => {
    localStorage.removeItem("yall_user_data");
    setLocalUserData(null);
  }, []);

  // Listen for storage changes (in case localStorage is updated from another tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "yall_user_data") {
        if (e.newValue) {
          try {
            const newData = JSON.parse(e.newValue);
            setLocalUserData(newData);
          } catch (error) {
            console.error("Error parsing storage change:", error);
          }
        } else {
          setLocalUserData(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const value = {
    userData: getCurrentUser(),
    isLoading,
    error,
    updateUserData: updateUserDataAndStorage,
    updateUserField,
    clearUserData,
    isAuthenticated: !!token && !!getCurrentUser(),
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};
