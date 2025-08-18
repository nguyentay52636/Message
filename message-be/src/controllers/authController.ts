import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { createToken, createTokenRef } from "../utils/jwt";
import { ResponseApi } from "../config/response";
import User from "../models/user";
import { sendOTPEmail } from "../utils/email";

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const login = async (req: Request, res: Response) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return ResponseApi(res, 400, null, "Vui lòng nhập số điện thoại và mật khẩu");
  }

  try {
    const user = await User.findOne({ phone });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return ResponseApi(res, 400, null, "Số điện thoại hoặc mật khẩu không đúng");
    }

    // Kiểm tra xem user đã xác minh email chưa
    if (!user.emailVerified) {
      return ResponseApi(res, 400, null, "Vui lòng xác minh email trước khi đăng nhập");
    }

    user.status = "online";
    user.lastSeen = new Date();
    await user.save();

    const accessToken = createToken({ id: user._id, phone: user.phone });
    const refreshToken = createTokenRef({ id: user._id, phone: user.phone });

    const userInfo = {
      id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      status: user.status,
      lastSeen: user.lastSeen,
    };

    return ResponseApi(res, 200, {
      accessToken,
      refreshToken,
      user: userInfo,
    }, "Đăng nhập thành công");

  } catch (err) {
    console.error("Login error:", err);
    return ResponseApi(res, 500, null, "Lỗi server, vui lòng thử lại sau");
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password, phone } = req.body;

  if (!username || !email || !password || !phone) {
    return ResponseApi(res, 400, null, "Vui lòng nhập đầy đủ thông tin");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ResponseApi(res, 400, null, "Email đã tồn tại");
    }

    const existingUserPhone = await User.findOne({ phone });
    if (existingUserPhone) {
      return ResponseApi(res, 400, null, "Số điện thoại đã tồn tại");
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return ResponseApi(res, 400, null, "Tên người dùng đã tồn tại");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    const newUser = await User.create({
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

    await sendOTPEmail(newUser.email, otp);

    return ResponseApi(
      res,
      200,
      {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        message: "Vui lòng nhập mã OTP để xác minh tài khoản"
      },
      "Đăng ký thành công. Vui lòng nhập mã OTP để xác minh tài khoản."
    );
  } catch (err: any) {
    console.error("SignUp error:", err);
    return ResponseApi(res, 500, null, "Lỗi server, vui lòng thử lại sau");
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return ResponseApi(res, 400, null, "Vui lòng nhập email và mã OTP");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return ResponseApi(res, 400, null, "Không tìm thấy tài khoản");
    }

    if (user.emailVerified) {
      return ResponseApi(res, 400, null, "Tài khoản đã được xác minh");
    }

    if (
      user.verificationCode !== otp ||
      !user.verificationCodeExpires ||
      user.verificationCodeExpires < new Date()
    ) {
      return ResponseApi(res, 400, null, "Mã OTP không hợp lệ hoặc đã hết hạn");
    }

    user.emailVerified = true;
    user.status = "online";
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    const accessToken = createToken({ id: user._id, phone: user.phone });
    const refreshToken = createTokenRef({ id: user._id, phone: user.phone });

    const userInfo = {
      id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      status: user.status,
      lastSeen: user.lastSeen,
    };

    return ResponseApi(res, 200, {
      accessToken,
      refreshToken,
      user: userInfo,
    }, "Xác minh email thành công! Tài khoản đã được kích hoạt.");

  } catch (err) {
    console.error("Verify OTP error:", err);
    return ResponseApi(res, 500, null, "Lỗi server, vui lòng thử lại sau");
  }
};

export const resendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return ResponseApi(res, 400, null, "Vui lòng nhập email");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return ResponseApi(res, 400, null, "Không tìm thấy tài khoản");
    }

    if (user.emailVerified) {
      return ResponseApi(res, 400, null, "Tài khoản đã được xác minh");
    }

    // Tạo OTP mới
    const newOTP = generateOTP();
    user.verificationCode = newOTP;
    user.verificationCodeExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 phút
    await user.save();

    await sendOTPEmail(user.email, newOTP);

    return ResponseApi(
      res,
      200,
      { email: user.email },
      "Đã gửi lại mã OTP. Vui lòng kiểm tra email."
    );

  } catch (err) {
    console.error("Resend OTP error:", err);
    return ResponseApi(res, 500, null, "Lỗi server, vui lòng thử lại sau");
  }
};
