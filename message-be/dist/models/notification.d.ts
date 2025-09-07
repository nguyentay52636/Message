import { Document, Types } from 'mongoose';
interface INotification extends Document {
    recipient: Types.ObjectId;
    sender?: Types.ObjectId;
    type: 'message' | 'call' | 'friend_request' | 'group_invite' | 'system';
    title: string;
    content: string;
    isRead: boolean;
    relatedId?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: import("mongoose").Model<INotification, {}, {}, {}, Document<unknown, {}, INotification, {}> & INotification & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=notification.d.ts.map