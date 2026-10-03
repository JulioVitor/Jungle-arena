import { createFileRoute } from "@tanstack/react-router";
import { LiveMatchRoute } from "@/components/games/LiveMatchRoute";

export const Route = createFileRoute("/partidas/$id")({
  component: LiveMatchRoute,
});