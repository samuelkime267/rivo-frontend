import { STREAM_DEFAULT_INFO } from "@/data/routes";
import { GetStreamKeyResponseSchema } from "@/features/user/schemas";
import api from "@/lib/api";
import { useAuth } from "@/stores";
import { useQuery } from "@tanstack/react-query";

export function useGetStreamDetails() {
  const { id } = useAuth();

  return useQuery({
    enabled: !!id,
    queryKey: ["stream-details", id],
    queryFn: async () => {
      const response = await api.get(STREAM_DEFAULT_INFO);
      const parsed = GetStreamKeyResponseSchema.parse(response.data);
      if (!parsed.success) {
        throw new Error(parsed.message);
      }
      return parsed.user;
    },
  });
}
