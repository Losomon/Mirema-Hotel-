"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./src/auth/routes"));
const routes_2 = __importDefault(require("./src/rooms/routes"));
const routes_3 = __importDefault(require("./src/bookings/routes"));
const seedAdmin_1 = require("./src/seedAdmin");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/health', (req, res) => res.json({ status: 'OK', message: 'Mirema Backend running!' }));
app.use('/api/auth', routes_1.default);
app.use('/api/rooms', routes_2.default);
app.use('/api/bookings', routes_3.default);
async function start() {
    if (process.env.MONGO_URI) {
        try {
            await mongoose_1.default.connect(process.env.MONGO_URI);
            console.log('MongoDB connected');
            await (0, seedAdmin_1.seedAdminUser)();
            console.log('Admin seed complete (if env configured)');
        }
        catch (err) {
            console.log('Mongo connection failed (ok for dev):', err?.message ?? err);
        }
    }
    else {
        console.log('No MONGO_URI - using mock data (production: set .env)');
    }
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
}
start();
