import { GET_STREAM_KEY } from "@/data/routes";
import { GetStreamKeyResponseSchema } from "@/features/user/schemas";
import api from "@/lib/api";
import { useAuth } from "@/stores";
import { useQuery } from "@tanstack/react-query";

export function useGetStreamKey() {
  const { id } = useAuth();

  return useQuery({
    enabled: !!id,
    queryKey: ["stream-key", id],
    queryFn: async () => {
      const response = await api.get(GET_STREAM_KEY);
      const parsed = GetStreamKeyResponseSchema.parse(response.data);
      if (!parsed.success) {
        throw new Error(parsed.message);
      }
      return parsed.data;
    },
  });
}
