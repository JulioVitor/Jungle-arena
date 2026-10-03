import { api } from "./api";
import type {
  Game,
  Match,
  DashboardStats,
  RankingPlayer,
  Paginated,
} from "@/types";

export const getDashboard = () =>
  api.get<DashboardStats>("/dashboard").then((r) => r.data);

export const getGames = (params?: { search?: string; page?: number }) =>
  api.get<Paginated<Game>>("/games", { params }).then((r) => r.data);

export const getMatches = (params?: { status?: string; page?: number }) =>
  api.get<Paginated<Match>>("/matches", { params }).then((r) => r.data);

export const getMatch = (id: string) =>
  api.get<Match>(`/matches/${id}`).then((r) => r.data);

export const getLiveRanking = (matchId: string) =>
  api.get<RankingPlayer[]>(`/matches/${matchId}/ranking`).then((r) => r.data);