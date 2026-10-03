import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  delta: number;
  trend: "up" | "down";
  icon: LucideIcon;
  iconBg: "green" | "purple" | "yellow" | "blue";
};

const ICON_BG: Record<Props["iconBg"], string> = {
  green:  "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  yellow: "bg-amber-100 text-amber-600",
  blue:   "bg-blue-100 text-blue-600",
};

export function StatCard({ label, value, delta, trend, icon: Icon, iconBg }: Props) {
  const Trend = trend === "up" ? TrendingUp : TrendingDown;
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-start gap-4">
        <div className={cn("p-2.5 rounded-xl shrink-0", ICON_BG[iconBg])}>
          <Icon size={22} />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold mt-0.5 tabular-nums">{value}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-4 text-xs">
        <Trend
          size={14}
          className={trend === "up" ? "text-green-600" : "text-red-500"}
        />
        <span className={trend === "up" ? "text-green-600" : "text-red-500"}>
          {delta}%
        </span>
        <span className="text-muted-foreground">vs ontem</span>
      </div>
    </div>
  );
}