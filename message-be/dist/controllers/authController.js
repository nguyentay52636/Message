"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOTP = exports.verifyOTP = exports.signUp = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const response_1 = require("../config/response");
const user_1 = __importDefault(require("../models/user"));
const email_1 = require("../utils/email");
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const login = async (req, res) => {
    const { phone, password } = req.body;
    if (!phone || !password) {
        return (0, response_1.ResponseApi)(res, 400, null, "Vui lòng nhập số điện thoại và mật khẩu");
    }
    try {
        const user = await user_1.default.findOne({ phone });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            return (0, response_1.ResponseApi)(res, 400, null, "Số điện thoại hoặc mật khẩu không đúng");
        }
        // Kiểm tra xem user đã xác minh email chưa
        if (!user.emailVerified) {
            return (0, response_1.ResponseApi)(res, 400, null, "Vui lòng xác minh email trước khi đăng nhập");
        }
        user.status = "online";
        user.lastSeen = new Date();
        await user.save();
        const accessToken = (0, jwt_1.createToken)({ id: user._id, phone: user.phone });
        const refreshToken = (0, jwt_1.createTokenRef)({ id: user._id, phone: user.phone });
        const userInfo = {
            id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            avatar: user.avatar,
            status: user.status,
            lastSeen: user.lastSeen,
        };
        return (0, response_1.ResponseApi)(res, 200, {
            accessToken,
            refreshToken,
            user: userInfo,
        }, "Đăng nhập thành công");
    }
    catch (err) {
        console.error("Login error:", err);
        return (0, response_1.ResponseApi)(res, 500, null, "Lỗi server, vui lòng thử lại sau");
    }
};
exports.login = login;
const signUp = async (req, res) => {
    const { username, email, phone, password } = req.body;
    if (!username || !email || !password || !phone) {
        return (0, response_1.ResponseApi)(res, 400, null, "Vui lòng nhập đầy đủ thông tin");
    }
    try {
        const existingUser = await user_1.default.findOne({ email });
        if (existingUser) {
            return (0, response_1.ResponseApi)(res, 400, null, "Email đã tồn tại");
        }
        const existingUserPhone = await user_1.default.findOne({ phone });
        if (existingUserPhone) {
            return (0, response_1.ResponseApi)(res, 400, null, "Số điện thoại đã tồn tại");
        }
        const existingUsername = await user_1.default.findOne({ username });
        if (existingUsername) {
            return (0, response_1.ResponseApi)(res, 400, null, "Tên người dùng đã tồn tại");
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const otp = generateOTP();
        const newUser = await user_1.default.create({
            username: username.trim(),
            email: email.toLowerCase().trim(),
            phone: phone.trim(),
            password: hashedPassword,
            avatar: "",
            status: "offline", // Đặt offline cho đến khi xác minh email
            lastSeen: new Date(),
            emailVerified: false,
            verificationCode: otp,
            verificationCodeExpires: new Date(Date.now() + 5 * 60 * 1000), // 5 phút
        });
        await (0, email_1.sendOTPEmail)(newUser.email, otp);
        return (0, response_1.ResponseApi)(res, 200, {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            phone: newUser.phone,
            message: "Vui lòng nhập mã OTP để xác minh tài khoản"
        }, "Đăng ký thành công. Vui lòng nhập mã OTP để xác minh tài khoản.");
    }
    catch (err) {
        console.error("SignUp error:", err);
        return (0, response_1.ResponseApi)(res, 500, null, "Lỗi server, vui lòng thử lại sau");
    }
};
exports.signUp = signUp;
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return (0, response_1.ResponseApi)(res, 400, null, "Vui lòng nhập email và mã OTP");
    }
    try {
        const user = await user_1.default.findOne({ email });
        if (!user) {
            return (0, response_1.ResponseApi)(res, 400, null, "Không tìm thấy tài khoản");
        }
        if (user.emailVerified) {
            return (0, response_1.ResponseApi)(res, 400, null, "Tài khoản đã được xác minh");
        }
        if (user.verificationCode !== otp ||
            !user.verificationCodeExpires ||
            user.verificationCodeExpires < new Date()) {
            return (0, response_1.ResponseApi)(res, 400, null, "Mã OTP không hợp lệ hoặc đã hết hạn");
        }
        user.emailVerified = true;
        user.status = "online";
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        await user.save();
        const accessToken = (0, jwt_1.createToken)({ id: user._id, phone: user.phone });
        const refreshToken = (0, jwt_1.createTokenRef)({ id: user._id, phone: user.phone });
        const userInfo = {
            id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            avatar: user.avatar,
            status: user.status,
            lastSeen: user.lastSeen,
        };
        return (0, response_1.ResponseApi)(res, 200, {
            accessToken,
            refreshToken,
            user: userInfo,
        }, "Xác minh email thành công! Tài khoản đã được kích hoạt.");
    }
    catch (err) {
        console.error("Verify OTP error:", err);
        return (0, response_1.ResponseApi)(res, 500, null, "Lỗi server, vui lòng thử lại sau");
    }
};
exports.verifyOTP = verifyOTP;
const resendOTP = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return (0, response_1.ResponseApi)(res, 400, null, "Vui lòng nhập email");
    }
    try {
        const user = await user_1.default.findOne({ email });
        if (!user) {
            return (0, response_1.ResponseApi)(res, 400, null, "Không tìm thấy tài khoản");
        }
        if (user.emailVerified) {
            return (0, response_1.ResponseApi)(res, 400, null, "Tài khoản đã được xác minh");
        }
        // Tạo OTP mới
        const newOTP = generateOTP();
        user.verificationCode = newOTP;
        user.verificationCodeExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 phút
        await user.save();
        await (0, email_1.sendOTPEmail)(user.email, newOTP);
        return (0, response_1.ResponseApi)(res, 200, { email: user.email }, "Đã gửi lại mã OTP. Vui lòng kiểm tra email.");
    }
    catch (err) {
        console.error("Resend OTP error:", err);
        return (0, response_1.ResponseApi)(res, 500, null, "Lỗi server, vui lòng thử lại sau");
    }
};
exports.resendOTP = resendOTP;
//# sourceMappingURL=authController.js.map