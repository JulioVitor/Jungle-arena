import { type ReactNode } from "react";
import { Loader2, AlertTriangle, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

type QueryLike<T> = {
  isLoading: boolean;
  isError: boolean;
  data: T | undefined;
  refetch: () => void;
};

type Props<T> = {
  query: QueryLike<T>;
  isEmpty?: (data: T) => boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  errorMessage?: string;
  children: (data: T) => ReactNode;
};

export function StateView<T>({
  query,
  isEmpty = (d) => Array.isArray(d) && d.length === 0,
  emptyMessage = "Nenhum resultado encontrado.",
  loadingMessage = "Carregando...",
  errorMessage = "Não foi possível carregar os dados.",
  children,
}: Props<T>) {
  const { isLoading, isError, data, refetch } = query;

  // 1️⃣ LOADING
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 py-12 text-muted-foreground">
        <Loader2 className="animate-spin" size={20} />
        <span>{loadingMessage}</span>
      </div>
    );
  }

  // 2️⃣ ERRO
  if (isError || data === undefined) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <AlertTriangle className="text-destructive" size={32} />
        <p className="text-muted-foreground">{errorMessage}</p>
        <Button variant="outline" onClick={() => refetch()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  // 3️⃣ VAZIO
  if (isEmpty(data)) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <Inbox className="text-muted-foreground" size={32} />
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  // 4️⃣ SUCESSO
  return <>{children(data)}</>;
}