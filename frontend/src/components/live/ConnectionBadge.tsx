import { cn } from "@/lib/utils";
import { Wifi, WifiOff, Loader2, RefreshCw } from "lucide-react";
import type { ConnectionStatus } from "@/hooks/useLiveSocket";
import { Button } from "@/components/ui/button";

type Props = {
  status: ConnectionStatus;
  attempts?: number;
  onRetry?: () => void;
};

const CONFIG: Record<
  ConnectionStatus,
  { label: string; icon: typeof Wifi; className: string }
> = {
  connected: {
    label: "Conectado",
    icon: Wifi,
    className: "border-jungle-500/40 bg-jungle-500/10 text-jungle-400",
  },
  connecting: {
    label: "Conectando...",
    icon: Loader2,
    className: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",
  },
  reconnecting: {
    label: "Conexão perdida — tentando reconectar...",
    icon: RefreshCw,
    className: "border-orange-500/40 bg-orange-500/10 text-orange-400",
  },
  disconnected: {
    label: "Desconectado",
    icon: WifiOff,
    className: "border-red-500/40 bg-red-500/10 text-red-400",
  },
};

export function ConnectionBadge({ status, attempts = 0, onRetry }: Props) {
  const { label, icon: Icon, className } = CONFIG[status];
  const spinning = status === "connecting" || status === "reconnecting";

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <span
          className={cn(
            "w-2 h-2 rounded-full",
            status === "connected" && "bg-jungle-400",
            status === "connecting" && "bg-yellow-400 animate-pulse",
            status === "reconnecting" && "bg-orange-400 animate-pulse",
            status === "disconnected" && "bg-red-500"
          )}
        />
        <Icon size={14} className={spinning ? "animate-spin" : ""} />
        <span>{label}</span>
        {status === "reconnecting" && attempts > 0 && (
          <span className="text-xs opacity-70">#{attempts}</span>
        )}
      </span>

      {(status === "disconnected" || status === "reconnecting") && onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry}>
          Reconectar agora
        </Button>
      )}
    </div>
  );
}