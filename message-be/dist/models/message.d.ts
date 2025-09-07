import { Document, Types } from 'mongoose';
interface IMessage extends Document {
    sender: Types.ObjectId;
    conversation: Types.ObjectId;
    content: string;
    messageType: 'text' | 'image' | 'file' | 'audio' | 'video';
    mediaUrl?: string;
    imageId?: Types.ObjectId;
    isRead: boolean;
    readBy: Types.ObjectId[];
    replyTo?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: import("mongoose").Model<IMessage, {}, {}, {}, Document<unknown, {}, IMessage, {}> & IMessage & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=message.d.ts.map