"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.DB_URL || '');
        console.log('Đã kết nối MongoDB');
    }
    catch (err) {
        console.error('Kết nối MongoDB thất bại:', err.message);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=monggodb.js.map