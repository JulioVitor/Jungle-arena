import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/dashboard/DashboardPage";

// import { Layers, Users, Radio, TrendingUp } from "lucide-react";
// import { useDashboard } from "@/hooks/useDashboard";
// import { StateView } from "@/components/StateView";
// import { Header } from "@/components/layout/Header";
// import { StatCard } from "@/components/dashboard/StatCard";
// import { DashboardCard } from "@/components/ui/DashboardCard";
// import { OverviewChart } from "@/components/dashboard/OverviewChart";
// import { LiveMatchesList } from "@/components/dashboard/LiveMatchesList";
// import { DistributionChart } from "@/components/dashboard/DistributionChart";
// import { RecentActivity } from "@/components/dashboard/RecentActivity";
// import { ServerStatus } from "@/components/dashboard/ServerStatus";
// import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

