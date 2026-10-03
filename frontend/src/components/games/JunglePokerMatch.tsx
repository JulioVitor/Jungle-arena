import {
  CircleDollarSign,
} from "lucide-react";

type PokerPlayer = {
  id: string;
  name: string;
  chips: number;
  position: number;
  status: "playing" | "folded" | "out";
};

type Props = {
  players: PokerPlayer[];
};

export function JunglePokerMatch({ players = [] }: Props) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          🃏 Jungle Poker
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Mesa de poker ao vivo.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-lg bg-muted/40 p-4">
            <p className="text-xs text-muted-foreground">
              Blinds
            </p>

            <p className="mt-1 font-mono font-bold">
              50 / 100
            </p>
          </div>

          <div className="rounded-lg bg-muted/40 p-4">
            <p className="text-xs text-muted-foreground">
              Pote
            </p>

            <p className="mt-1 font-mono font-bold">
              2.450
            </p>
          </div>

          <div className="rounded-lg bg-muted/40 p-4">
            <p className="text-xs text-muted-foreground">
              Jogadores
            </p>

            <p className="mt-1 font-bold">
              {players.length}
            </p>
          </div>

          <div className="rounded-lg bg-muted/40 p-4">
            <p className="text-xs text-muted-foreground">
              Tempo
            </p>

            <p className="mt-1 font-mono font-bold">
              12:42
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center py-10">
          <div className="flex gap-3">
            {["A♠", "K♥", "10♣", "7♦", "2♠"].map((card) => (
              <div
                key={card}
                className="flex h-20 w-14 items-center justify-center rounded-lg border bg-background text-xl shadow"
              >
                {card}
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Mesa atual
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border bg-card">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">
            Jogadores
          </h2>
        </div>

        <div className="divide-y">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between px-5 py-4"
            >
              <div>
                <p className="font-medium">
                  {player.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {player.status === "playing"
                    ? "Jogando"
                    : player.status === "folded"
                    ? "Desistiu"
                    : "Eliminado"}
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono">
                <CircleDollarSign size={15} />
                {player.chips}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}