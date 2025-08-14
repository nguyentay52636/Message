import { Response } from "express";

export const ResponseApi = (
  res: Response,
  code: number,
  data: any,
  message: string
) => {
  return res.status(code).json({
    status: code,
    data,
    message,
    date: new Date().toISOString(),
  });
};
