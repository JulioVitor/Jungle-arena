import socketio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.socket.server import sio

app = FastAPI(title="Jungle Arena API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Mock data ────────────────────────────────────────
GAMES = [
    {"id": "jungle-slots",  "name": "Jungle Slots",  "emoji": "🎰", "playersOnline": 182, "totalMatches": 4210},
    {"id": "jungle-poker",  "name": "Jungle Poker",  "emoji": "🃏", "playersOnline":  97, "totalMatches": 2180},
    {"id": "jungle-dice",   "name": "Jungle Dice",   "emoji": "🎯", "playersOnline":  64, "totalMatches": 1420},
    {"id": "jungle-racing", "name": "Jungle Racing", "emoji": "🏎️", "playersOnline":  94, "totalMatches": 1980},
]


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/dashboard")
def dashboard():
    return {
        "stats": {
            "matchesToday":   {"value": 1284, "delta": 12.5, "trend": "up"},
            "playersOnline":  {"value": 437,  "delta": 8.7,  "trend": "up"},
            "liveMatches":    {"value": 32,   "delta": 14.3, "trend": "up"},
            "completionRate": {"value": 94.7, "delta": 3.2,  "trend": "up"},
        },
        "overview": [
            {"date": "17/11", "matches": 720},
            {"date": "18/11", "matches": 890},
            {"date": "19/11", "matches": 1010},
            {"date": "20/11", "matches": 1130},
            {"date": "21/11", "matches": 930},
            {"date": "22/11", "matches": 1080},
            {"date": "23/11", "matches": 1320},
        ],
        "liveMatches": [
            {"id": "m1", "name": "Selva Sombria",   "mode": "Battle Royale",       "current": 48, "max": 100},
            {"id": "m2", "name": "Ruínas Antigas",  "mode": "Team Deathmatch",     "current": 32, "max": 50},
            {"id": "m3", "name": "Arena Selvagem",  "mode": "Capture a Bandeira",  "current": 16, "max": 20},
            {"id": "m4", "name": "Vale dos Macacos", "mode": "Dominação",          "current": 12, "max": 20},
        ],
        "distribution": [
            {"name": "Battle Royale",      "value": 48, "color": "#4ade80"},
            {"name": "Team Deathmatch",    "value": 28, "color": "#60a5fa"},
            {"name": "Capture a Bandeira", "value": 14, "color": "#fbbf24"},
            {"name": "Dominação",          "value": 10, "color": "#a78bfa"},
        ],
        "activity": [
            {"id": "a1", "text": "Nova partida iniciada em Selva Sombria", "time": "Agora há pouco"},
            {"id": "a2", "text": "Jogador entrou na sala #BR-1023",        "time": "2 min atrás"},
            {"id": "a3", "text": "Partida finalizada em Ruínas Antigas",   "time": "5 min atrás"},
            {"id": "a4", "text": "Novo recorde de jogadores online",       "time": "12 min atrás"},
        ],
        "server": {
            "healthy": True,
            "uptime": "99.98%",
            "latency": "24ms",
            "region": "SA-East",
        },
    }
@app.get("/api/games")
def games(search: str = "", page: int = 1, pageSize: int = 8):
    filtered = (
        [g for g in GAMES if search.lower() in g["name"].lower()]
        if search
        else GAMES
    )
    start = (page - 1) * pageSize
    return {
        "items": filtered[start : start + pageSize],
        "total": len(filtered),
        "page": page,
        "pageSize": pageSize,
    }


@app.get("/api/matches")
def matches(status: str | None = None, page: int = 1, pageSize: int = 20):
    data = [
        {
            "id": f"m{i}",
            "gameId": "jungle-racing",
            "gameName": "Jungle Racing",
            "gameEmoji": "🏎️",
            "status": "live",
            "players": 5,
            "startedAt": "2026-10-02T22:00:00Z",
        }
        for i in range(1, 6)
    ]
    return {"items": data, "total": len(data), "page": page, "pageSize": pageSize}


# ─── Socket.IO montado no MESMO ASGI app ──────────────
socket_app = socketio.ASGIApp(sio, other_asgi_app=app, socketio_path="socket.io")