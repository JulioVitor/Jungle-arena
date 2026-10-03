import { createFileRoute } from "@tanstack/react-router";
import { PartidasPage } from "@/components/games/PartidaPage";

export const Route = createFileRoute("/partidas/")({
  component: PartidasPage,
});