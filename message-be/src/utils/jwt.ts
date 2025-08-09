// utils/jwt.ts
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { ResponseApi } from "../config/response"; 

const ACCESS_SECRET = "key_token";
const REFRESH_SECRET = "key_token2";

// Tạo Access Token
export const createToken = (data: object) => {
  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn: "10m",
  };
  return jwt.sign(data, ACCESS_SECRET, options);
};

// Kiểm tra Access Token
export const checkToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, ACCESS_SECRET);
};

// Lấy dữ liệu từ Token mà không verify
export const dataToken = (token: string) => {
  return jwt.decode(token);
};

// Middleware xác thực Access Token
export const midVerification = (req: Request & { decoded?: string | JwtPayload }, res: Response, next: NextFunction) => {
  const token =
    req.headers["x-access-token"]?.toString() ||
    req.body.token ||
    req.query.token?.toString() ||
    req.cookies?.token;

  if (!token) {
    return ResponseApi(res, 400, null, "Token không hợp lệ");
  }

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    req.decoded = decoded;
    next();
  } catch (err) {
    return ResponseApi(res, 400, null, "Token không hợp lệ");
  }
};

// Tạo Refresh Token
export const createTokenRef = (data: object) => {
  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn: "10s",
  };
  return jwt.sign(data, REFRESH_SECRET, options);
};

// Kiểm tra Refresh Token
export const checkTokenRef = (token: string): JwtPayload | string => {
  return jwt.verify(token, REFRESH_SECRET);
};
