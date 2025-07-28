// src/hooks/useAxios.js
import axios from "axios";
import { base_url } from "../constant/base_url";
import Cookies from 'js-cookie';

export function useAxios() {
  const getToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  return axios.create({
    baseURL: base_url,
    headers: {
      Authorization: `Bearer ${getToken() || ""}`,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
}

// Create api instance with authentication
const getToken = () => {
  // Check multiple possible token storage locations and keys
  const possibleTokens = [
    localStorage.getItem('token'),
    sessionStorage.getItem('token'),
    localStorage.getItem('auth_token'),
    sessionStorage.getItem('auth_token'),
    localStorage.getItem('access_token'),
    sessionStorage.getItem('access_token'),
    Cookies.get('auth_token'), // Check cookie token
  ].filter(Boolean); // Remove null/undefined values
  
  const token = possibleTokens[0]; // Use the first available token
  
  
  return token;
};

export const api = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptor to automatically add auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
    }
    
    
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("Response error:", error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      // Handle unauthorized error - redirect to login
      console.error("Unauthorized access. Please login again.");
      console.error("Response data:", error.response?.data);
      
      // Clear all authentication data
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      localStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_token');
      localStorage.removeItem('access_token');
      sessionStorage.removeItem('access_token');
      localStorage.removeItem('user_data');
      sessionStorage.removeItem('user_data');
      
      // Remove cookie token
      Cookies.remove('auth_token', { path: "/" });
      
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Example usage of the api instance:
export const fetchData = async () => {
  try {
    const response = await api.get("/some-endpoint");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

