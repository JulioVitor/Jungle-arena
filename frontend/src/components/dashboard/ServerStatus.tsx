import { CheckCircle2, XCircle } from "lucide-react";

type Props = {
  healthy: boolean;
  uptime: string;
  latency: string;
  region: string;
};

export function ServerStatus({
  healthy,
  uptime,
  latency,
  region,
}: Props) {
  return (
    <div className="space-y-4">
      <div
        className={`flex items-start gap-3 rounded-xl border p-4 ${
          healthy
            ? "border-green-200 bg-green-50"
            : "border-red-200 bg-red-50"
        }`}
      >
        {healthy ? (
          <CheckCircle2
            className="mt-0.5 shrink-0 text-green-600"
            size={20}
          />
        ) : (
          <XCircle
            className="mt-0.5 shrink-0 text-red-600"
            size={20}
          />
        )}

        <div>
          <p
            className={`text-sm font-medium ${
              healthy ? "text-green-800" : "text-red-800"
            }`}
          >
            {healthy
              ? "Todos os sistemas operacionais"
              : "Problemas detectados no servidor"}
          </p>

          <p
            className={`mt-0.5 text-xs ${
              healthy ? "text-green-700" : "text-red-700"
            }`}
          >
            {healthy ? "Saudável" : "Instável"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Uptime</p>
          <p className="mt-0.5 font-semibold tabular-nums">{uptime}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Latência média</p>
          <p className="mt-0.5 font-semibold tabular-nums">{latency}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Região</p>
          <p className="mt-0.5 font-semibold">{region}</p>
        </div>
      </div>
    </div>
  );
}