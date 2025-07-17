import { useQuery } from "@tanstack/react-query";
import { api } from "../config/axios.config";

export const useAvailableSessions = (teacherId) => {
  return useQuery({
    queryKey: ["available-sessions", teacherId],
    queryFn: async () => {
      try {
        const response = await api.get(`/get-available-sessions/${teacherId}`);
        return response?.data?.data?.sessions;
      } catch (error) {
        console.error("Error fetching available sessions:", error);
        throw error;
      }
    },
    enabled: !!teacherId && teacherId !== "default",
  });
}; 