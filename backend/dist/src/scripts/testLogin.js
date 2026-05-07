"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
(async () => {
    try {
        const email = process.env.ADMIN_SEED_EMAIL || 'admin@example.com';
        const password = process.env.ADMIN_SEED_PASSWORD || 'adminpass';
        console.log('Trying user lookup for', email);
        const user = await User_1.default.findOne({ email: String(email).toLowerCase().trim() });
        console.log('User found?', !!user);
        if (!user)
            process.exit(2);
        const ok = await bcrypt_1.default.compare(String(password), user.passwordHash);
        console.log('Password matches?', ok);
        process.exit(ok ? 0 : 3);
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
