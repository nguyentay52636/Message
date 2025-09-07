import { Document, Types } from 'mongoose';
interface IBlockedUser extends Document {
    user: Types.ObjectId;
    blockedUser: Types.ObjectId;
    reason?: string;
    createdAt: Date;
}
declare const _default: import("mongoose").Model<IBlockedUser, {}, {}, {}, Document<unknown, {}, IBlockedUser, {}> & IBlockedUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=blockUser.d.ts.map