import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/axios.config";
import useAuthToken from "./use-auth-token";
import { useEffect } from "react";

export const useUserData = () => {
  const { getToken } = useAuthToken();
  const token = getToken();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      try {
        const response = await api.get("/user-data");
        return response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback to localStorage data if API fails
        const localUserData = JSON.parse(localStorage.getItem("user_data") || "null");
        return localUserData ? { data: localUserData } : null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!token, // Only fetch if user is authenticated
    // Clear cache when token changes (logout)
    gcTime: 0, // Don't cache when disabled
  });

  // Update localStorage whenever user data changes
  useEffect(() => {
    if (query.data?.data) {
      localStorage.setItem("user_data", JSON.stringify(query.data.data));
      console.log("Updated localStorage with user data:", query.data.data);
    }
  }, [query.data]);

  return query;
};