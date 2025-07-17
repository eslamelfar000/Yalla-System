import { useQuery } from "@tanstack/react-query";
import { api } from "../config/axios.config";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      try {
        console.log("Fetching current user from /user-data");
        const response = await api.get("/user-data");
        console.log("Current user response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching current user:", error);
        console.error("Error response:", error.response);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: true, // Make sure it's enabled
  });
}; 