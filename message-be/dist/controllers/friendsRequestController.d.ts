import { Request, Response } from "express";
export declare const addFriendRequest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllRequestFriends: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const acceptFriendRequest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteFriendRequest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const searchUsersByPhone: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllRequestFriend: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const rejectFriendRequest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getFriendsByUserId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=friendsRequestController.d.ts.map