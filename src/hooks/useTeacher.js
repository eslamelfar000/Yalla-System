import { useQuery } from "@tanstack/react-query";
import { api } from "../config/axios.config";

export const useTeacher = (teacherId) => {
  return useQuery({
    queryKey: ["teacher", teacherId],
    queryFn: async () => {
      try {
        console.log(`Fetching teacher with ID: ${teacherId}`);
        const response = await api.get(`/teachers/${teacherId}`);
        console.log("Teacher response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching teacher:", error);
        throw error;
      }
    },
    enabled: !!teacherId, // Only run if teacherId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 