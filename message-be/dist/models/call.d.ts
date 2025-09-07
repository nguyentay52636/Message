import { Document, Types } from 'mongoose';
interface ICall extends Document {
    caller: Types.ObjectId;
    receiver: Types.ObjectId;
    conversation: Types.ObjectId;
    callType: 'voice' | 'video';
    status: 'incoming' | 'ongoing' | 'ended' | 'missed';
    startTime: Date;
    endTime?: Date;
    duration?: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: import("mongoose").Model<ICall, {}, {}, {}, Document<unknown, {}, ICall, {}> & ICall & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=call.d.ts.map