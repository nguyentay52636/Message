"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const rootRouter_1 = __importDefault(require("./routers/rootRouter"));
const swagger_1 = require("./swaggerdocs/swagger");
const swaggerMiddleware_1 = require("./middleware/swaggerMiddleware");
const monggodb_1 = __importDefault(require("./connection/monggodb"));
const app = (0, express_1.default)();
(0, monggodb_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(express_1.default.json());
app.use(swaggerMiddleware_1.swaggerCompression);
app.use(swaggerMiddleware_1.swaggerRequestHandler);
app.use("/api", rootRouter_1.default);
app.use("/api-docs", swaggerMiddleware_1.swaggerOptimization, swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerSpec, swagger_1.swaggerUiOptions));
exports.default = app;
//# sourceMappingURL=index.js.map