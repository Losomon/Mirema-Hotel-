const bcrypt = require('bcrypt');
const User = require('../models/User');

(async () => {
  try {
    const email = process.env.ADMIN_SEED_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_SEED_PASSWORD || 'adminpass';

    console.log('Trying user lookup for', email);
    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    console.log('User found?', !!user);
    if (!user) process.exit(2);

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    console.log('Password matches?', ok);
    process.exit(ok ? 0 : 3);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

