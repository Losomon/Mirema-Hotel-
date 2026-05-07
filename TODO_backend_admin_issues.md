# Backend/Admin/API Issue Ideas (not implemented yet)

## Admin & Role-Based Access
- [ ] Add admin role concept and authorization middleware
  - Endpoints: require `role=admin` (JWT/session) for admin routes.
- [ ] Admin auth endpoints
  - Implement `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me` (or similar).
  - Support admin + member roles.
- [ ] Member-only vs admin-only route protection
  - Ensure bookings list/creation differs for members vs admin.

## API Design & CRUD
- [ ] Real Rooms CRUD (replace mock)
  - `GET /api/rooms`
  - `GET /api/rooms/:id`
  - `POST /api/rooms` (admin)
  - `PUT /api/rooms/:id` (admin)
  - `DELETE /api/rooms/:id` (admin)
- [ ] Real Bookings CRUD
  - `GET /api/bookings` (admin)
  - `GET /api/bookings/me` (member)
  - `POST /api/bookings` (member/public)
  - `PUT /api/bookings/:id` (admin status updates)
  - `DELETE /api/bookings/:id` (admin/cancel)
- [ ] Add Room availability endpoint
  - `POST /api/availability` or `GET /api/rooms/availability?start=...&end=...`
  - Calculate availability from existing bookings.

## Data Modeling (Mongo/Mongoose)
- [ ] Add Mongoose models
  - `Room` schema (name, description, price, images, amenities, status)
  - `Booking` schema (roomId, checkIn/out, guests, guest info, status)
  - `User` schema (email, roles, password hash) if using custom auth.
- [ ] Add migrations/seed scripts
  - Seed initial rooms and sample admin user.

## Validation & Error Handling
- [ ] Request validation with Zod/Joi
  - Validate payloads for `/api/bookings` and `/api/rooms`.
- [ ] Standard error response format
  - Add error handler middleware (e.g., `{ error: { code, message, details } }`).
- [ ] Add pagination/filtering
  - `GET /api/rooms?page=&limit=`
  - `GET /api/bookings?page=&limit=&status=` (admin)

## Security
- [ ] Helmet + rate limiting
  - Add `helmet` and `express-rate-limit`.
- [ ] CSRF strategy if using cookies
  - If cookies are used for auth, add CSRF protection.
- [ ] Input sanitization
  - Prevent NoSQL injection (`express-mongo-sanitize`).
- [ ] CORS tightening
  - Allow only known frontend origins.

## Tests
- [ ] Backend unit tests
  - Test controllers/services with mocked DB.
- [ ] API integration tests
  - Use `supertest` for endpoints.

## Frontend integration (to close gaps)
- [ ] Update RoomsPage to fetch `GET /api/rooms`
  - Replace hardcoded rooms with API data.
- [ ] Update BookingPage to call `POST /api/bookings`
  - Show success/failure based on API response.
- [ ] Admin UI pages (frontend)
  - Add routes like `/admin/dashboard`, `/admin/rooms`, `/admin/bookings`.

## Deployment
- [ ] Add production environment config
  - `.env.example` improvements, config validation.
- [ ] Add health + readiness endpoints
  - `/health` (already), add `/ready` or `/metrics`.

