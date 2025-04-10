import axios from "axios";

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
