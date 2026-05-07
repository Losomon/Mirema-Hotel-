# TODO

## Backend: Implement Admin Role + API Auth #2

- [ ] Create backend auth (JWT via Authorization header)
- [ ] Add /api/auth/login, /api/auth/logout, /api/auth/me
- [ ] Add authenticate + requireRole('admin') middleware
- [ ] Add Mongo User model (email, passwordHash, role)
- [ ] Seed default admin user via env (admin seed)
- [ ] Add admin-only room management endpoints (or protect existing CRUD once added)
- [ ] Add admin-only bookings endpoints (protect list/status updates/cancel as needed)
- [ ] Update README / env example
- [ ] Run backend locally and test endpoints

