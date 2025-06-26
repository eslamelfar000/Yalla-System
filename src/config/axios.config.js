// src/hooks/useAxios.js
import axios from "axios";
import { base_url } from "../constant/base_url";
import useAuthToken from "../hooks/use-auth-token"; // adjust the path as needed

export function useAxios() {
  const { getToken } = useAuthToken();

  return axios.create({
    baseURL: base_url,
    headers: {
      Authorization: `Bearer ${getToken() || ""}`,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
}


// Replace with your actual backend API URL
const baseURL = "http://your-api-url.com/api"; // Update this with your backend URL

export const api = axios.create({
  baseURL,
});

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

