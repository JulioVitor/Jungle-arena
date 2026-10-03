import { Layers, Users, Radio, TrendingUp } from "lucide-react";

import { useDashboard } from "@/hooks/useDashboard";
import { StateView } from "@/components/StateView";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { OverviewChart } from "@/components/dashboard/OverviewChart";
import { LiveMatchesList } from "@/components/dashboard/LiveMatchesList";
import { DistributionChart } from "@/components/dashboard/DistributionChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ServerStatus } from "@/components/dashboard/ServerStatus";
import { Button } from "@/components/ui/button";

export function DashboardPage() {
  const query = useDashboard();

  return (
    <div>
      <Header />

      <StateView
        query={query}
        loadingMessage="Carregando dashboard..."
        errorMessage="Não foi possível carregar o dashboard."
      >
        {(data) => (
          <div className="space-y-6">
            {/* Cards de estatísticas */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Partidas hoje"
                value={data.stats.matchesToday.value.toLocaleString("pt-BR")}
                delta={data.stats.matchesToday.delta}
                trend={data.stats.matchesToday.trend}
                icon={Layers}
                iconBg="green"
              />

              <StatCard
                label="Jogadores online"
                value={data.stats.playersOnline.value.toLocaleString("pt-BR")}
                delta={data.stats.playersOnline.delta}
                trend={data.stats.playersOnline.trend}
                icon={Users}
                iconBg="purple"
              />

              <StatCard
                label="Partidas ao vivo"
                value={String(data.stats.liveMatches.value)}
                delta={data.stats.liveMatches.delta}
                trend={data.stats.liveMatches.trend}
                icon={Radio}
                iconBg="yellow"
              />

              <StatCard
                label="Taxa de conclusão"
                value={`${data.stats.completionRate.value}%`}
                delta={data.stats.completionRate.delta}
                trend={data.stats.completionRate.trend}
                icon={TrendingUp}
                iconBg="blue"
              />
            </div>

            {/* Gráfico + partidas ao vivo */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <DashboardCard
                className="lg:col-span-2"
                title="Visão geral"
                subtitle="Desempenho das partidas nos últimos 7 dias"
                action={
                  <Button variant="outline" size="sm">
                    Últimos 7 dias
                  </Button>
                }
              >
                <OverviewChart data={data.overview} />
              </DashboardCard>

              <DashboardCard
                title={
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                    Partidas ao vivo
                  </span>
                }
                action={
                  <Button variant="outline" size="sm">
                    Ver todas
                  </Button>
                }
              >
                <LiveMatchesList items={data.liveMatches} />
              </DashboardCard>
            </div>

            {/* Distribuição + atividade + servidor */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <DashboardCard
                title="Distribuição de partidas"
                subtitle="Por modo de jogo"
              >
                <DistributionChart data={data.distribution} />
              </DashboardCard>

              <DashboardCard
                title={
                  <span className="flex items-center gap-2">
                    <span className="text-jungle-600">⚡</span>
                    Atividade recente
                  </span>
                }
              >
                <RecentActivity items={data.activity} />
              </DashboardCard>

              <DashboardCard
                title={
                  <span className="flex items-center gap-2">
                    <span className="text-jungle-600">🛡️</span>
                    Status do servidor
                  </span>
                }
              >
                <ServerStatus {...data.server} />
              </DashboardCard>
            </div>
          </div>
        )}
      </StateView>
    </div>
  );
}