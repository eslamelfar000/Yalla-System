import { useQuery } from "@tanstack/react-query";
import { api } from "../config/axios.config";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      try {
        const response = await api.get("/user-data");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: true, // Make sure it's enabled
  });
}; 