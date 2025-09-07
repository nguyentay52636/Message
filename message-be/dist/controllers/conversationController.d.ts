import { Request, Response } from 'express';
import { Socket } from 'socket.io';
interface CustomRequest extends Request {
    io?: Socket;
}
export declare const addConversation: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllConversations: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getConversationOfUser: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateConversation: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addMemberToConversation: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteConversation: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getConversationBetweenUsers: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=conversationController.d.ts.map