import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
export declare const createToken: (data: object) => string;
export declare const checkToken: (token: string) => JwtPayload | string;
export declare const dataToken: (token: string) => string | jwt.JwtPayload | null;
export declare const midVerification: (req: Request & {
    decoded?: string | JwtPayload;
}, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const createTokenRef: (data: object) => string;
export declare const checkTokenRef: (token: string) => JwtPayload | string;
//# sourceMappingURL=jwt.d.ts.map