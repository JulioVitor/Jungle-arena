import { LiveMatchPage } from "@/components/games/LiveMatchPage";
import { Route } from "@/routes/partidas.$id";

export function LiveMatchRoute() {
  const { id } = Route.useParams();

  return <LiveMatchPage id={id} />;
}