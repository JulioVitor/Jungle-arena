import { useEffect, useState } from "react";

import { useGames } from "@/hooks/useGames";
import { StateView } from "@/components/StateView";
import { GameCard } from "@/components/games/GameCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Loader2, Search } from "lucide-react";

export function GamesPage() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);

  // Debounce 400ms
  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(t);
  }, [search]);

  const query = useGames(debounced, page);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold md:text-3xl">
          Jogos
        </h1>

        <div className="relative sm:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            placeholder="Buscar jogo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <StateView
        query={query}
        isEmpty={(d) => d.items.length === 0}
        emptyMessage={`Nenhum jogo encontrado para "${debounced}".`}
        loadingMessage="Carregando jogos..."
      >
        {(data) => (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {data.total} jogo(s) encontrado(s)
              </p>

              {query.isFetching && (
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 size={12} className="animate-spin" />
                  atualizando...
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.items.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Anterior
              </Button>

              <span className="rounded-md border bg-card px-4 py-1.5 text-sm">
                Página {page}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={data.items.length < data.pageSize}
                onClick={() => setPage((p) => p + 1)}
              >
                Próxima
              </Button>
            </div>
          </>
        )}
      </StateView>
    </div>
  );
}