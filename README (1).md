# UniSwap — Stage 1: Project Scaffold

Campus marketplace MVP. Frontend and backend are separate projects.

## Structure

```
uniswap/
  backend/     Node.js + Express (REST API)
  frontend/    React + Vite (React Router, Framer Motion, Lucide React)
```

## Run the backend

```
cd backend
npm install
cp .env.example .env
npm run dev        # or: npm start
```

Health check: http://localhost:5000/api/health

## Run the frontend

```
cd frontend
npm install
npm run dev
```

Opens at http://localhost:5173 — the page calls `/api/health` (proxied
to the backend on port 5000) and shows the backend status.

## Notes

- MySQL is not connected yet — `backend/src/config/db.js` is a stub for
  the next stage, once we build the products/users/orders tables.
- No authentication, cart, or product routes yet — this stage is purely
  the scaffold + health check, per the plan.
