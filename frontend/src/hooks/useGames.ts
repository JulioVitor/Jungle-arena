import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getGames } from "@/services/endpoints";

export function useGames(search: string, page: number) {
  return useQuery({
    queryKey: ["games", { search, page }],
    queryFn: () => getGames({ search, page }),
    placeholderData: keepPreviousData,
  });
}