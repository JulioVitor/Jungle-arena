import { motion, AnimatePresence } from "framer-motion";

import { ConnectionBadge } from "@/components/live/ConnectionBadge";
import { useLiveSocket } from "@/hooks/useLiveSocket";

import { JungleRacingMatch } from "@/components/games/JungleRacingMatch";
import { JunglePokerMatch } from "@/components/games/JunglePokerMatch";
import { JungleSlotsMatch } from "@/components/games/JungleSlotsMatch";
import { JungleDiceMatch } from "@/components/games/JungleDiceMatch";

const GAMES = {
  "jungle-racing": {
    name: "Jungle Racing",
    emoji: "🏎️",
  },
  "jungle-poker": {
    name: "Jungle Poker",
    emoji: "🃏",
  },
  "jungle-slots": {
    name: "Jungle Slots",
    emoji: "🎰",
  },
  "jungle-dice": {
    name: "Jungle Dice",
    emoji: "🎯",
  },
} as const;

type Props = {
  id: string;
};

export function LiveMatchPage({ id }: Props) {
  const game = GAMES[id as keyof typeof GAMES];

  const {
    status,
    players,
    lastUpdate,
    attempts,
    forceReconnect,
  } = useLiveSocket("http://localhost:8000");

  if (!game) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="text-5xl">❌</div>

          <h1 className="mt-4 text-2xl font-bold">
            Jogo não encontrado
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            O jogo "{id}" não existe.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold md:text-3xl">
              {game.emoji} {game.name}
            </h1>

            {status === "connected" && (
              <span className="animate-pulse rounded bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                🔴 AO VIVO
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            Partida #{id}

            {lastUpdate && (
              <>
                {" · "}
                atualizado{" "}
                {new Date(lastUpdate).toLocaleTimeString("pt-BR")}
              </>
            )}
          </p>
        </div>

        <ConnectionBadge
          status={status}
          attempts={attempts}
          onRetry={forceReconnect}
        />
      </div>

      <AnimatePresence>
        {status === "disconnected" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300"
          >
            Conexão perdida. Tentando reconectar automaticamente...
          </motion.div>
        )}
      </AnimatePresence>

      {id === "jungle-racing" && (
        <JungleRacingMatch players={players} />
      )}

      {id === "jungle-poker" && <JunglePokerMatch />}

      {id === "jungle-slots" && <JungleSlotsMatch />}

      {id === "jungle-dice" && <JungleDiceMatch />}
    </div>
  );
}