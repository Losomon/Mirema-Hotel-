# Mirema Hotel Backend (Node/Express + MongoDB)

## Features
- REST API: rooms, bookings (mock data, Mongo ready)
- Mongoose ODM
- CORS enabled
- Health check endpoint

## Quick Start
1. `cd backend`
2. `npm install` (deps already available)
3. Copy `.env.example` → `.env`, set `MONGO_URI` (MongoDB local/Atlas)
4. `npm run dev` (nodemon)

**Test**:
- http://localhost:5000/health
- http://localhost:5000/api/rooms

Port: `${PORT || 5000}`

Extend with auth, real DB models. Backend done!

