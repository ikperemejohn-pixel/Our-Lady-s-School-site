# OLCSS Backend (Express + Prisma + PostgreSQL)

Features:
- JWT Auth (login)
- Classes (JSS1–SS3) seeded
- Results API (create/update + fetch)
- **PDF Report Card** generator with QR verification
- Admin seed on first run (email from `.env`, default password `Admin@123`)
- Termii webhook placeholder (ready to connect)
- Ready for **Railway** deployment

## 1) Configure environment
Create `.env` from `.env.example` and set `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, etc.

## 2) Install & Generate Prisma client
```bash
npm install
npx prisma generate
```

## 3) Migrate & Seed
```bash
npm run migrate
npm run seed
```

## 4) Start
```bash
npm start
```

API routes:
- `POST /api/auth/login` → `{ email, password }` → `{ token, user }`
- `GET /api/results/:studentId?term=...`
- `POST /api/results` → upsert a result
- `GET /api/reports/:studentId?term=...` → **download PDF**

Deploy on Railway:
- Set Env Vars (copy from `.env.example`).
- Start command: `npm run migrate && npm run seed && node src/server.js`
