const bcrypt = require('bcrypt');
const User = require('./models/User');
const { adminSeed } = require('./config');

async function seedAdminUser() {
  if (!adminSeed.email || !adminSeed.password) {
    return;
  }

  // If Mongo isn't connected, skip seeding.
  // (Useful for dev where auth endpoints can still exist, but login will require DB.)
  if (User.db?.readyState !== 1) {
    console.warn('[seedAdmin] Mongo not connected; skipping admin seed.');
    return;
  }

  const email = String(adminSeed.email).toLowerCase().trim();
  const password = String(adminSeed.password);

  const existing = await User.findOne({ email });
  if (existing) {
    // ensure role
    if (existing.role !== 'admin') {
      existing.role = 'admin';
      await existing.save();
    }
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  await User.create({ email, passwordHash, role: 'admin' });
}

module.exports = { seedAdminUser };

