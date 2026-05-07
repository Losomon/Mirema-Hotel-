# Mirema Hotel Backend (Node/Express + MongoDB)

## Features
- ✅ REST API: rooms (full CRUD), bookings (full CRUD)
- ✅ MongoDB persistence with Mongoose ODM
- ✅ Zod schema validation for all endpoints
- ✅ Pagination & sorting on list endpoints
- ✅ JWT authentication with admin/member roles
- ✅ Admin-only room/booking management
- ✅ CORS enabled, health check endpoint

## Quick Start

1. **Install & Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

2. **Configure `.env`**
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mirema
   JWT_SECRET=your-secret-key
   ADMIN_SEED_EMAIL=admin@mirema.local
   ADMIN_SEED_PASSWORD=admin123
   ```

3. **Start MongoDB** (local or Atlas)
   ```bash
   # Local: mongod
   # Or set MONGO_URI for MongoDB Atlas
   ```

4. **Run Development Server**
   ```bash
   npm run dev    # nodemon + ts-node
   npm run build  # TypeScript compilation
   npm start      # Production
   ```

5. **Test Endpoints**
   ```bash
   # Health check
   curl http://localhost:5000/health
   
   # List rooms (public)
   curl http://localhost:5000/api/rooms?page=1&limit=10
   
   # Login (get admin token)
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@mirema.local","password":"admin123"}'
   ```

## API Endpoints

### Rooms (Public + Admin)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/rooms` | Public | List active rooms |
| GET | `/api/rooms/:id` | Public | Get room by ID |
| POST | `/api/rooms` | Admin | Create new room |
| PUT | `/api/rooms/:id` | Admin | Update room |
| DELETE | `/api/rooms/:id` | Admin | Delete room |

**List Rooms - Query Parameters**:
- `page` (default: 1) - Page number
- `limit` (default: 10, max: 100) - Items per page
- `sort` (price|name|capacity) - Sort field
- `order` (asc|desc, default: asc) - Sort order

**Example**:
```bash
GET /api/rooms?page=1&limit=10&sort=price&order=asc
```

**Response**:
```json
{
  "rooms": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

**Create Room - Request Body**:
```json
{
  "name": "Deluxe Suite",
  "description": "Luxury room with ocean view",
  "price": 250,
  "capacity": 4,
  "amenities": ["WiFi", "AC", "Balcony"],
  "imageUrl": "https://example.com/deluxe.jpg",
  "isActive": true
}
```

### Bookings (Admin + Member)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/bookings` | Admin | List all bookings |
| GET | `/api/bookings/:id` | Admin | Get booking by ID |
| POST | `/api/bookings` | Member | Create new booking |
| PUT | `/api/bookings/:id` | Admin | Update booking status |
| DELETE | `/api/bookings/:id` | Admin | Delete booking |

**Create Booking - Request Body**:
```json
{
  "guestName": "John Doe",
  "guestEmail": "john@example.com",
  "guestPhone": "+1234567890",
  "roomName": "Deluxe Suite",
  "checkIn": "2024-12-20T14:00:00Z",
  "checkOut": "2024-12-23T11:00:00Z",
  "guests": 2,
  "notes": "Early check-in requested"
}
```

**Update Booking Status - Request Body**:
```json
{
  "status": "confirmed",
  "notes": "Confirmed by phone"
}
```

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | Public | Login (email/password) |
| POST | `/api/auth/logout` | Authenticated | Logout (revoke token) |
| GET | `/api/auth/me` | Authenticated | Get current user |

**Login - Request Body**:
```json
{
  "email": "admin@mirema.local",
  "password": "admin123"
}
```

**Login - Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@mirema.local",
    "role": "admin"
  }
}
```

## Validation

All endpoints use **Zod** schema validation. Validation errors return `400 Bad Request`:

```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Validation failed",
    "details": [
      {
        "code": "too_small",
        "minimum": 1,
        "type": "number",
        "path": ["capacity"],
        "message": "Capacity must be at least 1"
      }
    ]
  }
}
```

## Error Handling

All endpoints follow consistent error format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": []  // Optional validation details
  }
}
```

**Common Error Codes**:
- `BAD_REQUEST` (400) - Validation failed
- `UNAUTHORIZED` (401) - Missing/invalid token
- `FORBIDDEN` (403) - Insufficient role
- `NOT_FOUND` (404) - Resource not found
- `INTERNAL_ERROR` (500) - Server error

## Authentication

**Bearer Token Format**:
```
Authorization: Bearer <JWT_TOKEN>
```

**Getting a Token**:
```bash
# 1. Login to get token
TOKEN=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mirema.local","password":"admin123"}' \
  | jq -r '.token')

# 2. Use token in requests
curl -H "Authorization: Bearer $TOKEN" http://localhost:5000/api/rooms
```

## Models

### Room Schema
```typescript
{
  _id: ObjectId
  name: String (required, unique)
  description: String
  price: Number (required, min: 0)
  capacity: Number (required, min: 1)
  amenities: [String]
  imageUrl: String (valid URL or empty)
  isActive: Boolean (default: true)
  createdAt: Date
  updatedAt: Date
}
```

### Booking Schema
```typescript
{
  _id: ObjectId
  guestName: String (required)
  guestEmail: String (required, valid email)
  guestPhone: String (required)
  roomName: String (required)
  checkIn: String (required, ISO datetime)
  checkOut: String (required, ISO datetime > checkIn)
  guests: Number (required, min: 1)
  status: String (enum: pending|confirmed|cancelled)
  notes: String
  createdBy: ObjectId (ref: User)
  createdAt: Date
  updatedAt: Date
}
```

### User Schema
```typescript
{
  _id: ObjectId
  email: String (required, unique, lowercase)
  passwordHash: String (bcrypt hashed)
  role: String (enum: admin|member, default: member)
  createdAt: Date
  updatedAt: Date
}
```

## Environment Variables

Create `.env` from `.env.example`:

```bash
# Server
PORT=5000

# MongoDB
MONGO_URI=mongodb://localhost:27017/mirema

# JWT
JWT_SECRET=your-secret-key-change-in-production

# Admin Seed (auto-created on startup if MongoDB connected)
ADMIN_SEED_EMAIL=admin@mirema.local
ADMIN_SEED_PASSWORD=admin123
```

## Development

```bash
# Install dependencies
npm install

# Run development server (auto-reload with nodemon)
npm run dev

# Build TypeScript
npm run build

# Run compiled server
npm start

# Run test suite
npm test
```

## Testing

The backend uses **Vitest** + **Supertest** for API integration tests with an in-memory MongoDB instance.

**Test Coverage**:
- ✅ `GET /health` — health check endpoint
- ✅ `GET /api/rooms` — list rooms with pagination
- ✅ `GET /api/rooms/:id` — get single room
- ✅ `GET /api/rooms/availability` — availability engine
- ✅ `POST /api/bookings` — create booking (member)
- ✅ `GET /api/bookings/me` — user's own bookings
- ✅ `GET /api/bookings` — admin list all
- ✅ `GET /api/bookings/:id` — admin get one
- ✅ `PUT /api/bookings/:id` — admin update status
- ✅ `DELETE /api/bookings/:id` — admin delete
- ✅ Validation schemas (Zod) — all schemas unit tested

**Running Tests**:
```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Specific test file
npm test -- tests/api.test.ts
```

## Security Notes

- **Production**: Change `JWT_SECRET` to a strong random value
- **CORS**: Update to allow only known frontend origins
- **Rate Limiting**: Consider adding `express-rate-limit` for production
- **Input Validation**: Zod schemas prevent injection attacks
- **Passwords**: Always use bcrypt for hashing (already implemented)

## MongoDB Setup

### Local MongoDB
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# MongoDB installed as service, auto-starts

# Verify
mongo --version
mongosh
```

### MongoDB Atlas
1. Create cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/mirema`
3. Update `.env` with `MONGO_URI`

## Notes

- Admin user is auto-seeded on first startup (if env vars set)
- Timestamps (`createdAt`, `updatedAt`) auto-managed by MongoDB
- All responses use consistent error format
- Pagination defaults: page=1, limit=10
- Sort order on list endpoints: `asc` (ascending) or `desc` (descending)

