import { Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Bem-vindo de volta, Jungle Dev! 👋
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar size={14} />
          <span className="hidden sm:inline">{today}</span>
        </Button>
        <Button size="sm" className="gap-2 bg-jungle-600 hover:bg-jungle-700 text-white">
          <Download size={14} />
          Exportar
        </Button>
      </div>
    </div>
  );
}