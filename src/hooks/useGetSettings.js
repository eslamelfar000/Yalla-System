import { useGetData } from "./useGetData";

export const useGetSettings = (enabled = true) => {
  return useGetData({
    endpoint: "dashboard/get-settings",
    queryKey: ["settings"],
    enabledKey: enabled,
  });
}; 