import { useUserDataContext } from '../context/UserDataContext';

/**
 * Hook to get current user data with automatic localStorage fallback
 * @returns {Object} Current user data or null if not authenticated
 */
export const useCurrentUserData = () => {
  const { userData, isLoading, error, isAuthenticated } = useUserDataContext();
  
  return {
    userData,
    isLoading,
    error,
    isAuthenticated,
  };
};

/**
 * Hook to get current user data with localStorage fallback (for components outside context)
 * @returns {Object} Current user data from localStorage or null
 */
export const useLocalUserData = () => {
  const getLocalUserData = () => {
    try {
      const localData = localStorage.getItem('yall_user_data');
      return localData ? JSON.parse(localData) : null;
    } catch (error) {
      console.error('Error parsing localStorage user data:', error);
      return null;
    }
  };

  const userData = getLocalUserData();

  return {
    userData,
    isAuthenticated: !!userData,
  };
};
