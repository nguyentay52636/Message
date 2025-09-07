"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const Router = express_1.default.Router();
Router.post("/login", authController_1.login);
Router.post("/signup", authController_1.signUp);
Router.post("/verify-otp", authController_1.verifyOTP);
Router.post("/resend-otp", authController_1.resendOTP);
exports.default = Router;
//# sourceMappingURL=authRouter.js.map