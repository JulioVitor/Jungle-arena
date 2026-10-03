// ─── Jogos ─────────────────────────────────────────────
export type Game = {
  id: string;
  name: string;
  emoji: string;
  playersOnline: number;
  totalMatches: number;
};

// ─── Partidas ──────────────────────────────────────────
export type MatchStatus = "live" | "finished" | "scheduled";

export type Match = {
  id: string;
  gameId: string;
  gameName: string;
  gameEmoji: string;
  status: MatchStatus;
  players: number;
  startedAt: string; // ISO
  winner?: string;
};

// ─── Dashboard ─────────────────────────────────────────
export type DashboardStats = {
  matchesToday: number;
  playersOnline: number;
  liveMatches: number;
  completionRate: number;
};

// ─── Tempo real ────────────────────────────────────────
export type RankingPlayer = {
  id: string;
  name: string;
  points: number;
  position: number;
};

// ─── Paginação genérica ────────────────────────────────
export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

// ─── Dashboard (novo formato) ──────────────────────────
export type StatValue = {
  value: number;
  delta: number;
  trend: "up" | "down";
};

export type DashboardData = {
  stats: {
    matchesToday: StatValue;
    playersOnline: StatValue;
    liveMatches: StatValue;
    completionRate: StatValue;
  };
  overview: { date: string; matches: number }[];
  liveMatches: {
    id: string;
    name: string;
    mode: string;
    current: number;
    max: number;
  }[];
  distribution: { name: string; value: number; color: string }[];
  activity: { id: string; text: string; time: string }[];
  server: {
    healthy: boolean;
    uptime: string;
    latency: string;
    region: string;
  };
};