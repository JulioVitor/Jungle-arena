import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type Player = {
  id: string;
  name: string;
  points: number;
  position: number;
};

type Props = {
  players: Player[];
};

const MEDALS = ["🥇", "🥈", "🥉"];

export function JungleRacingMatch({ players }: Props) {
  return (
    <>
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="grid grid-cols-3 border-b px-5 py-3 text-xs uppercase tracking-wide text-muted-foreground">
          <span>Jogador</span>
          <span className="text-center">Pontos</span>
          <span className="text-right">Posição</span>
        </div>

        <AnimatePresence initial={false}>
          {players.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "grid grid-cols-3 border-b px-5 py-4 last:border-0",
                p.position === 1 && "bg-green-500/5",
              )}
            >
              <span className="flex items-center gap-2 truncate font-medium">
                {MEDALS[p.position - 1] ?? ""} {p.name}
              </span>

              <span className="text-center font-mono text-lg tabular-nums">
                {p.points}
              </span>

              <span className="flex items-center justify-end gap-1 text-right">
                {p.position === 1 && (
                  <Trophy size={14} className="text-green-500" />
                )}
                {p.position}º
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {players.length === 0 && (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Aguardando dados da partida...
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        {players.length} jogador(es) na partida
      </p>
    </>
  );
}