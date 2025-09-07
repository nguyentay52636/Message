import mongoose, { Document } from 'mongoose';
export interface IOnlineStatus extends Document {
    userId: mongoose.Types.ObjectId;
    status: 'online' | 'offline' | 'away' | 'busy';
    lastSeen: Date;
    isOnline: boolean;
    socketId?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IOnlineStatus, {}, {}, {}, mongoose.Document<unknown, {}, IOnlineStatus, {}> & IOnlineStatus & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=onlineStatus.d.ts.map