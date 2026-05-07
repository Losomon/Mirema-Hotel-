"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../auth/middleware");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.json([
        { id: 1, name: 'Standard', price: 100 },
        { id: 2, name: 'Deluxe', price: 150 },
        { id: 3, name: 'Suite', price: 250 }
    ]);
});
// Admin-only room management endpoints.
// TODO: Replace placeholder DB logic with real Room model.
router.post('/', middleware_1.authenticate, (0, middleware_1.requireRole)('admin'), (_req, res) => {
    return res.status(501).json({
        error: { code: 'NOT_IMPLEMENTED', message: 'Room creation not implemented yet' },
    });
});
router.put('/:id', middleware_1.authenticate, (0, middleware_1.requireRole)('admin'), (req, res) => {
    return res.status(501).json({
        error: { code: 'NOT_IMPLEMENTED', message: `Room update not implemented (id=${req.params.id})` },
    });
});
router.delete('/:id', middleware_1.authenticate, (0, middleware_1.requireRole)('admin'), (req, res) => {
    return res.status(501).json({
        error: { code: 'NOT_IMPLEMENTED', message: `Room delete not implemented (id=${req.params.id})` },
    });
});
exports.default = router;
