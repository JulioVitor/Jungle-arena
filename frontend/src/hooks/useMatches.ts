import { useQuery } from "@tanstack/react-query";
import { getMatches } from "@/services/endpoints";

export function useMatches(params?: { status?: string; page?: number }) {
  return useQuery({
    queryKey: ["matches", params],
    queryFn: () => getMatches(params),
  });
}