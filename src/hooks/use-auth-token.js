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

  return {
    setToken,
    getToken,
    removeToken,
  };
};

export default useAuthToken;
