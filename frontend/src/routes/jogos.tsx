import { createFileRoute } from "@tanstack/react-router";

import { GamesPage } from "@/components/games/JogosPage";

export const Route = createFileRoute("/jogos")({
  component: GamesPage,
});