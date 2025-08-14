import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { createToken, createTokenRef } from "../utils/jwt";
import { ResponseApi } from "../config/response";
import User from "../models/user";

export const login = async (req: Request, res: Response) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return ResponseApi(res, 400, null, "Vui lòng nhập số điện thoại và mật khẩu");
  }

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return ResponseApi(res, 400, null, "Số điện thoại hoặc mật khẩu không đúng");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return ResponseApi(res, 400, null, "Số điện thoại hoặc mật khẩu không đúng");
    }

    const accessToken = createToken({ id: user._id, phone: user.phone });
    const refreshToken = createTokenRef({ id: user._id, phone: user.phone });

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
          phone: user.phone,
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
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return ResponseApi(res, 400, null, "Email đã tồn tại");
      }
      const existingUserPhone = await User.findOne({ phone });
      if(existingUserPhone){
        return ResponseApi(res, 400, null, "Số điện thoại đã tồn tại");
      }
  
      const hashedPassword = await bcrypt.hash(password,20);
  
      const newUser = await User.create({
        username,
        email,
        phone,
        password: hashedPassword,
  
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