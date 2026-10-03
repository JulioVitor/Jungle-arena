import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

type Item = {
  id: string;
  name: string;
  mode: string;
  current: number;
  max: number;
};

const THUMBS = ["🏝️", "🏛️", "⚔️", "🐒"]; // placeholder

export function LiveMatchesList({ items }: { items: Item[] }) {
  return (
    <div className="space-y-1">
      {items.map((m, i) => (
        <Link
          key={m.id}
          to="/partidas/$id"
          params={{ id: m.id }}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition group"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center text-2xl shrink-0">
            {THUMBS[i % THUMBS.length]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{m.name}</p>
            <p className="text-xs text-muted-foreground truncate">{m.mode}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-semibold text-sm text-green-600 tabular-nums">
              {m.current}/{m.max}
            </p>
            <p className="text-xs text-muted-foreground">Em andamento</p>
          </div>
          <ChevronRight
            size={16}
            className="text-muted-foreground group-hover:translate-x-0.5 transition"
          />
        </Link>
      ))}
    </div>
  );
}