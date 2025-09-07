"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const index_1 = __importDefault(require("./index"));
const http_1 = require("http");
const socketIntegration_1 = require("./socket/socketIntegration");
const PORT = process.env.PORT || 8000;
const httpServer = (0, http_1.createServer)(index_1.default);
const io = (0, socketIntegration_1.integrateSocketWithExpress)(index_1.default, httpServer);
exports.io = io;
httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map