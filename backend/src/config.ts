const jwtSecret = process.env.JWT_SECRET;
const adminSeedEmail = process.env.ADMIN_SEED_EMAIL;
const adminSeedPassword = process.env.ADMIN_SEED_PASSWORD;

function assertConfig() {
  if (!jwtSecret) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('[auth] JWT_SECRET missing - using insecure dev fallback');
      return 'dev-insecure-secret';
    }
    throw new Error('JWT_SECRET is required');
  }
  return jwtSecret;
}

function assertMongoConnectedForAuth() {
  if (!process.env.MONGO_URI) {
    // eslint-disable-next-line no-console
    console.warn('[auth] MONGO_URI is missing: auth endpoints will require MongoDB to be configured.');
  }
}

assertMongoConnectedForAuth();

export const JWT_SECRET = assertConfig();

export const adminSeed = {
  email: adminSeedEmail || null,
  password: adminSeedPassword || null
};

