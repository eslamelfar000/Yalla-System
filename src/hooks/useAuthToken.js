import Cookies from 'js-cookie';

const TOKEN_KEY = 'yall_auth_token';

const useAuthToken = () => {
  const setToken = (token, options = {}) => {
    if (!token) return console.warn("Empty token. Not setting.");
    Cookies.set(TOKEN_KEY, token, {
      path: '/',
      secure: true,          // Only sent over HTTPS
      sameSite: 'Strict',    // Prevent CSRF
      expires: 365 * 10, // 10 years
      ...options
    });
    };

  const getToken = () => Cookies.get(TOKEN_KEY) || null;

  const removeToken = () => Cookies.remove(TOKEN_KEY, { path: "/" });

  // Comprehensive logout function that clears all authentication data
  const logout = () => {
    // Remove cookie token
    removeToken();
    
    // Clear all possible token storage locations
    localStorage.removeItem('yall_auth_token');
    sessionStorage.removeItem('yall_auth_token');
    localStorage.removeItem('yall_auth_token');
    sessionStorage.removeItem('yall_auth_token');
    localStorage.removeItem('yall_access_token');
    sessionStorage.removeItem('yall_access_token');
    
    // Clear user data
    localStorage.removeItem('yall_user_data');
    sessionStorage.removeItem('yall_user_data');
    
    // Clear any other auth-related data
    localStorage.removeItem('yall_user');
    sessionStorage.removeItem('yall_user');
    
    console.log('All authentication data cleared');
  };

  return {
    setToken,
    getToken,
    removeToken,
    logout,
  };
};

export default useAuthToken;