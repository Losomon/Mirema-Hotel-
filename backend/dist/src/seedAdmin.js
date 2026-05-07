"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdminUser = seedAdminUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("./models/User"));
const config_1 = require("./config");
async function seedAdminUser() {
    if (!config_1.adminSeed.email || !config_1.adminSeed.password)
        return;
    // If Mongo isn't connected, skip seeding.
    // (Useful for dev where auth endpoints can still exist, but login will require DB.)
    if (User_1.default.db?.readyState !== 1) {
        // eslint-disable-next-line no-console
        console.warn('[seedAdmin] Mongo not connected; skipping admin seed.');
        return;
    }
    const email = String(config_1.adminSeed.email).toLowerCase().trim();
    const password = String(config_1.adminSeed.password);
    const existing = await User_1.default.findOne({ email });
    if (existing) {
        if (existing.role !== 'admin') {
            existing.role = 'admin';
            await existing.save();
        }
        return;
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt_1.default.hash(password, saltRounds);
    await User_1.default.create({ email, passwordHash, role: 'admin' });
}
