import { useAuth } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { getStreamKeyRequest } from "../services";
import { STREAM_KEY } from "@/data/queryKeys.data";

export function useGetStreamKey() {
  const { id } = useAuth();

  return useQuery({
    enabled: !!id,
    queryKey: STREAM_KEY,
    queryFn: getStreamKeyRequest,
  });
}
