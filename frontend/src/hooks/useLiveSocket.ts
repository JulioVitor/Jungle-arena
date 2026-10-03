import { useEffect, useRef, useState, useCallback } from "react";
import { io, type Socket } from "socket.io-client";
import type { RankingPlayer } from "@/types";

export type ConnectionStatus =
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected";

type Payload = {
  players: RankingPlayer[];
  updatedAt: string;
};

export function useLiveSocket(url: string) {
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const [players, setPlayers] = useState<RankingPlayer[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 800,
      reconnectionDelayMax: 5000,
      timeout: 8000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setStatus("connected");
      setAttempts(0);
    });

    socket.on("disconnect", () => {
      setStatus("disconnected");
    });

    socket.on("connect_error", () => {
      setStatus((prev) => (prev === "connected" ? "reconnecting" : "connecting"));
    });

    // Eventos do gerenciador de reconexão
    socket.io.on("reconnect_attempt", (n) => {
      setStatus("reconnecting");
      setAttempts(n);
    });

    socket.io.on("reconnect", () => {
      setStatus("connected");
      setAttempts(0);
    });

    socket.io.on("reconnect_failed", () => {
      setStatus("disconnected");
    });

    // Payload da partida
    socket.on("ranking:update", (payload: Payload) => {
      setPlayers(payload.players);
      setLastUpdate(payload.updatedAt);
    });

    return () => {
      socket.removeAllListeners();
      socket.io.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
    };
  }, [url]);

  const forceReconnect = useCallback(() => {
    const s = socketRef.current;
    if (!s) return;
    setStatus("connecting");
    s.disconnect();
    s.connect();
  }, []);

  return { status, players, lastUpdate, attempts, forceReconnect };
}