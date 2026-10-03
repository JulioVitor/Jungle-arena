import { Link } from "@tanstack/react-router";
import { Users, Trophy, ArrowRight } from "lucide-react";

const games = [
  {
    id: "jungle-slots",
    name: "Jungle Slots",
    emoji: "🎰",
    playersOnline: 182,
    totalMatches: 4210,
    description: "Teste sua sorte nas máquinas da selva.",
  },
  {
    id: "jungle-poker",
    name: "Jungle Poker",
    emoji: "🃏",
    playersOnline: 97,
    totalMatches: 2180,
    description: "Estratégia, blefe e grandes jogadas.",
  },
  {
    id: "jungle-dice",
    name: "Jungle Dice",
    emoji: "🎯",
    playersOnline: 64,
    totalMatches: 1420,
    description: "Aposte nos dados e encare a sorte.",
  },
  {
    id: "jungle-racing",
    name: "Jungle Racing",
    emoji: "🏎️",
    playersOnline: 94,
    totalMatches: 1980,
    description: "Velocidade, competição e muita adrenalina.",
  },
];

export function PartidasPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold md:text-4xl">
          Partidas
        </h1>

        <p className="mt-2 text-muted-foreground">
          Escolha um jogo para acompanhar as partidas ao vivo.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {games.map((game) => (
          <Link
            key={game.id}
            to="/partidas/$id"
            params={{ id: game.id }}
            className="group"
          >
            <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-3xl">
                    {game.emoji}
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">
                      {game.name}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {game.description}
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={20}
                  className="text-muted-foreground transition-transform group-hover:translate-x-1"
                />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/50 p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users size={15} />
                    Jogadores online
                  </div>

                  <p className="mt-1 text-lg font-semibold">
                    {game.playersOnline.toLocaleString("pt-BR")}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/50 p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Trophy size={15} />
                    Partidas
                  </div>

                  <p className="mt-1 text-lg font-semibold">
                    {game.totalMatches.toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="rounded-lg bg-green-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors group-hover:bg-green-700">
                  Ver partidas
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}