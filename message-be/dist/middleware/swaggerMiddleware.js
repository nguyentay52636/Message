"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerCompression = exports.swaggerRequestHandler = exports.swaggerOptimization = void 0;
const compression_1 = __importDefault(require("compression"));
// Middleware to optimize Swagger performance
const swaggerOptimization = (req, res, next) => {
    // Add cache headers for Swagger UI assets
    if (req.path.startsWith('/api-docs')) {
        // Cache static assets for 1 hour
        res.set('Cache-Control', 'public, max-age=3600');
    }
    next();
};
exports.swaggerOptimization = swaggerOptimization;
// Middleware to handle Swagger requests efficiently
const swaggerRequestHandler = (req, res, next) => {
    // Add request timeout for Swagger operations
    req.setTimeout(30000); // 30 seconds
    // Add performance headers
    res.set('X-Response-Time', '0ms');
    next();
};
exports.swaggerRequestHandler = swaggerRequestHandler;
// Middleware to compress Swagger responses
exports.swaggerCompression = (0, compression_1.default)({
    filter: (req, res) => {
        // Only compress Swagger-related requests
        if (req.path.startsWith('/api-docs')) {
            return compression_1.default.filter(req, res);
        }
        return false;
    },
    level: 6, // Balanced compression level
    threshold: 1024, // Only compress responses larger than 1KB
});
//# sourceMappingURL=swaggerMiddleware.js.map