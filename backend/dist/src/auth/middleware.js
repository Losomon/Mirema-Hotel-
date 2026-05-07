"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.requireRole = requireRole;
const jwt_1 = require("./jwt");
function authenticate(req, res, next) {
    const header = req.headers.authorization;
    if (!header || typeof header !== 'string') {
        return res.status(401).json({
            error: { code: 'UNAUTHORIZED', message: 'Missing Authorization header' }
        });
    }
    const [scheme, token] = header.split(' ');
    if (!token || scheme !== 'Bearer') {
        return res.status(401).json({
            error: { code: 'UNAUTHORIZED', message: 'Invalid Authorization header format' }
        });
    }
    try {
        const payload = (0, jwt_1.verifyToken)(token);
        req.user = {
            id: payload.sub,
            role: payload.role,
            email: payload.email
        };
        return next();
    }
    catch {
        return res.status(401).json({
            error: { code: 'UNAUTHORIZED', message: 'Invalid or expired token' }
        });
    }
}
function requireRole(role) {
    return (req, res, next) => {
        const authedReq = req;
        if (!authedReq.user) {
            return res.status(401).json({
                error: { code: 'UNAUTHORIZED', message: 'Not authenticated' }
            });
        }
        if (authedReq.user.role !== role) {
            return res.status(403).json({
                error: { code: 'FORBIDDEN', message: 'Insufficient role' }
            });
        }
        return next();
    };
}
