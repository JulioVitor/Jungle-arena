# 🌿 Jungle Arena

Dashboard de partidas de jogos online com **atualização em tempo real**.
Projeto full-stack de demonstração focado em **estados assíncronos**, **comunicação WebSocket** e **UI responsiva**.

> ⚠️ Demo — sem dinheiro real, apostas ou pagamentos.

## ✨ Features

- 📊 **Dashboard** com KPIs, gráficos e status do servidor
- 🎮 **Catálogo de jogos** com busca, filtros e paginação
- 🔴 **Partida ao vivo** com ranking atualizado a cada ~1.5s via Socket.IO
- 🟢 **Status de conexão em tempo real** (conectado / reconectando / desconectado)
- 🧪 **Página "Estado"** demonstrando os 4 estados assíncronos: loading, erro, vazio e sucesso
- 📱 **Responsivo de verdade** (mobile-first, sidebar drawer)

## 🧱 Stack

**Frontend**
- React 19 + TypeScript + Vite
- TanStack Router (file-based, type-safe)
- TanStack Query (cache, retry, estados)
- Axios
- Tailwind CSS v4 + shadcn/ui
- Socket.IO Client
- Recharts

**Backend**
- FastAPI
- python-socketio (ASGI)
- Uvicorn

## 🚀 Como rodar

### Backend
\`\`\`bash
cd backend
python -m venv .venv
source .venv/bin/activate       # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:socket_app --reload --port 8000
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Abre http://localhost:5173

## 📂 Estrutura

\`\`\`
jungle-arena/
├── backend/
│   └── app/
│       ├── main.py            # FastAPI + Socket.IO montados juntos
│       └── socket/server.py   # loop de broadcast do ranking
└── frontend/
    └── src/
        ├── components/        # UI reutilizável
        ├── hooks/             # useDashboard, useLiveSocket, ...
        ├── routes/            # file-based routing
        ├── services/          # axios + endpoints
        └── types/             # contratos
\`\`\`

## 🎯 Estados assíncronos

Todos os dados passam pelo `<StateView />`, que resolve:

| Estado | Gatilho | UI |
|---|---|---|
| **Loading** | primeira execução sem cache | spinner + texto |
| **Erro** | exceção no `queryFn` | alerta + "Tentar novamente" |
| **Vazio** | resposta vazia (`[]`) | ícone + mensagem |
| **Sucesso** | dados recebidos | render do conteúdo |

Teste em `/estado`.

## 📡 Tempo real

O backend emite `ranking:update` a cada 1.5s. O frontend consome via `useLiveSocket`, que expõe:

- `status`: `connecting` | `connected` | `reconnecting` | `disconnected`
- `players`: ranking atual
- `attempts`: contador de tentativas de reconexão
- `forceReconnect()`: força reconexão manual

**Teste:** derrube o backend durante a partida. A UI mostra "Conexão perdida — tentando reconectar..." e volta sozinha quando o backend sobe.

## 📸 Screenshots

_(adicionar depois)_

## 📝 Licença

MIT