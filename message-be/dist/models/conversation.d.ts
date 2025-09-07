import { Document, Types } from 'mongoose';
interface IConversation extends Document {
    type: 'personal' | 'group';
    members: Types.ObjectId[];
    groupName?: string;
    groupAvatar?: string;
    groupAdmin?: Types.ObjectId;
    lastMessage?: Types.ObjectId;
    lastUpdated: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: import("mongoose").Model<IConversation, {}, {}, {}, Document<unknown, {}, IConversation, {}> & IConversation & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=conversation.d.ts.map