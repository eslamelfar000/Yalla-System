import Cookies from "js-cookie";
import { useGetData } from "./useGetData";
export const useGetUserProfile = (enabled = true) => {
  return useGetData({
    endpoint: "user-data",
    queryKey: ["user-profile"],
    enabledKey: enabled,
  });
};

export default useGetUserProfile; 