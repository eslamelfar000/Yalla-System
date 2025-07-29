import { useQuery } from "@tanstack/react-query";
import { api } from "../config/axios.config";
import { handleUserDataUpdate } from "../lib/user-utils";

export const useGetData = ({ endpoint, queryKey, enabledKey = true }) => {
  const query = useQuery({
    queryKey,
    enabled: !!enabledKey,
    queryFn: async () => {
      const response = await api.get(endpoint);

      // Automatically update localStorage if this is a user data endpoint
      handleUserDataUpdate(endpoint, response.data);

      return response.data;
    },
  });

  return { ...query };
};
