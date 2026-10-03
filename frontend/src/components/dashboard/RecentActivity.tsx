import { UserPlus, Trophy, Sparkles, Flag } from "lucide-react";

type Item = { id: string; text: string; time: string };

const ICONS = [Flag, UserPlus, Sparkles, Trophy];

export function RecentActivity({ items }: { items: Item[] }) {
  return (
    <ul className="space-y-3">
      {items.map((a, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <li key={a.id} className="flex items-start gap-3">
            <div className="p-1.5 rounded-md bg-muted text-muted-foreground shrink-0">
              <Icon size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{a.text}</p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{a.time}</span>
          </li>
        );
      })}
    </ul>
  );
}