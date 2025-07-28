import { useQuery } from "@tanstack/react-query";
import { api } from "../config/axios.config";

export const useGetData = ({ endpoint, queryKey, enabledKey = true }) => {
  const query = useQuery({
    queryKey,
    enabled: !!enabledKey,
    queryFn: async () => {
      const response = await api.get(endpoint);
      return response.data;
    },
  });

  return { ...query };
};
