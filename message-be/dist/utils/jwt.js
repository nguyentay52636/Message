"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTokenRef = exports.createTokenRef = exports.midVerification = exports.dataToken = exports.checkToken = exports.createToken = void 0;
// utils/jwt.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../config/response");
const ACCESS_SECRET = "key_token";
const REFRESH_SECRET = "key_token2";
// Tạo Access Token
const createToken = (data) => {
    const options = {
        algorithm: "HS256",
        expiresIn: "10m",
    };
    return jsonwebtoken_1.default.sign(data, ACCESS_SECRET, options);
};
exports.createToken = createToken;
// Kiểm tra Access Token
const checkToken = (token) => {
    return jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
};
exports.checkToken = checkToken;
// Lấy dữ liệu từ Token mà không verify
const dataToken = (token) => {
    return jsonwebtoken_1.default.decode(token);
};
exports.dataToken = dataToken;
// Middleware xác thực Access Token
const midVerification = (req, res, next) => {
    const token = req.headers["x-access-token"]?.toString() ||
        req.body.token ||
        req.query.token?.toString() ||
        req.cookies?.token;
    if (!token) {
        return (0, response_1.ResponseApi)(res, 400, null, "Token không hợp lệ");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
        req.decoded = decoded;
        next();
    }
    catch (err) {
        return (0, response_1.ResponseApi)(res, 400, null, "Token không hợp lệ");
    }
};
exports.midVerification = midVerification;
// Tạo Refresh Token
const createTokenRef = (data) => {
    const options = {
        algorithm: "HS256",
        expiresIn: "10s",
    };
    return jsonwebtoken_1.default.sign(data, REFRESH_SECRET, options);
};
exports.createTokenRef = createTokenRef;
// Kiểm tra Refresh Token
const checkTokenRef = (token) => {
    return jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
};
exports.checkTokenRef = checkTokenRef;
//# sourceMappingURL=jwt.js.map