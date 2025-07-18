import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../config/axios.config";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import { toast } from "sonner"; // <-- import toast here!
import Cookies from "js-cookie";

export const useMutate = ({
  method,
  endpoint,
  queryKeysToInvalidate = [],
  text,
  onSuccess: userOnSuccess,
  onError: userOnError,
}) => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body) => {
      const response = await axiosInstance({
        method,
        url: endpoint,
        data: body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
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
      // Handle specific error messages
      let errorMessage = "Something went wrong";

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.msg) {
        errorMessage = error.response.data.msg;
      } else if (error?.response?.data) {
        // Handle "Unauthenticated." message specifically
        if (error.response.data === "Unauthenticated.") {
          errorMessage = "Session expired. Please login again.";
        } else {
          errorMessage = error.response.data;
        }
      } else if (error?.message) {
        errorMessage = error.message;
      }

      // Don't show error toast for logout if it's "Unauthenticated"
      if (endpoint === "logout" && errorMessage.includes("Unauthenticated")) {
        console.log("Logout with unauthenticated error - this is expected");
        return; // Don't show error toast
      }

      toast.error(errorMessage, {
        duration: 5000,
        style: { gap: "1rem" },
        action: { label: "close" },
      });

      if (userOnError) userOnError(error);
    },
  });

  return mutation;
};
