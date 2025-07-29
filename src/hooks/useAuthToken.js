import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';

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
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
    
    // Clear user data
    localStorage.removeItem('user_data');
    sessionStorage.removeItem('user_data');
    
    // Clear any other auth-related data
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    
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