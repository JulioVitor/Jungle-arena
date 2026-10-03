import asyncio
import random
from datetime import datetime, timezone

import socketio

sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=["http://localhost:5173"],
    logger=False,
    engineio_logger=False,
)

# ─── Estado em memória da partida ─────────────────────
PLAYERS = [
    {"id": "p1", "name": "Carlos", "points": 820, "position": 1},
    {"id": "p2", "name": "Marcos", "points": 790, "position": 2},
    {"id": "p3", "name": "João",   "points": 745, "position": 3},
    {"id": "p4", "name": "Rafa",   "points": 700, "position": 4},
    {"id": "p5", "name": "Bia",    "points": 655, "position": 5},
]

_broadcast_task: asyncio.Task | None = None
_lock = asyncio.Lock()


def _recompute_positions() -> None:
    PLAYERS.sort(key=lambda p: -p["points"])
    for i, p in enumerate(PLAYERS):
        p["position"] = i + 1


async def _tick_loop() -> None:
    """Emite atualizações de ranking a cada 1.5s."""
    while True:
        try:
            await asyncio.sleep(1.5)
            async with _lock:
                for p in PLAYERS:
                    # Movimento realista: alguns pontos ganham, outros perdem
                    p["points"] = max(0, p["points"] + random.randint(-15, 45))
                _recompute_positions()
            await sio.emit("ranking:update", {
                "players": PLAYERS,
                "updatedAt": datetime.now(timezone.utc).isoformat(),
            })
        except asyncio.CancelledError:
            break
        except Exception as exc:  # nunca deixa o loop morrer
            print(f"[socket] tick error: {exc}")
            await asyncio.sleep(1)


@sio.event
async def connect(sid: str, environ: dict) -> None:
    global _broadcast_task
    print(f"[socket] ✅ conectado: {sid}")

    # Envia snapshot imediato
    _recompute_positions()
    await sio.emit(
        "ranking:update",
        {"players": PLAYERS, "updatedAt": datetime.now(timezone.utc).isoformat()},
        to=sid,
    )

    # Sobe o loop só uma vez
    if _broadcast_task is None or _broadcast_task.done():
        _broadcast_task = asyncio.create_task(_tick_loop())


@sio.event
async def disconnect(sid: str, reason: str | None = None) -> None:
    print(f"[socket] ❌ desconectado: {sid} ({reason})")