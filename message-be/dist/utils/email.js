"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTPEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendOTPEmail = async (to, otp) => {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    const html = `
  <div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:20px;">
    <div style="max-width:500px; margin:auto; background:#fff; border-radius:8px; padding:30px; box-shadow:0 0 10px rgba(0,0,0,0.1);">
      <h2 style="color:#333; text-align:center;">Xác minh tài khoản</h2>
      <p style="color:#555; font-size:16px;">Mã OTP của bạn là:</p>
      <div style="text-align:center; margin:20px 0;">
        <span style="font-size:24px; font-weight:bold; color:#1c7ed6; letter-spacing:4px;">${otp}</span>
      </div>
      <p style="color:#999; font-size:14px; text-align:center;">Mã sẽ hết hạn trong 5 phút. Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
    </div>
  </div>
  `;
    await transporter.sendMail({
        from: `"My App" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Xác minh tài khoản",
        html,
    });
};
exports.sendOTPEmail = sendOTPEmail;
//# sourceMappingURL=email.js.map