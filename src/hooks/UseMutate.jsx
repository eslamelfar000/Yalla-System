import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../config/axios.config";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import { toast } from "sonner"; // <-- import toast here!

export const useMutate = ({
  method,
  endpoint,
  queryKeysToInvalidate = [],
  text,
  onSuccess: userOnSuccess,
}) => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body) => {
      const response = await axiosInstance({
        method,
        url: endpoint,
        data: body,
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryKeysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries(key);
      });

      toast.success(text, {
        duration: 5000,
        style: { gap: "1rem" },
        icon: <CheckBadgeIcon className="size-8 text-green-500" />,
        action: { label: "close" },
      });

      if (userOnSuccess) userOnSuccess(data);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.msg || "Something went wrong", {
        duration: 5000,
        style: { gap: "1rem" },
        action: { label: "close"},
      });
    },
  });

  return mutation;
};

