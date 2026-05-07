"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = signToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function signToken(payload) {
    return jsonwebtoken_1.default.sign({ sub: String(payload.userId), role: payload.role, email: payload.email }, config_1.JWT_SECRET, { expiresIn: '7d' });
}
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
}
