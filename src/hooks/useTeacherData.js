import { useQuery } from "@tanstack/react-query";
import { api } from "../config/axios.config";

export const useTeacherData = (teacherId) => {
  
  
  return useQuery({
    queryKey: ["teacher-data", teacherId],
    queryFn: async () => {
      try {
        const response = await api.get(`/teachers/${teacherId}`);
        return response.data;
      } catch (error) {
        console.error("Error details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          url: error.config?.url
        });
        throw error;
      }
    },
    enabled: !!teacherId && teacherId !== "default",
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for getting teacher pricing information
export const useTeacherPricing = (teacherId) => {
  const { data: teacherData, isLoading, error } = useTeacherData(teacherId);
  
  return {
    teacherData: teacherData?.data,
    isLoading,
    error,
  };
};

// Hook for getting teacher availability
export const useTeacherAvailability = (teacherId) => {
  const { data: teacherData, isLoading, error } = useTeacherData(teacherId);
  
  const availability = {
    isAvailable: teacherData?.data?.is_available || false,
    availableDays: teacherData?.data?.available_days || [],
    availableHours: teacherData?.data?.available_hours || [],
    timezone: teacherData?.data?.timezone || "UTC",
  };

  return {
    availability,
    teacherData: teacherData?.data,
    isLoading,
    error,
  };
}; 