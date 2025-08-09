import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { createToken, createTokenRef } from "../utils/jwt";
import { ResponseApi } from "../config/response";
import User from "../models/user";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return ResponseApi(res, 400, null, "Vui lòng nhập email và mật khẩu");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return ResponseApi(res, 400, null, "Email hoặc mật khẩu không đúng");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return ResponseApi(res, 400, null, "Email hoặc mật khẩu không đúng");
    }

    const accessToken = createToken({ id: user._id, email: user.email });
    const refreshToken = createTokenRef({ id: user._id, email: user.email });

    user.status = "online";
    user.lastSeen = new Date();
    await user.save();

    return ResponseApi(
      res,
      200,
      {
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          status: user.status,
          lastSeen: user.lastSeen,
        },
      },
      "Đăng nhập thành công"
    );
  } catch (err: any) {
    return ResponseApi(res, 500, null, err.message);
  }
};
export const signUp = async (req: Request, res: Response) => {
    const { username, email, password, phone } = req.body;
  
    if (!username || !email || !password || !phone) {
      return ResponseApi(res, 400, null, "Vui lòng nhập đầy đủ thông tin");
    }
  
    try {
      // Kiểm tra email tồn tại chưa
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return ResponseApi(res, 400, null, "Email đã tồn tại");
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({
        username,
        email,
        phone,
        password: hashedPassword,
        status: "offline",
      });
  
      return ResponseApi(
        res,
        201,
        {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
        "Đăng ký thành công"
      );
    } catch (err: any) {
      return ResponseApi(res, 500, null, err.message);
    }
  };