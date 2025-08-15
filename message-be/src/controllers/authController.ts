import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { createToken, createTokenRef } from "../utils/jwt";
import { ResponseApi } from "../config/response";
import User from "../models/user";
// import { isValidEmail, isValidPassword, isValidPhone } from "../middleware/validation"; 

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

    const newUser = await User.create({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password: hashedPassword,
      avatar: "",
      status: "online",
      lastSeen: new Date(),
    });
    

    return ResponseApi(
      res,
      200,
      {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          phone: newUser.phone,
          avatar: newUser.avatar,
          status: newUser.status,
          lastSeen: newUser.lastSeen,
      },
      "Đăng ký thành công"
    );
  } catch (err: any) {
    

    
    return ResponseApi(res, 500, null, "Lỗi server, vui lòng thử lại sau");
  }
};