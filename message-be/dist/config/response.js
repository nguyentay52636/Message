"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseApi = void 0;
const ResponseApi = (res, code, data, message) => {
    return res.status(code).json({
        status: code,
        data,
        message,
        date: new Date().toISOString(),
    });
};
exports.ResponseApi = ResponseApi;
//# sourceMappingURL=response.js.map