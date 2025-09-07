import { Request, Response } from 'express';
import { Socket } from 'socket.io';
interface CustomRequest extends Request {
    io?: Socket;
    user?: {
        id: string;
    };
    file?: Express.Multer.File;
}
export declare const uploadImage: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMessages: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createMessageHandler: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createReplyMessage: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const markMessagesAsRead: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const recallMessage: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const forwardMessage: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteMessage: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=messsageController.d.ts.map