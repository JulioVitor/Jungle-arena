import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { StateView } from "@/components/StateView";
import { Button } from "@/components/ui/button";
import type { Game } from "@/types";

export const Route = createFileRoute("/estado")({
  component: EstadoPage,
});

type Mode = "success" | "empty" | "error";

function EstadoPage() {
  const [mode, setMode] = useState<Mode>("success");

  const query = useQuery<Game[]>({
    queryKey: ["estado-demo", mode],
    queryFn: async () => {
      if (mode === "error") {
        await new Promise((r) => setTimeout(r, 800));
        throw new Error("Falha simulada (modo erro)");
      }
      if (mode === "empty") {
        await new Promise((r) => setTimeout(r, 800));
        return [];
      }
      // success: espera um pouco pra dar tempo de ver o loading
      await new Promise((r) => setTimeout(r, 800));
      const res = await api.get<{ items: Game[] }>("/games");
      return res.data.items;
    },
  });

  const modes: { key: Mode; label: string; desc: string }[] = [
    { key: "success", label: "✅ Sucesso", desc: "Dados carregados" },
    { key: "empty",   label: "📭 Vazio",   desc: "Sem resultados" },
    { key: "error",   label: "❌ Erro",    desc: "Falha na requisição" },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Estado da Aplicação</h1>
        <p className="text-muted-foreground mt-1">
          Demonstração explícita dos 4 estados assíncronos:{" "}
          <span className="text-foreground font-medium">
            loading, erro, vazio e sucesso
          </span>
          .
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {modes.map((m) => (
          <Button
            key={m.key}
            variant={mode === m.key ? "default" : "outline"}
            onClick={() => setMode(m.key)}
          >
            {m.label}
          </Button>
        ))}
        <Button
          variant="ghost"
          onClick={() => query.refetch()}
          disabled={query.isFetching}
        >
          ↻ Recarregar
        </Button>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <StateView<Game[]>
          query={query}
          isEmpty={(d) => d.length === 0}
          loadingMessage="Carregando partidas..."
          emptyMessage="Nenhuma partida encontrada."
          errorMessage="Não foi possível carregar as partidas."
        >
          {(data) => (
            <div className="space-y-4">
              <p className="text-jungle-400 font-medium">
                ✅ {data.length} partida(s) encontrada(s)
              </p>
              <pre className="text-xs bg-black/40 text-zinc-200 p-4 rounded-lg overflow-auto max-h-72">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </StateView>
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p>
          💡 <strong>Loading:</strong> primeira execução da query (sem cache).
        </p>
        <p>
          💡 <strong>Erro:</strong> o <code>queryFn</code> lança exceção → TanStack
          Query captura e devolve pra UI.
        </p>
        <p>
          💡 <strong>Vazio:</strong> a query resolve com <code>[]</code>, e o{" "}
          <code>isEmpty</code> detecta.
        </p>
        <p>
          💡 <strong>Sucesso:</strong> dados reais do backend vêm pro <code>children</code>.
        </p>
      </div>
    </div>
  );
}