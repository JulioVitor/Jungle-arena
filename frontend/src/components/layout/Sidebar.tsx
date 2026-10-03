import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Gamepad2, Radio, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const links = [
  { to: "/",         label: "Dashboard", icon: LayoutDashboard },
  { to: "/jogos",    label: "Jogos",     icon: Gamepad2 },
  { to: "/partidas/$id", label: "Partida ao vivo", icon: Radio, params: { id: "jungle-racing" } as const },
  { to: "/estado",   label: "Estado",    icon: Activity },
] as const;

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-card border"
        aria-label="Abrir menu"
      >
        ☰
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-40 w-64 bg-card border-r p-4 transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <h1 className="text-xl font-bold text-jungle-400 mb-8 flex items-center gap-2">
          🌿 Jungle Arena
        </h1>

        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon, ...rest }) => (
            <Link
              key={to}
              to={to}
              {...("params" in rest ? { params: rest.params } : {})}
              onClick={() => setOpen(false)}
              activeProps={{ className: "bg-jungle-500/15 text-jungle-400" }}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm"
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 text-xs text-muted-foreground border-t pt-4">
          Jungle Arena v0.1 · demo
        </div>
      </aside>
    </>
  );
}