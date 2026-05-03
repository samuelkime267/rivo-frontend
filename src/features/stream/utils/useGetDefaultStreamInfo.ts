import { useAuth } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { getDefaultStreamInfoRequest } from "../services";

export function useGetDefaultStreamInfo() {
  const { id } = useAuth();

  return useQuery({
    enabled: !!id,
    queryKey: ["stream-default-info"],
    queryFn: getDefaultStreamInfoRequest,
  });
}
