const jwtSecret = process.env.JWT_SECRET;
const adminSeedEmail = process.env.ADMIN_SEED_EMAIL;
const adminSeedPassword = process.env.ADMIN_SEED_PASSWORD;

function assertConfig() {
  if (!jwtSecret) {
    // In dev, allow a predictable secret if not set.
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[auth] JWT_SECRET missing - using insecure dev fallback');
      return 'dev-insecure-secret';
    }
    throw new Error('JWT_SECRET is required');
  }
  return jwtSecret;
}

function assertMongoConnectedForAuth() {
  // If we have no MONGO_URI, we won't have a DB connection, so login/me will fail.
  if (!process.env.MONGO_URI) {
    console.warn('[auth] MONGO_URI is missing: auth endpoints will require MongoDB to be configured.');
  }
}

assertMongoConnectedForAuth();

module.exports = {
  JWT_SECRET: assertConfig(),
  adminSeed: {
    email: adminSeedEmail || null,
    password: adminSeedPassword || null
  }
};

