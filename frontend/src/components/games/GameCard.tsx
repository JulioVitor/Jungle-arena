import { Link } from "@tanstack/react-router";
import type { Game } from "@/types";

export function GameCard({ game }: { game: Game }) {
  return (
    <Link
      to="/partidas/$id"
      params={{ id: game.id }}
      className="group rounded-xl border bg-card p-5 hover:border-jungle-500/60 hover:bg-jungle-500/5 transition-colors"
    >
      <div className="text-4xl group-hover:scale-110 transition-transform">
        {game.emoji}
      </div>
      <h3 className="font-semibold mt-3">{game.name}</h3>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>{game.playersOnline} online</span>
        <span>{game.totalMatches.toLocaleString("pt-BR")} partidas</span>
      </div>
    </Link>
  );
}